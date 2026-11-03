import { siteConfig } from '../data/siteData'
import { hasConsented } from './consent'
import { sendTelemetry } from './telemetry'

/**
 * Standard human-readable titles for single-page sections.
 */
export const SECTION_TITLES: Record<string, string> = {
  home: 'Hero & Company Overview',
  about: 'About Marvel Softwares',
  'mission-vision': 'Mission & Vision',
  services: 'Core Engineering Services',
  process: '5-Step Engineering Lifecycle',
  technologies: 'Modern Technology Stack',
  'why-choose-us': 'Why Choose Marvel Softwares',
  team: 'Leadership & Engineering Team',
  projects: 'Featured Work & Case Studies',
  'upcoming-projects': 'Upcoming Innovations',
  clients: 'Clients & Trusted Partners',
  testimonials: 'Client Testimonials',
  contact: 'Contact & Consultation Form',
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __marvel_ga_initialized?: boolean
  }
}

/**
 * Resolves the Google Analytics 4 Measurement ID.
 * Priority:
 * 1. Environment variable VITE_GA_MEASUREMENT_ID
 * 2. siteConfig.gaMeasurementId
 */
export function getGaMeasurementId(): string {
  const envId = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim()
  if (envId) return envId
  return (siteConfig.gaMeasurementId || '').trim()
}

/**
 * Validates if the measurement ID is a real GA4 ID (G-XXXXXXXXXX)
 * and not an empty string or generic placeholder.
 */
export function isValidGaId(id: string): boolean {
  if (!id) return false
  if (id === 'G-XXXXXXXXXX' || id === 'INSERT_GA_ID_HERE') return false
  return /^G-[A-Z0-9]+$/i.test(id)
}

/**
 * Initializes Google Analytics 4 (gtag.js).
 * - If a valid GA4 ID is present, it injects the official gtag.js script and initializes window.dataLayer.
 * - If not yet configured or placeholder, it sets up a safe no-op mock that logs in development.
 */
export function initGA(): void {
  if (typeof window === 'undefined') return
  if (window.__marvel_ga_initialized) return

  const gaId = getGaMeasurementId()
  const valid = isValidGaId(gaId)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }

  // Set default Consent Mode to denied until user consents
  window.gtag('consent', 'default', {
    analytics_storage: hasConsented() ? 'granted' : 'denied',
    ad_storage: hasConsented() ? 'granted' : 'denied',
    ad_user_data: hasConsented() ? 'granted' : 'denied',
    ad_personalization: hasConsented() ? 'granted' : 'denied',
  })

  if (valid) {
    // Inject official Google Tag Manager script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    document.head.appendChild(script)

    window.gtag('js', new Date())
    window.gtag('config', gaId, {
      send_page_view: false,
    })

    if (import.meta.env.DEV) {
      console.info(`[Analytics] Initialized GA4 with ID: ${gaId}`)
    }
  } else if (import.meta.env.DEV) {
    console.info(
      `[Analytics] GA4 is ready. Running in mock/standby mode (provide VITE_GA_MEASUREMENT_ID or siteConfig.gaMeasurementId to activate live tracking).`,
    )
  }

  window.__marvel_ga_initialized = true
}

/**
 * Dispatches an event to BOTH Google Analytics (gtag) AND First-Party Database Telemetry.
 */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return

  if (!window.gtag) {
    initGA()
  }

  // Record to window.dataLayer
  if (window.gtag) {
    window.gtag('event', eventName, params)
  }

  // Send to First-Party DB Telemetry (respects cookie consent)
  sendTelemetry({
    event_name: eventName,
    page_path: (params.page_path as string) || window.location.pathname,
    section_id: params.section_id as string | undefined,
    section_name: params.section_name as string | undefined,
    dwell_time_seconds: (params.dwell_time_seconds as number) || 0,
    element_label: (params.element_label as string) || (params.cta_label as string),
    metadata: params,
  })

  if (import.meta.env.DEV) {
    console.log(`📊 [Analytics Event] ${eventName}:`, params)
  }
}

/**
 * Tracks virtual pageviews for React Router SPA routes.
 */
export function trackPageView(path: string, title?: string): void {
  const pageTitle = title || document.title
  trackEvent('page_view', {
    page_path: path,
    page_title: pageTitle,
    page_location: window.location.href,
  })
}

/**
 * Tracks when a user scrolls into a specific section of the page.
 */
export function trackSectionView(
  sectionId: string,
  sectionTitle?: string,
  dwellTimeSeconds: number = 0,
): void {
  const name = sectionTitle || SECTION_TITLES[sectionId] || sectionId
  trackEvent('section_view', {
    section_id: sectionId,
    section_name: name,
    dwell_time_seconds: dwellTimeSeconds,
    page_path: window.location.pathname,
  })
}

/**
 * Tracks navigation clicks aimed at sections (Navbar, Footer, in-page links).
 */
export function trackSectionNavigation(
  sectionId: string,
  source: 'navbar' | 'mobile-drawer' | 'footer' | 'cta' | 'link' = 'link',
): void {
  const name = SECTION_TITLES[sectionId] || sectionId
  trackEvent('section_navigation', {
    section_id: sectionId,
    section_name: name,
    navigation_source: source,
  })
}

/**
 * Tracks contact and consultation form submissions.
 * Fires standard GA4 'generate_lead' event as well as 'form_submit' and DB lead record.
 */
export function trackFormSubmit(
  formName: string,
  status: 'success' | 'failure',
  details?: Record<string, unknown>,
): void {
  trackEvent('form_submit', {
    form_name: formName,
    status,
    ...details,
  })

  if (status === 'success') {
    // GA4 recommended event for lead generation
    trackEvent('generate_lead', {
      value: 1,
      currency: 'INR',
      lead_source: formName,
      ...details,
    })
  }
}

/**
 * Tracks primary call-to-action button clicks.
 */
export function trackCtaClick(label: string, target?: string): void {
  trackEvent('cta_click', {
    cta_label: label,
    cta_target: target || '',
  })
}

/**
 * Tracks direct contact interactions (phone, email, WhatsApp, or social links).
 */
export function trackContactClick(
  method: 'phone' | 'email' | 'whatsapp' | 'social',
  value?: string,
): void {
  trackEvent('contact_click', {
    contact_method: method,
    contact_value: value || '',
  })
}

/**
 * Tracks project preview modal opens.
 */
export function trackProjectPreview(projectTitle: string, category?: string): void {
  trackEvent('project_view', {
    project_name: projectTitle,
    project_category: category || '',
  })
}

/**
 * Tracks FAQ accordion interactions.
 */
export function trackFaqToggle(question: string, isOpen: boolean): void {
  trackEvent('faq_toggle', {
    faq_question: question,
    is_open: isOpen,
  })
}

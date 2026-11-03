/**
 * MARVEL SOFTWARES — Cookie Consent & Privacy Manager
 * Compliant with GDPR, ePrivacy Directive, and Digital Personal Data Protection (DPDP) Act.
 */

export type ConsentStatus = 'accepted' | 'declined' | 'undecided'

const CONSENT_STORAGE_KEY = 'marvel_cookie_consent'
const CONSENT_EVENT_NAME = 'marvel:consent-change'
const BANNER_EVENT_NAME = 'marvel:open-consent-banner'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Retrieves the current cookie consent decision.
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'undecided'
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (stored === 'accepted' || stored === 'declined') {
      return stored
    }
    return 'undecided'
  } catch {
    return 'undecided'
  }
}

/**
 * Checks if the user has actively consented to analytics.
 */
export function hasConsented(): boolean {
  return getConsentStatus() === 'accepted'
}

/**
 * Updates the cookie consent state.
 * Syncs with Google Analytics Consent Mode v2 and dispatches a local event.
 */
export function setConsentStatus(status: 'accepted' | 'declined'): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status)
  } catch {
    // Ignore storage errors in restricted iframe/incognito
  }

  // Update Google Analytics Consent Mode
  if (typeof window.gtag === 'function') {
    const granted = status === 'accepted' ? 'granted' : 'denied'
    window.gtag('consent', 'update', {
      analytics_storage: granted,
      ad_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
    })
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT_NAME, { detail: status }))
}

/**
 * Listens for consent state updates.
 */
export function onConsentChange(callback: (status: ConsentStatus) => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ConsentStatus>
    callback(customEvent.detail || getConsentStatus())
  }
  window.addEventListener(CONSENT_EVENT_NAME, handler)
  return () => window.removeEventListener(CONSENT_EVENT_NAME, handler)
}

/**
 * Triggers the Cookie Consent banner to re-open (e.g. from footer link).
 */
export function openConsentBanner(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(BANNER_EVENT_NAME))
}

/**
 * Listens for requests to open the Cookie Consent banner.
 */
export function onOpenConsentBanner(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(BANNER_EVENT_NAME, callback)
  return () => window.removeEventListener(BANNER_EVENT_NAME, callback)
}

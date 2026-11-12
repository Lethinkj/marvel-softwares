import React, { useEffect, useRef } from 'react'
import {
  Globe,
  AppWindow,
  Smartphone,
  Database,
  Code2,
  Sparkles,
  Palette,
  Terminal,
  Cloud,
  Wrench,
  Layers,
} from 'lucide-react'
import { ServiceScene } from './illustrations/ServiceScenes'
import { homeServices, services } from '../data/siteData'

/**
 * Helper to get a tailored, semantic icon for each service heading
 */
const getServiceHeadingIcon = (serviceId: string) => {
  switch (serviceId) {
    case 'website-development':
      return <Globe />
    case 'web-application-development':
      return <AppWindow />
    case 'mobile-app-development':
      return <Smartphone />
    case 'erp-business-software':
      return <Database />
    case 'custom-software-development':
      return <Code2 />
    case 'ai-automation':
      return <Sparkles />
    case 'ui-ux-design':
      return <Palette />
    case 'api-integration':
      return <Terminal />
    case 'cloud-devops':
      return <Cloud />
    case 'maintenance-consulting':
      return <Wrench />
    default:
      return <Layers />
  }
}

/**
 * ServiceShowcase
 * Responsive service presentation:
 * Mobile view (< 992px): First Heading, then Image (ServiceScene), then Contents.
 * Desktop view (>= 992px): Alternating rows of Image (40%) and Content (60%).
 * 
 * Scroll animations:
 * Every element animates separately while scrolling:
 * - Image / Media: glides from Left (or Right in flip rows) with subtle scale
 * - Heading: glides from Right (or Left in flip rows)
 * - Paragraph: glides in with staggered delay
 * - Points: glides in with staggered delay + checkmark cascade
 * - Plays dynamically on scroll DOWN and scroll UP
 * - Zero-glitch hysteresis with silent off-screen reset (>90px)
 */
export const ServiceShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const overview = homeServices
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is (typeof services)[number] => Boolean(s))

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === 'undefined') return

    const items = container.querySelectorAll<HTMLElement>('.svc-anim-item')
    if (!items.length) return

    // Reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      items.forEach((item) => {
        item.classList.add('svc-item--visible')
      })
      return
    }

    let lastScrollY = window.scrollY
    let globalScrollDir: 'down' | 'up' = 'down'

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollY
      if (Math.abs(diff) >= 4) {
        globalScrollDir = diff > 0 ? 'down' : 'up'
        lastScrollY = currentScrollY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Reveal observer: triggers when each element enters viewport
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect
            const enteringFromTop = rect.bottom < window.innerHeight * 0.45 && globalScrollDir === 'up'
            const dir = enteringFromTop ? 'up' : globalScrollDir

            item.dataset.scrollDirection = dir
            item.classList.remove('svc-item--resetting')
            // Synchronously flush styles before adding visible class to guarantee transition triggers
            void item.offsetWidth
            item.classList.add('svc-item--visible')
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '-10px 0px -30px 0px',
      }
    )

    // Reset observer: only resets when element is SAFELY OFFSCREEN (>90px)
    const resetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement
          if (!entry.isIntersecting) {
            const rect = entry.boundingClientRect
            const isFarAbove = rect.bottom < 0
            const isFarBelow = rect.top > window.innerHeight

            if (isFarAbove) {
              item.classList.add('svc-item--resetting')
              item.classList.remove('svc-item--visible')
              item.dataset.scrollDirection = 'up'
            } else if (isFarBelow) {
              item.classList.add('svc-item--resetting')
              item.classList.remove('svc-item--visible')
              item.dataset.scrollDirection = 'down'
            }
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '90px 0px 90px 0px',
      }
    )

    const vh = window.innerHeight
    items.forEach((item) => {
      const rect = item.getBoundingClientRect()
      // If already within or touching viewport, show immediately
      if (rect.top < vh && rect.bottom > 0) {
        item.classList.add('svc-item--visible')
        item.dataset.scrollDirection = 'down'
      } else if (rect.bottom <= 0) {
        item.classList.add('svc-item--resetting')
        item.dataset.scrollDirection = 'up'
      } else {
        item.classList.add('svc-item--resetting')
        item.dataset.scrollDirection = 'down'
      }

      revealObserver.observe(item)
      resetObserver.observe(item)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      revealObserver.disconnect()
      resetObserver.disconnect()
    }
  }, [overview.length])

  return (
    <div ref={containerRef} className="svc-showcase">
      {overview.map((service, i) => {
        const flip = i % 2 === 1
        return (
          <div
            key={service.id}
            className={`svc-showcase-row svc-scroll-row${flip ? ' is-flip' : ''}`}
            data-service-index={i}
          >
            {/* 1. Mobile-only heading (First on mobile view) */}
            <div className="svc-mobile-header text-center svc-anim-item svc-anim-heading">
              <h3 className="svc-copy-title text-center">
                <span className="svc-heading-icon" aria-hidden="true">
                  {getServiceHeadingIcon(service.id)}
                </span>
                <span>{service.title}</span>
              </h3>
            </div>

            {/* 2. Media / Image (Second on mobile view) */}
            <div className="svc-media svc-anim-item svc-anim-media">
              <ServiceScene id={`svc${i}`} serviceId={service.id} />
            </div>

            {/* 3. Narrative Copy / Contents (Third on mobile view) */}
            <div className="svc-copy text-left">
              {/* Desktop-only heading (shown only on >= 992px desktop) */}
              <h3 className="svc-copy-title svc-copy-title--desktop svc-anim-item svc-anim-heading">
                <span className="svc-heading-icon" aria-hidden="true">
                  {getServiceHeadingIcon(service.id)}
                </span>
                <span>{service.title}</span>
              </h3>

              <p className="text-body text-slate-600 leading-relaxed text-base sm:text-lg svc-anim-item svc-anim-para">
                {service.paragraphs?.[0] ?? service.description}
              </p>

              <ul
                className="svc-copy-list svc-copy-table svc-anim-item svc-anim-points"
                aria-label={`${service.title} features`}
              >
                {service.capabilities.slice(0, 6).map((capability) => (
                  <li key={capability}>
                    <span className="svc-copy-tick" aria-hidden="true" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ServiceShowcase

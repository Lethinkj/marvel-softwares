import React, { useEffect, useRef } from 'react'
import { ServiceScene } from './illustrations/ServiceScenes'
import { homeServices, services } from '../data/siteData'

/**
 * ServiceShowcase
 * Responsive service presentation:
 * Mobile view (< 992px): First Heading, then Image (ServiceScene), then Contents.
 * Desktop view (>= 992px): Alternating rows of Image (40%) and Content (60%).
 * 
 * Scroll animations:
 * - Row 0, 2, 4 (left-aligned): glides in from Left to Right
 * - Row 1, 3, 5 (right-aligned): glides in from Right to Left
 * - Plays dynamically on scroll DOWN and scroll UP
 */
export const ServiceShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const overview = homeServices
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is (typeof services)[number] => Boolean(s))

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === 'undefined') return

    const rows = container.querySelectorAll<HTMLElement>('.svc-scroll-row')
    if (!rows.length) return

    // Reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      rows.forEach((row) => {
        row.classList.add('svc-row--visible')
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

    // Reveal observer: triggers when row enters viewport
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const row = entry.target as HTMLElement
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect
            const enteringFromTop = rect.bottom < window.innerHeight * 0.45 && globalScrollDir === 'up'
            const dir = enteringFromTop ? 'up' : globalScrollDir

            row.dataset.scrollDirection = dir
            row.classList.remove('svc-row--resetting')
            requestAnimationFrame(() => {
              row.classList.add('svc-row--visible')
            })
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '-20px 0px -40px 0px',
      }
    )

    // Reset observer: only resets when row is SAFELY OFFSCREEN (>100px)
    const resetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const row = entry.target as HTMLElement
          if (!entry.isIntersecting) {
            const rect = entry.boundingClientRect
            const isFarAbove = rect.bottom < 0
            const isFarBelow = rect.top > window.innerHeight

            if (isFarAbove) {
              row.classList.add('svc-row--resetting')
              row.classList.remove('svc-row--visible')
              row.dataset.scrollDirection = 'up'
            } else if (isFarBelow) {
              row.classList.add('svc-row--resetting')
              row.classList.remove('svc-row--visible')
              row.dataset.scrollDirection = 'down'
            }
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '100px 0px 100px 0px',
      }
    )

    rows.forEach((row) => {
      revealObserver.observe(row)
      resetObserver.observe(row)
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
            <div className="svc-mobile-header text-center">
              <h3 className="svc-copy-title text-center">{service.title}</h3>
            </div>

            {/* 2. Media / Image (Second on mobile view) */}
            <div className="svc-media">
              <ServiceScene id={`svc${i}`} serviceId={service.id} />
            </div>

            {/* 3. Narrative Copy / Contents (Third on mobile view) */}
            <div className="svc-copy text-left">
              {/* Desktop-only heading (shown only on >= 992px desktop) */}
              <h3 className="svc-copy-title svc-copy-title--desktop">{service.title}</h3>

              <p className="text-body text-slate-600 leading-relaxed text-base sm:text-lg">
                {service.paragraphs?.[0] ?? service.description}
              </p>

              <ul className="svc-copy-list svc-copy-table" aria-label={`${service.title} features`}>
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

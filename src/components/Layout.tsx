import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'
import EntryReveal from './EntryReveal'
import CookieBanner from './CookieBanner'
import { initGA, trackPageView, trackSectionView } from '../utils/analytics'

/**
 * PageTracker records virtual pageviews across all routes (/, /faq and /build) for Google Analytics.
 */
function PageTracker() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    initGA()
    // Small delay ensures <Seo /> component has applied document.title
    const timer = setTimeout(() => {
      trackPageView(pathname + search, document.title)
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname, search])

  return null
}

/**
 * SectionAnalyticsObserver tracks when users scroll into each section of the page.
 * Fires a custom 'section_view' event once per section when viewed for >= 500ms.
 */
function SectionAnalyticsObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    const loggedSections = new Set<string>()
    const dwellTimers = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (!id) return

          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            if (!loggedSections.has(id) && !dwellTimers.has(id)) {
              // User spent at least 500ms viewing this section
              const timer = window.setTimeout(() => {
                loggedSections.add(id)
                trackSectionView(id)
                dwellTimers.delete(id)
              }, 500)
              dwellTimers.set(id, timer)
            }
          } else {
            const timer = dwellTimers.get(id)
            if (timer) {
              window.clearTimeout(timer)
              dwellTimers.delete(id)
            }
          }
        })
      },
      {
        threshold: [0.2, 0.4],
        rootMargin: '-40px 0px -40px 0px',
      },
    )

    const observeSections = () => {
      document.querySelectorAll<HTMLElement>('#main-content section[id]').forEach((section) => {
        observer.observe(section)
      })
    }

    const mutationObserver = new MutationObserver(observeSections)
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mutationObserver.observe(mainContent, { childList: true, subtree: true })
    }
    observeSections()

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      dwellTimers.forEach((t) => window.clearTimeout(t))
      dwellTimers.clear()
    }
  }, [pathname])

  return null
}

/**
 * ScrollToTop component restores viewport scroll position to (0, 0)
 * whenever the location pathname changes.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace(/^#/, '')
        const el = document.getElementById(id)
        if (el) {
          const headerOffset = 70
          const elementPosition = el.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }, 80)
      return
    }
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      })
    }
  }, [pathname, hash])

  return null
}

function ScrollSceneObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // If user prefers reduced motion, reveal all sections immediately without animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document.querySelectorAll<HTMLElement>('#main-content section').forEach((sec) => {
        sec.classList.add('scroll-scene', 'scroll-scene--visible')
      })
      return
    }

    let lastScrollY = window.scrollY
    let globalScrollDir: 'down' | 'up' = 'down'

    const updateDirection = () => {
      const currentScrollY = window.scrollY
      const diff = currentScrollY - lastScrollY
      if (Math.abs(diff) >= 6) {
        globalScrollDir = diff > 0 ? 'down' : 'up'
        lastScrollY = currentScrollY
      }
    }

    window.addEventListener('scroll', updateDirection, { passive: true })

    // Observer 1: Reveal Observer (detects when a section enters the viewport)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement
          if (entry.isIntersecting) {
            if (!section.classList.contains('scroll-scene--visible')) {
              section.dataset.scrollDirection = globalScrollDir
              section.classList.remove('scroll-scene--resetting')
              requestAnimationFrame(() => {
                section.classList.add('scroll-scene--visible')
              })
            }
          }
        })
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    // Observer 2: Reset Observer (only resets when a section is SAFELY OFFSCREEN by >180px)
    // This generous buffer prevents elements from disappearing while visible or near the viewport edges.
    const resetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement
          // Hero section stays permanently visible
          if (section.id === 'home') return

          if (!entry.isIntersecting) {
            const rect = entry.boundingClientRect
            const isFarAbove = rect.bottom < 0
            const isFarBelow = rect.top > window.innerHeight

            if (isFarAbove) {
              // Scrolled far above viewport: quietly prime to glide down when scrolling up
              section.classList.add('scroll-scene--resetting')
              section.classList.remove('scroll-scene--visible')
              section.dataset.scrollDirection = 'up'
            } else if (isFarBelow) {
              // Scrolled far below viewport: quietly prime to glide up when scrolling down
              section.classList.add('scroll-scene--resetting')
              section.classList.remove('scroll-scene--visible')
              section.dataset.scrollDirection = 'down'
            }
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '180px 0px 180px 0px',
      }
    )

    const observed = new Set<HTMLElement>()
    const initSections = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        '#main-content section[id], #main-content section.faq-page'
      )
      const vh = window.innerHeight

      sections.forEach((section) => {
        if (observed.has(section)) return
        observed.add(section)

        section.classList.add('scroll-scene')

        const rect = section.getBoundingClientRect()
        // If already in or touching initial viewport (above the fold):
        if (rect.top < vh && rect.bottom > 0) {
          section.classList.add('scroll-scene--visible')
          section.dataset.scrollDirection = 'down'
        } else if (rect.bottom <= 0) {
          section.dataset.scrollDirection = 'up'
        } else {
          section.dataset.scrollDirection = 'down'
        }

        revealObserver.observe(section)
        resetObserver.observe(section)
      })
    }

    initSections()

    const mutationObserver = new MutationObserver(initSections)
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mutationObserver.observe(mainContent, { childList: true, subtree: true })
    }

    return () => {
      window.removeEventListener('scroll', updateDirection)
      revealObserver.disconnect()
      resetObserver.disconnect()
      mutationObserver.disconnect()
      observed.forEach((sec) => {
        sec.classList.remove('scroll-scene', 'scroll-scene--visible', 'scroll-scene--resetting')
        delete sec.dataset.scrollDirection
      })
    }
  }, [])

  return null
}

/**
 * Main Layout wrapper component for Marvel Softwares.
 *
 * Includes:
 * - Accessible skip-to-content link (.skip-link)
 * - Sticky responsive Navbar
 * - ScrollToTop behavior on route navigation
 * - Main element with id="main-content" hosting react-router Outlet
 * - Footer component
 */
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <EntryReveal />
      {/* Skip to content link for keyboard / screen reader accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Automatically reset scroll position on route change */}
      <ScrollToTop />
      <ScrollSceneObserver />

      {/* Google Analytics: Automatic Virtual Pageviews & In-View Section Tracking */}
      <PageTracker />
      <SectionAnalyticsObserver />

      {/* Responsive Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating back-to-top button (all pages) */}
      <BackToTop />

      {/* Legal Cookie and Privacy Consent Banner */}
      <CookieBanner />
    </div>
  )
}

export default Layout

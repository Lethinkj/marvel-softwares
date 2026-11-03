import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'
import EntryReveal from './EntryReveal'
import CookieBanner from './CookieBanner'
import { initGA, trackPageView, trackSectionView } from '../utils/analytics'

/**
 * PageTracker records virtual pageviews across all routes (/ and /faq) for Google Analytics.
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
    let lastScrollY = window.scrollY
    let direction: 'up' | 'down' = 'down'
    const observedSections = new Set<HTMLElement>()

    const updateDirection = () => {
      const currentScrollY = window.scrollY
      if (Math.abs(currentScrollY - lastScrollY) > 4) {
        direction = currentScrollY > lastScrollY ? 'down' : 'up'
        lastScrollY = currentScrollY
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement
          section.classList.add('scroll-scene')
          section.dataset.scrollDirection = direction
          section.classList.toggle('scroll-scene--visible', entry.isIntersecting)
        })
      },
      {
        threshold: 0.08,
        rootMargin: '-8% 0px -8% 0px',
      },
    )

    const observeSections = () => {
      document.querySelectorAll<HTMLElement>('#main-content section[id]').forEach((section) => {
        if (observedSections.has(section)) return
        observedSections.add(section)
        observer.observe(section)
      })
    }

    const mutationObserver = new MutationObserver(observeSections)
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mutationObserver.observe(mainContent, { childList: true, subtree: true })
    }
    observeSections()
    window.addEventListener('scroll', updateDirection, { passive: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('scroll', updateDirection)
      observedSections.forEach((section) => {
        section.classList.remove('scroll-scene', 'scroll-scene--visible')
        delete section.dataset.scrollDirection
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

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import FooterV1 from './FooterV1'
import BackToTop from './BackToTop'
import EntryReveal from './EntryReveal'

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
    if (pathname === '/' && !hash) {
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

      {/* Responsive Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Global Footer */}
      <FooterV1 />

      {/* Floating back-to-top button (all pages) */}
      <BackToTop />
    </div>
  )
}

export default Layout

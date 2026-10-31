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

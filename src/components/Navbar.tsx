import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { navLinks } from '../data/siteData'

/**
 * Sticky site header. Original logo asset, 80px desktop
 * height, active-route indicator, "Start a Project" CTA,
 * accessible mobile drawer with Escape-to-close.
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActiveLink = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white transition-shadow duration-200"
      style={{
        borderBottom: '1px solid var(--color-border)',
        boxShadow: isScrolled ? '0 4px 20px -8px rgba(0,51,160,.12)' : 'none',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between gap-4"
        style={{
          maxWidth: 'var(--container-width)',
          width: 'min(100% - 48px, var(--container-width))',
          height: 'var(--nav-height)',
        }}
      >
        <Link
          to="/"
          aria-label="MARVEL SOFTWARES — Home"
          onClick={() => setIsMenuOpen(false)}
          className="shrink-0 rounded-md"
        >
          <img
            src="/marvel-softwares-logo.png"
            alt="MARVEL SOFTWARES"
            width={272}
            height={90}
            style={{ width: '132px', height: 'auto' }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className="relative px-4 py-2 text-[15px] rounded-lg transition-colors"
                style={{
                  color: active ? 'var(--color-primary)' : 'var(--color-text)',
                  fontWeight: active ? 700 : 500,
                  background: active ? 'rgba(0,87,231,.07)' : 'transparent',
                }}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute inset-x-3 -bottom-[13px] rounded-full"
                    style={{ height: 3, background: 'var(--color-primary)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:flex items-center shrink-0">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-6 text-[15px] font-semibold text-white transition-all hover:-translate-y-px"
            style={{
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-button)',
              boxShadow: 'var(--shadow-button)',
            }}
          >
            Start a Project
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center justify-center min-h-[44px] px-4 text-sm font-semibold text-white"
            style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
          >
            Start a Project
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex items-center justify-center w-11 h-11 rounded-lg transition-colors"
            style={{ color: 'var(--color-text)' }}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="relative block w-5 h-5" aria-hidden="true">
              <span
                className="absolute h-0.5 w-5 rounded-full transition-all duration-200"
                style={{
                  background: 'currentColor',
                  top: isMenuOpen ? 9 : 4,
                  transform: isMenuOpen ? 'rotate(45deg)' : 'none',
                }}
              />
              <span
                className="absolute h-0.5 w-5 rounded-full transition-all duration-200"
                style={{ background: 'currentColor', top: 9, opacity: isMenuOpen ? 0 : 1 }}
              />
              <span
                className="absolute h-0.5 w-5 rounded-full transition-all duration-200"
                style={{
                  background: 'currentColor',
                  top: isMenuOpen ? 9 : 14,
                  transform: isMenuOpen ? 'rotate(-45deg)' : 'none',
                }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-white"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 py-4 mx-auto"
              style={{ width: 'min(100% - 32px, var(--container-width))' }}
            >
              {navLinks.map((link) => {
                const active = isActiveLink(link.href)
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className="flex items-center min-h-[48px] px-4 rounded-xl text-base transition-colors"
                    style={{
                      fontWeight: active ? 700 : 500,
                      color: active ? 'var(--color-primary)' : 'var(--color-text)',
                      background: active ? 'rgba(0,87,231,.07)' : 'transparent',
                      borderLeft: active ? '4px solid var(--color-primary)' : '4px solid transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

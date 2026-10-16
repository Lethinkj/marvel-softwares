import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { navLinks, siteConfig } from '../data/siteData'
import {
  GlobeIcon,
  LayersIcon,
  UsersIcon,
  BarChartIcon,
  MailIcon,
} from './Icons'

const NAV_ICONS: Record<string, React.ReactNode> = {
  '/': <GlobeIcon className="w-5 h-5" />,
  '/services': <LayersIcon className="w-5 h-5" />,
  '/about': <UsersIcon className="w-5 h-5" />,
  '/projects': <BarChartIcon className="w-5 h-5" />,
  '/contact': <MailIcon className="w-5 h-5" />,
}

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
          className="shrink-0 rounded-md flex items-center"
          style={{ gap: 10 }}
        >
          <img
            src="/marvel-softwares-mark-transparent.png"
            alt=""
            aria-hidden="true"
            width={171}
            height={96}
            className="brand-mark"
          />
          <span className="flex flex-col" style={{ lineHeight: 1.05 }}>
            <span className="brand-name">
              MARVEL
            </span>
            <span className="brand-sub">
              SOFTWARES
            </span>
          </span>
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
                  textDecoration: active ? 'underline' : 'none',
                  textDecorationThickness: 3,
                  textUnderlineOffset: 6,
                  textDecorationColor: 'var(--color-primary)',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex lg:hidden items-center">
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
          <>
            <motion.div
              key="nav-scrim"
              aria-hidden="true"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden fixed inset-0 z-[60]"
              style={{ background: 'rgba(11,21,48,.45)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            />
            <motion.aside
              key="nav-drawer"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-0 right-0 z-[61] flex flex-col bg-white rounded-l-3xl"
              style={{
                width: 'min(78vw, 340px)',
                height: '100dvh',
                boxShadow: '-24px 0 64px -16px rgba(0,31,128,.35)',
              }}
            >
              <div
                className="flex items-center justify-between px-5 shrink-0"
                style={{ height: 'var(--nav-height)', borderBottom: '1px solid var(--color-border)' }}
              >
                <span className="flex items-center" style={{ gap: 8 }}>
                  <img
                    src="/marvel-softwares-mark-transparent.png"
                    alt=""
                    aria-hidden="true"
                    width={86}
                    height={48}
                    style={{ height: '30px', width: 'auto', display: 'block' }}
                  />
                  <span className="text-sm font-extrabold" style={{ color: 'var(--color-primary-dark)', letterSpacing: '0.04em' }}>
                    MARVEL
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex items-center justify-center w-11 h-11 rounded-xl transition-colors"
                  style={{ color: 'var(--color-text)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18 M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-5">
                <ul className="flex flex-col" style={{ gap: 6, listStyle: 'none', margin: 0, padding: 0 }}>
                  {navLinks.map((link, i) => {
                    const active = isActiveLink(link.href)
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className="flex items-center min-h-[56px] px-3 rounded-2xl transition-colors"
                          style={{ gap: 14, background: active ? 'rgba(0,87,231,.08)' : 'transparent' }}
                        >
                          <span
                            aria-hidden="true"
                            className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                            style={{
                              background: active ? 'var(--color-primary)' : 'var(--color-surface-warm)',
                              color: active ? '#fff' : 'var(--color-primary)',
                            }}
                          >
                            {NAV_ICONS[link.href]}
                          </span>
                          <span
                            className="flex-1"
                            style={{
                              fontSize: '1.05rem',
                              fontWeight: active ? 700 : 500,
                              color: active ? 'var(--color-primary)' : 'var(--color-text)',
                            }}
                          >
                            {link.label}
                          </span>
                          <span aria-hidden="true" style={{ color: active ? 'var(--color-primary)' : '#B9C6DD', fontWeight: 700 }}>
                            →
                          </span>
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>
              <div className="px-5 py-4 shrink-0" style={{ borderTop: '1px solid var(--color-border)' }}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block text-sm font-semibold break-anywhere"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {siteConfig.email}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

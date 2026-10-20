import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'
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

const CTA_GRADIENT = 'linear-gradient(135deg, #0057E7 0%, #0033A0 100%)'

/**
 * Sticky site header — modern glass treatment.
 * Desktop: pill-style nav group with a spring-animated active indicator,
 * gradient CTA, scroll-progress hairline.
 * Tablet: same nav pill, CTA collapsed.
 * Mobile: drag-to-dismiss bottom sheet with large touch targets + CTA.
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

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
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActiveLink = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: isScrolled ? 'rgba(255,255,255,.72)' : 'rgba(255,255,255,.92)',
        backdropFilter: 'saturate(180%) blur(16px)',
        WebkitBackdropFilter: 'saturate(180%) blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(8,102,245,.10)' : '1px solid rgba(8,102,245,.06)',
        boxShadow: isScrolled ? '0 12px 32px -24px rgba(0,51,160,.45)' : 'none',
        transition: 'background .3s ease, box-shadow .3s ease, border-color .3s ease',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: 'var(--container-width)',
          width: 'min(100% - 32px, var(--container-width))',
          height: 'var(--nav-height)',
          gap: 16,
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
            src="/marvel-softwares-logo-removebg-preview.png"
            alt="MARVEL SOFTWARES"
            className="brand-logo"
            style={{ height: isScrolled ? 54 : 62, transition: 'height .3s ease' }}
          />
        </Link>

        {/* Pill navigation — desktop + tablet */}
        <nav
          className="hidden md:flex items-center"
          aria-label="Main navigation"
          style={{ background: '#F1F5FB', borderRadius: 999, padding: 4, gap: 2 }}
        >
          {navLinks.map((link) => {
            const active = isActiveLink(link.href)
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className="relative rounded-full transition-colors"
                style={{
                  padding: '9px 16px',
                  fontSize: '0.95rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--color-primary)' : 'var(--color-text)',
                }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: '#fff',
                      boxShadow: '0 4px 14px -8px rgba(0,51,160,.55)',
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Gradient CTA — desktop */}
        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center shrink-0"
          style={{
            gap: 8,
            padding: '11px 20px',
            borderRadius: 999,
            fontSize: '0.92rem',
            fontWeight: 700,
            color: '#fff',
            background: CTA_GRADIENT,
            boxShadow: '0 10px 24px -14px rgba(0,87,231,.95)',
            transition: 'transform .25s cubic-bezier(.22,.75,.3,1), box-shadow .25s ease',
          }}
        >
          Start a Project
          <span aria-hidden="true" className="inline-block">
            →
          </span>
        </Link>

        {/* Burger — mobile */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-colors shrink-0"
          style={{ color: 'var(--color-text)', background: '#F1F5FB' }}
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

      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        className="origin-left"
        style={{
          scaleX: progress,
          height: 2,
          background: 'linear-gradient(90deg, #0057E7, #00CFFF 55%, #FF5A00)',
        }}
      />

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
              className="md:hidden fixed inset-0 z-[60]"
              style={{
                background: 'rgba(11,21,48,.45)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            />
            <motion.div
              key="nav-sheet"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 110 || info.velocity.y > 550) setIsMenuOpen(false)
              }}
              className="md:hidden fixed inset-x-0 bottom-0 z-[61] flex flex-col bg-white"
              style={{
                maxHeight: '92dvh',
                borderRadius: '28px 28px 0 0',
                boxShadow: '0 -24px 60px -20px rgba(0,31,128,.4)',
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
            >
              {/* drag handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0" aria-hidden="true">
                <span style={{ width: 44, height: 5, borderRadius: 5, background: '#DCE4F0' }} />
              </div>

              <div
                className="flex items-center justify-between px-5 shrink-0"
                style={{ borderBottom: '1px solid var(--color-border)', paddingBlock: 10 }}
              >
                <img
                  src="/marvel-softwares-logo-removebg-preview.png"
                  alt="MARVEL SOFTWARES"
                  style={{ height: 40, width: 'auto', display: 'block' }}
                />
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
                  style={{ color: 'var(--color-text)', background: '#F1F5FB' }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18 M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-5 py-4">
                <ul className="flex flex-col" style={{ gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
                  {navLinks.map((link, i) => {
                    const active = isActiveLink(link.href)
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.06 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className="flex items-center"
                          style={{
                            gap: 14,
                            minHeight: 60,
                            padding: '8px 14px',
                            borderRadius: 18,
                            background: active
                              ? 'linear-gradient(120deg, rgba(0,87,231,.10), rgba(0,207,255,.10))'
                              : '#F7FAFF',
                            border: active ? '1.5px solid rgba(0,87,231,.28)' : '1.5px solid transparent',
                          }}
                        >
                          <span
                            aria-hidden="true"
                            className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                            style={{
                              background: active ? CTA_GRADIENT : '#fff',
                              color: active ? '#fff' : 'var(--color-primary)',
                              boxShadow: active ? '0 8px 18px -10px rgba(0,87,231,.9)' : 'none',
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
                          <span
                            aria-hidden="true"
                            style={{ color: active ? 'var(--color-primary)' : '#B9C6DD', fontWeight: 700 }}
                          >
                            →
                          </span>
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              <div className="px-5 pt-3 pb-5 shrink-0" style={{ borderTop: '1px solid var(--color-border)' }}>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-full"
                  style={{
                    gap: 8,
                    padding: '14px 20px',
                    borderRadius: 999,
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: '#fff',
                    background: CTA_GRADIENT,
                    boxShadow: '0 12px 26px -14px rgba(0,87,231,.95)',
                  }}
                >
                  Start a Project
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block text-sm font-semibold break-anywhere text-center"
                  style={{ color: 'var(--color-primary)', marginTop: 12 }}
                >
                  {siteConfig.email}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

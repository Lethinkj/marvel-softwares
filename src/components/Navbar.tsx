import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'motion/react'
import { navLinks, siteConfig } from '../data/siteData'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { StaggeredMenu, type StaggeredMenuItem, type StaggeredMenuSocialItem } from './StaggeredMenu'

/**
 * Sticky site header — modern glass treatment.
 * Desktop (>= 1024px): pill-style nav group with a spring-animated active indicator,
 * scroll-progress hairline.
 * Mobile & Tablet (< 1024px): React Bits StaggeredMenu with GSAP staggered layers.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const menuItems: StaggeredMenuItem[] = navLinks.map((link) => ({
    label: link.label,
    link: link.href,
    ariaLabel: `Go to ${link.label}`,
  }))

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Email', link: `mailto:${siteConfig.email}` },
    { label: 'Call us', link: siteConfig.phoneHref },
    { label: 'Privacy', link: '/privacy' },
  ]

  /**
   * Active-page highlighter.
   * Measured manually and moved with a horizontal transform only, so it can
   * never drift vertically or animate in from an off-screen position.
   */
  const [pill, setPill] = useState({ x: 0, width: 0, visible: false, animate: false })

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  const isActiveLink = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  const activeHref = navLinks.find((link) => isActiveLink(link.href))?.href ?? null

  useLayoutEffect(() => {
    if (!isDesktop) return

    const measure = () => {
      const nav = navRef.current
      if (!nav) return
      const link = activeHref ? linkRefs.current[activeHref] : null
      if (!link) {
        setPill((p) => ({ ...p, visible: false }))
        return
      }
      const navRect = nav.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()
      setPill({
        x: linkRect.left - navRect.left,
        width: linkRect.width,
        visible: true,
        animate: true,
      })
    }

    measure()
    const frame = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', measure)
    }
  }, [activeHref, isDesktop])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        transition: 'all .3s ease',
        pointerEvents: 'none',
      }}
    >
      <div
        className="w-full"
        style={{
          width: '100%',
          pointerEvents: 'none',
        }}
      >
        <div
          className={`relative flex items-center justify-between glass-bar${
            isScrolled ? ' glass-bar--scrolled' : ''
          }`}
          style={{
            height: isScrolled ? 58 : 66,
            gap: 12,
            padding: '0 max(16px, calc((100% - var(--container-width)) / 2 + 16px))',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderBottom: '1px solid rgba(0, 87, 231, 0.12)',
            transition: 'height .3s ease, padding .3s ease',
            pointerEvents: 'auto',
          }}
        >
          <Link
            to="/"
            aria-label="MARVEL SOFTWARES — Home"
            className="shrink-0 rounded-md flex items-center"
            style={{ gap: 10 }}
          >
            <img
              src="/marvel-softwares-logo-removebg-preview.png"
              alt="MARVEL SOFTWARES"
              className="brand-logo"
              style={{ height: isScrolled ? 40 : 46, transition: 'height .3s ease' }}
            />
          </Link>

          {/* Navigation — desktop (>= 1024px) */}
          {isDesktop && (
            <nav
              ref={navRef}
              className="flex items-center"
              aria-label="Main navigation"
              style={{ marginLeft: 'auto', marginRight: 0, gap: 2, position: 'relative' }}
            >
              {navLinks.map((link) => {
                const active = isActiveLink(link.href)
                return (
                  <Link
                    key={link.href}
                    ref={(el) => {
                      linkRefs.current[link.href] = el
                    }}
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className="nav-pill-link relative rounded-full transition-colors"
                    style={{
                      padding: '9px 16px',
                      fontSize: '0.93rem',
                      fontWeight: active ? 700 : 500,
                      color: active ? '#fff' : 'var(--color-text)',
                      zIndex: 1,
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              })}

              {/* Active-page highlighter — horizontal movement only */}
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-0 rounded-full pointer-events-none"
                style={{
                  zIndex: 0,
                  width: pill.width,
                  transform: `translateX(${pill.x}px)`,
                  opacity: pill.visible ? 1 : 0,
                  background: 'linear-gradient(135deg, #0057E7 0%, #0033A0 100%)',
                  boxShadow: '0 10px 22px -12px rgba(0,87,231,.9)',
                  transition: pill.animate
                    ? 'transform .45s cubic-bezier(.22,.75,.3,1), width .45s cubic-bezier(.22,.75,.3,1), opacity .2s ease'
                    : 'none',
                }}
              />
            </nav>
          )}

          {/* StaggeredMenu for Tablet & Mobile (< 1024px) */}
          {!isDesktop && (
            <StaggeredMenu
              position="right"
              isFixed={true}
              showLogo={false}
              items={menuItems}
              socialItems={socialItems}
              displaySocials={true}
              displayItemNumbering={false}
              colors={['#00CFFF', '#0057E7', '#0033A0', '#0B1530']}
              accentColor="#0057E7"
              menuButtonColor="#0057E7"
              openMenuButtonColor="#0057E7"
              logoUrl="/marvel-softwares-logo-removebg-preview.png"
              headerHeight={isScrolled ? 58 : 66}
              headerPadding="0 max(16px, calc((100% - var(--container-width)) / 2 + 16px))"
              closeOnClickAway={true}
            />
          )}

          {/* Scroll progress hairline — sits inside the capsule */}
          <motion.div
            aria-hidden="true"
            className="origin-left"
            style={{
              scaleX: progress,
              position: 'absolute',
              left: 26,
              right: 26,
              bottom: 4,
              height: 2,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #0057E7, #00CFFF 55%, #FF5A00)',
            }}
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar

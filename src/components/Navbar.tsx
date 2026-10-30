import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

  const isActiveLink = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

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
              className="flex items-center"
              aria-label="Main navigation"
              style={{ marginLeft: 'auto', marginRight: 0, gap: 4 }}
            >
              {navLinks.map((link) => {
                const active = isActiveLink(link.href)
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className="nav-pill-link relative transition-colors"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.94rem',
                      fontWeight: active ? 700 : 500,
                      color: active ? 'var(--color-primary)' : 'var(--color-text)',
                    }}
                  >
                    <span>{link.label}</span>
                  </Link>
                )
              })}
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
        </div>
      </div>
    </header>
  )
}

export default Navbar

import { useState, useEffect } from 'react'
import { navLinks, siteConfig } from '../data/siteData'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { StaggeredMenu, type StaggeredMenuItem, type StaggeredMenuSocialItem } from './StaggeredMenu'

/**
 * Sticky site header — modern glass treatment.
 * Desktop (>= 1024px): pill-style nav group with a spring-animated active indicator,
 * scroll-progress hairline.
 * Mobile & Tablet (< 1024px): React Bits StaggeredMenu with GSAP staggered layers.
 */
const SECTION_GROUPS = [
  { nav: 'contact', ids: ['contact'] },
  { nav: 'projects', ids: ['clients', 'upcoming-projects', 'projects'] },
  { nav: 'team', ids: ['team'] },
  { nav: 'services', ids: ['technologies', 'process', 'services'] },
  { nav: 'about', ids: ['mission-vision', 'about'] },
  { nav: 'home', ids: ['home'] },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isScrolled, setIsScrolled] = useState(false)

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const menuItems: StaggeredMenuItem[] = navLinks.map((link) => ({
    label: link.label,
    link: link.href,
    ariaLabel: `Go to ${link.label} section`,
  }))

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Email', link: `mailto:${siteConfig.email}` },
    { label: 'Call us', link: siteConfig.phoneHref },
    { label: 'Contact', link: '#contact' },
  ]

  // Track active section both when scrolling down and scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 12)

      if (scrollY < 180) {
        setActiveSection('home')
        return
      }

      const scrollBottom = window.innerHeight + scrollY
      const docHeight = document.documentElement.scrollHeight
      if (docHeight - scrollBottom < 80) {
        setActiveSection('contact')
        return
      }

      const focalY = 160
      for (const group of SECTION_GROUPS) {
        for (const id of group.ids) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= focalY && rect.bottom >= focalY) {
              setActiveSection(group.nav)
              return
            }
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace(/^#/, '')
    const el = document.getElementById(targetId)
    if (el) {
      const headerOffset = 70
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      window.history.pushState(null, '', `#${targetId}`)
      setActiveSection(targetId)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState(null, '', '/')
    setActiveSection('home')
  }

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
          className={`relative glass-bar${
            isScrolled ? ' glass-bar--scrolled' : ''
          }`}
          style={{
            height: isScrolled ? 58 : 66,
            padding: 0,
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none',
            borderBottom: '1px solid rgba(0, 87, 231, 0.12)',
            transition: 'height .3s ease',
            pointerEvents: 'auto',
          }}
        >
          <div className="container flex items-center justify-between h-full" style={{ gap: 12 }}>
            <a
              href="#home"
              onClick={handleLogoClick}
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
            </a>

            {/* Navigation — desktop (>= 1024px) */}
            {isDesktop && (
              <nav
                className="flex items-center"
                aria-label="Main navigation"
                style={{ marginLeft: 'auto', marginRight: 0, gap: 4 }}
              >
                {navLinks.map((link) => {
                  const targetId = link.href.replace(/^#/, '')
                  const active = activeSection === targetId
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`nav-pill-link relative transition-colors duration-200 ${
                        active ? 'nav-pill-link--active' : ''
                      }`}
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.94rem',
                        fontWeight: active ? 700 : 500,
                        color: active ? 'var(--color-primary)' : 'var(--color-text)',
                      }}
                    >
                      <span>{link.label}</span>
                    </a>
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
                activeSection={activeSection}
                displaySocials={true}
                displayItemNumbering={false}
                accentColor="#0057E7"
                menuButtonColor="#0057E7"
                openMenuButtonColor="#0F172A"
                logoUrl="/marvel-softwares-logo-removebg-preview.png"
                headerHeight={isScrolled ? 58 : 66}
                headerPadding="0"
                closeOnClickAway={true}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

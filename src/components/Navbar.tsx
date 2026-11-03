import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { navLinks, siteConfig } from '../data/siteData'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { StaggeredMenu, type StaggeredMenuItem, type StaggeredMenuSocialItem } from './StaggeredMenu'
import { trackSectionNavigation } from '../utils/analytics'

/**
 * Sticky site header — modern glass treatment.
 * Desktop (>= 1024px): pill-style nav group with a spring-animated active indicator,
 * scroll-progress hairline.
 * Mobile & Tablet (< 1024px): React Bits StaggeredMenu with GSAP staggered layers.
 */
const SECTIONS_IN_ORDER = [
  { id: 'home', nav: 'home' },
  { id: 'about', nav: 'about' },
  { id: 'mission-vision', nav: 'about' },
  { id: 'services', nav: 'services' },
  { id: 'process', nav: 'services' },
  { id: 'technologies', nav: 'services' },
  { id: 'why-choose-us', nav: 'services' },
  { id: 'team', nav: 'team' },
  { id: 'projects', nav: 'projects' },
  { id: 'upcoming-projects', nav: 'projects' },
  { id: 'clients', nav: 'projects' },
  { id: 'testimonials', nav: 'projects' },
  { id: 'contact', nav: 'contact' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isScrolled, setIsScrolled] = useState(false)

  const navigate = useNavigate()
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

  // Track active section reliably both when scrolling down and scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 12)

      if (scrollY < 120) {
        setActiveSection('home')
        return
      }

      // Check if user reached absolute bottom of page
      const scrollBottom = window.innerHeight + scrollY
      const docHeight = document.documentElement.scrollHeight
      if (docHeight - scrollBottom < 40) {
        setActiveSection('contact')
        return
      }

      const headerHeight = 70
      const viewportHeight = window.innerHeight

      // Measure visible pixel height for each nav category
      const visibility: Record<string, number> = {
        home: 0,
        about: 0,
        services: 0,
        team: 0,
        projects: 0,
        contact: 0,
      }

      for (const section of SECTIONS_IN_ORDER) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          const top = Math.max(rect.top, headerHeight)
          const bottom = Math.min(rect.bottom, viewportHeight)
          const visible = Math.max(0, bottom - top)
          if (visible > 0) {
            visibility[section.nav] = (visibility[section.nav] || 0) + visible
          }
        }
      }

      let maxNav = 'home'
      let maxVisible = -1
      for (const [nav, vis] of Object.entries(visibility)) {
        if (vis > maxVisible) {
          maxVisible = vis
          maxNav = nav
        }
      }

      if (maxVisible > 40) {
        setActiveSection(maxNav)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace(/^#/, '')
    trackSectionNavigation(targetId, 'navbar')
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
    } else {
      navigate(`/#${targetId}`)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    trackSectionNavigation('home', 'navbar')
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            borderBottom: isScrolled
              ? '1px solid rgba(226, 232, 240, 0.85)'
              : '1px solid rgba(0, 87, 231, 0.08)',
            background: isScrolled
              ? 'rgba(255, 255, 255, 0.8)'
              : '#ffffff',
            backdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
            boxShadow: isScrolled
              ? '0 4px 24px -2px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)'
              : '0 1px 0 rgba(0, 31, 128, 0.06)',
            transition: 'all .3s ease',
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
                src="/images/brand/logo.avif"
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
                logoUrl="/images/brand/logo.avif"
                headerHeight={isScrolled ? 58 : 66}
                headerPadding="0 20px 0 0"
                closeOnClickAway={true}
                onItemClick={(item) => {
                  const targetId = item.link.replace(/^(\/)?#/, '')
                  trackSectionNavigation(targetId, 'mobile-drawer')
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

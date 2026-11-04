import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { homeServices, navLinks, services, siteConfig } from '../data/siteData'
import { MailIcon, PhoneIcon, MapPinIcon } from './Icons'
import { trackSectionNavigation, trackContactClick, trackCtaClick } from '../utils/analytics'
import { openConsentBanner } from '../utils/consent'

const CURRENT_YEAR = new Date().getFullYear()

// Footer-only: hide the Team link (navbar keeps it)
const footerNavLinks = navLinks.filter((link) => link.href !== '#team')

// Footer-only label overrides (site nav stays as-is)
const footerLinkLabels: Record<string, string> = {
  '#about': 'About Us',
  '#services': 'Our Service',
  '#projects': 'Our Project',
  '#contact': 'Contact Us',
}

const socialLinks = [
  { label: 'YouTube', href: 'https://www.youtube.com/', color: '#ff0000', icon: 'youtube' },
  { label: 'Instagram', href: 'https://www.instagram.com/', color: '#e1306c', icon: 'instagram' },
  { label: 'X', href: 'https://x.com/', color: '#000000', icon: 'x' },
  { label: 'Facebook', href: 'https://www.facebook.com/', color: '#1877f2', icon: 'facebook' },
] as const

function SocialIcon({ type }: { type: (typeof socialLinks)[number]['icon'] }) {
  if (type === 'youtube') {
    return (
      <path
        fill="currentColor"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z"
      />
    )
  }
  if (type === 'instagram') {
    return (
      <path
        fill="currentColor"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
      />
    )
  }
  if (type === 'facebook') {
    return (
      <path
        fill="currentColor"
        d="M13.5 22v-9h3l.5-3h-3.5V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.8v9h3.2Z"
      />
    )
  }
  return (
    <path
      fill="currentColor"
      d="M18.9 2h3.7l-8.1 9.3L24 22h-7.5l-5.9-7.2L4.3 22H.6l8.7-10L0 2h7.7l5.3 6.6L18.9 2Zm-1.3 18h2L6.5 3.9H4.4L17.6 20Z"
    />
  )
}

export function Footer() {
  const navigate = useNavigate()

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace(/^#/, '')
    trackSectionNavigation(targetId, 'footer')
    const el = document.getElementById(targetId)
    if (el) {
      const headerOffset = 70
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      window.history.pushState(null, '', href)
    } else {
      navigate(`/#${targetId}`)
    }
  }

  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        MARVEL SOFTWARES footer
      </h2>

      {/* Top subtle ambient glow backdrop */}
      <div className="footer-glow" aria-hidden="true" />

      <div className="container relative z-10">
        {/* --- 5-Column Balanced Grid --- */}
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-brand-col">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              aria-label="MARVEL SOFTWARES — Back to top"
              className="footer-logo"
            >
              <img
                src="/images/brand/logo.avif"
                alt="MARVEL SOFTWARES"
                width={140}
                height={70}
                loading="lazy"
                decoding="async"
                style={{ maxHeight: 70, width: 'auto', display: 'block' }}
              />
            </a>

            <p className="footer-tagline">
              Engineering high-performance software, custom ERP platforms, modern web & mobile applications, and AI automations for forward-thinking enterprises worldwide.
            </p>

            <div className="footer-social-links" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={`Marvel Softwares on ${social.label}`}
                  title={social.label}
                  style={{ color: social.color }}
                  onClick={() => trackContactClick('social', social.label)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <SocialIcon type={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <nav className="footer-col footer-services-col" aria-label="Our services">
            <h3 className="footer-col-title">Our Services</h3>
            <ul className="footer-col-list">
              {homeServices.map((id) => {
                const service = services.find((s) => s.id === id)
                if (!service) return null
                return (
                  <li key={service.id}>
                    <a
                      href={`/#${service.id}`}
                      onClick={(e) => scrollToSection(e, `/#${service.id}`)}
                      className="footer-link"
                    >
                      {service.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Col 3: Explore */}
          <nav className="footer-col footer-explore-col" aria-label="Useful links">
            <h3 className="footer-col-title">Useful Links</h3>
            <ul className="footer-col-list">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="footer-link"
                  >
                    {footerLinkLabels[link.href] ?? link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Other ventures */}
          <nav className="footer-col footer-ventures-col" aria-label="Other websites">
            <h3 className="footer-col-title">Other Websites</h3>
            <ul className="footer-col-list">
              <li>
                <a
                  href="https://www.marvelslice.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-venture-link"
                  onClick={() => trackCtaClick('www.marvelslice.com', 'https://www.marvelslice.com/')}
                >
                  www.marvelslice.com
                </a>
              </li>
              <li>
                <a
                  href="https://lms.marvelslice.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-venture-link"
                  onClick={() => trackCtaClick('lms.marvelslice.com/login', 'https://lms.marvelslice.com/login')}
                >
                  lms.marvelslice.com/login
                </a>
              </li>
              <li>
                <a
                  href="https://www.marvelvillas.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-venture-link"
                  onClick={() => trackCtaClick('www.marvelvillas.com', 'https://www.marvelvillas.com/')}
                >
                  www.marvelvillas.com
                </a>
              </li>
            </ul>
          </nav>

          {/* Col 5: Reach Us */}
          <div className="footer-col footer-reach-col" aria-label="Reach us">
            <h3 className="footer-col-title">Reach Us</h3>
            <ul className="footer-contact-list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="footer-contact-item"
                  onClick={() => trackContactClick('email', siteConfig.email)}
                >
                  <MailIcon className="w-4 h-4 shrink-0 text-blue-400 mt-1" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <div className="footer-contact-item">
                  <PhoneIcon className="w-4 h-4 shrink-0 text-blue-400 mt-1" />
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 text-[0.88rem]">
                    <a
                      href={siteConfig.phoneHref}
                      className="hover:text-blue-400 transition-colors whitespace-nowrap"
                      onClick={() => trackContactClick('phone', siteConfig.phone)}
                    >
                      {siteConfig.phone}
                    </a>
                    <span aria-hidden="true" className="text-slate-500">|</span>
                    <a
                      href={siteConfig.phone2Href}
                      className="hover:text-blue-400 transition-colors whitespace-nowrap"
                      onClick={() => trackContactClick('phone', siteConfig.phone2)}
                    >
                      {siteConfig.phone2}
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="footer-contact-item">
                  <svg className="w-4 h-4 shrink-0 text-blue-400 mt-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span>Monday – Friday</span>
                    <span className="whitespace-nowrap">9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="footer-contact-item footer-contact-item--location">
                  <MapPinIcon className="w-4 h-4 shrink-0 text-blue-400" />
                  <span>{siteConfig.location}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Legal Bar --- */}
      <div className="footer-bottom-wrap">
        <div className="container footer-bottom">
          {/* Left spacer keeps the copyright centered in the 1fr auto 1fr grid (desktop grid only) */}
          <div className="footer-bottom-spacer" aria-hidden="true" />
          <p className="footer-copyright">
            © {CURRENT_YEAR} MARVEL SOFTWARES. All rights reserved.
          </p>
          <div className="footer-bottom-legal">
            <button
              type="button"
              onClick={openConsentBanner}
              className="hover:text-blue-100 transition-colors underline underline-offset-2 cursor-pointer bg-transparent border-0 p-0 text-white"
            >
              Cookie Preferences
            </button>
            <span aria-hidden="true" className="text-white/50">|</span>
            <a
              href="/#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hover:text-blue-100 transition-colors"
            >
              Privacy & Inquiries
            </a>
            <span aria-hidden="true" className="text-white/50">|</span>
            <Link
              to="/faq"
              className="hover:text-blue-100 transition-colors"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
              }}
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

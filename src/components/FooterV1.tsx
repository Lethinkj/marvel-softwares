import React from 'react'
import { homeServices, navLinks, services, siteConfig } from '../data/siteData'
import { MailIcon, PhoneIcon, MapPinIcon } from './Icons'

const CURRENT_YEAR = new Date().getFullYear()

const socialLinks = [
  { label: 'YouTube', href: 'https://www.youtube.com/', color: '#ff0000', icon: 'youtube' },
  { label: 'Instagram', href: 'https://www.instagram.com/', color: '#e1306c', icon: 'instagram' },
  { label: 'X', href: 'https://x.com/', color: '#000000', icon: 'x' },
  { label: 'Facebook', href: 'https://www.facebook.com/', color: '#1877f2', icon: 'facebook' },
] as const

function SocialIcon({ type }: { type: (typeof socialLinks)[number]['icon'] }) {
  if (type === 'youtube') {
    return <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
  }
  if (type === 'instagram') {
    return <path fill="currentColor" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
  }
  if (type === 'facebook') {
    return <path fill="currentColor" d="M13.5 22v-9h3l.5-3h-3.5V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.8v9h3.2Z" />
  }
  return <path fill="currentColor" d="M18.9 2h3.7l-8.1 9.3L24 22h-7.5l-5.9-7.2L4.3 22H.6l8.7-10L0 2h7.7l5.3 6.6L18.9 2Zm-1.3 18h2L6.5 3.9H4.4L17.6 20Z" />
}

export function FooterV1() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace(/^#/, '')
    const el = document.getElementById(targetId)
    if (el) {
      const headerOffset = 70
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      window.history.pushState(null, '', href)
    }
  }

  return (
    <footer className="site-footer" aria-labelledby="footer-v1-heading">
      <h2 id="footer-v1-heading" className="sr-only">
        MARVEL SOFTWARES footer
      </h2>

      {/* Top subtle ambient glow backdrop */}
      <div className="footer-glow" aria-hidden="true" />

      <div className="container relative z-10">
        {/* --- 4-Column Balanced Grid --- */}
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
                src="/marvel-softwares-logo-removebg-preview.png"
                alt="MARVEL SOFTWARES"
                width={140}
                height={70}
                loading="lazy"
                decoding="async"
                style={{ maxHeight: 70, width: 'auto', display: 'block' }}
              />
            </a>

            <p className="footer-tagline">
              We build scalable websites, high-performance web applications, mobile platforms, and enterprise ERP software tailored to help modern organizations grow and operate smarter.
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
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <SocialIcon type={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services (Fills the missing gap) */}
          <nav className="footer-col" aria-label="Services navigation">
            <h3 className="footer-col-title">Services</h3>
            <ul className="footer-col-list">
              {homeServices.map((id) => {
                const service = services.find((s) => s.id === id)
                if (!service) return null
                return (
                  <li key={service.id}>
                    <a
                      href="#services"
                      onClick={(e) => scrollToSection(e, '#services')}
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
          <nav className="footer-col" aria-label="Explore navigation">
            <h3 className="footer-col-title">Explore</h3>
            <ul className="footer-col-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Other ventures */}
          <nav className="footer-col" aria-label="Other ventures">
            <h3 className="footer-col-title">Our Other Ventures</h3>
            <ul className="footer-col-list">
              <li>
                <a
                  href="https://marvelslice.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Marvel Slice
                </a>
              </li>
              <li>
                <a
                  href="https://lms.marvelslice.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  MarvelSlice LMS
                </a>
              </li>
            </ul>
          </nav>

          {/* Col 5: Reach Us */}
          <div className="footer-col" aria-label="Reach us">
            <h3 className="footer-col-title">Reach Us</h3>
            <ul className="footer-contact-list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="footer-contact-item"
                >
                  <MailIcon className="w-4 h-4 shrink-0 text-blue-400 mt-1" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <div className="footer-contact-item">
                  <PhoneIcon className="w-4 h-4 shrink-0 text-blue-400 mt-1" />
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 text-[0.88rem]">
                    <a href={siteConfig.phoneHref} className="hover:text-blue-400 transition-colors whitespace-nowrap">
                      {siteConfig.phone}
                    </a>
                    <span aria-hidden="true" className="text-slate-500">|</span>
                    <a href={siteConfig.phone2Href} className="hover:text-blue-400 transition-colors whitespace-nowrap">
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
                  <span>{siteConfig.hours}</span>
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
          <p className="footer-copyright">
            © {CURRENT_YEAR} MARVEL SOFTWARES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterV1

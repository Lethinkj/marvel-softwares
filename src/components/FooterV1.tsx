import React from 'react'
import { homeServices, navLinks, services, siteConfig } from '../data/siteData'
import { MailIcon, PhoneIcon, MapPinIcon, WhatsAppIcon } from './Icons'

const CURRENT_YEAR = new Date().getFullYear()

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

            {/* Direct contact action badges */}
            <div className="footer-contact-actions">
              <a
                href={`mailto:${siteConfig.email}`}
                className="footer-action-btn"
                aria-label="Email Marvel Softwares"
                title="Send us an email"
              >
                <MailIcon className="w-4 h-4" />
                <span>Email Us</span>
              </a>
              <a
                href={siteConfig.phoneHref}
                className="footer-action-btn"
                aria-label="Call Marvel Softwares"
                title="Call our support team"
              >
                <PhoneIcon className="w-4 h-4" />
                <span>Call Us</span>
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-action-btn footer-action-btn--whatsapp"
                aria-label="Chat with Marvel Softwares on WhatsApp"
                title="Chat with us on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
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

          {/* Col 4: Reach Us */}
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
                  <div className="flex flex-wrap items-center gap-x-2 text-[0.88rem]">
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
              <li className="footer-contact-item">
                <svg className="w-4 h-4 shrink-0 text-blue-400 mt-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{siteConfig.hours}</span>
              </li>
              <li className="footer-contact-item">
                <MapPinIcon className="w-4 h-4 shrink-0 text-blue-400 mt-1" />
                <span>{siteConfig.location}</span>
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
          <ul className="footer-legal">
            <li>
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default FooterV1

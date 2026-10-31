import { Link } from 'react-router-dom'
import { navLinks, siteConfig } from '../data/siteData'
import { MailIcon, PhoneIcon } from './Icons'

/**
 * FooterV1 — editorial dark footer.
 * Brand column with logo and description on the left;
 * Explore (all main pages) and Reach us on the right.
 */

const CURRENT_YEAR = new Date().getFullYear()

export function FooterV1() {
  return (
    <footer className="site-footer" aria-labelledby="footer-v1-heading">
      <h2 id="footer-v1-heading" className="sr-only">
        MARVEL SOFTWARES footer
      </h2>

      <div className="container">
        {/* --- Columns --- */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" aria-label="MARVEL SOFTWARES — Home" className="footer-logo">
              <img
                src="/marvel-softwares-logo-removebg-preview.png"
                alt="MARVEL SOFTWARES"
                width={150}
                height={90}
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p className="footer-tagline">
              We build websites, applications, enterprise systems and custom software
              solutions that help businesses solve challenges and move forward with
              technology.
            </p>

            <div className="footer-contact">
              <a href={`mailto:${siteConfig.email}`} aria-label="Email us">
                <MailIcon className="w-4 h-4" />
              </a>
              <a href={siteConfig.phoneHref} aria-label="Call us">
                <PhoneIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <nav className="footer-col" aria-label="Explore">
              <h3 className="footer-col-title">Explore</h3>
              <ul className="footer-col-list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        const targetId = link.href.replace(/^#/, '')
                        const el = document.getElementById(targetId)
                        if (el) {
                          const headerOffset = 70
                          const elementPosition = el.getBoundingClientRect().top
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                          window.history.pushState(null, '', link.href)
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-col" aria-label="Reach us">
              <h3 className="footer-col-title">Reach us</h3>

              {/* Contact details */}
              <ul className="footer-col-list footer-col-list--details">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="footer-detail-link whitespace-nowrap">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="footer-detail-phones">
                  <a href={siteConfig.phoneHref} className="footer-detail-link">
                    {siteConfig.phone}
                  </a>
                  <a href={siteConfig.phone2Href} className="footer-detail-link">
                    {siteConfig.phone2}
                  </a>
                </li>
                <li className="footer-detail-note">{siteConfig.hours}</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* --- Legal bar (Blue Theme, No Border Radius) --- */}
      <div className="footer-bottom-wrap">
        <div className="container footer-bottom">
          <p className="footer-copyright">
            © {CURRENT_YEAR} MARVEL SOFTWARES. All rights reserved.
          </p>
          <ul className="footer-legal">
            <li>
              <a href="#contact">Contact & Support</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default FooterV1

import { Link } from 'react-router-dom'
import { navLinks, services, siteConfig } from '../data/siteData'
import { MailIcon, PhoneIcon } from './Icons'

/**
 * FooterV1 — editorial dark footer.
 * A brand column with the logo and contact actions, the site's own menu
 * split across three hairline-topped columns, an oversized outlined
 * wordmark and a slim legal bar.
 */

const CURRENT_YEAR = new Date().getFullYear()

/** The same six services the site leads with. */
const PRODUCT_LINKS = services.slice(0, 6).map((service) => ({
  label: service.title,
  to: `/services#${service.id}`,
}))

export function FooterV1() {
  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

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

          <nav className="footer-col" aria-label="Explore">
            <h3 className="footer-col-title">Explore</h3>
            <ul className="footer-col-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Services">
            <h3 className="footer-col-title">Services</h3>
            <ul className="footer-col-list">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Reach us">
            <h3 className="footer-col-title">Reach us</h3>

            {/* Contact details */}
            <ul className="footer-col-list footer-col-list--details">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="footer-detail-link break-anywhere">
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

        {/* --- Oversized wordmark --- */}
        <div className="footer-wordmark" aria-hidden="true">
          <span>MARVEL SOFTWARES</span>
        </div>

        {/* --- Legal bar --- */}
        <div className="footer-bottom">
          <p>
            © {CURRENT_YEAR} MARVEL SOFTWARES. All rights reserved.
          </p>
          <ul className="footer-legal">
            <li>
              <Link to="/privacy">Privacy policy</Link>
            </li>
            <li>
              <button type="button" onClick={scrollToTop}>
                Back to top
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default FooterV1

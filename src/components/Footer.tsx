import { Link } from 'react-router-dom'
import { navLinks, services, siteConfig } from '../data/siteData'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Deep-navy footer. Original logo, honest company
 * description, verified contact details only, dynamic
 * copyright year. Social links omitted — no verified
 * profile URLs are configured.
 */
export function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="text-white"
      style={{ background: '#1e312f' }}
    >
      <h2 id="footer-heading" className="sr-only">
        MARVEL SOFTWARES footer
      </h2>

      <div className="container" style={{ paddingBlock: '64px 28px' }}>
        <div
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12"
          style={{ columnGap: 'var(--card-gap)' }}
        >
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="MARVEL SOFTWARES — Home" className="inline-block rounded-md">
              <img
                src="/marvel-softwares-logo-removebg-preview.png"
                alt="MARVEL SOFTWARES"
                width={180}
                height={120}
                style={{ width: '120px', height: 'auto' }}
              />
            </Link>
            <p
              className="mt-5 text-[15px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,.82)', maxWidth: '38ch' }}
            >
              MARVEL SOFTWARES builds websites, applications, enterprise systems and custom
              software solutions that help businesses solve challenges, streamline operations
              and move forward with technology.
            </p>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer pages">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/60 mb-4">
              Explore
            </h3>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center min-h-[40px] text-[15px] font-medium text-white/85 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav className="lg:col-span-3" aria-label="Footer services">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/60 mb-4">
              Our Services
            </h3>
            <ul className="flex flex-col gap-1">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center min-h-[40px] text-[15px] font-medium text-white/85 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/60 mb-4">
              Work With Us
            </h3>
            <ul className="flex flex-col gap-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-white hover:underline break-anywhere"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.phoneHref} className="text-white/85 hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-white/70 text-sm leading-relaxed">{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/65"
          style={{ borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 24 }}
        >
          <p>© {CURRENT_YEAR} MARVEL SOFTWARES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

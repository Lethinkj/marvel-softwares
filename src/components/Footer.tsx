import { Link } from 'react-router-dom'
import { navLinks, services, siteConfig } from '../data/siteData'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Deep-navy footer — fully aligned, responsive 4-column grid.
 * Mobile: stacked single column
 * Tablet (md): 2×2 grid
 * Desktop (lg): 4 equal columns
 */
export function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="text-white"
      style={{ background: '#111827' }}
    >
      <h2 id="footer-heading" className="sr-only">
        MARVEL SOFTWARES footer
      </h2>

      <div className="container" style={{ paddingBlock: '72px 0' }}>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">

          {/* Col 1 – Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" aria-label="MARVEL SOFTWARES — Home" className="inline-block">
              <img
                src="/marvel-softwares-logo-removebg-preview.png"
                alt="MARVEL SOFTWARES"
                style={{ width: '170px', height: 'auto' }}
              />
            </Link>
            <p
              className="mt-4 text-[14.5px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,.72)', maxWidth: '36ch' }}
            >
              We build websites, web apps, mobile apps, ERP systems and custom software
              that help businesses grow and operate smarter.
            </p>

            {/* Contact info inline under description */}
            <div className="mt-5 flex flex-col gap-2 text-[13.5px]" style={{ color: 'rgba(255,255,255,.65)' }}>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white transition-colors break-all"
              >
                {siteConfig.email}
              </a>
              <div className="flex flex-wrap items-center gap-x-2">
                <a href={siteConfig.phoneHref} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
                <span aria-hidden="true" className="opacity-40">|</span>
                <a href={siteConfig.phone2Href} className="hover:text-white transition-colors">
                  {siteConfig.phone2}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2 – Explore */}
          <nav aria-label="Footer pages">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] mb-5" style={{ color: 'rgba(255,255,255,.45)' }}>
              Explore
            </h3>
            <ul className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center min-h-[38px] text-[14.5px] font-medium transition-colors"
                    style={{ color: 'rgba(255,255,255,.78)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.78)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 – Services */}
          <nav aria-label="Footer services">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] mb-5" style={{ color: 'rgba(255,255,255,.45)' }}>
              Services
            </h3>
            <ul className="flex flex-col gap-0.5">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/#${service.id}`}
                    className="inline-flex items-center min-h-[38px] text-[14.5px] font-medium transition-colors"
                    style={{ color: 'rgba(255,255,255,.78)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.78)')}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 – More Services */}
          <nav aria-label="Footer more services">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] mb-5" style={{ color: 'rgba(255,255,255,.45)' }}>
              More Services
            </h3>
            <ul className="flex flex-col gap-0.5">
              {services.slice(6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/#${service.id}`}
                    className="inline-flex items-center min-h-[38px] text-[14.5px] font-medium transition-colors"
                    style={{ color: 'rgba(255,255,255,.78)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.78)')}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Address under More Services col */}
            <p
              className="mt-5 text-[13px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,.45)' }}
            >
              {siteConfig.location}
            </p>
          </nav>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 text-[13px]"
          style={{ borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: '24px', paddingBottom: '28px', color: 'rgba(255,255,255,.45)' }}
        >
          <p>© {CURRENT_YEAR} MARVEL SOFTWARES. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer

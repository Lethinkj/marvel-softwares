import React from 'react'
import { Link } from 'react-router-dom'
import { renderAppIcon } from '../utils/iconResolver'
import { homeServices, services } from '../data/siteData'

const featured = homeServices
  .map((id) => services.find((service) => service.id === id))
  .filter((service): service is (typeof services)[number] => Boolean(service))

/**
 * Services CTA — "find the solution that fits".
 * A deep blue panel with the headline on top and a strip of solution tiles
 * below, so a visitor can jump straight to the service they need.
 */
export const ServicesCta: React.FC = () => (
  <section aria-labelledby="services-cta" className="section services-cta-section">
    <div className="container">
      <div className="svc-cta-panel">
        {/* Decorative brand artwork */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1200 620"
          preserveAspectRatio="xMidYMid slice"
          className="svc-cta-art"
        >
          <defs>
            <radialGradient id="svc-cta-glow-a" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#00cfff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00cfff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="svc-cta-glow-b" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ff5a00" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#ff5a00" stopOpacity="0" />
            </radialGradient>
            <pattern id="svc-cta-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#ffffff" opacity="0.14" />
            </pattern>
          </defs>

          <ellipse cx="1040" cy="80" rx="400" ry="280" fill="url(#svc-cta-glow-a)" />
          <ellipse cx="120" cy="580" rx="360" ry="240" fill="url(#svc-cta-glow-b)" />
          <rect width="1200" height="620" fill="url(#svc-cta-dots)" />

          <g fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1.5">
            <circle cx="1090" cy="300" r="170" />
            <circle cx="1090" cy="300" r="240" />
            <circle cx="1090" cy="300" r="310" />
          </g>

          <g className="svg-float" strokeLinecap="round" strokeWidth="3">
            <path d="M96 96 v18 M87 105 h18" stroke="#00cfff" opacity="0.6" />
          </g>
        </svg>

        <div className="svc-cta-inner">
          <div className="svc-cta-head">
            <span className="svc-cta-eyebrow">
              <span className="svc-cta-eyebrow-dot" aria-hidden="true" />
              Not sure where to start?
            </span>
            <h2 id="services-cta" className="svc-cta-title">
              Find the solution that fits your business
            </h2>
            <p className="svc-cta-text">
              Pick the closest match below and read what it covers — or describe the
              problem and we&apos;ll recommend the right approach for you.
            </p>
          </div>

          <ul className="svc-cta-tiles">
            {featured.map((service) => (
              <li key={service.id}>
                <a href={`#${service.id}`} className="svc-cta-tile">
                  <span className="svc-cta-tile-icon" aria-hidden="true">
                    {renderAppIcon(service.icon, 'w-5 h-5')}
                  </span>
                  <span className="svc-cta-tile-title">{service.title}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="svc-cta-actions">
            <Link to="/contact" className="svc-cta-btn svc-cta-btn--primary">
              Discuss Your Project
            </Link>
            <Link to="/projects" className="svc-cta-btn svc-cta-btn--ghost">
              See our work
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default ServicesCta

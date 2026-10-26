import React from 'react'
import { Link } from 'react-router-dom'
import { renderAppIcon } from '../utils/iconResolver'
import AnimatedSection from './AnimatedSection'
import { ServiceScene } from './illustrations/ServiceScenes'
import { homeServices, services } from '../data/siteData'

/**
 * ServiceShowcase
 * Alternating "story" rows for the home-page services section:
 * one custom illustration + one content block, swapping sides row by row.
 * The copy card is translucent and sits over the edge of the artwork so
 * image and content read as a single canvas.
 */
export const ServiceShowcase: React.FC = () => {
  const overview = homeServices
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is (typeof services)[number] => Boolean(s))

  return (
    <div className="svc-showcase">
      {overview.map((service, i) => {
        const flip = i % 2 === 1
        return (
          <AnimatedSection
            key={service.id}
            as="div"
            direction="up"
            className={`svc-showcase-row${flip ? ' is-flip' : ''}`}
          >
            <div className="svc-media">
              <ServiceScene id={`svc${i}`} serviceId={service.id} />
            </div>

            <div className="svc-copy">
              <span className="svc-copy-badge" aria-hidden="true">
                {renderAppIcon(service.icon, 'w-5 h-5')}
              </span>
              <h3 className="svc-copy-title">{service.title}</h3>
              <p className="svc-copy-headline">{service.headline}</p>
              <p className="text-body" style={{ marginTop: 10 }}>
                {service.description}
              </p>

              <ul className="svc-copy-list">
                {service.capabilities.slice(0, 4).map((c) => (
                  <li key={c}>
                    <span className="svc-copy-tick" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
                        <path
                          d="M3 8.4l3.2 3.2L13 4.8"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {c}
                  </li>
                ))}
              </ul>

              <Link to={`/services#${service.id}`} className="svc-copy-cta">
                Learn more
              </Link>
            </div>
          </AnimatedSection>
        )
      })}
    </div>
  )
}

export default ServiceShowcase

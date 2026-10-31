import React from 'react'
import AnimatedSection from './AnimatedSection'
import { ServiceScene } from './illustrations/ServiceScenes'
import { homeServices, services } from '../data/siteData'

/**
 * ServiceShowcase
 * Alternating rows for the home-page services section:
 * image (35%) + content (65%), swapping sides row by row.
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

            <div className="svc-copy text-left">
              {/* Single h3 heading */}
              <h3 className="svc-copy-title">{service.title}</h3>

              {/* Main narrative content */}
              <p className="text-body text-slate-600 text-left leading-relaxed text-base sm:text-lg">
                {service.paragraphs?.[0] ?? service.description}
              </p>
            </div>
          </AnimatedSection>
        )
      })}
    </div>
  )
}

export default ServiceShowcase

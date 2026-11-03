import React from 'react'
import AnimatedSection from './AnimatedSection'
import { ServiceScene } from './illustrations/ServiceScenes'
import { homeServices, services } from '../data/siteData'

/**
 * ServiceShowcase
 * Responsive service presentation:
 * Mobile view (< 992px): First Heading, then Image (ServiceScene), then Contents.
 * Desktop view (>= 992px): Alternating rows of Image (40%) and Content (60%).
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
            {/* 1. Mobile-only heading (First on mobile view) */}
            <div className="svc-mobile-header">
              <h3 className="svc-copy-title text-left">{service.title}</h3>
            </div>

            {/* 2. Media / Image (Second on mobile view) */}
            <div className="svc-media">
              <ServiceScene id={`svc${i}`} serviceId={service.id} />
            </div>

            {/* 3. Narrative Copy / Contents (Third on mobile view) */}
            <div className="svc-copy text-left">
              {/* Desktop-only heading (shown only on >= 992px desktop) */}
              <h3 className="svc-copy-title svc-copy-title--desktop">{service.title}</h3>

              {/* Main narrative content */}
              <p className="text-body text-slate-600 text-justify leading-relaxed text-base sm:text-lg">
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

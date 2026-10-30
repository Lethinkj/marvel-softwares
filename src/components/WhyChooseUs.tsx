import React from 'react'
import { renderAppIcon } from '../utils/iconResolver'
import AnimatedSection from './AnimatedSection'
import { whyChooseUs } from '../data/siteData'

/**
 * WhyChooseUs — "Technology That Works for Your Business"
 * Artwork on the left, the four principles as a connected rail on the right.
 * Each principle maps to a labelled card inside the illustration, so the
 * picture and the list read as one story.
 */
export const WhyChooseUs: React.FC = () => (
  <div className="why-grid">
    <AnimatedSection direction="up" className="why-media">
      <img
        src="/Connected SaaS Platform Ecosystem.png"
        alt="Connected SaaS platform ecosystem illustration"
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />
    </AnimatedSection>

    <AnimatedSection direction="up" delay={0.12} className="why-list">
      {whyChooseUs.map((item) => (
        <article key={item.title} className="why-item">
          <span className="why-item-rail" aria-hidden="true" />
          <span className="why-item-icon" aria-hidden="true">
            {renderAppIcon(item.icon, 'w-5 h-5')}
          </span>
          <div className="why-item-body">
            <h3 className="why-item-title">{item.title}</h3>
            <p className="why-item-text">{item.description}</p>
          </div>
        </article>
      ))}
    </AnimatedSection>
  </div>
)

export default WhyChooseUs

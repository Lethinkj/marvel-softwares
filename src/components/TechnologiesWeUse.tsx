import React from 'react'
import AnimatedSection from './AnimatedSection'
import { technologies } from '../data/siteData'

/**
 * Compact pill list of the modern, widely supported tools used across
 * Marvel Softwares projects.
 */
export const TechnologiesWeUse: React.FC = () => (
  <AnimatedSection as="div" className="technology-pills-wrap">
    <ul className="technology-pills" aria-label="Technologies we use">
      {technologies.map((technology, index) => (
        <li
          key={technology}
          className="technology-pill"
          style={{ '--pill-delay': `${index * 45}ms` } as React.CSSProperties}
        >
          {technology}
        </li>
      ))}
    </ul>
  </AnimatedSection>
)

export default TechnologiesWeUse

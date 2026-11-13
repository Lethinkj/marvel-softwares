import React from 'react'
import {
  BriefcaseBusiness,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  House,
  Rocket,
  ShoppingCart,
} from 'lucide-react'
import AnimatedSection from './AnimatedSection'

interface Industry {
  id: string
  title: string
  accent: string
  tint: string
  icon: React.ReactNode
}

const industries: Industry[] = [
  {
    id: 'startups',
    title: 'Startups',
    accent: '#f59e0b',
    tint: '#fff7e6',
    icon: <Rocket />,
  },
  {
    id: 'education',
    title: 'Education',
    accent: '#0b7cff',
    tint: '#eaf4ff',
    icon: <GraduationCap />,
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    accent: '#f97316',
    tint: '#fff3e8',
    icon: <ShoppingCart />,
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    accent: '#e11d48',
    tint: '#ffebf0',
    icon: <HeartPulse />,
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    accent: '#7c3aed',
    tint: '#f2ebff',
    icon: <Factory />,
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    accent: '#16a34a',
    tint: '#e9fbf0',
    icon: <House />,
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    accent: '#0ea5e9',
    tint: '#e8f7ff',
    icon: <Hotel />,
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    accent: '#0f766e',
    tint: '#e6fbf7',
    icon: <BriefcaseBusiness />,
  },
]

export const IndustriesWeServe: React.FC = () => {
  return (
    <>
      <AnimatedSection className="text-center mx-auto w-full">
        <h2 id="industries-title" className="text-section-title">
          Industries We <span className="heading-last-word">Serve</span>
        </h2>
        <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
          Solutions adapted to your sector.
        </p>
      </AnimatedSection>

      <div className="industries-flow-wrap">
        <div className="industry-flow" role="list" aria-label="Industries we serve">
          {industries.map((industry, index) => (
            <React.Fragment key={industry.id}>
              <article
                className="industry-node mild-reveal"
                role="listitem"
                style={
                  {
                    '--industry-accent': industry.accent,
                    '--industry-tint': industry.tint,
                    transitionDelay: `${index * 70}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="industry-node-icon" aria-hidden="true">
                  {industry.icon}
                </span>
                <h3 className="industry-node-name">{industry.title}</h3>
              </article>

              {index < industries.length - 1 && (
                <span
                  className="industry-flow-link mild-reveal"
                  aria-hidden="true"
                  style={
                    {
                      '--flow-delay': `${index * 0.45}s`,
                      transitionDelay: `${index * 70 + 80}ms`,
                    } as React.CSSProperties
                  }
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export default IndustriesWeServe

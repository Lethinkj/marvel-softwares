import React from 'react'
import {
  Boxes,
  CodeXml,
  Database,
  Headphones,
  Layers,
  MessageSquareMore,
  Rocket,
  ShieldCheck,
} from 'lucide-react'
import AnimatedSection from './AnimatedSection'

interface ValueCard {
  id: string
  title: [string, string]
  theme: string
  icon: React.ReactNode
}

const valueCards: ValueCard[] = [
  // Row 1
  {
    id: 'customized-solutions',
    title: ['Customized', 'Solutions'],
    theme: 'blue',
    icon: <Layers />,
  },
  {
    id: 'quality-development',
    title: ['Quality', 'Development'],
    theme: 'green',
    icon: <ShieldCheck />,
  },
  {
    id: 'end-to-end-support',
    title: ['End-to-End', 'Support'],
    theme: 'orange',
    icon: <Headphones />,
  },
  {
    id: 'scalable-architecture',
    title: ['Scalable', 'Architecture'],
    theme: 'purple',
    icon: <Boxes />,
  },
  // Row 2
  {
    id: 'modern-technologies',
    title: ['Modern', 'Technologies'],
    theme: 'pink',
    icon: <CodeXml />,
  },
  {
    id: 'affordable-pricing',
    title: ['Affordable', 'Pricing'],
    theme: 'yellow',
    icon: <Database />,
  },
  {
    id: 'on-time-delivery',
    title: ['On-Time', 'Delivery'],
    theme: 'cyan',
    icon: <Rocket />,
  },
  {
    id: 'transparent-communication',
    title: ['Transparent', 'Communication'],
    theme: 'sky',
    icon: <MessageSquareMore />,
  },
]

export const WhyChooseMarvel: React.FC = () => {
  return (
    <div className="container">
      {/* Section Header */}
      <AnimatedSection className="text-center mx-auto w-full mb-8 sm:mb-12">
        <h2 id="why-choose-us-title" className="text-section-title text-[#0033A0]">
          Why Choose Marvel <span className="heading-last-word">Softwares?</span>
        </h2>
        <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
          Your Trusted Partner for Digital Transformation
        </p>
      </AnimatedSection>

      <div className="why-marvel-grid">
        {valueCards.map((item, index) => (
          <AnimatedSection key={item.id} delay={index * 0.04} className="h-full">
            <article className={`why-marvel-card why-theme--${item.theme}`}>
              <div className="why-card-icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="why-card-title">
                {item.title[0]}
                <br />
                {item.title[1]}
              </h3>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseMarvel


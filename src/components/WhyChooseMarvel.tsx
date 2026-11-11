import React from 'react'
import {
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

const HexNetworkIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.5 14.6 4v3L12 8.5 9.4 7V4L12 2.5Z" />
    <path d="M7 13.5 9.6 15v3L7 19.5 4.4 18v-3L7 13.5Z" />
    <path d="M17 13.5 19.6 15v3L17 19.5 14.4 18v-3L17 13.5Z" />
    <path d="M12 8.5 8.1 13.1" />
    <path d="M12 8.5 15.9 13.1" />
  </svg>
)

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
    icon: HexNetworkIcon,
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
          Why Choose Marvel Softwares?
        </h2>
        <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
          Your Trusted Partner for Digital Transformation
        </p>
      </AnimatedSection>

      <div className="why-marvel-grid">
        {valueCards.map((item, index) => (
          <AnimatedSection key={item.id} delay={index * 0.04} className="h-full">
            <article className={`why-marvel-card-shell why-theme--${item.theme}`}>
              <div className="why-card-inner">
                <div className="why-card-content">
                  <div className="why-card-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3 className="text-card-title why-card-title">
                    {item.title[0]}
                    <br />
                    {item.title[1]}
                  </h3>
                </div>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseMarvel

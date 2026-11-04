import React from 'react'
import AnimatedSection from './AnimatedSection'

interface ValueCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  iconGradient: string
  iconShadow: string
  waveFrom: string
  waveTo: string
}

const valueCards: ValueCard[] = [
  // Row 1
  {
    id: 'customized-solutions',
    title: 'Customized Solutions',
    description: 'Every business is different. We develop tailored software solutions that align with your specific requirements, workflows, and business objectives.',
    iconGradient: 'from-[#0070F3] to-[#0052CC]',
    iconShadow: 'shadow-blue-500/25',
    waveFrom: '#93C5FD',
    waveTo: '#2563EB', // 1. Royal Blue
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 12l10 5 10-5" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'quality-development',
    title: 'Quality Development',
    description: 'We follow structured development practices with a strong focus on code quality, application performance, security, and reliability.',
    iconGradient: 'from-[#10B981] to-[#059669]',
    iconShadow: 'shadow-emerald-500/25',
    waveFrom: '#86EFAC',
    waveTo: '#10B981', // 2. Vibrant Green
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'end-to-end-support',
    title: 'End-to-End Support',
    description: 'From initial consultation and planning to development, deployment, and ongoing maintenance, we support you throughout the entire project lifecycle.',
    iconGradient: 'from-[#FF7A00] to-[#EA580C]',
    iconShadow: 'shadow-orange-500/25',
    waveFrom: '#FDBA74',
    waveTo: '#F97316', // 3. Bright Orange
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    id: 'scalable-architecture',
    title: 'Scalable Architecture',
    description: 'Our applications are built with flexible architectures that adapt to evolving business requirements, increasing workloads, and future expansion.',
    iconGradient: 'from-[#8B5CF6] to-[#6D28D9]',
    iconShadow: 'shadow-purple-500/25',
    waveFrom: '#C4B5FD',
    waveTo: '#8B5CF6', // 4. Purple
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l4 2.3v4.6L12 11.2l-4-2.3V4.3L12 2z" />
        <path d="M6 12.8l4 2.3v4.6l-4 2.3-4-2.3v-4.6l4-2.3z" />
        <path d="M18 12.8l4 2.3v4.6l-4 2.3-4-2.3v-4.6l4-2.3z" />
        <path d="M12 6.6l4-2.3" />
        <path d="M12 6.6L8 4.3" />
        <path d="M12 6.6v4.6" />
      </svg>
    ),
  },
  // Row 2
  {
    id: 'modern-technologies',
    title: 'Modern Technologies',
    description: 'We leverage modern frameworks, development tools, and emerging technologies to build efficient, adaptable, and future-ready software solutions.',
    iconGradient: 'from-[#F43F5E] to-[#E11D48]',
    iconShadow: 'shadow-rose-500/25',
    waveFrom: '#FDA4AF',
    waveTo: '#F43F5E', // 5. Rose / Pink
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="8 7 3 12 8 17" />
        <polyline points="16 7 21 12 16 17" />
        <line x1="14" y1="5" x2="10" y2="19" />
      </svg>
    ),
  },
  {
    id: 'affordable-pricing',
    title: 'Affordable Pricing',
    description: 'We offer flexible and transparent pricing models that help startups and established businesses access technology solutions within their budgets.',
    iconGradient: 'from-[#FBBF24] to-[#F59E0B]',
    iconShadow: 'shadow-amber-500/25',
    waveFrom: '#FDE68A',
    waveTo: '#F59E0B', // 6. Golden Amber
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="9" cy="6" rx="6" ry="2.5" />
        <path d="M3 6v4c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V6" />
        <path d="M3 10v4c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v-4" />
        <ellipse cx="16" cy="14" rx="5" ry="2.2" />
        <path d="M11 14v4c0 1.2 2.24 2.2 5 2.2s5-1 5-2.2v-4" />
      </svg>
    ),
  },
  {
    id: 'on-time-delivery',
    title: 'On-Time Delivery',
    description: 'With structured project planning, milestone tracking, and consistent progress monitoring, we work towards delivering projects within agreed timelines.',
    iconGradient: 'from-[#06B6D4] to-[#0284C7]',
    iconShadow: 'shadow-cyan-500/25',
    waveFrom: '#A5F3FC',
    waveTo: '#06B6D4', // 7. Cyan / Sky
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    id: 'transparent-communication',
    title: 'Transparent Communication',
    description: 'We maintain clear communication, provide regular project updates, encourage collaboration, and keep you informed throughout the development process.',
    iconGradient: 'from-[#2563EB] to-[#1D4ED8]',
    iconShadow: 'shadow-blue-500/25',
    waveFrom: '#BFDBFE',
    waveTo: '#2563EB', // 8. Royal Blue
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="10" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="16" cy="10" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
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

      {/* 4-in-a-Row Grid of Squarish Cards with Corner Accent Wave */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-y-10 w-full">
        {valueCards.map((item, index) => (
          <AnimatedSection
            key={item.id}
            delay={index * 0.04}
            className="h-full"
          >
            <div
              className="why-marvel-card relative flex flex-col items-center text-center justify-start h-full p-4.5 sm:p-5 lg:p-5.5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.035)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 overflow-hidden select-none border border-slate-200"
              style={{ border: '1px solid var(--color-slate-200)' }}
            >
              
              {/* Center: Rounded-Square Gradient Icon */}
              <div
                className={`w-14 h-14 p-3 rounded-full shadow-[0_10px_24px_-8px_rgba(178,190,181,0.95)] bg-gradient-to-br ${item.iconGradient} flex items-center justify-center text-white transition-transform duration-300 hover:scale-105 shrink-0 mb-3 sm:mb-3.5`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-card-title tracking-tight leading-snug mb-1.5 sm:mb-2 text-center text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-card-desc text-slate-600 text-center">
                {item.description}
              </p>

              {/* Bottom-right smooth curved wave pastel wash */}
              <svg
                className="absolute -bottom-0.5 -right-0.5 w-22 sm:w-26 h-13 sm:h-16 pointer-events-none select-none transition-transform duration-500 ease-out hover:scale-105"
                viewBox="0 0 160 100"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M20 100 C 60 95, 90 60, 160 35 L 160 100 Z"
                  fill={`url(#wave-${item.id})`}
                />
                <defs>
                  <linearGradient id={`wave-${item.id}`} x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={item.waveFrom} stopOpacity="0.55" />
                    <stop offset="100%" stopColor={item.waveTo} stopOpacity="0.95" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseMarvel

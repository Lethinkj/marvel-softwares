import React from 'react'
import AnimatedSection from './AnimatedSection'

interface ValueCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  iconBg: string
  waveFrom: string
  waveTo: string
}

const valueCards: ValueCard[] = [
  // Row 1
  {
    id: 'customized-solutions',
    title: 'Customized Solutions',
    description: 'Software designed according to your business needs.',
    iconBg: 'rgba(0, 87, 231, 0.16)',
    waveFrom: '#93C5FD',
    waveTo: '#3B82F6', // 1. Royal Blue
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0057E7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 12l10 5 10-5" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'quality-development',
    title: 'Quality Development',
    description: 'Focus on performance, security and reliability.',
    iconBg: 'rgba(22, 163, 74, 0.16)',
    waveFrom: '#86EFAC',
    waveTo: '#22C55E', // 2. Forest Green
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'end-to-end-support',
    title: 'End-to-End Support',
    description: 'Assistance from planning and development to deployment.',
    iconBg: 'rgba(219, 39, 119, 0.16)',
    waveFrom: '#F472B6',
    waveTo: '#EC4899', // 3. Hot Pink
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        <path d="M19 16v3" />
      </svg>
    ),
  },
  {
    id: 'scalable-architecture',
    title: 'Scalable Architecture',
    description: 'Applications designed to support future growth.',
    iconBg: 'rgba(124, 58, 237, 0.16)',
    waveFrom: '#C4B5FD',
    waveTo: '#8B5CF6', // 4. Deep Purple
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l4 2.3v4.6L12 11.2l-4-2.3V4.3L12 2z" />
        <path d="M12 6.6l4-2.3" />
        <path d="M12 6.6L8 4.3" />
        <path d="M12 6.6v4.6" />
        <path d="M6 12.8l4 2.3v4.6l-4 2.3-4-2.3v-4.6l4-2.3z" />
        <path d="M18 12.8l4 2.3v4.6l-4 2.3-4-2.3v-4.6l4-2.3z" />
      </svg>
    ),
  },
  // Row 2
  {
    id: 'modern-technologies',
    title: 'Modern Technologies',
    description: 'Solutions built using current and suitable technologies.',
    iconBg: 'rgba(220, 38, 38, 0.16)',
    waveFrom: '#FCA5A5',
    waveTo: '#EF4444', // 5. Crimson Red
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M2 20h20" />
        <path d="M9 10l-2 2 2 2" />
        <path d="M15 10l2 2-2 2" />
        <path d="M12 9l-1 6" />
      </svg>
    ),
  },
  {
    id: 'affordable-pricing',
    title: 'Affordable Pricing',
    description: 'Flexible solutions for startups and established businesses.',
    iconBg: 'rgba(234, 179, 8, 0.18)',
    waveFrom: '#FEF08A',
    waveTo: '#EAB308', // 6. Golden Yellow
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    description: 'Structured project execution and milestone tracking.',
    iconBg: 'rgba(8, 145, 178, 0.16)',
    waveFrom: '#67E8F9',
    waveTo: '#06B6D4', // 7. Aqua Cyan
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    description: 'Clear updates, collaborative discussions, and complete project visibility.',
    iconBg: 'rgba(234, 88, 12, 0.16)',
    waveFrom: '#FDBA74',
    waveTo: '#F97316', // 8. Safety Orange
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="8" cy="10" r="1.3" fill="#EA580C" />
        <circle cx="12" cy="10" r="1.3" fill="#EA580C" />
        <circle cx="16" cy="10" r="1.3" fill="#EA580C" />
      </svg>
    ),
  },
]

export const WhyChooseMarvel: React.FC = () => {
  return (
    <div className="container">
      {/* Section Header */}
      <AnimatedSection style={{ maxWidth: 760 }} className="text-center mx-auto mb-8 sm:mb-12">
        <h2 id="why-choose-us-title" className="text-section-title text-[#0033A0]">
          Why Choose Marvel Softwares?
        </h2>
        <p className="section-subtitle">
          Your Trusted Partner for Digital Transformation
        </p>
      </AnimatedSection>

      {/* 4-in-a-Row Full Container Grid of 8 Modern Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full">
        {valueCards.map((item, index) => (
          <AnimatedSection
            key={item.id}
            delay={index * 0.04}
            className="h-full"
          >
            <div className="relative flex items-center gap-3.5 sm:gap-4.5 p-5 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/90 shadow-[0_4px_22px_rgba(0,0,0,0.035)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 group overflow-hidden h-full">
              {/* Left: Icon with soft ambient glow */}
              <div className="relative shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl">
                <div
                  className="absolute inset-0 rounded-full blur-md scale-95"
                  style={{ backgroundColor: item.iconBg }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
              </div>

              {/* Middle: Subtle vertical divider */}
              <div className="w-px h-10 sm:h-12 bg-slate-200/90 shrink-0" aria-hidden="true" />

              {/* Right: Text content */}
              <div className="flex-1 min-w-0 relative z-10 pr-2">
                <h3 className="font-bold text-slate-900 text-[15.5px] sm:text-[17px] tracking-tight leading-snug group-hover:text-[#0033A0] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom-right smooth curved wave pastel wash */}
              <svg
                className="absolute -bottom-0.5 -right-0.5 w-24 sm:w-28 h-16 sm:h-20 pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-105"
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
                    <stop offset="0%" stopColor={item.waveFrom} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={item.waveTo} stopOpacity="0.85" />
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

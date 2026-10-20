import React from 'react'
import { Link } from 'react-router-dom'
import { renderAppIcon } from '../utils/iconResolver'
import AnimatedSection from '../components/AnimatedSection'
import Seo from '../components/Seo'
import { HeroIntelligentCore } from '../components/illustrations'
import { OurProcess } from '../components/OurProcess'
import {
  homeServices,
  services,
  whyChooseUs,
  capabilities,
  projects,
} from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

const btnPrimary: React.CSSProperties = {
  background: 'var(--color-primary)',
  color: '#fff',
  borderRadius: 'var(--radius-button)',
  boxShadow: 'var(--shadow-button)',
}

const btnSecondary: React.CSSProperties = {
  background: '#fff',
  color: 'var(--color-primary)',
  border: '2px solid var(--color-primary)',
  borderRadius: 'var(--radius-button)',
}

export const Home: React.FC = () => {
  const overview = homeServices
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is (typeof services)[number] => Boolean(s))

  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Marvel Softwares | Custom Software Development"
        description="Websites, web applications, mobile apps, ERP systems and custom software solutions built around your business requirements."
        path="/"
      />

      {/* ============ A. HERO ============ */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="container" style={{ paddingBlock: 'clamp(48px,6vw,80px)' }}>
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-center" style={{ gap: 'clamp(20px,3vw,40px)' }}>
            <div className="order-1 lg:order-none lg:col-span-7 lg:row-start-1 lg:self-start">
              <h1 id="hero-title" className="text-hero" style={{ marginTop: 16 }}>
                <span className="block" style={{ color: 'var(--color-primary)' }}>
                  Software That Grows
                </span>
                <span className="block" style={{ color: 'var(--color-primary)' }}>
                  Your Business
                </span>
              </h1>
              <p className="text-body" style={{ marginTop: 22 }}>
                From websites and mobile apps to enterprise platforms and custom business
                systems, we design and develop software that solves real problems,
                streamlines operations and helps businesses grow.
              </p>
            </div>
            <div className="order-2 lg:order-none w-full max-w-xl mx-auto lg:max-w-none lg:col-span-5 lg:row-start-1 lg:row-span-2 lg:self-center lg:w-[calc(100%+1.5rem)] lg:-mx-3">
              <HeroIntelligentCore />
            </div>
            <div className="order-3 lg:order-none lg:col-span-7 lg:row-start-2 lg:self-start">
              <div
                className="flex flex-row items-stretch sm:items-center"
                style={{ gap: 10, marginTop: 4 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center min-h-[48px] px-3 sm:px-8 text-[13px] sm:text-base font-semibold transition-all hover:-translate-y-px whitespace-nowrap"
                  style={btnPrimary}
                >
                  Start a Project
                </Link>
                <Link
                  to="/services"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center min-h-[48px] px-3 sm:px-8 text-[13px] sm:text-base font-semibold transition-colors hover:bg-[#F4F5FF] whitespace-nowrap"
                  style={btnSecondary}
                >
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ B. CAPABILITY STRIP ============ */}
      <section
        aria-label="Our capabilities"
        className="section-warm"
        style={{ paddingBlock: 28 }}
      >
        <div className="container">
          <ul
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ gap: 'var(--card-gap)' }}
          >
            {capabilities.map((cap) => (
              <li
                key={cap.label}
                className="pulse-border-card flex items-center gap-3 rounded-2xl bg-white px-5 py-4"
              >
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                  style={{ background: '#F4F5FF', color: 'var(--color-orange)' }}
                  aria-hidden="true"
                >
                  {renderAppIcon(cap.icon, 'w-5 h-5')}
                </span>
                <span className="text-[15px] font-semibold">{cap.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ C. SERVICES OVERVIEW ============ */}
      <section aria-labelledby="services-title" className="section">
        <div className="container">
          <AnimatedSection style={{ maxWidth: 720 }}>
            <h2 id="services-title" className="text-section-title">
              Software Solutions for Every Stage of Your Business
            </h2>
            <p className="text-body" style={{ marginTop: 16 }}>
              From your first digital product to complex enterprise systems, we build
              technology around the way your business works.
            </p>
          </AnimatedSection>

          <div className="grid-cards-3" style={{ marginTop: 48 }}>
            {overview.map((service, i) => (
              <article
                key={service.id}
                className={`flex flex-col p-7 transition-all hover:-translate-y-1 glow-border-card glow-radius-lg ${i % 3 === 1 ? 'glow-delay-1' : i % 3 === 2 ? 'glow-delay-2' : ''}`}
                style={{ ...cardStyle, border: '1.5px solid transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)'
                }}
              >
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-2xl"
                  style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginBottom: 18 }}
                  aria-hidden="true"
                >
                  {renderAppIcon(service.icon, 'w-6 h-6')}
                </span>
                <h3 className="text-card-title" style={{ marginBottom: 10 }}>
                  {service.title}
                </h3>
                <p className="text-body text-[15px] flex-1">{service.description}</p>
                <Link
                  to={`/services#${service.id}`}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold transition-colors"
                  style={{ color: 'var(--color-primary)', marginTop: 18 }}
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                  <span aria-hidden="true" className="transition-transform">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ D. WHY CHOOSE US ============ */}
      <section aria-labelledby="why-title" className="section section-warm">
        <div className="container">
          <AnimatedSection style={{ maxWidth: 720 }}>
            <h2 id="why-title" className="text-section-title">
              Technology That Works for Your Business
            </h2>
          </AnimatedSection>
          <div className="grid-cards-4" style={{ marginTop: 48 }}>
            {whyChooseUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <article
                  className={`p-7 h-full bg-white mild-glow-card ${i === 1 ? 'mild-d1' : i === 2 ? 'mild-d2' : i === 3 ? 'mild-d3' : ''}`}
                  style={cardStyle}
                >
                  <span
                    className="flex items-center justify-center w-11 h-11 rounded-xl"
                    style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginBottom: 16 }}
                    aria-hidden="true"
                  >
                    {renderAppIcon(item.icon, 'w-5 h-5')}
                  </span>
                  <h3 className="text-card-title" style={{ marginBottom: 8, fontSize: '1.1rem' }}>
                    {item.title}
                  </h3>
                  <p className="text-body text-[15px]">{item.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ E. OUR PROCESS ============ */}
      <section aria-labelledby="process-title" className="section">
        <div className="container">
          <OurProcess />
        </div>
      </section>

      {/* ============ F. SELECTED PROJECTS ============ */}
      <section aria-labelledby="work-title" className="section section-warm">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div style={{ maxWidth: 640 }}>
              <h2 id="work-title" className="text-section-title">
                Solutions We&apos;ve Built
              </h2>
              <p className="text-body" style={{ marginTop: 14 }}>
                Representative examples of the kinds of solutions we design and build.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center min-h-[48px] px-6 text-[15px] font-semibold shrink-0"
              style={btnSecondary}
            >
              View All Projects
            </Link>
          </div>

          <div className="grid-cards-3" style={{ marginTop: 40 }}>
            {projects.slice(0, 3).map((project) => (
              <article key={project.id} className="flex flex-col overflow-hidden" style={cardStyle}>
                <div
                  className="flex items-center justify-between px-6"
                  style={{
                    height: 120,
                    background: `linear-gradient(135deg, ${project.color}1f 0%, #fff 80%)`,
                    borderBottom: '1px solid var(--color-border)',
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold bg-white"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ background: project.color }} />
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-card-title">{project.title}</h3>
                  <p className="text-body text-[15px]" style={{ marginTop: 8, flex: 1 }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2" style={{ marginTop: 16 }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-md"
                        style={{ background: 'var(--color-surface-warm)', border: '1px solid var(--color-border)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ G. FINAL CTA ============ */}
      <section aria-labelledby="cta-title" className="section" style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
        <div
          className="relative overflow-hidden text-center"
          style={{
            background: 'linear-gradient(120deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            color: '#fff',
            padding: 'clamp(48px,7vw,84px) clamp(24px,5vw,64px)',
          }}
        >
            {/* Diagonal tube banner pattern (brand colors) */}
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 1200 400"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            >
              <defs>
                <linearGradient id="cta-diag-a" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00CFFF" />
                  <stop offset="100%" stopColor="#0057E7" />
                </linearGradient>
                <linearGradient id="cta-diag-b" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0057E7" />
                  <stop offset="100%" stopColor="#00CFFF" />
                </linearGradient>
                <linearGradient id="cta-diag-c" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF5A00" />
                  <stop offset="100%" stopColor="#FFB800" />
                </linearGradient>
              </defs>

              {/* soft washes */}
              <ellipse cx={130} cy={350} rx={230} ry={100} fill="#0057E7" opacity={0.05} />
              <ellipse cx={1090} cy={50} rx={250} ry={100} fill="#00CFFF" opacity={0.07} />

              {/* left diagonal U-tube */}
              <g fill="none" strokeLinecap="round">
                <path d="M360 20 L170 230 Q140 262 108 230 L20 130" stroke="url(#cta-diag-a)" strokeWidth={25} opacity={0.9} />
                <path d="M405 45 L225 245" stroke="#0033A0" strokeWidth={5} opacity={0.3} />
                <path d="M315 5 L135 205" stroke="#00CFFF" strokeWidth={4} opacity={0.6} strokeDasharray="2 14" className="svg-flow" />
                <path d="M150 400 L300 230" stroke="url(#cta-diag-c)" strokeWidth={8} opacity={0.7} />
              </g>

              {/* right diagonal U-tube */}
              <g fill="none" strokeLinecap="round">
                <path d="M840 380 L1030 170 Q1060 138 1092 170 L1180 260" stroke="url(#cta-diag-b)" strokeWidth={25} opacity={0.9} />
                <path d="M795 355 L985 165" stroke="#0033A0" strokeWidth={5} opacity={0.3} />
                <path d="M885 395 L1075 205" stroke="#00CFFF" strokeWidth={4} opacity={0.6} strokeDasharray="2 14" className="svg-flow" />
                <path d="M990 400 L1140 230" stroke="url(#cta-diag-c)" strokeWidth={8} opacity={0.7} />
              </g>

              {/* small striped tube detail */}
              <g fill="none" strokeLinecap="round">
                <path d="M1015 130 L1015 80 Q1015 60 1035 60 L1075 60" stroke="#00CFFF" strokeWidth={4} opacity={0.7} />
                <line x1={1032} y1={92} x2={1058} y2={92} stroke="#0057E7" strokeWidth={3} opacity={0.4} />
                <line x1={1032} y1={102} x2={1058} y2={102} stroke="#0057E7" strokeWidth={3} opacity={0.4} />
                <line x1={1032} y1={112} x2={1058} y2={112} stroke="#0057E7" strokeWidth={3} opacity={0.4} />
              </g>

              {/* hatch clusters */}
              <g stroke="#0057E7" strokeWidth={4} strokeLinecap="round" opacity={0.4}>
                <line x1={300} y1={300} x2={330} y2={270} />
                <line x1={322} y1={312} x2={352} y2={282} />
                <line x1={344} y1={324} x2={374} y2={294} />
                <line x1={870} y1={120} x2={900} y2={90} />
                <line x1={892} y1={132} x2={922} y2={102} />
                <line x1={914} y1={144} x2={944} y2={114} />
              </g>

              {/* dotted grids */}
              <g fill="#0033A0" opacity={0.32}>
                {[0, 1, 2, 3, 4].map((r) =>
                  [0, 1, 2, 3, 4].map((c) => (
                    <circle key={`${r}-${c}`} cx={52 + c * 18} cy={56 + r * 18} r={2.5} />
                  )),
                )}
                {[0, 1, 2, 3].map((r) =>
                  [0, 1, 2, 3, 4].map((c) => (
                    <circle key={`b${r}-${c}`} cx={1062 + c * 18} cy={256 + r * 18} r={2.5} />
                  )),
                )}
              </g>

              {/* plus sparkles */}
              <g className="svg-float" strokeLinecap="round" strokeWidth={3}>
                <path d="M420 90 v16 M412 98 h16" stroke="#0057E7" opacity={0.75} />
                <path d="M452 122 v16 M444 130 h16" stroke="#00CFFF" opacity={0.85} />
                <path d="M730 280 v16 M722 288 h16" stroke="#00CFFF" opacity={0.8} />
                <path d="M762 248 v16 M754 256 h16" stroke="#FF5A00" opacity={0.85} />
                <path d="M700 120 v16 M692 128 h16" stroke="#0057E7" opacity={0.6} />
              </g>
              <circle cx={600} cy={76} r={5} fill="#FFB800" opacity={0.9} className="svg-pulse" />
              <circle cx={640} cy={330} r={4} fill="#0057E7" opacity={0.6} className="svg-pulse" />
            </svg>
            <div className="relative" style={{ zIndex: 1 }}>
            <p
              className="text-xs font-bold uppercase"
              style={{ letterSpacing: '0.16em', color: 'var(--color-yellow)' }}
            >
              Let&apos;s work together
            </p>
            <h2 id="cta-title" className="text-section-title" style={{ color: '#fff', marginTop: 12 }}>
              Have an Idea? Let&apos;s Build It.
            </h2>
            <p
              className="text-body"
              style={{ color: 'rgba(255,255,255,.88)', marginTop: 14, marginInline: 'auto', maxWidth: 620 }}
            >
              Tell us what you&apos;re trying to solve. We&apos;ll help you explore the right
              software approach for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: 14, marginTop: 32 }}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center min-h-[52px] px-8 text-base font-semibold w-full sm:w-auto"
                style={{ background: 'var(--color-orange)', color: '#fff', borderRadius: 'var(--radius-button)' }}
              >
                Start a Project
              </Link>
            </div>
            </div>
          </div>
      </section>
    </div>
  )
}

export default Home

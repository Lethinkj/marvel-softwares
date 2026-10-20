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
  projects,
} from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f9faff 100%)',
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

/* Hero trust chips — short, factual scope labels */
const heroChips = ['Websites', 'Web Applications', 'Mobile Apps', 'ERP Systems', 'AI & Automation']

/* Hero highlight mini-cards — links point at matching service anchors */
const heroHighlights = [
  {
    icon: 'web',
    tint: 'tint-blue',
    title: 'Web & Mobile Apps',
    href: 'website-development',
    description:
      'Websites, portals and apps your customers enjoy using — responsive, fast and easy to manage.',
  },
  {
    icon: 'erp',
    tint: 'tint-orange',
    title: 'ERP & Automation',
    href: 'erp-business-software',
    description:
      'Run operations, records, billing and reporting from one connected, reliable system.',
  },
  {
    icon: 'ai',
    tint: 'tint-cyan',
    title: 'AI & Integrations',
    href: 'ai-automation',
    description:
      'Connect your tools with APIs and automation so repetitive work takes care of itself.',
  },
]

export const Home: React.FC = () => {
  /* Hero image may not be present yet — fall back to the SVG illustration */
  const [heroImgOk, setHeroImgOk] = React.useState(true)

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
        {/* Ambient brand glows */}
        <div aria-hidden="true" className="hero-glow hero-glow-a" />
        <div aria-hidden="true" className="hero-glow hero-glow-b" />

        <div className="container relative" style={{ paddingTop: 'clamp(20px,3vw,36px)', paddingBottom: 'clamp(56px,8vw,112px)' }}>
          <div
            className="flex flex-col lg:grid lg:grid-cols-12 lg:items-center"
            style={{ gap: 'clamp(24px,3.5vw,48px)' }}
          >
            {/* Copy column */}
            <div className="order-1 lg:order-none lg:col-span-7 lg:row-start-1 lg:row-span-2 lg:self-center">
              <h1 id="hero-title" className="text-hero">
                <span className="block" style={{ color: 'var(--color-primary)' }}>
                  Software That Grows
                </span>
                <span className="text-gradient block">Your Business</span>
              </h1>

              <p className="text-body" style={{ marginTop: 22 }}>
                From websites and mobile apps to enterprise platforms and custom business
                systems — we design and develop software that solves real problems,
                streamlines operations and helps your business grow.
              </p>

              {/* CTAs sit right under the headline on mobile too */}
              <div
                className="flex flex-row items-stretch sm:items-center"
                style={{ gap: 12, marginTop: 34 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center min-h-[52px] px-4 sm:px-9 text-[14px] sm:text-base font-semibold transition-all hover:-translate-y-px whitespace-nowrap"
                  style={btnPrimary}
                >
                  Start a Project
                </Link>
                <Link
                  to="/services"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center min-h-[52px] px-4 sm:px-9 text-[14px] sm:text-base font-semibold transition-colors hover:bg-[#F4F5FF] whitespace-nowrap"
                  style={btnSecondary}
                >
                  Explore Our Services
                </Link>
              </div>

              <ul className="flex flex-wrap items-center" style={{ gap: 8, marginTop: 28 }}>
                {heroChips.map((chip) => (
                  <li key={chip} className="hero-chip">
                    {renderAppIcon('checkcircle', 'w-3.5 h-3.5')}
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual column */}
            <div className="order-2 lg:order-none relative w-full max-w-xl mx-auto lg:max-w-none lg:col-span-5 lg:row-start-1 lg:self-center">
              <div className="hero-visual-card">
                {heroImgOk ? (
                  <img
                    src="/hero-images/hero-isometric.svg"
                    alt="Isometric illustration of a laptop, phone and cloud surrounded by web, cloud, automation, AI, enterprise and custom software services"
                    className="w-full h-auto"
                    decoding="async"
                    onError={() => setHeroImgOk(false)}
                  />
                ) : (
                  <HeroIntelligentCore />
                )}
              </div>

              {/* Floating endpoint badge */}
              <div className="hero-float-badge hidden lg:flex" aria-hidden="true">
                <span className="hero-float-icon">{renderAppIcon('rocket', 'w-5 h-5')}</span>
                <span className="leading-tight">
                  <strong className="block text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    Idea → Launch
                  </strong>
                  <small className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    Design · Build · Deploy · Support
                  </small>
                </span>
              </div>
            </div>
          </div>

          {/* Highlight mini-cards */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: 'var(--card-gap)', marginTop: 'clamp(34px,4.5vw,60px)' }}
          >
            {heroHighlights.map((card) => (
              <li key={card.title}>
                <article className="hero-mini-card">
                  <span className={`hero-mini-icon ${card.tint}`} aria-hidden="true">
                    {renderAppIcon(card.icon, 'w-5 h-5')}
                  </span>
                  <h2 className="text-[1.05rem] font-bold" style={{ color: 'var(--color-text)' }}>
                    {card.title}
                  </h2>
                  <p
                    className="text-[0.9rem] leading-relaxed"
                    style={{ color: 'var(--color-text-muted)', flex: 1 }}
                  >
                    {card.description}
                  </p>
                  <Link
                    to={`/services#${card.href}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
                    style={{ color: 'var(--color-primary)', marginTop: 4 }}
                    aria-label={`Learn more about ${card.title}`}
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </article>
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
                className={`flex flex-col p-7 service-card glow-border-card glow-radius-lg ${i % 3 === 1 ? 'glow-delay-1' : i % 3 === 2 ? 'glow-delay-2' : ''}`}
                style={{ ...cardStyle, border: '1.5px solid transparent', boxShadow: undefined }}
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
                Featured production platforms and digital experiences engineered by Marvel Softwares.
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto" style={{ marginTop: 40 }}>
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer text-inherit no-underline"
                style={cardStyle}
              >
                <div className="relative overflow-hidden w-full aspect-video bg-slate-100 border-b border-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm shadow-sm z-10"
                    style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  >
                    {project.category}
                  </span>

                  {/* Hover Overlay with Visit Live Site */}
                  <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-semibold shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <span>Visit Live Site</span>
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-card-title text-xl font-bold group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <span className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 mt-0.5" aria-hidden="true">
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </span>
                  </div>

                  <p className="text-body text-[15px] leading-relaxed" style={{ marginTop: 12, flex: 1 }}>
                    {project.description}
                  </p>
                </div>
              </a>
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

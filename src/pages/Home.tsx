import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import Seo from '../components/Seo'
import { OurProcess } from '../components/OurProcess'
import ServiceShowcase from '../components/ServiceShowcase'
import WhyChooseUs from '../components/WhyChooseUs'
import HomeCta from '../components/HomeCta'
import { projects } from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f9faff 100%)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

const btnSecondary: React.CSSProperties = {
  background: '#fff',
  color: 'var(--color-primary)',
  border: '2px solid var(--color-primary)',
  borderRadius: 'var(--radius-button)',
}

export const Home: React.FC = () => {
  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Marvel Softwares | Custom Software Development"
        description="Websites, web applications, mobile apps, ERP systems and custom software solutions built around your business requirements."
        path="/"
      />

      {/* ============ A. HERO ============ */}
      <section aria-labelledby="hero-title" className="hero-v4 relative overflow-hidden">
        {/* Dot-grid backdrop + ambient brand glows */}
        <div aria-hidden="true" className="hero-dotgrid" />
        <div aria-hidden="true" className="hero-glow hero-glow-a" />
        <div aria-hidden="true" className="hero-glow hero-glow-b" />

        <div
          className="w-full relative px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1720px] mx-auto"
          style={{
            paddingTop: 'calc(var(--header-offset) + clamp(36px, 5.5vw, 80px))',
            paddingBottom: 'clamp(56px,8vw,112px)',
          }}
        >
          <div
            className="flex flex-col lg:grid lg:grid-cols-12 lg:items-start"
            style={{ gap: 'clamp(32px,4.5vw,64px)' }}
          >
            {/* Copy column */}
            <div className="order-1 lg:order-none lg:col-span-6 lg:row-start-1 lg:row-span-2 lg:self-start text-left">
              <h1 id="hero-title" className="text-hero" style={{ marginTop: 0 }}>
                <span className="block" style={{ color: 'var(--color-primary)' }}>
                  Software That Grows
                </span>
                <span className="hero-shimmer-text block">Your Business</span>
              </h1>

              <p className="hero-lead text-justify" style={{ maxWidth: '62ch', textAlign: 'justify' }}>
                From high-performing websites and intuitive mobile applications to connected enterprise ERP platforms and custom software architectures — we engineer scalable digital solutions tailored directly around the way your organization operates. Whether your goal is modernizing customer-facing digital touchpoints, automating complex operational workflows, or establishing a resilient and secure technological foundation from the ground up, our dedicated engineering team manages the complete product lifecycle from discovery and UX design through to deployment, ongoing optimization, and dependable long-term support.
              </p>

              {/* CTAs */}
              <div className="hero-actions">
                <Link to="/contact" className="hero-btn hero-btn--primary">
                  Start a Project
                </Link>
                <Link to="/services" className="hero-btn hero-btn--ghost">
                  Explore Our Services
                </Link>
              </div>
            </div>

            {/* Visual column */}
            <div className="order-2 lg:order-none relative w-full lg:col-span-6 lg:row-start-1 lg:self-start flex justify-center pt-2">
              <img
                src="/hero/home.png"
                alt="Marvel Softwares digital solutions and software development workspace"
                className="w-full h-auto max-w-[620px] xl:max-w-[680px] drop-shadow-xl transition-transform"
                decoding="async"
              />
            </div>
          </div>
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

          <ServiceShowcase />
        </div>
      </section>

      {/* ============ D. WHY CHOOSE US ============ */}
      <section aria-labelledby="why-title" className="section section-warm">
        <div className="container">
          <AnimatedSection style={{ maxWidth: 720 }}>
            <h2 id="why-title" className="text-section-title">
              Technology That Works for Your Business
            </h2>
            <p className="text-body" style={{ marginTop: 16 }}>
              We start with how your business actually runs, then design technology around it —
              structured to grow, easy to connect, and supported long after launch.
            </p>
          </AnimatedSection>

          <WhyChooseUs />
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
      <HomeCta />
    </div>
  )
}

export default Home

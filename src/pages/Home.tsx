import React, { useEffect, useRef, useState } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import Seo from '../components/Seo'
import MissionBadge from '../components/MissionBadge'
import VisionBadge from '../components/VisionBadge'
import { OurProcess } from '../components/OurProcess'
import ServiceShowcase from '../components/ServiceShowcase'
import WhyChooseUs from '../components/WhyChooseUs'
import OurTeam from '../components/OurTeam'
import UpcomingProjects from '../components/UpcomingProjects'
import OurClients from '../components/OurClients'
import ContactSection from '../components/ContactSection'
import { projects } from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f9faff 100%)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

export const Home: React.FC = () => {
  const [previewProject, setPreviewProject] = useState<(typeof projects)[number] | null>(null)
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('desktop')
  const [previewFailed, setPreviewFailed] = useState(false)
  const previewTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!previewProject) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewProject(null)
    }
    setPreviewDevice(window.matchMedia('(max-width: 640px)').matches ? 'mobile' : 'desktop')
    setPreviewFailed(false)
    previewTimeoutRef.current = window.setTimeout(() => setPreviewFailed(true), 5000)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      if (previewTimeoutRef.current !== null) {
        window.clearTimeout(previewTimeoutRef.current)
        previewTimeoutRef.current = null
      }
    }
  }, [previewProject])

  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Marvel Softwares | Software Development Company in India"
        description="Marvel Softwares builds websites, web apps, mobile apps, ERP systems, UI/UX experiences, AI automation and custom software for businesses in India, Kanyakumari and Nagercoil."
        path="/"
      />

      {/* ============ A. HERO ============ */}
      <section
        id="home"
        aria-labelledby="hero-title"
        className="hero-v4 hero-deep relative overflow-hidden"
      >
        {/* Dot-grid backdrop + ambient brand glows */}
        <div aria-hidden="true" className="hero-dotgrid" />
        <div aria-hidden="true" className="hero-glow hero-glow-a" />
        <div aria-hidden="true" className="hero-glow hero-glow-b" />
        <div aria-hidden="true" className="hero-aurora hero-aurora-a" />
        <div aria-hidden="true" className="hero-aurora hero-aurora-b" />
        <div aria-hidden="true" className="hero-light-sweep" />

        <div
          className="container relative"
          style={{
            paddingTop: 'calc(var(--header-offset) + clamp(28px, 4vw, 56px))',
            paddingBottom: 'clamp(32px, 4vw, 56px)',
          }}
        >
          <div
            className="flex flex-col lg:grid lg:grid-cols-12 lg:items-center"
            style={{ gap: 'clamp(20px, 2.5vw, 36px)' }}
          >
            {/* Copy column */}
            <div className="hero-copy order-1 lg:order-none text-left">
              <h1 id="hero-title" className="text-hero" style={{ marginTop: 0 }}>
                <span className="hero-shimmer-text block">Software That Grows</span>
                <span className="hero-shimmer-text block" style={{ animationDelay: '-3.5s' }}>
                  Your Business
                </span>
              </h1>

              <p className="hero-lead text-justify text-slate-600 mt-5 leading-relaxed indent-8 sm:indent-10" style={{ maxWidth: '64ch' }}>
                From high-performing websites and intuitive mobile applications to connected enterprise ERP platforms and custom software architectures — we engineer scalable digital solutions tailored directly around the way your organization operates. Whether your goal is modernizing customer-facing digital touchpoints, automating complex operational workflows, or establishing a resilient and secure technological foundation from the ground up, our dedicated engineering team manages the complete product lifecycle from discovery and UX design through to deployment, ongoing optimization, and dependable long-term support.
              </p>

            </div>

            {/* Visual column */}
            <div className="hero-visual order-2 lg:order-none relative w-full flex justify-center lg:justify-start pt-2">
              <img
                src="/hero/home.png"
                alt="Marvel Softwares digital solutions and software development workspace"
                className="w-full h-auto max-w-[580px] lg:max-w-[660px] xl:max-w-[720px] lg:scale-105 xl:scale-110 origin-left drop-shadow-xl transition-transform"
                decoding="async"
              />
            </div>

            {/* CTAs */}
            <div className="hero-actions order-3 lg:order-none">
              <a href="#contact" className="hero-btn hero-btn--primary">
                Start a Project
              </a>
              <a href="#services" className="hero-btn hero-btn--ghost">
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ B. ABOUT US ============ */}
      <section
        id="about"
        aria-labelledby="about-us-title"
        className="section bg-white relative overflow-hidden"
        style={{
          paddingTop: 'clamp(36px, 4vw, 64px)',
          paddingBottom: 'clamp(36px, 4vw, 64px)',
        }}
      >
        <div className="container relative z-10">
          {/* About Us Visual (Left, 40%) + Content (Right, 60%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Visual column with about.png (Left on desktop - 40%) */}
            <div className="order-2 lg:order-1 flex justify-center w-full">
              <AnimatedSection delay={0.15} className="w-full flex justify-center">
                <img
                  src="/about.png"
                  alt="About Marvel Softwares technology and engineering excellence"
                  className="w-full h-auto max-w-[480px] lg:max-w-full drop-shadow-lg transition-transform hover:scale-[1.02] duration-300"
                  decoding="async"
                />
              </AnimatedSection>
            </div>

            {/* Copy (Right on desktop - 60%) */}
            <div className="order-1 lg:order-2 text-left w-full">
              <AnimatedSection>
                <h2 id="about-us-title" className="text-section-title text-left">
                  About Us
                </h2>
                <div className="mt-6 space-y-4 text-justify text-slate-600 leading-relaxed text-base sm:text-lg">
                  <p className="indent-8 sm:indent-10">
                    MARVEL SOFTWARES is a full-cycle technology and software engineering company committed to designing, developing, and deploying robust digital systems that drive tangible business results. We partner with ambitious enterprises and growing organizations to build intuitive web applications, high-performance mobile apps, interconnected ERP platforms, and custom software architectures tailored precisely to operational realities.
                  </p>
                  <p className="indent-8 sm:indent-10">
                    Our engineering philosophy balances modern technical innovation with dependable architecture — guiding projects from strategic discovery and user experience design through to agile implementation, comprehensive testing, secure cloud deployment, and proactive long-term maintenance. By aligning deep technical domain expertise with our clients' commercial objectives, we create digital solutions that reduce friction, automate workflows, and empower businesses to scale sustainably.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ============ C. OUR MISSION & OUR VISION ============ */}
      <section
        id="mission-vision"
        aria-label="Our mission and vision"
        className="section section-warm relative overflow-hidden"
        style={{
          paddingTop: 'clamp(36px, 4vw, 60px)',
          paddingBottom: 'clamp(36px, 4vw, 60px)',
        }}
      >
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
            {/* Mission column — badge beside heading */}
            <AnimatedSection delay={0.1} className="w-full">
              <div className="h-full">
                <div className="flex items-center justify-center gap-4 sm:gap-5 mb-4">
                  <MissionBadge className="w-20 sm:w-24 lg:w-28 shrink-0" />
                  <h2 id="mission-title" className="text-section-title text-center">
                    Our Mission
                  </h2>
                </div>
                <p className="text-body text-justify leading-relaxed text-slate-600 w-full text-base sm:text-lg">
                  To engineer practical, scalable, and user-focused digital solutions that eliminate operational bottlenecks, automate repetitive processes, and solve complex business challenges with precision. We are committed to crafting resilient software using modern engineering best practices, transparent communication, and continuous delivery — empowering our partners with the technical clarity and efficiency required to thrive in a competitive, fast-moving digital economy.
                </p>
              </div>
            </AnimatedSection>

            {/* Vision column — badge beside heading */}
            <AnimatedSection delay={0.2} className="w-full">
              <div className="h-full">
                <div className="flex items-center justify-center gap-4 sm:gap-5 mb-4">
                  <VisionBadge className="w-20 sm:w-24 lg:w-28 shrink-0" />
                  <h2 id="vision-title" className="text-section-title text-center">
                    Our Vision
                  </h2>
                </div>
                <p className="text-body text-justify leading-relaxed text-slate-600 w-full text-base sm:text-lg">
                  To establish MARVEL SOFTWARES as a premier digital transformation partner, renowned for making enterprise-grade software accessible, scalable, and genuinely transformative for organizations worldwide. We envision a future where intelligently engineered software seamlessly bridges organizational gaps, elevates human potential, and accelerates business innovation across every industry we serve.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ C. SERVICES OVERVIEW ============ */}
      <section id="services" aria-labelledby="services-title" className="section">
        <div className="container">
          <AnimatedSection style={{ maxWidth: 720 }} className="text-center mx-auto">
            <h2 id="services-title" className="text-section-title">
              Our Services
            </h2>
            <p className="section-subtitle">
              From your first digital product to complex enterprise systems, we build
              technology around the way your business works.
            </p>
          </AnimatedSection>

          <ServiceShowcase />
        </div>
      </section>

      {/* ============ D. OUR PROCESS ============ */}
      <section id="process" aria-labelledby="process-title" className="section section-warm">
        <div className="container">
          <OurProcess />
        </div>
      </section>

      {/* ============ E. TECHNOLOGIES ============ */}
      <section id="technologies" aria-labelledby="technologies-title" className="section">
        <div className="container">
          <AnimatedSection style={{ maxWidth: 720 }} className="text-center mx-auto">
            <h2 id="technologies-title" className="text-section-title">
              Technologies
            </h2>
            <p className="section-subtitle">
              Modern frameworks, cloud architectures, and battle-tested engineering practices powering your digital products.
            </p>
          </AnimatedSection>

          <WhyChooseUs />
        </div>
      </section>

      {/* ============ F. OUR TEAM ============ */}
      <section id="team" aria-labelledby="team-heading" className="section section-warm">
        <OurTeam />
      </section>

      {/* ============ G. SELECTED PROJECTS ============ */}
      <section id="projects" aria-labelledby="work-title" className="section">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <h2 id="work-title" className="text-section-title">
              Our Projects
            </h2>
            <p className="section-subtitle">
              Explore our portfolio of scalable web applications, digital platforms, and custom software solutions engineered for performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full" style={{ marginTop: 28 }}>
            {projects.map((project) => (
              <article
                key={project.id}
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
                  <div className="project-live-overlay absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <button
                      type="button"
                      onClick={() => setPreviewProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-semibold shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out"
                      style={{ color: '#0f172a', background: '#ffffff' }}
                    >
                      <span>Preview Live Site</span>
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-card-title group-hover:text-blue-600 transition-colors">
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ H. UPCOMING PROJECTS ============ */}
      <section id="upcoming-projects" aria-labelledby="upcoming-title" className="section section-warm">
        <UpcomingProjects />
      </section>

      {/* ============ I. OUR CLIENTS ============ */}
      <section id="clients" aria-labelledby="clients-heading" className="section">
        <OurClients />
      </section>

      {/* ============ J. CONTACT US ============ */}
      <section id="contact" aria-labelledby="contact-heading" className="section section-warm">
        <ContactSection />
      </section>

      {previewProject && (
        <div
          className="project-preview-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreviewProject(null)
          }}
        >
          <div
            className={`project-preview-modal project-preview-modal--${previewDevice}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
          >
            <div className="project-preview-header">
              <div>
                <p className="project-preview-kicker">
                  {previewDevice === 'mobile' ? 'Mobile preview' : 'Desktop preview'}
                </p>
                <h2 id="project-preview-title">{previewProject.title}</h2>
              </div>
              <button
                type="button"
                className="project-preview-close"
                aria-label="Close project preview"
                onClick={() => setPreviewProject(null)}
              >
                ×
              </button>
            </div>
            <div className="project-preview-frame">
              {previewFailed ? (
                <div className="project-preview-fallback">
                  <div className="project-preview-fallback-note">
                    <strong>Live preview cannot be embedded</strong>
                    <span>
                      Allow this domain in the project server&apos;s frame policy to load the website here.
                    </span>
                    <a href={previewProject.url} target="_blank" rel="noopener noreferrer">
                      Open live site
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={previewProject.url}
                  title={`${previewProject.title} live preview`}
                  loading="eager"
                  className="project-preview-iframe"
                  onLoad={() => {
                    if (previewTimeoutRef.current !== null) {
                      window.clearTimeout(previewTimeoutRef.current)
                      previewTimeoutRef.current = null
                    }
                    setPreviewFailed(false)
                  }}
                  onError={() => setPreviewFailed(true)}
                />
              )}
            </div>
            <div className="project-preview-footer">
              <span>Preview sized for your current device</span>
              <a href={previewProject.url} target="_blank" rel="noopener noreferrer">
                Open live site
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

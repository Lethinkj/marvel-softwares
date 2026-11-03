import React, { useEffect, useRef, useState } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import Seo from '../components/Seo'
import MissionBadge from '../components/MissionBadge'
import VisionBadge from '../components/VisionBadge'
import { OurProcess } from '../components/OurProcess'
import ServiceShowcase from '../components/ServiceShowcase'
import WhyChooseUs from '../components/WhyChooseUs'
import WhyChooseMarvel from '../components/WhyChooseMarvel'
import OurTeam from '../components/OurTeam'
import UpcomingProjects from '../components/UpcomingProjects'
import OurClients from '../components/OurClients'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'
import CTASection from '../components/CTASection'
import { projects } from '../data/siteData'
import { trackCtaClick, trackProjectPreview } from '../utils/analytics'

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f9faff 100%)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

const getPreviewUrl = (url: string) => {
  try {
    const host = new URL(url).hostname
    if (host === 'marvelslice.com' || host === 'www.marvelslice.com') return '/preview/marvelslice/'
    if (host === 'lms.marvelslice.com') return '/preview/lms/login'
    if (host === 'marvelvillas.com' || host === 'www.marvelvillas.com') return '/preview/marvelvillas/'
    return url
  } catch {
    return url
  }
}

export const Home: React.FC = () => {
  const [previewProject, setPreviewProject] = useState<(typeof projects)[number] | null>(null)
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('desktop')
  const [previewFailed, setPreviewFailed] = useState(false)
  const [iframeLoading, setIframeLoading] = useState(true)
  const previewTimeoutRef = useRef<number | null>(null)

  const openProjectPreview = (project: (typeof projects)[number]) => {
    trackProjectPreview(project.title, project.category)
    setPreviewProject(project)
  }

  useEffect(() => {
    if (!previewProject) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewProject(null)
    }
    setPreviewDevice(window.matchMedia('(max-width: 640px)').matches ? 'mobile' : 'desktop')
    setPreviewFailed(false)
    setIframeLoading(true)
    previewTimeoutRef.current = window.setTimeout(() => {
      setPreviewFailed(true)
      setIframeLoading(false)
    }, 20000)
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
        description="MARVEL SOFTWARES is an India-based software development company delivering custom web applications, mobile apps, ERP systems, and AI automation for businesses across India and global markets."
        path="/"
        keywords="software development company in India, software company in India, software development services, IT solutions company, custom software development, web application development, mobile app development, ERP software development, AI automation solutions, software company in Tamil Nadu, software company in Bangalore, software development partner"
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
                From high-performing websites and intuitive mobile applications to integrated enterprise ERP systems and custom software architectures, we engineer scalable digital solutions tailored to your business operations. Whether your goal is to modernize customer-facing digital experiences, automate complex operational workflows, or establish a secure and resilient technological foundation from the ground up, our dedicated engineering team manages the entire product lifecycle &mdash; from initial discovery and UI/UX design to development, deployment, continuous optimization, and dependable long-term support.
              </p>

            </div>

            {/* Visual column */}
            <div className="hero-visual order-2 lg:order-none relative w-full flex justify-center lg:justify-start pt-2">
              <img
                src="/images/hero/hero-home.avif"
                alt="Marvel Softwares digital solutions and software development workspace"
                width={1672}
                height={941}
                fetchPriority="high"
                className="w-full h-auto max-w-[580px] lg:max-w-[660px] xl:max-w-[720px] lg:scale-105 xl:scale-110 origin-left drop-shadow-xl transition-transform"
                decoding="async"
              />
            </div>

            {/* CTAs */}
            <div className="hero-actions order-3 lg:order-none">
              <a
                href="#contact"
                className="hero-btn hero-btn--primary"
                onClick={() => trackCtaClick('Start a Project (Hero)', '#contact')}
              >
                Start a Project
              </a>
              <a
                href="#services"
                className="hero-btn hero-btn--ghost"
                onClick={() => trackCtaClick('Explore Our Services (Hero)', '#services')}
              >
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
          {/* Centered Section Heading across the whole section */}
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            <h2 id="about-us-title" className="text-section-title text-center">
              About Us
            </h2>
          </AnimatedSection>

          {/* About Us Visual (Left, 40%) + Content (Right, 60%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Visual column: 2nd on mobile, 1st on desktop */}
            <div className="flex justify-center w-full">
              <AnimatedSection delay={0.15} className="w-full flex justify-center">
                <img
                  src="/images/about/about-marvel.avif"
                  alt="About Marvel Softwares technology and engineering excellence"
                  width={1536}
                  height={1024}
                  className="about-image h-auto max-w-full lg:w-full rounded-2xl transition-transform hover:scale-[1.02] duration-300"
                  decoding="async"
                />
              </AnimatedSection>
            </div>

            {/* Copy: 3rd on mobile, 2nd on desktop */}
            <div className="w-full">
              <AnimatedSection>
                <div className="space-y-4 text-justify text-slate-600 leading-relaxed text-base sm:text-lg">
                  <p className="indent-8 sm:indent-10">
                    MARVEL SOFTWARES is a technology and software engineering company focused on designing, developing, and delivering innovative digital solutions that help businesses operate smarter and grow faster. We work with startups, established businesses, and growing organizations to transform ideas into reliable digital products, including modern websites, high-performance web and mobile applications, integrated ERP and CRM systems, AI-powered solutions, and customized software platforms tailored to their unique business requirements.
                  </p>
                  <p className="indent-8 sm:indent-10">
                    Our approach combines modern technologies, thoughtful engineering, and a deep understanding of business needs. From initial consultation and requirement analysis to UI/UX design, development, testing, and secure deployment, we manage every stage of the software development lifecycle with a focus on quality and reliability. Through scalable architectures, intelligent automation, and continuous technical support, we help organizations streamline operations, improve efficiency, solve complex challenges, and build a strong foundation for sustainable digital growth.
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
                  To design, develop, and deliver innovative, scalable, and user-focused software solutions that simplify business operations, eliminate inefficiencies, and solve real-world challenges. We strive to combine modern technologies, strong engineering practices, and continuous innovation to build reliable digital products that improve productivity, create business value, and help our clients achieve their goals.
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
                  To become a trusted technology and software engineering partner recognized for delivering innovative, reliable, and impactful digital solutions. We envision a future where businesses of all sizes can leverage intelligent technologies, scalable software, and digital innovation to overcome challenges, unlock new opportunities, and achieve sustainable growth in an evolving digital world.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============ C. SERVICES OVERVIEW ============ */}
      <section id="services" aria-labelledby="services-title" className="section">
        <div className="container">
          <AnimatedSection className="text-center mx-auto w-full">
            <h2 id="services-title" className="text-section-title">
              Our Services
            </h2>
            <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
              From your first digital product to complex enterprise systems, we build
              technology around the way your business works.
            </p>
          </AnimatedSection>

          <ServiceShowcase />
        </div>
      </section>

      {/* ============ FULL-WIDTH DESIGNED CTA BANNER ============ */}
      <CTASection />

      {/* ============ D. OUR PROCESS ============ */}
      <section id="process" aria-labelledby="process-title" className="section section-warm">
        <div className="container">
          <OurProcess />
        </div>
      </section>

      {/* ============ E. TECHNOLOGIES ============ */}
      <section id="technologies" aria-labelledby="technologies-title" className="section">
        <div className="container">
          <AnimatedSection className="text-center mx-auto w-full">
            <h2 id="technologies-title" className="text-section-title">
              Technologies
            </h2>
            <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
              We leverage modern frameworks, scalable cloud architectures, and proven
              engineering practices to build powerful digital solutions. Every technology
              we choose is carefully selected to ensure exceptional performance, enhanced
              security, seamless scalability, and long-term reliability for your business.
            </p>
          </AnimatedSection>

          <WhyChooseUs />
        </div>
      </section>

      {/* ============ F. WHY CHOOSE MARVEL SOFTWARES ============ */}
      <section id="why-choose-us" aria-labelledby="why-choose-us-title" className="section section-warm">
        <WhyChooseMarvel />
      </section>

      {/* ============ G. OUR TEAM ============ */}
      <section id="team" aria-labelledby="team-heading" className="section">
        <OurTeam />
      </section>

      {/* ============ H. SELECTED PROJECTS ============ */}
      <section id="projects" aria-labelledby="work-title" className="section section-warm">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-4 w-full mx-auto">
            <h2 id="work-title" className="text-section-title">
              Our Projects
            </h2>
            <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
              Explore our portfolio of scalable web applications, digital platforms, and custom software solutions engineered for performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full" style={{ marginTop: 28 }}>
            {projects.map((project) => (
              <article
                key={project.id}
                className="project-card flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer text-inherit no-underline"
                style={cardStyle}
                role="button"
                tabIndex={0}
                aria-label={`Preview ${project.title}`}
                onClick={() => openProjectPreview(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openProjectPreview(project)
                  }
                }}
              >
                <div className="relative overflow-hidden w-full aspect-video bg-slate-100 border-b border-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-all duration-500 ease-out group-hover:scale-105 group-hover:blur-[3.5px]"
                    loading="lazy"
                  />
                  {/* Category badge - top left */}
                  <span className="project-category-badge absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10">
                    {project.category}
                  </span>

                  {/* Corner Click to preview badge - visible on PC, Mobile & all */}
                  <span className="project-corner-badge absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>Click to preview</span>
                  </span>

                  {/* Hover Overlay with 2 buttons: Preview & Visit Live */}
                  <div className="project-live-overlay absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 sm:gap-3 p-3 z-20">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        openProjectPreview(project)
                      }}
                      className="project-preview-btn transform translate-y-2 group-hover:translate-y-0"
                      aria-label={`Preview ${project.title}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0057E7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>Preview</span>
                    </button>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                      className="project-visit-btn transform translate-y-2 group-hover:translate-y-0"
                      aria-label={`Visit live site for ${project.title}`}
                    >
                      <span>Visit Live</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
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

                  <p className="text-card-desc leading-relaxed" style={{ marginTop: 12, flex: 1 }}>
                    {project.description}
                  </p>

                  {/* Mobile 2 Buttons: Preview & Visit Live (always visible on mobile) */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2.5 sm:hidden">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        openProjectPreview(project)
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-50 text-[#0057E7] border border-blue-200/80 text-xs font-semibold hover:bg-blue-100 active:scale-95 transition-all"
                      aria-label={`Preview ${project.title}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>Preview</span>
                    </button>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                      className="project-mobile-visit-btn flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#0057E7] text-white text-xs font-semibold shadow-xs hover:bg-[#0046b8] active:scale-95 transition-all text-center no-underline"
                      style={{ color: '#ffffff', backgroundColor: '#0057E7' }}
                      aria-label={`Visit live site for ${project.title}`}
                    >
                      <span style={{ color: '#ffffff' }}>Visit Live</span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                        style={{ color: '#ffffff', stroke: '#ffffff' }}
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ I. UPCOMING PROJECTS ============ */}
      <section id="upcoming-projects" aria-labelledby="upcoming-title" className="section">
        <UpcomingProjects />
      </section>

      {/* ============ J. OUR CLIENTS ============ */}
      <section id="clients" aria-labelledby="clients-heading" className="section section-warm">
        <OurClients />
      </section>

      {/* ============ K. TESTIMONIALS ============ */}
      <section id="testimonials" aria-labelledby="testimonials-heading" className="section testimonials-v2">
        <Testimonials />
      </section>

      {/* ============ L. CONTACT US ============ */}
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
            <div className="project-preview-frame relative">
              {iframeLoading && !previewFailed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/95 backdrop-blur-xs z-10">
                  <div className="w-9 h-9 rounded-full border-3 border-[#0057E7]/20 border-t-[#0057E7] animate-spin" />
                  <span className="text-xs text-[#0033A0] font-semibold tracking-wide">
                    Loading live preview...
                  </span>
                </div>
              )}
              {previewFailed ? (
                <div className="project-preview-fallback">
                  <div className="project-preview-fallback-note">
                    <strong>Live preview could not be loaded</strong>
                    <span>
                      The external website might be taking too long to respond or restricting embedding.
                    </span>
                    <a href={previewProject.url} target="_blank" rel="noopener noreferrer">
                      Open live site
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={getPreviewUrl(previewProject.url)}
                  title={`${previewProject.title} live preview`}
                  loading="eager"
                  className="project-preview-iframe"
                  onLoad={() => {
                    if (previewTimeoutRef.current !== null) {
                      window.clearTimeout(previewTimeoutRef.current)
                      previewTimeoutRef.current = null
                    }
                    setPreviewFailed(false)
                    setIframeLoading(false)
                  }}
                  onError={() => {
                    setPreviewFailed(true)
                    setIframeLoading(false)
                  }}
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

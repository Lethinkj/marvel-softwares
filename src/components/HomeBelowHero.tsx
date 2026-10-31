import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { renderAppIcon } from '../utils/iconResolver'
import AnimatedSection from './AnimatedSection'
import { OurProcess } from './OurProcess'
import { homeFaqs, homeServiceCards, projects, whyChooseUs } from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f9faff 100%)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

const sectionLinkStyle: React.CSSProperties = {
  color: 'var(--color-primary)',
  fontWeight: 600,
  fontSize: '15px',
}

const CheckIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 shrink-0" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="rgba(0, 87, 231, 0.10)" />
    <path
      d="M6 10.3l2.6 2.6L14.2 7"
      fill="none"
      stroke="var(--color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * Everything below the home hero.
 * Kept separate so the hero section can be worked on independently.
 */
export const HomeBelowHero: React.FC = () => {
  const [previewProject, setPreviewProject] = useState<(typeof projects)[number] | null>(null)
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('desktop')

  useEffect(() => {
    if (!previewProject) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewProject(null)
    }
    setPreviewDevice(window.matchMedia('(max-width: 640px)').matches ? 'mobile' : 'desktop')
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [previewProject])

  return (
  <>
    {/* ============ SERVICES ============ */}
    <section aria-labelledby="services-title" className="section">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <AnimatedSection style={{ maxWidth: 640 }}>
            <span className="eyebrow">Services</span>
            <h2 id="services-title" className="text-section-title" style={{ marginTop: 14 }}>
              What We Do
            </h2>
            <p className="text-body" style={{ marginTop: 14 }}>
              Four focused service areas, delivered by one team — from the first design
              conversation through to long-term support.
            </p>
          </AnimatedSection>

          <Link
            to="/#services"
            className="inline-flex items-center gap-2 shrink-0"
            style={sectionLinkStyle}
          >
            View all services
          </Link>
        </div>

        <div className="grid-cards-4" style={{ marginTop: 28 }}>
          {homeServiceCards.map((service, i) => (
            <AnimatedSection key={service.id} as="div" delay={i * 0.06} className="h-full">
              <Link
                to={service.to.replace(/^\/services/, '') || '#services'}
                className="build-card group flex flex-col h-full p-6"
                style={cardStyle}
              >
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-2xl"
                  style={{ background: '#F4F5FF', color: 'var(--color-primary)' }}
                  aria-hidden="true"
                >
                  {renderAppIcon(service.icon, 'w-6 h-6')}
                </span>

                <h3 className="text-card-title" style={{ marginTop: 18 }}>
                  {service.title}
                </h3>
                <p className="text-body text-[15px]" style={{ marginTop: 8, flex: 1 }}>
                  {service.line}
                </p>

                <span
                  className="inline-flex items-center gap-2 text-[14px] font-semibold"
                  style={{ color: 'var(--color-primary)', marginTop: 20 }}
                >
                  Learn more
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ============ WHO WE ARE ============ */}
    <section aria-labelledby="about-title" className="section section-warm">
      <div className="container">
        <div
          className="flex flex-col lg:grid lg:grid-cols-12 lg:items-center"
          style={{ gap: 'clamp(28px, 4vw, 56px)' }}
        >
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="intro-media">
              <img
                src="/hero-images/home-engineering.jpg"
                alt="Development workspace showing a laptop, phone and labelled engineering capabilities."
                width={1600}
                height={963}
                loading="lazy"
                decoding="async"
              />
              <span className="intro-media-badge">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--color-orange)' }}
                  aria-hidden="true"
                />
                One team, end to end
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <span className="eyebrow">Who we are</span>
            <h2 id="about-title" className="text-section-title" style={{ marginTop: 14 }}>
              Practical software, built with you.
            </h2>
            <p className="text-body" style={{ marginTop: 14 }}>
              Marvel Softwares is a software development team that works closely with
              businesses to turn requirements into reliable, usable products.
            </p>
            <p className="text-body" style={{ marginTop: 12 }}>
              We keep the process clear: understand the problem, agree the scope, design the
              experience and build it properly — with no jargon and no unnecessary layers.
            </p>

            <ul className="grid sm:grid-cols-2" style={{ marginTop: 24, gap: '12px 24px' }}>
              {[
                'Websites, web apps and mobile apps',
                'ERP and custom business systems',
                'UI/UX design and AI automation',
                'Maintenance and long-term support',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14.5px]"
                  style={{ color: 'var(--color-text)' }}
                >
                  <span style={{ marginTop: 2 }}>
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/#about"
              className="inline-flex items-center gap-2 text-[15px] font-semibold"
              style={{ color: 'var(--color-primary)', marginTop: 26 }}
            >
              More about us
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ============ FEATURED PROJECTS ============ */}
    <section aria-labelledby="work-title" className="section">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <AnimatedSection style={{ maxWidth: 640 }}>
            <span className="eyebrow">Featured projects</span>
            <h2 id="work-title" className="text-section-title" style={{ marginTop: 14 }}>
              Let the products speak for you.
            </h2>
            <p className="text-body" style={{ marginTop: 14 }}>
              Two platforms we designed and built from the ground up — both live today.
            </p>
          </AnimatedSection>

          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 shrink-0"
            style={sectionLinkStyle}
          >
            View all projects
          </Link>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ marginTop: 28, gap: 'var(--card-gap)' }}
        >
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} as="div" delay={i * 0.08} className="h-full">
              <article
                className="build-card group flex flex-col h-full overflow-hidden"
                style={cardStyle}
              >
                <div className="relative overflow-hidden aspect-video bg-slate-100">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    className="absolute top-3.5 left-3.5 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase"
                    style={{
                      letterSpacing: '0.08em',
                      background: 'rgba(255,255,255,0.95)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-primary)',
                      boxShadow: '0 6px 16px -10px rgba(23,32,51,0.4)',
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <h3 className="text-card-title" style={{ fontSize: '1.15rem' }}>
                    {project.title}
                  </h3>
                  <p className="text-body text-[15px]" style={{ marginTop: 10 }}>
                    {project.summary ?? project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2" style={{ marginTop: 14 }}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                        style={{ background: '#F4F5FF', color: 'var(--color-primary)' }}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-3" style={{ marginTop: 20 }}>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-[15px] font-semibold"
                      style={{ color: 'var(--color-primary)' }}
                      onClick={() => setPreviewProject(project)}
                    >
                      Visit Live
                    </button>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] font-semibold"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Open in new tab
                    </a>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ============ WHY MARVEL SOFTWARES ============ */}
    <section aria-labelledby="why-title" className="section section-warm">
      <div className="container">
        <AnimatedSection style={{ maxWidth: 640 }}>
          <h2 id="why-title" className="text-section-title">
            Why Marvel Softwares?
          </h2>
          <p className="text-body" style={{ marginTop: 14 }}>
            Three things we do not compromise on.
          </p>
        </AnimatedSection>

        <div className="grid-cards-3" style={{ marginTop: 28 }}>
          {whyChooseUs.map((item, i) => (
            <AnimatedSection key={item.title} as="div" delay={i * 0.08} className="h-full">
              <article className="p-7 h-full" style={cardStyle}>
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{
                    background: '#F4F5FF',
                    color: 'var(--color-primary)',
                    marginBottom: 16,
                  }}
                  aria-hidden="true"
                >
                  {renderAppIcon(item.icon, 'w-5 h-5')}
                </span>
                <h3 className="text-card-title" style={{ marginBottom: 8, fontSize: '1.05rem' }}>
                  {item.title}
                </h3>
                <p className="text-body text-[15px]">{item.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-white p-6"
          style={{
            marginTop: 32,
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div>
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
              Already have a product that needs work?
            </p>
            <p className="text-body text-[14px]" style={{ marginTop: 4 }}>
              We can review, improve or take over an existing website or application.
            </p>
          </div>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center min-h-[46px] px-5 text-[14px] font-semibold shrink-0"
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              borderRadius: 'var(--radius-button)',
              boxShadow: 'var(--shadow-button)',
            }}
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>

    {/* ============ OUR PROCESS ============ */}
    <section aria-labelledby="process-title" className="section">
      <div className="container">
        <OurProcess />
      </div>
    </section>

    {/* ============ FAQ ============ */}
    <section aria-labelledby="faq-title" className="section section-warm">
      <div className="container">
        <div
          className="flex flex-col lg:grid lg:grid-cols-12"
          style={{ gap: 'clamp(28px, 4vw, 56px)' }}
        >
          <div className="lg:col-span-4">
            <span className="eyebrow">Questions</span>
            <h2 id="faq-title" className="text-section-title" style={{ marginTop: 14 }}>
              Before we start.
            </h2>
            <p className="text-body" style={{ marginTop: 14 }}>
              A few things people usually ask us. If yours is not here, just send a message.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 text-[15px] font-semibold"
              style={{ color: 'var(--color-primary)', marginTop: 20 }}
            >
              Ask us directly
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="faq-list">
              {homeFaqs.map((faq) => (
                <details key={faq.question} className="faq-item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ CONTACT CTA ============ */}
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden text-center"
      style={{
        background: 'linear-gradient(120deg, #00227A 0%, #0057E7 58%, #0087FF 100%)',
        paddingBlock: 'clamp(56px, 7vw, 88px)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(600px 300px at 15% 20%, rgba(0,207,255,0.28), rgba(0,207,255,0) 70%), radial-gradient(520px 280px at 85% 85%, rgba(255,90,0,0.18), rgba(255,90,0,0) 70%)',
        }}
      />
      <div className="container relative">
        <h2 id="cta-title" className="text-section-title" style={{ color: '#fff' }}>
          Have a Project in Mind?
        </h2>
        <p
          style={{
            marginTop: 14,
            color: 'rgba(255,255,255,0.86)',
            fontSize: 'var(--font-body-size)',
          }}
        >
          Let&apos;s build the right solution for your business.
        </p>
        <div style={{ marginTop: 30 }}>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center min-h-[54px] px-8 text-base font-semibold"
            style={{
              background: '#fff',
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-button)',
              boxShadow: '0 16px 34px -14px rgba(0, 0, 0, 0.45)',
            }}
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
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
              <iframe
                src={previewProject.url}
                title={`${previewProject.title} live preview`}
                loading="eager"
                className="project-preview-iframe"
              />
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
    </>
  )
}

export default HomeBelowHero

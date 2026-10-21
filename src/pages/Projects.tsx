import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Seo from '../components/Seo'
import { renderAppIcon } from '../utils/iconResolver'
import { projects, type Project } from '../data/siteData'
import ProjectsCta from '../components/ProjectsCta'

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f9faff 100%)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

export const Projects: React.FC = () => {
  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Our Projects | Marvel Softwares"
        description="Explore our software projects, applications and digital solutions built to address real business needs."
        path="/projects"
      />

      {/* Heading + working filters */}
      <section aria-labelledby="projects-heading" className="page-hero page-hero--center page-hero--cool">
        {/* Decorative brand artwork */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          className="page-hero-art"
        >
          <defs>
            <radialGradient id="prj-hero-glow-a" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#00cfff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00cfff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="prj-hero-glow-b" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#0057e7" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0057e7" stopOpacity="0" />
            </radialGradient>
            <pattern id="prj-hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#0086c9" opacity="0.16" />
            </pattern>
          </defs>

          <ellipse cx="600" cy="20" rx="520" ry="300" fill="url(#prj-hero-glow-a)" />
          <ellipse cx="120" cy="530" rx="340" ry="230" fill="url(#prj-hero-glow-b)" />
          <ellipse cx="1100" cy="500" rx="320" ry="220" fill="url(#prj-hero-glow-b)" />
          <rect width="1200" height="560" fill="url(#prj-hero-dots)" />

          <g fill="none" stroke="#0086c9" strokeOpacity="0.12" strokeWidth="1.5">
            <path d="M-40 470 Q 320 330 700 372" />
            <path d="M-40 540 Q 340 386 720 430" />
            <circle cx="1090" cy="120" r="160" />
            <circle cx="1090" cy="120" r="235" />
          </g>
        </svg>

        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <h1 id="projects-heading" className="text-page-title">
              Our Projects
            </h1>

            <p className="page-hero-text text-body" style={{ marginTop: 18, fontSize: '1.0625rem' }}>
              Explore software products and digital experiences built to solve practical
              problems and support business goals. Every project begins with a
              requirement — and ends with a product your team can keep evolving.
            </p>

            <ul className="page-hero-chiprow">
              {[
                { icon: 'web', label: 'Websites' },
                { icon: 'dashboard', label: 'Web applications' },
                { icon: 'mobile', label: 'Learning platforms' },
                { icon: 'layers', label: 'LMS systems' },
              ].map((item) => (
                <li key={item.label} className="page-hero-chiprow-item">
                  <span className="page-hero-chiprow-icon" aria-hidden="true">
                    {renderAppIcon(item.icon, 'w-4 h-4')}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Grid + honest framing + empty state */}
      <section aria-label="Project portfolio" className="section section-warm">
        <div className="container">
          <p
            className="text-center text-sm"
            style={{ color: 'var(--color-text-muted)', marginBottom: 32, fontStyle: 'italic' }}
            role="note"
          >
            Featured client platforms and digital products engineered and deployed by Marvel Softwares.
          </p>

          <div
            id="portfolio-grid"
            aria-label="Project portfolio"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project: Project) => (
                <motion.a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3 }}
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
                      <h2 className="text-card-title text-xl font-bold group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h2>
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
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <ProjectsCta />
    </div>
  )
}

export default Projects

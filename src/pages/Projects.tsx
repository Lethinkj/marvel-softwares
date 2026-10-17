import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Seo from '../components/Seo'
import { projects, type Project } from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: '#fff',
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
      <section aria-labelledby="projects-heading">
        <div className="container text-center" style={{ paddingBlock: 'clamp(48px,6vw,80px)', maxWidth: 780, marginInline: 'auto' }}>
          <h1 id="projects-heading" className="text-page-title" style={{ marginTop: 16 }}>
            Our Projects
          </h1>
          <p className="text-body" style={{ marginTop: 18, fontSize: '1.125rem', marginInline: 'auto' }}>
            Explore software products and digital experiences built to solve practical
            problems and support business goals. Every project begins with a
            requirement. Our focus is on translating that requirement into a clear user
            experience, a suitable technical implementation and a product that can
            evolve with changing needs.
          </p>
        </div>
      </section>

      {/* Grid + honest framing + empty state */}
      <section aria-label="Project examples" className="section section-warm">
        <div className="container">
          <p
            className="text-center text-sm"
            style={{ color: 'var(--color-text-muted)', marginBottom: 28, fontStyle: 'italic' }}
            role="note"
          >
            Representative solution examples. Final scope and features are agreed with each client before development.
          </p>

          <div
            id="portfolio-grid"
            aria-label="Project examples"
            className="grid-cards-3"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project: Project) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col overflow-hidden transition-all hover:-translate-y-1"
                    style={cardStyle}
                  >
                    <div
                      className="flex items-center justify-between px-6"
                      style={{
                        height: 132,
                        background: `linear-gradient(135deg, ${project.color}24 0%, #fff 80%)`,
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
                        className="block w-12 h-12 rounded-2xl bg-white transition-transform"
                        style={{ border: '1px solid var(--color-border)', background: `linear-gradient(135deg, ${project.color}55, #fff)` }}
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <h2 className="text-card-title">{project.title}</h2>
                      <p className="text-body text-[15px]" style={{ marginTop: 8, flex: 1 }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap" style={{ gap: 8, marginTop: 16 }}>
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
                  </motion.article>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="projects-cta" className="section" style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
        <div
          className="relative overflow-hidden text-center"
          style={{
            background: 'linear-gradient(120deg, var(--color-cyan) 0%, var(--color-primary) 100%)',
            color: '#fff',
            padding: 'clamp(48px,7vw,84px) clamp(24px,5vw,64px)',
          }}
        >
          {/* Modern pattern: mesh glow + edge-faded fine grid + glass tiles */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            <defs>
              <radialGradient id="projects-glow-a" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="projects-glow-b" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#001f80" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#001f80" stopOpacity="0" />
              </radialGradient>
              <pattern id="projects-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0 H0 V48" fill="none" stroke="#fff" strokeWidth={1} opacity={0.4} />
              </pattern>
              <radialGradient id="projects-grid-fade" cx="0.5" cy="0.5" r="0.65">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="projects-grid-mask">
                <rect width="1200" height="400" fill="url(#projects-grid-fade)" />
              </mask>
            </defs>

            <ellipse cx={1030} cy={360} rx={400} ry={280} fill="url(#projects-glow-a)" />
            <ellipse cx={150} cy={40} rx={380} ry={260} fill="url(#projects-glow-b)" />
            <rect width="1200" height="400" fill="url(#projects-grid)" mask="url(#projects-grid-mask)" />

            {/* floating glass tiles */}
            <g className="svg-float" opacity={0.5}>
              <rect x={300} y={90} width={72} height={72} rx={16} fill="#fff" opacity={0.14} stroke="#fff" strokeWidth={1.5} />
              <rect x={840} y={250} width={56} height={56} rx={14} fill="#fff" opacity={0.12} stroke="#fff" strokeWidth={1.5} />
            </g>

            {/* accent nodes */}
            <g fill="#fff" opacity={0.8}>
              <circle cx={210} cy={280} r={5} />
              <circle cx={990} cy={120} r={5} />
            </g>
            <path d="M210 280 H420" fill="none" stroke="#fff" strokeWidth={2} opacity={0.4} strokeDasharray="3 12" className="svg-flow" />

            <g className="svg-float" strokeLinecap="round" strokeWidth={3}>
              <path d="M540 90 v18 M531 99 h18" stroke="#fff" opacity={0.85} />
              <path d="M680 320 v16 M672 328 h16" stroke="#001f80" opacity={0.6} />
            </g>
            <circle cx={600} cy={200} r={5} fill="#fff" opacity={0.9} className="svg-pulse" />
          </svg>

          <div className="relative" style={{ zIndex: 1 }}>
            <h2 id="projects-cta" className="text-section-title" style={{ color: '#fff' }}>
              Have a Similar Idea? Let&apos;s Discuss It.
            </h2>
            <p className="text-body" style={{ color: 'rgba(255,255,255,.9)', marginTop: 14, marginInline: 'auto', maxWidth: 600 }}>
              Share your requirements and we&apos;ll explore a practical way forward for
              your business.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center min-h-[52px] px-8 text-base font-semibold"
              style={{ background: '#fff', color: 'var(--color-primary)', borderRadius: 'var(--radius-button)', marginTop: 28 }}
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects

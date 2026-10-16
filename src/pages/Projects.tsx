import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import AnimatedSection from '../components/AnimatedSection'
import Seo from '../components/Seo'
import { projects, projectCategories, type Project } from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((p: Project) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Our Projects | Marvel Softwares"
        description="Explore our software projects, applications and digital solutions built to address real business needs."
        path="/projects"
      />

      {/* Heading + working filters */}
      <section aria-labelledby="projects-heading" className="section-warm">
        <div className="container text-center" style={{ paddingBlock: 'clamp(48px,7vw,88px)', maxWidth: 780, marginInline: 'auto' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Our portfolio</p>
          <h1 id="projects-heading" className="text-page-title" style={{ marginTop: 16 }}>
            Software Built to Solve Real Problems
          </h1>
          <p className="text-body" style={{ marginTop: 18, marginInline: 'auto', fontSize: '1.125rem' }}>
            Explore software products and digital experiences built to solve practical
            problems and support business goals.
          </p>
          <p className="text-body" style={{ marginTop: 12, marginInline: 'auto' }}>
            Every project begins with a requirement. Our focus is on translating that
            requirement into a clear user experience, a suitable technical
            implementation and a product that can evolve with changing needs.
          </p>

          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center justify-center"
            style={{ gap: 10, marginTop: 32 }}
          >
            {projectCategories.map((category) => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={active}
                  className="inline-flex items-center justify-center min-h-[44px] px-5 text-sm font-semibold transition-all"
                  style={{
                    borderRadius: 'var(--radius-button)',
                    background: active ? 'var(--color-primary)' : '#fff',
                    color: active ? '#fff' : 'var(--color-text)',
                    border: active
                      ? '1.5px solid var(--color-primary)'
                      : '1.5px solid var(--color-border)',
                  }}
                >
                  {category === 'All' ? 'All Projects' : category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grid + honest framing + empty state */}
      <section aria-label="Project examples" className="section">
        <div className="container">
          <p
            className="text-center text-sm"
            style={{ color: 'var(--color-text-muted)', marginBottom: 28, fontStyle: 'italic' }}
            role="note"
          >
            Showing {filteredProjects.length} of {projects.length} representative solution
            examples. Final scope and features are agreed with each client before development.
          </p>

          <div
            id="portfolio-grid"
            role="region"
            aria-live="polite"
            aria-label={`${activeCategory} projects`}
            className="grid-cards-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project: Project) => (
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
                ))
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                  style={{ gridColumn: '1 / -1', paddingBlock: 48 }}
                  role="status"
                >
                  <h2 className="text-card-title">No examples in this category yet</h2>
                  <p className="text-body" style={{ marginTop: 10, marginInline: 'auto', maxWidth: 480 }}>
                    We don&apos;t have an example under “{activeCategory}” right now — but
                    if that&apos;s what you need, tell us about it and we&apos;ll explore
                    the right approach together.
                  </p>
                  <div className="flex flex-wrap justify-center" style={{ gap: 12, marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory('All')}
                      className="inline-flex items-center justify-center min-h-[48px] px-6 text-[15px] font-semibold"
                      style={{
                        border: '2px solid var(--color-primary)',
                        color: 'var(--color-primary)',
                        borderRadius: 'var(--radius-button)',
                      }}
                    >
                      View All Projects
                    </button>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center min-h-[48px] px-6 text-[15px] font-semibold text-white"
                      style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-button)' }}
                    >
                      Discuss Your Idea
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="projects-cta" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <AnimatedSection
            className="text-center"
            style={{
              borderRadius: 28,
              background: 'linear-gradient(120deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
              color: '#fff',
              padding: 'clamp(40px,6vw,68px) clamp(24px,5vw,64px)',
            }}
          >
            <h2 id="projects-cta" className="text-section-title" style={{ color: '#fff' }}>
              Have a Similar Idea? Let&apos;s Discuss It.
            </h2>
            <p className="text-body" style={{ color: 'rgba(255,255,255,.88)', marginTop: 14, marginInline: 'auto', maxWidth: 600 }}>
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
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

export default Projects

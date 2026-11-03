import React from 'react'
import AnimatedSection from './AnimatedSection'
import { upcomingProjects, type UpcomingProject } from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f9faff 100%)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

export const UpcomingProjects: React.FC = () => {
  return (
    <div className="container">
      {/* Section Header matching Our Projects alignment */}
      <div className="flex flex-col items-center text-center gap-4 w-full mx-auto">
        <h2 id="upcoming-title" className="text-section-title">
          Upcoming Projects
        </h2>
        <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
          Next-generation software platforms and digital solutions currently in active development by Marvel Softwares.
        </p>
      </div>

      {/* Cards aligned with the exact dimensions and grid of the project card section */}
      <div
        className="flex flex-wrap justify-start gap-6 w-full"
        style={{ marginTop: 28 }}
      >
        {upcomingProjects.map((project: UpcomingProject, index: number) => (
          <div
            key={project.id}
            className="w-full md:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)] flex flex-col"
          >
            <AnimatedSection delay={index * 0.12} className="h-full">
              <article
                className="project-card flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group select-none text-inherit no-underline"
                style={cardStyle}
              >
                {/* Image banner with category badge & status indicator */}
                <div className="relative overflow-hidden w-full aspect-video bg-slate-100 border-b border-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Category badge - top left */}
                  <span className="project-category-badge absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10">
                    {project.category}
                  </span>

                  {/* Status badge - top right */}
                  <span className="project-corner-badge absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10">
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span>{project.status}</span>
                  </span>
                </div>

                {/* Content body matching project card typography & padding */}
                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-card-title group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-card-desc leading-relaxed mt-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3.5 border-t border-slate-100">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </AnimatedSection>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingProjects

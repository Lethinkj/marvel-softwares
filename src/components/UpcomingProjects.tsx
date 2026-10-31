import React from 'react'
import AnimatedSection from './AnimatedSection'
import { upcomingProjects, type UpcomingProject } from '../data/siteData'

export const UpcomingProjects: React.FC = () => {
  return (
    <div className="container">
      <AnimatedSection style={{ maxWidth: 720 }} className="text-center mx-auto">
        <h2 id="upcoming-title" className="text-section-title">
          Upcoming Projects
        </h2>
        <p className="section-subtitle">
          Next-generation software platforms and digital solutions currently in active development by Marvel Softwares.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full" style={{ marginTop: 40 }}>
        {upcomingProjects.map((project: UpcomingProject, index: number) => (
          <AnimatedSection key={project.id} delay={index * 0.12}>
            <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
              {/* Image banner with status overlay */}
              <div className="relative overflow-hidden w-full aspect-video bg-gradient-to-br from-slate-100 to-blue-50 border-b border-slate-200/80">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category badge */}
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm shadow-sm border border-slate-200/80 text-slate-800 z-10">
                  {project.category}
                </span>

                {/* Status pill with glowing indicator */}
                <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-white backdrop-blur-md shadow-md z-10">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <span>{project.status}</span>
                </span>
              </div>

              {/* Content body */}
              <div className="flex flex-col flex-1 p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-card-title group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-body leading-relaxed mt-3 flex-1">
                  {project.description}
                </p>

                {/* Progress bar & target release */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Build Progress
                    </span>
                    <span className="text-blue-600 font-bold">{project.progress}%</span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${project.progress}%`,
                        background: `linear-gradient(90deg, #0057E7, ${project.accentColor})`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                    <span>Target Release: <strong className="text-slate-700">{project.targetRelease}</strong></span>
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Private Preview
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
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
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}

export default UpcomingProjects

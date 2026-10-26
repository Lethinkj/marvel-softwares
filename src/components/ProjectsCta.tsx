import React from 'react'
import { Link } from 'react-router-dom'

const CAPABILITIES = [
  { label: 'Websites', to: '/services#website-development' },
  { label: 'Web Apps', to: '/services#web-application-development' },
  { label: 'Mobile Apps', to: '/services#mobile-app-development' },
  { label: 'Custom Software', to: '/services#custom-software-development' },
  { label: 'AI & Automation', to: '/services#ai-automation' },
]

/**
 * Projects CTA — a cyan panel with one clear action.
 * Deliberately different from the other page CTAs: a single wide button
 * instead of a button pair, plus a short capability list.
 */
export const ProjectsCta: React.FC = () => (
  <section aria-labelledby="projects-cta" className="section projects-cta-section">
    <div className="container">
      <div className="proj-cta-panel">
        {/* Decorative artwork */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1200 480"
          preserveAspectRatio="xMidYMid slice"
          className="proj-cta-art"
        >
          <defs>
            <radialGradient id="proj-glow-a" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="proj-glow-b" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#001f80" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#001f80" stopOpacity="0" />
            </radialGradient>
            <pattern id="proj-grid" width="46" height="46" patternUnits="userSpaceOnUse">
              <path d="M46 0 H0 V46" fill="none" stroke="#fff" strokeWidth="1" opacity="0.26" />
            </pattern>
            <linearGradient id="proj-grid-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="proj-grid-mask">
              <rect width="1200" height="480" fill="url(#proj-grid-fade)" />
            </mask>
          </defs>

          <ellipse cx="1080" cy="40" rx="420" ry="280" fill="url(#proj-glow-a)" />
          <ellipse cx="100" cy="460" rx="380" ry="240" fill="url(#proj-glow-b)" />
          <rect width="1200" height="480" fill="url(#proj-grid)" mask="url(#proj-grid-mask)" />

          <g className="svg-float" opacity="0.4">
            <rect x="1040" y="300" width="52" height="52" rx="14" fill="#fff" opacity="0.16" stroke="#fff" strokeWidth="1.5" />
          </g>
        </svg>

        <div className="proj-cta-inner">
          <div className="proj-cta-copy">
            <span className="proj-cta-eyebrow">
              <span className="proj-cta-eyebrow-dot" aria-hidden="true" />
              Your turn
            </span>
            <h2 id="projects-cta" className="proj-cta-title">
              Have a similar idea? Let&apos;s build it together.
            </h2>
            <p className="proj-cta-text">
              Share your requirements and we&apos;ll explore a practical way forward for
              your business — from the first conversation through to launch and ongoing
              support.
            </p>

            {/* Single wide action */}
            <Link to="/contact" className="proj-cta-btn">
              <span className="proj-cta-btn-label">Start a Project</span>
            </Link>
          </div>

          {/* What we build */}
          <div className="proj-cta-capabilities">
            <p className="proj-cta-capabilities-label">What we build</p>
            <ul className="proj-cta-capabilities-list">
              {CAPABILITIES.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="proj-cta-capability">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default ProjectsCta

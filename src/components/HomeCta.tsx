import React from 'react'
import { Link } from 'react-router-dom'
import { CheckIcon, MailIcon, PhoneIcon } from './Icons'
import { siteConfig } from '../data/siteData'

interface NextStep {
  number: string
  title: string
  text: string
}

/** What the client sees after sending the form — keeps the CTA concrete. */
const nextSteps: NextStep[] = [
  {
    number: '01',
    title: 'Tell us about the idea',
    text: 'Share the problem you want to solve and who needs it solved.',
  },
  {
    number: '02',
    title: 'Get a scope and a plan',
    text: 'We agree the requirements, the approach and the timeline before work starts.',
  },
  {
    number: '03',
    title: 'Build, launch and support',
    text: 'We design, develop and deploy — then keep improving the product after it goes live.',
  },
]

/** Reassurance points — service promises, no metrics or claims. */
const assurances: string[] = [
  'Scope agreed before we build',
  'Plain-language updates, no jargon',
  'Support and maintenance after launch',
]

/**
 * Home CTA — closing call to action.
 * A rounded brand panel instead of a flat banner: the left column carries the
 * message and the actions, the right column answers "what happens next".
 */
export const HomeCta: React.FC = () => (
  <section aria-labelledby="cta-title" className="section home-cta-section">
    <div className="container">
      <div className="home-cta-panel">
        {/* Decorative brand artwork */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1200 620"
          preserveAspectRatio="xMidYMid slice"
          className="home-cta-art"
        >
          <defs>
            <radialGradient id="hcta-glow-cyan" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#00cfff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00cfff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hcta-glow-orange" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ff5a00" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#ff5a00" stopOpacity="0" />
            </radialGradient>
            <pattern id="hcta-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.6" fill="#ffffff" opacity="0.16" />
            </pattern>
            <linearGradient id="hcta-rail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00cfff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00cfff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#00cfff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <ellipse cx="1050" cy="90" rx="380" ry="260" fill="url(#hcta-glow-cyan)" />
          <ellipse cx="120" cy="560" rx="340" ry="240" fill="url(#hcta-glow-orange)" />
          <rect width="1200" height="620" fill="url(#hcta-dots)" opacity="0.5" />

          {/* concentric rings on the right */}
          <g fill="none" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.5">
            <circle cx="1030" cy="300" r="150" />
            <circle cx="1030" cy="300" r="210" />
            <circle cx="1030" cy="300" r="270" />
          </g>

          {/* dashed accent rails */}
          <path
            d="M40 556 H300"
            fill="none"
            stroke="url(#hcta-rail)"
            strokeWidth="2"
            strokeDasharray="4 12"
            className="svg-flow"
          />
          <path
            d="M880 566 H1150"
            fill="none"
            stroke="url(#hcta-rail)"
            strokeWidth="2"
            strokeDasharray="4 12"
            className="svg-flow"
          />

          {/* corner sparkles — kept clear of the copy columns */}
          <g className="svg-float" strokeLinecap="round" strokeWidth="3">
            <path d="M1166 64 v16 M1158 72 h16" stroke="#00cfff" opacity="0.7" />
            <path d="M44 578 v14 M37 585 h14" stroke="#ffb800" opacity="0.6" />
          </g>
        </svg>

        <div className="home-cta-grid">
          {/* ---------- Message + actions ---------- */}
          <div className="home-cta-copy">
            <span className="home-cta-eyebrow">
              <span className="home-cta-eyebrow-dot" aria-hidden="true" />
              Let&apos;s work together
            </span>

            <h2 id="cta-title" className="home-cta-title">
              Let&apos;s Build Something{' '}
              <span className="home-cta-title-accent">Great Together!</span>
            </h2>

            <p className="home-cta-text">
              Tell us what you&apos;re trying to solve. We&apos;ll help you explore the right
              software approach for your business — from a single website to a connected
              enterprise platform.
            </p>

            <div className="home-cta-actions">
              <Link to="/contact" className="home-cta-btn home-cta-btn--primary">
                Start a Project
              </Link>
              <Link to="/services" className="home-cta-btn home-cta-btn--ghost">
                Explore Our Services
              </Link>
            </div>

            <ul className="home-cta-assurances">
              {assurances.map((item) => (
                <li key={item} className="home-cta-assurance">
                  <span className="home-cta-assurance-icon" aria-hidden="true">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- What happens next ---------- */}
          <div className="home-cta-card">
            <p className="home-cta-card-label">What happens next</p>

            <ol className="home-cta-steps">
              {nextSteps.map((step, i) => (
                <li key={step.number} className="home-cta-step">
                  {i < nextSteps.length - 1 && (
                    <span className="home-cta-step-rail" aria-hidden="true" />
                  )}
                  <span className="home-cta-step-number" aria-hidden="true">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="home-cta-step-title">{step.title}</h3>
                    <p className="home-cta-step-text">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="home-cta-contact">
              <a
                href={`mailto:${siteConfig.email}`}
                className="home-cta-contact-link break-anywhere"
              >
                <span className="home-cta-contact-icon" aria-hidden="true">
                  <MailIcon className="w-4 h-4" />
                </span>
                {siteConfig.email}
              </a>

              <div className="home-cta-contact-link home-cta-contact-wide">
                <span className="home-cta-contact-icon" aria-hidden="true">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                <span className="home-cta-contact-phones">
                  <a href={siteConfig.phoneHref} className="home-cta-contact-phone">
                    {siteConfig.phone}
                  </a>
                  <span aria-hidden="true" className="home-cta-contact-sep">
                    |
                  </span>
                  <a href={siteConfig.phone2Href} className="home-cta-contact-phone">
                    {siteConfig.phone2}
                  </a>
                </span>
              </div>

              <p className="home-cta-contact-note home-cta-contact-wide">{siteConfig.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default HomeCta

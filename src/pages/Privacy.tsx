import Seo from '../components/Seo'
import { siteConfig } from '../data/siteData'

/**
 * Privacy Policy.
 * Plain-language summary of what the site collects, why and for how long.
 */

const SECTIONS = [
  {
    title: 'Information you share',
    body: 'When you use the contact form or email us, you may share your name, email address, phone number, company and details about your project. We only ask for what we need to understand and respond to your enquiry.',
  },
  {
    title: 'How we use it',
    body: 'We use this information to reply to your enquiry, discuss your requirements and prepare a response. We do not sell your information.',
  },
  {
    title: 'Sharing',
    body: 'We do not share your details with third parties for marketing. Information may be handled by service providers that help us run this website or our email, only as needed to provide those services.',
  },
  {
    title: 'Retention',
    body: 'We keep enquiry information only for as long as needed to respond and maintain our working relationship.',
  },
  {
    title: 'Cookies',
    body: 'This website does not use advertising cookies. If analytics or other cookies are added in future, this page will be updated.',
  },
]

export function Privacy() {
  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Privacy Policy | Marvel Softwares"
        description="How Marvel Softwares handles the information you share through this website."
        path="/privacy"
      />

      {/* Page heading */}
      <section aria-labelledby="privacy-heading" className="page-hero">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1200 460"
          preserveAspectRatio="xMidYMid slice"
          className="page-hero-art"
        >
          <defs>
            <radialGradient id="pv-hero-glow-a" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#0057e7" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0057e7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pv-hero-glow-b" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#00cfff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#00cfff" stopOpacity="0" />
            </radialGradient>
            <pattern id="pv-hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#0057e7" opacity="0.14" />
            </pattern>
          </defs>

          <ellipse cx="1000" cy="50" rx="380" ry="250" fill="url(#pv-hero-glow-a)" />
          <ellipse cx="140" cy="440" rx="340" ry="230" fill="url(#pv-hero-glow-b)" />
          <rect width="1200" height="460" fill="url(#pv-hero-dots)" />

          <g fill="none" stroke="#0057e7" strokeOpacity="0.12" strokeWidth="1.5">
            <circle cx="1060" cy="180" r="150" />
            <circle cx="1060" cy="180" r="225" />
          </g>
        </svg>

        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <span className="page-hero-eyebrow">
              <span className="page-hero-eyebrow-dot" aria-hidden="true" />
              Legal
            </span>

            <h1 id="privacy-heading" className="text-page-title" style={{ marginTop: 18 }}>
              Privacy Policy
            </h1>

            <p className="page-hero-text text-body" style={{ marginTop: 18, fontSize: '1.0625rem' }}>
              This page explains what information we collect through this website, why we
              collect it and how it is handled.
            </p>

            <ul className="page-hero-chips">
              {['No selling of data', 'No marketing sharing', 'Enquiries kept only as needed'].map(
                (chip) => (
                  <li key={chip} className="page-hero-chip">
                    <span className="page-hero-chip-dot" aria-hidden="true" />
                    {chip}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Policy content */}
      <section aria-label="Policy details" className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          {SECTIONS.map((section) => (
            <div key={section.title} style={{ marginBottom: 30 }}>
              <h2 className="text-card-title" style={{ fontSize: '1.15rem' }}>
                {section.title}
              </h2>
              <p className="text-body" style={{ marginTop: 10 }}>
                {section.body}
              </p>
            </div>
          ))}

          <div
            className="p-6"
            style={{
              background: 'var(--color-background-warm)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
            }}
          >
            <h2 className="text-card-title" style={{ fontSize: '1.05rem' }}>
              Contact
            </h2>
            <p className="text-body" style={{ marginTop: 8 }}>
              If you have a question about this policy, email{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                style={{ color: 'var(--color-primary)', fontWeight: 600 }}
              >
                {siteConfig.email}
              </a>{' '}
              or call{' '}
              <a href={siteConfig.phoneHref} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                {siteConfig.phone}
              </a>
              .
            </p>
          </div>

          <p className="text-body" style={{ marginTop: 26, fontSize: 13 }}>
            Last updated: October 2026
          </p>
        </div>
      </section>
    </div>
  )
}

export default Privacy

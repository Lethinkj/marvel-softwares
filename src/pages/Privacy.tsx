import React from 'react'
import Seo from '../components/Seo'
import { siteConfig } from '../data/siteData'

const headingStyle: React.CSSProperties = {
  marginTop: 34,
  fontSize: '1.15rem',
  fontWeight: 700,
  color: 'var(--color-text)',
}

export function Privacy() {
  return (
    <div className="w-full bg-white">
      <Seo
        title="Privacy Policy | Marvel Softwares"
        description="How Marvel Softwares handles the information you share through this website."
        path="/privacy"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Legal</span>
          <h1 className="text-page-title" style={{ marginTop: 14 }}>
            Privacy Policy
          </h1>
          <p className="text-body" style={{ marginTop: 16 }}>
            This page explains what information we collect through this website, why we
            collect it and how it is handled.
          </p>

          <h2 style={headingStyle}>Information you share</h2>
          <p className="text-body" style={{ marginTop: 10 }}>
            When you use the contact form or email us, you may share your name, email
            address, phone number, company and details about your project. We only ask for
            what we need to understand and respond to your enquiry.
          </p>

          <h2 style={headingStyle}>How we use it</h2>
          <p className="text-body" style={{ marginTop: 10 }}>
            We use this information to reply to your enquiry, discuss your requirements and
            prepare a response. We do not sell your information.
          </p>

          <h2 style={headingStyle}>Sharing</h2>
          <p className="text-body" style={{ marginTop: 10 }}>
            We do not share your details with third parties for marketing. Information may be
            handled by service providers that help us run this website or our email, only as
            needed to provide those services.
          </p>

          <h2 style={headingStyle}>Retention</h2>
          <p className="text-body" style={{ marginTop: 10 }}>
            We keep enquiry information only for as long as needed to respond and maintain our
            working relationship.
          </p>

          <h2 style={headingStyle}>Cookies</h2>
          <p className="text-body" style={{ marginTop: 10 }}>
            This website does not use advertising cookies. If analytics or other cookies are
            added in future, this page will be updated.
          </p>

          <h2 style={headingStyle}>Contact</h2>
          <p className="text-body" style={{ marginTop: 10 }}>
            If you have a question about this policy, email{' '}
            <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--color-primary)' }}>
              {siteConfig.email}
            </a>
            .
          </p>

          <p className="text-body" style={{ marginTop: 28, fontSize: 13 }}>
            Last updated: October 2026
          </p>
        </div>
      </section>
    </div>
  )
}

export default Privacy

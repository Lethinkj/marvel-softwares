import React from 'react'
import { Link } from 'react-router-dom'
import { renderAppIcon } from '../utils/iconResolver'
import AnimatedSection from '../components/AnimatedSection'
import Seo from '../components/Seo'
import { workingPrinciples, teamRoles } from '../data/siteData'

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)',
}

export const About: React.FC = () => (
  <div className="w-full bg-white overflow-x-clip">
    <Seo
      title="About Marvel Softwares | Our Approach"
      description="Learn about Marvel Softwares and our approach to building practical, scalable and user-focused digital solutions."
      path="/about"
    />

    {/* A. Introduction */}
    <section aria-labelledby="about-heading">
      <div className="container text-center" style={{ paddingBlock: 'clamp(48px,6vw,80px)', maxWidth: 780, marginInline: 'auto' }}>
        <h1 id="about-heading" className="text-page-title" style={{ marginTop: 16 }}>
          About Us
        </h1>
        <p className="text-body" style={{ marginTop: 20, marginInline: 'auto' }}>
          MARVEL SOFTWARES develops websites, applications, enterprise systems and
          custom digital solutions that help businesses turn ideas into useful,
          dependable technology. Our work covers the full journey from planning and
          design to development, deployment and ongoing support.
        </p>
        <p className="text-body" style={{ marginTop: 14, marginInline: 'auto' }}>
          Every business works differently. We focus on understanding your
          requirements, designing practical solutions and building software that fits
          your workflows, users and future plans.
        </p>
      </div>
    </section>

    {/* B. Mission and vision */}
    <section aria-labelledby="mission-heading" className="section section-warm">
      <div className="container">
        <h2 id="mission-heading" className="sr-only">Our mission and vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--card-gap)' }}>
          <AnimatedSection>
            <article className="p-8 h-full mv-card" style={cardStyle}>
              <span
                className="mv-icon flex items-center justify-center w-12 h-12 rounded-2xl"
                style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginBottom: 18 }}
                aria-hidden="true"
              >
                {renderAppIcon('target', 'w-6 h-6')}
              </span>
              <h3 className="text-card-title">Our Mission</h3>
              <p className="text-body" style={{ marginTop: 10 }}>
                To create practical, reliable and user-focused software that helps
                businesses solve problems and work more effectively.
              </p>
            </article>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <article className="p-8 h-full mv-card" style={cardStyle}>
              <span
                className="mv-icon flex items-center justify-center w-12 h-12 rounded-2xl"
                  style={{ background: '#F4F5FF', color: 'var(--color-orange)', marginBottom: 18 }}
                aria-hidden="true"
              >
                {renderAppIcon('growth', 'w-6 h-6')}
              </span>
              <h3 className="text-card-title">Our Vision</h3>
              <p className="text-body" style={{ marginTop: 10 }}>
                To make useful digital technology accessible to businesses of different
                sizes through thoughtful engineering, adaptable solutions and continuous
                improvement.
              </p>
            </article>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* C. Working principles */}
    <section aria-labelledby="principles-heading" className="section">
      <div className="container">
        <AnimatedSection style={{ maxWidth: 720 }}>
          <h2 id="principles-heading" className="text-section-title">
            What Guides Our Work
          </h2>
        </AnimatedSection>
        <div className="grid-cards-3" style={{ marginTop: 44 }}>
          {workingPrinciples.map((principle, i) => (
            <AnimatedSection key={principle.title} delay={(i % 3) * 0.08}>
              <article
                className={`p-7 h-full bg-white principle-card mild-glow-card ${i % 4 === 1 ? 'mild-d1' : i % 4 === 2 ? 'mild-d2' : i % 4 === 3 ? 'mild-d3' : ''}`}
                style={cardStyle}
              >
                <span
                  className="principle-icon flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginBottom: 16 }}
                  aria-hidden="true"
                >
                  {renderAppIcon(principle.icon, 'w-5 h-5')}
                </span>
                <h3 className="text-card-title" style={{ fontSize: '1.15rem', marginBottom: 8 }}>
                  {principle.title}
                </h3>
                <p className="text-body text-[15px]">{principle.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* D. Team */}
    <section aria-labelledby="team-heading" className="section section-warm">
      <div className="container">
        <AnimatedSection style={{ maxWidth: 720 }}>
          <h2 id="team-heading" className="text-section-title">
            Meet Our Team
          </h2>
          <p className="text-body" style={{ marginTop: 14 }}>
            A compact, cross-functional team covers your product end to end — from
            first sketch to long-term support.
          </p>
        </AnimatedSection>
        <div className="grid-cards-4" style={{ marginTop: 44 }}>
          {teamRoles.map((role, i) => (
            <AnimatedSection key={role.title} delay={(i % 4) * 0.08}>
              <article className="p-7 h-full bg-white principle-card" style={cardStyle}>
                <span
                  className="principle-icon flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginBottom: 16 }}
                  aria-hidden="true"
                >
                  {renderAppIcon(role.icon, 'w-5 h-5')}
                </span>
                <h3 className="text-card-title" style={{ fontSize: '1.15rem', marginBottom: 8 }}>
                  {role.title}
                </h3>
                <p className="text-body text-[15px]">{role.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* E. CTA */}
    <section aria-labelledby="about-cta" className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div
          className="text-center"
          style={{
            borderRadius: 28,
            background: 'linear-gradient(120deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            color: '#fff',
            padding: 'clamp(40px,6vw,68px) clamp(24px,5vw,64px)',
          }}
        >
          <h2 id="about-cta" className="text-section-title" style={{ color: '#fff' }}>
            Let&apos;s Build Something Useful Together
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center min-h-[52px] px-8 text-base font-semibold"
            style={{ background: 'var(--color-orange)', color: '#fff', borderRadius: 'var(--radius-button)', marginTop: 28 }}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  </div>
)

export default About

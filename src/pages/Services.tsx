import React from 'react'
import { Link } from 'react-router-dom'
import { renderAppIcon } from '../utils/iconResolver'
import AnimatedSection from '../components/AnimatedSection'
import Seo from '../components/Seo'
import { CheckIcon } from '../components/Icons'
import ServicesCta from '../components/ServicesCta'
import {
  WebsiteDevIllustration,
  WebAppIllustration,
  MobileAppIllustration,
  ErpIllustration,
  CustomSoftwareIllustration,
  UiUxCanvasIllustration,
  ApiIntegrationIllustration,
  CloudDeployIllustration,
  AiFlowIllustration,
  MaintenanceIllustration,
} from '../components/illustrations'
import { services } from '../data/siteData'

function ServiceArt({ id }: { id: string }) {
  switch (id) {
    case 'website-development':
      return <WebsiteDevIllustration />
    case 'web-application-development':
      return <WebAppIllustration />
    case 'mobile-app-development':
      return <MobileAppIllustration />
    case 'erp-business-software':
      return <ErpIllustration />
    case 'custom-software-development':
      return <CustomSoftwareIllustration />
    case 'ui-ux-design':
      return <UiUxCanvasIllustration />
    case 'api-integration':
      return <ApiIntegrationIllustration />
    case 'cloud-devops':
      return <CloudDeployIllustration />
    case 'ai-automation':
      return <AiFlowIllustration />
    default:
      return <MaintenanceIllustration />
  }
}

export const Services: React.FC = () => (
  <div className="w-full bg-white overflow-x-clip">
    <Seo
      title="Software Development Services | Marvel Softwares"
      description="Explore website development, mobile apps, ERP software, custom applications, AI integrations and cloud solutions."
      path="/services"
    />

    {/* Page heading */}
    <section aria-labelledby="services-heading" className="page-hero page-hero--wide">
      {/* Decorative brand artwork */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1200 560"
        preserveAspectRatio="xMidYMid slice"
        className="page-hero-art"
      >
        <defs>
          <radialGradient id="svc-hero-glow-a" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#0057e7" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0057e7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="svc-hero-glow-b" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ff5a00" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ff5a00" stopOpacity="0" />
          </radialGradient>
          <pattern id="svc-hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#0057e7" opacity="0.14" />
          </pattern>
        </defs>

        <ellipse cx="1010" cy="40" rx="380" ry="260" fill="url(#svc-hero-glow-a)" />
        <ellipse cx="90" cy="520" rx="320" ry="220" fill="url(#svc-hero-glow-b)" />
        <rect width="1200" height="560" fill="url(#svc-hero-dots)" />

        <g fill="none" stroke="#0057e7" strokeOpacity="0.12" strokeWidth="1.5">
          <circle cx="1100" cy="80" r="150" />
          <circle cx="1100" cy="80" r="220" />
          <circle cx="1100" cy="80" r="290" />
        </g>
      </svg>

      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <h1 id="services-heading" className="text-page-title">
            Our Services
          </h1>

          <p className="page-hero-text text-body" style={{ marginTop: 18, fontSize: '1.0625rem' }}>
            We design, develop and integrate digital solutions that help businesses operate
            more efficiently, serve customers better and scale with confidence. From your
            first website to complex enterprise platforms, every solution is shaped around
            your workflows, your users and your long-term goals.
          </p>
        </div>

      </div>
    </section>

    {/* Service sections — alternating rhythm, predictable reading order */}
    {services.map((service, index) => {
      const artLeft = index % 2 === 0
      const warm = index % 2 === 0
      return (
        <section
          key={service.id}
          id={service.id}
          aria-labelledby={`${service.id}-title`}
          className={warm ? 'section-warm' : ''}
        >
          <div className="container" style={{ paddingBlock: 'clamp(44px,5vw,72px)' }}>
            <div
              className="grid grid-cols-1 md:grid-cols-2 items-center"
              style={{ gap: 'clamp(28px,4vw,56px)' }}
            >
              <AnimatedSection
                className={artLeft ? 'md:order-1' : 'md:order-2'}
                direction={artLeft ? 'left' : 'right'}
              >
                <div className="w-full max-w-lg mx-auto">
                  <ServiceArt id={service.id} />
                </div>
              </AnimatedSection>
              <div className={artLeft ? 'md:order-2' : 'md:order-1'}>
                <span
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl"
                  style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginBottom: 20 }}
                  aria-hidden="true"
                >
                  {renderAppIcon(service.icon, 'w-7 h-7')}
                </span>
                <h2 id={`${service.id}-title`} className="text-section-title">
                  {service.headline}
                </h2>
                <p className="text-body" style={{ marginTop: 16 }}>
                  {service.description}
                </p>
                <ul className="flex flex-col" style={{ gap: 10, marginTop: 22, listStyle: 'none', padding: 0 }}>
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start" style={{ gap: 10 }}>
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                        style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginTop: 3 }}
                        aria-hidden="true"
                      >
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      <span className="text-[15px] font-medium">{cap}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap" style={{ gap: 12, marginTop: 28 }}>
                  <Link
                    to={`/contact?solution=${encodeURIComponent(service.solutionValue)}`}
                    className="inline-flex items-center justify-center min-h-[48px] px-6 text-[15px] font-semibold transition-all hover:-translate-y-px"
                    style={{
                      background: 'var(--color-primary)',
                      color: '#fff',
                      borderRadius: 'var(--radius-button)',
                      boxShadow: 'var(--shadow-button)',
                    }}
                  >
                    {service.cta}
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center min-h-[48px] px-6 text-[15px] font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    View Projects <span aria-hidden="true" style={{ marginLeft: 6 }}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    })}

    {/* Closing CTA */}
    <ServicesCta />
  </div>
)

export default Services

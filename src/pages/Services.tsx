import React from 'react'
import { Link } from 'react-router-dom'
import { renderAppIcon } from '../utils/iconResolver'
import AnimatedSection from '../components/AnimatedSection'
import Seo from '../components/Seo'
import { CheckIcon } from '../components/Icons'
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
    <section aria-labelledby="services-heading">
      <div className="container text-center" style={{ paddingBlock: 'clamp(48px,6vw,80px)', maxWidth: 780, marginInline: 'auto' }}>
        <h1 id="services-heading" className="text-page-title" style={{ marginTop: 16 }}>
          Our Services
        </h1>
        <p className="text-body" style={{ marginTop: 18, fontSize: '1.125rem', marginInline: 'auto' }}>
          We design, develop and integrate digital solutions that help businesses operate
          more efficiently, serve customers better and scale with confidence. From your
          first website to complex enterprise platforms, every solution is shaped around
          your workflows, your users and your long-term goals.
        </p>
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
                <p
                  className="text-xs font-bold uppercase"
                  style={{ letterSpacing: '0.14em', color: 'var(--color-orange)', marginBottom: 8 }}
                >
                  Service {String(index + 1).padStart(2, '0')} — {service.title}
                </p>
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
    <section aria-labelledby="services-cta" className="section" style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
      <div
        className="relative overflow-hidden text-center"
        style={{
          background: 'linear-gradient(120deg, var(--color-primary-deep) 0%, var(--color-primary-dark) 100%)',
          color: '#fff',
          padding: 'clamp(48px,7vw,84px) clamp(24px,5vw,64px)',
        }}
      >
        {/* Modern pattern: diagonal weave + glow orbs */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <defs>
            <radialGradient id="services-glow-a" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#00cfff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00cfff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="services-glow-b" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ff5a00" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#ff5a00" stopOpacity="0" />
            </radialGradient>
            <pattern id="services-weave" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1={0} y1={0} x2={0} y2={44} stroke="#fff" strokeWidth={1.5} opacity={0.18} />
              <line x1={0} y1={0} x2={44} y2={0} stroke="#00cfff" strokeWidth={1.5} opacity={0.16} />
            </pattern>
            <radialGradient id="services-weave-fade" cx="0.5" cy="0.5" r="0.7">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="services-weave-mask">
              <rect width="1200" height="400" fill="url(#services-weave-fade)" />
            </mask>
          </defs>

          <ellipse cx={160} cy={370} rx={400} ry={280} fill="url(#services-glow-a)" />
          <ellipse cx={1060} cy={30} rx={380} ry={260} fill="url(#services-glow-b)" />
          <rect width="1200" height="400" fill="url(#services-weave)" mask="url(#services-weave-mask)" />

          {/* accent dots */}
          <g fill="#00cfff" opacity={0.75}>
            <circle cx={260} cy={110} r={4} />
            <circle cx={940} cy={290} r={4} />
          </g>
          <path d="M260 110 H470" fill="none" stroke="#00cfff" strokeWidth={2} opacity={0.45} strokeDasharray="3 12" className="svg-flow" />

          <g className="svg-float" strokeLinecap="round" strokeWidth={3}>
            <path d="M560 90 v18 M551 99 h18" stroke="#00cfff" opacity={0.85} />
            <path d="M660 310 v16 M652 318 h16" stroke="#ff5a00" opacity={0.8} />
          </g>
          <circle cx={600} cy={200} r={5} fill="#ffb800" opacity={0.9} className="svg-pulse" />
        </svg>

        <div className="relative" style={{ zIndex: 1 }}>
          <h2 id="services-cta" className="text-section-title" style={{ color: '#fff' }}>
            Not Sure Which Solution You Need?
          </h2>
          <p className="text-body" style={{ color: 'rgba(255,255,255,.88)', marginTop: 14, marginInline: 'auto', maxWidth: 640 }}>
            Describe your business challenge. We&apos;ll help you identify the type of
            software, integrations and technical approach that may fit your requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center min-h-[52px] px-8 text-base font-semibold"
            style={{ background: 'var(--color-orange)', color: '#fff', borderRadius: 'var(--radius-button)', marginTop: 30 }}
          >
            Discuss Your Project
          </Link>
        </div>
      </div>
    </section>
  </div>
)

export default Services

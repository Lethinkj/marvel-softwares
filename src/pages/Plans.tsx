import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import {
  CheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '../components/Icons'
import { renderAppIcon } from '../utils/iconResolver'
import {
  buildTracks,
  buildTiers,
  siteConfig,
  type BuildTrackId,
} from '../data/siteData'
import { trackCtaClick } from '../utils/analytics'

const EVERY_PLAN = [
  'Responsive design on mobile, tablet & desktop',
  'Secure, fast hosting setup + SSL',
  'On-page SEO & Google Analytics',
  'Contact form + click-to-call / WhatsApp',
  'Source code & documentation handover',
  '1 week bug-fix window after launch',
]

export const Plans = () => {
  const [trackId, setTrackId] = useState<BuildTrackId>('website')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const track = buildTracks.find((t) => t.id === trackId) ?? buildTracks[0]
  const tiers = buildTiers[trackId]

  const selectTrack = (id: BuildTrackId) => {
    setTrackId(id)
    trackCtaClick(`Plans Track: ${id}`, '/plans')
  }

  return (
    <div className="w-full bg-white overflow-x-clip plans-page">
      <Seo
        title="Plans | Marvel Softwares"
        description="Compare Marvel Softwares plans for websites and custom software — Basic, Modern and Ultra. See what's included, who each plan is for, and typical delivery timelines."
        path="/plans"
        keywords="Marvel Softwares plans, website packages, website pricing plans, software development plans, Basic Modern Ultra"
        robots="noindex, nofollow"
      />

      {/* ---------- HERO ---------- */}
      <section className="plans-hero" aria-labelledby="plans-title">
        <div className="container plans-hero-inner">
          <p className="build-kicker">Marvel Softwares · Plans</p>
          <h1 id="plans-title" className="plans-hero-title">
            Plans built around<br />
            <span className="build-intro-accent">your goals.</span>
          </h1>
          <p className="plans-hero-lead">
            Two build types, three tiers each. Pick the depth that fits today —
            you can always upgrade later. Every plan starts with a written quote
            from our engineering team.
          </p>

          {/* Track toggle */}
          <div className="plans-toggle" role="radiogroup" aria-label="Plan type">
            {buildTracks.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={t.id === trackId}
                className={`plans-toggle-btn${t.id === trackId ? ' is-active' : ''}`}
                onClick={() => selectTrack(t.id)}
              >
                {renderAppIcon(t.icon, 'w-4 h-4')}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <p className="plans-track-desc">{track.description}</p>

          {/* Tier cards */}
          <div className="plans-grid">
            {tiers.map((tier) => (
              <article
                key={tier.id}
                className={`plans-card${tier.badge ? ' plans-card--featured' : ''}`}
              >
                {tier.badge && <span className="build-tier-badge">{tier.badge}</span>}
                <div className="plans-card-head">
                  <h2 className="plans-card-name">{tier.name}</h2>
                  <p className="plans-card-tagline">{tier.tagline}</p>
                </div>
                <p className="build-tier-bestfor">
                  <span className="build-tier-bestfor-label">Best for</span>
                  {tier.bestFor}
                </p>
                <ul className="plans-card-features">
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon className="w-4 h-4 plans-card-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="plans-card-timeline">{tier.timeline}</p>
                <Link
                  to="/build"
                  className={
                    tier.badge
                      ? 'build-btn-primary plans-card-cta'
                      : 'build-btn-ghost plans-card-cta'
                  }
                  onClick={() => trackCtaClick(`Plans CTA: ${trackId}/${tier.name}`, '/plans')}
                >
                  Start with {tier.name}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>

          <p className="plans-hero-note">
            No public prices — final cost depends on scope and add-ons.
            Start a build to get an itemised written quote within one business day.
          </p>
        </div>
      </section>

      {/* ---------- EVERY PLAN ---------- */}
      <section className="plans-included" aria-labelledby="plans-included-title">
        <div className="container plans-included-grid">
          <div>
            <p className="build-kicker">Included in every plan</p>
            <h2 id="plans-included-title" className="plans-section-title">
              Whatever you pick, you get the essentials.
            </h2>
            <p className="plans-section-lead">
              Higher tiers add more depth — but the foundation below comes with
              every website and software plan we deliver.
            </p>
            <div className="plans-included-ctas">
              <Link
                to="/build"
                className="build-btn-primary"
                onClick={() => trackCtaClick('Plans: Configure your build', '/plans')}
              >
                Configure your build
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <a
                className="build-btn-ghost"
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('Plans: WhatsApp', siteConfig.whatsappHref)}
              >
                <WhatsAppIcon className="w-4 h-4" />
                Talk to us
              </a>
            </div>
          </div>
          <ul className="plans-included-list">
            {EVERY_PLAN.map((item) => (
              <li key={item}>
                <CheckCircleIcon className="w-5 h-5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- CTA BANNER ---------- */}
      <section className="plans-cta" aria-labelledby="plans-cta-title">
        <div className="container">
          <div className="plans-cta-card">
            <h2 id="plans-cta-title" className="plans-cta-title">
              Not sure which plan fits?
            </h2>
            <p className="plans-cta-lead">
              Tell us about your project and we will recommend a tier — with a
              written, itemised quote within one business day. No obligation.
            </p>
            <div className="plans-cta-actions">
              <Link
                to="/build"
                className="build-btn-primary build-btn-primary--lg"
                onClick={() => trackCtaClick('Plans: Get my quote', '/plans')}
              >
                Get my free quote
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <a
                className="build-btn-ghost"
                href={siteConfig.phoneHref}
                onClick={() => trackCtaClick('Plans: Call us', siteConfig.phone)}
              >
                <PhoneIcon className="w-4 h-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Plans

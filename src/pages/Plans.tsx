import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import {
  CheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  WhatsAppIcon,
  ShieldIcon,
  ClipboardIcon,
  BoltIcon,
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

const TRUST = [
  { icon: BoltIcon, label: 'Written quote in 1 business day' },
  { icon: CheckCircleIcon, label: 'No obligation — walk away anytime' },
  { icon: ShieldIcon, label: 'NDA available on request' },
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
    <div className="plans-page w-full overflow-x-clip">
      <Seo
        title="Plans | Marvel Softwares"
        description="Compare Marvel Softwares plans for websites and custom software — Basic, Modern and Ultra. See what's included, who each plan is for, and typical delivery timelines."
        path="/plans"
        keywords="Marvel Softwares plans, website packages, website pricing plans, software development plans, Basic Modern Ultra"
        robots="noindex, nofollow"
      />

      {/* ============ HERO + PRICING ============ */}
      <section className="plans-hero" aria-labelledby="plans-title">
        <div className="container plans-hero-inner">
          <span className="plans-pill">Marvel Softwares · Plans</span>

          <h1 id="plans-title" className="plans-hero-title">
            Plans built around<br />
            <span className="plans-hero-accent">your business.</span>
          </h1>

          <p className="plans-hero-lead">
            Two build types, three tiers each. Pick the depth that fits today —
            upgrade anytime. Every plan starts with a written quote from our
            engineering team, scoped around your goals and timeline.
          </p>

          {/* Simple toggle */}
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

          {/* Trust line */}
          <ul className="plans-trust" aria-label="Plan guarantees">
            {TRUST.map((item) => (
              <li key={item.label} className="plans-trust-item">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Pricing cards */}
          <div className="plans-grid" role="list">
            {tiers.map((tier) => {
              const featured = Boolean(tier.badge)
              return (
                <article
                  key={tier.id}
                  role="listitem"
                  className={`plans-card${featured ? ' plans-card--featured' : ''}`}
                  aria-label={`${tier.name} ${track.solutionValue} plan`}
                >
                  {tier.badge && <span className="plans-badge">{tier.badge}</span>}

                  <header className="plans-card-head">
                    <h2 className="plans-card-name">
                      {tier.name} {track.solutionValue}
                    </h2>
                    <p className="plans-card-tagline">{tier.tagline}</p>
                  </header>

                  <p className="plans-bestfor">
                    <span className="plans-bestfor-label">Best for</span>
                    <span className="plans-bestfor-value">{tier.bestFor}</span>
                  </p>

                  <div className="plans-features">
                    <span className="plans-features-label">What&rsquo;s included</span>
                    <ul className="plans-feature-list">
                      {tier.features.map((feature) => (
                        <li key={feature} className="plans-feature-item">
                          <span className="plans-feature-check" aria-hidden="true">
                            <CheckIcon className="w-4 h-4" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <footer className="plans-card-foot">
                    <p className="plans-timeline">{tier.timeline}</p>
                    <Link
                      to="/build"
                      className={
                        featured
                          ? 'hero-btn hero-btn--primary plans-card-cta'
                          : 'hero-btn hero-btn--ghost plans-card-cta'
                      }
                      onClick={() => trackCtaClick(`Plans CTA: ${trackId}/${tier.name}`, '/plans')}
                    >
                      Start with {tier.name}
                    </Link>
                  </footer>
                </article>
              )
            })}
          </div>

          <p className="plans-note">
            No public prices — final cost depends on scope and add-ons.
            Start a build to get an itemised written quote within one business day.
          </p>
        </div>
      </section>

      {/* ============ INCLUDED IN EVERY PLAN ============ */}
      <section className="plans-included" aria-labelledby="plans-included-title">
        <div className="container">
          <div className="plans-included-head">
            <span className="plans-pill plans-pill--light">
              <ClipboardIcon className="w-4 h-4" />
              Included in every plan
            </span>
            <h2 id="plans-included-title" className="plans-included-title">
              Whatever you pick, you get the essentials.
            </h2>
            <p className="plans-included-lead">
              Higher tiers add more depth — but the foundation below comes with
              every website and software plan we deliver.
            </p>
          </div>

          <div className="plans-included-grid">
            <ul className="plans-included-list">
              {EVERY_PLAN.map((item) => (
                <li key={item} className="plans-included-item">
                  <CheckCircleIcon className="w-5 h-5 plans-included-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="plans-side-card">
              <h3 className="plans-side-title">Need more than the essentials?</h3>
              <p className="plans-side-copy">
                Add-ons like hosting, SEO, analytics, integrations and
                maintenance are priced into your written quote — pick them
                during the build step in under two minutes.
              </p>
              <div className="plans-side-ctas">
                <Link
                  to="/build"
                  className="hero-btn hero-btn--primary"
                  onClick={() => trackCtaClick('Plans: Configure your build', '/plans')}
                >
                  Configure Your Build
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <a
                  className="hero-btn hero-btn--ghost"
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCtaClick('Plans: Talk to Us', siteConfig.whatsappHref)}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Talk to Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Plans

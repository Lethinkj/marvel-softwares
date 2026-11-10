import AnimatedSection from './AnimatedSection'
import { ArrowRightIcon, CheckIcon } from './Icons'
import { renderAppIcon } from '../utils/iconResolver'
import { trackCtaClick } from '../utils/analytics'

interface HomePlan {
  id: string
  name: string
  tagline: string
  badge?: string
  bestFor: string
  features: string[]
}

const homePlans: HomePlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Get your business online',
    bestFor: 'Startups & small businesses, 1–5 pages',
    features: [
      'Up to 5 pages (Home, About, Services, Contact)',
      'Mobile-responsive design',
      'Contact form + WhatsApp button',
      'Basic on-page SEO & fast load',
      'Google Maps & social links',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Grow and scale online',
    badge: 'Most Popular',
    bestFor: 'Growing businesses, up to 10 pages',
    features: [
      'Up to 10 pages + CMS',
      'Custom design and animations',
      'Advanced SEO + Google Analytics setup',
      'Speed & Core Web Vitals optimization',
      '30-day post-launch support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'A category-defining flagship',
    bestFor: 'Established brands & high-traffic sites',
    features: [
      'Custom design from scratch + brand system',
      'Unlimited pages + custom features',
      'Multiple roles + admin panel',
      'E-commerce, booking or member portals',
      'Deep integrations (CRM, payments, ERP)',
      'Headless CMS, API-ready architecture',
      'Dedicated project manager',
      'Priority post-launch SLA',
    ],
  },
]

export const PricingPlans = () => {
  return (
    <>
      <AnimatedSection className="text-center mx-auto w-full">
        <h2 id="plans-heading" className="text-section-title">
          Plans
        </h2>
        <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
          Choose the plan that fits your business today, and upgrade anytime as you grow.
          Every plan starts with a clear, written quote from our team.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="plans-grid" role="list">
          {homePlans.map((plan) => {
            const featured = Boolean(plan.badge)
            return (
              <article
                key={plan.id}
                role="listitem"
                className={`plans-card${featured ? ' plans-card--featured' : ''}`}
                aria-label={`${plan.name} plan`}
              >
                {plan.badge && <span className="plans-badge">{plan.badge}</span>}

                <header className="plans-card-head">
                  <span className="plans-card-icon" aria-hidden="true">
                    {renderAppIcon('web', 'w-5 h-5')}
                  </span>
                  <h3 className="plans-card-name">{plan.name}</h3>
                  <p className="plans-card-tagline">{plan.tagline}</p>
                </header>

                <p className="plans-bestfor">
                  <span className="plans-bestfor-label">Best for</span>
                  <span>{plan.bestFor}</span>
                </p>

                <ul className="plans-feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="plans-feature-item">
                      <CheckIcon className="w-4 h-4 plans-feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <footer className="plans-card-foot">
                  <a
                    href="#contact"
                    className={
                      featured
                        ? 'hero-btn hero-btn--primary plans-card-cta'
                        : 'hero-btn hero-btn--ghost plans-card-cta'
                    }
                    onClick={() => trackCtaClick(`Home Plans CTA: ${plan.name}`, '#contact')}
                  >
                    Start with {plan.name}
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </footer>
              </article>
            )
          })}
        </div>
      </AnimatedSection>
    </>
  )
}

export default PricingPlans

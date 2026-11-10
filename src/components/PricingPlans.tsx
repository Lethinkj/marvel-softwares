import { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { ArrowRightIcon, CheckIcon } from './Icons'
import { renderAppIcon } from '../utils/iconResolver'
import { homePlans, type HomePlan } from '../data/homePlans'
import { trackCtaClick } from '../utils/analytics'
import PlanInquiryModal from './PlanInquiryModal'

export const PricingPlans = () => {
  const [activePlan, setActivePlan] = useState<HomePlan | null>(null)

  const openPlanModal = (plan: HomePlan) => {
    setActivePlan(plan)
    trackCtaClick(`Home Plans CTA: ${plan.name}`, 'plan-request-modal')
  }

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
                  <button
                    type="button"
                    className={
                      featured
                        ? 'hero-btn hero-btn--primary plans-card-cta'
                        : 'hero-btn hero-btn--ghost plans-card-cta'
                    }
                    onClick={() => openPlanModal(plan)}
                  >
                    Start with {plan.name}
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </footer>
              </article>
            )
          })}
        </div>
      </AnimatedSection>

      {activePlan && (
        <PlanInquiryModal
          key={activePlan.id}
          plan={activePlan}
          onClose={() => setActivePlan(null)}
        />
      )}
    </>
  )
}

export default PricingPlans

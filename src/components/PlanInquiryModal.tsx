import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
} from './Icons'
import { renderAppIcon } from '../utils/iconResolver'
import { buildAccessories, siteConfig } from '../data/siteData'
import type { HomePlan } from '../data/homePlans'
import { submitProjectInquiry } from '../utils/inquiryApi'
import { trackFormSubmit } from '../utils/analytics'

type PlanStep = 'contact' | 'addons' | 'success'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

interface PlanInquiryModalProps {
  plan: HomePlan
  onClose: () => void
}

const websiteAddons = buildAccessories.filter((addon) => addon.appliesTo.includes('website'))

export const PlanInquiryModal = ({ plan, onClose }: PlanInquiryModalProps) => {
  const formId = useId()

  const [step, setStep] = useState<PlanStep>('contact')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['ssl-security'])
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  const recommendedIds = useMemo(
    () =>
      websiteAddons
        .filter((addon) => addon.recommendedFor.website?.includes(plan.tierId))
        .map((addon) => addon.id),
    [plan.tierId],
  )

  const selectedAddonDetails = useMemo(
    () => websiteAddons.filter((addon) => selectedAddons.includes(addon.id)),
    [selectedAddons],
  )

  // Lock page scroll while the modal is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  // Close with Escape.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // After the success message appears, keep it visible for 2 seconds, then close.
  useEffect(() => {
    if (step !== 'success') return
    const timer = window.setTimeout(() => onClose(), 2000)
    return () => window.clearTimeout(timer)
  }, [step, onClose])

  const validateContact = (): boolean => {
    const next: FormErrors = {}
    if (name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email address (e.g. name@company.com).'
    if (phone.replace(/\D/g, '').length < 7)
      next.phone = 'Please enter a valid phone number.'
    setErrors(next)
    const firstError = (['name', 'phone', 'email'] as const).find((field) => next[field])
    if (firstError) {
      document.getElementById(`${formId}-${firstError}`)?.focus()
      return false
    }
    return true
  }

  const handleContactNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateContact()) return
    setSelectedAddons((previous) => Array.from(new Set([...previous, ...recommendedIds])))
    setSubmitError(null)
    setStep('addons')
  }

  const toggleAddon = (id: string) => {
    setSelectedAddons((previous) =>
      previous.includes(id) ? previous.filter((addonId) => addonId !== id) : [...previous, id],
    )
  }

  const handleSendRequest = async () => {
    if (isSubmitting) return
    setSubmitError(null)
    setIsSubmitting(true)

    const requirements = [
      '=== HOME PLAN REQUEST ===',
      `Plan: ${plan.name} — ${plan.tagline}`,
      `Best for: ${plan.bestFor}`,
      `Included: ${plan.features.join('; ')}`,
      `Add-ons: ${
        selectedAddonDetails.length > 0
          ? selectedAddonDetails.map((addon) => addon.name).join(', ')
          : 'None selected'
      }`,
      note.trim() ? `Client note:\n${note.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const result = await submitProjectInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        solution: `Home Plan: ${plan.name}`,
        requirements,
        source: 'build-configurator',
        buildRequest: {
          track: 'website',
          track_label: 'Business Website',
          tier: plan.tierId,
          tier_name: plan.name,
          accessories: selectedAddonDetails.map((addon) => addon.name),
          note: note.trim() || undefined,
        },
      }, { awaitEmail: true })
      setReference(result.reference ?? null)
      setStep('success')
      trackFormSubmit('home_plan_request', 'success', {
        plan: plan.id,
        addons: selectedAddons.length,
        name: name.trim(),
        email: email.trim(),
      })
    } catch {
      setSubmitError(
        `We couldn’t send your request right now. Please try again, or reach us directly at ${siteConfig.email} / ${siteConfig.phone}.`,
      )
      trackFormSubmit('home_plan_request', 'failure', { plan: plan.id, error: 'submission_error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const activeStepIndex = step === 'contact' ? 0 : step === 'addons' ? 1 : 2
  const stepLabels = ['Contact', 'Add-ons', 'Done']

  return createPortal(
    <div
      className="plan-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className={`plan-modal plan-modal--${step}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-modal-title"
      >
        <button
          type="button"
          className="plan-modal-close"
          aria-label="Close plan request"
          onClick={onClose}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={`plan-modal-scroll plan-modal-scroll--${step}`}>
        <header className="plan-modal-head">
          <h2 id="plan-modal-title" className="plan-modal-title">
            {step === 'contact' && `Start with ${plan.name}`}
            {step === 'addons' && 'Choose your add-ons'}
            {step === 'success' && 'Request received'}
          </h2>
          <p className="plan-modal-sub">
            {step === 'contact' &&
              `Tell us where to reach you and we’ll prepare your ${plan.name} plan quote.`}
            {step === 'addons' &&
              'Every add-on is optional. Recommended extras for your plan are pre-selected — adjust as you like.'}
            {step === 'success' &&
              'Your request has been saved and sent to our team. We’ll be in touch shortly.'}
          </p>
        </header>

        {step !== 'success' && (
          <ol className="plan-modal-steps" aria-label="Request progress">
            {stepLabels.map((label, index) => {
              const done = index < activeStepIndex
              const current = index === activeStepIndex
              return (
                <li
                  key={label}
                  className={`plan-modal-step${done ? ' is-done' : ''}${current ? ' is-current' : ''}`}
                  aria-current={current ? 'step' : undefined}
                >
                  <span className="plan-modal-step-dot">
                    {done ? <CheckIcon className="w-3.5 h-3.5" /> : index + 1}
                  </span>
                  <span className="plan-modal-step-label">{label}</span>
                </li>
              )
            })}
          </ol>
        )}

        {step === 'contact' && (
          <form onSubmit={handleContactNext} noValidate className="contact-form plan-modal-form">
            <div>
              <label className="field-label" htmlFor={`${formId}-name`}>
                Full Name <span className="field-required" aria-hidden="true">*</span>
              </label>
              <input
                id={`${formId}-name`}
                className={`field-input${errors.name ? ' field-error' : ''}`}
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                autoFocus
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              />
              {errors.name && (
                <p id={`${formId}-name-error`} role="alert" className="field-message error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="plan-modal-grid">
              <div>
                <label className="field-label" htmlFor={`${formId}-phone`}>
                  Mobile <span className="field-required" aria-hidden="true">*</span>
                </label>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  className={`field-input${errors.phone ? ' field-error' : ''}`}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                />
                {errors.phone && (
                  <p id={`${formId}-phone-error`} role="alert" className="field-message error">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="field-label" htmlFor={`${formId}-email`}>
                  Email <span className="field-required" aria-hidden="true">*</span>
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  className={`field-input${errors.email ? ' field-error' : ''}`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                />
                {errors.email && (
                  <p id={`${formId}-email-error`} role="alert" className="field-message error">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor={`${formId}-note`}>
                Anything else? <span className="field-optional">(optional)</span>
              </label>
              <textarea
                id={`${formId}-note`}
                className="field-textarea"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Share your goals, timeline or must-have features…"
              />
            </div>

            <div className="plan-modal-actions">
              <button type="submit" className="hero-btn hero-btn--primary plan-modal-btn">
                Next
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 'addons' && (
          <div className="plan-modal-form plan-modal-addons-step">
            <div className="plan-modal-addons-meta">
              <span>{selectedAddons.length} selected</span>
              {selectedAddons.length > 0 && (
                <button
                  type="button"
                  className="plan-modal-clear"
                  onClick={() => setSelectedAddons([])}
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="build-accessories-grid plan-modal-addons" aria-label="Optional add-ons">
              {websiteAddons.map((addon) => {
                const selected = selectedAddons.includes(addon.id)
                const recommended = recommendedIds.includes(addon.id)
                return (
                  <button
                    key={addon.id}
                    type="button"
                    role="checkbox"
                    aria-checked={selected}
                    className={`build-accessory${selected ? ' is-selected' : ''}`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    {recommended && <span className="build-accessory-recommended">Recommended</span>}
                    <span className="build-accessory-icon" aria-hidden="true">
                      {renderAppIcon(addon.icon, 'w-5 h-5')}
                    </span>
                    <span className="build-accessory-name">{addon.name}</span>
                    <span className="build-accessory-desc">{addon.description}</span>
                    <span className="build-accessory-check" aria-hidden="true">
                      {selected && <CheckIcon className="w-4 h-4" />}
                    </span>
                  </button>
                )
              })}
            </div>

            {submitError && (
              <p role="alert" className="field-message error plan-modal-submit-error">
                {submitError}
              </p>
            )}

            <div className="plan-modal-actions">
              <button
                type="button"
                className="hero-btn hero-btn--ghost plan-modal-btn plan-modal-back"
                onClick={() => setStep('contact')}
                disabled={isSubmitting}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                className="hero-btn hero-btn--primary plan-modal-btn"
                onClick={handleSendRequest}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Next'}
                {!isSubmitting && <ArrowRightIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="plan-modal-success">
            <span className="plan-modal-success-icon" aria-hidden="true">
              <CheckCircleIcon className="w-10 h-10" />
            </span>
            <h3 className="plan-modal-success-title">
              Thank you{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}!
            </h3>
            <p className="plan-modal-success-copy">
              Your <strong>{plan.name}</strong> plan request has been sent. Our team will contact you
              within one business day.
            </p>
            <p className="plan-modal-success-note">
              A confirmation email is being sent to <strong>{email.trim()}</strong>.
              {reference ? (
                <>
                  {' '}
                  Your reference is <strong>{reference}</strong>.
                </>
              ) : null}
            </p>
            <div className="plan-modal-actions plan-modal-actions--center">
              <button type="button" className="hero-btn hero-btn--primary plan-modal-btn" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default PlanInquiryModal

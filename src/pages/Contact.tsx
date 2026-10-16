import React, { useState, useId, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo'
import { ContactIllustration } from '../components/illustrations'
import { CheckIcon } from '../components/Icons'
import { solutionTypes, siteConfig } from '../data/siteData'
import { submitProjectInquiry } from '../utils/inquiryApi'

interface FormErrors {
  name?: string
  email?: string
  solution?: string
  requirements?: string
}

const BUDGETS = ['Under $1k', '$1k – $5k', '$5k – $15k', '$15k+', 'Not sure yet']
const TIMELINES = ['As soon as possible', 'Within 1 month', '1 – 3 months', '3+ months', 'Flexible']

export const Contact: React.FC = () => {
  const formId = useId()
  const [searchParams] = useSearchParams()
  const requested = searchParams.get('solution')
  const initialSolution = useMemo(
    () => (requested && solutionTypes.includes(requested) ? requested : 'Custom Software'),
    [requested],
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [solution, setSolution] = useState(initialSolution)
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [requirements, setRequirements] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [wasQueued, setWasQueued] = useState(false)

  const validate = (): { valid: boolean; firstError?: 'name' | 'email' | 'solution' | 'requirements' } => {
    const next: FormErrors = {}
    if (name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email address (e.g. name@company.com).'
    if (!solutionTypes.includes(solution)) next.solution = 'Please choose a type of solution.'
    if (requirements.trim().length < 10)
      next.requirements = 'Please describe your requirements in at least 10 characters.'
    setErrors(next)
    const firstError = (['name', 'email', 'solution', 'requirements'] as const).find(
      (f) => next[f],
    )
    return { valid: !firstError, firstError }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)
    if (isSubmitting) return
    const { valid, firstError } = validate()
    if (!valid) {
      document.getElementById(`${formId}-${firstError ?? 'name'}`)?.focus()
      return
    }
    setIsSubmitting(true)
    try {
      const result = await submitProjectInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        solution,
        budget: budget || undefined,
        timeline: timeline || undefined,
        requirements: requirements.trim(),
      })
      setWasQueued(result.status === 'queued')
      setIsSubmitted(true)
    } catch {
      setSubmitError(
        'We couldn\u2019t submit your inquiry right now. Please try again or contact us directly at ' +
          siteConfig.email +
          '.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const errorFor = (field: keyof FormErrors) =>
    errors[field] ? (
      <p id={`${formId}-${field}-error`} role="alert" className="field-message error">
        {errors[field]}
      </p>
    ) : null

  return (
    <div className="w-full bg-white overflow-x-clip">
      <Seo
        title="Start a Software Project | Marvel Softwares"
        description="Contact Marvel Softwares to discuss your website, mobile app, ERP system or custom software requirements."
        path="/contact"
      />

      {/* Heading */}
      <section aria-labelledby="contact-heading" className="section-warm">
        <div className="container text-center" style={{ paddingBlock: 'clamp(48px,7vw,88px)', maxWidth: 780, marginInline: 'auto' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Let&apos;s work together</p>
          <h1 id="contact-heading" className="text-page-title" style={{ marginTop: 16 }}>
            Tell Us What You Want to Build.
          </h1>
          <p className="text-body" style={{ marginTop: 18, marginInline: 'auto', fontSize: '1.125rem' }}>
            Share your requirements, business goals and challenges. We&apos;ll use the
            information to understand your needs and discuss a suitable software solution.
          </p>
        </div>
      </section>

      <section aria-label="Project inquiry" className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start" style={{ gap: 'clamp(28px,4vw,56px)' }}>
            {/* Form */}
            <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-10" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
              {isSubmitted ? (
                <div role="status" aria-live="polite" className="text-center" style={{ paddingBlock: 32 }}>
                  <span
                    className="mx-auto flex items-center justify-center w-16 h-16 rounded-full"
                    style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginBottom: 20 }}
                    aria-hidden="true"
                  >
                    <CheckIcon className="w-8 h-8" />
                  </span>
                  <h2 className="text-card-title" style={{ fontSize: '1.5rem' }}>
                    Thank you for reaching out, {name.trim().split(' ')[0] || 'there'}.
                  </h2>
                  <p className="text-body" style={{ marginTop: 12, marginInline: 'auto', maxWidth: 520 }}>
                    Your project inquiry has been submitted successfully. We&apos;ll review
                    the information and follow up using your provided contact details.
                  </p>
                  {wasQueued && (
                    <p className="text-body text-[14px]" style={{ marginTop: 10, marginInline: 'auto', maxWidth: 520 }}>
                      Note: our direct delivery channel isn&apos;t configured on this site
                      yet, so your inquiry is safely saved on this device. For the fastest
                      response, please also email us at{' '}
                      <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                        {siteConfig.email}
                      </a>
                      .
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <h2 className="text-card-title" style={{ fontSize: '1.4rem' }}>
                    Tell Us About Your Project
                  </h2>
                  <p className="text-body text-[15px]" style={{ marginTop: 6, marginBottom: 26 }}>
                    Share a few details so we can better understand your requirements.
                  </p>
                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20 }}>
                      <div>
                        <label className="field-label" htmlFor={`${formId}-name`}>
                          Full Name <span className="field-required" aria-hidden="true">*</span>
                        </label>
                        <input
                          id={`${formId}-name`}
                          className={`field-input${errors.name ? ' field-error' : ''}`}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                        />
                        {errorFor('name')}
                      </div>
                      <div>
                        <label className="field-label" htmlFor={`${formId}-email`}>
                          Work Email <span className="field-required" aria-hidden="true">*</span>
                        </label>
                        <input
                          id={`${formId}-email`}
                          type="email"
                          className={`field-input${errors.email ? ' field-error' : ''}`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                        />
                        {errorFor('email')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20 }}>
                      <div>
                        <label className="field-label" htmlFor={`${formId}-phone`}>
                          Phone Number <span className="field-optional">(optional)</span>
                        </label>
                        <input
                          id={`${formId}-phone`}
                          type="tel"
                          className="field-input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="tel"
                        />
                      </div>
                      <div>
                        <label className="field-label" htmlFor={`${formId}-company`}>
                          Company Name <span className="field-optional">(optional)</span>
                        </label>
                        <input
                          id={`${formId}-company`}
                          className="field-input"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="field-label" htmlFor={`${formId}-solution`}>
                        Type of Solution <span className="field-required" aria-hidden="true">*</span>
                      </label>
                      <select
                        id={`${formId}-solution`}
                        className={`field-select${errors.solution ? ' field-error' : ''}`}
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        aria-invalid={Boolean(errors.solution)}
                        aria-describedby={errors.solution ? `${formId}-solution-error` : undefined}
                      >
                        {solutionTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errorFor('solution')}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20 }}>
                      <div>
                        <label className="field-label" htmlFor={`${formId}-budget`}>
                          Estimated Budget <span className="field-optional">(optional)</span>
                        </label>
                        <select
                          id={`${formId}-budget`}
                          className="field-select"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                        >
                          <option value="">Prefer not to say</option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="field-label" htmlFor={`${formId}-timeline`}>
                          Project Timeline <span className="field-optional">(optional)</span>
                        </label>
                        <select
                          id={`${formId}-timeline`}
                          className="field-select"
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                        >
                          <option value="">Flexible</option>
                          {TIMELINES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="field-label" htmlFor={`${formId}-requirements`}>
                        Project Requirements <span className="field-required" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id={`${formId}-requirements`}
                        className={`field-textarea${errors.requirements ? ' field-error' : ''}`}
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="What problem should the software solve? Who will use it? Any features, systems or deadlines we should know about?"
                        aria-invalid={Boolean(errors.requirements)}
                        aria-describedby={errors.requirements ? `${formId}-requirements-error` : undefined}
                      />
                      {errorFor('requirements')}
                    </div>

                    {submitError && (
                      <p role="alert" className="field-message error" style={{ fontSize: '0.9375rem' }}>
                        {submitError}
                      </p>
                    )}

                    <div style={{ paddingTop: 4 }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center min-h-[52px] px-8 text-base font-semibold w-full sm:w-auto transition-all"
                        style={{
                          background: isSubmitting ? '#8aa9f2' : 'var(--color-primary)',
                          color: '#fff',
                          borderRadius: 'var(--radius-button)',
                          boxShadow: 'var(--shadow-button)',
                          cursor: isSubmitting ? 'wait' : 'pointer',
                          opacity: isSubmitting ? 0.85 : 1,
                        }}
                      >
                        {isSubmitting ? 'Sending…' : 'Send Project Inquiry'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Contact panel */}
            <aside className="lg:col-span-5 flex flex-col" style={{ gap: 24 }} aria-label="Other ways to reach us">
              <div className="w-full max-w-xs mx-auto">
                <ContactIllustration className="w-full h-auto" />
              </div>
              <div className="rounded-3xl bg-white p-6 sm:p-8" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                <h2 className="text-card-title">Other Ways to Reach Us</h2>
                <p className="text-body text-[15px]" style={{ marginTop: 8 }}>
                  Prefer to contact us directly? Use our verified business contact details.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <li>
                    <span className="block text-xs font-bold uppercase" style={{ letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}>
                      Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-semibold break-anywhere"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <span className="block text-xs font-bold uppercase" style={{ letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}>
                      Phone
                    </span>
                    <a href={siteConfig.phoneHref} className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li>
                    <span className="block text-xs font-bold uppercase" style={{ letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}>
                      Availability
                    </span>
                    <span className="text-[15px]">{siteConfig.hours}</span>
                  </li>
                  <li>
                    <span className="block text-xs font-bold uppercase" style={{ letterSpacing: '0.12em', color: 'var(--color-text-muted)' }}>
                      Location
                    </span>
                    <span className="text-[15px]">{siteConfig.location}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

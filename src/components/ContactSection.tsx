import React, { useState, useId } from 'react'
import AnimatedSection from './AnimatedSection'
import { CheckIcon } from './Icons'
import { siteConfig } from '../data/siteData'
import { submitProjectInquiry } from '../utils/inquiryApi'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  address?: string
  message?: string
}

export const ContactSection: React.FC = () => {
  const formId = useId()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [wasQueued, setWasQueued] = useState(false)

  const validate = (): { valid: boolean; firstError?: keyof FormErrors } => {
    const next: FormErrors = {}
    if (name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email address (e.g. name@company.com).'
    if (phone.replace(/\D/g, '').length < 7)
      next.phone = 'Please enter a valid phone number.'
    if (address.trim().length < 6)
      next.address = 'Please enter your address.'
    if (message.trim().length < 10)
      next.message = 'Please describe your requirements in at least 10 characters.'
    setErrors(next)
    const firstError = (['name', 'phone', 'email', 'address', 'message'] as const).find(
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
        phone: phone.trim(),
        address: address.trim(),
        solution: 'Other',
        requirements: message.trim(),
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
    <div className="container">
      <AnimatedSection style={{ maxWidth: 720 }} className="text-center sm:text-left mb-10">
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span>Start a Project</span>
        </div>
        <h2 id="contact-heading" className="text-section-title">
          Contact Us
        </h2>
        <p className="section-subtitle">
          Share your requirements, business goals, and challenges. We&apos;ll review your requirements and engineer the right software solution.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div
          className="rounded-3xl overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-12 shadow-sm hover:shadow-md transition-shadow"
          style={{
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Image side (left on desktop) with minimal soft slate background */}
          <div
            className="order-2 lg:order-1 lg:col-span-6 flex items-center justify-center p-6 sm:p-8 lg:p-10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #f8fafc 0%, #f1f5f9 55%, #e6edf5 100%)',
              borderRight: '1px solid var(--color-border)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.75) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            <img
              src="/Isometric Software Teamwork Workspace.png"
              alt="Isometric Software Teamwork Workspace"
              className="relative z-10 w-full h-auto max-w-[620px] lg:scale-105 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.08]"
              loading="lazy"
            />
          </div>

          {/* Form side (right on desktop, first on mobile) - Clean White */}
          <div className="order-1 lg:order-2 lg:col-span-6 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
            {isSubmitted ? (
              <div role="status" aria-live="polite" className="text-center" style={{ paddingBlock: 32 }}>
                <span
                  className="mx-auto flex items-center justify-center w-16 h-16 rounded-full"
                  style={{ background: '#F4F5FF', color: 'var(--color-primary)', marginBottom: 20 }}
                  aria-hidden="true"
                >
                  <CheckIcon className="w-8 h-8" />
                </span>
                <h3 className="text-card-title" style={{ fontSize: '1.5rem' }}>
                  Thank you for reaching out, {name.trim().split(' ')[0] || 'there'}.
                </h3>
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
                <h3 className="text-card-title" style={{ fontSize: '1.4rem' }}>
                  Tell Us About Your Project
                </h3>
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
                      <label className="field-label" htmlFor={`${formId}-phone`}>
                        Phone Number <span className="field-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        className={`field-input${errors.phone ? ' field-error' : ''}`}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                      />
                      {errorFor('phone')}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20 }}>
                    <div>
                      <label className="field-label" htmlFor={`${formId}-email`}>
                        Email <span className="field-required" aria-hidden="true">*</span>
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
                    <div>
                      <label className="field-label" htmlFor={`${formId}-address`}>
                        Address <span className="field-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id={`${formId}-address`}
                        className={`field-input${errors.address ? ' field-error' : ''}`}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        autoComplete="street-address"
                        placeholder="Street, city and state"
                        aria-invalid={Boolean(errors.address)}
                        aria-describedby={errors.address ? `${formId}-address-error` : undefined}
                      />
                      {errorFor('address')}
                    </div>
                  </div>

                  <div>
                    <label className="field-label" htmlFor={`${formId}-message`}>
                      Message <span className="field-required" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      className={`field-textarea${errors.message ? ' field-error' : ''}`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What problem should the software solve? Who will use it? Any features, systems or deadlines we should know about?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                    />
                    {errorFor('message')}
                  </div>

                  {submitError && (
                    <p role="alert" className="field-message error" style={{ fontSize: '0.9375rem' }}>
                      {submitError}
                    </p>
                  )}

                  <div style={{ paddingTop: 4, display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center min-h-[52px] px-10 py-3 text-base font-semibold transition-all whitespace-nowrap"
                      style={{
                        background: isSubmitting ? '#8aa9f2' : 'var(--color-primary)',
                        color: '#fff',
                        borderRadius: 999,
                        boxShadow: 'var(--shadow-button)',
                        cursor: isSubmitting ? 'wait' : 'pointer',
                        opacity: isSubmitting ? 0.85 : 1,
                        minWidth: 200,
                      }}
                    >
                      {isSubmitting ? 'Sending…' : 'Submit'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default ContactSection

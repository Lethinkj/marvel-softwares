import React, { useState, useId, useEffect, useCallback } from 'react'
import AnimatedSection from './AnimatedSection'
import { CheckIcon } from './Icons'
import { siteConfig } from '../data/siteData'
import { submitProjectInquiry } from '../utils/inquiryApi'
import { trackFormSubmit } from '../utils/analytics'

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

  const handleReset = useCallback(() => {
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')
    setMessage('')
    setErrors({})
    setSubmitError(null)
    setIsSubmitted(false)
  }, [])

  // Auto-close success message and scroll to Home section after 3 seconds
  useEffect(() => {
    if (!isSubmitted) return

    const timer = setTimeout(() => {
      handleReset()

      const homeEl = document.getElementById('home')
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      window.history.replaceState(null, '', '#home')
    }, 3000)

    return () => clearTimeout(timer)
  }, [isSubmitted, handleReset])

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
      trackFormSubmit('contact_consultation', 'failure', { error: 'validation_error', field: firstError })
      return
    }
    setIsSubmitting(true)
    try {
      await submitProjectInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        solution: 'Other',
        requirements: message.trim(),
      })
      setIsSubmitted(true)
      trackFormSubmit('contact_consultation', 'success', {
        name: name.trim(),
        email: email.trim(),
      })
    } catch {
      setSubmitError(
        'We couldn\u2019t submit your inquiry right now. Please try again or contact us directly at ' +
          siteConfig.email +
          '.',
      )
      trackFormSubmit('contact_consultation', 'failure', { error: 'submission_error' })
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
      <AnimatedSection style={{ maxWidth: 720 }} className="text-center mx-auto mb-4">
        <h2 id="contact-heading" className="text-section-title">
          Contact Us
        </h2>
        <p className="section-subtitle">
          Share your requirements, business goals, and challenges. We&apos;ll review your requirements and engineer the right software solution.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div
          className="rounded-3xl overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-[45%_55%] shadow-sm hover:shadow-md transition-shadow"
          style={{
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Image side: 45% on desktop with full natural image size */}
          <div
            className="hidden lg:flex items-center justify-center p-6 sm:p-8 lg:p-10 relative overflow-hidden border-r border-slate-200"
            style={{
              background: 'linear-gradient(160deg, #f8fafc 0%, #f1f5f9 55%, #e6edf5 100%)',
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
              src="/images/contact/software-teamwork.avif"
              alt="Isometric Software Teamwork Workspace"
              className="relative z-10 w-full h-auto max-w-[560px] lg:scale-105 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.04]"
              loading="lazy"
            />
          </div>

          {/* Form side: 55% on desktop - Clean White with blur effect on submit */}
          <div className="col-span-1 bg-white p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center relative">
            {/* The Form Content (blurred when submitted) */}
            <div
              className={`flex flex-col justify-center transition-all duration-500 ${
                isSubmitted
                  ? 'filter blur-[5px] opacity-30 pointer-events-none select-none'
                  : ''
              }`}
              aria-hidden={isSubmitted}
            >
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
            </div>

            {/* Success Overlay with blur backdrop */}
            {isSubmitted && (
              <div
                role="status"
                aria-live="polite"
                className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-white/75 backdrop-blur-md rounded-2xl sm:rounded-3xl transition-all duration-500"
              >
                <div className="max-w-md mx-auto flex flex-col items-center">
                  <span
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center mb-5 shadow-sm text-emerald-600 bg-emerald-50 border border-emerald-200"
                    aria-hidden="true"
                  >
                    <CheckIcon className="w-8 h-8 sm:w-9 sm:h-9" />
                  </span>

                  <h3 className="text-card-title text-slate-900 text-xl sm:text-2xl font-bold leading-tight">
                    Thank you for contacting Marvel Softwares!
                  </h3>

                  <p className="text-body text-[15px] sm:text-[16px] text-slate-600 leading-relaxed mt-3 max-w-sm">
                    Your enquiry has been received. Our team will get in touch with you.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#0057E7] bg-blue-50 hover:bg-blue-100 border border-blue-200/80 active:scale-95 transition-all cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default ContactSection

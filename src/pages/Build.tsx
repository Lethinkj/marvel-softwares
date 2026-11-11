import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Seo from '../components/Seo'
import {
  CheckIcon,
  CheckCircleIcon,
  ClipboardIcon,
  PhoneIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '../components/Icons'
import { renderAppIcon } from '../utils/iconResolver'
import {
  buildTracks,
  buildTiers,
  buildAccessories,
  siteConfig,
  type BuildTrackId,
  type BuildTierId,
} from '../data/siteData'
import { submitProjectInquiry } from '../utils/inquiryApi'
import { trackCtaClick, trackFormSubmit } from '../utils/analytics'
import { useReducedMotion } from '../hooks/useMediaQuery'

export type WizardStep = 'intro' | 'type' | 'tier' | 'addons' | 'details' | 'done'

const STEP_ORDER: Array<{ id: Exclude<WizardStep, 'intro' | 'done'>; label: string }> = [
  { id: 'type', label: 'Build type' },
  { id: 'tier', label: 'Tier' },
  { id: 'addons', label: 'Add-ons' },
  { id: 'details', label: 'Your details' },
]

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}



interface BuildProps {
  initialStep?: WizardStep
  initialTierId?: BuildTierId
}

export const Build: React.FC<BuildProps> = ({ initialStep = 'intro', initialTierId = 'modern' }) => {
  const formId = useId()
  const shouldReduceMotion = useReducedMotion()

  // --- Wizard state ---
  const [step, setStep] = useState<WizardStep>(initialStep)
  const [trackId, setTrackId] = useState<BuildTrackId>('website')
  const [tierId, setTierId] = useState<BuildTierId>(initialTierId)
  const [accessoryIds, setAccessoryIds] = useState<string[]>(['ssl-security'])
  const [addonsTouched, setAddonsTouched] = useState(false)
  const [reference, setReference] = useState<string | null>(null)
  const topRef = useRef<HTMLDivElement | null>(null)

  // --- Details form state ---
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const track = useMemo(() => buildTracks.find((t) => t.id === trackId) ?? buildTracks[0], [trackId])
  const tiers = buildTiers[trackId]
  const tier = tiers.find((t) => t.id === tierId) ?? tiers[1]

  const applicableAccessories = useMemo(
    () => buildAccessories.filter((a) => a.appliesTo.includes(trackId)),
    [trackId],
  )
  const selectedAccessories = useMemo(
    () => applicableAccessories.filter((a) => accessoryIds.includes(a.id)),
    [applicableAccessories, accessoryIds],
  )
  const recommendedIds = useMemo(
    () =>
      applicableAccessories
        .filter((a) => a.recommendedFor[trackId]?.includes(tierId))
        .map((a) => a.id),
    [applicableAccessories, trackId, tierId],
  )

  const stepIndex = STEP_ORDER.findIndex((s) => s.id === step)
  const activeStep = stepIndex === -1 ? 0 : stepIndex

  const goTo = (next: WizardStep) => {
    setStep(next)
    trackCtaClick(`Build Step: ${next}`, '/build')
    window.requestAnimationFrame(() => {
      const el = topRef.current
      if (el) {
        const headerOffset = 70
        window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - headerOffset, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
    })
  }

  const selectTrack = (id: BuildTrackId) => {
    setTrackId(id)
    // Prune add-ons that don't apply to the newly chosen track
    const allowed = new Set(buildAccessories.filter((a) => a.appliesTo.includes(id)).map((a) => a.id))
    setAccessoryIds((prev) => prev.filter((a) => allowed.has(a)))
    trackCtaClick(`Build Track: ${id}`, '/build')
  }

  const toggleAccessory = (id: string) => {
    setAddonsTouched(true)
    setAccessoryIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

  // Pre-select recommended add-ons the first time the add-ons step is opened
  useEffect(() => {
    if (step === 'addons' && !addonsTouched) {
      const applicable = new Set(applicableAccessories.map((a) => a.id))
      setAccessoryIds((prev) => Array.from(new Set([...prev.filter((id) => applicable.has(id)), ...recommendedIds])))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const configurationLines = useMemo(
    () => [
      `Track: ${track.label}`,
      `Tier: ${tier.name} — ${tier.tagline}`,
      `Best for: ${tier.bestFor}`,
      tier.timeline,
      `Accessories: ${
        selectedAccessories.length > 0 ? selectedAccessories.map((a) => a.name).join(', ') : 'None selected'
      }`,
      `Included in ${tier.name}: ${tier.features.join('; ')}`,
    ],
    [track, tier, selectedAccessories],
  )

  const configurationSummary = useMemo(() => configurationLines.join('\n'), [configurationLines])

  const validate = (): { valid: boolean; firstError?: keyof FormErrors } => {
    const next: FormErrors = {}
    if (name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email address (e.g. name@company.com).'
    if (phone.replace(/\D/g, '').length < 7)
      next.phone = 'Please enter a valid phone number (so our team can reach you).'
    setErrors(next)
    const firstError = (['name', 'phone', 'email'] as const).find((f) => next[f])
    return { valid: !firstError, firstError }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)
    if (isSubmitting) return
    const { valid, firstError } = validate()
    if (!valid) {
      document.getElementById(`${formId}-${firstError ?? 'name'}`)?.focus()
      trackFormSubmit('build_configurator', 'failure', { error: 'validation_error', field: firstError })
      return
    }
    setIsSubmitting(true)
    const requirements = [
      '=== BUILD & PRICE — QUOTE REQUEST (/build) ===',
      configurationSummary,
      note.trim() ? `\nClient note:\n${note.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    try {
      const result = await submitProjectInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        solution: `Build: ${track.label} (${tier.name})`,
        requirements,
        source: 'build-configurator',
        buildRequest: {
          track: trackId,
          track_label: track.label,
          tier: tierId,
          tier_name: tier.name,
          accessories: selectedAccessories.map((a) => a.name),
          note: note.trim() || undefined,
        },
      })
      setReference(result.reference ?? null)
      setStep('done')
      trackFormSubmit('build_configurator', 'success', {
        track: trackId,
        tier: tierId,
        accessories: accessoryIds.length,
        name: name.trim(),
        email: email.trim(),
      })
      window.scrollTo({ top: 0, behavior: 'auto' })
    } catch {
      setSubmitError(
        `We couldn’t send your request right now. Please try again, or reach us directly at ${siteConfig.email} / ${siteConfig.phone}.`,
      )
      trackFormSubmit('build_configurator', 'failure', { error: 'submission_error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setPhone('')
    setNote('')
    setErrors({})
    setSubmitError(null)
    setAccessoryIds(['ssl-security'])
    setAddonsTouched(false)
    setTrackId('website')
    setTierId('modern')
    setReference(null)
    setStep('intro')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const errorFor = (field: keyof FormErrors) =>
    errors[field] ? (
      <p id={`${formId}-${field}-error`} role="alert" className="field-message error">
        {errors[field]}
      </p>
    ) : null

  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 26, filter: 'blur(4px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -18, filter: 'blur(4px)' },
        transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <div className="w-full bg-white overflow-x-clip build-page">
      <Seo
        title="Build Your Website or Software | Marvel Softwares"
        description="Build your website or custom software in 4 guided steps — pick Basic, Modern or Ultra, add the add-ons you need, and get a tailored written quote within one business day. No public prices, no obligation."
        path="/build"
        keywords="build your website, software configurator, website package builder, custom software quote, website development free quote, basic modern ultra website, website add-ons, software build your own, Marvel Softwares build"
      />

      {/* ============ INTRO — what this page is & how it works ============ */}
      {step === 'intro' && (
        <section id="build" className="build-intro" aria-labelledby="build-title">
          <div className="container build-intro-grid">
            <div className="build-intro-copy">
              <p className="build-kicker">Marvel Softwares · Build &amp; Price</p>
              <h1 id="build-title" className="build-intro-title">
                Build your website<br />or software —<br />
                <span className="build-intro-accent">step by step.</span>
              </h1>
              <p className="build-intro-lead">
                Four quick guided steps and our engineering team knows exactly what you need.
                Pick what you are building, choose a plan, add the extras — then get a
                <strong> tailored written quote within one business day</strong>. No public
                prices, no pressure, no obligation.
              </p>
              <ul className="build-intro-ticks">
                <li><CheckCircleIcon className="w-5 h-5" /> Written quote within one business day</li>
                <li><CheckCircleIcon className="w-5 h-5" /> No obligation — walk away anytime</li>
                <li><CheckCircleIcon className="w-5 h-5" /> NDA available on request</li>
              </ul>
              <div className="build-intro-ctas">
                <button type="button" className="build-btn-primary build-btn-primary--lg" onClick={() => goTo('type')}>
                  Start Building
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
                <a className="build-btn-ghost" href="/#projects">
                  Explore our work
                </a>
              </div>
              <div className="build-intro-jump">
                <span className="build-intro-jump-label">Already know what you need?</span>
                <button type="button" className="build-intro-jump-btn" onClick={() => { setTrackId('website'); goTo('tier') }}>
                  Build me a website →
                </button>
                <button type="button" className="build-intro-jump-btn" onClick={() => { setTrackId('software'); goTo('tier') }}>
                  Build me software →
                </button>
              </div>
            </div>

            {/* Visual — stylised configurator preview (pure CSS) */}
            <div className="build-intro-visual" aria-hidden="true">
              <div className="build-mock-browser">
                <div className="build-mock-bar">
                  <span className="build-mock-dot build-mock-dot--red" />
                  <span className="build-mock-dot build-mock-dot--amber" />
                  <span className="build-mock-dot build-mock-dot--green" />
                  <span className="build-mock-url">marvelsoftwares.in/build</span>
                </div>
                <div className="build-mock-body">
                  <p className="build-mock-heading">Configure your build</p>
                  <ol className="build-mock-steps">
                    <li className="is-done"><span className="build-mock-check"><CheckIcon className="w-3 h-3" /></span> Build type — Website</li>
                    <li className="is-done"><span className="build-mock-check"><CheckIcon className="w-3 h-3" /></span> Tier — Modern <em>Popular</em></li>
                    <li className="is-active"><span className="build-mock-dotline" /> Add-ons — 3 selected</li>
                    <li><span className="build-mock-dotline" /> Your details → quote</li>
                  </ol>
                  <div className="build-mock-progress"><span style={{ width: '62%' }} /></div>
                  <div className="build-mock-cta">Get My Free Quote</div>
                </div>
              </div>
              <div className="build-floating-chip build-floating-chip--top">
                <CheckIcon className="w-4 h-4" /> One business day
              </div>
              <div className="build-floating-chip build-floating-chip--bottom">
                <ClipboardIcon className="w-4 h-4" /> No public prices
              </div>
            </div>
          </div>

          <div className="container build-how">
            {[
              { n: '1', title: 'Configure', text: 'Type, plan and add-ons — 2 minutes, no account needed.' },
              { n: '2', title: 'We review & quote', text: 'A technical lead reads your build and prepares a written, itemized quote.' },
              { n: '3', title: 'Our team contacts you', text: 'We reach you on your preferred channel — call, WhatsApp or email — to align scope and start.' },
            ].map((item) => (
              <div key={item.n} className="build-how-card">
                <span className="build-how-num">{item.n}</span>
                <div>
                  <h2 className="build-how-title">{item.title}</h2>
                  <p className="build-how-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ WIZARD SHELL ============ */}
      {step !== 'intro' && step !== 'done' && (
        <section ref={topRef} className="build-wizard" aria-labelledby="build-wizard-title">
          <div className="container">
            <div className="build-wizard-card">
              {/* Header: back / progress / talk-to-us */}
              <div className="build-wizard-header">
                <button
                  type="button"
                  className="build-wizard-back"
                  onClick={() => {
                    if (step === 'type') goTo('intro')
                    else if (step === 'tier') goTo('type')
                    else if (step === 'addons') goTo('tier')
                    else goTo('addons')
                  }}
                  aria-label="Go to previous step"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <ol className="build-progress" aria-label="Build progress">
                  {STEP_ORDER.map((s, i) => {
                    const done = i < activeStep
                    const current = i === activeStep
                    return (
                      <li
                        key={s.id}
                        className={`build-progress-step${done ? ' is-done' : ''}${current ? ' is-current' : ''}`}
                        aria-current={current ? 'step' : undefined}
                      >
                        <span className="build-progress-dot">
                          {done ? <CheckIcon className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
                        </span>
                        <span className="build-progress-label">{s.label}</span>
                      </li>
                    )
                  })}
                </ol>

                <a className="build-wizard-call" href={siteConfig.phoneHref} onClick={() => trackCtaClick('Build Wizard: Call', siteConfig.phone)}>
                  <PhoneIcon className="w-4 h-4" />
                  <span>{siteConfig.phone}</span>
                </a>
              </div>
              <div className="build-wizard-bar" aria-hidden="true">
                <div className="build-wizard-bar-fill" style={{ width: `${((activeStep + 1) / STEP_ORDER.length) * 100}%` }} />
              </div>

              {/* Step screens */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} className="build-wizard-screen" {...animationProps}>
                  {/* ---------- STEP 1 — TYPE ---------- */}
                  {step === 'type' && (
                    <div className="build-screen build-screen--type">
                      <p className="build-step-kicker">Step 1 of 4 — Build type</p>
                      <h2 id="build-wizard-title" className="build-screen-title">What are we building for you?</h2>
                      <p className="build-screen-sub">Pick the closest match — we fine-tune scope on the quote call.</p>
                      <div className="build-track-grid" role="radiogroup" aria-label="Build type">
                        {buildTracks.map((t) => {
                          const selected = t.id === trackId
                          return (
                            <button
                              key={t.id}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              className={`build-track-card${selected ? ' is-selected' : ''}`}
                              onClick={() => selectTrack(t.id)}
                            >
                              <span className="build-track-icon" aria-hidden="true">{renderAppIcon(t.icon, 'w-7 h-7')}</span>
                              <span className="build-track-body">
                                <span className="build-track-label">{t.label}</span>
                                <span className="build-track-tagline">{t.tagline}</span>
                                <span className="build-track-desc">{t.description}</span>
                                <span className="build-examples">
                                  {t.examples.map((ex) => (
                                    <span key={ex} className="build-example-chip">{ex}</span>
                                  ))}
                                </span>
                              </span>
                              <span className="build-radio" aria-hidden="true">{selected && <CheckIcon className="w-4 h-4" />}</span>
                            </button>
                          )
                        })}
                      </div>
                      <div className="build-screen-footer">
                        <button type="button" className="build-btn-primary" onClick={() => goTo('tier')}>
                          Continue — choose your tier <ArrowRightIcon className="w-5 h-5" />
                        </button>
                        <div className="build-screen-hint">Not sure? <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">Ask our team on WhatsApp →</a></div>
                      </div>
                    </div>
                  )}

                  {/* ---------- STEP 2 — TIER ---------- */}
                  {step === 'tier' && (
                    <div className="build-screen">
                      <p className="build-step-kicker">Step 2 of 4 — Plan tier</p>
                      <h2 id="build-wizard-title" className="build-screen-title">How far do you want to go?</h2>
                      <p className="build-screen-sub">Same engineering, different depth — upgrade or downgrade later on the quote call.</p>
                      <div className="build-tier-grid" role="radiogroup" aria-label="Tier">
                        {tiers.map((t) => {
                          const selected = t.id === tierId
                          return (
                            <button
                              key={t.id}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              className={`build-tier-card${selected ? ' is-selected' : ''}${t.badge ? ' has-badge' : ''}`}
                              onClick={() => { setTierId(t.id); trackCtaClick(`Build Tier: ${t.name}`, '/build') }}
                            >
                              {t.badge && <span className="build-tier-badge">{t.badge}</span>}
                              <span className="build-tier-name">{t.name}</span>
                              <span className="build-tier-tagline">{t.tagline}</span>
                              <span className="build-tier-bestfor">
                                <span className="build-tier-bestfor-label">Best for</span>
                                {t.bestFor}
                              </span>
                              <span className="build-tier-features">
                                {t.features.map((feature) => (
                                  <span key={feature} className="build-tier-feature">
                                    <CheckIcon className="w-4 h-4 build-tier-check" />
                                    <span>{feature}</span>
                                  </span>
                                ))}
                              </span>
                              <span className="build-tier-timeline">{t.timeline}</span>
                              <span className="build-radio build-radio--tier" aria-hidden="true">{selected && <CheckIcon className="w-4 h-4" />}</span>
                            </button>
                          )
                        })}
                      </div>
                      <div className="build-screen-footer">
                        <button type="button" className="build-btn-primary" onClick={() => goTo('addons')}>
                          Continue — add extras <ArrowRightIcon className="w-5 h-5" />
                        </button>
                        <div className="build-screen-hint">All plans include a written quote, NDA on request &amp; post-launch support.</div>
                      </div>
                    </div>
                  )}

                  {/* ---------- STEP 3 — ADD-ONS (based on selection) ---------- */}
                  {step === 'addons' && (
                    <div className="build-screen">
                      <p className="build-step-kicker">Step 3 of 4 — Add-ons</p>
                      <h2 id="build-wizard-title" className="build-screen-title">Extras, picked for your {track.label.toLowerCase()} · {tier.name}</h2>
                      <p className="build-screen-sub">
                        Showing add-ons that make sense for <strong>{track.label}</strong>.
                        Highlighted ones are recommended for <strong>{tier.name}</strong> — all optional.
                      </p>
                      <div className="build-addons-meta">
                        <span className="build-addons-count">{selectedAccessories.length} selected</span>
                        {selectedAccessories.length > 0 && (
                          <button type="button" className="build-addons-clear" onClick={() => { setAddonsTouched(true); setAccessoryIds([]) }}>
                            Clear all
                          </button>
                        )}
                      </div>
                      <div className="build-accessories-grid" aria-label="Add-ons">
                        {applicableAccessories.map((a) => {
                          const selected = accessoryIds.includes(a.id)
                          const recommended = recommendedIds.includes(a.id)
                          return (
                            <button
                              key={a.id}
                              type="button"
                              role="checkbox"
                              aria-checked={selected}
                              className={`build-accessory${selected ? ' is-selected' : ''}`}
                              onClick={() => toggleAccessory(a.id)}
                            >
                              {recommended && <span className="build-accessory-recommended">Recommended</span>}
                              <span className="build-accessory-icon" aria-hidden="true">{renderAppIcon(a.icon, 'w-5 h-5')}</span>
                              <span className="build-accessory-name">{a.name}</span>
                              <span className="build-accessory-desc">{a.description}</span>
                              <span className="build-accessory-check" aria-hidden="true">{selected && <CheckIcon className="w-4 h-4" />}</span>
                            </button>
                          )
                        })}
                      </div>
                      <div className="build-screen-footer">
                        <button type="button" className="build-btn-primary" onClick={() => goTo('details')}>
                          Continue — your details <ArrowRightIcon className="w-5 h-5" />
                        </button>
                        <div className="build-screen-hint">{selectedAccessories.length === 0 ? 'No extras needed — that’s fine, skip ahead.' : `${selectedAccessories.length} extra${selectedAccessories.length > 1 ? 's' : ''} will be included in your quote.`}</div>
                      </div>
                    </div>
                  )}

                  {/* ---------- STEP 4 — DETAILS + LIVE SUMMARY ---------- */}
                  {step === 'details' && (
                    <div className="build-screen build-details-grid">
                      {/* Live build summary */}
                      <aside className="build-brief" aria-label="Your build summary">
                        <div className="build-brief-head">
                          <ClipboardIcon className="w-5 h-5" />
                          <h3 className="build-brief-title">Your build</h3>
                        </div>
                        <dl className="build-brief-list">
                          <div>
                            <dt>Build type <button type="button" className="build-brief-change" onClick={() => goTo('type')}>Change</button></dt>
                            <dd>{track.label}</dd>
                          </div>
                          <div>
                            <dt>Tier <button type="button" className="build-brief-change" onClick={() => goTo('tier')}>Change</button></dt>
                            <dd>{tier.name}{tier.badge ? <span className="build-summary-badge">{tier.badge}</span> : null}</dd>
                          </div>
                          <div>
                            <dt>Typical delivery</dt>
                            <dd>{tier.timeline.replace('Typical delivery: ', '')}</dd>
                          </div>
                          <div>
                            <dt>Add-ons <button type="button" className="build-brief-change" onClick={() => goTo('addons')}>Change</button></dt>
                            <dd>
                              {selectedAccessories.length === 0 ? (
                                'None selected'
                              ) : (
                                <ul className="build-brief-addons">
                                  {selectedAccessories.map((a) => (
                                    <li key={a.id}><CheckIcon className="w-3.5 h-3.5" />{a.name}</li>
                                  ))}
                                </ul>
                              )}
                            </dd>
                          </div>
                        </dl>
                        <p className="build-brief-note">No prices are shown — every quote is itemized and tailored. Expect a written quote within one business day.</p>
                      </aside>

                      {/* Contact form */}
                      <div className="build-details-form-wrap">
                        <p className="build-step-kicker">Step 4 of 4 — Your details</p>
                        <h2 id="build-wizard-title" className="build-screen-title build-screen-title--form">Where do we send your quote?</h2>
                        <p className="build-screen-sub">Our team will contact you soon — nothing is charged or booked yet.</p>
                        <form onSubmit={handleSubmit} noValidate className="contact-form build-quote-form">
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
                          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
                            <div>
                              <label className="field-label" htmlFor={`${formId}-phone`}>
                                Phone / WhatsApp <span className="field-required" aria-hidden="true">*</span>
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
                          </div>
                          <div>
                            <label className="field-label" htmlFor={`${formId}-note`}>
                              Anything else? <span className="field-optional">(optional)</span>
                            </label>
                            <textarea
                              id={`${formId}-note`}
                              className="field-textarea"
                              rows={3}
                              placeholder="Business goals, deadline, references you love…"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            />
                          </div>
                          {submitError && (
                            <p role="alert" className="field-message error" style={{ fontSize: '0.9375rem' }}>
                              {submitError}
                            </p>
                          )}
                          <button type="submit" disabled={isSubmitting} className="build-btn-primary build-btn-primary--full">
                            {isSubmitting ? 'Sending your request…' : 'Request My Quote'}
                          </button>
                          <p className="build-quote-privacy">
                            No payment or commitment at this stage. By submitting, you agree to our team contacting you about this request.
                          </p>
                        </form>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* ============ DONE ============ */}
      {step === 'done' && (
        <section className="build-done" aria-labelledby="build-done-title">
          <div className="container">
            <div className="build-done-card">
              <span className="build-done-icon" aria-hidden="true">
                <CheckCircleIcon className="w-12 h-12" />
              </span>
              <p className="build-step-kicker">Request received</p>
              <h1 id="build-done-title" className="build-done-title">Our team will contact you soon.</h1>
              <p className="build-done-lead">
                A confirmation email with your exact configuration ({track.label} · {tier.name}) is on its way to{' '}
                <strong>{email || 'your inbox'}</strong>. We will reach out on <strong>{phone || 'your number'}</strong> within one business day.
              </p>
              {reference && (
                <p className="build-done-ref">Reference: <span>{reference}</span></p>
              )}
              <ol className="build-done-steps">
                <li><span>1</span> Our engineering team reviews your configuration (today)</li>
                <li><span>2</span> You receive a written, itemized quote (within one business day)</li>
                <li><span>3</span> Scope call → onboarding → build begins</li>
              </ol>
              <div className="build-done-actions">
                <a className="build-btn-primary" href="/">Back to Home</a>
                <a className="build-btn-ghost" href={siteConfig.phoneHref}><PhoneIcon className="w-4 h-4" /> Call us now</a>
                <a className="build-btn-ghost build-btn-ghost--wa" href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="w-4 h-4" /> WhatsApp</a>
              </div>
              <button type="button" className="build-done-again" onClick={handleReset}>Send another build request</button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Build

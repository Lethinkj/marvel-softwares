import React, { useState, useEffect } from 'react'
import { getConsentStatus, setConsentStatus, onOpenConsentBanner } from '../utils/consent'
import { initGA } from '../utils/analytics'

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // If user has not yet decided, show banner after a gentle 800ms delay
    const currentStatus = getConsentStatus()
    let timer: number | null = null
    if (currentStatus === 'undecided') {
      timer = window.setTimeout(() => setIsVisible(true), 800)
    }

    // Always listen for manual reopen requests (e.g. from footer "Cookie Preferences" link)
    const unsubscribe = onOpenConsentBanner(() => setIsVisible(true))
    return () => {
      if (timer !== null) window.clearTimeout(timer)
      unsubscribe()
    }
  }, [])

  const handleAccept = () => {
    setConsentStatus('accepted')
    setIsVisible(false)
    initGA()
  }

  const handleDecline = () => {
    setConsentStatus('declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 transition-all duration-300 ease-out"
    >
      <div
        className="rounded-2xl p-5 sm:p-6 text-slate-100 shadow-2xl border border-slate-700/80"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="flex items-start gap-3.5">
          {/* Shield / Privacy Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[#00cfff]"
            style={{ background: 'rgba(0, 87, 231, 0.2)', border: '1px solid rgba(0, 207, 255, 0.25)' }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Privacy & Cookie Preferences
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              We use cookies and first-party telemetry to understand visitor journeys, optimize performance, and improve our software engineering services. No personal data is sold or shared with third-party advertisers.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <a
            href="/#contact"
            className="text-[11.5px] text-slate-400 hover:text-white underline underline-offset-2 transition-colors self-start sm:self-center"
          >
            Learn more
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-4 py-1.5 text-xs font-semibold text-white rounded-lg transition-transform active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #0057E7 0%, #0033A0 100%)',
                boxShadow: '0 2px 8px rgba(0, 87, 231, 0.4)',
              }}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner

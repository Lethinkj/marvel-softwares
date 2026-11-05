import React, { useState, useEffect } from 'react'
import { getConsentStatus, setConsentStatus, onOpenConsentBanner } from '../utils/consent'
import { initGA } from '../utils/analytics'

/**
 * Checks whether the current context is a mobile device or viewport (< 768px).
 */
function isMobileContext(): boolean {
  if (typeof window === 'undefined') return false
  const isSmallScreen = window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches
  const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    navigator.userAgent || ''
  )
  return isSmallScreen || isMobileUA
}

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // In mobile, do not ask for cookies (keep hidden)
    if (isMobileContext()) {
      return
    }

    // If user has not yet decided, show banner after a gentle 800ms delay on desktop/tablet
    const currentStatus = getConsentStatus()
    let timer: number | null = null
    if (currentStatus === 'undecided') {
      timer = window.setTimeout(() => setIsVisible(true), 800)
    }

    // Always listen for manual reopen requests (e.g. from footer "Cookie Preferences" link on desktop)
    const unsubscribe = onOpenConsentBanner(() => {
      if (!isMobileContext()) {
        setIsExpanded(false)
        setIsVisible(true)
      }
    })
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

  const handleOnlyRequired = () => {
    setConsentStatus('declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Privacy Consent"
      className="hidden md:block fixed right-6 bottom-6 max-w-md z-50 transition-all duration-300 ease-out"
    >
      <div
        className="rounded-2xl p-5 text-slate-100 shadow-2xl border border-slate-700/80"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="flex items-start gap-3">
          {/* Cookie Icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[#00cfff]"
            style={{ background: 'rgba(0, 87, 231, 0.2)', border: '1px solid rgba(0, 207, 255, 0.25)' }}
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M11 17v.01" />
              <path d="M7 13v.01" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Cookie Consent
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">
              We use cookies to improve your browsing experience.
            </p>

            {/* Expandable detailed explanation */}
            {isExpanded && (
              <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-[11.5px] text-slate-400 leading-relaxed space-y-1.5">
                <p>
                  We use cookies and first-party telemetry to understand visitor journeys, optimize performance, and improve our software engineering services.
                </p>
                <p>
                  No personal data is sold or shared with third-party advertisers.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-[11.5px] text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors self-center cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={handleOnlyRequired}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
            >
              Only Required
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-1.5 text-xs font-semibold text-white rounded-lg transition-transform active:scale-95 cursor-pointer"
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

import { siteConfig } from '../data/siteData'
import { PhoneIcon, WhatsAppIcon } from './Icons'

/**
 * Floating Quick Contact Actions & Back to Top:
 * 1. Call Us button (redirects to phone dialer)
 * 2. WhatsApp button (redirects to WhatsApp chat with pre-filled inquiry)
 * 3. Back to Top Arrow button (smooth-scrolls page to top)
 */
export function BackToTop() {
  const scrollToTop = () => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <aside
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-2.5 sm:gap-3 select-none"
      role="region"
      aria-label="Quick contact actions and page navigation"
    >
      {/* 1. Call Floating Action */}
      <a
        href={siteConfig.phoneHref}
        className="floating-action-call w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 group relative"
        style={{ backgroundColor: '#0057E7' }}
        aria-label="Call Marvel Softwares support"
        title="Call Us: +91 8088218609"
      >
        <PhoneIcon className="w-5 h-5 text-white transition-transform duration-200 group-hover:rotate-12" />
        {/* Desktop Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden sm:block">
          Call Us
        </span>
      </a>

      {/* 2. WhatsApp Floating Action */}
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-wa w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 group relative"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Chat with Marvel Softwares on WhatsApp"
        title="WhatsApp Us"
      >
        <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-200 group-hover:scale-110" />
        {/* Desktop Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden sm:block">
          WhatsApp Us
        </span>
      </a>

      {/* 3. Back to Top Arrow Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="floating-action-arrow w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 group relative cursor-pointer"
        style={{ backgroundColor: '#FF5A00' }}
        aria-label="Scroll back to top"
        title="Back to Top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-y-0.5"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
        {/* Desktop Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden sm:block">
          Back to Top
        </span>
      </button>
    </aside>
  )
}

export default BackToTop

import { useState, useEffect } from 'react'

const SHOW_AFTER = 600

/**
 * Floating circular back-to-top button rendered on every page.
 * Hidden at the top of the page, appears once the user scrolls
 * down, and smooth-scrolls back to the top on click.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="fixed bottom-20 right-4 md:bottom-20 md:right-6 lg:bottom-6 lg:right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full text-white transition-all duration-200"
      style={{
        background: 'var(--color-orange)',
        boxShadow: '0 6px 18px -8px rgba(255,90,0,.6)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#e04f00'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--color-orange)'
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  )
}

export default BackToTop

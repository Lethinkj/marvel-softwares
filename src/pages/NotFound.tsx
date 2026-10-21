import React from 'react'
import { motion } from 'motion/react'
import Button from '../components/Button'
import Card from '../components/Card'
import AnimatedSection from '../components/AnimatedSection'
import { useReducedMotion } from '../hooks/useMediaQuery'

export const NotFound: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative min-h-[calc(100vh-var(--nav-height)-180px)] sm:min-h-[75vh] flex items-center justify-center bg-white text-[#1E293B] overflow-hidden section-padding py-12 sm:py-20"
      style={{ paddingTop: 'calc(var(--header-offset) + 24px)' }}>
      {/* Decorative background glow backdrop */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] md:w-[650px] h-80 sm:h-[500px] md:h-[650px] bg-gradient-to-tr from-[#F0F5FF] via-[#F0F5FF]/50 to-transparent rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Decorative floating geometric elements */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 6, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/4 left-8 sm:left-16 md:left-28 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F0F5FF] to-transparent border border-[#CBD5E1] hidden sm:block shadow-xs"
          />
          <motion.div
            animate={{
              y: [12, -12, 12],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1/4 right-8 sm:right-16 md:right-28 w-16 h-16 rounded-full bg-gradient-to-tr from-[#F0F5FF] to-transparent border border-[#CBD5E1] hidden sm:block shadow-xs"
          />
        </>
      )}

      <AnimatedSection
        direction="up"
        as="div"
        className="container relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4"
      >
        {/* Subtle status badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-mono font-bold tracking-wider uppercase text-[#0057E7] bg-[#F0F5FF] border border-[#0057E7]/20 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
            Error 404
          </span>
        </div>

        {/* Large 404 Display */}
        <h1 className="text-hero text-8xl sm:text-9xl md:text-[10rem] font-black tracking-tight leading-none text-[#0057E7] drop-shadow-xs select-none">
          404
        </h1>

        {/* Page Not Found Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0033A0] tracking-tight mt-3 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[#334155] text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-10">
          <Button
            variant="primary"
            size="lg"
            to="/"
            className="w-full sm:w-auto min-w-[170px]"
          >
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            to="/projects"
            className="w-full sm:w-auto min-w-[170px]"
          >
            <span className="inline-flex items-center gap-2">
              View Projects
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Button>
        </div>

        {/* Helpful links card */}
        <Card className="w-full max-w-lg p-5 border border-[#CBD5E1] bg-[#F0F5FF]/50 text-left shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-[#0033A0] mb-3 text-center sm:text-left">
            Looking for something specific?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: 'Homepage', to: '/' },
              { label: 'Services', to: '/services' },
              { label: 'About Us', to: '/about' },
              { label: 'Projects', to: '/projects' },
              { label: 'Contact Us', to: '/contact' },
            ].map((link) => (
              <Button
                key={link.to}
                variant="ghost"
                size="sm"
                to={link.to}
                className="text-xs text-[#334155] hover:text-[#0057E7] hover:bg-white justify-start min-h-[38px] px-2.5 py-1.5 font-medium"
              >
                <span className="text-[#0057E7] mr-1 font-mono font-bold">/</span>
                {link.label}
              </Button>
            ))}
          </div>
        </Card>
      </AnimatedSection>
    </div>
  )
}

export default NotFound

import React, { useState, useEffect, useRef, useCallback } from 'react'
import AnimatedSection from './AnimatedSection'
import { testimonials, type Testimonial } from '../data/siteData'

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [translateX, setTranslateX] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage)
  const gapPx = itemsPerPage === 1 ? 16 : 24

  const updatePosition = useCallback((targetIndex: number) => {
    if (!trackRef.current) return
    const children = trackRef.current.children
    const targetElement = children[targetIndex] as HTMLElement
    if (targetElement) {
      setTranslateX(targetElement.offsetLeft)
    }
  }, [])

  // Sync translation whenever index or itemsPerPage changes
  useEffect(() => {
    updatePosition(currentIndex)
  }, [currentIndex, updatePosition, itemsPerPage])

  // Handle responsive items per page: 3 on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const handleResize = () => {
      let count = 3
      if (window.innerWidth < 640) {
        count = 1
      } else if (window.innerWidth < 1024) {
        count = 2
      }
      setItemsPerPage(count)

      const nextMax = Math.max(0, testimonials.length - count)
      setCurrentIndex((prev) => {
        const clamped = Math.min(prev, nextMax)
        requestAnimationFrame(() => updatePosition(clamped))
        return clamped
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updatePosition])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
    touchStartX.current = null
  }

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="container">
        <AnimatedSection style={{ maxWidth: 760 }} className="text-center mx-auto mb-8 sm:mb-10">
          <h2 id="testimonials-heading" className="text-section-title text-[#0033A0]">
            Testimonials
          </h2>
          <p className="section-subtitle">
            Build trust with genuine customer experiences.
          </p>
        </AnimatedSection>

        {/* Carousel Container: Left Arrow, 3 Cards Viewport, Right Arrow */}
        <div className="relative flex items-center gap-2.5 sm:gap-4 lg:gap-5 w-full">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="testimonial-arrow-btn shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#0033A0] hover:border-[#0033A0] shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 select-none z-10"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Carousel Viewport (Shows 3 at a time on desktop) */}
          <div
            className="overflow-hidden flex-1 py-2 sm:py-3 focus:outline-hidden"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-roledescription="carousel"
            aria-label="Customer Testimonials Carousel"
          >
            <div
              ref={trackRef}
              className={`flex items-stretch ${itemsPerPage === 1 ? 'gap-4' : 'gap-6'} transition-transform duration-500 ease-out`}
              style={{
                transform: `translateX(-${translateX}px)`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 flex flex-col"
                  style={{
                    width: `calc((100% - ${(itemsPerPage - 1) * gapPx}px) / ${itemsPerPage})`,
                  }}
                >
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="testimonial-arrow-btn shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#0033A0] hover:border-[#0033A0] shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 select-none z-10"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Rectangular Pagination Indicator Dash Strip */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-7">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                i === currentIndex
                  ? 'w-8 bg-[#0033A0]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to testimonial slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <article
      className="testimonial-card-rect flex flex-col justify-between h-full w-full bg-white rounded-none p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#0057E7]/80 transition-all duration-300 relative overflow-hidden group select-none"
      aria-label={`Testimonial from ${item.clientName}`}
    >
      {/* Top brand accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: item.accentColor }}
      />

      {/* Decorative backdrop quote watermark */}
      <svg
        className="absolute top-3.5 right-4 w-12 h-12 text-slate-100 group-hover:text-blue-50/80 transition-colors pointer-events-none select-none -z-0"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <div className="relative z-10">
        {/* Rating Row & Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5" aria-label={`Rating: ${item.rating} out of 5 stars`}>
            <div className="flex items-center text-amber-400">
              {[...Array(item.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current drop-shadow-2xs"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">{item.rating}.0</span>
          </div>

          {item.isVerified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <svg
                className="w-3 h-3 text-emerald-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Verified Customer</span>
            </span>
          )}
        </div>

        {/* Project Completed Rectangular Tag */}
        <div className="mb-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-semibold bg-slate-50 border border-slate-200/90 text-slate-700 max-w-full">
            <span
              className="w-2 h-2 rounded-none shrink-0"
              style={{ backgroundColor: item.accentColor }}
              aria-hidden="true"
            />
            <span className="text-slate-400 font-normal shrink-0">Project:</span>
            <span className="text-slate-900 font-bold truncate">
              {item.projectCompleted}
            </span>
          </div>
        </div>

        {/* Customer Feedback Body */}
        <p className="text-body text-[14px] sm:text-[14.5px] leading-relaxed text-slate-700 font-normal">
          &ldquo;{item.feedback}&rdquo;
        </p>
      </div>

      {/* Client Profile Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3 relative z-10">
        <div
          className="w-10 h-10 rounded-none flex items-center justify-center font-bold text-white text-xs shadow-xs shrink-0 select-none border border-white/20"
          style={{ backgroundColor: item.accentColor }}
          aria-hidden="true"
        >
          {item.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-900 truncate">
            {item.clientName}
          </h3>
          <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
            {item.role} &bull; {item.companyName}
          </p>
        </div>
      </div>
    </article>
  )
}

export default Testimonials

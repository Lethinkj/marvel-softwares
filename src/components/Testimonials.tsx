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
        <AnimatedSection style={{ maxWidth: 760 }} className="text-center mx-auto mb-8 sm:mb-12">
          <h2 id="testimonials-heading" className="text-section-title text-[#0033A0]">
            Testimonials
          </h2>
          <p className="section-subtitle">
            Build trust with genuine customer experiences.
          </p>
        </AnimatedSection>

        {/* Carousel Container: Left Arrow, 3 Cards Viewport, Right Arrow */}
        <div className="relative flex items-center gap-3 sm:gap-4 lg:gap-5 w-full">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:text-[#FF5A00] hover:border-[#FF5A00] shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 select-none z-10"
          >
            <svg
              width="18"
              height="18"
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
            className="overflow-hidden flex-1 py-3 focus:outline-hidden"
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
            className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:text-[#FF5A00] hover:border-[#FF5A00] shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 select-none z-10"
          >
            <svg
              width="18"
              height="18"
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

        {/* Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-7 sm:mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                i === currentIndex
                  ? 'w-6 bg-[#FF5A00]'
                  : 'w-2 bg-orange-200 hover:bg-orange-300'
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
      className="flex flex-col justify-between h-full w-full bg-white rounded-2xl pt-5 pb-5 px-5 sm:pt-5.5 sm:pb-6 sm:px-6 border border-orange-200/90 shadow-[0_4px_20px_rgba(255,90,0,0.04)] hover:shadow-[0_12px_28px_rgba(255,90,0,0.09)] hover:border-[#FF5A00]/50 transition-all duration-300 relative select-none"
      aria-label={`Testimonial from ${item.clientName}`}
    >
      <div>
        {/* Top Row: Quote Badge on left, 5 Orange Stars + 5.0 on right */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-3.5">
          <div
            className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 shadow-2xs"
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 text-[#FF5A00]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* 5 Orange Stars + 5.0 moved to top-right */}
          <div
            className="flex items-center gap-1.5 shrink-0"
            aria-label={`Rating: ${item.rating} out of 5 stars`}
          >
            <div className="flex items-center text-[#FF5A00] gap-0.5">
              {[...Array(item.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-900">
              {item.rating}.0
            </span>
          </div>
        </div>

        {/* Second Row: Project Completed Pill */}
        <div className="mb-3 sm:mb-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50/90 border border-orange-100 text-xs text-slate-800 max-w-full">
            <svg
              className="w-3.5 h-3.5 text-[#FF5A00] shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span className="text-slate-500 font-normal shrink-0">Project:</span>
            <span className="text-slate-900 font-bold truncate">
              {item.projectCompleted}
            </span>
          </div>
        </div>

        {/* Third Row: Customer Feedback */}
        <p className="text-[14px] sm:text-[14.5px] leading-relaxed text-slate-800 font-normal">
          &ldquo;{item.feedback}&rdquo;
        </p>
      </div>

      {/* Profile Footer */}
      <div>
        <div className="border-t border-slate-100 my-3.5 sm:my-4" />
        <div className="flex items-center gap-3.5">
          {/* Avatar Image (Enlarged to 56px / w-14 h-14) */}
          <div
            className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 select-none shadow-sm border border-orange-200/80 bg-[#FF5A00]"
            aria-hidden="true"
          >
            {item.avatar ? (
              <img
                src={item.avatar}
                alt={item.clientName}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-white text-sm">
                {item.initials}
              </div>
            )}
          </div>

          {/* Vertical Orange Accent Divider */}
          <div className="w-0.5 h-10 sm:h-11 bg-orange-300/80 shrink-0" aria-hidden="true" />

          {/* Client Name & Role */}
          <div className="min-w-0 flex-1">
            <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-slate-900 truncate">
              {item.clientName}
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-500 font-medium truncate mt-0.5">
              {item.role} &bull; {item.companyName}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Testimonials

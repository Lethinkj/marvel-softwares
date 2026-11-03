import React, { useState, useEffect, useRef, useCallback } from 'react'
import AnimatedSection from './AnimatedSection'
import { testimonials, type Testimonial } from '../data/siteData'
import './Testimonials.css'

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [translateX, setTranslateX] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage)
  const gapPx = itemsPerPage === 1 ? 16 : 20

  const updatePosition = useCallback((targetIndex: number) => {
    if (!trackRef.current) return
    const children = trackRef.current.children
    const targetElement = children[targetIndex] as HTMLElement
    if (targetElement) {
      setTranslateX(targetElement.offsetLeft)
    }
  }, [])

  useEffect(() => {
    updatePosition(currentIndex)
  }, [currentIndex, updatePosition, itemsPerPage])

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
      <div className="container">
        <AnimatedSection className="ts-head">
          <h2 id="testimonials-heading" className="text-section-title ts-title">
            Testimonial
          </h2>
        </AnimatedSection>

        <div className="ts-carousel">
          <div className="ts-rail">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="ts-arrow"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div
              className="ts-viewport"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              aria-roledescription="carousel"
              aria-label="Customer Testimonials"
            >
              <div
                ref={trackRef}
                className="ts-track"
                style={{
                  gap: `${gapPx}px`,
                  transform: `translateX(-${translateX}px)`,
                }}
              >
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="shrink-0 flex"
                    style={{
                      width: `calc((100% - ${(itemsPerPage - 1) * gapPx}px) / ${itemsPerPage})`,
                    }}
                  >
                    <TestimonialCard item={item} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="ts-arrow"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {maxIndex > 0 && (
            <div className="ts-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`ts-dot${i === currentIndex ? ' is-active' : ''}`}
                  aria-label={`Go to testimonial slide ${i + 1}`}
                  aria-current={i === currentIndex ? 'true' : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <article className="ts-card" aria-label={`Testimonial from ${item.clientName}`}>
      <div>
        <svg
          className="ts-quote"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <h3 className="ts-card-title">{item.projectCompleted}</h3>
        <p className="ts-card-body">{item.feedback}</p>
      </div>

      <div className="ts-card-footer">
        <div className="ts-person">
          <div className="ts-avatar" aria-hidden="true">
            {item.avatar ? (
              <img
                src={item.avatar}
                alt=""
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <span>{item.initials}</span>
            )}
          </div>

          <div className="ts-person-copy">
            <p className="ts-name">{item.clientName}</p>
            <p className="ts-role">{item.role}</p>
          </div>
        </div>

        <div
          className="ts-stars"
          aria-label={`Rating: ${item.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              fill="currentColor"
              className={i < item.rating ? 'is-filled' : 'is-muted'}
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </article>
  )
}

export default Testimonials

import React, { useEffect, useRef } from 'react'
import AnimatedSection from './AnimatedSection'

interface ClientLogo {
  name: string
  src: string
  webpSrc?: string
  height: number
  maxWidth: number
}

const clientLogos: ClientLogo[] = [
  {
    name: 'Marvel Slice',
    src: '/clients/marvel-slice.png',
    webpSrc: '/clients/marvel-slice.webp',
    height: 80,
    maxWidth: 160,
  },
  {
    name: 'Marvel Villas',
    src: '/clients/marvel-villas.png',
    webpSrc: '/clients/marvel-villas.webp',
    height: 52,
    maxWidth: 240,
  },
]

export const OurClients: React.FC = () => {
  // Repeat sequence so infinite loop belt flows smoothly across ultra-wide viewports
  const repeatedLogos = Array.from({ length: 6 }, () => clientLogos).flat()
  const marqueeList = [...repeatedLogos, ...repeatedLogos]
  const beltRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)

  useEffect(() => {
    const belt = beltRef.current
    if (!belt) return

    let animationFrame = 0
    let previousTime = performance.now()

    const advance = (time: number) => {
      const elapsed = time - previousTime
      previousTime = time

      if (!isDraggingRef.current) {
        belt.scrollLeft += elapsed * 0.06
        const loopWidth = belt.scrollWidth / 2
        if (loopWidth > 0 && belt.scrollLeft >= loopWidth) {
          belt.scrollLeft -= loopWidth
        }
      }

      animationFrame = requestAnimationFrame(advance)
    }

    animationFrame = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const belt = beltRef.current
    if (!belt || event.button !== 0) return

    isDraggingRef.current = true
    dragStartXRef.current = event.clientX
    dragStartScrollLeftRef.current = belt.scrollLeft
    belt.setPointerCapture(event.pointerId)
    belt.classList.add('is-dragging')
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const belt = beltRef.current
    if (!belt || !isDraggingRef.current) return

    event.preventDefault()
    belt.scrollLeft = dragStartScrollLeftRef.current - (event.clientX - dragStartXRef.current)
    const loopWidth = belt.scrollWidth / 2
    if (loopWidth > 0) {
      if (belt.scrollLeft >= loopWidth) belt.scrollLeft -= loopWidth
      if (belt.scrollLeft < 0) belt.scrollLeft += loopWidth
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const belt = beltRef.current
    if (!belt) return

    isDraggingRef.current = false
    if (belt.hasPointerCapture(event.pointerId)) {
      belt.releasePointerCapture(event.pointerId)
    }
    belt.classList.remove('is-dragging')
  }

  useEffect(() => {
    const releaseDrag = () => {
      const belt = beltRef.current
      isDraggingRef.current = false
      belt?.classList.remove('is-dragging')
    }

    window.addEventListener('pointerup', releaseDrag)
    window.addEventListener('pointercancel', releaseDrag)
    window.addEventListener('blur', releaseDrag)

    return () => {
      window.removeEventListener('pointerup', releaseDrag)
      window.removeEventListener('pointercancel', releaseDrag)
      window.removeEventListener('blur', releaseDrag)
    }
  }, [])

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <h2 id="clients-heading" className="text-section-title text-center">
            Our Brands
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Empowering Businesses Through Innovation
          </p>
        </AnimatedSection>
      </div>

      {/* Marquee Logo Belt (Moving Left to Right) */}
      <div
        ref={beltRef}
        className="client-logo-belt w-full overflow-x-auto relative py-6 sm:py-8"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="animate-marquee-ltr flex items-center">
          {marqueeList.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="mx-10 sm:mx-14 lg:mx-16 flex items-center justify-center shrink-0 group/logo"
              title={client.name}
            >
              <picture className="flex items-center justify-center">
                {client.webpSrc && <source srcSet={client.webpSrc} type="image/webp" />}
                <img
                  src={client.src}
                  alt={`${client.name} logo`}
                  style={{
                    height: `${client.height}px`,
                    maxWidth: `${client.maxWidth}px`,
                    width: 'auto',
                  }}
                  draggable={false}
                  className="object-contain opacity-100 transition-transform duration-300 transform hover:scale-105 select-none pointer-events-none"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurClients
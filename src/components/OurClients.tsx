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
  // Repeat sequence so the infinite loop flows smoothly across ultra-wide viewports
  const repeatedLogos = Array.from({ length: 6 }, () => clientLogos).flat()
  const marqueeList = [...repeatedLogos, ...repeatedLogos]
  const beltRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const getHalfWidth = () => track.scrollWidth / 2 || 1

    const normalize = () => {
      const half = getHalfWidth()
      offsetRef.current = ((offsetRef.current % half) + half) % half
    }

    const render = () => {
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    }

    let frame = 0
    let previousTime = performance.now()

    const advance = (time: number) => {
      const elapsed = Math.min(64, time - previousTime)
      previousTime = time

      if (!reduceMotion && !isDraggingRef.current) {
        offsetRef.current -= elapsed * 0.075
        normalize()
        render()
      }

      frame = requestAnimationFrame(advance)
    }

    render()
    frame = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const belt = beltRef.current
    if (!belt || event.button !== 0) return

    isDraggingRef.current = true
    dragStartXRef.current = event.clientX
    dragStartOffsetRef.current = offsetRef.current
    belt.setPointerCapture(event.pointerId)
    belt.classList.add('is-dragging')
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !isDraggingRef.current) return

    const half = track.scrollWidth / 2 || 1
    offsetRef.current = dragStartOffsetRef.current - (event.clientX - dragStartXRef.current)
    offsetRef.current = ((offsetRef.current % half) + half) % half
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
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
      isDraggingRef.current = false
      beltRef.current?.classList.remove('is-dragging')
    }

    window.addEventListener('blur', releaseDrag)
    return () => window.removeEventListener('blur', releaseDrag)
  }, [])

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <h2 id="clients-heading" className="text-section-title text-center">
            Our <span className="heading-last-word">Clients</span>
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Empowering Businesses Through Innovation
          </p>
        </AnimatedSection>
      </div>

      {/* Marquee Logo Belt (auto-moving and draggable) */}
      <div
        ref={beltRef}
        className="client-logo-belt w-full overflow-hidden relative py-6 sm:py-8"
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
        <div ref={trackRef} className="animate-marquee-ltr flex items-center">
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

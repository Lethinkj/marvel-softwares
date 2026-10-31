import React, { useEffect, useRef } from 'react'
import AnimatedSection from './AnimatedSection'

interface ClientLogo {
  name: string
  src: string
  height: number
  maxWidth: number
}

const clientLogos: ClientLogo[] = [
  { name: 'KPMG', src: '/clients/kpmg.svg', height: 28, maxWidth: 85 },
  { name: 'PwC', src: '/clients/pwc.svg', height: 32, maxWidth: 65 },
  { name: 'Deloitte', src: '/clients/deloitte.svg', height: 22, maxWidth: 110 },
  { name: 'Fujitsu', src: '/clients/fujitsu.svg', height: 28, maxWidth: 75 },
  { name: 'Siemens', src: '/clients/siemens.svg', height: 20, maxWidth: 115 },
  { name: 'Insurance Institute', src: '/clients/insurance-institute.svg', height: 32, maxWidth: 100 },
  { name: 'Accenture', src: '/clients/accenture.svg', height: 26, maxWidth: 105 },
  { name: 'Google', src: '/clients/google.svg', height: 28, maxWidth: 100 },
  { name: 'Meta', src: '/clients/meta.svg', height: 24, maxWidth: 120 },
  { name: 'Microsoft', src: '/clients/microsoft.svg', height: 26, maxWidth: 125 },
  { name: 'Amazon', src: '/clients/amazon.svg', height: 26, maxWidth: 95 },
  { name: 'Apple', src: '/clients/apple.svg', height: 30, maxWidth: 32 },
  { name: 'Netflix', src: '/clients/netflix.svg', height: 26, maxWidth: 90 },
  { name: 'Spotify', src: '/clients/spotify.svg', height: 28, maxWidth: 30 },
  { name: 'Stripe', src: '/clients/stripe.svg', height: 26, maxWidth: 65 },
  { name: 'Uber', src: '/clients/uber.svg', height: 22, maxWidth: 70 },
  { name: 'Airbnb', src: '/clients/airbnb.svg', height: 28, maxWidth: 95 },
  { name: 'Intel', src: '/clients/intel.svg', height: 26, maxWidth: 30 },
  { name: 'Cisco', src: '/clients/cisco.svg', height: 28, maxWidth: 35 },
  { name: 'Adobe', src: '/clients/adobe.svg', height: 26, maxWidth: 95 },
]

export const OurClients: React.FC = () => {
  // Duplicated for a seamless 50% translation infinite loop
  const marqueeList = [...clientLogos, ...clientLogos]
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
            Our Clients
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Trusted by 50,000+ users around the globe
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
              className="mx-8 sm:mx-12 lg:mx-14 flex items-center justify-center shrink-0 group/logo"
              title={client.name}
            >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurClients
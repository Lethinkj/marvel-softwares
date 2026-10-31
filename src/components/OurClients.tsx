import React from 'react'
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

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="container">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
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
        className="w-full overflow-hidden relative py-6 sm:py-8"
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
                className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105 select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurClients
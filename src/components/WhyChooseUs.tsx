import React from 'react'
import AnimatedSection from './AnimatedSection'

export const WhyChooseUs: React.FC = () => (
  <div className="why-grid items-center">
    {/* 1. Illustration — 40% width */}
    <AnimatedSection direction="up" className="why-media w-full flex justify-center">
      <div className="w-full relative origin-center">
        <img
          src="/images/technologies/developer-ecosystem.avif"
          alt="The Technology Behind Every Solution — Futuristic Developer Tech Ecosystem"
          className="w-full h-auto rounded-2xl drop-shadow-2xl object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </AnimatedSection>

    {/* 2. Vertically centered content — 60% width */}
    <AnimatedSection direction="up" delay={0.12} className="flex flex-col justify-center self-center py-2 lg:py-4">
      <h3 className="text-card-title text-slate-900 leading-snug mb-4 sm:mb-5">
        The Technology Behind Every Solution
      </h3>
      <p className="text-body text-slate-600 leading-relaxed text-justify max-w-[65ch]">
        We leverage modern technologies, proven frameworks, and powerful development tools to transform ideas into reliable digital products. From interactive web applications and mobile platforms to complex enterprise systems, we carefully select technologies that align with project requirements, focusing on performance, security, flexibility, and scalability. By combining established engineering practices with continuous technological innovation, we build adaptable software solutions that evolve with your business, support changing demands, and deliver lasting value.
      </p>
    </AnimatedSection>
  </div>
)

export default WhyChooseUs

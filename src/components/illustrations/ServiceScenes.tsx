import React from 'react'

const SCENE_IMAGE_OVERRIDES: Record<string, { src: string; alt: string }> = {
  'website-development': {
    src: '/images/services/websites.avif',
    alt: 'Responsive website on laptop and phone with performance and growth graphics',
  },
  'web-application-development': {
    src: '/images/services/web-design.avif',
    alt: '3D web design workspace illustration — designer building a website',
  },
  'mobile-app-development': {
    src: '/images/services/task-management.avif',
    alt: 'Floating task management app UI on three phones',
  },
  'erp-business-software': {
    src: '/images/services/erp-system.avif',
    alt: 'One connected business system — ERP dashboard connected to operations modules',
  },
  'custom-software-development': {
    src: '/images/services/custom-software.avif',
    alt: 'Custom software development workspace illustration',
  },
  'ai-automation': {
    src: '/images/services/ai-automation.avif',
    alt: 'Futuristic AI automation workspace illustration',
  },
}

export const ServiceScene: React.FC<{ id?: string; serviceId: string; className?: string }> = ({
  serviceId,
  className = 'w-full h-auto',
}) => {
  const override = SCENE_IMAGE_OVERRIDES[serviceId]
  if (!override) return null

  return (
    <div className={className}>
      <img
        src={override.src}
        alt={override.alt}
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

export default ServiceScene

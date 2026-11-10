import type { BuildTierId } from './siteData'

export type HomePlanId = 'basic' | 'professional' | 'premium'

export interface HomePlan {
  id: HomePlanId
  name: string
  tagline: string
  badge?: string
  bestFor: string
  features: string[]
  /** Maps to the build tier used for add-on recommendations and the saved build request. */
  tierId: BuildTierId
}

export const homePlans: HomePlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Get your business online',
    bestFor: 'Startups & small businesses, 1–5 pages',
    tierId: 'basic',
    features: [
      'Up to 5 pages (Home, About, Services, Contact)',
      'Mobile-responsive design',
      'Contact form + WhatsApp button',
      'Basic on-page SEO & fast load',
      'Google Maps & social links',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Grow and scale online',
    badge: 'Most Popular',
    bestFor: 'Growing businesses, up to 10 pages',
    tierId: 'modern',
    features: [
      'Up to 10 pages + CMS',
      'Custom design and animations',
      'Advanced SEO + Google Analytics setup',
      'Speed & Core Web Vitals optimization',
      '30-day post-launch support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'A category-defining flagship',
    bestFor: 'Established brands & high-traffic sites',
    tierId: 'ultra',
    features: [
      'Custom design from scratch + brand system',
      'Unlimited pages + custom features',
      'Multiple roles + admin panel',
      'E-commerce, booking or member portals',
      'Deep integrations (CRM, payments, ERP)',
      'Headless CMS, API-ready architecture',
      'Dedicated project manager',
      'Priority post-launch SLA',
    ],
  },
]

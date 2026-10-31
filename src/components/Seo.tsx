import { useEffect } from 'react'
import { homeFaqs, siteConfig } from '../data/siteData'

interface SeoProps {
  title: string
  description: string
  path: string
}

/**
 * Per-route SEO metadata: title, description, canonical,
 * Open Graph tags and Organization/WebSite structured data
 * (verified business info only — no ratings or addresses).
 */
export function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = title

    const setMeta = (selector: string, attr: string, value: string, key: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null
      if (!el) {
        if (key === 'link') {
          el = document.createElement('link')
        } else {
          el = document.createElement('meta')
        }
        document.head.appendChild(el)
      }
      if (el instanceof HTMLLinkElement) {
        el.rel = attr
        el.href = value
      } else if (el instanceof HTMLMetaElement) {
        if (key === 'property') el.setAttribute('property', attr)
        else el.name = attr
        el.content = value
      }
    }

    const canonical = `${siteConfig.siteUrl}${path}`
    setMeta('meta[name="description"]', 'description', description, 'name')
    setMeta('link[rel="canonical"]', 'canonical', canonical, 'link')
    setMeta('meta[property="og:title"]', 'og:title', title, 'property')
    setMeta('meta[property="og:description"]', 'og:description', description, 'property')
    setMeta('meta[property="og:url"]', 'og:url', canonical, 'property')
    setMeta('meta[property="og:type"]', 'og:type', 'website', 'property')
    setMeta('meta[property="og:site_name"]', 'og:site_name', siteConfig.name, 'property')
    setMeta('meta[property="og:image"]', 'og:image', `${siteConfig.siteUrl}/marvel-softwares-logo-horizontal.png`, 'property')
    setMeta('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image', 'name')
    setMeta('meta[name="twitter:title"]', 'twitter:title', title, 'name')
    setMeta('meta[name="twitter:description"]', 'twitter:description', description, 'name')
    setMeta('meta[name="twitter:image"]', 'twitter:image', `${siteConfig.siteUrl}/marvel-softwares-logo-horizontal.png`, 'name')

    const scriptId = 'ms-structured-data'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: 'MARVEL SOFTWARES',
            url: siteConfig.siteUrl,
            logo: `${siteConfig.siteUrl}/marvel-softwares-logo-horizontal.png`,
            email: siteConfig.email,
            telephone: siteConfig.phone,
            contactPoint: [siteConfig.phone, siteConfig.phone2].map((telephone) => ({
              '@type': 'ContactPoint',
              telephone,
              email: siteConfig.email,
              contactType: 'customer service',
              availableLanguage: 'en',
            })),
            description:
              'Custom software development company building websites, applications, ERP systems and integrated business software.',
          },
          {
            '@type': 'WebSite',
            name: 'MARVEL SOFTWARES',
            url: siteConfig.siteUrl,
            potentialAction: {
              '@type': 'ContactAction',
              target: `${siteConfig.siteUrl}/#contact`,
              name: 'Contact Marvel Softwares',
            },
          },
          {
            '@type': 'ProfessionalService',
            name: 'Marvel Softwares',
            url: siteConfig.siteUrl,
            image: `${siteConfig.siteUrl}/marvel-softwares-logo-horizontal.png`,
            description:
              'Software development company providing website development, web applications, mobile apps, ERP systems, UI/UX design, AI automation and custom software development.',
            areaServed: [
              { '@type': 'Country', name: 'India' },
              { '@type': 'State', name: 'Tamil Nadu' },
              { '@type': 'City', name: 'Nagercoil' },
              { '@type': 'AdministrativeArea', name: 'Kanyakumari' },
            ],
            serviceType: [
              'Custom software development',
              'Website development',
              'Web application development',
              'Mobile app development',
              'ERP software development',
              'UI/UX design',
              'AI automation',
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: homeFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ],
      })
      document.head.appendChild(script)
    }
  }, [title, description, path])

  return null
}

export default Seo

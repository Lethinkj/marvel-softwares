import { useEffect } from 'react'
import { siteConfig, type Faq } from '../data/siteData'

interface SeoProps {
  title: string
  description: string
  path: string
  keywords?: string
  faqs?: Faq[]
  robots?: string
}

/**
 * Per-route SEO metadata: title, description, keywords, canonical,
 * Open Graph tags, Twitter Card, and Google-compliant schema graph.
 */
export function Seo({
  title,
  description,
  path,
  keywords,
  faqs,
  robots,
}: SeoProps) {
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

    const canonical = `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`

    // Base robots directive
    setMeta(
      'meta[name="robots"]',
      'robots',
      robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'name'
    )
    setMeta('meta[name="description"]', 'description', description, 'name')
    if (keywords) {
      setMeta('meta[name="keywords"]', 'keywords', keywords, 'name')
    }
    setMeta('link[rel="canonical"]', 'canonical', canonical, 'link')

    // OpenGraph & Social
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

    // Structured Data JSON-LD graph
    const scriptId = 'ms-structured-data'
    let script = document.getElementById(scriptId) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    const schemaGraph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.siteUrl}/#organization`,
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
          availableLanguage: ['en', 'ta'],
        })),
        description:
          'Software development company in India offering custom software development, website development, web applications, mobile apps, ERP systems, and AI automation.',
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Australia' },
          { '@type': 'Country', name: 'United Arab Emirates' },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.siteUrl}/#website`,
        name: 'MARVEL SOFTWARES',
        url: siteConfig.siteUrl,
        publisher: {
          '@id': `${siteConfig.siteUrl}/#organization`,
        },
        potentialAction: {
          '@type': 'ContactAction',
          target: `${siteConfig.siteUrl}/#contact`,
          name: 'Contact Marvel Softwares',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description: description,
        isPartOf: {
          '@id': `${siteConfig.siteUrl}/#website`,
        },
        about: {
          '@id': `${siteConfig.siteUrl}/#organization`,
        },
      },
      {
        '@type': 'ProfessionalService',
        name: 'Marvel Softwares',
        url: siteConfig.siteUrl,
        image: `${siteConfig.siteUrl}/marvel-softwares-logo-horizontal.png`,
        description:
          'Software development company providing website development, web applications, mobile apps, ERP and business management software, custom software, AI and automation, e-commerce stores, LMS platforms, and digital marketing and SEO across India and international markets.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
          addressRegion: 'Tamil Nadu',
        },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'State', name: 'Tamil Nadu' },
          { '@type': 'State', name: 'Kerala' },
          { '@type': 'State', name: 'Karnataka' },
          { '@type': 'State', name: 'Maharashtra' },
          { '@type': 'State', name: 'Telangana' },
          { '@type': 'City', name: 'Chennai' },
          { '@type': 'City', name: 'Coimbatore' },
          { '@type': 'City', name: 'Madurai' },
          { '@type': 'City', name: 'Nagercoil' },
          { '@type': 'AdministrativeArea', name: 'Kanyakumari' },
          { '@type': 'City', name: 'Kochi' },
          { '@type': 'City', name: 'Bengaluru' },
          { '@type': 'City', name: 'Hyderabad' },
          { '@type': 'City', name: 'Mumbai' },
          { '@type': 'City', name: 'Delhi' },
        ],
        serviceType: [
          'Website Development',
          'Web Application Development',
          'Mobile App Development',
          'ERP & Business Management Software',
          'Custom Software Development',
          'AI & Automation',
          'E-commerce',
          'LMS',
          'Digital Marketing & SEO',
        ],
      },
    ]

    // Include FAQPage schema when FAQs are present (e.g. /faq page)
    if (faqs && faqs.length > 0) {
      schemaGraph.push({
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      })
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaGraph,
    })
  }, [title, description, path, keywords, faqs, robots])

  return null
}

export default Seo

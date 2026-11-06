import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const indexHtmlPath = path.join(distDir, 'index.html')

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html not found. Run "vite build" first.')
  process.exit(1)
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8')

const routes = [
  {
    path: '/',
    title: 'Marvel Softwares | Software Development Company in India',
    description:
      'MARVEL SOFTWARES is an India-based software development company delivering custom web applications, mobile apps, ERP systems, and AI automation for businesses across India and global markets.',
    keywords:
      'software development company in India, software company in India, software development services, IT solutions company, custom software development, web application development, mobile app development, ERP software development, AI automation solutions, software company in Tamil Nadu, software company in Bangalore, software development partner',
    h1: 'Software That Grows Your Business',
    lead: 'MARVEL SOFTWARES is a technology and software engineering company focused on designing, developing, and delivering innovative digital solutions that help businesses operate smarter and grow faster. We build modern websites, high-performance web and mobile applications, integrated ERP and CRM systems, AI-powered solutions, and customized software platforms across India and global markets.',
    isFaq: false,
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions (FAQ) | Marvel Softwares',
    description:
      'Find answers to frequently asked questions about Marvel Softwares — our custom software development, websites, ERP systems, mobile applications, AI solutions, project process, and technical support.',
    keywords:
      'Marvel Softwares FAQ, software development questions, custom software FAQ, ERP development cost, mobile app development India, software development process, software company in India FAQ',
    h1: 'Frequently Asked Questions',
    lead: 'Quick answers to common questions about Marvel Softwares, our engineering processes, technologies, pricing models, and project lifecycle across India and international markets.',
    isFaq: true,
  },
  {
    path: '/build',
    title: 'Build Your Website or Software | Marvel Softwares',
    description:
      'Configure your website or custom software build — pick Basic, Modern or Ultra, add accessories like hosting, SEO and maintenance, and get a tailored written quote from the Marvel Softwares engineering team. No prices shown, no obligation.',
    keywords:
      'build your website, software configurator, website package builder, custom software quote, website development free quote, basic modern ultra website, website add-ons, software build your own, Marvel Softwares build',
    h1: 'Build Your Website or Software',
    lead: 'Assemble exactly what you need — pick a build type, choose a Basic, Modern or Ultra tier, add accessories — then send it straight to the Marvel Softwares engineering team for a tailored written quote.',
    isFaq: false,
  },
]

console.log('🚀 Starting static SEO prerender for existing routes...')

for (const r of routes) {
  const canonicalUrl = `https://marvelsoftwares.in${r.path === '/' ? '/' : r.path}`
  let pageHtml = baseHtml

  // 1. Update <title>
  pageHtml = pageHtml.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${r.title}</title>`
  )

  // 2. Update meta description
  pageHtml = pageHtml.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="description" content="${r.description}" />`
  )

  // 3. Update or inject meta keywords
  if (pageHtml.includes('name="keywords"')) {
    pageHtml = pageHtml.replace(
      /<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="keywords" content="${r.keywords}" />`
    )
  } else {
    pageHtml = pageHtml.replace(
      /<\/head>/i,
      `  <meta name="keywords" content="${r.keywords}" />\n  </head>`
    )
  }

  // 4. Update canonical link
  pageHtml = pageHtml.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  )

  // 5. Update OpenGraph tags
  pageHtml = pageHtml.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:title" content="${r.title}" />`
  )
  pageHtml = pageHtml.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:description" content="${r.description}" />`
  )
  pageHtml = pageHtml.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  )

  // 6. Update Twitter tags
  pageHtml = pageHtml.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${r.title}" />`
  )
  pageHtml = pageHtml.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${r.description}" />`
  )

  // 7. Inject Structured Data JSON-LD graph
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://marvelsoftwares.in/#organization',
        name: 'MARVEL SOFTWARES',
        url: 'https://marvelsoftwares.in',
        logo: 'https://marvelsoftwares.in/marvel-softwares-logo-horizontal.png',
        email: 'sales@marvelsoftwares.in',
        telephone: '+91 8088218609',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91 8088218609',
            email: 'sales@marvelsoftwares.in',
            contactType: 'customer service',
            availableLanguage: ['en', 'ta'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91 8903711003',
            email: 'sales@marvelsoftwares.in',
            contactType: 'technical support',
            availableLanguage: ['en', 'ta'],
          },
        ],
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
        '@id': 'https://marvelsoftwares.in/#website',
        name: 'MARVEL SOFTWARES',
        url: 'https://marvelsoftwares.in',
        publisher: {
          '@id': 'https://marvelsoftwares.in/#organization',
        },
        potentialAction: {
          '@type': 'ContactAction',
          target: 'https://marvelsoftwares.in/#contact',
          name: 'Contact Marvel Softwares',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: r.title,
        description: r.description,
        isPartOf: {
          '@id': 'https://marvelsoftwares.in/#website',
        },
        about: {
          '@id': 'https://marvelsoftwares.in/#organization',
        },
      },
      {
        '@type': 'ProfessionalService',
        name: 'Marvel Softwares',
        url: 'https://marvelsoftwares.in',
        image: 'https://marvelsoftwares.in/marvel-softwares-logo-horizontal.png',
        description:
          'Software development company providing website development, web applications, mobile apps, ERP systems, AI automation and custom software development across India and international markets.',
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
        ],
      },
    ],
  }

  const jsonLdScript = `\n    <script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n    </script>\n  </head>`
  pageHtml = pageHtml.replace(/<\/head>/i, jsonLdScript)

  // 8. Inject Noscript semantic fallback inside root
  const semanticBotFallback = `
    <noscript>
      <div style="padding: 40px; max-width: 800px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="color: #0f172a; font-size: 28px;">${r.h1}</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">${r.lead}</p>
        <p style="color: #64748b; font-size: 14px;">MARVEL SOFTWARES is an India-based technology and software engineering company. Core services include Website Development, Web Applications, Mobile App Development, ERP & Business Management Software, Custom Software Development, and AI Solutions for businesses in India and global markets.</p>
      </div>
    </noscript>
  `

  pageHtml = pageHtml.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${semanticBotFallback}</div>`
  )

  let targetFilePath = ''
  if (r.path === '/') {
    targetFilePath = indexHtmlPath
  } else {
    const routeSubDir = path.join(distDir, r.path.replace(/^\//, ''))
    fs.mkdirSync(routeSubDir, { recursive: true })
    targetFilePath = path.join(routeSubDir, 'index.html')
  }

  fs.writeFileSync(targetFilePath, pageHtml, 'utf8')
  console.log(` ✅ Prerendered: ${r.path} -> ${targetFilePath.replace(distDir, 'dist')}`)
}

console.log('✨ Prerender complete: Official routes generated for production SEO.')

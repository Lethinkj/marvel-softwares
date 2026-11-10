// ============================================
// MARVEL SOFTWARES — Central site content
// Single source of truth for page copy, services,
// projects, process and contact configuration.
// NOTE: project entries are REPRESENTATIVE EXAMPLES
// of the kinds of solutions we build, not claims of
// delivered client work. Do not add metrics, client
// names, awards or statistics without verification.
// ============================================

export interface Service {
  id: string
  icon: string
  title: string
  headline: string
  description: string
  paragraphs?: string[]
  capabilities: string[]
  cta: string
  /** query value preselected in the contact form */
  solutionValue: string
}

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  description: string
  /** short one-line teaser shown above the full description */
  summary?: string
  tags: string[]
  color: string
  image: string
  url: string
}

export interface Faq {
  question: string
  answer: string
}

export interface HomeServiceCard {
  id: string
  icon: string
  title: string
  line: string
  to: string
}

export type ProjectCategory =
  | 'Websites'
  | 'Web Applications'
  | 'Mobile Apps'
  | 'Enterprise Software'
  | 'AI & Automation'

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface Principle {
  title: string
  description: string
  icon: string
}

export interface NavLink {
  label: string
  href: string
}

// --- Site configuration (edit verified details here) ---
export const siteConfig = {
  name: 'MARVEL SOFTWARES',
  // Update these with verified business details only.
  email: 'sales@marvelsoftwares.in',
  phone: '+91 8088218609',
  phoneHref: 'tel:+918088218609',
  phone2: '+91 8903711003',
  phone2Href: 'tel:+918903711003',
  whatsapp: '+91 8088218609',
  whatsappHref:
    'https://wa.me/918088218609?text=Hello%20Marvel%20Softwares!%20I%20would%20like%20to%20inquire%20about%20your%20software%20and%20web%20development%20services.',
  location: 'Working with clients remotely and on-site as agreed',
  hours: 'Monday – Friday, 9:00 AM – 6:00 PM',
  // Canonical domain for SEO metadata — the live site.
  siteUrl: 'https://marvelsoftwares.in',
  // Google Analytics 4 Measurement ID (can also be set via VITE_GA_MEASUREMENT_ID env variable)
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
}

// --- Navigation (Single-page sections) ---
export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

// --- All services (Services page + footer) ---
export const services: Service[] = [
  {
    id: 'website-development',
    icon: 'web',
    title: 'Website Development',
    headline: 'Websites That Make Your Business Stand Out',
    description:
      'Professional, responsive websites designed to communicate your brand, engage visitors and support your business goals.',
    paragraphs: [
      'We build fast, responsive websites that clearly present your brand and work smoothly across every device. Each site is designed for accessibility, search visibility, and easy future updates. From landing pages to full business websites, we create polished experiences that help visitors understand your services and take action.',
    ],
    capabilities: [
      'Business and corporate websites',
      'Landing pages',
      'Website redesign and modernization',
      'Content management systems',
      'SEO-friendly technical implementation',
      'Performance and accessibility optimization',
    ],
    cta: 'Discuss Your Website',
    solutionValue: 'Website',
  },
  {
    id: 'web-application-development',
    icon: 'dashboard',
    title: 'Web Application Development',
    headline: 'Powerful Web Applications Built Around Your Workflow',
    description:
      'Powerful browser-based applications tailored to your workflows, customers and operational needs.',
    paragraphs: [
      'We develop secure web applications that simplify workflows and support your customers, teams, and daily operations. Our solutions are built to scale as your business grows. Dashboards, portals, and custom tools give your team faster access to the information and actions they need every day.',
    ],
    capabilities: [
      'SaaS products',
      'Customer and employee portals',
      'Admin dashboards',
      'Workflow applications',
      'Real-time interfaces',
      'Third-party API integration',
    ],
    cta: 'Build a Web Application',
    solutionValue: 'Web Application',
  },
  {
    id: 'mobile-app-development',
    icon: 'mobile',
    title: 'Mobile App Development',
    headline: 'Mobile Experiences Wherever Your Users Are',
    description:
      'Mobile experiences that help customers and teams access your services wherever they are.',
    paragraphs: [
      'We create intuitive mobile apps for iOS and Android that keep customers and teams connected wherever they work. Apps are designed for reliable performance, secure access, and simple everyday use. We support the complete journey from interface design and development to backend integration and ongoing improvements.',
    ],
    capabilities: [
      'Android applications',
      'iOS applications',
      'Cross-platform applications',
      'Authentication and notifications',
      'Backend and API integration',
      'App maintenance and improvements',
    ],
    cta: 'Build a Mobile App',
    solutionValue: 'Mobile Application',
  },
  {
    id: 'erp-business-software',
    icon: 'erp',
    title: 'ERP & Business Management Software',
    headline: 'One Connected System for Your Business Operations',
    description:
      'Connected business systems that help manage operations, records, people, inventory and reporting in one place.',
    paragraphs: [
      'We connect inventory, billing, customers, staff, and reporting in one business platform. Each ERP solution is shaped around your processes to reduce manual work and improve visibility. Centralized data and clear reports help teams coordinate operations and make informed decisions with confidence.',
    ],
    capabilities: [
      'Inventory and stock management',
      'Billing and invoicing',
      'Customer and supplier management',
      'Employee and role management',
      'Sales and purchasing workflows',
      'Reports and analytics',
      'Business-specific modules',
    ],
    cta: 'Discuss an ERP Solution',
    solutionValue: 'ERP or Business Software',
  },
  {
    id: 'custom-software-development',
    icon: 'custom',
    title: 'Custom Software Development',
    headline: 'Software Designed for the Way You Work',
    description:
      'Purpose-built software designed around your unique processes, requirements and long-term goals.',
    paragraphs: [
      'We build custom software around your specific workflows, requirements, and goals. Purpose-built tools help simplify complex work, connect existing systems, and improve productivity. We work closely with your team to turn real business needs into practical, maintainable software that can evolve over time.',
    ],
    capabilities: [
      'Internal business tools',
      'Automation systems',
      'Custom workflow engines',
      'System modernization',
      'Legacy system integration',
      'Cross-platform tools',
    ],
    cta: 'Discuss Custom Software',
    solutionValue: 'Custom Software',
  },
  {
    id: 'ui-ux-design',
    icon: 'design',
    title: 'UI/UX Design',
    headline: 'Clear, Intuitive Experiences People Enjoy Using',
    description:
      'Clear, intuitive user experiences that make digital products easier to understand and use.',
    paragraphs: [
      'We design clear, accessible interfaces that make digital products easier to understand and use. User flows, wireframes, prototypes, and design systems keep every experience consistent. Our approach balances visual quality with practical navigation, helping users complete tasks with less friction on every screen.',
    ],
    capabilities: [
      'User flows',
      'Wireframes',
      'Interactive prototypes',
      'Design systems',
      'Responsive interface design',
      'Accessibility improvements',
    ],
    cta: 'Improve Your Product',
    solutionValue: 'Other',
  },
  {
    id: 'api-integration',
    icon: 'api',
    title: 'API & System Integration',
    headline: 'Connect Your Applications into One Ecosystem',
    description:
      'Connect your applications, databases and third-party services into a reliable software ecosystem.',
    paragraphs: [
      'We connect disparate applications, databases, and third-party cloud services into a unified, secure software ecosystem through robust API integrations. Built with fault tolerance, rate limiting, and real-time data synchronization protocols, our integration architectures eliminate manual data re-entry and keep your operational data reliable, secure, and consistently up to date across all platforms.',
    ],
    capabilities: [
      'REST API integration',
      'Webhooks',
      'Authentication integrations',
      'Payment gateway integration',
      'External service integrations',
      'Data synchronization',
    ],
    cta: 'Connect My Systems',
    solutionValue: 'API or Integration',
  },
  {
    id: 'cloud-devops',
    icon: 'cloud',
    title: 'Cloud & DevOps',
    headline: 'Reliable Foundations for Modern Applications',
    description:
      'Deployment workflows and cloud infrastructure designed for maintainability, scalability and reliable delivery.',
    paragraphs: [
      'We architect, configure, and automate resilient cloud infrastructure tailored for high uptime, cost efficiency, and frictionless software delivery. Through containerization, automated CI/CD deployment pipelines, continuous monitoring, and proactive security hardening, we ensure your applications scale gracefully under heavy traffic and support rapid, dependable release cycles without downtime.',
    ],
    capabilities: [
      'Cloud deployment',
      'CI/CD automation',
      'Containerization',
      'Infrastructure configuration',
      'Monitoring and logging',
      'Deployment optimization',
    ],
    cta: 'Discuss Cloud Infrastructure',
    solutionValue: 'Cloud or DevOps',
  },
  {
    id: 'ai-automation',
    icon: 'ai',
    title: 'AI & Automation',
    headline: 'Practical AI That Reduces Repetitive Work',
    description:
      'Practical AI and automation capabilities that help reduce repetitive work and make information more useful.',
    paragraphs: [
      'We develop practical AI and automation solutions that reduce repetitive work, improve efficiency, and support better decisions. From document processing and AI assistants to workflow automation and data analysis, we help teams work faster with fewer errors. Our solutions connect with existing software and turn everyday business data into useful insights. This helps organizations save time, improve consistency, and focus on higher-value work.',
    ],
    capabilities: [
      'AI-enabled applications',
      'Document processing',
      'Conversational interfaces',
      'Workflow automation',
      'Data analysis',
      'Model and API integration',
    ],
    cta: 'Explore AI Solutions',
    solutionValue: 'AI or Automation',
  },
  {
    id: 'maintenance-consulting',
    icon: 'consulting',
    title: 'Maintenance & Technical Consulting',
    headline: 'Guidance and Care as Your Business Evolves',
    description:
      'Technical guidance, ongoing improvements and software maintenance to help your systems remain useful as your business evolves.',
    paragraphs: [
      'We provide dedicated software maintenance, performance optimization, and strategic technical consulting to ensure your digital systems remain fast, secure, and dependable as your business evolves. Our engineering team actively monitors dependencies, resolves technical debt, applies security patches, and plans infrastructure enhancements, acting as a trusted long-term technology partner.',
    ],
    capabilities: [
      'Codebase reviews',
      'Performance improvements',
      'Bug fixes',
      'Security and dependency updates',
      'Architecture planning',
      'Ongoing maintenance',
    ],
    cta: 'Talk to Our Team',
    solutionValue: 'Other',
  },
]

// --- Six-card overview used on the home page ---
export const homeServices: string[] = [
  'website-development',
  'web-application-development',
  'mobile-app-development',
  'erp-business-software',
  'custom-software-development',
  'ai-automation',
]

// --- Four service areas summarised on the home page ---
export const homeServiceCards: HomeServiceCard[] = [
  {
    id: 'web-mobile',
    icon: 'web',
    title: 'Websites & Web Apps',
    line: 'Responsive websites and browser-based applications built around how your business works.',
    to: '/#website-development',
  },
  {
    id: 'mobile',
    icon: 'mobile',
    title: 'Mobile Apps',
    line: 'Android and iOS applications your customers and teams can use wherever they are.',
    to: '/#mobile-app-development',
  },
  {
    id: 'erp',
    icon: 'erp',
    title: 'ERP & Business Systems',
    line: 'Operations, records, billing and reporting connected in one reliable platform.',
    to: '/#erp-business-software',
  },
  {
    id: 'ai-design',
    icon: 'ai',
    title: 'UI/UX & AI Automation',
    line: 'Clear interfaces plus automation that removes the repetitive work from your day.',
    to: '/#ai-automation',
  },
]

// --- Frequently asked questions (home) ---
export const homeFaqs: Faq[] = [
  {
    question: 'What kind of software do you build?',
    answer:
      'We build websites, web applications, mobile apps, ERP and business management systems, custom software, API integrations, cloud and DevOps setups, and AI and automation workflows. Most engagements start with one of these and grow from there.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'It depends on the scope. We agree the requirements, the delivery phases and the timeline during discovery, so you get a realistic schedule before the build starts rather than a date that slips later.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Cost depends on the features, integrations and timeline involved. After a short discovery conversation we prepare a scoped proposal that sets out the phases, the deliverables and the investment for each stage.',
  },
  {
    question: 'Can you work with systems we already have?',
    answer:
      'Yes. We review and integrate with existing applications, databases and third-party services through APIs. We also take over, review or improve software that was built by another team.',
  },
  {
    question: 'Do you handle design and UI/UX?',
    answer:
      'Yes. We design user flows, wireframes and interfaces, and set up design systems so a product stays consistent as it grows across web, mobile and internal tools.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We keep the product healthy through maintenance, monitoring, security and dependency updates, and continued improvements. Support can run as an ongoing arrangement or be scoped as planned work.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Send us a message describing what you are trying to achieve. We arrange a short conversation to understand the challenge, then come back with a recommended approach and a proposal.',
  },
]

// --- FAQ page ---
export const faqPageFaqs: Faq[] = [
  {
    question: 'What core software development services does Marvel Softwares provide?',
    answer:
      'We provide end-to-end technology solutions across six core domains: (1) Custom Website Development, (2) Web Application Development & SaaS Platforms, (3) iOS, Android & Cross-Platform Mobile App Development, (4) Tailored ERP & Business Management Software, (5) Custom Business Software & Legacy System Modernization, and (6) AI Solutions & Intelligent Workflow Automation.',
  },
  {
    question: 'Do you develop software for clients across different states and cities in India?',
    answer:
      'Yes. MARVEL SOFTWARES is an India-based technology company serving businesses across all 28 Indian States and 8 Union Territories. We regularly collaborate with enterprises, startups, and growing organizations in key commercial and tech hubs including Tamil Nadu (Chennai, Coimbatore, Madurai, Tirunelveli, Nagercoil, Kanyakumari), Kerala (Kochi, Thiruvananthapuram, Kozhikode), Karnataka (Bengaluru, Mysuru), Telangana (Hyderabad), Andhra Pradesh (Visakhapatnam, Vijayawada), Maharashtra (Mumbai, Pune), and Delhi NCR through structured agile sprints, video consultations, and scheduled on-site milestone reviews.',
  },
  {
    question: 'Do you work with international clients outside of India?',
    answer:
      'Yes. We partner with international clients across the United States, United Kingdom, Canada, Australia, the United Arab Emirates, and other global markets. We ensure strategic timezone overlap, conduct clear English sprint communication, and deliver high-velocity full-stack engineering under international NDAs and complete intellectual property ownership.',
  },
  {
    question: 'Why choose custom software or a custom ERP over commercial off-the-shelf software?',
    answer:
      'Off-the-shelf software often imposes costly recurring per-user monthly subscription fees, rigid processes that force you to alter how your team works, and unnecessary feature bloat. A custom solution engineered by Marvel Softwares gives you 100% code ownership, zero seat-based subscription penalties, and an interface built specifically around your exact business workflows and reporting requirements.',
  },
  {
    question: 'Who owns the source code and intellectual property of the software you build?',
    answer:
      'You retain 100% intellectual property (IP) and full source code ownership upon milestone completion. We provide complete code repository access, technical documentation, and deployment configurations with zero vendor lock-in.',
  },
  {
    question: 'How do you handle project requirements, timelines, and pricing?',
    answer:
      'We begin with an initial consultation and requirement discovery to understand your operational goals and technical scope. We then deliver a clear, transparent milestone-based proposal outlining architectural choices, development phases, sprint deliverables, and fixed-price estimates with no hidden charges.',
  },
  {
    question: 'Can you integrate modern AI and automated workflows into our existing software?',
    answer:
      'Yes. We build intelligent document processing, predictive machine learning models, conversational AI assistants, and automated data extraction pipelines that integrate seamlessly into your current ERP, database, CRM, or web platform via secure REST/GraphQL APIs.',
  },
  {
    question: 'Can you modernize or upgrade our existing legacy software applications?',
    answer:
      'Yes. We specialize in legacy application modernization, migrating aging desktop applications and monolithic codebases into scalable, cloud-native web and mobile platforms using phased migration strategies that ensure continuous business continuity without operational downtime.',
  },
  {
    question: 'Do you provide ongoing technical support, maintenance, and system upgrades?',
    answer:
      'Yes. Following deployment, we offer dependable maintenance arrangements covering continuous server monitoring, security patching, dependency upgrades, bug fixes, and feature enhancements to ensure your software continues to perform reliably as your business scales.',
  },
  {
    question: 'Do you offer practical technical learning or internship opportunities?',
    answer:
      'Yes. We offer practical internship opportunities in software engineering, modern web technologies, and mobile app development for eligible students and aspiring developers, subject to intake availability.',
  },
]

// --- Why choose us (home) ---
export const whyChooseUs: Principle[] = [
  {
    title: 'Built Around Your Needs',
    description:
      'We begin by understanding your business, users and objectives, then recommend a solution shaped by your requirements — not a one-size-fits-all template.',
    icon: 'target',
  },
  {
    title: 'Scalable Architecture',
    description:
      'We design systems with clear structure and room to grow, so new features, users and integrations can be added without rebuilding from scratch.',
    icon: 'layers',
  },
  {
    title: 'Seamless Integrations',
    description:
      'We bring your applications, data and third-party services together through thoughtful APIs, so information flows reliably across your business.',
    icon: 'connect',
  },
  {
    title: 'Reliable Long-Term Support',
    description:
      'We can help maintain, improve and extend your software after launch, keeping it useful as your needs, team and technology evolve.',
    icon: 'shield',
  },
]

// --- Home development process (4 steps) ---
export const homeProcess: ProcessStep[] = [
  {
    step: 1,
    title: 'Discover',
    description: 'Understand the business, requirements and challenges.',
    icon: 'discovery',
  },
  {
    step: 2,
    title: 'Design',
    description: 'Map workflows, user experiences and system architecture.',
    icon: 'design',
  },
  {
    step: 3,
    title: 'Develop',
    description: 'Build, test and integrate the solution.',
    icon: 'development',
  },
  {
    step: 4,
    title: 'Deploy & Support',
    description: 'Release, monitor, improve and maintain the product.',
    icon: 'launch',
  },
]

// --- About: working principles ---
export const workingPrinciples: Principle[] = [
  {
    title: 'Understand Before Building',
    description:
      'We focus on business requirements, user needs and the underlying problem before choosing an implementation.',
    icon: 'discovery',
  },
  {
    title: 'Design for People',
    description:
      'We aim to make software understandable, accessible and useful for the people who depend on it every day.',
    icon: 'design',
  },
  {
    title: 'Engineer for Maintainability',
    description:
      'We prioritize maintainable architecture, appropriate technology choices and implementation quality.',
    icon: 'layers',
  },
  {
    title: 'Protect Data and Access',
    description:
      'We consider security, data handling, access control and reliability throughout the development process.',
    icon: 'shield',
  },
  {
    title: 'Improve Through Feedback',
    description:
      'We value feedback and iteration, refining the product as we learn more about real usage.',
    icon: 'feedback',
  },
  {
    title: 'Build for Future Growth',
    description:
      'We design with future changes in mind, so your software can adapt as your business grows.',
    icon: 'growth',
  },
]

// --- About: team functions (role-based, no invented names).
// To feature real people later, replace this array with verified
// member profiles (name, role, photo) and update the About section.
export const teamRoles: Principle[] = [
  {
    title: 'Software Engineers',
    description:
      'Developers who design, build and test your websites, applications and business systems.',
    icon: 'code',
  },
  {
    title: 'UI/UX Designers',
    description:
      'Designers who shape clear user journeys and interfaces people find easy to use.',
    icon: 'design',
  },
  {
    title: 'Project Delivery',
    description:
      'Coordinators who keep requirements, timelines and communication organised.',
    icon: 'planning',
  },
  {
    title: 'Support & Maintenance',
    description:
      'Engineers who keep your software reliable, updated and improving after launch.',
    icon: 'shield',
  },
]

// --- Team Members (Executive & Engineering Leadership) ---
export interface TeamMember {
  name: string
  role: string
  bio: string
  expertise: string[]
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Sundareswaranathan',
    role: 'Co-Founder, Marvelsoftwares',
    bio: 'Leads the design vision at Marvelsoftwares, creating clear and engaging digital experiences. Focuses on thoughtful user experiences and strong visual direction.',
    expertise: ['System Architecture', 'Cloud Strategy', 'Product Delivery'],
  },
  {
    name: 'Sindhukumar',
    role: 'Co-Founder, Marvelsoftwares',
    bio: 'Leads technology and software development at Marvelsoftwares, building reliable solutions for our clients. Focuses on secure, scalable systems that perform smoothly.',
    expertise: ['Distributed Systems', 'Cloud & DevOps', 'Database Scaling'],
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Product Design',
    bio: 'Shapes intuitive design systems and polished user journeys that turn complex software workflows into accessible digital experiences.',
    expertise: ['UI/UX Systems', 'Design Thinking', 'Interaction Design'],
  },
  {
    name: 'Elena Rodriguez',
    role: 'Lead Software Engineer',
    bio: 'Specializes in high-velocity web applications, modern frontend architectures, and resilient REST/GraphQL APIs across enterprise ecosystems.',
    expertise: ['React & Next.js', 'API Integration', 'Full-Stack Web'],
  },
]

// --- Upcoming Projects ---
export interface UpcomingProject {
  id: string
  title: string
  category: string
  description: string
  status: string
  progress: number
  targetRelease: string
  tags: string[]
  accentColor: string
  image: string
}

export const upcomingProjects: UpcomingProject[] = [
  {
    id: 'cloud-erp-platform',
    title: 'Enterprise Cloud ERP — Business Management Suite',
    category: 'Enterprise Software',
    description:
      'A comprehensive cloud ERP platform engineered for streamlined operational workflows, automated billing, real-time inventory management, and centralized business intelligence.',
    status: 'In Active Development',
    progress: 82,
    targetRelease: 'Q2 2027',
    tags: ['Cloud ERP', 'Enterprise Software', 'Inventory Management', 'Real-Time Analytics'],
    accentColor: '#FF5A00',
    image: '/images/projects/shree-gold-erp.avif',
  },
]

// --- Verified Clients & Partners ---
export interface ClientPartner {
  id: string
  name: string
  industry: string
  description: string
  tag: string
  initials: string
  accentColor: string
}

export const clientsList: ClientPartner[] = [
  {
    id: 'marvelslice-edtech',
    name: 'Marvel Slice',
    industry: 'EdTech & Professional Training',
    description: 'Flagship learning institute portal powering software training batches, student enrollments, and placement pipelines.',
    tag: 'Web Platform & Portal',
    initials: 'MS',
    accentColor: '#0057E7',
  },
  {
    id: 'marvelslice-lms',
    name: 'MarvelSlice LMS',
    industry: 'Digital Learning Management',
    description: 'Enterprise LMS with interactive classroom delivery, student gradebooks, and seamless Microsoft Teams integration.',
    tag: 'Enterprise LMS',
    initials: 'ML',
    accentColor: '#FF5A00',
  },
  {
    id: 'apex-logistics',
    name: 'Apex Logistics & Transport',
    industry: 'Supply Chain & Freight',
    description: 'Automated dispatching engine, consignee tracking dashboards, and cloud-connected driver operations.',
    tag: 'Fleet Telematics',
    initials: 'AL',
    accentColor: '#0891B2',
  },
  {
    id: 'vanguard-healthcare',
    name: 'Vanguard Health Systems',
    industry: 'Healthcare & Clinical EHR',
    description: 'Secure patient record portals, automated appointment scheduling, and HIPAA-compliant clinical workflows.',
    tag: 'Clinical Platform',
    initials: 'VH',
    accentColor: '#059669',
  },
  {
    id: 'horizon-omnichannel',
    name: 'Horizon Retail Group',
    industry: 'Omnichannel E-Commerce',
    description: 'High-volume web storefront connected with multi-store POS inventory synchronization and unified checkout.',
    tag: 'E-Commerce & POS',
    initials: 'HR',
    accentColor: '#7C3AED',
  },
  {
    id: 'zenith-financial',
    name: 'Zenith Capital & Financial',
    industry: 'Fintech & Compliance',
    description: 'High-throughput transactional ledger systems with automated regulatory compliance reporting and fraud checks.',
    tag: 'Fintech Architecture',
    initials: 'ZC',
    accentColor: '#D97706',
  },
]

// --- About: development approach flow ---
export const developmentApproach: string[] = [
  'Requirements',
  'Planning',
  'Design',
  'Development',
  'Testing',
  'Deployment',
  'Support',
]

// --- Capability strip (home, replaces unverified stats) ---
export const capabilities: { label: string; icon: string }[] = [
  { label: 'Custom Software', icon: 'custom' },
  { label: 'Web & Mobile', icon: 'mobile' },
  { label: 'Business Automation', icon: 'erp' },
  { label: 'Cloud & Integration', icon: 'cloud' },
]

// --- Projects ---
export const projectCategories: ('All' | ProjectCategory)[] = [
  'All',
  'Websites',
  'Web Applications',
]

export const projects: Project[] = [
  {
    id: 'marvelslice-portal',
    title: 'Marvel Slice — Software Learning & Competitive Exams',
    category: 'Websites',
    description:
      'Premier educational institute platform featuring course catalogs for in-demand software technologies (Full Stack, Python, Java, Data Science) and competitive exam preparation, with live batch enrollments and career placement assistance.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'EdTech', 'Responsive Web'],
    color: '#0057E7',
    image: '/images/projects/marvelslice.avif',
    url: 'https://marvelslice.com/',
  },
  {
    id: 'marvelslice-lms',
    title: 'MarvelSlice LMS — Learning Management System',
    category: 'Web Applications',
    description:
      'Comprehensive learning management system equipped with live interactive sessions, course marketplace, student progress tracking, assessment evaluations, and native Microsoft Teams integration for connected digital learning.',
    tags: ['Next.js', 'LMS Platform', 'MS Teams Integration', 'Live Sessions', 'Role-Based Access'],
    color: '#FF5A00',
    image: '/images/projects/lms.avif',
    url: 'https://lms.marvelslice.com/login',
  },
  {
    id: 'marvelvillas',
    title: 'Marvel Villas — Astro Vastu Construction & Consultation',
    category: 'Websites',
    description:
      'Full-featured website for Marvel Villas, an Astro-Vastu based construction and consultation firm offering unique, modern architectural design solutions. Features service showcases, project galleries, Vastu guidance, and career opportunities.',
    tags: ['Website', 'Construction', 'Vastu', 'Real Estate', 'Responsive Web'],
    color: '#B8860B',
    image: '/images/projects/marvelvillas.avif',
    url: 'https://www.marvelvillas.com/',
  },
]

// --- Contact form solution types ---
export const solutionTypes: string[] = [
  'Website',
  'Web Application',
  'Mobile Application',
  'ERP or Business Software',
  'Custom Software',
  'AI or Automation',
  'API or Integration',
  'Cloud or DevOps',
  'Other',
]

// --- Testimonials ---
export interface Testimonial {
  id: string
  clientName: string
  role: string
  companyName: string
  projectCompleted: string
  feedback: string
  rating: number
  isVerified: boolean
  initials: string
  accentColor: string
  avatar?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't-marvelslice',
    clientName: 'Arun Prakash',
    role: 'Managing Director',
    companyName: 'Marvel Slice Learning Institute',
    projectCompleted: 'EdTech Portal & Student Enrollment Platform',
    feedback:
      'Marvel Softwares engineered our software training institute portal from the ground up. The batch scheduling, course catalogs, and online admission pipelines transformed our daily operations and boosted student enrollments by over 140%.',
    rating: 5,
    isVerified: true,
    initials: 'AP',
    accentColor: '#0057E7',
    avatar: '/images/team/alex-chen.avif',
  },
  {
    id: 't-lms',
    clientName: 'Dr. Deepa Sundaram',
    role: 'Academic Head',
    companyName: 'MarvelSlice LMS Platform',
    projectCompleted: 'Enterprise LMS with MS Teams Integration',
    feedback:
      'The native Microsoft Teams integration, live classroom scheduling, and automated gradebook evaluations work with zero friction. Marvel Softwares delivered an intuitive, enterprise-grade learning management system ahead of schedule.',
    rating: 5,
    isVerified: true,
    initials: 'DS',
    accentColor: '#FF5A00',
    avatar: '/images/team/sarah-mitchell.avif',
  },
  {
    id: 't-marvelvillas',
    clientName: 'V. Rajesh Kumar',
    role: 'Principal Architect & Founder',
    companyName: 'Marvel Villas & Construction',
    projectCompleted: 'Corporate Architecture & Construction Showcase',
    feedback:
      'The modern design, interactive project portfolio, and blazing-fast loading speeds built by Marvel Softwares significantly elevated our architectural brand presence. Prospective villa clients constantly compliment the layout.',
    rating: 5,
    isVerified: true,
    initials: 'VR',
    accentColor: '#B8860B',
    avatar: '/images/team/marcus-johnson.avif',
  },
  {
    id: 't-apex',
    clientName: 'Karthik Selvan',
    role: 'Operations VP',
    companyName: 'Apex Logistics & Freight',
    projectCompleted: 'Fleet Telematics & Automated Dispatch Engine',
    feedback:
      'Our dispatch efficiency tripled within the very first month of deployment. The cloud-connected driver tracking dashboards seamlessly process high-volume freight operations without lag. Exceptional technical execution.',
    rating: 5,
    isVerified: true,
    initials: 'KS',
    accentColor: '#0891B2',
    avatar: '/images/team/alex-chen.avif',
  },
  {
    id: 't-horizon',
    clientName: 'Meenakshi Raman',
    role: 'Head of Digital Commerce',
    companyName: 'Horizon Retail Group',
    projectCompleted: 'Omnichannel E-Commerce & Multi-Store POS',
    feedback:
      'Real-time multi-store inventory synchronization was our biggest operational hurdle. Marvel Softwares developed an omnichannel architecture that unified our offline POS checkouts and web storefront flawlessly.',
    rating: 5,
    isVerified: true,
    initials: 'MR',
    accentColor: '#7C3AED',
    avatar: '/images/team/elena-rodriguez.avif',
  },
]

// ============================================
// Build Your Website / Software configurator (/build)
// Dell-style build-and-price, without public pricing:
// clients assemble a configuration and send it straight
// to the engineering team for a tailored written quote.
// Prices are intentionally NOT shown anywhere on the page.
// ============================================

export type BuildTrackId = 'website' | 'software'
export type BuildTierId = 'basic' | 'modern' | 'ultra'

export interface BuildTrack {
  id: BuildTrackId
  label: string
  tagline: string
  description: string
  icon: string
  /** Example builds shown as quick chips on the track card */
  examples: string[]
  /** Mapped onto the contact inquiry `solution` field on submit */
  solutionValue: string
}

export interface BuildTier {
  id: BuildTierId
  name: string
  tagline: string
  badge?: string
  bestFor: string
  /** Indicative delivery window only — never a price */
  timeline: string
  features: string[]
}

export interface BuildAccessory {
  id: string
  name: string
  description: string
  icon: string
  /** Tracks this add-on is relevant for */
  appliesTo: BuildTrackId[]
  /** Tier-based recommendation per track (renders a "Recommended" ribbon + pre-selection) */
  recommendedFor: Partial<Record<BuildTrackId, BuildTierId[]>>
}

export const buildTracks: BuildTrack[] = [
  {
    id: 'website',
    label: 'Business Website',
    tagline: 'A fast, conversion-focused website',
    description:
      'Corporate sites, landing pages, e-commerce storefronts and blogs — engineered for speed, SEO and trust.',
    icon: 'web',
    examples: ['Corporate site', 'E-commerce', 'Landing page', 'Website redesign'],
    solutionValue: 'Website',
  },
  {
    id: 'software',
    label: 'Custom Software / Web App',
    tagline: 'Software that runs your business',
    description:
      'Web applications, internal tools, ERP/CRM systems, portals and AI automations — built around your workflows.',
    icon: 'custom',
    examples: ['ERP / CRM', 'Admin portal', 'SaaS product', 'AI automation'],
    solutionValue: 'Web Application',
  },
]

export const buildTiers: Record<BuildTrackId, BuildTier[]> = {
  website: [
    {
      id: 'basic',
      name: 'Basic',
      tagline: 'Get your business online',
      bestFor: 'Startups & small businesses, 1–5 pages',
      timeline: 'Typical delivery: 1–2 weeks',
      features: [
        'Up to 5 pages (Home, About, Services, Contact)',
        'Mobile-responsive design',
        'Contact form + WhatsApp button',
        'Basic on-page SEO & fast load',
        'Google Maps & social links',
        '1 revision round',
      ],
    },
    {
      id: 'modern',
      name: 'Modern',
      tagline: 'Grow and scale online',
      badge: 'Most Popular',
      bestFor: 'Growing businesses, up to 15 pages',
      timeline: 'Typical delivery: 2–4 weeks',
      features: [
        'Up to 15 pages + blog / news section',
        'CMS — your team edits content without code',
        'Advanced SEO + Google Analytics setup',
        'Premium UI/UX with smooth animations',
        'Speed & Core Web Vitals optimization',
        '2 revision rounds',
        '30-day post-launch support',
      ],
    },
    {
      id: 'ultra',
      name: 'Ultra',
      tagline: 'A category-defining flagship',
      bestFor: 'Established brands & high-traffic sites',
      timeline: 'Typical delivery: 4–8 weeks',
      features: [
        'Custom design from scratch + brand system',
        'Unlimited pages / app-like experiences',
        'E-commerce, booking or member portals',
        'Deep integrations (CRM, payments, ERP)',
        'Headless CMS, API-ready architecture',
        'Dedicated project manager',
        'Priority post-launch SLA',
      ],
    },
  ],
  software: [
    {
      id: 'basic',
      name: 'Basic',
      tagline: 'Launch your core idea fast',
      bestFor: 'Founders validating a product (MVP)',
      timeline: 'Typical delivery: 3–5 weeks',
      features: [
        '1 core module automating your key workflow',
        'Simple admin panel',
        'Login with basic user roles',
        'Standard cloud database + hosting',
        'Essential reports & exports',
        '30-day bug-fix support',
      ],
    },
    {
      id: 'modern',
      name: 'Modern',
      tagline: 'A complete custom platform',
      badge: 'Most Popular',
      bestFor: 'SMBs replacing manual work with software',
      timeline: 'Typical delivery: 6–10 weeks',
      features: [
        'Multi-module web application',
        'Role-based access (admin, staff, customer)',
        'Interactive dashboards & reports',
        'REST APIs + 3rd-party integrations',
        'In-app notifications & email alerts',
        '2 review cycles with demos',
        '60-day post-launch support',
      ],
    },
    {
      id: 'ultra',
      name: 'Ultra',
      tagline: 'Enterprise-grade, unlimited scale',
      bestFor: 'Enterprises & mission-critical systems',
      timeline: 'Typical delivery: 10–16 weeks',
      features: [
        'Everything in Modern, plus AI / automation',
        'ERP, CRM, LMS & MS Teams integrations',
        'High-availability, scalable architecture',
        'Advanced security, audit logs & RBAC',
        'Dedicated PM + SLA-backed support',
        'Full documentation & team training',
        '90-day post-launch support',
      ],
    },
  ],
}

export const buildAccessories: BuildAccessory[] = [
  { id: 'domain-hosting', name: 'Domain & Hosting', description: 'Domain registration, fast hosting, launch deployment', icon: 'cloud', appliesTo: ['website', 'software'], recommendedFor: { website: ['basic', 'modern', 'ultra'] } },
  { id: 'business-email', name: 'Business Email', description: 'name@yourdomain.com mailboxes with setup help', icon: 'mail', appliesTo: ['website', 'software'], recommendedFor: { website: ['modern', 'ultra'], software: ['ultra'] } },
  { id: 'ssl-security', name: 'SSL & Security', description: 'HTTPS, firewall rules, backups & security headers', icon: 'shield', appliesTo: ['website', 'software'], recommendedFor: { website: ['basic', 'modern', 'ultra'], software: ['basic', 'modern', 'ultra'] } },
  { id: 'seo-boost', name: 'Advanced SEO', description: 'On-page SEO, metadata, sitemap & indexing', icon: 'growth', appliesTo: ['website'], recommendedFor: { website: ['modern', 'ultra'] } },
  { id: 'content-writing', name: 'Content & Copy', description: 'Compelling, conversion-focused website copy', icon: 'strategy', appliesTo: ['website'], recommendedFor: { website: ['basic', 'modern'] } },
  { id: 'logo-brand', name: 'Logo & Branding', description: 'Logo refinement, brand colors & usage kit', icon: 'design', appliesTo: ['website'], recommendedFor: { website: ['basic', 'modern'] } },
  { id: 'analytics', name: 'Analytics Setup', description: 'Google Analytics, event tracking & dashboards', icon: 'dashboard', appliesTo: ['website', 'software'], recommendedFor: { website: ['modern', 'ultra'], software: ['ultra'] } },
  { id: 'integrations', name: 'Integrations', description: 'CRM, payment gateways, APIs & WhatsApp', icon: 'api', appliesTo: ['website', 'software'], recommendedFor: { website: ['ultra'], software: ['modern', 'ultra'] } },
  { id: 'data-migration', name: 'Data Migration', description: 'Safe migration from your old site or spreadsheets', icon: 'custom', appliesTo: ['website', 'software'], recommendedFor: { website: ['ultra'], software: ['modern', 'ultra'] } },
  { id: 'team-training', name: 'Team Training', description: 'CMS / admin panel training for your staff', icon: 'feedback', appliesTo: ['software'], recommendedFor: { software: ['modern', 'ultra'] } },
  { id: 'maintenance', name: 'Maintenance Plan', description: 'Monthly updates, monitoring & priority fixes', icon: 'erp', appliesTo: ['website', 'software'], recommendedFor: { website: ['ultra'], software: ['ultra'] } },
  { id: 'priority-support', name: 'Priority Launch Support', description: 'Dedicated help during your first 30 days live', icon: 'rocket', appliesTo: ['website', 'software'], recommendedFor: { website: ['ultra'], software: ['ultra'] } },
]

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
  email: 'softwaresmarvel@gmail.com',
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
  siteUrl: 'https://www.marvelsoftwares.in',
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
      'We engineer custom, high-performance websites designed to elevate your brand presence, engage prospective clients, and communicate your business value with unmistakable clarity. From responsive corporate platforms and conversion-focused landing pages to dynamic content-managed systems, every solution is built from the ground up for technical speed, search engine visibility, rock-solid security, and seamless cross-device responsiveness. By combining thoughtful UX architecture with clean, modern code and intuitive publishing tools, we deliver fast, accessible, and scalable digital experiences that establish lasting credibility and turn casual visitors into loyal clients.',
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
      'We build powerful, scalable web applications and cloud-native SaaS platforms engineered to streamline complex business logic and support demanding daily operational workflows. Utilizing modern frontend technologies and resilient, modular backend architectures, our web apps feature real-time data synchronization, enterprise-grade role-based permissions, automated background processing, and secure third-party integrations. From intuitive customer portals and administrative dashboards to mission-critical business tools, we engineer secure, high-throughput web platforms that eliminate bottlenecks, enhance productivity, and adapt effortlessly as your organization expands.',
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
      'We design and develop native and cross-platform mobile applications for iOS and Android that provide fluid, intuitive, and dependable user experiences on any device. Covering the complete product lifecycle from UX conceptualization and interface design through app store deployment, our mobile engineering incorporates biometric authentication, offline synchronization, push notifications, and resilient cloud backends. Whether you require a customer-facing digital product or an internal mobile tool for field operations, we deliver high-performing, secure mobile solutions that keep your users engaged and connected wherever they are.',
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
      'We engineer comprehensive enterprise resource planning (ERP) systems and tailored business management software that unify your entire operational ecosystem into a single, cohesive platform. By centralizing inventory tracking, automated billing, customer management, procurement, and departmental workflows with granular access controls and real-time analytics, our solutions eliminate data silos and costly manual overhead. We design each module specifically around your unique operating model, providing management with total operational transparency, dependable business intelligence, and the scalability required to fuel long-term corporate growth.',
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
      'When standard off-the-shelf software fails to address your operational challenges, we engineer purpose-built custom software solutions tailored specifically to your company\'s proprietary workflows and strategic goals. From bespoke internal workflow engines and automated data processing pipelines to modernizing legacy enterprise systems, our engineering team constructs maintainable, scalable, and secure architectures. We focus on seamless integration with your existing technology stack, minimal disruption to ongoing operations, and building flexible foundations that empower your team to innovate faster and maintain a lasting competitive edge.',
    ],
    capabilities: [
      'Internal business tools',
      'Automation systems',
      'Custom workflow engines',
      'System modernization',
      'Legacy application integration',
      'Desktop or cross-platform tools where appropriate',
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
      'We craft human-centered UI/UX designs that transform complex digital workflows into intuitive, engaging, and effortless experiences. From user journey mapping and wireframing to interactive prototyping and comprehensive design systems, our design practice balances aesthetic elegance with accessibility and functional clarity, reducing user friction and accelerating product adoption.',
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
      'We implement practical, high-impact artificial intelligence and intelligent workflow automation designed to eliminate repetitive operational tasks and unlock new efficiencies across your business. By integrating custom machine learning models, intelligent document processing, natural language assistants, and smart decision pipelines directly into your software environment, we help teams accelerate turnaround times and minimize human error. From automated customer inquiries to deep predictive analytics, our automation solutions transform unstructured company data into valuable business intelligence that drives faster, more confident decision-making.',
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
    name: 'Alex Chen',
    role: 'CEO & Co-Founder',
    bio: 'Guides technical direction, core architecture, and long-term product roadmaps with 12+ years in distributed systems.',
    expertise: ['System Architecture', 'Cloud Strategy', 'Product Delivery'],
  },
  {
    name: 'Sarah Mitchell',
    role: 'CTO & Co-Founder',
    bio: 'Leads full-stack engineering and cloud DevOps, ensuring resilient, high-throughput software systems with zero downtime.',
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
    id: 'marvel-pulse-erp',
    title: 'Marvel Pulse ERP — Enterprise Resource Planning',
    category: 'Enterprise Software',
    description:
      'A multi-tenant cloud ERP platform integrating inventory tracking, real-time GST invoicing, smart procurement workflows, and interactive executive reporting.',
    status: 'In Active Development',
    progress: 75,
    targetRelease: 'Q2 2027',
    tags: ['Cloud ERP', 'PostgreSQL', 'Microservices', 'Real-Time Telemetry'],
    accentColor: '#0057E7',
    image: '/Floating Task Management UI Showcase.png',
  },
  {
    id: 'marvel-fleet-suite',
    title: 'Marvel Fleet — Logistics & Smart Telematics',
    category: 'IoT & Mobile Platform',
    description:
      'Intelligent fleet management solution with live GPS tracking, fuel monitoring, driver route optimization, and preventative maintenance alerts.',
    status: 'Private Beta Testing',
    progress: 88,
    targetRelease: 'Q1 2027',
    tags: ['Fleet Telematics', 'Flutter Mobile', 'Live Geo-Tracking', 'Node.js'],
    accentColor: '#FF5A00',
    image: '/Connected SaaS Platform Ecosystem.png',
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
    image: '/proj-imgs/marvelslice.png',
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
    image: '/proj-imgs/lms.png',
    url: 'https://lms.marvelslice.com/login',
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

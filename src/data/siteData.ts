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
  tags: string[]
  color: string
  image: string
  url: string
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
  tagline: 'Ideas into Intelligent Software.',
  // Update these with verified business details only.
  email: 'contact@marvelsoftwares.com',
  phone: '+1 (555) 382-7491',
  phoneHref: 'tel:+15553827491',
  location: 'Working with clients remotely and on-site as agreed',
  hours: 'Monday – Friday, 9:00 AM – 6:00 PM',
  // Canonical domain for SEO metadata — replace with the production domain.
  siteUrl: 'https://marvelsoftwares.com',
}

// --- Navigation ---
export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
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

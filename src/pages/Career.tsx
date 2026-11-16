import { useEffect, useState } from 'react'
import Seo from '../components/Seo'
import {
  ArrowRightIcon,
  BarChartIcon,
  BoltIcon,
  CheckCircleIcon,
  ClipboardIcon,
  CodeIcon,
  GlobeIcon,
  LightbulbIcon,
  MailIcon,
  MapPinIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
  TargetIcon,
  UsersIcon,
} from '../components/Icons'
import { siteConfig } from '../data/siteData'
import './Career.css'

// Dedicated careers inbox can replace this once it exists.
const CAREERS_EMAIL = siteConfig.email

const DEPARTMENTS = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'design', label: 'Design' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'business', label: 'Business' },
] as const

type DepartmentId = (typeof DEPARTMENTS)[number]['id']
type FilterId = DepartmentId | 'all'

const DEPARTMENT_ICONS: Record<DepartmentId, typeof CodeIcon> = {
  engineering: CodeIcon,
  design: PaletteIcon,
  marketing: BarChartIcon,
  business: UsersIcon,
}

const DEPARTMENT_THEMES: Record<DepartmentId, string> = {
  engineering: 'blue',
  design: 'purple',
  marketing: 'orange',
  business: 'green',
}

interface CareerRole {
  id: string
  title: string
  department: DepartmentId
  type: string
  location: string
  experience: string
  summary: string
  skills: string[]
  featured?: boolean
}

const ROLES: CareerRole[] = [
  {
    id: 'full-stack-developer',
    title: 'Full-Stack Developer',
    department: 'engineering',
    type: 'Full-time',
    location: 'Remote / Hybrid',
    experience: '1–4 years',
    summary:
      'Own features end-to-end — from an API contract or Figma handoff to a polished, production-ready experience used by real businesses.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    featured: true,
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer (React)',
    department: 'engineering',
    type: 'Full-time',
    location: 'Remote',
    experience: '1–3 years',
    summary:
      'Turn thoughtful designs into fast, accessible interfaces that feel effortless on every screen and every connection.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Accessibility'],
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer (Node.js)',
    department: 'engineering',
    type: 'Full-time',
    location: 'Hybrid · Nagercoil',
    experience: '2–5 years',
    summary:
      'Design clean APIs and dependable data models for the systems our clients run their businesses on every day.',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'System design'],
  },
  {
    id: 'mobile-app-developer',
    title: 'Mobile App Developer',
    department: 'engineering',
    type: 'Full-time',
    location: 'Remote',
    experience: '1–4 years',
    summary:
      'Build cross-platform mobile experiences that are quick to ship, smooth to use and ready for real-world scale.',
    skills: ['Flutter', 'React Native', 'Firebase', 'REST APIs'],
  },
  {
    id: 'ai-automation-engineer',
    title: 'AI & Automation Engineer',
    department: 'engineering',
    type: 'Full-time',
    location: 'Remote',
    experience: '2+ years',
    summary:
      'Prototype and ship practical AI workflows that save our clients hours every week — not just impressive demos.',
    skills: ['Python', 'LLM APIs', 'n8n', 'Vector databases'],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'design',
    type: 'Full-time',
    location: 'Remote',
    experience: '1–3 years',
    summary:
      'Shape product experiences from first sketch to a maintainable design system — and see your work ship in weeks, not quarters.',
    skills: ['Figma', 'Design systems', 'Prototyping', 'User research'],
  },
  {
    id: 'seo-specialist',
    title: 'Digital Marketing & SEO Specialist',
    department: 'marketing',
    type: 'Full-time',
    location: 'Remote',
    experience: '1–3 years',
    summary:
      'Help the products we build get found through technical SEO, useful content and clean, honest measurement.',
    skills: ['Technical SEO', 'GA4', 'Content', 'Search Console'],
  },
  {
    id: 'business-development-executive',
    title: 'Business Development Executive',
    department: 'business',
    type: 'Full-time',
    location: 'Hybrid · Nagercoil',
    experience: '0–2 years',
    summary:
      'Talk to founders, understand the problems behind their ideas and connect them with the right Marvel team.',
    skills: ['Communication', 'CRM', 'Lead generation', 'Consulting'],
  },
]

const VALUES = [
  {
    icon: RocketIcon,
    theme: 'blue',
    title: 'Ownership from day one',
    copy:
      'You will not spend months warming a bench. From your first sprint you own real features, with real users and real feedback.',
  },
  {
    icon: LightbulbIcon,
    theme: 'green',
    title: 'Learning by building',
    copy:
      'Code reviews, pairing sessions and a genuine learning budget. We grow by shipping, not by sitting through slide decks.',
  },
  {
    icon: UsersIcon,
    theme: 'orange',
    title: 'Small teams, short loops',
    copy:
      'Work directly with designers, engineers and clients. Fewer handoffs, faster decisions and better work because of it.',
  },
  {
    icon: TargetIcon,
    theme: 'purple',
    title: 'Craft over shortcuts',
    copy:
      'We care about clean code, accessibility and performance — and we make the time to do it properly, not just quickly.',
  },
  {
    icon: GlobeIcon,
    theme: 'cyan',
    title: 'Flexible by default',
    copy:
      'Remote and hybrid roles with sensible overlap hours. We measure outcomes and trust you to manage your own day.',
  },
  {
    icon: SparklesIcon,
    theme: 'pink',
    title: 'Room to grow',
    copy:
      'Clear expectations, regular feedback and a path to seniority — or a new specialism when you are ready for it.',
  },
]

function applyHref(role: CareerRole) {
  const subject = `Application — ${role.title}`
  const body = [
    'Hi Marvel Softwares team,',
    '',
    `I would like to apply for the ${role.title} role.`,
    '',
    'Name:',
    'Portfolio / GitHub:',
    'LinkedIn:',
    'Current location:',
    'Notice period:',
    '',
    'My resume is attached. Thanks!',
  ].join('\n')

  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const OPEN_APPLICATION_HREF = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
  'Open application — Marvel Softwares',
)}&body=${encodeURIComponent(
  [
    'Hi Marvel Softwares team,',
    '',
    'I would love to hear about future roles that fit my skills.',
    '',
    'Name:',
    'Role / skills:',
    'Portfolio / GitHub:',
    'LinkedIn:',
    '',
    'My resume is attached. Thanks!',
  ].join('\n'),
)}`

const FILTERS: Array<{ id: FilterId; label: string; icon?: typeof CodeIcon }> = [
  { id: 'all', label: 'All roles' },
  ...DEPARTMENTS.map((department) => ({
    id: department.id,
    label: department.label,
    icon: DEPARTMENT_ICONS[department.id],
  })),
]

const countRoles = (id: FilterId) =>
  id === 'all' ? ROLES.length : ROLES.filter((role) => role.department === id).length

export const Career = () => {
  const [activeDept, setActiveDept] = useState<FilterId>('all')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const visibleRoles =
    activeDept === 'all' ? ROLES : ROLES.filter((role) => role.department === activeDept)

  return (
    <div className="career-page w-full overflow-x-clip">
      <Seo
        title="Careers | Marvel Softwares"
        description="Build work that matters at Marvel Softwares. Explore open engineering, design, marketing and business roles, see how we hire, and apply in minutes."
        path="/career"
        keywords="Marvel Softwares careers, software developer jobs, React developer job, Node.js developer job, Flutter developer job, UI UX designer job, remote software jobs India, IT jobs Nagercoil"
        robots="noindex, nofollow"
      />

      {/* ============ HERO ============ */}
      <section id="careers" className="career-hero" aria-labelledby="career-title">
        <div aria-hidden="true" className="career-hero-dotgrid" />
        <div aria-hidden="true" className="career-hero-glow career-hero-glow--blue" />
        <div aria-hidden="true" className="career-hero-glow career-hero-glow--orange" />

        <div className="container career-hero-inner">
          <div className="career-hero-copy">
            <h1 id="career-title" className="career-hero-title">
              Build Work That <span className="career-hero-accent">Matters</span>
            </h1>

            <p className="career-hero-subline">Grow with us.</p>

            <p className="career-hero-lead section-subtitle">
              We are a small, product-minded team building websites, software and AI tools
              for businesses that depend on them. If you like owning your work, learning
              fast and shipping things people actually use, you will feel at home here.
            </p>

            <div className="career-hero-actions">
              <a className="hero-btn hero-btn--primary" href="#open-roles">
                Explore Open Roles
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a className="hero-btn hero-btn--ghost" href={OPEN_APPLICATION_HREF}>
                <MailIcon className="w-4 h-4" />
                Send Your Resume
              </a>
            </div>

            <ul className="career-hero-meta" aria-label="Why you will enjoy working here">
              <li>
                <CheckCircleIcon className="w-4 h-4" />
                Remote &amp; hybrid roles
              </li>
              <li>
                <CheckCircleIcon className="w-4 h-4" />
                Learning budget
              </li>
              <li>
                <CheckCircleIcon className="w-4 h-4" />
                Real ownership
              </li>
            </ul>
          </div>

          <div className="career-hero-visual">
            <img
              src="/images/hero/career-growth.avif"
              alt="Developer climbing growth steps toward a digital dashboard, rocket and trophy"
              width={1672}
              height={941}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ============ CULTURE / VALUES ============ */}
      <section id="life-at-marvel" className="career-section career-culture" aria-labelledby="career-values-title">
        <div className="container">
          <div className="career-section-head">
            <h2 id="career-values-title" className="text-section-title">
              A Place to Do Your <span className="heading-last-word">Best Work</span>
            </h2>
            <p className="section-subtitle career-section-subtitle">
              No layers of approval, no busywork for the sake of it. Just a team of
              people who care about the craft, helping each other get better every week.
            </p>
          </div>

          <div className="career-values">
            {VALUES.map((value) => (
              <article
                key={value.title}
                className={`career-value-card career-theme--${value.theme}`}
              >
                <span className="career-icon-badge" aria-hidden="true">
                  <value.icon />
                </span>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OPEN ROLES ============ */}
      <section
        id="open-roles"
        className="career-section career-roles"
        aria-labelledby="career-roles-title"
      >
        <div className="container">
          <div className="career-section-head">
            <h2 id="career-roles-title" className="text-section-title">
              Find Where You <span className="heading-last-word">Fit</span>
            </h2>
            <p className="section-subtitle career-section-subtitle">
              Every role below is active and reviewed personally by our team. Pick a
              department to narrow things down, then apply with your resume and
              portfolio.
            </p>
          </div>

          <div className="career-roles-toolbar">
            <div className="career-filters" role="group" aria-label="Filter roles by department">
              {FILTERS.map((filter) => {
                const Icon = filter.icon
                const isActive = activeDept === filter.id
                return (
                  <button
                    key={filter.id}
                    type="button"
                    className={`career-filter${isActive ? ' is-active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveDept(filter.id)}
                  >
                    {Icon && <Icon className="career-filter-icon" />}
                    <span>{filter.label}</span>
                    <span className="career-filter-count">{countRoles(filter.id)}</span>
                  </button>
                )
              })}
            </div>

            <p className="career-open-pill">
              <span className="career-open-dot" />
              {ROLES.length} open roles
            </p>
          </div>

          <p className="career-results" aria-live="polite">
            Showing {visibleRoles.length} {visibleRoles.length === 1 ? 'role' : 'roles'}
            {activeDept !== 'all'
              ? ` in ${DEPARTMENTS.find((department) => department.id === activeDept)?.label}`
              : ''}
          </p>

          <div className="career-role-list">
            {visibleRoles.map((role) => {
              const DepartmentIcon = DEPARTMENT_ICONS[role.department]
              const departmentLabel = DEPARTMENTS.find(
                (department) => department.id === role.department,
              )?.label

              return (
                <article
                  key={role.id}
                  id={`role-${role.id}`}
                  className={`career-role-card career-theme--${DEPARTMENT_THEMES[role.department]}`}
                  aria-labelledby={`role-${role.id}-title`}
                >
                  <span className="career-role-icon" aria-hidden="true">
                    <DepartmentIcon />
                  </span>

                  <div className="career-role-body">
                    <div className="career-role-top">
                      <h3 id={`role-${role.id}-title`} className="career-role-title">
                        {role.title}
                      </h3>
                      <span className="career-role-badge">{departmentLabel}</span>
                      {role.featured && (
                        <span className="career-role-hot">
                          <BoltIcon className="w-3 h-3" />
                          Actively hiring
                        </span>
                      )}
                    </div>

                    <p className="career-role-blurb">{role.summary}</p>

                    <ul className="career-role-meta">
                      <li>
                        <MapPinIcon />
                        {role.location}
                      </li>
                      <li>
                        <ClipboardIcon />
                        {role.type}
                      </li>
                      <li>
                        <TargetIcon />
                        {role.experience}
                      </li>
                    </ul>

                    <ul className="career-role-skills" aria-label={`${role.title} skills`}>
                      {role.skills.map((skill) => (
                        <li key={skill} className="career-skill">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    className="career-apply"
                    href={applyHref(role)}
                    aria-label={`Apply for ${role.title}`}
                  >
                    Apply
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </article>
              )
            })}

            {visibleRoles.length === 0 && (
              <div className="career-empty">
                <p>No roles in this department right now.</p>
                <button
                  type="button"
                  className="career-empty-reset"
                  onClick={() => setActiveDept('all')}
                >
                  Show all roles
                </button>
              </div>
            )}
          </div>

          <div className="career-roles-note">
            <div className="career-roles-note-copy">
              <span className="career-roles-note-eyebrow">
                <SparklesIcon className="w-4 h-4" />
                Open application
              </span>
              <h3>Don&rsquo;t see the right role?</h3>
              <p>
                We are always happy to meet good people. Tell us what you would love to
                build and we will keep you in mind for the next opening.
              </p>
            </div>
            <a className="hero-btn hero-btn--primary career-note-cta" href={OPEN_APPLICATION_HREF}>
              <MailIcon className="w-4 h-4" />
              Send an open application
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Career

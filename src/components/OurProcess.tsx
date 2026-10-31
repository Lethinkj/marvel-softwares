import React from 'react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useMediaQuery'

const BLUE = '#0866F5'
const NAVY = '#102653'
const ORANGE = '#FF6B00'
const LIGHT_BLUE = '#B7DCFF'
const PALE_BLUE = '#EAF4FF'
const FLOW = '#7FD8FF'
const GRAY = '#526B8B'
const WHITE = '#FFFFFF'

const IconBase = ({ children }: { children: React.ReactNode }) => (
  <g
    fill="none"
    stroke={BLUE}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </g>
)

/* 1 — Meet with Client: two people in conversation */
const MeetIcon = () => (
  <IconBase>
    <circle cx="13.5" cy="18" r="5.5" fill={PALE_BLUE} />
    <path d="M4 37c0-5.4 4.3-9.3 9.5-9.3 1.4 0 2.7.3 3.9.8" />
    <path d="M13 37c0-3.9 1.8-7 4.6-8.6" />
    <path
      d="M26.5 8.5h12a5 5 0 0 1 5 5V21a5 5 0 0 1-5 5h-4.4L28.6 30.5v-4.6h-2.1a5 5 0 0 1-5-5V13.5a5 5 0 0 1 5-5z"
      fill={WHITE}
    />
    <path d="M29 15h9.5M29 19.5h6" stroke={LIGHT_BLUE} strokeWidth="2.2" />
  </IconBase>
)

/* 2 — Requirement Gathering: clipboard with signed-off checks */
const RequirementsIcon = () => (
  <IconBase>
    <rect x="9" y="8" width="30" height="36" rx="6" fill={WHITE} />
    <rect x="17" y="3.5" width="14" height="8.5" rx="3.5" fill={PALE_BLUE} />
    <path d="M14.5 25.5l3 3 5.5-6" stroke={ORANGE} strokeWidth="2.6" />
    <path d="M27.5 26.5h7" stroke={LIGHT_BLUE} strokeWidth="2.4" />
    <path d="M14.5 35.5l3 3 5.5-6" stroke={ORANGE} strokeWidth="2.6" />
    <path d="M27.5 36.5h5" stroke={LIGHT_BLUE} strokeWidth="2.4" />
  </IconBase>
)

/* 3 — Project Planning: scheduled tasks with a milestone marker */
const PlanningIcon = () => (
  <IconBase>
    <rect x="5" y="9" width="21" height="6.5" rx="3.25" fill={LIGHT_BLUE} stroke="none" />
    <rect x="12" y="18" width="24" height="6.5" rx="3.25" fill={BLUE} stroke="none" />
    <rect x="7" y="27" width="18" height="6.5" rx="3.25" fill={PALE_BLUE} />
    <path d="M36.5 8v30" stroke={ORANGE} strokeWidth="2.2" strokeDasharray="3 4.5" />
    <circle cx="36.5" cy="7" r="2.6" fill={ORANGE} stroke="none" />
  </IconBase>
)

/* 4 — Homepage Confirmation: browser with approval tick */
const HomepageIcon = () => (
  <IconBase>
    <rect x="5" y="8" width="38" height="30" rx="6" fill={WHITE} />
    <path d="M5 16.5h38" />
    <circle cx="10.5" cy="12.2" r="1.5" fill={LIGHT_BLUE} stroke="none" />
    <circle cx="15.5" cy="12.2" r="1.5" fill={LIGHT_BLUE} stroke="none" />
    <circle cx="20.5" cy="12.2" r="1.5" fill={LIGHT_BLUE} stroke="none" />
    <path d="M11 25h12" stroke={LIGHT_BLUE} strokeWidth="2.4" />
    <path d="M11 31h8" stroke={LIGHT_BLUE} strokeWidth="2.4" />
    <circle cx="33" cy="30.5" r="8" fill={ORANGE} stroke={WHITE} strokeWidth="2.4" />
    <path d="M29.3 30.6l2.6 2.6 4.7-5.3" stroke={WHITE} strokeWidth="2.6" />
  </IconBase>
)

/* 5 — UI/UX Design: layout canvas with a design nib */
const DesignIcon = () => (
  <IconBase>
    <rect x="4" y="6" width="34" height="26" rx="6" fill={WHITE} />
    <path d="M4 13h34" />
    <circle cx="9.5" cy="9.5" r="1.5" fill={LIGHT_BLUE} stroke="none" />
    <circle cx="14.5" cy="9.5" r="1.5" fill={LIGHT_BLUE} stroke="none" />
    <rect x="7.5" y="17" width="6.5" height="11" rx="2" fill={PALE_BLUE} />
    <rect x="17.5" y="17" width="16" height="4.5" rx="2.25" fill={LIGHT_BLUE} stroke="none" />
    <rect x="17.5" y="24" width="10" height="4.5" rx="2.25" fill={LIGHT_BLUE} stroke="none" />
    <path
      d="M30 45l2-6.5 7-7 4.5 4.5-7 7z"
      fill={ORANGE}
      stroke={ORANGE}
      strokeWidth="1.5"
    />
  </IconBase>
)

/* 6 — Development & Progress Updates: code window with progress bar */
const DevelopmentIcon = () => (
  <IconBase>
    <rect x="4" y="5" width="40" height="29" rx="6" fill={WHITE} />
    <path d="M4 12.5h40" />
    <circle cx="9.5" cy="8.7" r="1.5" fill={LIGHT_BLUE} stroke="none" />
    <circle cx="14.5" cy="8.7" r="1.5" fill={LIGHT_BLUE} stroke="none" />
    <path d="M17 20l-4.5 5L17 30" strokeWidth="2.6" />
    <path d="M31 20l4.5 5L31 30" strokeWidth="2.6" />
    <path d="M26 19l-2 12.5" stroke={ORANGE} strokeWidth="2.6" />
    <rect x="9" y="38.5" width="30" height="5" rx="2.5" fill={LIGHT_BLUE} stroke="none" />
    <rect x="9" y="38.5" width="18" height="5" rx="2.5" fill={ORANGE} stroke="none" />
  </IconBase>
)

/* 7 — Testing & Quality Assurance: shield with a verified tick */
const TestingIcon = () => (
  <IconBase>
    <path
      d="M24 4.5l14.5 5.8v10.4c0 9.2-6.4 15.6-14.5 20.4-8.1-4.8-14.5-11.2-14.5-20.4V10.3z"
      fill={PALE_BLUE}
    />
    <path d="M16.8 22.4l4.9 4.9 9.6-10.2" stroke={ORANGE} strokeWidth="3.4" />
  </IconBase>
)

/* 8 — Launch: rocket ready for lift-off */
const LaunchIcon = () => (
  <IconBase>
    <path
      d="M24 4c6.2 5.2 8.8 13.4 8.8 21.5L27 31.5h-6l-5.8-6C15.2 17.4 17.8 9.2 24 4z"
      fill={BLUE}
      stroke={BLUE}
      strokeWidth="1.6"
    />
    <circle cx="24" cy="16.5" r="4.2" fill={WHITE} stroke={LIGHT_BLUE} strokeWidth="1.8" />
    <path d="M15.2 25.5L8.5 33.5l7.8-1.6z" fill={BLUE} stroke={BLUE} strokeWidth="1.6" />
    <path d="M32.8 25.5l6.7 8-7.8-1.6z" fill={BLUE} stroke={BLUE} strokeWidth="1.6" />
    <path
      className="op-flame"
      d="M24 32.5c-2.6 3.4-2.6 7.2 0 11.2 2.6-4 2.6-7.8 0-11.2z"
      fill={ORANGE}
      stroke={ORANGE}
      strokeWidth="1.4"
    />
  </IconBase>
)

/* 9 — Maintenance & Support: gear turning with a service wrench */
const MaintenanceIcon = () => (
  <IconBase>
    <g className="op-gear">
      <circle cx="15" cy="15" r="6.5" fill={PALE_BLUE} />
      <path
        d="M15 4.5v3M15 22.5v3M4.5 15h3M22.5 15h3M7.6 7.6l2.1 2.1M20.3 20.3l2.1 2.1M22.4 7.6l-2.1 2.1M9.7 20.3l-2.1 2.1"
        strokeWidth="3.4"
      />
      <circle cx="15" cy="15" r="2.6" fill={WHITE} />
    </g>
    <g transform="translate(35.5 36.5) scale(0.44) translate(-24 -22.5)">
      <path
        d="M45.4 38L27.2 19.8c1.8-4.6.8-10-3-13.8C20.4 2 15.4 1.2 10.6 3.4L18 12l-6 6L3.4 10.6C1.2 15.4 2 20.4 6 24.4c3.8 3.8 9.2 4.8 13.8 3l18.2 18.2c.8.8 2 .8 2.8 0l4.6-4.6c.8-.8.8-2 0-2.8z"
        fill={WHITE}
        stroke={BLUE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </g>
  </IconBase>
)

interface ProcessStep {
  title: string[]
  desc: string
  icon: React.ReactNode
}

const PROCESS_STEPS: ProcessStep[] = [
  { title: ['Meet with Client'], desc: 'Align on your vision', icon: <MeetIcon /> },
  { title: ['Requirement', 'Gathering'], desc: 'Capture every detail', icon: <RequirementsIcon /> },
  { title: ['Project Planning'], desc: 'Map scope & timeline', icon: <PlanningIcon /> },
  { title: ['Homepage', 'Confirmation'], desc: 'Approve the structure', icon: <HomepageIcon /> },
  { title: ['UI/UX Design'], desc: 'Craft the experience', icon: <DesignIcon /> },
  { title: ['Development &', 'Progress Updates'], desc: 'Build in weekly sprints', icon: <DevelopmentIcon /> },
  { title: ['Testing &', 'Quality Assurance'], desc: 'Verify every detail', icon: <TestingIcon /> },
  { title: ['Launch'], desc: 'Go live with confidence', icon: <LaunchIcon /> },
  { title: ['Maintenance &', 'Support'], desc: 'Keep it running strong', icon: <MaintenanceIcon /> },
]

const POS: Array<[number, number]> = [
  [0, 0], [0, 1], [0, 2],
  [1, 2], [1, 1], [1, 0],
  [2, 0], [2, 1], [2, 2],
]
const COL_X = [140, 610, 1080]
const ROW_Y = [195, 487, 779]
const CARD_W = 380
const CARD_H = 180
const CARD_RX = 22

const horizontalConnector = (row: number, from: number, to: number) => {
  const y = ROW_Y[row] + CARD_H / 2
  const dir = to > from ? 1 : -1
  const start = from + 8 * dir
  const tip = to - 4 * dir
  const base = tip - 14 * dir
  return {
    line: `M${start} ${y} L${base} ${y}`,
    arrow: `M${base} ${y - 8} L${tip} ${y} L${base} ${y + 8} Z`,
  }
}

interface ConnectorProps {
  line: string
  arrow: string
  delay: number
}

const Connector: React.FC<ConnectorProps> = ({ line, arrow, delay }) => (
  <g>
    <path
      className="op-connector-line"
      d={line}
      pathLength={100}
      fill="none"
      stroke={BLUE}
      strokeWidth={3.5}
      strokeLinecap="round"
      style={{ animationDelay: `${delay}s` }}
    />
    <path
      className="op-connector-flow"
      d={line}
      fill="none"
      stroke={FLOW}
      strokeWidth={3.5}
      strokeLinecap="round"
    />
    <path className="op-arrow" d={arrow} fill={BLUE} style={{ animationDelay: `${delay + 0.65}s` }} />
  </g>
)

export const OurProcessSvg: React.FC<{ className?: string; active?: boolean }> = ({
  className = 'w-full h-auto',
  active = false,
}) => {
  const row0a = horizontalConnector(0, COL_X[0] + CARD_W, COL_X[1])
  const row0b = horizontalConnector(0, COL_X[1] + CARD_W, COL_X[2])
  const row1a = horizontalConnector(1, COL_X[2], COL_X[1] + CARD_W)
  const row1b = horizontalConnector(1, COL_X[1], COL_X[0] + CARD_W)
  const row2a = horizontalConnector(2, COL_X[0] + CARD_W, COL_X[1])
  const row2b = horizontalConnector(2, COL_X[1] + CARD_W, COL_X[2])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 140 1600 860"
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="op-title op-desc"
      fontFamily="Inter, Arial, sans-serif"
      className={`our-process-svg op-flow ${active ? 'is-inview' : ''} ${className}`}
    >
      <title id="op-title">Our Process — nine-step software development workflow</title>
      <desc id="op-desc">
        Serpentine flowchart of nine steps: Meet with Client, Requirement Gathering, Project
        Planning, Homepage Confirmation, UI/UX Design, Development and Progress Updates,
        Testing and Quality Assurance, Launch, Maintenance and Support.
      </desc>
      <defs>
        <filter id="op-card-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#102653" floodOpacity="0.12" />
        </filter>
        <linearGradient id="op-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4F9FF" />
          <stop offset="100%" stopColor="#DCEBFF" />
        </linearGradient>
        <linearGradient id="op-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0866F5" stopOpacity="0.06" />
          <stop offset="60%" stopColor="#0866F5" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g aria-hidden="true">
        <Connector line={row0a.line} arrow={row0a.arrow} delay={0.45} />
        <Connector line={row0b.line} arrow={row0b.arrow} delay={0.58} />
        <Connector
          line="M1460 285 H1502 Q1522 285 1522 305 V557 Q1522 577 1502 577 H1474"
          arrow="M1474 569 L1460 577 L1474 585 Z"
          delay={0.71}
        />
        <Connector line={row1a.line} arrow={row1a.arrow} delay={0.84} />
        <Connector line={row1b.line} arrow={row1b.arrow} delay={0.97} />
        <Connector
          line="M140 577 H98 Q78 577 78 597 V849 Q78 869 98 869 H126"
          arrow="M126 861 L140 869 L126 877 Z"
          delay={1.1}
        />
        <Connector line={row2a.line} arrow={row2a.arrow} delay={1.23} />
        <Connector line={row2b.line} arrow={row2b.arrow} delay={1.36} />
      </g>

      {PROCESS_STEPS.map((step, i) => {
        const [row, col] = POS[i]
        const x = COL_X[col]
        const y = ROW_Y[row]
        const cy = y + CARD_H / 2
        const delay = 0.3 + i * 0.11
        const twoLines = step.title.length > 1
        const titleY = twoLines ? cy - 24 : cy - 6
        const descY = (twoLines ? titleY + 26 : titleY) + 27
        return (
          <g key={step.title.join()} className="op-card" style={{ animationDelay: `${delay}s` }}>
            <rect
              x={x}
              y={y}
              width={CARD_W}
              height={CARD_H}
              rx={CARD_RX}
              fill={WHITE}
              stroke="#DCE9FA"
              strokeWidth="2"
              filter="url(#op-card-shadow)"
            />
            <rect
              x={x + 1}
              y={y + 1}
              width={CARD_W - 2}
              height={CARD_H - 2}
              rx={CARD_RX - 1}
              fill="url(#op-sheen)"
            />
            <rect
              x={x + 34}
              y={cy - 32}
              width={64}
              height={64}
              rx={18}
              fill="url(#op-tile)"
              stroke="#E3EEFC"
              strokeWidth="1.5"
            />
            <g className="op-icon" style={{ animationDelay: `${delay + 0.16}s` }}>
              <svg
                x={x + 44}
                y={cy - 22}
                width={44}
                height={44}
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                {step.icon}
              </svg>
            </g>

            <line
              x1={x + 124}
              y1={cy - 40}
              x2={x + 124}
              y2={cy + 40}
              stroke="#E3EDFA"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {step.title.map((line, li) => (
              <text
                key={line}
                x={x + 142}
                y={li === 0 ? titleY : titleY + 26}
                fontSize="21"
                fontWeight="700"
                fill={NAVY}
              >
                {line}
              </text>
            ))}
            <text x={x + 142} y={descY} fontSize="14.5" fontWeight="500" fill={GRAY}>
              {step.desc}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

const MobileConnector = () => (
  <div className="flex flex-1 flex-col items-center" aria-hidden="true" style={{ minHeight: 40, paddingBlock: 4 }}>
    <span
      className="flex-1 w-px"
      style={{
        backgroundImage: `linear-gradient(${LIGHT_BLUE} 60%, transparent 0)`,
        backgroundSize: '1px 10px',
        backgroundRepeat: 'repeat-y',
        minHeight: 22,
      }}
    />
    <svg width="12" height="8" viewBox="0 0 12 8" style={{ flexShrink: 0 }}>
      <path d="M1 1l5 5 5-5" fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const OurProcess: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.08, rootMargin: '0px 0px -4% 0px' })
  const reduceMotion = useReducedMotion()
  const active = inView && !reduceMotion

  return (
    <div ref={ref}>
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <h2 id="process-title" className="text-section-title text-center">
          Our Process
        </h2>
        <p className="section-subtitle text-center mx-auto">
          From your idea to a reliable digital solution
        </p>
      </div>

      <div className="hidden lg:block" style={{ marginTop: 8 }}>
        <OurProcessSvg active={active} />
      </div>

      <ol
        className={`lg:hidden op-list ${active ? 'is-inview' : ''}`}
        style={{ marginTop: 32, listStyle: 'none', padding: 0 }}
      >
        {PROCESS_STEPS.map((step, i) => (
          <li key={step.title.join()} className="op-list-item" style={{ animationDelay: `${0.12 + i * 0.09}s` }}>
            <div className="flex" style={{ gap: 14 }}>
              <div className="flex flex-col items-center" style={{ width: 52, flexShrink: 0 }}>
                <span
                  className="op-list-tile"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${PALE_BLUE}, #DCEBFF)`,
                    border: '1.5px solid #E3EEFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 48 48" width="34" height="34">
                    {step.icon}
                  </svg>
                </span>
                {i < PROCESS_STEPS.length - 1 && <MobileConnector />}
              </div>
              <div
                className="op-list-card"
                style={{
                  flex: 1,
                  background: WHITE,
                  border: '1.5px solid #DCE9FA',
                  borderRadius: 18,
                  padding: '16px 18px',
                  boxShadow: '0 10px 24px -18px rgba(16,38,83,.45)',
                  marginBottom: i < PROCESS_STEPS.length - 1 ? 14 : 0,
                }}
              >
                <h3 className="text-card-title" style={{ color: NAVY, fontSize: '1.05rem', lineHeight: 1.25 }}>
                  {step.title.join(' ')}
                </h3>
                <p style={{ color: GRAY, fontSize: '0.9rem', marginTop: 4 }}>{step.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default OurProcess

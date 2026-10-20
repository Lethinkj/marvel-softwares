import React from 'react'

const BLUE = '#0866F5'
const NAVY = '#102653'
const ORANGE = '#FF6B00'
const LIGHT_BLUE = '#B7DCFF'
const PALE_BLUE = '#EAF4FF'
const GRAY = '#526B8B'
const WHITE = '#FFFFFF'

const IconBase = ({ children }: { children: React.ReactNode }) => (
  <g
    fill="none"
    stroke={BLUE}
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </g>
)

const PeopleIcon = () => (
  <IconBase>
    <circle cx="17" cy="16" r="5.5" fill={WHITE} />
    <path d="M8 36c0-5 4-8.5 9-8.5s9 3.5 9 8.5" />
    <circle cx="32" cy="21" r="4.5" fill={WHITE} />
    <path d="M25 36c0-4.2 3.1-7 7-7s7 2.8 7 7" />
    <rect x="28" y="5" width="16" height="10.5" rx="3.5" fill={WHITE} stroke={ORANGE} />
    <path d="M31 15.5l-1.5 4 5-4" fill={WHITE} stroke={ORANGE} />
    <path d="M32 9.5h8M32 12h5" stroke={ORANGE} strokeWidth={1.6} />
  </IconBase>
)

const ChecklistIcon = () => (
  <IconBase>
    <rect x="10" y="7" width="28" height="36" rx="5" fill={WHITE} />
    <rect x="18" y="4" width="12" height="7" rx="3" fill={LIGHT_BLUE} />
    {[18, 27, 36].map((y) => (
      <g key={y}>
        <path d={`M15 ${y}l2.2 2.2 3.3-3.6`} stroke={ORANGE} />
        <line x1="24" y1={y + 1} x2="34" y2={y + 1} stroke={LIGHT_BLUE} />
      </g>
    ))}
  </IconBase>
)

const RouteIcon = () => (
  <IconBase>
    <path d="M8 38c6 0 4-12 12-12s10 4 12-8" strokeDasharray="4 5" />
    <circle cx="8" cy="38" r="3.2" fill={ORANGE} stroke="none" />
    <circle cx="21" cy="26" r="3" fill={LIGHT_BLUE} />
    <path
      d="M34 5c-4.6 0-8 3.3-8 7.4 0 5.4 8 12.6 8 12.6s8-7.2 8-12.6C42 8.3 38.6 5 34 5z"
      fill={BLUE}
      stroke={BLUE}
    />
    <circle cx="34" cy="12.5" r="3" fill={WHITE} stroke="none" />
  </IconBase>
)

const BrowserConfirmIcon = () => (
  <IconBase>
    <rect x="6" y="9" width="36" height="29" rx="4" fill={WHITE} />
    <line x1="6" y1="17" x2="42" y2="17" />
    <circle cx="11" cy="13" r="1.6" fill={LIGHT_BLUE} stroke="none" />
    <circle cx="16" cy="13" r="1.6" fill={LIGHT_BLUE} stroke="none" />
    <circle cx="21" cy="13" r="1.6" fill={LIGHT_BLUE} stroke="none" />
    <line x1="12" y1="25" x2="26" y2="25" stroke={LIGHT_BLUE} />
    <line x1="12" y1="30" x2="22" y2="30" stroke={LIGHT_BLUE} />
    <circle cx="35" cy="33" r="8" fill={ORANGE} stroke={WHITE} strokeWidth={2.5} />
    <path d="M31.5 33l2.5 2.5 4.5-5" stroke={WHITE} strokeWidth={2.2} />
  </IconBase>
)

const DesignIcon = () => (
  <IconBase>
    <rect x="6" y="8" width="36" height="27" rx="4" fill={WHITE} />
    <line x1="6" y1="16" x2="42" y2="16" />
    <circle cx="11" cy="12" r="1.6" fill={LIGHT_BLUE} stroke="none" />
    <circle cx="16" cy="12" r="1.6" fill={LIGHT_BLUE} stroke="none" />
    <path d="M12 30l6-6 5 5 4-4 8 8" stroke={LIGHT_BLUE} strokeWidth={2.2} />
    <path d="M26 41l2.5-7L38 24.5 43.5 30 34 39.5z" fill={ORANGE} stroke={ORANGE} strokeWidth={1.5} />
    <path d="M26 41l2.5-7 5.5 5.5z" fill={NAVY} stroke={NAVY} strokeWidth={1.2} />
  </IconBase>
)

const CodeIcon = () => (
  <IconBase>
    <rect x="5" y="8" width="38" height="30" rx="4" fill={WHITE} />
    <line x1="5" y1="16" x2="43" y2="16" />
    <circle cx="10" cy="12" r="1.6" fill={LIGHT_BLUE} stroke="none" />
    <circle cx="15" cy="12" r="1.6" fill={LIGHT_BLUE} stroke="none" />
    <path d="M15 23l-4 5 4 5M23 23l4 5-4 5" />
    <line x1="27" y1="21" x2="22" y2="34" />
    <g stroke={ORANGE} strokeWidth={2.2}>
      <circle cx="36" cy="33" r="4.2" fill={WHITE} />
      <line x1="41" y1="33" x2="43" y2="33" />
      <line x1="39.5" y1="36.5" x2="41.9" y2="38.9" />
      <line x1="36" y1="38" x2="36" y2="40" />
      <line x1="32.5" y1="36.5" x2="30.1" y2="38.9" />
      <line x1="31" y1="33" x2="29" y2="33" />
      <line x1="32.5" y1="29.5" x2="30.1" y2="27.1" />
      <line x1="36" y1="28" x2="36" y2="26" />
      <line x1="39.5" y1="29.5" x2="41.9" y2="27.1" />
    </g>
    <circle cx="36" cy="33" r="1.6" fill={ORANGE} stroke="none" />
  </IconBase>
)

const ShieldIcon = () => (
  <IconBase>
    <path
      d="M24 5l15 6v11c0 9.5-6.6 16-15 21C15.6 38 9 31.5 9 22V11z"
      fill={PALE_BLUE}
    />
    <path d="M16.5 22.5l5.2 5.2 10-11" stroke={ORANGE} strokeWidth={3.4} />
  </IconBase>
)

const RocketIcon = () => (
  <IconBase>
    <path
      d="M24 4c6 5 8.5 13 8.5 21L27 31H21l-5.5-6C15.5 17 18 9 24 4z"
      fill={BLUE}
      stroke={BLUE}
    />
    <circle cx="24" cy="18" r="4" fill={WHITE} stroke={LIGHT_BLUE} />
    <path d="M15.5 25L9 33l7.5-1.5z" fill={BLUE} stroke={BLUE} />
    <path d="M32.5 25L39 33l-7.5-1.5z" fill={BLUE} stroke={BLUE} />
    <path d="M24 32c-2.6 3.2-2.6 7 0 11 2.6-4 2.6-7.8 0-11z" fill={ORANGE} stroke={ORANGE} />
  </IconBase>
)

const ToolsIcon = () => (
  <IconBase>
    <path
      d="M45.4 38L27.2 19.8c1.8-4.6.8-10-3-13.8C20.4 2 15.4 1.2 10.6 3.4L18 12l-6 6L3.4 10.6C1.2 15.4 2 20.4 6 24.4c3.8 3.8 9.2 4.8 13.8 3l18.2 18.2c.8.8 2 .8 2.8 0l4.6-4.6c.8-.8.8-2 0-2.8z"
      fill={BLUE}
      stroke={BLUE}
      strokeWidth={1}
    />
    <line x1="32" y1="42" x2="38" y2="36" stroke={ORANGE} strokeWidth={6} />
    <line x1="38" y1="36" x2="44" y2="30" stroke={NAVY} strokeWidth={2.6} />
  </IconBase>
)

interface ProcessStep {
  n: number
  title: string[]
  icon: React.ReactNode
}

const PROCESS_STEPS: ProcessStep[] = [
  { n: 1, title: ['Meet with Client'], icon: <PeopleIcon /> },
  { n: 2, title: ['Requirement', 'Gathering'], icon: <ChecklistIcon /> },
  { n: 3, title: ['Project Planning'], icon: <RouteIcon /> },
  { n: 4, title: ['Homepage', 'Confirmation'], icon: <BrowserConfirmIcon /> },
  { n: 5, title: ['UI/UX Design'], icon: <DesignIcon /> },
  { n: 6, title: ['Development &', 'Progress Updates'], icon: <CodeIcon /> },
  { n: 7, title: ['Testing &', 'Quality Assurance'], icon: <ShieldIcon /> },
  { n: 8, title: ['Launch'], icon: <RocketIcon /> },
  { n: 9, title: ['Maintenance &', 'Support'], icon: <ToolsIcon /> },
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
const CARD_RX = 20

const HorizontalArrow = ({ row, from, to }: { row: number; from: number; to: number }) => {
  const y = ROW_Y[row] + CARD_H / 2
  const dir = to > from ? 1 : -1
  const start = from + 8 * dir
  const tip = to - 4 * dir
  const base = tip - 14 * dir
  return (
    <g>
      <line x1={start} y1={y} x2={base} y2={y} stroke={BLUE} strokeWidth={3.5} strokeLinecap="round" />
      <path d={`M${base} ${y - 8} L${tip} ${y} L${base} ${y + 8} Z`} fill={BLUE} />
    </g>
  )
}

export const OurProcessSvg: React.FC<{ className?: string }> = ({
  className = 'w-full h-auto',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1600 1000"
    width="100%"
    height="auto"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-labelledby="op-title op-desc"
    fontFamily="Inter, Arial, sans-serif"
    className={`our-process-svg ${className}`}
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
      <linearGradient id="op-badge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={BLUE} />
        <stop offset="100%" stopColor="#0550C8" />
      </linearGradient>
    </defs>

    <rect width="1600" height="1000" fill={WHITE} />

    <line x1="455" y1="78" x2="588" y2="78" stroke={LIGHT_BLUE} strokeWidth="3" strokeLinecap="round" />
    <circle cx="588" cy="78" r="4" fill={BLUE} />
    <line x1="1012" y1="78" x2="1145" y2="78" stroke={LIGHT_BLUE} strokeWidth="3" strokeLinecap="round" />
    <circle cx="1012" cy="78" r="4" fill={BLUE} />

    <text x="800" y="96" textAnchor="middle" fontSize="56" fontWeight="800" letterSpacing="0.5">
      <tspan fill={NAVY}>OUR</tspan>
      <tspan dx="14" fill={BLUE}>PROCESS</tspan>
    </text>
    <text x="800" y="140" textAnchor="middle" fontSize="23" fontWeight="500" fill={GRAY}>
      From your idea to a reliable digital solution
    </text>

    <g aria-hidden="true">
      <HorizontalArrow row={0} from={COL_X[0] + CARD_W} to={COL_X[1]} />
      <HorizontalArrow row={0} from={COL_X[1] + CARD_W} to={COL_X[2]} />

      <HorizontalArrow row={1} from={COL_X[2]} to={COL_X[1] + CARD_W} />
      <HorizontalArrow row={1} from={COL_X[1]} to={COL_X[0] + CARD_W} />

      <HorizontalArrow row={2} from={COL_X[0] + CARD_W} to={COL_X[1]} />
      <HorizontalArrow row={2} from={COL_X[1] + CARD_W} to={COL_X[2]} />

      <path
        d="M1460 285 H1502 Q1522 285 1522 305 V557 Q1522 577 1502 577 H1474"
        fill="none"
        stroke={BLUE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M1474 569 L1460 577 L1474 585 Z" fill={BLUE} />

      <path
        d="M140 577 H98 Q78 577 78 597 V849 Q78 869 98 869 H126"
        fill="none"
        stroke={BLUE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M126 861 L140 869 L126 877 Z" fill={BLUE} />
    </g>

    {PROCESS_STEPS.map((step, i) => {
      const [row, col] = POS[i]
      const x = COL_X[col]
      const y = ROW_Y[row]
      const cy = y + CARD_H / 2
      const twoLines = step.title.length > 1
      return (
        <g key={step.n}>
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
          <circle cx={x + 40} cy={cy} r="30" fill="none" stroke={LIGHT_BLUE} strokeWidth="2" opacity="0.7" />
          <circle cx={x + 40} cy={cy} r="24" fill="url(#op-badge)" />
          <text
            x={x + 40}
            y={cy + 8}
            textAnchor="middle"
            fontSize="24"
            fontWeight="800"
            fill={WHITE}
          >
            {step.n}
          </text>

          <rect x={x + 74} y={cy - 28} width={56} height={56} rx={14} fill={PALE_BLUE} />
          <svg x={x + 81} y={cy - 21} width={42} height={42} viewBox="0 0 48 48" aria-hidden="true">
            {step.icon}
          </svg>

          <line
            x1={x + 142}
            y1={cy - 36}
            x2={x + 142}
            y2={cy + 36}
            stroke="#DCE9FA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {step.title.map((line, li) => (
            <text
              key={line}
              x={x + 158}
              y={twoLines ? cy - 6 + li * 27 : cy + 7}
              fontSize="20"
              fontWeight="700"
              fill={NAVY}
            >
              {line}
            </text>
          ))}
        </g>
      )
    })}
  </svg>
)

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

export const OurProcess: React.FC = () => (
  <div>
    <h2
      id="process-title"
      className="text-center lg:sr-only"
      style={{
        margin: 0,
        fontWeight: 800,
        fontSize: 'clamp(1.7rem, 7vw, 2.4rem)',
        letterSpacing: '0.01em',
      }}
    >
      <span style={{ color: NAVY }}>OUR </span>
      <span style={{ color: BLUE }}>PROCESS</span>
    </h2>
    <p
      className="lg:hidden text-center"
      style={{ color: GRAY, marginTop: 8, fontSize: '0.98rem', fontWeight: 500 }}
    >
      From your idea to a reliable digital solution
    </p>

    <div className="hidden lg:block" style={{ marginTop: 8 }}>
      <OurProcessSvg />
    </div>

    <ol className="lg:hidden" style={{ marginTop: 32, listStyle: 'none', padding: 0 }}>
      {PROCESS_STEPS.map((step, i) => (
        <li key={step.n} className="flex" style={{ gap: 14 }}>
          <div className="flex flex-col items-center" style={{ width: 48, flexShrink: 0 }}>
            <span
              className="flex items-center justify-center rounded-full text-white"
              style={{
                width: 44,
                height: 44,
                background: BLUE,
                fontWeight: 800,
                fontSize: '1.05rem',
                boxShadow: '0 6px 16px -8px rgba(8,102,245,.8)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {step.n}
            </span>
            {i < PROCESS_STEPS.length - 1 && <MobileConnector />}
          </div>
          <div
            className="flex-1 flex items-center"
            style={{
              gap: 14,
              background: WHITE,
              border: '1.5px solid #DCE9FA',
              borderRadius: 18,
              padding: '16px 18px',
              boxShadow: '0 10px 24px -18px rgba(16,38,83,.45)',
              marginBottom: i < PROCESS_STEPS.length - 1 ? 14 : 0,
            }}
          >
            <span
              className="flex items-center justify-center rounded-xl shrink-0"
              style={{ width: 52, height: 52, background: PALE_BLUE }}
            >
              <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
                {step.icon}
              </svg>
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase" style={{ color: BLUE, letterSpacing: '0.1em' }}>
                Step {step.n}
              </span>
              <h3 className="text-card-title" style={{ color: NAVY, marginTop: 2, fontSize: '1.05rem', lineHeight: 1.25 }}>
                {step.title.join(' ')}
              </h3>
            </div>
          </div>
        </li>
      ))}
    </ol>
  </div>
)

export default OurProcess

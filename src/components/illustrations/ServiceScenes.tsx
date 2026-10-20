import React from 'react'

/* ============================================================
   SERVICE SCENES — custom "dev workspace" illustrations
   One scene per home-page service. Every scene shares the same
   visual language: soft brand blob, orbital paths, a central
   device cluster and floating service cards (icon tile + label),
   built with gradients + soft shadows so it reads as depth.
   ============================================================ */

const BLUE = '#0057E7'
const NAVY = '#001F80'
const CYAN = '#00CFFF'
const ORANGE = '#FF5A00'
const YELLOW = '#FFB800'
const GREEN = '#00C42B'
const INK = '#172033'
const MUTED = '#8EA0BF'
const LINE = '#D9E5F5'

export type GlyphName =
  | 'code' | 'palette' | 'mobile' | 'chart' | 'cloud' | 'db' | 'gear' | 'rocket'
  | 'shield' | 'chat' | 'bolt' | 'globe' | 'search' | 'users' | 'box' | 'invoice'
  | 'flow' | 'lock' | 'grid' | 'bell' | 'ai' | 'monitor' | 'pen' | 'cart' | 'swap'

const GLYPH: Record<GlyphName, React.ReactNode> = {
  code: (
    <>
      <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 100 18h1.4a2 2 0 001.7-3 2 2 0 011.7-3H18a3 3 0 003-3 9 9 0 00-9-9z" />
      <circle cx="7.8" cy="11.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.6" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="7" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  mobile: (
    <>
      <path d="M7.5 2.5h9a2 2 0 012 2v15a2 2 0 01-2 2h-9a2 2 0 01-2-2v-15a2 2 0 012-2z" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20v-6M10 20V8M16 20v-9M21 20H3" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5h10.2a4.3 4.3 0 00.6-8.55A6 6 0 006.9 8.1 4.2 4.2 0 007 18.5z" />
    </>
  ),
  db: (
    <>
      <path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3.2M12 18.3v3.2M2.5 12h3.2M18.3 12h3.2M5.2 5.2l2.3 2.3M16.5 16.5l2.3 2.3M18.8 5.2l-2.3 2.3M7.5 16.5l-2.3 2.3" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3 2.6 4.6 6.1 4.6 10.6L15 17.2H9l-1.6-3.6C7.4 9.1 9 5.6 12 3z" />
      <circle cx="12" cy="10" r="1.9" />
      <path d="M9 17.2l-2 3.3M15 17.2l2 3.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.8v5.4c0 4.4-3 7.5-7 9.8-4-2.3-7-5.4-7-9.8V5.8z" />
      <path d="M9 12l2.2 2.2L15.4 10" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12a7.5 7.5 0 01-7.5 7.5H8l-4.5 3.2V12A7.5 7.5 0 018.5 4.5h4.5a7.5 7.5 0 017.5 7.5z" />
      <path d="M8.5 11h7M8.5 14.5h4" />
    </>
  ),
  bolt: (
    <>
      <path d="M13.5 2.5L5 14h6l-1 7.5L19 10h-6z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12h17.2" />
      <path d="M12 3.4c2.4 2.3 3.6 5.2 3.6 8.6S14.4 18.3 12 20.6c-2.4-2.3-3.6-5.2-3.6-8.6S9.6 5.7 12 3.4z" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.4" />
      <path d="M15.6 15.6L20.5 20.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.6" r="3.4" />
      <path d="M2.8 20c0-3.4 2.8-5.8 6.2-5.8s6.2 2.4 6.2 5.8" />
      <path d="M16.4 5.6a3.4 3.4 0 010 6.2M18 14.6c2 .8 3.2 2.6 3.2 5.4" />
    </>
  ),
  box: (
    <>
      <path d="M3 7.8l9-4.8 9 4.8v8.4l-9 4.8-9-4.8z" />
      <path d="M3 7.8l9 4.8 9-4.8M12 12.6V21" />
    </>
  ),
  invoice: (
    <>
      <path d="M6 2.8h12v18.4l-3-2.2-3 2.2-3-2.2-3 2.2z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="3" width="7" height="6" rx="2" />
      <rect x="14" y="15" width="7" height="6" rx="2" />
      <path d="M6.5 9v6.5h11" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="11" rx="3" />
      <path d="M8 10V7.5a4 4 0 018 0V10" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
    </>
  ),
  bell: (
    <>
      <path d="M12 3a5.6 5.6 0 015.6 5.6V13l2 3H4.4l2-3V8.6A5.6 5.6 0 0112 3z" />
      <path d="M10 19.4a2.2 2.2 0 004 0" />
    </>
  ),
  ai: (
    <>
      <path d="M12 2.6l2 4.9 4.9 2-4.9 2-2 4.9-2-4.9-4.9-2 4.9-2z" />
      <path d="M18.5 16.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.8" y="4" width="18.4" height="12.4" rx="2.6" />
      <path d="M9 20.5h6M12 16.4v4.1" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l4.6-1.1L19 8.4a2.1 2.1 0 10-3-3L5.5 15.9z" />
      <path d="M14.4 6.6l3 3" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.6l2.3 11h9.6l2.1-8H7" />
      <circle cx="9.5" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
    </>
  ),
  swap: (
    <>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </>
  ),
}

const Glyph: React.FC<{ name: GlyphName; size?: number }> = ({ name, size = 24 }) => (
  <g
    transform={`scale(${size / 24})`}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {GLYPH[name]}
  </g>
)

interface SceneProps {
  className?: string
  id: string
}

const useShadow = (id: string) => (
  <filter id={`${id}-sh`} x="-30%" y="-30%" width="170%" height="170%">
    <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0033A0" floodOpacity="0.16" />
  </filter>
)

/* ---------- shared pieces ---------- */

const FloatCard: React.FC<{
  id: string
  x: number
  y: number
  w?: number
  tone: string
  glyph: GlyphName
  label: string
  delay?: number
}> = ({ id, x, y, w = 172, tone, glyph, label, delay = 0 }) => (
  <g className="svg-float" style={{ animationDelay: `${delay}s` }} filter={`url(#${id}-sh)`}>
    <rect x={x} y={y} width={w} height={70} rx={18} fill="#fff" stroke="#E4EBF7" strokeWidth={1.5} />
    <rect x={x + 13} y={y + 14} width={42} height={42} rx={13} fill={tone} />
    <g transform={`translate(${x + 22} ${y + 23})`} color="#fff">
      <Glyph name={glyph} size={24} />
    </g>
    <text
      x={x + 66}
      y={y + 32}
      fontSize={13.5}
      fontWeight={800}
      fill={INK}
      fontFamily="Inter, sans-serif"
    >
      {label}
    </text>
    <rect x={x + 66} y={y + 40} width={w - 82} height={6} rx={3} fill="#CBD6E8" />
    <rect x={x + 66} y={y + 52} width={(w - 82) * 0.58} height={6} rx={3} fill="#E2E9F5" />
  </g>
)

const SceneShell: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <>
    <defs>
      {useShadow(id)}
      <linearGradient id={`${id}-blob`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EAF4FF" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#F4F8FF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFF6EE" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E8F3FF" />
        <stop offset="100%" stopColor="#F7FAFF" />
      </linearGradient>
      <linearGradient id={`${id}-deep`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0B1530" />
        <stop offset="100%" stopColor="#16233F" />
      </linearGradient>
    </defs>

    {/* soft brand blob + orbit */}
    <ellipse cx="320" cy="270" rx="292" ry="208" fill={`url(#${id}-blob)`} />
    <g aria-hidden="true" fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="5 10">
      <ellipse cx="320" cy="268" rx="286" ry="176" transform="rotate(-10 320 268)" />
    </g>
    <g aria-hidden="true">
      <circle cx="62" cy="86" r="9" fill={BLUE} opacity="0.14" />
      <circle cx="574" cy="120" r="7" fill={ORANGE} opacity="0.3" />
      <circle cx="596" cy="392" r="11" fill={CYAN} opacity="0.2" />
      <circle cx="52" cy="416" r="7" fill={YELLOW} opacity="0.45" />
      <circle cx="300" cy="26" r="6" fill={ORANGE} opacity="0.5" />
    </g>

    {children}
  </>
)

const SceneSvg: React.FC<{ id: string; label: string; children: React.ReactNode }> = ({
  id,
  label,
  children,
}) => (
  <svg
    viewBox="0 0 640 520"
    role="img"
    aria-label={label}
    className="w-full h-auto select-none"
    style={{ overflow: 'visible' }}
  >
    <SceneShell id={id}>{children}</SceneShell>
  </svg>
)

/* ---------- 1. Website development ---------- */

export const WebsiteScene: React.FC<SceneProps> = ({ className = 'w-full h-auto', id = 'sc-web' }) => (
  <div className={className}>
    <SceneSvg id={id} label="Website being designed and built in a browser with responsive, SEO and speed badges">
      {/* cloud + upload */}
      <g className="svg-float" filter={`url(#${id}-sh)`}>
        <path
          d="M150 62c-9 0-16 6-17 14a14 14 0 005 27h44a13 13 0 001-26 18 18 0 00-33-15z"
          fill="#fff"
          stroke={BLUE}
          strokeWidth={2.5}
        />
        <path d="M170 118V84m0 0l-11 12m11-12l11 12" stroke={CYAN} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* browser */}
      <g filter={`url(#${id}-sh)`}>
        <rect x={168} y={104} width={310} height={224} rx={18} fill="#fff" stroke="#DCE5F5" strokeWidth={2} />
        <rect x={168} y={104} width={310} height={34} rx={18} fill={`url(#${id}-sky)`} />
        <rect x={168} y={121} width={310} height={17} fill={`url(#${id}-sky)`} />
        <circle cx={188} cy={121} r={5} fill={ORANGE} />
        <circle cx={205} cy={121} r={5} fill={YELLOW} />
        <circle cx={222} cy={121} r={5} fill={GREEN} />
        <rect x={248} y={112} width={120} height={18} rx={9} fill="#fff" stroke="#E2E9F5" />
        <circle cx={452} cy={121} r={7} fill={BLUE} opacity={0.2} />
        <circle cx={452} cy={121} r={3.4} fill={BLUE} />
      </g>

      {/* landing page content */}
      <g>
        <rect x={186} y={156} width={58} height={11} rx={5.5} fill={INK} />
        <rect x={258} y={159} width={30} height={6} rx={3} fill={MUTED} />
        <rect x={296} y={159} width={30} height={6} rx={3} fill={MUTED} />
        <rect x={402} y={150} width={58} height={22} rx={11} fill={BLUE} />
        <rect x={186} y={186} width={130} height={16} rx={8} fill={INK} />
        <rect x={186} y={210} width={180} height={7} rx={3.5} fill="#CBD6E8" />
        <rect x={186} y={224} width={140} height={7} rx={3.5} fill="#E2E9F5" />
        <rect x={186} y={244} width={92} height={28} rx={14} fill={ORANGE} />
        <rect x={206} y={254} width={52} height={8} rx={4} fill="#fff" />
        <rect x={290} y={244} width={80} height={28} rx={14} fill="#fff" stroke={BLUE} strokeWidth={2} />
        {/* hero visual */}
        <rect x={380} y={182} width={82} height={96} rx={14} fill={`url(#${id}-sky)`} stroke="#E2E9F5" />
        <circle cx={421} cy={206} r={11} fill={YELLOW} opacity={0.85} />
        <path d="M392 258l22-24 16 16 12-10 12 18z" fill={BLUE} opacity={0.75} />
      </g>

      {/* feature row */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={186 + i * 92} y={296} width={80} height={22} rx={8} fill="#F1F5FB" />
          <circle cx={200 + i * 92} cy={307} r={5} fill={[BLUE, ORANGE, CYAN][i]} />
          <rect x={210 + i * 92} y={303} width={40} height={7} rx={3.5} fill="#CBD6E8" />
        </g>
      ))}

      {/* phone */}
      <g className="svg-float" style={{ animationDelay: '1.1s' }} filter={`url(#${id}-sh)`}>
        <rect x={428} y={262} width={70} height={132} rx={16} fill="#0B1530" />
        <rect x={433} y={267} width={60} height={122} rx={13} fill="#fff" />
        <rect x={452} y={272} width={22} height={6} rx={3} fill="#0B1530" />
        <rect x={440} y={284} width={46} height={8} rx={4} fill={INK} />
        <rect x={440} y={298} width={46} height={40} rx={8} fill={BLUE} opacity={0.85} />
        <rect x={440} y={346} width={26} height={6} rx={3} fill="#E2E9F5" />
        <rect x={440} y={358} width={46} height={20} rx={10} fill={ORANGE} />
      </g>

      {/* paper plane */}
      <g className="svg-float" style={{ animationDelay: '1.7s' }}>
        <path d="M512 74l52-22-16 52-14-18z" fill={CYAN} opacity={0.9} />
        <path d="M534 86l30-34" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
      </g>

      <FloatCard id={id} x={30} y={168} tone={BLUE} glyph="mobile" label="Responsive" delay={0.2} />
      <FloatCard id={id} x={430} y={412} tone={ORANGE} glyph="search" label="SEO Ready" delay={0.7} w={162} />
      <FloatCard id={id} x={214} y={392} tone={CYAN} glyph="bolt" label="Fast Load" delay={1.2} w={158} />
    </SceneSvg>
  </div>
)

/* ---------- 2. Web application ---------- */

export const WebAppScene: React.FC<SceneProps> = ({ className = 'w-full h-auto', id = 'sc-wapp' }) => (
  <div className={className}>
    <SceneSvg id={id} label="Web application dashboard with analytics, admin panel and real-time workflow cards">
      {/* app window */}
      <g filter={`url(#${id}-sh)`}>
        <rect x={150} y={96} width={344} height={244} rx={18} fill="#fff" stroke="#DCE5F5" strokeWidth={2} />
        <rect x={150} y={96} width={78} height={244} rx={18} fill={`url(#${id}-deep)`} />
        <rect x={212} y={96} width={16} height={244} fill="#16233F" />
        <circle cx={189} cy={126} r={13} fill={CYAN} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={168} y={156 + i * 24} width={42} height={8} rx={4} fill="#fff" opacity={i === 0 ? 0.95 : 0.4} />
        ))}
        <rect x={166} y={272} width={44} height={24} rx={9} fill={ORANGE} />
        <rect x={240} y={110} width={150} height={20} rx={10} fill="#F1F5FB" />
        <circle cx={256} cy={120} r={6} fill="#CBD6E8" />
        <rect x={270} y={117} width={80} height={6} rx={3} fill="#CBD6E8" />
        <circle cx={470} cy={120} r={11} fill={BLUE} />
      </g>

      {/* KPI cards */}
      {[
        { x: 240, v: '24.8k', c: BLUE },
        { x: 320, v: '98.2%', c: GREEN },
        { x: 400, v: '$61k', c: ORANGE },
      ].map((k) => (
        <g key={k.x}>
          <rect x={k.x} y={142} width={70} height={48} rx={10} fill="#F7FAFF" stroke="#E6EDF8" />
          <text x={k.x + 11} y={165} fontSize={14} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">
            {k.v}
          </text>
          <rect x={k.x + 11} y={173} width={34} height={5} rx={2.5} fill={k.c} opacity={0.6} />
        </g>
      ))}

      {/* chart */}
      <rect x={240} y={204} width={230} height={118} rx={12} fill="#F7FAFF" stroke="#E6EDF8" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={252} y1={228 + i * 26} x2={458} y2={228 + i * 26} stroke="#E6EDF8" strokeWidth={1.5} />
      ))}
      {[40, 66, 48, 82, 62, 94, 74].map((h, i) => (
        <rect
          key={i}
          x={258 + i * 28}
          y={308 - h}
          width={15}
          height={h}
          rx={4}
          fill={i === 4 ? ORANGE : BLUE}
          opacity={i === 4 ? 1 : 0.75}
        />
      ))}
      <path
        d="M256 262l30-24 26 14 28-30 26 12 30-22 34 14"
        fill="none"
        stroke={CYAN}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={396} cy={222} r={6} fill={ORANGE} className="svg-pulse" />

      {/* terminal card */}
      <g className="svg-float" style={{ animationDelay: '1.1s' }} filter={`url(#${id}-sh)`}>
        <rect x={96} y={356} width={196} height={104} rx={16} fill={`url(#${id}-deep)`} />
        <circle cx={118} cy={378} r={4.5} fill={ORANGE} />
        <circle cx={133} cy={378} r={4.5} fill={YELLOW} />
        <circle cx={148} cy={378} r={4.5} fill={GREEN} />
        <g fontFamily="JetBrains Mono, monospace" fontSize={11}>
          <text x={116} y={406} fill="#FF7A45">const</text>
          <text x={152} y={406} fill="#fff">app =</text>
          <text x={192} y={406} fill={CYAN}>saas()</text>
          <text x={116} y={428} fill="#8EA0BF">{'{ users, roles }'}</text>
        </g>
      </g>

      <FloatCard id={id} x={44} y={104} tone={BLUE} glyph="grid" label="Admin Panel" delay={0.2} />
      <FloatCard id={id} x={452} y={188} tone={ORANGE} glyph="bolt" label="Real-time" delay={0.8} w={152} />
      <FloatCard id={id} x={318} y={404} tone={CYAN} glyph="flow" label="Workflows" delay={1.3} w={158} />
      <FloatCard id={id} x={408} y={86} tone={NAVY} glyph="lock" label="Roles & Access" delay={1.7} w={172} />
    </SceneSvg>
  </div>
)

/* ---------- 3. Mobile app ---------- */

export const MobileScene: React.FC<SceneProps> = ({ className = 'w-full h-auto', id = 'sc-mob' }) => (
  <div className={className}>
    <SceneSvg id={id} label="Mobile application running on a phone and tablet with push notification and store release cards">
      {/* cloud download */}
      <g className="svg-float" filter={`url(#${id}-sh)`}>
        <path
          d="M104 78c-10 0-18 7-19 16a15 15 0 006 29h46a14 14 0 001-28 19 19 0 00-34-17z"
          fill="#fff"
          stroke={CYAN}
          strokeWidth={2.5}
        />
        <path d="M126 142V104m0 0l-11 12m11-12l11 12" stroke={BLUE} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* tablet behind */}
      <g className="svg-float" style={{ animationDelay: '0.9s' }} filter={`url(#${id}-sh)`}>
        <rect x={394} y={158} width={182} height={216} rx={22} fill="#0B1530" />
        <rect x={400} y={164} width={170} height={204} rx={17} fill="#fff" />
        <rect x={416} y={182} width={86} height={10} rx={5} fill={INK} />
        <rect x={416} y={200} width={138} height={74} rx={10} fill={`url(#${id}-sky)`} />
        <path d="M424 258l28-30 20 20 16-14 24 24z" fill={BLUE} opacity={0.7} />
        <rect x={416} y={286} width={64} height={24} rx={12} fill={ORANGE} />
        <rect x={490} y={286} width={64} height={24} rx={12} fill="#F1F5FB" />
        <rect x={416} y={322} width={138} height={10} rx={5} fill="#E2E9F5" />
        <rect x={416} y={340} width={96} height={10} rx={5} fill="#F1F5FB" />
      </g>

      {/* phone */}
      <g filter={`url(#${id}-sh)`}>
        <rect x={228} y={62} width={164} height={342} rx={36} fill="#0B1530" />
        <rect x={236} y={70} width={148} height={326} rx={30} fill="#fff" />
        <rect x={278} y={78} width={64} height={12} rx={6} fill="#0B1530" />
        <rect x={254} y={106} width={92} height={13} rx={6.5} fill={INK} />
        <rect x={254} y={128} width={112} height={96} rx={14} fill={`url(#${id}-sky)`} />
        <circle cx={272} cy={150} r={10} fill={YELLOW} opacity={0.9} />
        <path d="M262 208l26-28 20 20 16-14 22 22z" fill={BLUE} opacity={0.75} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={254} y={238 + i * 26} width={112} height={18} rx={9} fill="#F7FAFF" stroke="#E6EDF8" />
            <circle cx={266} cy={247 + i * 26} r={5} fill={[BLUE, ORANGE, CYAN][i]} />
            <rect x={278} y={243 + i * 26} width={56} height={6} rx={3} fill="#CBD6E8" />
          </g>
        ))}
        <rect x={254} y={322} width={112} height={30} rx={15} fill={ORANGE} />
        <rect x={278} y={332} width={64} height={9} rx={4.5} fill="#fff" />
        <g>
          <rect x={254} y={364} width={112} height={22} rx={11} fill="#F1F5FB" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={272 + i * 26} cy={375} r={5} fill={i === 0 ? BLUE : '#CBD6E8'} />
          ))}
        </g>
      </g>

      {/* notification toast */}
      <g className="svg-float" style={{ animationDelay: '1.4s' }} filter={`url(#${id}-sh)`}>
        <rect x={404} y={72} width={186} height={62} rx={16} fill="#fff" stroke="#E4EBF7" strokeWidth={1.5} />
        <rect x={418} y={86} width={38} height={38} rx={12} fill={ORANGE} />
        <g transform="translate(425 93)" color="#fff">
          <Glyph name="bell" size={24} />
        </g>
        <text x={468} y={90} fontSize={11.5} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">
          New message
        </text>
        <rect x={468} y={98} width={104} height={7} rx={3.5} fill="#CBD6E8" />
        <rect x={468} y={111} width={72} height={6} rx={3} fill="#E2E9F5" />
        <circle cx={574} cy={80} r={6} fill={ORANGE} className="svg-pulse" />
      </g>

      <FloatCard id={id} x={46} y={220} tone={GREEN} glyph="mobile" label="Android" delay={0.3} w={152} />
      <FloatCard id={id} x={56} y={376} tone={NAVY} glyph="lock" label="Secure Login" delay={0.9} w={162} />
      <FloatCard id={id} x={452} y={400} tone={ORANGE} glyph="cart" label="App Store" delay={1.4} w={158} />
    </SceneSvg>
  </div>
)

/* ---------- 4. ERP & business software ---------- */

export const ErpScene: React.FC<SceneProps> = ({ className = 'w-full h-auto', id = 'sc-erp' }) => (
  <div className={className}>
    <SceneSvg id={id} label="ERP system connecting inventory, billing, people and reporting modules">
      {/* connectors */}
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M320 240 L138 188M320 240 L502 188M320 250 L138 358M320 250 L502 358" stroke={LINE} strokeWidth={3} />
        <path d="M320 240 L138 188" stroke={BLUE} strokeWidth={3} className="svg-flow" />
        <path d="M320 250 L502 358" stroke={ORANGE} strokeWidth={3} className="svg-flow" />
      </g>

      {/* hub */}
      <g className="svg-float" filter={`url(#${id}-sh)`}>
        <rect x={226} y={166} width={188} height={112} rx={22} fill={`url(#${id}-deep)`} />
        <rect x={232} y={172} width={176} height={100} rx={18} fill={BLUE} opacity={0.92} />
        <circle cx={258} cy={200} r={9} fill={CYAN} className="svg-pulse" />
        <text x={276} y={206} fontSize={18} fontWeight={800} fill="#fff" fontFamily="Inter, sans-serif">
          MARVEL ERP
        </text>
        <rect x={252} y={224} width={116} height={10} rx={5} fill="#fff" opacity={0.75} />
        <rect x={252} y={242} width={80} height={8} rx={4} fill="#fff" opacity={0.45} />
        <rect x={252} y={256} width={140} height={10} rx={5} fill="#fff" opacity={0.25} />
      </g>

      {/* modules */}
      {[
        { x: 68, y: 150, t: 'Inventory', g: 'box' as GlyphName, c: BLUE },
        { x: 432, y: 150, t: 'Billing', g: 'invoice' as GlyphName, c: ORANGE },
        { x: 68, y: 320, t: 'People', g: 'users' as GlyphName, c: CYAN },
        { x: 432, y: 320, t: 'Reports', g: 'chart' as GlyphName, c: GREEN },
      ].map((m, i) => (
        <g key={m.t} className="svg-float" style={{ animationDelay: `${0.3 + i * 0.3}s` }} filter={`url(#${id}-sh)`}>
          <rect x={m.x} y={m.y} width={140} height={76} rx={18} fill="#fff" stroke="#E4EBF7" strokeWidth={1.5} />
          <rect x={m.x + 14} y={m.y + 16} width={44} height={44} rx={14} fill={m.c} />
          <g transform={`translate(${m.x + 24} ${m.y + 26})`} color="#fff">
            <Glyph name={m.g} size={24} />
          </g>
          <text x={m.x + 68} y={m.y + 36} fontSize={13.5} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">
            {m.t}
          </text>
          <rect x={m.x + 68} y={m.y + 45} width={58} height={6} rx={3} fill="#CBD6E8" />
          <rect x={m.x + 14} y={m.y + 62} width={44} height={6} rx={3} fill={m.c} opacity={0.35} />
        </g>
      ))}

      {/* stack of boxes */}
      <g className="svg-float" style={{ animationDelay: '1.2s' }} filter={`url(#${id}-sh)`}>
        <rect x={250} y={368} width={140} height={72} rx={14} fill="#fff" stroke="#E4EBF7" strokeWidth={1.5} />
        <path d="M268 424l22-22 18 18 14-12 20 16z" fill={BLUE} opacity={0.25} />
        <rect x={268} y={378} width={70} height={9} rx={4.5} fill={INK} opacity={0.8} />
        <rect x={268} y={394} width={48} height={7} rx={3.5} fill="#CBD6E8" />
      </g>

      <FloatCard id={id} x={52} y={40} tone={NAVY} glyph="db" label="One Database" delay={0.5} w={162} />
      <FloatCard id={id} x={452} y={48} tone={ORANGE} glyph="chart" label="Live Reports" delay={1} w={162} />
    </SceneSvg>
  </div>
)

/* ---------- 5. Custom software ---------- */

export const CustomScene: React.FC<SceneProps> = ({ className = 'w-full h-auto', id = 'sc-cus' }) => (
  <div className={className}>
    <SceneSvg id={id} label="Custom software project with a code editor, automation workflow and integration cards">
      {/* code editor */}
      <g className="svg-float" filter={`url(#${id}-sh)`}>
        <rect x={150} y={92} width={262} height={226} rx={18} fill={`url(#${id}-deep)`} />
        <rect x={150} y={92} width={262} height={34} rx={18} fill="#16233F" />
        <rect x={150} y={108} width={262} height={18} fill="#16233F" />
        <circle cx={172} cy={109} r={5} fill={ORANGE} />
        <circle cx={189} cy={109} r={5} fill={YELLOW} />
        <circle cx={206} cy={109} r={5} fill={GREEN} />
        <rect x={234} y={100} width={110} height={18} rx={9} fill="#fff" opacity={0.08} />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize={12}>
        <text x={170} y={158} fill="#FF7A45">const</text>
        <text x={210} y={158} fill="#fff">workflow =</text>
        <text x={282} y={158} fill={CYAN}>build()</text>
        <text x={170} y={184} fill="#8EA0BF">{'if (order.paid) {'}</text>
        <text x={186} y={208} fill={GREEN}>→ fulfil(order)</text>
        <text x={186} y={232} fill={YELLOW}>→ notify(team)</text>
        <text x={170} y={256} fill="#8EA0BF">{'}'}</text>
        <text x={186} y={280} fill="#FF7A45">return</text>
        <text x={234} y={280} fill="#fff">ship()</text>
      </g>
      <rect x={286} y={268} width={11} height={17} fill={ORANGE}>
        <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
      </rect>

      {/* workflow stack */}
      <g className="svg-float" style={{ animationDelay: '1s' }} filter={`url(#${id}-sh)`}>
        <rect x={408} y={116} width={186} height={190} rx={18} fill="#fff" stroke="#E4EBF7" strokeWidth={1.5} />
        <rect x={426} y={136} width={150} height={44} rx={12} fill="#F1F5FB" stroke={BLUE} strokeWidth={2} />
        <circle cx={446} cy={158} r={9} fill={BLUE} />
        <rect x={462} y={153} width={84} height={9} rx={4.5} fill={INK} opacity={0.8} />
        <line x1={501} y1={180} x2={501} y2={196} stroke="#CBD6E8" strokeWidth={3} />
        <rect x={426} y={196} width={150} height={44} rx={12} fill="#FFF7E8" stroke={YELLOW} strokeWidth={2} />
        <circle cx={446} cy={218} r={9} fill={YELLOW} />
        <rect x={462} y={213} width={76} height={9} rx={4.5} fill={INK} opacity={0.8} />
        <line x1={501} y1={240} x2={501} y2={256} stroke="#CBD6E8" strokeWidth={3} />
        <rect x={426} y={256} width={150} height={34} rx={12} fill={BLUE} />
        <rect x={446} y={269} width={70} height={8} rx={4} fill="#fff" />
      </g>

      {/* gear */}
      <g className="svg-float" style={{ animationDelay: '1.5s' }}>
        <g transform="translate(64 336) scale(1.4)" color={ORANGE} opacity={0.9}>
          <Glyph name="gear" size={24} />
        </g>
      </g>

      <FloatCard id={id} x={8} y={150} tone={ORANGE} glyph="bolt" label="Automation" delay={0.3} w={150} />
      <FloatCard id={id} x={404} y={356} tone={BLUE} glyph="swap" label="Legacy Migration" delay={0.9} w={186} />
      <FloatCard id={id} x={190} y={368} tone={CYAN} glyph="globe" label="API Bridge" delay={1.4} w={158} />
    </SceneSvg>
  </div>
)

/* ---------- 6. AI & automation ---------- */

export const AiScene: React.FC<SceneProps> = ({ className = 'w-full h-auto', id = 'sc-ai' }) => (
  <div className={className}>
    <SceneSvg id={id} label="AI assistant answering questions with cited sources, insights and automation cards">
      {/* neural nodes */}
      <g aria-hidden="true" fill="none" stroke={LINE} strokeWidth={2}>
        <path d="M486 140l76-12M486 140l32 46M540 246l-14 80M540 246l34 50" />
      </g>
      <g className="svg-float" style={{ animationDelay: '0.6s' }}>
        <circle cx={486} cy={140} r={9} fill={CYAN} opacity={0.85} />
        <circle cx={562} cy={128} r={7} fill={BLUE} opacity={0.8} />
        <circle cx={518} cy={186} r={7} fill={ORANGE} opacity={0.85} />
        <circle cx={526} cy={326} r={9} fill={CYAN} opacity={0.7} />
        <circle cx={574} cy={296} r={6} fill={ORANGE} opacity={0.7} />
      </g>

      {/* chat panel */}
      <g filter={`url(#${id}-sh)`}>
        <rect x={176} y={104} width={280} height={250} rx={20} fill="#fff" stroke="#DCE5F5" strokeWidth={2} />
        <rect x={176} y={104} width={280} height={44} rx={20} fill={`url(#${id}-sky)`} />
        <rect x={176} y={128} width={280} height={20} fill={`url(#${id}-sky)`} />
        <circle cx={204} cy={126} r={11} fill={BLUE} />
        <g transform="translate(196 118)" color="#fff">
          <Glyph name="ai" size={16} />
        </g>
        <rect x={226} y={120} width={104} height={12} rx={6} fill={INK} opacity={0.85} />
        <circle cx={430} cy={126} r={5} fill={GREEN} />
      </g>

      {/* messages */}
      <rect x={294} y={164} width={140} height={32} rx={12} fill={BLUE} />
      <rect x={310} y={176} width={94} height={7} rx={3.5} fill="#fff" opacity={0.9} />
      <rect x={194} y={208} width={176} height={72} rx={14} fill="#F7FAFF" stroke="#E6EDF8" />
      <rect x={208} y={224} width={124} height={8} rx={4} fill={INK} opacity={0.7} />
      <rect x={208} y={240} width={146} height={7} rx={3.5} fill="#CBD6E8" />
      <rect x={208} y={254} width={116} height={7} rx={3.5} fill="#E2E9F5" />
      <rect x={208} y={266} width={82} height={12} rx={6} fill="#E8FBF0" stroke={GREEN} strokeWidth={1.4} />
      <g>
        <rect x={194} y={296} width={84} height={32} rx={13} fill="#fff" stroke="#E6EDF8" strokeWidth={1.5} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={216 + i * 15} cy={312} r={4.5} fill={BLUE} opacity={0.85}>
            <animate attributeName="cy" values="312;307;312" dur="1.1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* AI orb */}
      <g className="svg-float" style={{ animationDelay: '1.2s' }} filter={`url(#${id}-sh)`}>
        <circle cx={524} cy={216} r={44} fill={BLUE} opacity={0.1} />
        <circle cx={524} cy={216} r={30} fill={`url(#${id}-deep)`} />
        <circle cx={524} cy={216} r={30} fill="none" stroke={CYAN} strokeWidth={2} strokeDasharray="8 10" className="svg-spin" />
        <g transform="translate(512 204)" color="#fff">
          <Glyph name="ai" size={24} />
        </g>
      </g>

      <FloatCard id={id} x={44} y={196} tone={BLUE} glyph="chat" label="Chatbots" delay={0.3} w={152} />
      <FloatCard id={id} x={30} y={392} tone={CYAN} glyph="chart" label="Smart Insights" delay={0.9} w={176} />
      <FloatCard id={id} x={398} y={404} tone={ORANGE} glyph="bolt" label="Auto Workflows" delay={1.4} w={186} />
    </SceneSvg>
  </div>
)

const SERVICE_SCENES: Record<string, React.FC<SceneProps>> = {
  'website-development': WebsiteScene,
  'web-application-development': WebAppScene,
  'mobile-app-development': MobileScene,
  'erp-business-software': ErpScene,
  'custom-software-development': CustomScene,
  'ai-automation': AiScene,
}

export const ServiceScene: React.FC<{ id: string; serviceId: string; className?: string }> = ({
  id,
  serviceId,
  className = 'w-full h-auto',
}) => {
  const Scene = SERVICE_SCENES[serviceId] ?? WebsiteScene
  return <Scene id={`${id}-${serviceId}`} className={className} />
}

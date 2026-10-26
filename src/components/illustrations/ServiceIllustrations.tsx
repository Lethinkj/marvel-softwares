import React from 'react'
import type { IllustrationProps } from './WebDevIllustration'
import { useInView } from '../../hooks/useInView'

/* Realistic modern SVG set — depth via gradients + soft shadows,
   detailed product UI (chrome, sidebars, charts, status bars),
   restrained motion: whole-group float, dash-flow connectors,
   single pulse accents. Reduced-motion handled by global CSS. */

const shadow = (id: string, color = '#0033A0', opacity = 0.14) => (
  <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor={color} floodOpacity={opacity} />
  </filter>
)

function ChromeDots({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={4.5} fill="#FF5A00" />
      <circle cx={x + 15} cy={y} r={4.5} fill="#FFB800" />
      <circle cx={x + 30} cy={y} r={4.5} fill="#00CFFF" />
    </g>
  )
}

/* ================= HERO ================= */

export const EcosystemHero: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg
      viewBox="0 0 600 440"
      role="img"
      aria-label="Connected software ecosystem: website, mobile app, analytics dashboard and cloud database"
      className="w-full h-auto select-none overflow-visible"
    >
      <defs>
        {shadow('hero-sh')}
        <linearGradient id="hero-head" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0057E7" />
          <stop offset="100%" stopColor="#0033A0" />
        </linearGradient>
        <linearGradient id="hero-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#F4F5FF" />
        </linearGradient>
        <linearGradient id="hero-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#001F80" />
          <stop offset="100%" stopColor="#0033A0" />
        </linearGradient>
      </defs>

      {/* short edge-to-edge connectors with port dots */}
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M292 178 C 300 186, 304 194, 308 202" stroke="#D9E5F8" strokeWidth={3.5} />
        <path d="M292 178 C 300 186, 304 194, 308 202" stroke="#0057E7" strokeWidth={3.5} className="svg-flow" />
        <path d="M410 212 C 402 222, 396 230, 390 238" stroke="#D9E5F8" strokeWidth={3.5} />
        <path d="M410 212 C 402 222, 396 230, 390 238" stroke="#00CFFF" strokeWidth={3.5} className="svg-flow" />
        <path d="M412 330 C 432 328, 450 324, 466 320" stroke="#D9E5F8" strokeWidth={3.5} />
        <path d="M412 330 C 432 328, 450 324, 466 320" stroke="#FF5A00" strokeWidth={3.5} className="svg-flow" />
      </g>
      <g aria-hidden="true" stroke="#fff" strokeWidth={2.5}>
        <circle cx={292} cy={178} r={5} fill="#0057E7" />
        <circle cx={308} cy={202} r={5} fill="#0057E7" />
        <circle cx={410} cy={212} r={5} fill="#00CFFF" />
        <circle cx={390} cy={238} r={5} fill="#00CFFF" />
        <circle cx={412} cy={330} r={5} fill="#FF5A00" />
        <circle cx={466} cy={320} r={5} fill="#FF5A00" />
      </g>

      {/* soft grounding shadows */}
      <g aria-hidden="true" fill="#0033A0" opacity={0.07}>
        <ellipse cx={175} cy={338} rx={125} ry={10} />
        <ellipse cx={357} cy={426} rx={75} ry={9} />
        <ellipse cx={510} cy={368} rx={62} ry={9} />
      </g>

      {/* main browser */}
      <g className="svg-float" filter="url(#hero-sh)">
        <rect x={50} y={150} width={250} height={180} rx={16} fill="url(#hero-card)" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={50} y={150} width={250} height={34} rx={16} fill="url(#hero-head)" />
        <rect x={50} y={168} width={250} height={16} fill="#0033A0" />
        <ChromeDots x={68} y={167} />
        <rect x={120} y={159} width={130} height={16} rx={8} fill="#ffffff" opacity={0.9} />
        <rect x={130} y={164} width={70} height={6} rx={3} fill="#B9C6DD" />
        <rect x={70} y={198} width={110} height={12} rx={6} fill="#172033" />
        <rect x={70} y={216} width={210} height={7} rx={3.5} fill="#C9D4E8" />
        <rect x={70} y={229} width={170} height={7} rx={3.5} fill="#C9D4E8" />
        <rect x={70} y={248} width={78} height={26} rx={13} fill="#0057E7" />
        <rect x={84} y={257} width={50} height={8} rx={4} fill="#fff" />
        <rect x={156} y={248} width={78} height={26} rx={13} fill="#fff" stroke="#0057E7" strokeWidth={2} />
        <rect x={70} y={286} width={70} height={28} rx={8} fill="#F4F5FF" />
        <rect x={148} y={286} width={70} height={28} rx={8} fill="#F4F5FF" />
        <rect x={226} y={286} width={54} height={28} rx={8} fill="#FFF7E8" stroke="#FFB800" strokeWidth={1.5} />
      </g>

      {/* analytics dashboard */}
      <g className="svg-float" style={{ animationDelay: '.9s' }} filter="url(#hero-sh)">
        <rect x={310} y={60} width={230} height={150} rx={16} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={310} y={60} width={56} height={150} rx={16} fill="url(#hero-side)" />
        <rect x={354} y={60} width={12} height={150} fill="#0033A0" />
        <circle cx={338} cy={90} r={10} fill="#00CFFF" />
        <rect x={326} y={110} width={24} height={6} rx={3} fill="#ffffff" opacity={0.7} />
        <rect x={326} y={122} width={24} height={6} rx={3} fill="#ffffff" opacity={0.4} />
        <rect x={326} y={134} width={24} height={6} rx={3} fill="#ffffff" opacity={0.4} />
        <rect x={326} y={160} width={24} height={18} rx={6} fill="#FF5A00" />
        <rect x={382} y={78} width={70} height={26} rx={8} fill="#F4F5FF" />
        <rect x={392} y={87} width={40} height={8} rx={4} fill="#0057E7" opacity={0.7} />
        <rect x={460} y={78} width={64} height={26} rx={8} fill="#FFF7E8" />
        <rect x={470} y={87} width={40} height={8} rx={4} fill="#FFB800" />
        <rect x={382} y={114} width={142} height={78} rx={10} fill="#F7FAFF" stroke="#E2E9F5" />
        {[0, 1, 2].map((i) => (
          <line key={i} x1={392} y1={132 + i * 18} x2={514} y2={132 + i * 18} stroke="#E2E9F5" strokeWidth={1.5} />
        ))}
        <path d="M394 178 L418 160 L442 168 L466 142 L490 150 L512 132" fill="none" stroke="#0057E7" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={466} cy={142} r={6} fill="#fff" stroke="#FF5A00" strokeWidth={3.5} className="svg-pulse" />
      </g>

      {/* phone */}
      <g transform="translate(12,0)">
      <g className="svg-float" style={{ animationDelay: '1.7s' }} filter="url(#hero-sh)">
        <rect x={290} y={240} width={110} height={180} rx={26} fill="#0B1530" />
        <rect x={296} y={246} width={98} height={168} rx={21} fill="#fff" />
        <rect x={322} y={252} width={46} height={12} rx={6} fill="#0B1530" />
        <rect x={306} y={272} width={78} height={10} rx={5} fill="#172033" />
        <rect x={306} y={288} width={78} height={58} rx={10} fill="url(#hero-head)" />
        <circle cx={345} cy={317} r={16} fill="#ffffff" opacity={0.95} />
        <path d="M338 317 l5 5 10-10" stroke="#0057E7" strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x={306} y={354} width={78} height={10} rx={5} fill="#E2E9F5" />
        <rect x={306} y={370} width={78} height={24} rx={12} fill="#FF5A00" />
        <rect x={326} y={378} width={38} height={8} rx={4} fill="#fff" />
      </g>
      </g>

      {/* cloud database */}
      <g className="svg-float" style={{ animationDelay: '2.3s' }} filter="url(#hero-sh)">
        <ellipse cx={510} cy={300} rx={42} ry={13} fill="#0057E7" />
        <path d="M468 300 v48 c0 8 19 14 42 14 s42-6 42-14 v-48" fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
        <path d="M468 324 c0 8 19 14 42 14 s42-6 42-14" fill="none" stroke="#00CFFF" strokeWidth={2.5} />
        <path d="M468 340 c0 8 19 14 42 14 s42-6 42-14" fill="none" stroke="#D9E5F8" strokeWidth={2.5} />
        <circle cx={510} cy={300} r={6} fill="#FF5A00" className="svg-pulse" />
      </g>
    </svg>
  </div>
)

/* ================= WEBSITE ================= */

export const WebsiteDevIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 270" role="img" aria-label="Responsive website preview on desktop and mobile with performance score" className="w-full h-auto select-none">
      <defs>
        {shadow('web-sh')}
        <linearGradient id="web-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0057E7" />
          <stop offset="100%" stopColor="#0033A0" />
        </linearGradient>
      </defs>
      <g filter="url(#web-sh)">
        <rect x={20} y={20} width={250} height={210} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={20} y={20} width={250} height={32} rx={14} fill="url(#web-bar)" />
        <rect x={20} y={36} width={250} height={16} fill="#0033A0" />
        <ChromeDots x={36} y={36} />
        <rect x={92} y={28} width={120} height={16} rx={8} fill="#fff" opacity={0.92} />
        <rect x={222} y={28} width={36} height={16} rx={8} fill="#FF5A00" />
        {/* nav */}
        <rect x={36} y={64} width={52} height={12} rx={6} fill="#172033" />
        <rect x={96} y={67} width={30} height={7} rx={3.5} fill="#C9D4E8" />
        <rect x={132} y={67} width={30} height={7} rx={3.5} fill="#C9D4E8" />
        <rect x={220} y={62} width={34} height={16} rx={8} fill="#0057E7" />
        {/* hero */}
        <rect x={36} y={86} width={218} height={64} rx={10} fill="#F7FAFF" stroke="#E2E9F5" />
        <rect x={48} y={98} width={100} height={11} rx={5.5} fill="#172033" />
        <rect x={48} y={114} width={130} height={6} rx={3} fill="#C9D4E8" />
        <rect x={48} y={126} width={60} height={16} rx={8} fill="#0057E7" />
        <circle cx={212} cy={118} r={22} fill="#fff" stroke="#E2E9F5" strokeWidth={2} />
        <circle cx={212} cy={118} r={22} fill="none" stroke="#00C42B" strokeWidth={5} strokeDasharray="100 139" strokeLinecap="round" transform="rotate(-90 212 118)" />
        <text x={212} y={123} textAnchor="middle" fontSize={15} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">98</text>
        {/* columns */}
        <rect x={36} y={160} width={68} height={54} rx={8} fill="#F4F5FF" />
        <rect x={110} y={160} width={68} height={54} rx={8} fill="#F4F5FF" />
        <rect x={184} y={160} width={70} height={54} rx={8} fill="#FFF7E8" stroke="#FFB800" strokeWidth={1.5} />
      </g>
      <g className="svg-float" filter="url(#web-sh)">
        <rect x={262} y={100} width={92} height={150} rx={20} fill="#0B1530" />
        <rect x={267} y={105} width={82} height={140} rx={16} fill="#fff" />
        <rect x={292} y={110} width={32} height={9} rx={4.5} fill="#0B1530" />
        <rect x={275} y={126} width={66} height={8} rx={4} fill="#172033" />
        <rect x={275} y={140} width={66} height={44} rx={8} fill="url(#web-bar)" />
        <rect x={275} y={192} width={66} height={18} rx={9} fill="#FF5A00" />
      </g>
    </svg>
  </div>
)

/* ================= WEB APP ================= */

export const WebAppIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 270" role="img" aria-label="Web application with sidebar, KPI cards and revenue chart" className="w-full h-auto select-none">
      <defs>
        {shadow('wapp-sh')}
        <linearGradient id="wapp-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#001F80" />
          <stop offset="100%" stopColor="#0033A0" />
        </linearGradient>
      </defs>
      <g filter="url(#wapp-sh)">
        <rect x={20} y={16} width={340} height={238} rx={16} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={20} y={16} width={74} height={238} rx={16} fill="url(#wapp-side)" />
        <rect x={78} y={16} width={16} height={238} fill="#0033A0" />
        <circle cx={57} cy={48} r={13} fill="#00CFFF" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={42} y={76 + i * 26} width={30} height={9} rx={4.5} fill="#fff" opacity={i === 0 ? 0.95 : 0.45} />
          </g>
        ))}
        <rect x={42} y={210} width={30} height={20} rx={7} fill="#FF5A00" />
        {/* topbar */}
        <rect x={110} y={32} width={180} height={22} rx={11} fill="#F1F5FB" />
        <circle cx={126} cy={43} r={6} fill="#C9D4E8" />
        <rect x={140} y={40} width={90} height={7} rx={3.5} fill="#C9D4E8" />
        <circle cx={322} cy={43} r={12} fill="url(#wapp-side)" />
        {/* KPI cards */}
        {[
          { x: 110, v: '24.8k', c: '#0057E7' },
          { x: 192, v: '98.2%', c: '#00C42B' },
          { x: 274, v: '$61k', c: '#FF5A00' },
        ].map((k) => (
          <g key={k.x}>
            <rect x={k.x} y={66} width={74} height={52} rx={10} fill="#F7FAFF" stroke="#E2E9F5" />
            <text x={k.x + 12} y={90} fontSize={15} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">{k.v}</text>
            <rect x={k.x + 12} y={98} width={40} height={6} rx={3} fill={k.c} opacity={0.65} />
          </g>
        ))}
        {/* chart */}
        <rect x={110} y={130} width={238} height={108} rx={10} fill="#F7FAFF" stroke="#E2E9F5" />
        {[0, 1, 2].map((i) => (
          <line key={i} x1={122} y1={152 + i * 24} x2={336} y2={152 + i * 24} stroke="#E2E9F5" strokeWidth={1.5} />
        ))}
        {[46, 70, 54, 88, 72, 100, 84].map((h, i) => (
          <rect key={i} x={130 + i * 28} y={218 - h} width={16} height={h} rx={4} fill={i === 4 ? '#FF5A00' : '#0057E7'} opacity={i === 4 ? 1 : 0.8} />
        ))}
      </g>
    </svg>
  </div>
)

/* ================= MOBILE ================= */

export const MobileAppIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 270" role="img" aria-label="Android and iOS app screens with bookings and activity chart" className="w-full h-auto select-none">
      <defs>
        {shadow('mob-sh')}
        <linearGradient id="mob-hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0057E7" />
          <stop offset="100%" stopColor="#001F80" />
        </linearGradient>
      </defs>
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M128 150 H252" stroke="#D9E5F8" strokeWidth={3.5} />
        <path d="M128 150 H252" stroke="#0057E7" strokeWidth={3.5} className="svg-flow" />
      </g>
      {/* phone 1 */}
      <g className="svg-float" filter="url(#mob-sh)">
        <rect x={30} y={30} width={112} height={210} rx={26} fill="#0B1530" />
        <rect x={35} y={35} width={102} height={200} rx={22} fill="#fff" />
        <rect x={68} y={40} width={36} height={10} rx={5} fill="#0B1530" />
        <rect x={43} y={58} width={86} height={12} rx={6} fill="#172033" />
        <rect x={43} y={76} width={86} height={64} rx={12} fill="url(#mob-hero)" />
        <circle cx={86} cy={108} r={17} fill="#fff" opacity={0.95} />
        <path d="M79 108 l5 5 10-10" stroke="#0057E7" strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x={43} y={148} width={86} height={12} rx={6} fill="#E2E9F5" />
        <rect x={43} y={166} width={86} height={26} rx={13} fill="#FF5A00" />
        <rect x={60} y={175} width={52} height={8} rx={4} fill="#fff" />
        <rect x={43} y={198} width={86} height={12} rx={6} fill="#F1F5FB" />
      </g>
      <circle cx={190} cy={150} r={19} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
      <circle cx={190} cy={150} r={6} fill="#FF5A00" />
      {/* phone 2 */}
      <g className="svg-float" style={{ animationDelay: '1.3s' }} filter="url(#mob-sh)">
        <rect x={238} y={30} width={112} height={210} rx={26} fill="#0B1530" />
        <rect x={243} y={35} width={102} height={200} rx={22} fill="#fff" />
        <rect x={276} y={40} width={36} height={10} rx={5} fill="#0B1530" />
        <rect x={251} y={58} width={70} height={12} rx={6} fill="#172033" />
        <rect x={251} y={78} width={86} height={70} rx={12} fill="#F7FAFF" stroke="#E2E9F5" />
        <path d="M261 132 L273 120 L285 126 L297 112 L311 118 L327 106" fill="none" stroke="#FF5A00" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={297} cy={112} r={5} fill="#FF5A00" className="svg-pulse" />
        <rect x={251} y={156} width={40} height={26} rx={8} fill="#F4F5FF" />
        <rect x={297} y={156} width={40} height={26} rx={8} fill="#F4F5FF" />
        <rect x={251} y={190} width={86} height={26} rx={13} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
      </g>
    </svg>
  </div>
)

/* ================= ERP ================= */

export const ErpIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 290" role="img" aria-label="Central ERP dashboard connected to stock, billing, people and sales modules" className="w-full h-auto select-none">
      <defs>{shadow('erp-sh')}</defs>
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M190 150 L70 80 M190 150 L310 80 M190 150 L70 225 M190 150 L310 225" stroke="#D9E5F8" strokeWidth={3.5} />
        <path d="M190 150 L70 80" stroke="#0057E7" strokeWidth={3.5} className="svg-flow" />
        <path d="M190 150 L310 225" stroke="#00CFFF" strokeWidth={3.5} className="svg-flow" />
      </g>
      <g className="svg-float" filter="url(#erp-sh)">
        <rect x={125} y={105} width={130} height={92} rx={16} fill="#0033A0" />
        <rect x={125} y={105} width={130} height={30} rx={16} fill="#0057E7" />
        <rect x={125} y={120} width={130} height={15} fill="#0057E7" />
        <circle cx={143} cy={120} r={5} fill="#fff" />
        <rect x={155} y={117} width={60} height={7} rx={3.5} fill="#fff" opacity={0.9} />
        <rect x={141} y={145} width={52} height={10} rx={5} fill="#00CFFF" />
        <rect x={141} y={161} width={88} height={7} rx={3.5} fill="#fff" opacity={0.65} />
        <rect x={141} y={173} width={60} height={7} rx={3.5} fill="#fff" opacity={0.45} />
      </g>
      {[
        { x: 22, y: 44, t: 'Stock', v: '1,284', c: '#0057E7' },
        { x: 272, y: 44, t: 'Billing', v: '$48k', c: '#00C42B' },
        { x: 22, y: 200, t: 'People', v: '86', c: '#FF5A00' },
        { x: 272, y: 200, t: 'Sales', v: '+12%', c: '#FFB800' },
      ].map((m) => (
        <g key={m.t} filter="url(#erp-sh)">
          <rect x={m.x} y={m.y} width={86} height={66} rx={12} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
          <circle cx={m.x + 20} cy={m.y + 22} r={9} fill={m.c} opacity={0.9} />
          <text x={m.x + 36} y={m.y + 27} fontSize={13} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">{m.v}</text>
          <text x={m.x + 12} y={m.y + 50} fontSize={10} fontWeight={600} fill="#5F6472" fontFamily="Inter,sans-serif">{m.t}</text>
        </g>
      ))}
    </svg>
  </div>
)

/* ================= CUSTOM ================= */

export const CustomSoftwareIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 270" role="img" aria-label="Custom workflow with automation blocks, code editor and approval queue" className="w-full h-auto select-none">
      <defs>
        {shadow('cus-sh')}
        <linearGradient id="cus-code" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16233F" />
          <stop offset="100%" stopColor="#0B1530" />
        </linearGradient>
      </defs>
      {/* code editor */}
      <g className="svg-float" filter="url(#cus-sh)">
        <rect x={24} y={40} width={170} height={190} rx={14} fill="url(#cus-code)" />
        <ChromeDots x={42} y={60} />
        <g fontFamily="monospace" fontSize={10}>
          <text x={42} y={90} fill="#FF7A45" fontWeight="bold">const</text><text x={82} y={90} fill="#fff">flow =</text><text x={132} y={90} fill="#00CFFF">auto()</text>
          <text x={42} y={110} fill="#8EA0BF">if (order.paid) {'{'}</text>
          <text x={56} y={130} fill="#00C42B">fulfill(order)</text>
          <text x={56} y={150} fill="#FFB800">notify(team)</text>
          <text x={42} y={170} fill="#8EA0BF">{'}'}</text>
        </g>
        <rect x={42} y={186} width={10} height={16} fill="#FF5A00">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* workflow blocks */}
      <g className="svg-float" style={{ animationDelay: '1s' }} filter="url(#cus-sh)">
        <rect x={214} y={40} width={142} height={190} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={228} y={56} width={114} height={40} rx={10} fill="#F4F5FF" stroke="#0057E7" strokeWidth={2} />
        <circle cx={244} cy={76} r={7} fill="#0057E7" />
        <rect x={258} y={72} width={64} height={8} rx={4} fill="#172033" />
        <line x1={285} y1={96} x2={285} y2={112} stroke="#C9D4E8" strokeWidth={3} />
        <rect x={228} y={112} width={114} height={40} rx={10} fill="#FFF7E8" stroke="#FFB800" strokeWidth={2} />
        <circle cx={244} cy={132} r={7} fill="#FFB800" />
        <rect x={258} y={128} width={64} height={8} rx={4} fill="#172033" />
        <line x1={285} y1={152} x2={285} y2={168} stroke="#C9D4E8" strokeWidth={3} />
        <rect x={228} y={168} width={114} height={40} rx={10} fill="#0057E7" />
        <circle cx={244} cy={188} r={7} fill="#fff" />
        <rect x={258} y={184} width={64} height={8} rx={4} fill="#fff" />
      </g>
    </svg>
  </div>
)

/* ================= UI/UX ================= */

export const UiUxCanvasIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 270" role="img" aria-label="Design artboard with component layers, color styles and selection" className="w-full h-auto select-none">
      <defs>{shadow('ux-sh')}</defs>
      {/* artboard */}
      <g filter="url(#ux-sh)">
        <rect x={20} y={20} width={230} height={230} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={20} y={20} width={230} height={28} rx={14} fill="#F1F5FB" />
        <rect x={20} y={34} width={230} height={14} fill="#F1F5FB" />
        <text x={34} y={39} fontSize={11} fontWeight={700} fill="#5F6472" fontFamily="Inter,sans-serif">Homepage — 1440</text>
        <rect x={38} y={62} width={194} height={60} rx={10} fill="none" stroke="#0057E7" strokeWidth={2.5} strokeDasharray="8 6" />
        <rect x={52} y={76} width={110} height={12} rx={6} fill="#172033" />
        <rect x={52} y={94} width={150} height={7} rx={3.5} fill="#C9D4E8" />
        <rect x={38} y={134} width={92} height={60} rx={10} fill="#F4F5FF" />
        <rect x={140} y={134} width={92} height={60} rx={10} fill="#F4F5FF" />
        <rect x={38} y={204} width={194} height={28} rx={9} fill="#0057E7" />
        {/* selection handles */}
        {[[38, 62], [232, 62], [38, 122], [232, 122]].map(([hx, hy]) => (
          <rect key={`${hx}${hy}`} x={hx - 5} y={hy - 5} width={10} height={10} rx={2.5} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
        ))}
      </g>
      {/* layers + styles */}
      <g className="svg-float" filter="url(#ux-sh)">
        <rect x={262} y={20} width={98} height={150} rx={12} fill="#0B1530" />
        <text x={274} y={44} fontSize={10} fontWeight={700} fill="#fff" fontFamily="Inter,sans-serif">Layers</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={274} y={54 + i * 24} width={74} height={16} rx={6} fill={i === 1 ? '#0057E7' : '#24345A'} />
            <rect x={280} y={59 + i * 24} width={30} height={6} rx={3} fill="#fff" opacity={i === 1 ? 1 : 0.5} />
          </g>
        ))}
        <rect x={262} y={182} width={98} height={68} rx={12} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <text x={274} y={204} fontSize={10} fontWeight={700} fill="#172033" fontFamily="Inter,sans-serif">Styles</text>
        <circle cx={282} cy={224} r={9} fill="#0057E7" />
        <circle cx={304} cy={224} r={9} fill="#00CFFF" />
        <circle cx={326} cy={224} r={9} fill="#FF5A00" />
      </g>
      {/* cursor */}
      <g className="svg-float" style={{ animationDelay: '1.1s' }}>
        <g transform="translate(238,196)">
          <polygon
            points="0,0 0,-30 7.5,-22.5 11.5,-31.5 16.5,-28.5 12.5,-19.5 20,-19.5"
            fill="#172033"
            stroke="#fff"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  </div>
)

/* ================= API ================= */

export const ApiIntegrationIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 250" role="img" aria-label="API gateway connecting store, payments and database services" className="w-full h-auto select-none">
      <defs>
        {shadow('api-sh')}
        <linearGradient id="api-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0057E7" />
          <stop offset="100%" stopColor="#001F80" />
        </linearGradient>
      </defs>
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M95 125 H155 M225 125 H285" stroke="#D9E5F8" strokeWidth={3.5} />
        <path d="M95 125 H155" stroke="#0057E7" strokeWidth={3.5} className="svg-flow" />
        <path d="M225 125 H285" stroke="#00CFFF" strokeWidth={3.5} className="svg-flow" />
        <path d="M190 60 V80 M190 170 V190" stroke="#D9E5F8" strokeWidth={3.5} />
      </g>
      <g filter="url(#api-sh)">
        <rect x={30} y={90} width={70} height={74} rx={12} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={42} y={102} width={46} height={24} rx={7} fill="#F4F5FF" />
        <path d="M50 114 h30 M50 120 h22" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" />
        <text x={42} y={150} fontSize={10} fontWeight={700} fill="#172033" fontFamily="Inter,sans-serif">Store</text>
      </g>
      <g filter="url(#api-sh)">
        <rect x={280} y={90} width={70} height={74} rx={12} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={292} y={102} width={46} height={24} rx={7} fill="#E8FBF0" />
        <path d="M300 114 h14 M304 108 v12" stroke="#00C42B" strokeWidth={3} strokeLinecap="round" />
        <text x={292} y={150} fontSize={10} fontWeight={700} fill="#172033" fontFamily="Inter,sans-serif">Pay</text>
      </g>
      <g>
        <rect x={140} y={80} width={100} height={90} rx={16} fill="url(#api-core)" filter="url(#api-sh)" />
        <text x={190} y={112} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fff" fontFamily="JetBrains Mono,monospace">{'{ API }'}</text>
        <rect x={156} y={124} width={68} height={18} rx={9} fill="#fff" opacity={0.16} />
        <circle cx={172} cy={133} r={4} fill="#00CFFF" className="svg-pulse" />
        <rect x={182} y={130} width={32} height={6} rx={3} fill="#fff" opacity={0.85} />
        <rect x={156} y={148} width={68} height={8} rx={4} fill="#fff" opacity={0.5} />
      </g>
      <g filter="url(#api-sh)">
        <ellipse cx={190} cy={212} rx={34} ry={11} fill="#0057E7" />
        <path d="M156 212 v18 c0 6 15 11 34 11 s34-5 34-11 v-18" fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
      </g>
    </svg>
  </div>
)

/* ================= CLOUD ================= */

/** Deployment state driving the Cloud illustration (spinner → check / cross).
 *  NOTE: wire the `status` prop to real CI/CD state — never assume the live
 *  version changes before the incoming release is verified. */
export type DeployStatus = 'deploying' | 'success' | 'failed'

export const CloudDeployIllustration: React.FC<IllustrationProps & { status?: DeployStatus }> = ({
  className = 'w-full h-auto',
  status = 'deploying',
}) => {
  const isDone = status === 'success'
  const isFailed = status === 'failed'
  const region = isDone
    ? { dot: '#00C42B', text: 'eu-central • live', pulse: false as const }
    : isFailed
      ? { dot: '#E02626', text: 'eu-central • deploy failed', pulse: false as const }
      : { dot: '#FFB800', text: 'eu-central • deploying', pulse: true as const }
  return (
  <div className={className}>
    <svg viewBox="0 0 380 240" role="img" aria-label={`Cloud deployment with Build and Test passed and Deploy ${status}`} className="w-full h-auto select-none">
      <defs>
        {shadow('cld-sh')}
        <linearGradient id="cld-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAF6FF" />
          <stop offset="100%" stopColor="#F4F5FF" />
        </linearGradient>
        <linearGradient id="cld-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#001F80" />
          <stop offset="100%" stopColor="#0033A0" />
        </linearGradient>
      </defs>
      <rect x={16} y={16} width={348} height={208} rx={18} fill="url(#cld-sky)" />
      {/* cloud region */}
      <g className="svg-float" filter="url(#cld-sh)">
        <path
          d="M132 112 C119 112 108 102 108 89 C108 79 114 70 123 66 C126 51 140 40 157 40 C172 40 185 49 190 62 C195 60 200 59 206 59 C221 59 233 71 233 86 C233 88 233 90 232 92 C240 95 245 102 245 110 L245 112 Z"
          fill="#fff"
          stroke="#0057E7"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <circle cx={188} cy={58} r={7} fill="#FF5A00" className="svg-pulse" />
        <rect x={116} y={120} width={150} height={22} rx={11} fill="#0B1530" />
        <circle cx={130} cy={131} r={5} fill={region.dot} className={region.pulse ? 'svg-pulse' : undefined} />
        <text x={142} y={135} fontSize={10} fontWeight={700} fill="#fff" fontFamily="Inter,sans-serif">{region.text}</text>
      </g>
      {/* cloud → pipeline */}
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M190 148 V172" stroke="#D9E5F8" strokeWidth={3.5} />
        <path d="M190 148 V172" stroke="#0057E7" strokeWidth={3.5} className="svg-flow" />
      </g>
      {/* pipeline */}
      <g filter="url(#cld-sh)">
        <rect x={70} y={172} width={240} height={40} rx={20} fill="url(#cld-pipe)" />
        <line x1={112} y1={192} x2={268} y2={192} stroke="#ffffff" strokeWidth={2} opacity={0.25} />
        {[
          { x: 104, s: 'Build', state: 'done' as const },
          { x: 190, s: 'Test', state: 'done' as const },
          { x: 276, s: 'Deploy', state: isFailed ? ('failed' as const) : isDone ? ('done' as const) : ('active' as const) },
        ].map((n) => (
          <g key={n.s}>
            {n.state === 'done' && (
              <g>
                <circle cx={n.x} cy={192} r={13} fill="#00C42B" stroke="#fff" strokeWidth={3} />
                <path d={`M${n.x - 5} 192 l4 4 7-7`} stroke="#fff" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
            {n.state === 'active' && (
              <g>
                <circle cx={n.x} cy={192} r={13} fill="#fff" stroke="#fff" strokeWidth={3} />
                <circle cx={n.x} cy={192} r={13} fill="none" stroke="#FFB800" strokeWidth={4} strokeDasharray="22 16" strokeLinecap="round" className="svg-spin" />
                <circle cx={n.x} cy={192} r={4} fill="#FFB800" />
              </g>
            )}
            {n.state === 'failed' && (
              <g>
                <circle cx={n.x} cy={192} r={13} fill="#E02626" stroke="#fff" strokeWidth={3} />
                <path d={`M${n.x - 4.5} 187.5 l9 9 M${n.x + 4.5} 187.5 l-9 9`} stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
              </g>
            )}
            <text x={n.x} y={222} textAnchor="middle" fontSize={10} fontWeight={700} fill="#172033" fontFamily="Inter,sans-serif">{n.s}</text>
          </g>
        ))}
      </g>
    </svg>
  </div>
  )
}

/* ================= AI ================= */

export const AiFlowIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 270" role="img" aria-label="Support chatbot answering from company documents with cited sources" className="w-full h-auto select-none">
      <defs>
        {shadow('ai-sh')}
        <linearGradient id="ai-bot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0057E7" />
          <stop offset="100%" stopColor="#001F80" />
        </linearGradient>
      </defs>
      <g filter="url(#ai-sh)">
        <rect x={20} y={20} width={220} height={230} rx={16} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={20} y={20} width={220} height={40} rx={16} fill="url(#ai-bot)" />
        <rect x={20} y={44} width={220} height={16} fill="#001F80" />
        <circle cx={44} cy={40} r={10} fill="#fff" opacity={0.95} />
        <circle cx={40} cy={39} r={1.6} fill="#0033A0" /><circle cx={48} cy={39} r={1.6} fill="#0033A0" />
        <text x={62} y={44} fontSize={12} fontWeight={700} fill="#fff" fontFamily="Inter,sans-serif">Support Assistant</text>
        <circle cx={222} cy={40} r={4} fill="#00C42B" />
        {/* user msg */}
        <rect x={96} y={74} width={128} height={34} rx={12} fill="#0057E7" />
        <rect x={110} y={85} width={100} height={7} rx={3.5} fill="#fff" opacity={0.9} />
        <rect x={110} y={95} width={60} height={6} rx={3} fill="#fff" opacity={0.6} />
        {/* bot answer */}
        <rect x={32} y={118} width={150} height={64} rx={12} fill="#F4F5FF" stroke="#D9E5F8" />
        <rect x={44} y={130} width={110} height={7} rx={3.5} fill="#172033" opacity={0.75} />
        <rect x={44} y={142} width={126} height={6} rx={3} fill="#B9C6DD" />
        <rect x={44} y={154} width={90} height={6} rx={3} fill="#B9C6DD" />
        <rect x={44} y={164} width={70} height={12} rx={6} fill="#E8FBF0" stroke="#00C42B" />
        {/* typing */}
        <rect x={32} y={192} width={76} height={30} rx={15} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={52 + i * 14} cy={207} r={4.5} fill="#0057E7" opacity={0.85}>
            <animate attributeName="cy" values="207;202;207" dur="1.1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      {/* sources */}
      <g className="svg-float" filter="url(#ai-sh)">
        <rect x={254} y={60} width={106} height={170} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <text x={268} y={86} fontSize={11} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">Sources</text>
        {[
          { y: 98, t: 'Pricing.pdf', c: '#FF5A00' },
          { y: 134, t: 'Manual.docx', c: '#0057E7' },
          { y: 170, t: 'FAQ', c: '#00C42B' },
        ].map((d) => (
          <g key={d.t}>
            <rect x={268} y={d.y} width={78} height={30} rx={8} fill="#F7FAFF" stroke="#E2E9F5" />
            <rect x={276} y={d.y + 9} width={12} height={12} rx={3} fill={d.c} opacity={0.85} />
            <text x={292} y={d.y + 19} fontSize={9} fontWeight={700} fill="#172033" fontFamily="Inter,sans-serif">{d.t}</text>
          </g>
        ))}
      </g>
    </svg>
  </div>
)

/* ================= MAINTENANCE ================= */

export const MaintenanceIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 380 270" role="img" aria-label="System health report with passing checks, uptime gauge and update queue" className="w-full h-auto select-none">
      <defs>
        {shadow('mnt-sh')}
        <linearGradient id="mnt-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0057E7" />
          <stop offset="100%" stopColor="#00CFFF" />
        </linearGradient>
      </defs>
      <g filter="url(#mnt-sh)">
        <rect x={20} y={20} width={230} height={230} rx={16} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <text x={40} y={52} fontSize={13} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">System health</text>
        <rect x={180} y={36} width={54} height={20} rx={10} fill="#E8FBF0" />
        <circle cx={192} cy={46} r={5} fill="#00C42B" />
        <text x={202} y={50} fontSize={10} fontWeight={800} fill="#0E7A34" fontFamily="Inter,sans-serif">99.9%</text>
        {[
          { y: 68, t: 'Backups verified', ok: true },
          { y: 108, t: 'Dependencies current', ok: true },
          { y: 148, t: '2 updates queued', ok: false },
        ].map((r) => (
          <g key={r.t}>
            <rect x={40} y={r.y} width={190} height={32} rx={10} fill={r.ok ? '#F4F5FF' : '#FFF7E8'} stroke={r.ok ? '#E2E9F5' : '#FFB800'} strokeWidth={1.5} />
            <circle cx={58} cy={r.y + 16} r={8} fill={r.ok ? '#0057E7' : '#FFB800'} className={r.ok ? undefined : 'svg-pulse'} />
            {r.ok && <path d={`M54 ${r.y + 16} l3 3 6-6`} stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" />}
            <text x={74} y={r.y + 21} fontSize={11} fontWeight={600} fill="#172033" fontFamily="Inter,sans-serif">{r.t}</text>
          </g>
        ))}
        <rect x={40} y={196} width={190} height={34} rx={10} fill="#0057E7" />
        <text x={135} y={218} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff" fontFamily="Inter,sans-serif">Run diagnostics</text>
      </g>
      {/* gauge + activity */}
      <g className="svg-float" filter="url(#mnt-sh)">
        <rect x={262} y={20} width={98} height={116} rx={14} fill="#0B1530" />
        <path d="M280 108 A32 32 0 0 1 344 108" fill="none" stroke="#24345A" strokeWidth={9} strokeLinecap="round" />
        <path d="M280 108 A32 32 0 0 1 332 82" fill="none" stroke="url(#mnt-bar)" strokeWidth={9} strokeLinecap="round" />
        <text x={311} y={102} textAnchor="middle" fontSize={14} fontWeight={800} fill="#fff" fontFamily="Inter,sans-serif">A+</text>
        <rect x={262} y={148} width={98} height={102} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        {[70, 45, 85, 60].map((h, i) => (
          <rect key={i} x={274 + i * 20} y={232 - h * 0.7} width={12} height={h * 0.7} rx={3} fill={i === 2 ? '#FF5A00' : '#0057E7'} opacity={0.85} />
        ))}
      </g>
    </svg>
  </div>
)

/* ================= ABOUT ================= */

export const AboutEcosystemIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 420 310" role="img" aria-label="Clients reaching web, mobile and ERP products through one platform" className="w-full h-auto select-none">
      <defs>
        {shadow('abt-sh')}
        <linearGradient id="abt-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0057E7" />
          <stop offset="100%" stopColor="#001F80" />
        </linearGradient>
      </defs>
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M210 92 V138 M130 218 L172 172 M290 218 L248 172" stroke="#D9E5F8" strokeWidth={3.5} />
        <path d="M210 92 V138" stroke="#0057E7" strokeWidth={3.5} className="svg-flow" />
        <path d="M130 218 L172 172" stroke="#00CFFF" strokeWidth={3.5} className="svg-flow" />
      </g>
      {/* clients */}
      <g className="svg-float" filter="url(#abt-sh)">
        <rect x={140} y={36} width={140} height={56} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={166 + i * 40} cy={58} r={11} fill={['#0057E7', '#FF5A00', '#00C42B'][i]} opacity={0.9} />
            <rect x={182 + i * 40} y={75} width={0} height={0} fill="none" />
            <rect x={154 + i * 40} y={74} width={24} height={6} rx={3} fill="#C9D4E8" />
          </g>
        ))}
        <text x={210} y={110} textAnchor="middle" fontSize={10} fontWeight={700} fill="#5F6472" fontFamily="Inter,sans-serif">your customers &amp; team</text>
      </g>
      {/* platform core */}
      <g filter="url(#abt-sh)">
        <rect x={110} y={138} width={200} height={58} rx={14} fill="url(#abt-core)" />
        <circle cx={136} cy={167} r={6} fill="#00CFFF" className="svg-pulse" />
        <text x={152} y={164} fontSize={13} fontWeight={800} fill="#fff" fontFamily="Inter,sans-serif">MARVEL platform</text>
        <text x={152} y={180} fontSize={10} fontWeight={500} fill="#fff" opacity={0.75} fontFamily="Inter,sans-serif">one codebase • many products</text>
      </g>
      {/* products */}
      {[
        { x: 36, t: 'Website', d: 'Fast & SEO-ready', c: '#0057E7' },
        { x: 168, t: 'Mobile app', d: 'iOS & Android', c: '#FF5A00' },
        { x: 300, t: 'ERP', d: 'Stock & billing', c: '#FFB800' },
      ].map((b) => (
        <g key={b.t} className="svg-float" filter="url(#abt-sh)">
          <rect x={b.x} y={212} width={84} height={72} rx={12} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
          <rect x={b.x + 12} y={224} width={26} height={26} rx={8} fill={b.c} opacity={0.9} />
          <text x={b.x + 12} y={266} fontSize={11} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">{b.t}</text>
          <text x={b.x + 12} y={278} fontSize={9} fontWeight={500} fill="#5F6472" fontFamily="Inter,sans-serif">{b.d}</text>
        </g>
      ))}
    </svg>
  </div>
)

/* ================= CONTACT ================= */

export const ContactMessageIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 340 240" role="img" aria-label="Project inquiry message being sent with reply notification" className="w-full h-auto select-none">
      <defs>
        {shadow('ctc-sh')}
        <linearGradient id="ctc-env" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0057E7" />
          <stop offset="100%" stopColor="#001F80" />
        </linearGradient>
      </defs>
      {/* form card */}
      <g filter="url(#ctc-sh)">
        <rect x={20} y={30} width={200} height={180} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={38} y={48} width={90} height={11} rx={5.5} fill="#172033" />
        <rect x={38} y={68} width={164} height={24} rx={8} fill="#F1F5FB" stroke="#D9E5F8" />
        <rect x={38} y={100} width={164} height={24} rx={8} fill="#F1F5FB" stroke="#D9E5F8" />
        <rect x={38} y={132} width={164} height={40} rx={8} fill="#F1F5FB" stroke="#D9E5F8" />
        <rect x={38} y={180} width={84} height={20} rx={10} fill="#0057E7" />
      </g>
      {/* envelope flying */}
      <g className="svg-float" filter="url(#ctc-sh)">
        <rect x={216} y={60} width={84} height={60} rx={12} fill="url(#ctc-env)" />
        <path d="M216 72 L258 100 L300 72" fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
        <path d="M300 120 L258 148 L216 120" fill="none" stroke="#00CFFF" strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
      </g>
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M208 130 C 190 150, 170 160, 140 168" stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 8" />
      </g>
      {/* reply badge */}
      <g className="svg-float" style={{ animationDelay: '1.2s' }} filter="url(#ctc-sh)">
        <rect x={212} y={150} width={108} height={56} rx={14} fill="#fff" stroke="#00C42B" strokeWidth={2} />
        <circle cx={230} cy={170} r={8} fill="#00C42B" />
        <path d="M226 170 l3 3 6-6" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" />
        <text x={244} y={168} fontSize={11} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">Reply</text>
        <text x={244} y={183} fontSize={10} fontWeight={500} fill="#5F6472" fontFamily="Inter,sans-serif">within 24h</text>
        <circle cx={312} cy={158} r={6} fill="#FF5A00" className="svg-pulse" />
      </g>
    </svg>
  </div>
)

/* ================= ABOUT ECOSYSTEM (One Idea, Multiple Solutions) ================= */

/**
 * SoftwareEcosystemIllustration — "One Idea, Multiple Software Solutions".
 * Central layered software core wired to WEB / MOBILE / BUSINESS / CLOUD modules.
 * Decorative (the About copy carries the meaning): hidden from screen readers.
 */
export const SoftwareEcosystemIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const mod = () => `eco-module${inView ? ' is-in' : ''}` as const
  const delay = (s: number) => ({ transitionDelay: `${s}s` }) as React.CSSProperties

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 600 440"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
        className="w-full h-auto select-none"
      >
        <defs>{shadow('eco2-sh')}</defs>

        {/* soft backdrop + deco */}
        <ellipse cx={300} cy={220} rx={215} ry={172} fill="#FFF8F0" opacity={0.5} />
        <g fill="none" stroke="#D9E5F8" strokeWidth={2}>
          <circle cx={56} cy={64} r={10} />
          <circle cx={548} cy={118} r={14} />
          <circle cx={64} cy={368} r={12} />
          <circle cx={544} cy={364} r={8} />
        </g>
        <circle cx={486} cy={56} r={4.5} fill="#FF5A00" />
        <circle cx={104} cy={248} r={4} fill="#00CFFF" />
        <circle cx={352} cy={392} r={4} fill="#FF5A00" />

        {/* curved connections (always visible; highlight travels via dash flow) */}
        <g aria-hidden="true" fill="none" strokeLinecap="round">
          <path d="M275 190 C 240 175, 220 160, 205 145" stroke="#D9E5F8" strokeWidth={3} />
          <path d="M275 190 C 240 175, 220 160, 205 145" stroke="#0057E7" strokeWidth={3} className="svg-flow" />
          <path d="M332 185 C 380 175, 415 165, 438 156" stroke="#D9E5F8" strokeWidth={3} />
          <path d="M332 185 C 380 175, 415 165, 438 156" stroke="#00CFFF" strokeWidth={3} className="svg-flow" />
          <path d="M275 248 C 240 272, 222 300, 210 322" stroke="#D9E5F8" strokeWidth={3} />
          <path d="M275 248 C 240 272, 222 300, 210 322" stroke="#0057E7" strokeWidth={3} className="svg-flow" />
          <path d="M332 250 C 380 270, 415 295, 438 318" stroke="#D9E5F8" strokeWidth={3} />
          <path d="M332 250 C 380 270, 415 295, 438 318" stroke="#FF5A00" strokeWidth={3} className="svg-flow" />
        </g>

        {/* WEB module */}
        <g className={mod()} style={delay(0)}>
          <g filter="url(#eco2-sh)">
            <rect x={120} y={90} width={150} height={110} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
            <circle cx={136} cy={104} r={4} fill="#FF5A00" />
            <circle cx={149} cy={104} r={4} fill="#FFB800" />
            <circle cx={162} cy={104} r={4} fill="#00CFFF" />
            <rect x={178} y={98} width={76} height={13} rx={6.5} fill="#F1F5FB" />
            <rect x={134} y={118} width={80} height={11} rx={5.5} fill="#172033" />
            <rect x={134} y={134} width={122} height={6} rx={3} fill="#C9D4E8" />
            <rect x={134} y={146} width={100} height={6} rx={3} fill="#C9D4E8" />
            <rect x={134} y={158} width={56} height={20} rx={10} fill="#0057E7" />
            <rect x={198} y={158} width={58} height={20} rx={10} fill="#fff" stroke="#0057E7" strokeWidth={2} />
          </g>
          <text x={195} y={220} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2} fill="#5F6472" fontFamily="Inter,sans-serif">WEB</text>
        </g>

        {/* MOBILE module */}
        <g className={mod()} style={delay(0.1)}>
          <g filter="url(#eco2-sh)">
            <rect x={440} y={80} width={84} height={150} rx={20} fill="#0B1530" />
            <rect x={446} y={86} width={72} height={138} rx={15} fill="#fff" />
            <rect x={470} y={90} width={24} height={8} rx={4} fill="#0B1530" />
            <rect x={454} y={106} width={56} height={10} rx={5} fill="#172033" />
            <rect x={454} y={122} width={56} height={40} rx={8} fill="#F4F5FF" />
            <circle cx={482} cy={142} r={12} fill="#0057E7" />
            <path d="M477 142 l4 4 8-8" stroke="#fff" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x={454} y={170} width={56} height={8} rx={4} fill="#E2E9F5" />
            <rect x={454} y={184} width={56} height={20} rx={10} fill="#FF5A00" />
          </g>
          <text x={482} y={250} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2} fill="#5F6472" fontFamily="Inter,sans-serif">MOBILE</text>
        </g>

        {/* central software core: layered hub */}
        <circle cx={309} cy={223} r={78} fill="#0057E7" opacity={0.06} />
        <g filter="url(#eco2-sh)">
          <rect x={244} y={164} width={118} height={106} rx={18} fill="#001F80" />
          <rect x={250} y={170} width={118} height={106} rx={18} fill="#0057E7" />
          <rect x={256} y={176} width={118} height={106} rx={18} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
          <circle cx={270} cy={190} r={4} fill="#FF5A00" />
          <circle cx={283} cy={190} r={4} fill="#FFB800" />
          <circle cx={296} cy={190} r={4} fill="#00CFFF" />
          <rect x={310} y={184} width={52} height={12} rx={6} fill="#F1F5FB" />
          <line x1={268} y1={202} x2={362} y2={202} stroke="#E2E9F5" strokeWidth={2} />
          <text x={315} y={238} textAnchor="middle" fontSize={26} fontWeight={800} fill="#0033A0" fontFamily="JetBrains Mono,monospace">{'</>'}</text>
          <circle cx={315} cy={260} r={9} fill="none" stroke="#00CFFF" strokeWidth={2} opacity={0.6} />
          <circle cx={315} cy={260} r={5} fill="#00CFFF" className="svg-pulse" />
        </g>

        {/* connection ports: core side + module side, matching each path color */}
        <g stroke="#fff" strokeWidth={2.5}>
          <circle cx={260} cy={196} r={5} fill="#0057E7" />
          <circle cx={342} cy={190} r={5} fill="#00CFFF" />
          <circle cx={260} cy={250} r={5} fill="#0057E7" />
          <circle cx={342} cy={250} r={5} fill="#FF5A00" />
          <circle cx={273} cy={147} r={5} fill="#0057E7" />
          <circle cx={437} cy={156} r={5} fill="#00CFFF" />
          <circle cx={293} cy={344} r={5} fill="#0057E7" />
          <circle cx={440} cy={330} r={5} fill="#FF5A00" />
        </g>

        {/* BUSINESS module */}
        <g className={mod()} style={delay(0.2)}>
          <g filter="url(#eco2-sh)">
            <rect x={110} y={295} width={180} height={105} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
            <rect x={124} y={309} width={60} height={26} rx={8} fill="#F4F5FF" />
            <text x={132} y={327} fontSize={13} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">86%</text>
            <rect x={192} y={309} width={60} height={26} rx={8} fill="#FFF7E8" />
            <text x={200} y={327} fontSize={13} fontWeight={800} fill="#172033" fontFamily="Inter,sans-serif">+12%</text>
            <rect x={124} y={343} width={152} height={44} rx={8} fill="#F7FAFF" stroke="#E2E9F5" />
            <path d="M132 372 L148 360 L162 366 L178 352 L196 356 L214 344 L232 348 L260 336" fill="none" stroke="#0057E7" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="svg-flow" />
            <circle cx={214} cy={344} r={4} fill="#FF5A00" />
          </g>
          <text x={200} y={420} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2} fill="#5F6472" fontFamily="Inter,sans-serif">BUSINESS</text>
        </g>

        {/* CLOUD module */}
        <g className={mod()} style={delay(0.3)}>
          <g filter="url(#eco2-sh)">
            <circle cx={458} cy={322} r={15} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
            <circle cx={479} cy={314} r={19} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
            <circle cx={500} cy={324} r={13} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
            <rect x={446} y={320} width={66} height={20} rx={10} fill="#fff" />
            <ellipse cx={479} cy={362} rx={26} ry={9} fill="#0057E7" />
            <path d="M453 362 v20 c0 5 12 9 26 9 s26-4 26-9 v-20" fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
            <path d="M453 374 c0 5 12 9 26 9 s26-4 26-9" fill="none" stroke="#00CFFF" strokeWidth={2} />
            <circle cx={479} cy={362} r={4} fill="#FF5A00" className="svg-pulse" />
          </g>
          <text x={479} y={418} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2} fill="#5F6472" fontFamily="Inter,sans-serif">CLOUD</text>
        </g>
      </svg>
    </div>
  )
}

/* ================= ABOUT SHOWCASE (isometric stack + phone + rail) ================= */

/**
 * EcosystemShowcaseIllustration — layered product stack, central app phone,
 * trust/data rail and app tiles, wired with flowing dotted connectors.
 * Decorative (the About copy carries the meaning): hidden from screen readers.
 */
export const EcosystemShowcaseIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const mod = () => `eco-module${inView ? ' is-in' : ''}` as const
  const delay = (s: number) => ({ transitionDelay: `${s}s` }) as React.CSSProperties

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 600 440"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
        className="w-full h-auto select-none"
      >
        <defs>{shadow('eco3-sh')}</defs>

        {/* ground rings */}
        <ellipse cx={165} cy={368} rx={125} ry={24} fill="none" stroke="#D9E5F8" strokeWidth={2} />
        <ellipse cx={165} cy={368} rx={95} ry={16} fill="none" stroke="#D9E5F8" strokeWidth={1.5} strokeDasharray="4 6" />
        <ellipse cx={415} cy={378} rx={140} ry={26} fill="none" stroke="#D9E5F8" strokeWidth={2} />
        <ellipse cx={415} cy={378} rx={108} ry={18} fill="none" stroke="#D9E5F8" strokeWidth={1.5} strokeDasharray="4 6" />

        {/* ===== layered product stack ===== */}
        <g className={mod()} style={delay(0)}>
          {/* bottom: analytics layer */}
          <g filter="url(#eco3-sh)">
            <polygon points="70,222 260,222 232,284 42,284" fill="#D6F3FC" stroke="#00CFFF" strokeWidth={2} strokeLinejoin="round" />
            <polygon points="90,238 170,238 162,254 82,254" fill="#ffffff" opacity={0.9} />
            <polyline points="90,270 118,258 142,264 170,250 200,256" fill="none" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={206} cy={268} r={10} fill="#0057E7" />
            <path d="M206 263 v10 M201 268 h10" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
          </g>
          {/* middle: content layer */}
          <g filter="url(#eco3-sh)">
            <polygon points="70,188 260,188 232,250 42,250" fill="#ffffff" stroke="#D9E5F8" strokeWidth={2} strokeLinejoin="round" />
            <polygon points="90,202 150,202 143,214 83,214" fill="#E2E9F5" />
            <polygon points="168,202 228,202 221,214 161,214" fill="#E2E9F5" />
            <polygon points="90,222 190,222 184,236 84,236" fill="#E2E9F5" />
            <circle cx={214} cy={228} r={6} fill="#FF5A00" />
          </g>
          {/* top: dark UI layer */}
          <g filter="url(#eco3-sh)">
            <polygon points="70,154 260,154 232,216 42,216" fill="#0B1530" stroke="#001F80" strokeWidth={2} strokeLinejoin="round" />
            <polygon points="94,166 140,166 134,178 88,178" fill="#8FB0F5" />
            <polygon points="158,166 222,166 216,174 152,174" fill="#3D5A99" />
            <polygon points="158,180 210,180 205,188 153,188" fill="#3D5A99" />
            <circle cx={102} cy={196} r={9} fill="#00CFFF" />
            <polygon points="122,190 170,190 165,200 117,200" fill="#5B7BD5" />
          </g>
        </g>

        {/* stack → phone links */}
        <g aria-hidden="true" fill="none" strokeLinecap="round">
          <path d="M252 205 H264" stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 7" />
          <path d="M252 205 H264" stroke="#0057E7" strokeWidth={3} className="svg-flow" />
          <path d="M248 250 H264" stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 7" />
          <path d="M248 250 H264" stroke="#00CFFF" strokeWidth={3} className="svg-flow" />
        </g>

        {/* ===== central app phone ===== */}
        <g className={mod()} style={delay(0.12)}>
          <g filter="url(#eco3-sh)">
            <rect x={264} y={118} width={98} height={224} rx={24} fill="#0B1530" />
            <rect x={270} y={124} width={86} height={212} rx={19} fill="#fff" />
            <rect x={298} y={129} width={30} height={9} rx={4.5} fill="#0B1530" />
            <circle cx={284} cy={152} r={11} fill="#0057E7" />
            <path d="M280 152 l3 3 6-6" stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="300,152 307,144 313,158 321,148 329,154 345,146" fill="none" stroke="#0057E7" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
            <line x1={278} y1={168} x2={348} y2={168} stroke="#E2E9F5" strokeWidth={1.5} />
            <rect x={278} y={176} width={70} height={60} rx={9} fill="#F4F5FF" />
            <circle cx={327} cy={200} r={12} fill="none" stroke="#E2E9F5" strokeWidth={6} />
            <circle cx={327} cy={200} r={12} fill="none" stroke="#FF5A00" strokeWidth={6} strokeLinecap="round" strokeDasharray="38 76" transform="rotate(-90 327 200)" />
            <rect x={286} y={188} width={22} height={6} rx={3} fill="#C9D4E8" />
            <rect x={286} y={199} width={16} height={6} rx={3} fill="#C9D4E8" />
            <rect x={278} y={244} width={70} height={8} rx={4} fill="#E2E9F5" />
            <rect x={278} y={258} width={52} height={8} rx={4} fill="#E2E9F5" />
            <rect x={278} y={276} width={70} height={30} rx={12} fill="#0B1530" />
            <circle cx={294} cy={291} r={5} fill="#FF5A00" />
            <circle cx={313} cy={291} r={5} fill="#3D5A99" />
            <circle cx={332} cy={291} r={5} fill="#3D5A99" />
          </g>
        </g>

        {/* phone → rail links */}
        <g aria-hidden="true" fill="none" strokeLinecap="round">
          <path d="M362 190 C 392 182, 404 160, 422 142" stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 8" />
          <path d="M362 190 C 392 182, 404 160, 422 142" stroke="#0057E7" strokeWidth={3} className="svg-flow" />
          <path d="M362 235 C 390 235, 404 232, 422 230" stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 8" />
          <path d="M362 235 C 390 235, 404 232, 422 230" stroke="#00CFFF" strokeWidth={3} className="svg-flow" />
          <path d="M362 280 C 390 290, 404 310, 420 326" stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 8" />
          <path d="M362 280 C 390 290, 404 310, 420 326" stroke="#FF5A00" strokeWidth={3} className="svg-flow" />
        </g>

        {/* ===== trust / data rail ===== */}
        <g className={mod()} style={delay(0.24)}>
          <rect x={424} y={122} width={92} height={28} rx={10} fill="#EDF2F9" stroke="#D9E5F8" strokeWidth={2} />
          <path d="M470 62 L494 72 V92 C494 108 482 118 470 124 C458 118 446 108 446 92 V72 Z" fill="#0033A0" stroke="#001F80" strokeWidth={2.5} strokeLinejoin="round" filter="url(#eco3-sh)" />
          <path d="M462 92 l6 6 12-12" stroke="#fff" strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={470} y1={128} x2={470} y2={168} stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 7" />
          <circle cx={470} cy={196} r={27} fill="#0033A0" filter="url(#eco3-sh)" />
          <g stroke="#fff" strokeWidth={1.6} opacity={0.85}>
            <line x1={470} y1={196} x2={452} y2={184} />
            <line x1={470} y1={196} x2={489} y2={186} />
            <line x1={470} y1={196} x2={458} y2={214} />
            <line x1={470} y1={196} x2={488} y2={212} />
          </g>
          <circle cx={452} cy={184} r={4.5} fill="#00CFFF" />
          <circle cx={489} cy={186} r={4.5} fill="#00CFFF" />
          <circle cx={458} cy={214} r={4.5} fill="#00CFFF" />
          <circle cx={488} cy={212} r={4.5} fill="#FF5A00" />
          <circle cx={470} cy={196} r={5} fill="#fff" className="svg-pulse" />
          <rect x={424} y={228} width={92} height={28} rx={10} fill="#EDF2F9" stroke="#D9E5F8" strokeWidth={2} />
          <line x1={470} y1={260} x2={470} y2={296} stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 7" />
          <g filter="url(#eco3-sh)">
            <ellipse cx={470} cy={304} rx={27} ry={9} fill="#0057E7" />
            <path d="M443 304 v30 c0 5 12 9 27 9 s27-4 27-9 v-30" fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
            <path d="M443 320 c0 5 12 9 27 9 s27-4 27-9" fill="none" stroke="#00CFFF" strokeWidth={2} />
            <circle cx={470} cy={304} r={4} fill="#FF5A00" className="svg-pulse" />
          </g>
          <rect x={424} y={340} width={92} height={28} rx={10} fill="#EDF2F9" stroke="#D9E5F8" strokeWidth={2} />
        </g>

        {/* rail → tiles links */}
        <g aria-hidden="true" fill="none" strokeLinecap="round">
          <path d="M516 150 C 524 160, 528 168, 532 178" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 7" />
          <path d="M516 240 C 524 248, 528 256, 532 264" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 7" />
        </g>

        {/* ===== app tiles ===== */}
        <g className={mod()} style={delay(0.36)}>
          <g filter="url(#eco3-sh)">
            <rect x={532} y={178} width={56} height={56} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
            <path d="M560 190 c-8 0 -13 6 -13 14 v6 l-4 7 h34 l-4 -7 v-6 c0 -8 -5 -14 -13 -14 Z" fill="#0057E7" />
            <circle cx={560} cy={188} r={3.5} fill="#0057E7" />
            <path d="M548 200 c-3 3 -4 7 -3 11 M572 200 c3 3 4 7 3 11" stroke="#00CFFF" strokeWidth={2} fill="none" strokeLinecap="round" />
            <rect x={532} y={248} width={56} height={56} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
            <rect x={542} y={260} width={36} height={24} rx={8} fill="#0057E7" />
            <polygon points="552,284 552,292 560,284" fill="#0057E7" />
            <circle cx={552} cy={272} r={3} fill="#fff" />
            <circle cx={560} cy={272} r={3} fill="#fff" />
            <circle cx={568} cy={272} r={3} fill="#fff" />
          </g>
        </g>
      </svg>
    </div>
  )
}

/* ================= HEADER SPOT ILLUSTRATIONS (unique per page) ================= */

/** Services header: hub with four mini service tiles. */
export const ServicesHeaderIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 400 300" role="img" aria-label="Four service areas connected to a central hub" className="w-full h-auto select-none">
      <defs>{shadow('svch-sh')}</defs>
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M200 150 H160 M200 150 H240 M200 150 V110 M200 150 V190" stroke="#D9E5F8" strokeWidth={3} />
        <path d="M200 150 H160" stroke="#0057E7" strokeWidth={3} className="svg-flow" />
        <path d="M200 150 H240" stroke="#00CFFF" strokeWidth={3} className="svg-flow" />
        <path d="M200 150 V110" stroke="#FF5A00" strokeWidth={3} className="svg-flow" />
      </g>
      {[
        { x: 44, y: 118, c: '#0057E7', shape: 'web' },
        { x: 264, y: 118, c: '#00CFFF', shape: 'mobile' },
        { x: 44, y: 198, c: '#FF5A00', shape: 'cloud' },
        { x: 264, y: 198, c: '#FFB800', shape: 'chip' },
      ].map((t) => (
        <g key={t.x + t.y} className="svg-float" filter="url(#svch-sh)">
          <rect x={t.x} y={t.y} width={92} height={64} rx={12} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
          {t.shape === 'web' && (
            <g>
              <rect x={t.x + 12} y={t.y + 12} width={68} height={10} rx={5} fill="#172033" opacity={0.8} />
              <rect x={t.x + 12} y={t.y + 28} width={68} height={6} rx={3} fill="#C9D4E8" />
              <rect x={t.x + 12} y={t.y + 40} width={34} height={12} rx={6} fill={t.c} />
            </g>
          )}
          {t.shape === 'mobile' && (
            <g>
              <rect x={t.x + 30} y={t.y + 8} width={32} height={48} rx={8} fill="#0B1530" />
              <rect x={t.x + 34} y={t.y + 12} width={24} height={32} rx={5} fill="#fff" />
              <rect x={t.x + 34} y={t.y + 46} width={24} height={6} rx={3} fill={t.c} />
            </g>
          )}
          {t.shape === 'cloud' && (
            <g>
              <circle cx={t.x + 36} cy={t.y + 32} r={10} fill="#F4F5FF" stroke={t.c} strokeWidth={2.5} />
              <circle cx={t.x + 50} cy={t.y + 26} r={13} fill="#F4F5FF" stroke={t.c} strokeWidth={2.5} />
              <circle cx={t.x + 62} cy={t.y + 33} r={9} fill="#F4F5FF" stroke={t.c} strokeWidth={2.5} />
            </g>
          )}
          {t.shape === 'chip' && (
            <g>
              <rect x={t.x + 30} y={t.y + 18} width={32} height={32} rx={7} fill="#0B1530" />
              <rect x={t.x + 38} y={t.y + 26} width={16} height={16} rx={3} fill={t.c} />
              <g stroke={t.c} strokeWidth={2.5} strokeLinecap="round">
                <line x1={t.x + 34} y1={t.y + 10} x2={t.x + 34} y2={t.y + 18} />
                <line x1={t.x + 58} y1={t.y + 10} x2={t.x + 58} y2={t.y + 18} />
                <line x1={t.x + 34} y1={t.y + 50} x2={t.x + 34} y2={t.y + 58} />
                <line x1={t.x + 58} y1={t.y + 50} x2={t.x + 58} y2={t.y + 58} />
              </g>
            </g>
          )}
        </g>
      ))}
      <g filter="url(#svch-sh)">
        <circle cx={200} cy={150} r={26} fill="#0057E7" />
        <path d="M192 150 l6 6 12-12" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={200} cy={150} r={26} fill="none" stroke="#00CFFF" strokeWidth={2} strokeDasharray="6 8" className="svg-flow" />
      </g>
    </svg>
  </div>
)

/** Projects header: stacked portfolio windows with a selection cursor. */
export const ProjectsHeaderIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 400 300" role="img" aria-label="Stack of project preview windows with a selection cursor" className="w-full h-auto select-none">
      <defs>{shadow('pjh-sh')}</defs>
      <g filter="url(#pjh-sh)">
        <rect x={70} y={70} width={230} height={170} rx={14} fill="#EDF2F9" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={90} y={46} width={230} height={170} rx={14} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={90} y={46} width={230} height={30} rx={14} fill="#F1F5FB" />
        <ChromeDots x={104} y={61} />
        <rect x={110} y={92} width={120} height={12} rx={6} fill="#172033" />
        <rect x={110} y={112} width={180} height={7} rx={3.5} fill="#C9D4E8" />
        <rect x={110} y={126} width={150} height={7} rx={3.5} fill="#C9D4E8" />
        <rect x={110} y={144} width={70} height={52} rx={8} fill="#F4F5FF" />
        <rect x={188} y={144} width={70} height={52} rx={8} fill="#FFF7E8" stroke="#FFB800" strokeWidth={1.5} />
      </g>
      <g className="svg-float" filter="url(#pjh-sh)">
        <rect x={250} y={170} width={110} height={110} rx={14} fill="#0057E7" />
        <rect x={264} y={184} width={82} height={10} rx={5} fill="#fff" opacity={0.9} />
        <rect x={264} y={200} width={60} height={7} rx={3.5} fill="#00CFFF" />
        <circle cx={282} cy={238} r={14} fill="#fff" opacity={0.95} />
        <path d="M276 238 l4 4 8-8" stroke="#0057E7" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="svg-float" style={{ animationDelay: '1.2s' }}>
        <g transform="translate(150,250)">
          <polygon
            points="0,0 0,-30 7.5,-22.5 11.5,-31.5 16.5,-28.5 12.5,-19.5 20,-19.5"
            fill="#172033"
            stroke="#fff"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </g>
        <circle cx={150} cy={218} r={14} fill="none" stroke="#FF5A00" strokeWidth={2.5} strokeDasharray="8 8" className="svg-flow" />
      </g>
    </svg>
  </div>
)

/* ================= PROCESS ================= */

/** Contact: isometric teamwork platforms (present, build, analyze, meet, ideate, data). */
function IsoPerson({
  x,
  y,
  shirt = '#0057E7',
  pants = '#0B1530',
  pose = 'stand',
}: {
  x: number
  y: number
  shirt?: string
  pants?: string
  pose?: 'stand' | 'point' | 'sit' | 'hold'
}) {
  const skin = '#F2C49B'
  const sit = pose === 'sit'
  const hx = sit ? x - 1 : x
  const hy = sit ? y - 54 : y - 68
  return (
    <g>
      {sit ? (
        <g>
          <rect x={x - 30} y={y - 15} width={32} height={12} rx={6} fill={pants} />
          <rect x={x - 32} y={y - 15} width={12} height={27} rx={6} fill={pants} />
          <ellipse cx={x - 24} cy={y + 13} rx={8} ry={3.5} fill="#0B1530" />
          <rect x={x - 13} y={y - 44} width={24} height={32} rx={9} fill={shirt} />
          <polygon
            points={`${x - 6},${y - 44} ${x + 1},${y - 36} ${x + 8},${y - 44} ${x + 8},${y - 48} ${x - 6},${y - 48}`}
            fill="#fff"
            opacity={0.9}
          />
          <path d={`M ${x - 11} ${y - 36} L ${x - 25} ${y - 24}`} stroke={shirt} strokeWidth={7} strokeLinecap="round" />
          <circle cx={x - 26} cy={y - 23} r={4} fill={skin} />
        </g>
      ) : (
        <g>
          <ellipse cx={x - 6} cy={y - 1} rx={6.5} ry={3} fill="#0B1530" />
          <ellipse cx={x + 6} cy={y - 1} rx={6.5} ry={3} fill="#0B1530" />
          <rect x={x - 10} y={y - 24} width={8} height={22} rx={3.5} fill={pants} />
          <rect x={x + 2} y={y - 24} width={8} height={22} rx={3.5} fill={pants} />
          <rect x={x - 12} y={y - 52} width={24} height={30} rx={9} fill={shirt} />
          <polygon
            points={`${x - 6},${y - 52} ${x + 1},${y - 44} ${x + 8},${y - 52} ${x + 8},${y - 56} ${x - 6},${y - 56}`}
            fill="#fff"
            opacity={0.9}
          />
          <path d={`M ${x - 11} ${y - 46} L ${x - 15} ${y - 28}`} stroke={shirt} strokeWidth={7} strokeLinecap="round" />
          <circle cx={x - 15} cy={y - 26} r={4} fill={skin} />
          {pose === 'stand' ? (
            <g>
              <path d={`M ${x + 11} ${y - 46} L ${x + 15} ${y - 28}`} stroke={shirt} strokeWidth={7} strokeLinecap="round" />
              <circle cx={x + 15} cy={y - 26} r={4} fill={skin} />
            </g>
          ) : pose === 'point' ? (
            <g>
              <path d={`M ${x + 11} ${y - 46} L ${x + 26} ${y - 58}`} stroke={shirt} strokeWidth={7} strokeLinecap="round" />
              <circle cx={x + 27} cy={y - 59} r={4} fill={skin} />
            </g>
          ) : (
            <g>
              <path d={`M ${x + 11} ${y - 46} L ${x + 22} ${y - 66}`} stroke={shirt} strokeWidth={7} strokeLinecap="round" />
              <circle cx={x + 23} cy={y - 67} r={4} fill={skin} />
            </g>
          )}
        </g>
      )}
      <rect x={hx - 4} y={hy + 8} width={8} height={9} rx={3} fill="#E8B48C" />
      <circle cx={hx} cy={hy} r={10.5} fill={skin} />
      <path
        d={`M ${hx - 10.5} ${hy + 2} C ${hx - 11} ${hy - 12} ${hx + 11} ${hy - 12} ${hx + 10.5} ${hy + 2} C ${hx + 6} ${hy - 2} ${hx - 6} ${hy - 2} ${hx - 10.5} ${hy + 2} Z`}
        fill="#0B1530"
      />
      <circle cx={hx - 3.5} cy={hy - 1} r={1.3} fill="#0B1530" />
      <circle cx={hx + 3.5} cy={hy - 1} r={1.3} fill="#0B1530" />
      <path d={`M ${hx - 3} ${hy + 5} Q ${hx} ${hy + 7} ${hx + 3} ${hy + 5}`} stroke="#0B1530" strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </g>
  )
}

function IsoPlatform({
  x,
  y,
  delay = 0,
  children,
}: {
  x: number
  y: number
  delay?: number
  children: React.ReactNode
}) {
  return (
    <g className="svg-float" style={{ animationDelay: `${delay}s` }} filter="url(#cch-sh)">
      <polygon points={`${x - 56},${y} ${x},${y + 28} ${x},${y + 40} ${x - 56},${y + 12}`} fill="#D9E5F8" />
      <polygon points={`${x + 56},${y} ${x},${y + 28} ${x},${y + 40} ${x + 56},${y + 12}`} fill="#B9C6DD" />
      <polygon
        points={`${x},${y - 28} ${x + 56},${y} ${x},${y + 28} ${x - 56},${y}`}
        fill="#ffffff"
        stroke="#D9E5F8"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {children}
    </g>
  )
}

export const ContactChatIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 400 300" role="img" aria-label="Team collaborating across design, development, data and ideas" className="w-full h-auto select-none">
      <defs>{shadow('cch-sh')}</defs>

      {/* dotted links between platforms */}
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M134 112 H144" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 6" />
        <path d="M134 112 H144" stroke="#0057E7" strokeWidth={2.5} className="svg-flow" />
        <path d="M256 112 H266" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 6" />
        <path d="M256 112 H266" stroke="#00CFFF" strokeWidth={2.5} className="svg-flow" />
        <path d="M134 232 H144" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 6" />
        <path d="M134 232 H144" stroke="#FF5A00" strokeWidth={2.5} className="svg-flow" />
        <path d="M256 232 H266" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 6" />
        <path d="M256 232 H266" stroke="#0057E7" strokeWidth={2.5} className="svg-flow" />
        <path d="M78 152 V194" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 6" />
        <path d="M200 152 V194" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 6" />
        <path d="M322 152 V194" stroke="#D9E5F8" strokeWidth={2.5} strokeDasharray="2 6" />
      </g>

      {/* present */}
      <IsoPlatform x={78} y={112} delay={0}>
        <line x1={56} y1={92} x2={56} y2={112} stroke="#B9C6DD" strokeWidth={3} />
        <line x1={100} y1={92} x2={100} y2={112} stroke="#B9C6DD" strokeWidth={3} />
        <rect x={46} y={50} width={60} height={44} rx={4} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={54} y={58} width={30} height={5} rx={2.5} fill="#5F6472" />
        <rect x={54} y={76} width={10} height={12} rx={2} fill="#0057E7" />
        <rect x={68} y={70} width={10} height={18} rx={2} fill="#FF5A00" />
        <rect x={82} y={78} width={10} height={10} rx={2} fill="#00CFFF" />
        <IsoPerson x={102} y={120} shirt="#0033A0" pose="point" />
      </IsoPlatform>

      {/* build on laptop */}
      <IsoPlatform x={200} y={112} delay={0.7}>
        <rect x={176} y={96} width={54} height={8} rx={3} fill="#B9C6DD" />
        <line x1={184} y1={104} x2={184} y2={118} stroke="#B9C6DD" strokeWidth={3} />
        <line x1={222} y1={104} x2={222} y2={118} stroke="#B9C6DD" strokeWidth={3} />
        <rect x={188} y={72} width={32} height={24} rx={2} fill="#0B1530" />
        <rect x={192} y={77} width={14} height={4} rx={2} fill="#00CFFF" />
        <rect x={192} y={84} width={20} height={4} rx={2} fill="#fff" opacity={0.7} />
        <polygon points="184,96 224,96 228,102 180,102" fill="#8EA0BF" />
        <IsoPerson x={228} y={122} shirt="#0057E7" pose="sit" />
      </IsoPlatform>

      {/* analyze chart */}
      <IsoPlatform x={322} y={112} delay={1.4}>
        <line x1={306} y1={100} x2={306} y2={118} stroke="#B9C6DD" strokeWidth={3} />
        <line x1={350} y1={100} x2={350} y2={118} stroke="#B9C6DD" strokeWidth={3} />
        <rect x={294} y={54} width={58} height={62} rx={4} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <rect x={302} y={88} width={11} height={20} rx={2} fill="#0057E7" />
        <rect x={317} y={78} width={11} height={30} rx={2} fill="#00CFFF" />
        <rect x={332} y={86} width={11} height={22} rx={2} fill="#FF5A00" />
        <IsoPerson x={288} y={120} shirt="#FF5A00" pose="stand" />
      </IsoPlatform>

      {/* meet */}
      <IsoPlatform x={78} y={232} delay={0.4}>
        <IsoPerson x={62} y={240} shirt="#0057E7" pose="stand" />
        <IsoPerson x={96} y={240} shirt="#0B1530" pose="stand" />
        <rect x={54} y={192} width={58} height={28} rx={10} fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        <polygon points="68,220 68,230 78,220" fill="#fff" stroke="#D9E5F8" strokeWidth={2} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={72 + i * 13} cy={206} r={3.5} fill="#0057E7" className="svg-pulse" style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
      </IsoPlatform>

      {/* ideate */}
      <IsoPlatform x={200} y={232} delay={1.1}>
        <IsoPerson x={188} y={240} shirt="#0033A0" pose="hold" />
        <circle cx={213} cy={166} r={20} fill="#FFB800" opacity={0.25} className="svg-pulse" />
        <circle cx={213} cy={166} r={13} fill="#FFB800" />
        <rect x={207} y={178} width={12} height={7} rx={2} fill="#5F6472" />
        <g stroke="#FF5A00" strokeWidth={2} strokeLinecap="round">
          <line x1={213} y1={144} x2={213} y2={148} />
          <line x1={197} y1={152} x2={200} y2={155} />
          <line x1={229} y1={152} x2={226} y2={155} />
        </g>
      </IsoPlatform>

      {/* data */}
      <IsoPlatform x={322} y={232} delay={1.8}>
        <ellipse cx={306} cy={222} rx={17} ry={6} fill="#0057E7" />
        <rect x={289} y={222} width={34} height={22} fill="#fff" stroke="#0057E7" strokeWidth={2} />
        <path d="M289 236 c0 4 8 7 17 7 s17 -3 17 -7" fill="none" stroke="#00CFFF" strokeWidth={1.8} />
        <circle cx={306} cy={222} r={3.5} fill="#FF5A00" className="svg-pulse" />
        <ellipse cx={342} cy={238} rx={11} ry={4.5} fill="#FFB800" />
        <ellipse cx={342} cy={233} rx={11} ry={4.5} fill="#FFB800" />
        <ellipse cx={342} cy={228} rx={11} ry={4.5} fill="#FFD34D" />
      </IsoPlatform>

      {/* sparkles */}
      <g stroke="#FFB800" strokeWidth={2} strokeLinecap="round">
        <path d="M36 52 v10 M31 57 h10" />
        <path d="M362 52 v10 M357 57 h10" />
      </g>
      <circle cx={200} cy={22} r={3} fill="#00CFFF" />
      <circle cx={40} cy={180} r={3} fill="#FF5A00" />
    </svg>
  </div>
)

/** Hero idea accent: a thinking man whose idea launches as a paper rocket. */
export const ThinkingRocketIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => {
  const svgRef = React.useRef<SVGSVGElement>(null)
  // SMIL motion is outside CSS control: pause it for reduced-motion users.
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      svgRef.current?.pauseAnimations()
    }
  }, [])
  return (
  <div className={className}>
    <svg ref={svgRef} viewBox="0 0 380 130" role="img" aria-label="An idea launching from a thought cloud as a paper rocket toward intelligent software" className="w-full h-auto select-none overflow-visible">
      <defs>
        {shadow('idea-sh')}
        <radialGradient id="idea-glow">
          <stop offset="0%" stopColor="#FFB800" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* idea cloud above "Your Ideas" */}
      <g className="svg-float" filter="url(#idea-sh)">
        <circle cx={112} cy={62} r={26} fill="url(#idea-glow)" className="svg-pulse" />
        <circle cx={90} cy={70} r={15} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
        <circle cx={112} cy={62} r={20} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
        <circle cx={134} cy={72} r={14} fill="#fff" stroke="#0057E7" strokeWidth={2.5} />
        <rect x={78} y={66} width={68} height={22} rx={11} fill="#fff" />
        {/* bulb */}
        <circle cx={111} cy={68} r={10} fill="#FFB800" />
        <rect x={106} y={78} width={10} height={6} rx={2} fill="#5F6472" />
        <g stroke="#FF5A00" strokeWidth={2.2} strokeLinecap="round">
          <line x1={111} y1={50} x2={111} y2={54} />
          <line x1={97} y1={56} x2={100} y2={59} />
          <line x1={125} y1={56} x2={122} y2={59} />
        </g>
        {/* tiny blue sparkles */}
        <circle cx={78} cy={48} r={2.5} fill="#00CFFF" />
        <circle cx={148} cy={54} r={2.5} fill="#00CFFF" />
      </g>

      {/* dotted flight path: cloud → toward "Softwares" */}
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M152 58 C 210 52, 270 36, 326 22" stroke="#D9E5F8" strokeWidth={3} strokeDasharray="2 9" />
        <path d="M152 58 C 210 52, 270 36, 326 22" stroke="#FF5A00" strokeWidth={3} className="svg-flow" />
      </g>

      {/* paper rocket flying cloud → Softwares */}
      <g filter="url(#idea-sh)">
        <animateMotion
          dur="3.2s"
          repeatCount="indefinite"
          keyPoints="0;1;0"
          keyTimes="0;0.5;1"
          calcMode="linear"
          path="M168 55 C 220 48, 272 34, 318 23"
          rotate="auto"
        />
        <g transform="scale(1.25)">
          <polygon points="26,0 -14,-13 -6,0 -14,13" fill="#fff" stroke="#0057E7" strokeWidth={2.5} strokeLinejoin="round" />
          <polygon points="26,0 -14,-13 -6,0" fill="#0057E7" opacity={0.9} />
          <polygon points="-2,-8 12,0 -2,3" fill="#FF5A00" />
          <g stroke="#00CFFF" strokeWidth={2.5} strokeLinecap="round" opacity={0.9}>
            <line x1={-20} y1={-6} x2={-30} y2={-9} />
            <line x1={-20} y1={6} x2={-30} y2={9} />
          </g>
        </g>
      </g>

      {/* destination sparkle near "Softwares" */}
      <g stroke="#FFB800" strokeWidth={2.5} strokeLinecap="round">
        <path d="M336 14 v10 M331 19 h10" />
      </g>
    </svg>
  </div>
  )
}

export const ProcessConnector: React.FC<{ vertical?: boolean }> = ({ vertical = false }) =>
  vertical ? (
    <svg viewBox="0 0 8 120" aria-hidden="true" className="h-full w-2" preserveAspectRatio="none">
      <line x1={4} y1={0} x2={4} y2={120} stroke="#D9E5F8" strokeWidth={4} strokeLinecap="round" />
      <line x1={4} y1={0} x2={4} y2={120} stroke="#0057E7" strokeWidth={4} strokeLinecap="round" className="svg-flow" />
    </svg>
  ) : (
    <svg viewBox="0 0 120 8" aria-hidden="true" className="h-2 w-full" preserveAspectRatio="none">
      <line x1={0} y1={4} x2={120} y2={4} stroke="#D9E5F8" strokeWidth={4} strokeLinecap="round" />
      <line x1={0} y1={4} x2={120} y2={4} stroke="#0057E7" strokeWidth={4} strokeLinecap="round" className="svg-flow" />
    </svg>
  )

export default EcosystemHero

import React from 'react'
import type { IllustrationProps } from './WebDevIllustration'

/* Shared frame: white card, neutral border, brand accents. */
const card = {
  fill: '#FFFFFF',
  stroke: '#E8E5E1',
}

function BrowserChrome({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <line x1={x} y1={y + 24} x2={x + w} y2={y + 24} stroke={card.stroke} strokeWidth={1.5} />
      <circle cx={x + 14} cy={y + 12} r={4} fill="#FF5A00" />
      <circle cx={x + 27} cy={y + 12} r={4} fill="#FFB800" />
      <circle cx={x + 40} cy={y + 12} r={4} fill="#00CFFF" />
    </g>
  )
}

/**
 * Home hero: software ecosystem — browser, phone, dashboard
 * and database joined by animated connection paths.
 */
export const EcosystemHero: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg
      viewBox="0 0 560 420"
      role="img"
      aria-label="Connected software ecosystem: website, mobile app, dashboard and database"
      className="w-full h-auto select-none overflow-visible"
    >
      {/* connection backbone */}
      <g aria-hidden="true">
        <path d="M130 200 C 200 200, 220 120, 300 130" fill="none" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M130 200 C 200 200, 220 120, 300 130" fill="none" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
        <path d="M130 210 C 210 210, 240 300, 330 290" fill="none" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M130 210 C 210 210, 240 300, 330 290" fill="none" stroke="#00CFFF" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
        <path d="M300 130 C 360 140, 400 180, 430 220" fill="none" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M300 130 C 360 140, 400 180, 430 220" fill="none" stroke="#FF5A00" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
      </g>

      {/* Browser window */}
      <g className="svg-float">
        <rect x={40} y={140} width={180} height={140} rx={14} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
        <BrowserChrome x={40} y={140} w={180} />
        <rect x={56} y={178} width={100} height={10} rx={5} fill="#172033" />
        <rect x={56} y={194} width={148} height={6} rx={3} fill="#E8E5E1" />
        <rect x={56} y={206} width={120} height={6} rx={3} fill="#E8E5E1" />
        <rect x={56} y={226} width={64} height={22} rx={11} fill="#0057E7" />
        <rect x={66} y={233} width={44} height={7} rx={3.5} fill="#fff" />
        <rect x={128} y={226} width={64} height={22} rx={11} fill="#F4F5FF" stroke="#FF5A00" strokeWidth={1.5} />
      </g>

      {/* Dashboard panel */}
      <g className="svg-float" style={{ animationDelay: '.8s' }}>
        <rect x={230} y={60} width={190} height={130} rx={14} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
        <rect x={246} y={78} width={80} height={14} rx={7} fill="#F4F5FF" />
        <rect x={246} y={100} width={158} height={58} rx={8} fill="#F6F8FB" />
        <path d="M258 142 L282 128 L304 136 L330 114 L356 122 L388 106" fill="none" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={330} cy={114} r={5} fill="#FF5A00" className="svg-pulse" />
      </g>

      {/* Phone */}
      <g className="svg-float" style={{ animationDelay: '1.6s' }}>
        <rect x={250} y={230} width={96} height={160} rx={20} fill={card.fill} stroke="#172033" strokeWidth={2.5} />
        <rect x={278} y={238} width={40} height={6} rx={3} fill="#E8E5E1" />
        <rect x={262} y={254} width={72} height={52} rx={8} fill="#F4F5FF" />
        <circle cx={298} cy={280} r={14} fill="#0057E7" />
        <path d="M292 280 l4 4 8-8" stroke="#fff" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x={262} y={316} width={72} height={8} rx={4} fill="#E8E5E1" />
        <rect x={262} y={330} width={52} height={8} rx={4} fill="#E8E5E1" />
        <rect x={262} y={348} width={72} height={20} rx={10} fill="#FF5A00" />
      </g>

      {/* Database / cloud node */}
      <g className="svg-float" style={{ animationDelay: '2.2s' }}>
        <ellipse cx={455} cy={245} rx={38} ry={12} fill="#F4F5FF" stroke="#0057E7" strokeWidth={2} />
        <path d="M417 245 v45 c0 7 17 12 38 12 s38-5 38-12 v-45" fill={card.fill} stroke="#0057E7" strokeWidth={2} />
        <path d="M417 267 c0 7 17 12 38 12 s38-5 38-12" fill="none" stroke="#00CFFF" strokeWidth={2} />
        <circle cx={455} cy={245} r={5} fill="#FF5A00" className="svg-pulse" />
      </g>
    </svg>
  </div>
)

/** Web applications: dashboard cards with a chart that draws. */
export const WebAppIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 260" role="img" aria-label="Web application dashboard with analytics chart" className="w-full h-auto select-none">
      <rect x={20} y={16} width={320} height={228} rx={16} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
      <BrowserChrome x={20} y={16} w={320} />
      <rect x={38} y={60} width={90} height={70} rx={10} fill="#F4F5FF" />
      <rect x={50} y={74} width={52} height={9} rx={4.5} fill="#FF5A00" opacity={0.75} />
      <rect x={50} y={90} width={66} height={6} rx={3} fill="#E8E5E1" />
      <rect x={50} y={102} width={48} height={6} rx={3} fill="#E8E5E1" />
      <rect x={140} y={60} width={90} height={70} rx={10} fill="#F4F5FF" />
      <rect x={152} y={74} width={52} height={9} rx={4.5} fill="#0057E7" opacity={0.75} />
      <rect x={152} y={90} width={66} height={6} rx={3} fill="#E8E5E1" />
      <rect x={152} y={102} width={48} height={6} rx={3} fill="#E8E5E1" />
      <rect x={242} y={60} width={80} height={70} rx={10} fill="#F6F8FB" />
      <circle cx={282} cy={95} r={20} fill="none" stroke="#E8E5E1" strokeWidth={8} />
      <circle cx={282} cy={95} r={20} fill="none" stroke="#FFB800" strokeWidth={8} strokeLinecap="round" strokeDasharray="80 126" transform="rotate(-90 282 95)" />
      <rect x={38} y={142} width={284} height={84} rx={10} fill="#F6F8FB" />
      <path d="M54 200 L96 176 L134 188 L176 158 L220 168 L262 142 L306 150" fill="none" stroke="#0057E7" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={262} cy={142} r={6} fill="#fff" stroke="#FF5A00" strokeWidth={3} />
    </svg>
  </div>
)

/** ERP: connected business modules around a central dashboard. */
export const ErpIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 280" role="img" aria-label="Connected business modules around a central ERP dashboard" className="w-full h-auto select-none">
      <g aria-hidden="true">
        <path d="M180 140 L60 70 M180 140 L300 70 M180 140 L60 215 M180 140 L300 215" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M180 140 L60 70" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
        <path d="M180 140 L300 215" stroke="#00CFFF" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
      </g>
      {/* center */}
      <g className="svg-float">
        <rect x={125} y={100} width={110} height={80} rx={14} fill="#0057E7" />
        <rect x={139} y={114} width={82} height={9} rx={4.5} fill="#fff" opacity={0.9} />
        <rect x={139} y={129} width={60} height={7} rx={3.5} fill="#00CFFF" />
        <rect x={139} y={142} width={70} height={7} rx={3.5} fill="#fff" opacity={0.6} />
        <rect x={139} y={156} width={44} height={12} rx={6} fill="#FF5A00" />
      </g>
      {[
        { x: 18, y: 40, label: 'Stock', fill: '#F4F5FF' },
        { x: 258, y: 40, label: 'Billing', fill: '#F4F5FF' },
        { x: 18, y: 190, label: 'People', fill: '#F4F5FF' },
        { x: 258, y: 190, label: 'Sales', fill: '#F4F5FF' },
      ].map((m) => (
        <g key={m.label}>
          <rect x={m.x} y={m.y} width={84} height={52} rx={12} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
          <rect x={m.x + 12} y={m.y + 12} width={34} height={8} rx={4} fill={m.fill} stroke="#E8E5E1" />
          <rect x={m.x + 12} y={m.y + 28} width={60} height={7} rx={3.5} fill="#172033" opacity={0.75} />
        </g>
      ))}
    </svg>
  </div>
)

/** Custom software: modular blocks assembling into one interface. */
export const CustomSoftwareIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 260" role="img" aria-label="Modular software components assembling into one interface" className="w-full h-auto select-none">
      <rect x={70} y={30} width={220} height={200} rx={16} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
      <BrowserChrome x={70} y={30} w={220} />
      <g className="svg-float">
        <rect x={88} y={70} width={96} height={64} rx={10} fill="#F4F5FF" stroke="#0057E7" strokeWidth={1.5} />
        <rect x={100} y={84} width={60} height={8} rx={4} fill="#0057E7" opacity={0.7} />
        <rect x={100} y={98} width={72} height={6} rx={3} fill="#B9C6DD" />
        <rect x={100} y={110} width={48} height={6} rx={3} fill="#B9C6DD" />
      </g>
      <g className="svg-float" style={{ animationDelay: '1s' }}>
        <rect x={192} y={70} width={80} height={64} rx={10} fill="#F4F5FF" stroke="#FF5A00" strokeWidth={1.5} />
        <circle cx={232} cy={102} r={18} fill="none" stroke="#FF5A00" strokeWidth={5} strokeDasharray="70 113" strokeLinecap="round" transform="rotate(-90 232 102)" />
      </g>
      <g className="svg-float" style={{ animationDelay: '2s' }}>
        <rect x={88} y={142} width={184} height={70} rx={10} fill="#F6F8FB" stroke="#E8E5E1" strokeWidth={1.5} />
        <rect x={102} y={156} width={120} height={8} rx={4} fill="#172033" opacity={0.7} />
        <rect x={102} y={170} width={156} height={6} rx={3} fill="#B9C6DD" />
        <rect x={102} y={182} width={56} height={16} rx={8} fill="#0057E7" />
      </g>
    </svg>
  </div>
)

/** API & integration: connected service nodes with moving highlight. */
export const ApiIntegrationIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 240" role="img" aria-label="Connected service nodes showing API integration" className="w-full h-auto select-none">
      <g aria-hidden="true">
        <path d="M90 120 H270" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M90 120 H270" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
        <path d="M180 120 V52 M180 120 V192" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M180 120 V52" stroke="#00CFFF" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
      </g>
      {[
        { cx: 60, cy: 120, label: 'App' },
        { cx: 300, cy: 120, label: 'API' },
        { cx: 180, cy: 44, label: 'Pay' },
        { cx: 180, cy: 198, label: 'Data' },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.cx} cy={n.cy} r={26} fill={card.fill} stroke="#0057E7" strokeWidth={2} />
          <circle cx={n.cx} cy={n.cy} r={7} fill="#FF5A00" />
        </g>
      ))}
      <circle cx={180} cy={120} r={32} fill="#0057E7" />
      <path d="M168 120 l8 8 16-16" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={180} cy={120} r={32} fill="none" stroke="#00CFFF" strokeWidth={2} strokeDasharray="6 8" className="svg-flow" />
    </svg>
  </div>
)

/** About: software architecture diagram (team-free). */
export const AboutEcosystemIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 400 300" role="img" aria-label="Software architecture diagram of users, applications and data" className="w-full h-auto select-none">
      <g aria-hidden="true">
        <path d="M200 90 V140 M120 210 L170 165 M280 210 L230 165 M200 140 V165" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M200 90 V140" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
      </g>
      <g className="svg-float">
        <rect x={140} y={40} width={120} height={52} rx={12} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
        <circle cx={162} cy={66} r={10} fill="#F4F5FF" stroke="#0057E7" strokeWidth={2} />
        <rect x={180} y={58} width={62} height={8} rx={4} fill="#172033" opacity={0.8} />
        <rect x={180} y={70} width={44} height={6} rx={3} fill="#B9C6DD" />
      </g>
      <g>
        <rect x={110} y={140} width={180} height={54} rx={12} fill="#0057E7" />
        <rect x={126} y={156} width={120} height={9} rx={4.5} fill="#fff" opacity={0.9} />
        <rect x={126} y={170} width={80} height={7} rx={3.5} fill="#00CFFF" />
      </g>
      {[
        { x: 40, y: 210, t: 'Web', c: '#0057E7' },
        { x: 158, y: 210, t: 'Mobile', c: '#FF5A00' },
        { x: 276, y: 210, t: 'ERP', c: '#FFB800' },
      ].map((b) => (
        <g key={b.t} className="svg-float">
          <rect x={b.x} y={b.y} width={84} height={56} rx={12} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
          <circle cx={b.x + 22} cy={b.y + 28} r={8} fill={b.c} opacity={0.85} />
          <rect x={b.x + 36} y={b.y + 20} width={36} height={7} rx={3.5} fill="#172033" opacity={0.75} />
          <rect x={b.x + 36} y={b.y + 31} width={28} height={6} rx={3} fill="#B9C6DD" />
        </g>
      ))}
    </svg>
  </div>
)

/** Website development: browser with responsive frames + cursor highlight. */
export const WebsiteDevIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 260" role="img" aria-label="Responsive website shown on desktop and mobile frames" className="w-full h-auto select-none">
      <rect x={24} y={24} width={252} height={196} rx={16} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
      <BrowserChrome x={24} y={24} w={252} />
      <rect x={42} y={62} width={120} height={12} rx={6} fill="#172033" />
      <rect x={42} y={82} width={216} height={7} rx={3.5} fill="#E8E5E1" />
      <rect x={42} y={96} width={180} height={7} rx={3.5} fill="#E8E5E1" />
      <rect x={42} y={116} width={104} height={72} rx={10} fill="#F4F5FF" />
      <rect x={54} y={128} width={80} height={8} rx={4} fill="#0057E7" opacity={0.7} />
      <rect x={54} y={142} width={64} height={6} rx={3} fill="#B9C6DD" />
      <rect x={54} y={154} width={48} height={18} rx={9} fill="#0057E7" />
      <rect x={156} y={116} width={104} height={72} rx={10} fill="#F4F5FF" />
      <circle cx={208} cy={142} r={16} fill="none" stroke="#FFB800" strokeWidth={5} strokeLinecap="round" strokeDasharray="60 101" transform="rotate(-90 208 142)" />
      <rect x={168} y={166} width={80} height={6} rx={3} fill="#B9C6DD" />
      {/* mobile frame */}
      <g className="svg-float">
        <rect x={252} y={110} width={84} height={130} rx={16} fill={card.fill} stroke="#0057E7" strokeWidth={2.5} />
        <rect x={284} y={117} width={20} height={5} rx={2.5} fill="#E8E5E1" />
        <rect x={262} y={130} width={64} height={8} rx={4} fill="#172033" opacity={0.8} />
        <rect x={262} y={144} width={64} height={40} rx={8} fill="#F4F5FF" />
        <rect x={262} y={192} width={64} height={18} rx={9} fill="#FF5A00" />
      </g>
      {/* cursor */}
      <g className="svg-float" style={{ animationDelay: '1.2s' }}>
        <path d="M150 200 l0 -22 l5 5 l3 -1 l-3 -5 l4 -2 l3 5 l3 -1 l-8 21 z" fill="#172033" stroke="#fff" strokeWidth={1.5} />
        <circle cx={170} cy={206} r={10} fill="none" stroke="#00CFFF" strokeWidth={2.5} className="svg-pulse" />
      </g>
    </svg>
  </div>
)

/** Mobile apps: two phone outlines with a moving connection. */
export const MobileAppIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 260" role="img" aria-label="Two mobile phones connected to a shared backend" className="w-full h-auto select-none">
      <g aria-hidden="true">
        <path d="M110 130 H250" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M110 130 H250" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
      </g>
      <g className="svg-float">
        <rect x={36} y={60} width={100} height={170} rx={22} fill={card.fill} stroke="#172033" strokeWidth={2.5} />
        <rect x={72} y={68} width={28} height={6} rx={3} fill="#E8E5E1" />
        <rect x={48} y={84} width={76} height={56} rx={10} fill="#F4F5FF" />
        <circle cx={86} cy={112} r={14} fill="#0057E7" />
        <path d="M80 112 l4 4 8-8" stroke="#fff" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x={48} y={150} width={76} height={8} rx={4} fill="#E8E5E1" />
        <rect x={48} y={164} width={56} height={8} rx={4} fill="#E8E5E1" />
        <rect x={48} y={182} width={76} height={22} rx={11} fill="#0057E7" />
      </g>
      <g className="svg-float" style={{ animationDelay: '1.4s' }}>
        <rect x={224} y={48} width={100} height={170} rx={22} fill={card.fill} stroke="#0057E7" strokeWidth={2.5} />
        <rect x={260} y={56} width={28} height={6} rx={3} fill="#E8E5E1" />
        <rect x={236} y={72} width={76} height={8} rx={4} fill="#172033" opacity={0.8} />
        <rect x={236} y={88} width={76} height={52} rx={10} fill="#F4F5FF" />
        <path d="M248 122 L262 110 L274 118 L290 104" fill="none" stroke="#FF5A00" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={290} cy={104} r={5} fill="#FF5A00" className="svg-pulse" />
        <rect x={236} y={150} width={76} height={8} rx={4} fill="#E8E5E1" />
        <rect x={236} y={164} width={76} height={22} rx={11} fill="#fff" stroke="#0057E7" strokeWidth={2} />
      </g>
      {/* shared backend node */}
      <circle cx={180} cy={130} r={20} fill="#fff" stroke="#0057E7" strokeWidth={2} />
      <circle cx={180} cy={130} r={6} fill="#FF5A00" />
    </svg>
  </div>
)

/** UI/UX: design canvas with palette and a drawing path. */
export const UiUxCanvasIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 260" role="img" aria-label="Design canvas with color palette and interface wireframe" className="w-full h-auto select-none">
      <rect x={24} y={24} width={240} height={200} rx={16} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
      <rect x={42} y={44} width={120} height={10} rx={5} fill="#E8E5E1" />
      <rect x={42} y={66} width={204} height={70} rx={10} fill="none" stroke="#0057E7" strokeWidth={2} strokeDasharray="8 6" />
      <rect x={56} y={80} width={90} height={9} rx={4.5} fill="#172033" opacity={0.7} />
      <rect x={56} y={96} width={130} height={6} rx={3} fill="#B9C6DD" />
      <path d="M56 122 C 90 100, 130 128, 170 108 S 220 96, 232 82" fill="none" stroke="#FF5A00" strokeWidth={3} strokeLinecap="round" />
      <circle cx={232} cy={82} r={6} fill="#fff" stroke="#FF5A00" strokeWidth={3} className="svg-pulse" />
      <rect x={42} y={150} width={96} height={56} rx={10} fill="#F4F5FF" />
      <rect x={150} y={150} width={96} height={56} rx={10} fill="#F4F5FF" />
      {/* palette */}
      <g className="svg-float">
        <rect x={276} y={60} width={60} height={130} rx={14} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
        <circle cx={306} cy={90} r={12} fill="#0057E7" />
        <circle cx={306} cy={120} r={12} fill="#00CFFF" />
        <circle cx={306} cy={150} r={12} fill="#FF5A00" />
        <circle cx={306} cy={176} r={8} fill="none" stroke="#B9C6DD" strokeWidth={2} />
      </g>
    </svg>
  </div>
)

/** Cloud & DevOps: cloud, server and deployment path. */
export const CloudDeployIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 260" role="img" aria-label="Cloud connected to servers through a deployment pipeline" className="w-full h-auto select-none">
      <g aria-hidden="true">
        <path d="M180 110 V160 M120 200 H240" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M180 110 V160" stroke="#00CFFF" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
        <path d="M120 200 H240" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
      </g>
      <g className="svg-float">
        <path d="M120 60 h48 a26 26 0 0 1 5 -51 a34 34 0 0 1 66 -8 a24 24 0 0 1 21 27 a22 22 0 0 1 -12 32 h-128 a22 22 0 0 1 0 -0 Z" fill="#F4F5FF" stroke="#0057E7" strokeWidth={2.5} strokeLinejoin="round" />
        <circle cx={180} cy={78} r={5} fill="#FF5A00" className="svg-pulse" />
      </g>
      {[
        { x: 66, c: '#0057E7' },
        { x: 156, c: '#00CFFF' },
        { x: 246, c: '#FFB800' },
      ].map((s) => (
        <g key={s.x}>
          <rect x={s.x} y={160} width={48} height={64} rx={10} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
          <rect x={s.x + 9} y={172} width={30} height={6} rx={3} fill={s.c} opacity={0.8} />
          <rect x={s.x + 9} y={184} width={30} height={6} rx={3} fill="#E8E5E1" />
          <circle cx={s.x + 15} cy={206} r={4} fill={s.c} />
          <rect x={s.x + 23} y={203} width={16} height={6} rx={3} fill="#B9C6DD" />
        </g>
      ))}
    </svg>
  </div>
)

/** AI & automation: processing nodes with a controlled data flow. */
export const AiFlowIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 260" role="img" aria-label="Document flowing through AI processing into organized output" className="w-full h-auto select-none">
      <g aria-hidden="true">
        <path d="M110 130 H250" stroke="#D9E5F8" strokeWidth={3} strokeLinecap="round" />
        <path d="M110 130 H250" stroke="#0057E7" strokeWidth={3} strokeLinecap="round" className="svg-flow" />
      </g>
      <g className="svg-float">
        <rect x={30} y={90} width={80} height={90} rx={12} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
        <rect x={44} y={104} width={52} height={8} rx={4} fill="#172033" opacity={0.7} />
        <rect x={44} y={118} width={52} height={6} rx={3} fill="#B9C6DD" />
        <rect x={44} y={130} width={40} height={6} rx={3} fill="#B9C6DD" />
        <rect x={44} y={142} width={52} height={6} rx={3} fill="#B9C6DD" />
        <rect x={44} y={158} width={34} height={12} rx={6} fill="#FFB800" />
      </g>
      <g>
        <circle cx={180} cy={130} r={40} fill="#0057E7" />
        <circle cx={180} cy={130} r={40} fill="none" stroke="#00CFFF" strokeWidth={2} strokeDasharray="6 8" className="svg-flow" />
        <path d="M168 130 l9 9 17-18" stroke="#fff" strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="svg-float" style={{ animationDelay: '1s' }}>
        <rect x={250} y={90} width={80} height={90} rx={12} fill={card.fill} stroke="#0057E7" strokeWidth={2} />
        <rect x={264} y={104} width={52} height={22} rx={7} fill="#F4F5FF" />
        <rect x={264} y={132} width={52} height={8} rx={4} fill="#0057E7" opacity={0.7} />
        <rect x={264} y={146} width={40} height={6} rx={3} fill="#B9C6DD" />
        <rect x={264} y={158} width={48} height={6} rx={3} fill="#B9C6DD" />
      </g>
    </svg>
  </div>
)

/** Maintenance & consulting: architecture panel with status indicator. */
export const MaintenanceIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => (
  <div className={className}>
    <svg viewBox="0 0 360 260" role="img" aria-label="System architecture panel with health status checks" className="w-full h-auto select-none">
      <rect x={30} y={24} width={300} height={212} rx={16} fill={card.fill} stroke={card.stroke} strokeWidth={2} />
      <BrowserChrome x={30} y={24} w={300} />
      {[
        { y: 64, ok: true, w: 150 },
        { y: 104, ok: true, w: 190 },
        { y: 144, ok: false, w: 120 },
      ].map((r, i) => (
        <g key={i}>
          <rect x={48} y={r.y} width={264} height={32} rx={10} fill={i === 2 ? '#FFF7E8' : '#F4F5FF'} stroke={i === 2 ? '#FFB800' : '#E8E5E1'} strokeWidth={1.5} />
          <circle cx={66} cy={r.y + 16} r={7} fill={r.ok ? '#0057E7' : '#FFB800'} className={r.ok ? undefined : 'svg-pulse'} />
          {r.ok && <path d={`M62 ${r.y + 16} l3 3 6-6`} stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x={82} y={r.y + 9} width={r.w} height={7} rx={3.5} fill="#172033" opacity={0.65} />
          <rect x={82} y={r.y + 19} width={90} height={5} rx={2.5} fill="#B9C6DD" />
        </g>
      ))}
      {/* inspection lens */}
      <g className="svg-float">
        <circle cx={286} cy={196} r={22} fill="#fff" stroke="#0057E7" strokeWidth={3} opacity={0.95} />
        <line x1={302} y1={212} x2={316} y2={226} stroke="#0057E7" strokeWidth={6} strokeLinecap="round" />
        <path d="M278 196 l6 6 12-12" stroke="#FF5A00" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  </div>
)

/** Process connector: animated line drawing between steps. */
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

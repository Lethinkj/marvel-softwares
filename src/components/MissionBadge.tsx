import React from 'react'

export const MissionBadge: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 280 320" className={className} role="img" aria-label="Mission badge" style={{ maxWidth: 'none' }}>
    <defs>
      <linearGradient id="mb-ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff8a45" />
        <stop offset="55%" stopColor="#ff5a00" />
        <stop offset="100%" stopColor="#e14a00" />
      </linearGradient>
      <linearGradient id="mb-silver" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#dcdde2" />
        <stop offset="100%" stopColor="#f5f5f7" />
      </linearGradient>
      <radialGradient id="mb-face" cx="0.5" cy="0.4" r="0.78">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="72%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e9ebef" />
      </radialGradient>
      <linearGradient id="mb-refl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff5a00" stopOpacity="0.38" />
        <stop offset="100%" stopColor="#ff5a00" stopOpacity="0" />
      </linearGradient>
      <filter id="mb-blur" x="-30%" y="-80%" width="160%" height="260%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
      <clipPath id="mb-emblem">
        <circle cx="140" cy="118" r="41" />
      </clipPath>
    </defs>

    {/* reflection */}
    <ellipse cx="140" cy="294" rx="66" ry="10" fill="url(#mb-refl)" filter="url(#mb-blur)" />
    <ellipse cx="140" cy="294" rx="40" ry="5.5" fill="#ff5a00" opacity="0.14" filter="url(#mb-blur)" />

    {/* face */}
    <circle cx="140" cy="145" r="93" fill="url(#mb-face)" stroke="#e4e5e9" strokeWidth="1" />
    <circle cx="140" cy="145" r="90" fill="none" stroke="rgba(23,32,51,0.05)" strokeWidth="4" />

    {/* ring: full orange base, darker crescent lower-right, silver segment left, white notch cuts */}
    <circle cx="140" cy="145" r="104" fill="none" stroke="url(#mb-ring)" strokeWidth="24" />
    <path d="M237.75 180.57 A104 104 0 0 1 121.94 247.45" fill="none" stroke="#d13e00" strokeWidth="24" opacity="0.4" />
    <path d="M65.2 217.25 A104 104 0 0 1 65.2 72.75" fill="none" stroke="url(#mb-silver)" strokeWidth="24" />
    <path d="M73.15 224.67 A104 104 0 0 1 65.2 217.25" fill="none" stroke="#ffffff" strokeWidth="24" />
    <path d="M65.2 72.75 A104 104 0 0 1 73.15 65.33" fill="none" stroke="#ffffff" strokeWidth="24" />

    {/* emblem: mountain + flag inside thin ring */}
    <circle cx="140" cy="118" r="44" fill="#ffffff" stroke="#ff5a00" strokeWidth="5" />
    <g clipPath="url(#mb-emblem)">
      <ellipse cx="140" cy="141" rx="30" ry="9" fill="#ff5a00" />
      <path d="M116 141 L138 108 L160 141 Z" fill="#ff5a00" />
      <path d="M148 141 L159 124 L172 141 Z" fill="#ff8a45" />
      <path d="M138 108 L138 88" stroke="#ff5a00" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M138 90 L152 95 L138 101 Z" fill="#ff5a00" />
    </g>

    {/* label */}
    <text
      x="140"
      y="202"
      textAnchor="middle"
      fontSize="19"
      fontWeight="800"
      letterSpacing="2.5"
      fill="#ff5a00"
      fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    >
      MISSION
    </text>
  </svg>
)

export default MissionBadge

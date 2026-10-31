import React from 'react'

export const VisionBadge: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 280 320" className={className} role="img" aria-label="Vision badge" style={{ maxWidth: 'none' }}>
    <defs>
      <linearGradient id="vb-ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#56b0ff" />
        <stop offset="45%" stopColor="#1e88f0" />
        <stop offset="100%" stopColor="#0a63c9" />
      </linearGradient>
      <linearGradient id="vb-silver" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#dcdde2" />
        <stop offset="100%" stopColor="#f5f5f7" />
      </linearGradient>
      <radialGradient id="vb-face" cx="0.5" cy="0.4" r="0.78">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="72%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e9ebef" />
      </radialGradient>
      <linearGradient id="vb-refl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e88f0" stopOpacity="0.38" />
        <stop offset="100%" stopColor="#1e88f0" stopOpacity="0" />
      </linearGradient>
      <filter id="vb-blur" x="-30%" y="-80%" width="160%" height="260%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
    </defs>

    {/* reflection */}
    <ellipse cx="140" cy="294" rx="66" ry="10" fill="url(#vb-refl)" filter="url(#vb-blur)" />
    <ellipse cx="140" cy="294" rx="40" ry="5.5" fill="#1e88f0" opacity="0.14" filter="url(#vb-blur)" />

    {/* face */}
    <circle cx="140" cy="145" r="93" fill="url(#vb-face)" stroke="#e4e5e9" strokeWidth="1" />
    <circle cx="140" cy="145" r="90" fill="none" stroke="rgba(23,32,51,0.05)" strokeWidth="4" />

    {/* ring: blue base, dark crescent lower-right, silver segment left, white notch cuts */}
    <circle cx="140" cy="145" r="104" fill="none" stroke="url(#vb-ring)" strokeWidth="24" />
    <path d="M237.75 180.57 A104 104 0 0 1 121.94 247.45" fill="none" stroke="#0a3d8c" strokeWidth="24" opacity="0.4" />
    <path d="M65.2 217.25 A104 104 0 0 1 65.2 72.75" fill="none" stroke="url(#vb-silver)" strokeWidth="24" />
    <path d="M73.15 224.67 A104 104 0 0 1 65.2 217.25" fill="none" stroke="#ffffff" strokeWidth="24" />
    <path d="M65.2 72.75 A104 104 0 0 1 73.15 65.33" fill="none" stroke="#ffffff" strokeWidth="24" />

    {/* gear + bulb emblem inside thin ring */}
    <circle cx="140" cy="118" r="44" fill="#ffffff" stroke="#1e88f0" strokeWidth="5" />
    <g fill="none" stroke="#1e88f0">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="136.5" y="90" width="7" height="8" rx="1.5" fill="#1e88f0" stroke="none" transform={`rotate(${a} 140 116)`} />
      ))}
      <circle cx="140" cy="116" r="21" strokeWidth="5.5" />
      <path
        d="M134 114 a6.5 6.5 0 1 1 12 0 c0 2.6 -1.2 3.9 -2.3 5 l-0.4 3.5 h-6.6 l-0.4 -3.5 c-1.1 -1.1 -2.3 -2.4 -2.3 -5 Z"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="#ffffff"
      />
      <path d="M137.4 111.5 q2.6 3.2 5.2 0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M136 126.5 h8" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M137.5 129.5 h5" strokeWidth="2.4" strokeLinecap="round" />
    </g>

    {/* label */}
    <text
      x="140"
      y="202"
      textAnchor="middle"
      fontSize="19"
      fontWeight="800"
      letterSpacing="2.5"
      fill="#1e88f0"
      fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    >
      VISION
    </text>
  </svg>
)

export default VisionBadge

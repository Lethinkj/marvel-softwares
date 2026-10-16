import React from 'react'

export interface TeamAvatarProps {
  name: string
  className?: string
  size?: number
}

/**
 * TeamAvatar
 * Custom flat-vector avatars faithfully styled after the user's reference sheets:
 * 1. Alex Chen (CEO): Tech founder with modern swept undercut, sculpted beard & mustache, stylish V-neck.
 * 2. Sarah Mitchell (CTO): Engineering leader with sleek parted hair behind ears, pointed white collar under terracotta blazer.
 * 3. Marcus Johnson (Head of Design): Creative director with spiky textured dark hair, iconic white designer sunglasses, mock-neck sweater with chest ring emblem.
 * 4. Elena Rodriguez (Lead Engineer): High-performance engineer with modern bob fringe, collared polo shirt with button placket.
 *
 * Strict vintage warm palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const TeamAvatar: React.FC<TeamAvatarProps> = ({
  name,
  className = 'w-20 h-20 sm:w-24 sm:h-24',
}) => {
  const normalizedName = name.toLowerCase()

  // Match team member avatar based on name
  if (normalizedName.includes('alex') || normalizedName.includes('chen')) {
    return <AlexChenAvatar className={className} name={name} />
  }

  if (normalizedName.includes('sarah') || normalizedName.includes('mitchell')) {
    return <SarahMitchellAvatar className={className} name={name} />
  }

  if (normalizedName.includes('marcus') || normalizedName.includes('johnson')) {
    return <MarcusJohnsonAvatar className={className} name={name} />
  }

  if (normalizedName.includes('elena') || normalizedName.includes('rodriguez')) {
    return <ElenaRodriguezAvatar className={className} name={name} />
  }

  // Fallback default avatar
  return <AlexChenAvatar className={className} name={name} />
}

/**
 * Alex Chen &mdash; CEO & Co-Founder
 * Reference: Avatar 2 from Image 1 & Image 0
 * Stylish swept undercut hairstyle, groomed full beard & mustache, stylish V-neck.
 */
export const AlexChenAvatar: React.FC<{ className?: string; name?: string }> = ({
  className = 'w-20 h-20 sm:w-24 sm:h-24',
  name = 'Alex Chen',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    role="img"
    aria-label={`${name} Avatar`}
  >
    <defs>
      <clipPath id="alex-circle-clip">
        <circle cx="60" cy="60" r="56" />
      </clipPath>
      <linearGradient id="alex-bg-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FCF2E5" />
        <stop offset="100%" stopColor="#f5e4ce" />
      </linearGradient>
    </defs>

    {/* Avatar Outer Ring */}
    <circle cx="60" cy="60" r="58" fill="none" stroke="#EC5B38" strokeWidth="2" strokeOpacity="0.35" />

    {/* Clipped Avatar Content */}
    <g clipPath="url(#alex-circle-clip)">
      {/* Background fill */}
      <circle cx="60" cy="60" r="56" fill="url(#alex-bg-grad)" />

      {/* Torso / Shoulders in Terracotta (#EC5B38) */}
      <path
        d="M 22 120 C 24 96, 42 84, 60 84 C 78 84, 96 96, 98 120 Z"
        fill="#EC5B38"
      />
      {/* V-Neck Tee Cutout */}
      <polygon points="50,84 70,84 60,98" fill="#FCF2E5" />
      {/* Collar Shadow Accent */}
      <path d="M 52 84 L 60 96 L 68 84" stroke="#d44724" strokeWidth="1.5" strokeLinecap="round" />

      {/* Neck */}
      <path d="M 52 66 L 52 86 L 68 86 L 68 66 Z" fill="#FCF2E5" />
      <path d="M 60 68 L 68 86 L 52 86 Z" fill="#524646" fillOpacity="0.08" />

      {/* Ears */}
      <ellipse cx="38" cy="56" rx="4" ry="6.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
      <ellipse cx="82" cy="56" rx="4" ry="6.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />

      {/* Head / Face Oval */}
      <ellipse cx="60" cy="54" rx="19" ry="24" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />

      {/* Half-Tone Face Shading (Flat Vector style from reference) */}
      <path
        d="M 60 30 C 68 30, 79 38, 79 54 C 79 70, 68 78, 60 78 Z"
        fill="#524646"
        fillOpacity="0.06"
      />

      {/* Full Groomed Beard and Mustache (Direct reference feature!) */}
      <path
        d="M 43 54 C 43 68, 50 78, 60 78 C 70 78, 77 68, 77 54 C 77 62, 72 70, 60 70 C 48 70, 43 62, 43 54 Z"
        fill="#524646"
      />
      {/* Mustache arc */}
      <path
        d="M 50 63 C 54 60, 58 64, 60 62 C 62 64, 66 60, 70 63 C 66 66, 62 65, 60 65 C 58 65, 54 66, 50 63 Z"
        fill="#524646"
      />

      {/* Eyes & Eyebrows */}
      <path d="M 48 46 C 50 44, 54 44, 56 46" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="52" cy="50" r="2" fill="#524646" />

      <path d="M 64 46 C 66 44, 70 44, 72 46" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="68" cy="50" r="2" fill="#524646" />

      {/* Nose Line */}
      <path d="M 60 48 L 59 55 L 62 55" stroke="#524646" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

      {/* Modern Swept Undercut Hairstyle (Direct reference feature!) */}
      <path
        d="M 40 48 C 38 34, 46 22, 62 20 C 74 19, 83 24, 84 36 C 85 44, 84 50, 81 54 C 80 44, 80 34, 74 30 C 66 26, 52 28, 45 36 C 42 40, 41 44, 40 48 Z"
        fill="#524646"
      />
      {/* Dynamic quiff tuft curving over forehead */}
      <path
        d="M 40 32 C 34 22, 46 16, 58 17 C 50 18, 42 22, 40 32 Z"
        fill="#3d3333"
      />
    </g>
  </svg>
)

/**
 * Sarah Mitchell &mdash; CTO & Co-Founder
 * Reference: Avatar 3 from Image 1
 * Sleek parted brunette hair tucked behind ears, sharp pointed collar under terracotta blazer.
 */
export const SarahMitchellAvatar: React.FC<{ className?: string; name?: string }> = ({
  className = 'w-20 h-20 sm:w-24 sm:h-24',
  name = 'Sarah Mitchell',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    role="img"
    aria-label={`${name} Avatar`}
  >
    <defs>
      <clipPath id="sarah-circle-clip">
        <circle cx="60" cy="60" r="56" />
      </clipPath>
      <linearGradient id="sarah-bg-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FCF2E5" />
        <stop offset="100%" stopColor="#f3ded0" />
      </linearGradient>
    </defs>

    {/* Avatar Outer Ring */}
    <circle cx="60" cy="60" r="58" fill="none" stroke="#A8A492" strokeWidth="2" strokeOpacity="0.4" />

    {/* Clipped Avatar Content */}
    <g clipPath="url(#sarah-circle-clip)">
      <circle cx="60" cy="60" r="56" fill="url(#sarah-bg-grad)" />

      {/* Long Hair Cascading Behind Shoulders */}
      <path
        d="M 38 45 C 36 65, 36 90, 42 120 L 78 120 C 84 90, 84 65, 82 45 Z"
        fill="#3e3434"
      />

      {/* Shoulders / Chic Cardigan/Blazer in Terracotta (#EC5B38) */}
      <path
        d="M 22 120 C 24 96, 42 84, 60 84 C 78 84, 96 96, 98 120 Z"
        fill="#EC5B38"
      />
      {/* Dark Contrast Lapel Collar on Blazer */}
      <polygon points="52,84 68,84 64,120 56,120" fill="#524646" />
      {/* Inner Crisp White Collared Shirt with Pointed Lapels */}
      <polygon points="54,84 66,84 60,98" fill="#ffffff" />
      <polygon points="52,82 58,92 56,82" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />
      <polygon points="68,82 62,92 64,82" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />

      {/* Neck */}
      <path d="M 54 66 L 54 84 L 66 84 L 66 66 Z" fill="#FCF2E5" />

      {/* Ears */}
      <ellipse cx="40" cy="56" rx="3.5" ry="6" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
      <ellipse cx="80" cy="56" rx="3.5" ry="6" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />

      {/* Head / Face Oval */}
      <ellipse cx="60" cy="53" rx="18" ry="23" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />

      {/* Half-Tone Face Shading */}
      <path
        d="M 60 30 C 67 30, 78 38, 78 53 C 78 68, 67 76, 60 76 Z"
        fill="#524646"
        fillOpacity="0.06"
      />

      {/* Sleek Hair Front Profile (Tucked behind ears, parting in center) */}
      <path
        d="M 42 54 C 40 38, 48 24, 60 22 C 72 24, 80 38, 78 54 C 77 46, 74 32, 68 28 C 64 25, 60 27, 60 27 C 60 27, 56 25, 52 28 C 46 32, 43 46, 42 54 Z"
        fill="#524646"
      />
      {/* Top Hair Volume */}
      <path
        d="M 44 32 C 40 22, 50 16, 60 17 C 70 16, 80 22, 76 32 Z"
        fill="#524646"
      />

      {/* Eyes & Eyebrows */}
      <path d="M 49 46 C 51 44, 55 44, 57 46" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="53" cy="50" r="1.8" fill="#524646" />

      <path d="M 63 46 C 65 44, 69 44, 71 46" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="67" cy="50" r="1.8" fill="#524646" />

      {/* Nose */}
      <path d="M 60 48 L 59 55 L 62 55" stroke="#524646" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

      {/* Friendly Smile */}
      <path d="M 55 63 Q 60 67 65 63" stroke="#EC5B38" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>
  </svg>
)

/**
 * Marcus Johnson &mdash; Head of Design
 * Reference: Avatar 1 from Image 1
 * Creative design director with spiky dark hair, iconic white designer sunglasses,
 * mock-neck sweater with modern circular chest graphic.
 */
export const MarcusJohnsonAvatar: React.FC<{ className?: string; name?: string }> = ({
  className = 'w-20 h-20 sm:w-24 sm:h-24',
  name = 'Marcus Johnson',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    role="img"
    aria-label={`${name} Avatar`}
  >
    <defs>
      <clipPath id="marcus-circle-clip">
        <circle cx="60" cy="60" r="56" />
      </clipPath>
      <linearGradient id="marcus-bg-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FCF2E5" />
        <stop offset="100%" stopColor="#faece0" />
      </linearGradient>
    </defs>

    {/* Avatar Outer Ring */}
    <circle cx="60" cy="60" r="58" fill="none" stroke="#524646" strokeWidth="2" strokeOpacity="0.35" />

    {/* Clipped Avatar Content */}
    <g clipPath="url(#marcus-circle-clip)">
      <circle cx="60" cy="60" r="56" fill="url(#marcus-bg-grad)" />

      {/* Torso in Espresso Charcoal (#524646) Mock-Neck */}
      <path
        d="M 22 120 C 24 96, 42 82, 60 82 C 78 82, 96 96, 98 120 Z"
        fill="#524646"
      />

      {/* Iconic Circular Chest Emblem (Direct reference feature from Avatar 1!) */}
      <circle cx="60" cy="104" r="11" fill="none" stroke="#FCF2E5" strokeWidth="3" />
      <circle cx="60" cy="104" r="5" fill="#EC5B38" />

      {/* Mock-Neck Collar */}
      <rect x="52" y="74" width="16" height="12" rx="3" fill="#3e3434" />

      {/* Neck */}
      <path d="M 53 66 L 53 78 L 67 78 L 67 66 Z" fill="#FCF2E5" />

      {/* Ears */}
      <ellipse cx="38" cy="56" rx="4" ry="6.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
      <ellipse cx="82" cy="56" rx="4" ry="6.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />

      {/* Head / Face Oval */}
      <ellipse cx="60" cy="54" rx="19" ry="24" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />

      {/* Half-Tone Face Shading */}
      <path
        d="M 60 30 C 68 30, 79 38, 79 54 C 79 70, 68 78, 60 78 Z"
        fill="#524646"
        fillOpacity="0.06"
      />

      {/* Iconic White Designer Sunglasses (Direct reference feature from Avatar 1!) */}
      {/* Left Lens Frame */}
      <rect x="42" y="46" width="16" height="12" rx="4" fill="#ffffff" stroke="#524646" strokeWidth="1.2" />
      <rect x="44" y="48" width="12" height="8" rx="2.5" fill="#524646" />
      {/* Left Lens Shimmer */}
      <line x1="46" y1="50" x2="52" y2="50" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />

      {/* Right Lens Frame */}
      <rect x="62" y="46" width="16" height="12" rx="4" fill="#ffffff" stroke="#524646" strokeWidth="1.2" />
      <rect x="64" y="48" width="12" height="8" rx="2.5" fill="#524646" />
      {/* Right Lens Shimmer */}
      <line x1="66" y1="50" x2="72" y2="50" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />

      {/* Bridge connecting frames */}
      <rect x="57" y="49" width="6" height="2" fill="#ffffff" />
      {/* Side Arms */}
      <line x1="42" y1="51" x2="38" y2="53" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="78" y1="51" x2="82" y2="53" stroke="#ffffff" strokeWidth="1.5" />

      {/* Nose */}
      <path d="M 60 58 L 59 62 L 62 62" stroke="#524646" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

      {/* Confident Smile */}
      <path d="M 56 68 Q 60 71 64 68" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Spiky Modern Designer Hairstyle (Direct reference feature!) */}
      <path
        d="M 40 46 C 38 34, 44 24, 52 20 L 56 14 L 62 19 L 68 13 L 72 20 L 78 17 L 80 26 C 84 32, 84 40, 81 48 C 79 36, 76 30, 68 28 C 58 26, 46 32, 40 46 Z"
        fill="#524646"
      />
    </g>
  </svg>
)

/**
 * Elena Rodriguez &mdash; Lead Engineer
 * Reference: Vector Character Rig Sheet from Image 0 & Image 1
 * Modern bob haircut with fringe, crisp collared polo shirt in terracotta with button placket.
 */
export const ElenaRodriguezAvatar: React.FC<{ className?: string; name?: string }> = ({
  className = 'w-20 h-20 sm:w-24 sm:h-24',
  name = 'Elena Rodriguez',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
    role="img"
    aria-label={`${name} Avatar`}
  >
    <defs>
      <clipPath id="elena-circle-clip">
        <circle cx="60" cy="60" r="56" />
      </clipPath>
      <linearGradient id="elena-bg-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FCF2E5" />
        <stop offset="100%" stopColor="#f7e6d6" />
      </linearGradient>
    </defs>

    {/* Avatar Outer Ring */}
    <circle cx="60" cy="60" r="58" fill="none" stroke="#EC5B38" strokeWidth="2" strokeOpacity="0.35" />

    {/* Clipped Avatar Content */}
    <g clipPath="url(#elena-circle-clip)">
      <circle cx="60" cy="60" r="56" fill="url(#elena-bg-grad)" />

      {/* Torso in Crisp Terracotta (#EC5B38) Polo */}
      <path
        d="M 22 120 C 24 96, 42 84, 60 84 C 78 84, 96 96, 98 120 Z"
        fill="#EC5B38"
      />
      {/* Collared Shirt Placket & Tie / Button Band (Matching Image 0!) */}
      <rect x="57" y="84" width="6" height="36" fill="#524646" />
      {/* White Collar Tabs */}
      <polygon points="50,84 60,94 56,84" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />
      <polygon points="70,84 60,94 64,84" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />
      <circle cx="60" cy="100" r="1.5" fill="#ffffff" />
      <circle cx="60" cy="110" r="1.5" fill="#ffffff" />

      {/* Neck */}
      <path d="M 53 66 L 53 84 L 67 84 L 67 66 Z" fill="#FCF2E5" />

      {/* Ears */}
      <ellipse cx="38" cy="56" rx="4" ry="6.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
      <ellipse cx="82" cy="56" rx="4" ry="6.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />

      {/* Head / Face Oval */}
      <ellipse cx="60" cy="54" rx="19" ry="24" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />

      {/* Half-Tone Face Shading */}
      <path
        d="M 60 30 C 68 30, 79 38, 79 54 C 79 70, 68 78, 60 78 Z"
        fill="#524646"
        fillOpacity="0.06"
      />

      {/* Modern Hair Bob with Fringe / Bangs (Matching Image 0 Character Sheet!) */}
      <path
        d="M 38 48 C 36 34, 46 22, 60 22 C 74 22, 84 34, 82 48 C 82 58, 80 64, 78 68 C 76 56, 76 42, 70 34 C 66 30, 62 34, 60 34 C 58 34, 54 30, 50 34 C 44 42, 44 56, 42 68 C 40 64, 38 58, 38 48 Z"
        fill="#524646"
      />
      {/* Hair Volume Curve */}
      <path
        d="M 44 28 C 48 18, 58 16, 68 18 C 76 22, 78 28, 78 28 Z"
        fill="#524646"
      />

      {/* Eyes & Eyebrows */}
      <path d="M 48 46 C 50 44, 54 44, 56 46" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="52" cy="50" r="2" fill="#524646" />

      <path d="M 64 46 C 66 44, 70 44, 72 46" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="68" cy="50" r="2" fill="#524646" />

      {/* Nose */}
      <path d="M 60 48 L 59 55 L 62 55" stroke="#524646" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

      {/* Friendly Warm Smile */}
      <path d="M 54 64 Q 60 69 66 64" stroke="#EC5B38" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </g>
  </svg>
)

export default TeamAvatar

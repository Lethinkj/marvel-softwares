import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { IllustrationProps } from './WebDevIllustration'

/**
 * ConsultingIllustration
 * Scenario: Technical Architecture, System Audits & Security Compliance.
 * Features:
 * - Principal Consultant avatar directly styled after Image 0 reference sheet:
 *   * Collared shirt with tie under tailored blazer
 *   * Defined facial features (eyes, eyebrows, smile, ears)
 *   * Sleek side-parted fringe haircut
 *   * Lace-up shoes with white sole accents
 *   * Articulated hand holding inspection magnifying glass over system topology
 *   * Holding architectural audit folio
 * - Architectural blueprint canvas with system topology nodes and roadmap milestones.
 * - Rotating radar sweep scanner validating system health with A+ Enterprise stamp.
 * - Floating SOC-2 and Zero-Trust compliance badges.
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const ConsultingIllustration: React.FC<IllustrationProps> = ({
  className = 'w-full h-auto',
}) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`relative flex items-center justify-center p-2 sm:p-4 ${className}`}>
      <svg
        viewBox="0 0 540 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-lg lg:max-w-xl select-none overflow-visible"
        role="img"
        aria-label="Technology Consulting - Architecture Blueprints and Security Audits"
      >
        <defs>
          <filter id="cns-shadow" x="-8%" y="-8%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#524646" floodOpacity="0.09" />
          </filter>
          <linearGradient id="blu-grad" x1="140" y1="50" x2="420" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="blazer-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="100%" stopColor="#ce4523" />
          </linearGradient>
        </defs>

        {/* ============================================================
            1. Organic Background Backdrop Shapes
            ============================================================ */}
        <path
          d="M 60 160 C 40 70, 150 20, 260 35 C 370 50, 480 20, 495 120 C 515 210, 470 320, 380 345 C 270 370, 130 345, 80 285 C 50 245, 80 215, 60 160 Z"
          fill="#FCF2E5"
        />
        <path
          d="M 40 120 C 20 70, 90 25, 150 45 C 200 65, 180 135, 130 155 C 75 175, 60 165, 40 120 Z"
          fill="#EC5B38"
          fillOpacity="0.12"
        />

        {/* Ambient floating circles & sparkles */}
        <circle cx="490" cy="75" r="9" fill="#EC5B38" fillOpacity="0.2" />
        <circle cx="510" cy="105" r="5" fill="#A8A492" fillOpacity="0.3" />
        <circle cx="50" cy="275" r="7" fill="#EC5B38" fillOpacity="0.25" />
        <path d="M 470 145 L 480 145 M 475 140 L 475 150" stroke="#EC5B38" strokeWidth="2.5" strokeLinecap="round" />

        {/* Ground Floor Shadow */}
        <ellipse cx="270" cy="354" rx="190" ry="14" fill="#524646" fillOpacity="0.07" />

        {/* ============================================================
            2. Architectural Blueprint Drafting Table & Base
            ============================================================ */}
        <path d="M 230 265 L 210 338 L 222 338 L 238 265 Z" fill="#A8A492" />
        <path d="M 330 265 L 350 338 L 338 338 L 322 265 Z" fill="#A8A492" />
        <rect x="200" y="336" width="160" height="8" rx="4" fill="#524646" />

        {/* ============================================================
            3. Blueprint Drafting Board & Architecture Topology
            ============================================================ */}
        <g id="blueprint-board" filter="url(#cns-shadow)">
          <rect x="140" y="55" width="280" height="215" rx="14" fill="url(#blu-grad)" stroke="#A8A492" strokeWidth="1.5" />

          {/* Blueprint Header */}
          <rect x="140" y="55" width="280" height="26" rx="14" fill="#FCF2E5" />
          <line x1="140" y1="81" x2="420" y2="81" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="156" cy="68" r="3.5" fill="#EC5B38" />
          <circle cx="166" cy="68" r="3.5" fill="#A8A492" />
          <circle cx="176" cy="68" r="3.5" fill="#524646" fillOpacity="0.4" />
          <text x="280" y="72" textAnchor="middle" fill="#524646" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold">
            ARCHITECTURE ROADMAP &amp; TOPOLOGY
          </text>

          {/* Blueprint Grid Lines */}
          <line x1="160" y1="100" x2="400" y2="100" stroke="#A8A492" strokeWidth="0.8" strokeDasharray="3 6" strokeOpacity="0.5" />
          <line x1="160" y1="140" x2="400" y2="140" stroke="#A8A492" strokeWidth="0.8" strokeDasharray="3 6" strokeOpacity="0.5" />
          <line x1="160" y1="180" x2="400" y2="180" stroke="#A8A492" strokeWidth="0.8" strokeDasharray="3 6" strokeOpacity="0.5" />
          <line x1="160" y1="220" x2="400" y2="220" stroke="#A8A492" strokeWidth="0.8" strokeDasharray="3 6" strokeOpacity="0.5" />

          {/* Architecture Nodes */}
          <rect x="165" y="115" width="56" height="36" rx="6" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <text x="193" y="132" textAnchor="middle" fill="#524646" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold">API Gateway</text>
          <circle cx="193" cy="142" r="2.5" fill="#EC5B38" />

          <rect x="250" y="100" width="60" height="36" rx="6" fill="#ffffff" stroke="#524646" strokeWidth="1.5" />
          <text x="280" y="117" textAnchor="middle" fill="#524646" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold">Microservices</text>
          <circle cx="280" cy="127" r="2.5" fill="#524646" />

          <rect x="250" y="150" width="60" height="36" rx="6" fill="#ffffff" stroke="#524646" strokeWidth="1.5" />
          <text x="280" y="167" textAnchor="middle" fill="#524646" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold">Data Mesh</text>
          <circle cx="280" cy="177" r="2.5" fill="#524646" />

          <rect x="340" y="125" width="56" height="36" rx="6" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <text x="368" y="142" textAnchor="middle" fill="#524646" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold">Multi-Cloud</text>
          <circle cx="368" cy="152" r="2.5" fill="#EC5B38" />

          <path d="M 221 133 L 250 118" stroke="#EC5B38" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 221 133 L 250 168" stroke="#EC5B38" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 310 118 L 340 143" stroke="#524646" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 310 168 L 340 143" stroke="#524646" strokeWidth="1.8" strokeLinecap="round" />

          {/* A+ Certified Stamp */}
          <g transform="translate(330, 190)">
            <circle cx="22" cy="22" r="20" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="2" strokeDasharray="4 2" />
            <text x="22" y="27" textAnchor="middle" fill="#EC5B38" fontFamily="sans-serif" fontSize="12" fontWeight="bold">
              A+
            </text>
          </g>
        </g>

        {/* 360-degree Rotating Radar Scanner Beam */}
        <motion.g
          transform="translate(280, 138)"
          animate={shouldReduceMotion ? {} : { rotate: [0, 360] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="0" cy="0" r="44" fill="none" stroke="#EC5B38" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />
          <line x1="0" y1="0" x2="38" y2="-22" stroke="#EC5B38" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
        </motion.g>

        {/* ============================================================
            4. Reference Avatar: Principal Tech Consultant
               (Modeled directly after Image 0 Reference Sheet!)
               - Collared shirt with tie under tailored blazer
               - Clean side-parted fringe haircut with defined ears
               - Expressive facial features (eyes, eyebrows, smile)
               - Lace-up shoes with white soles
               - Holding inspection magnifying glass & audit folio
            ============================================================ */}
        <g id="char-consultant-avatar">
          <ellipse cx="80" cy="344" rx="28" ry="6" fill="#524646" fillOpacity="0.14" />

          {/* Left Leg in Espresso #524646 Trousers */}
          <path
            d="M 70 248 C 70 248 66 282 65 302 C 64 316 66 328 67 332 L 75 332 C 75 326 74 314 75 302 C 77 286 80 248 80 248 Z"
            fill="#524646"
          />
          {/* Left Leg (Weight-bearing Leg in Espresso #524646 Trousers) */}
          <path
            d="M 64 242 C 63 255, 63 285, 64 305 C 65 318, 66 328, 67 332 L 77 332 C 77 328, 77 318, 78 305 C 78 285, 79 255, 79 250 Z"
            fill="#524646"
          />
          {/* Left Lace-up Shoe */}
          <g transform="translate(58, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Right Leg */}
          <path
            d="M 81 250 C 81 255, 82 285, 82 305 C 83 318, 83 328, 84 332 L 94 332 C 94 328, 95 318, 96 305 C 96 285, 96 255, 96 242 Z"
            fill="#453b3b"
          />
          {/* Right Lace-up Shoe */}
          <g transform="translate(78, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Pelvic Fork / Crotch Seam */}
          <path d="M 78 248 L 80 252 L 82 248" stroke="#3a3131" strokeWidth="1.2" strokeLinecap="round" />

          {/* Belt with Buckle */}
          <rect x="61" y="238" width="37" height="5" rx="1.5" fill="#3a3131" />
          <ellipse cx="80" cy="240.5" rx="3.5" ry="2.5" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="0.8" />

          {/* Torso in Tailored Terracotta (#EC5B38) Blazer (Broad natural shoulders!) */}
          <path
            d="M 57 194 C 64 190, 73 190, 80 190 C 87 190, 96 190, 103 194 C 107 202, 104 224, 98 238 C 92 240, 68 240, 62 238 C 56 224, 53 202, 57 194 Z"
            fill="url(#blazer-grad)"
          />
          {/* Collared Shirt & Tie under Blazer (Image 0 signature!) */}
          <polygon points="76,190 84,190 80,206" fill="#ffffff" />
          <polygon points="79,194 81,194 82,224 80,228 78,224" fill="#524646" />
          <polygon points="75,190 79,198 77,190" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />
          <polygon points="85,190 81,198 83,190" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />

          {/* Neck */}
          <path d="M 75 178 L 85 178 L 85 190 L 75 190 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="68" cy="168" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="92" cy="168" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head & Facial Features */}
          <ellipse cx="80" cy="166" rx="12" ry="15" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />
          <path d="M 74 162 C 76 160, 78 160, 80 162" stroke="#524646" strokeWidth="1" strokeLinecap="round" />
          <circle cx="77" cy="165" r="1.5" fill="#524646" />
          <path d="M 82 162 C 84 160, 86 160, 88 162" stroke="#524646" strokeWidth="1" strokeLinecap="round" />
          <circle cx="85" cy="165" r="1.5" fill="#524646" />
          <path d="M 80 165 L 79 169 L 81 169" stroke="#524646" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 77 173 Q 80 176 83 173" stroke="#524646" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Side-Parted Fringe Hair (Image 0) */}
          <path
            d="M 69 164 C 68 152, 75 146, 85 147 C 91 148, 93 154, 92 159 C 89 156, 85 156, 82 158 C 79 155, 74 155, 72 158 C 70 161, 70 163, 69 166 Z"
            fill="#524646"
          />

          {/* Left Arm: Holding Audit Folio */}
          <path
            d="M 57 194 C 52 202, 48 214, 50 224 L 58 226 C 58 218, 62 204, 65 197 Z"
            fill="#EC5B38"
          />
          {/* Forearm */}
          <path d="M 50 224 C 54 232, 60 236, 68 234 L 70 228 C 64 228, 58 224, 56 220 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          {/* Audit Folio */}
          <rect x="64" y="220" width="20" height="26" rx="3" fill="#524646" />
          <rect x="66" y="223" width="16" height="20" rx="1.5" fill="#FCF2E5" />
          <line x1="69" y1="227" x2="79" y2="227" stroke="#EC5B38" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="69" y1="231" x2="77" y2="231" stroke="#A8A492" strokeWidth="1.2" strokeLinecap="round" />
          {/* Articulated Hand holding folio */}
          <g transform="translate(62, 226)">
            <path d="M 2 4 C 1 2, 3 0, 5 1 C 6 2, 7 5, 5 8 L 2 7 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
          </g>

          {/* Right Arm: Articulated reaching forward with Magnifying Glass */}
          <path
            d="M 103 194 C 108 200, 114 208, 116 216 L 108 220 C 106 212, 102 204, 98 198 Z"
            fill="#EC5B38"
          />
          <path
            d="M 112 216 C 122 208, 134 200, 144 192 L 148 196 C 138 204, 126 212, 116 220 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Hand gripping magnifying glass handle */}
          <g transform="translate(144, 188)">
            <path d="M 2 4 C 5 2, 9 2, 11 4 L 10 7 C 8 8, 4 8, 2 6 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <path d="M 1 5 C 3 4, 6 5, 7 7" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>

          {/* Magnifying Glass */}
          <motion.g
            transform="translate(136, 145) rotate(-18)"
            animate={shouldReduceMotion ? {} : { x: [0, 6, 0], y: [0, -3, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="28" cy="28" r="22" fill="#ffffff" fillOpacity="0.85" stroke="#524646" strokeWidth="3.5" />
            <circle cx="28" cy="28" r="16" fill="none" stroke="#EC5B38" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="12" y1="44" x2="-2" y2="62" stroke="#524646" strokeWidth="5" strokeLinecap="round" />
            <line x1="12" y1="44" x2="-2" y2="62" stroke="#A8A492" strokeWidth="2.5" strokeLinecap="round" />
          </motion.g>
        </g>

        {/* ============================================================
            5. Floating Scenario Badges
            ============================================================ */}
        <motion.g
          id="badge-soc2"
          filter="url(#cns-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="42" y="78" width="86" height="34" rx="8" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <circle cx="59" cy="95" r="5" fill="#EC5B38" />
          <text x="71" y="99" fill="#524646" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
            SOC-2
          </text>
        </motion.g>

        <motion.g
          id="badge-zerotrust"
          filter="url(#cns-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <rect x="410" y="115" width="88" height="34" rx="8" fill="#ffffff" stroke="#524646" strokeWidth="1.5" />
          <circle cx="424" cy="132" r="4" fill="#EC5B38" />
          <text x="435" y="136" fill="#524646" fontFamily="sans-serif" fontSize="10" fontWeight="bold">
            Zero-Trust
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default ConsultingIllustration

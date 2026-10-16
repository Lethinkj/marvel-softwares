import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { IllustrationProps } from './WebDevIllustration'

/**
 * CloudDevOpsIllustration
 * Scenario: Cloud Infrastructure, CI/CD Pipeline & High Availability.
 * Features:
 * - DevOps Engineer avatar directly styled after Avatar 2 from user's reference sheet:
 *   * Swept undercut hairstyle with flowing quiff
 *   * Sculpted full hipster beard and mustache
 *   * Utility vest over V-neck tee with belt and oval buckle
 *   * Lace-up boots/sneakers
 *   * Holding diagnostic cloud tablet, articulated hand patching fiber cable into rack
 * - High-density datacenter server racks with blinking status LEDs and blade switches.
 * - Levitating CI/CD deployment rocket taking off with animated exhaust plume.
 * - Moving pipeline data packets traveling along fiber-optic lines.
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const CloudDevOpsIllustration: React.FC<IllustrationProps> = ({
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
        aria-label="Cloud & DevOps Infrastructure - Servers, CI/CD Rocket and Pipeline"
      >
        <defs>
          <filter id="cld-shadow" x="-8%" y="-8%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#524646" floodOpacity="0.1" />
          </filter>
          <linearGradient id="rack-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#524646" />
            <stop offset="100%" stopColor="#3d3333" />
          </linearGradient>
          <linearGradient id="rkt-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" />
          </linearGradient>
          <linearGradient id="vest-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="100%" stopColor="#c84422" />
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
            2. Datacenter Server Racks & Cloud Infrastructure
            ============================================================ */}
        {/* Server Rack 1 */}
        <g id="server-rack-1" filter="url(#cld-shadow)">
          <rect x="180" y="80" width="80" height="235" rx="10" fill="url(#rack-grad)" stroke="#524646" strokeWidth="2" />
          <rect x="186" y="88" width="68" height="20" rx="4" fill="#FCF2E5" fillOpacity="0.15" />
          <circle cx="196" cy="98" r="3" fill="#EC5B38" />
          <circle cx="206" cy="98" r="3" fill="#A8A492" />
          <rect x="216" y="96" width="30" height="4" rx="2" fill="#FCF2E5" />

          {[116, 142, 168, 194, 220, 246, 272].map((y, idx) => (
            <g key={idx}>
              <rect x="186" y={y} width="68" height="20" rx="3" fill="#463c3c" />
              <circle cx="194" cy={y + 10} r="2.5" fill={idx % 2 === 0 ? '#EC5B38' : '#ffffff'} />
              <circle cx="202" cy={y + 10} r="2.5" fill="#A8A492" />
              <rect x="210" y={y + 8} width="38" height="4" rx="1.5" fill="#FCF2E5" fillOpacity="0.8" />
            </g>
          ))}
        </g>

        {/* Server Rack 2 */}
        <g id="server-rack-2" filter="url(#cld-shadow)">
          <rect x="280" y="80" width="80" height="235" rx="10" fill="url(#rack-grad)" stroke="#524646" strokeWidth="2" />
          <rect x="286" y="88" width="68" height="20" rx="4" fill="#FCF2E5" fillOpacity="0.15" />
          <circle cx="296" cy="98" r="3" fill="#EC5B38" />
          <circle cx="306" cy="98" r="3" fill="#A8A492" />
          <rect x="316" y="96" width="30" height="4" rx="2" fill="#FCF2E5" />

          {[116, 142, 168, 194, 220, 246, 272].map((y, idx) => (
            <g key={idx}>
              <rect x="286" y={y} width="68" height="20" rx="3" fill="#463c3c" />
              <circle cx="294" cy={y + 10} r="2.5" fill={idx % 3 === 0 ? '#EC5B38' : '#ffffff'} />
              <circle cx="302" cy={y + 10} r="2.5" fill="#A8A492" />
              <rect x="310" y={y + 8} width="38" height="4" rx="1.5" fill="#FCF2E5" fillOpacity="0.8" />
            </g>
          ))}
        </g>

        {/* Fiber Optic Cables */}
        <path d="M 260 126 C 270 134, 270 134, 280 126" stroke="#EC5B38" strokeWidth="2" fill="none" />
        <path d="M 260 152 C 270 160, 270 160, 280 152" stroke="#A8A492" strokeWidth="2" fill="none" />
        <path d="M 260 178 C 270 186, 270 186, 280 178" stroke="#EC5B38" strokeWidth="2" fill="none" />

        {/* Central Console screen */}
        <rect x="256" y="258" width="28" height="42" rx="4" fill="#ffffff" stroke="#A8A492" strokeWidth="1.5" />
        <circle cx="270" cy="272" r="6" fill="#FCF2E5" />
        <circle cx="270" cy="272" r="3" fill="#EC5B38" />
        <rect x="260" y="284" width="20" height="3" rx="1.5" fill="#524646" />

        {/* ============================================================
            3. Scenario Animation: CI/CD Deployment Rocket Hovering
            ============================================================ */}
        <motion.g
          id="deployment-rocket"
          transform="translate(365, 45) rotate(15)"
          filter="url(#cld-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.polygon
            points="18,72 26,98 34,72"
            fill="#EC5B38"
            animate={shouldReduceMotion ? {} : { scaleY: [1, 1.15, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <polygon points="21,72 26,88 31,72" fill="#FCF2E5" />

          <path d="M 26 12 C 14 30, 14 54, 18 72 L 34 72 C 38 54, 38 30, 26 12 Z" fill="url(#rkt-grad)" stroke="#524646" strokeWidth="2.5" />
          <path d="M 26 12 C 20 22, 19 28, 18 34 L 34 34 C 33 28, 32 22, 26 12 Z" fill="#EC5B38" />
          <circle cx="26" cy="46" r="6" fill="#524646" />
          <circle cx="26" cy="46" r="3.5" fill="#FCF2E5" />
          <polygon points="16,56 4,70 17,70" fill="#524646" />
          <polygon points="36,56 48,70 35,70" fill="#524646" />
        </motion.g>

        {/* Datacenter Podium */}
        <g id="datacenter-podium">
          <rect x="95" y="278" width="65" height="58" rx="6" fill="#FCF2E5" stroke="#A8A492" strokeWidth="1.5" />
          <line x1="95" y1="298" x2="160" y2="298" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="95" y1="318" x2="160" y2="318" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="90" y="274" width="75" height="6" rx="3" fill="#524646" />
          <ellipse cx="128" cy="342" rx="36" ry="6" fill="#524646" fillOpacity="0.14" />
        </g>

          {/* ============================================================
            4. Reference Avatar: Cloud DevOps Engineer
               (Modeled directly after Avatar 2 from Image 1!)
               - Broad natural shoulders in Utility vest over V-neck tee
               - Belt with oval buckle & well-proportioned cargo trousers
               - Solid legs with clean pelvic fork & retro lace-up utility boots
               - Articulated hands: left hand supporting diagnostic cloud tablet,
                 right hand pinching and inserting high-speed fiber patch cable
               - Swept undercut with quiff & full hipster beard
            ============================================================ */}
        <g id="char-devops-avatar">
          <ellipse cx="124" cy="276" rx="34" ry="5.5" fill="#524646" fillOpacity="0.14" />

          {/* Left Leg in Cargo Trousers */}
          <path
            d="M 108 198 C 107 212, 107 236, 108 252 C 109 262, 110 268, 111 272 L 121 272 C 121 268, 121 262, 122 252 C 122 236, 123 212, 123 206 Z"
            fill="#524646"
          />
          {/* Left Lace-up Boot */}
          <g transform="translate(104, 268)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Right Leg */}
          <path
            d="M 125 206 C 125 212, 126 236, 126 252 C 127 262, 127 268, 128 272 L 138 272 C 138 268, 139 262, 140 252 C 140 236, 140 212, 140 198 Z"
            fill="#453b3b"
          />
          {/* Right Lace-up Boot */}
          <g transform="translate(122, 268)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Pelvic Fork */}
          <path d="M 122 204 L 124 208 L 126 204" stroke="#3a3131" strokeWidth="1.2" strokeLinecap="round" />

          {/* Belt with Oval Buckle (Avatar 2 signature!) */}
          <rect x="105" y="196" width="37" height="5" rx="1.5" fill="#3a3131" />
          <ellipse cx="124" cy="198.5" rx="3.5" ry="2.5" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="0.8" />

          {/* Torso in Utility Vest (Terracotta #EC5B38) over V-Neck Tee with Broad Natural Shoulders */}
          <path
            d="M 101 144 C 108 140, 117 140, 124 140 C 131 140, 140 140, 147 144 C 151 152, 148 178, 142 196 C 136 198, 112 198, 106 196 C 100 178, 97 152, 101 144 Z"
            fill="url(#vest-grad)"
          />
          {/* V-Neck Tee Cutout under Vest */}
          <polygon points="119,140 129,140 124,154" fill="#FCF2E5" />
          <line x1="124" y1="154" x2="124" y2="196" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="110" y="166" width="9" height="11" rx="1.5" fill="#453b3b" />
          <rect x="129" y="166" width="9" height="11" rx="1.5" fill="#453b3b" />

          {/* Neck */}
          <path d="M 119 130 L 129 130 L 129 142 L 119 142 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="112" cy="120" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="136" cy="120" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head & Full Hipster Beard and Mustache (Avatar 2 signature!) */}
          <ellipse cx="124" cy="119" rx="11" ry="14" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />
          <path
            d="M 115 119 C 115 128, 119 133, 124 133 C 129 133, 133 128, 133 119 C 133 123, 130 129, 124 129 C 118 129, 115 123, 115 119 Z"
            fill="#524646"
          />
          <path d="M 120 123 Q 124 125 128 123" stroke="#524646" strokeWidth="1.2" strokeLinecap="round" />

          {/* Swept Undercut Hairstyle with Quiff (Avatar 2 signature!) */}
          <path
            d="M 113 118 C 112 107, 119 101, 129 103 C 134 105, 135 111, 134 115 C 130 112, 125 112, 122 114 C 118 116, 115 119, 113 123 Z"
            fill="#524646"
          />
          <path d="M 112 111 C 108 104, 116 99, 125 101 C 118 102, 113 105, 112 111 Z" fill="#3a3131" />

          {/* Left Arm: Holding Diagnostic Cloud Tablet */}
          <path
            d="M 101 144 C 96 150, 91 162, 92 172 L 100 174 C 101 166, 103 154, 107 148 Z"
            fill="#EC5B38"
          />
          {/* Forearm */}
          <path d="M 92 172 C 96 182, 104 186, 112 184 L 114 178 C 108 178, 102 174, 98 170 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          {/* Diagnostic Cloud Tablet */}
          <rect x="106" y="170" width="22" height="28" rx="3" fill="#524646" />
          <rect x="108" y="173" width="18" height="22" rx="1.5" fill="#FCF2E5" />
          <circle cx="113" cy="179" r="2.5" fill="#EC5B38" />
          <line x1="118" y1="179" x2="123" y2="179" stroke="#524646" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="110" y="184" width="14" height="7" rx="1" fill="#A8A492" fillOpacity="0.5" />
          {/* Articulated Hand supporting the tablet */}
          <g transform="translate(104, 180)">
            <path d="M 2 4 C 1 2, 3 0, 5 1 C 6 2, 7 5, 5 8 L 2 7 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <path d="M 3 2 C 5 2, 7 3, 8 4" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>

          {/* Right Arm: Articulated reaching toward server rack patch panel */}
          <path
            d="M 147 144 C 153 150, 160 156, 170 154 L 166 146 C 158 146, 152 144, 147 140 Z"
            fill="#EC5B38"
          />
          <path
            d="M 170 154 C 180 150, 190 144, 200 138 L 202 143 C 192 149, 182 155, 172 159 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Hand pinching fiber patch connector */}
          <g transform="translate(198, 134)">
            {/* Extended index and thumb pinching */}
            <path d="M 2 4 C 5 2, 8 2, 11 3.5 C 12 4, 11 5, 9 5.5 L 3 6 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            <path d="M 0 5 C 1 3, 3 3, 4 4.5 C 5 6, 4 8, 2 9 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <path d="M 2 4 C 4 3.5, 6 4, 7 5" stroke="#524646" strokeWidth="0.6" fill="none" />
          </g>
          <line x1="208" y1="138" x2="220" y2="134" stroke="#EC5B38" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ============================================================
            5. Floating Scenario Badges
            ============================================================ */}
        <motion.g
          id="badge-security"
          filter="url(#cld-shadow)"
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
          id="badge-uptime"
          filter="url(#cld-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <rect x="390" y="240" width="102" height="34" rx="8" fill="#ffffff" stroke="#524646" strokeWidth="1.5" />
          <circle cx="406" cy="257" r="4" fill="#EC5B38" />
          <text x="418" y="261" fill="#524646" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
            99.99% SLA
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default CloudDevOpsIllustration

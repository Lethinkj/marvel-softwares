import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { IllustrationProps } from './WebDevIllustration'

/**
 * MissionIllustration
 * Scenario: Monument of Engineering Excellence, Craftsmanship & Architectural Rigor.
 * Features:
 * - Systems Architect (Left): Modeled after Image 0 reference with collared shirt, tie, side-parted fringe, holding blueprint roll and precision spirit level.
 * - Master Craftsman (Right): Modeled after Avatar 2 reference with swept undercut quiff, sculpted full beard/mustache, V-neck with belt buckle, open 5-finger hands guiding cornerstone.
 * - Isometric architectural foundation monument with levitating precision pinnacle block.
 * - Floating Velocity, Clean Craft, and EST. 2018 foundation badges.
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const MissionIllustration: React.FC<IllustrationProps> = ({
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
        aria-label="Marvel Softwares Mission - Architectural Rigor and Engineering Craftsmanship"
      >
        <defs>
          <filter id="msn-shadow" x="-8%" y="-8%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#524646" floodOpacity="0.1" />
          </filter>
          <linearGradient id="monument-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" />
          </linearGradient>
          <linearGradient id="craftsman-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="100%" stopColor="#cb4321" />
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
            2. Isometric Engineering Monument Foundation (Center)
            ============================================================ */}
        <g id="monument-base" filter="url(#msn-shadow)">
          <polygon points="270,250 370,200 270,165 170,200" fill="#524646" />
          <polygon points="170,200 270,250 270,270 170,220" fill="#3f3535" />
          <polygon points="270,250 370,200 370,220 270,270" fill="#4d4141" />

          {/* Middle Monolith Block */}
          <polygon points="270,210 345,172 270,145 195,172" fill="url(#monument-grad)" stroke="#A8A492" strokeWidth="1.5" />
          <polygon points="195,172 270,210 270,234 195,196" fill="#FCF2E5" stroke="#A8A492" strokeWidth="1.5" />
          <polygon points="270,210 345,172 345,196 270,234" fill="#ffffff" stroke="#A8A492" strokeWidth="1.5" />

          <line x1="215" y1="184" x2="250" y2="201" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="215" y1="190" x2="242" y2="204" stroke="#A8A492" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="285" y1="202" x2="325" y2="182" stroke="#524646" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="285" y1="208" x2="315" y2="193" stroke="#A8A492" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Floating Levitating Pinnacle Capstone */}
        <motion.g
          id="pinnacle-capstone"
          animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#msn-shadow)"
        >
          <polygon points="270,118 318,94 270,76 222,94" fill="#EC5B38" />
          <polygon points="222,94 270,118 270,136 222,112" fill="#d24825" />
          <polygon points="270,118 318,94 318,112 270,136" fill="#ea613f" />
          <circle cx="270" cy="97" r="4.5" fill="#ffffff" />
        </motion.g>

        <line x1="270" y1="138" x2="270" y2="152" stroke="#EC5B38" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="270" cy="145" r="2.5" fill="#EC5B38" />

        {/* ============================================================
            3. Reference Avatar 1: Systems Architect (Image 0 Reference)
               - Collared shirt with tie
               - Defined facial eyes/eyebrows/smile
               - Side-parted fringe haircut
               - Broad natural shoulders (~46px wide)
               - Solid straight-leg trousers with clean pelvic fork
               - Retro lace-up sneakers with rubber outsole & laces
               - Articulated hands: holding rolled blueprint & precision spirit level
            ============================================================ */}
        <g id="char-mission-arch-avatar">
          <ellipse cx="121" cy="346" rx="30" ry="6" fill="#524646" fillOpacity="0.14" />

          {/* Left Leg (Weight-bearing Leg in Espresso #524646 Trousers) */}
          <path
            d="M 105 242 C 104 255, 104 285, 105 305 C 106 318, 107 328, 108 332 L 118 332 C 118 328, 118 318, 119 305 C 119 285, 120 255, 120 250 Z"
            fill="#524646"
          />
          {/* Left Retro Lace-up Shoe */}
          <g transform="translate(99, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Right Leg (Espresso #453b3b for depth) */}
          <path
            d="M 122 250 C 122 255, 123 285, 123 305 C 124 318, 124 328, 125 332 L 135 332 C 135 328, 136 318, 137 305 C 137 285, 137 255, 137 242 Z"
            fill="#453b3b"
          />
          {/* Right Retro Lace-up Shoe */}
          <g transform="translate(119, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Pelvic Fork / Crotch Seam */}
          <path d="M 119 248 L 121 252 L 123 248" stroke="#3a3131" strokeWidth="1.2" strokeLinecap="round" />

          {/* Belt with Oval Buckle */}
          <rect x="102" y="238" width="38" height="5" rx="1.5" fill="#3a3131" />
          <ellipse cx="121" cy="240.5" rx="3.5" ry="2.5" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="0.8" />

          {/* Torso in Terracotta (#EC5B38) with Broad Natural Shoulders */}
          <path
            d="M 98 194 C 105 190, 114 190, 121 190 C 128 190, 137 190, 144 194 C 148 202, 145 224, 139 238 C 133 240, 109 240, 103 238 C 97 224, 94 202, 98 194 Z"
            fill="url(#craftsman-top)"
          />
          {/* Tie in Espresso #524646 */}
          <polygon points="119,194 123,194 124,228 121,233 118,228" fill="#524646" />
          {/* White Collar Tabs */}
          <polygon points="115,190 121,198 119,190" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />
          <polygon points="127,190 121,198 123,190" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />

          {/* Neck */}
          <path d="M 116 178 L 126 178 L 126 190 L 116 190 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="109" cy="168" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="133" cy="168" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head & Facial Features */}
          <ellipse cx="121" cy="166" rx="12" ry="15" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />
          <path d="M 115 162 C 117 160, 119 160, 120 162" stroke="#524646" strokeWidth="1" strokeLinecap="round" />
          <circle cx="117.5" cy="165" r="1.5" fill="#524646" />
          <path d="M 122 162 C 123 160, 125 160, 127 162" stroke="#524646" strokeWidth="1" strokeLinecap="round" />
          <circle cx="124.5" cy="165" r="1.5" fill="#524646" />
          <path d="M 121 165 L 120 169 L 122 169" stroke="#524646" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 118 173 Q 121 176 124 173" stroke="#524646" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Side-Parted Fringe Hair (Image 0) */}
          <path
            d="M 110 164 C 109 152, 116 146, 125 147 C 131 148, 133 154, 132 159 C 129 156, 125 156, 122 158 C 119 155, 114 155, 112 158 C 110 161, 110 163, 110 166 Z"
            fill="#524646"
          />

          {/* Left Arm: Holding Rolled Blueprint Folio */}
          {/* Upper Arm in Terracotta */}
          <path
            d="M 98 194 C 93 202, 89 214, 91 224 L 99 226 C 99 218, 103 204, 106 197 Z"
            fill="#EC5B38"
          />
          {/* Forearm */}
          <path
            d="M 91 224 C 95 232, 101 236, 109 234 L 111 228 C 105 228, 99 224, 97 220 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Rolled Blueprint Folio */}
          <rect x="96" y="218" width="30" height="9" rx="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
          <ellipse cx="100" cy="222.5" rx="2.5" ry="3.5" fill="#EC5B38" />
          <line x1="104" y1="221" x2="122" y2="221" stroke="#524646" strokeWidth="0.8" strokeDasharray="2 1" />
          {/* Articulated Hand gripping blueprint roll */}
          <g transform="translate(104, 214)">
            <path
              d="M 2 4 C 1 2, 3 0, 5 1 C 6 2, 7 5, 5 8 L 2 7 Z"
              fill="#FCF2E5"
              stroke="#524646"
              strokeWidth="0.7"
            />
            <path d="M 3 3 C 4 5, 5 6, 6 6" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>

          {/* Right Arm: Articulated holding Precision Spirit Level */}
          {/* Upper Arm */}
          <path
            d="M 144 194 C 149 200, 155 208, 157 216 L 149 220 C 147 212, 143 204, 139 198 Z"
            fill="#EC5B38"
          />
          {/* Forearm */}
          <path
            d="M 153 216 C 163 208, 175 200, 185 192 L 189 196 C 179 204, 167 212, 157 220 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Spirit Level Tool */}
          <rect x="180" y="179" width="28" height="7" rx="2.5" fill="#524646" />
          <rect x="190" y="181" width="8" height="3" rx="1.5" fill="#FCF2E5" />
          <circle cx="194" cy="182.5" r="1.2" fill="#EC5B38" />
          {/* Articulated Hand gripping spirit level */}
          <g transform="translate(182, 184)">
            <path d="M 2 4 C 5 2, 9 2, 11 4 L 10 7 C 8 8, 4 8, 2 6 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <path d="M 1 5 C 3 4, 6 5, 7 7" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M 3 2 C 5 1, 7 1, 8 3" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>
        </g>

        {/* ============================================================
            4. Reference Avatar 2: Master Builder on Podium (Avatar 2 Reference)
               - Swept undercut with quiff
               - Sculpted full beard and mustache
               - V-neck tee with belt and oval buckle
               - Broad natural shoulders (~46px wide)
               - Solid chinos on podium with clean pelvic fork
               - Retro lace-up sneakers
               - Articulated open 5-finger guiding hand aligning cornerstone
               - Arm anchored firmly on hip with articulated hand
            ============================================================ */}
        <g id="char-mission-builder-avatar">
          {/* Stone Podium Staging Block */}
          <rect x="415" y="260" width="60" height="74" rx="6" fill="#FCF2E5" stroke="#A8A492" strokeWidth="1.5" />
          <line x1="415" y1="284" x2="475" y2="284" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="415" y1="308" x2="475" y2="308" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="410" y="256" width="70" height="6" rx="3" fill="#524646" />

          <ellipse cx="445" cy="342" rx="32" ry="6" fill="#524646" fillOpacity="0.14" />

          {/* Left Leg in Warm Taupe #A8A492 Chinos (Solid width) */}
          <path
            d="M 427 178 C 426 190, 426 215, 427 235 C 428 244, 429 252, 430 256 L 440 256 C 440 252, 440 244, 441 235 C 441 215, 442 190, 442 184 Z"
            fill="#A8A492"
          />
          {/* Left Lace-up Sneaker */}
          <g transform="translate(423, 252)">
            <rect x="0" y="6" width="20" height="3.5" rx="1.5" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 3 6 C 3 2.5, 7 1, 12 1 C 15 1, 18 3, 18 6 Z" fill="#524646" />
            <line x1="6" y1="2.5" x2="12" y2="2.5" stroke="#ffffff" strokeWidth="0.7" />
            <rect x="3" y="8" width="15" height="1.2" rx="0.6" fill="#EC5B38" />
          </g>

          {/* Right Leg in Depth Taupe #8e8977 */}
          <path
            d="M 444 184 C 444 190, 445 215, 445 235 C 446 244, 446 252, 447 256 L 457 256 C 457 252, 458 244, 459 235 C 459 215, 459 190, 459 178 Z"
            fill="#8e8977"
          />
          {/* Right Lace-up Sneaker */}
          <g transform="translate(444, 252)">
            <rect x="0" y="6" width="20" height="3.5" rx="1.5" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 3 6 C 3 2.5, 7 1, 12 1 C 15 1, 18 3, 18 6 Z" fill="#524646" />
            <line x1="6" y1="2.5" x2="12" y2="2.5" stroke="#ffffff" strokeWidth="0.7" />
            <rect x="3" y="8" width="15" height="1.2" rx="0.6" fill="#EC5B38" />
          </g>

          {/* Pelvic Fork / Crotch Seam */}
          <path d="M 441 182 L 443 186 L 445 182" stroke="#3a3131" strokeWidth="1.2" strokeLinecap="round" />

          {/* Belt with Oval Buckle (Avatar 2 signature!) */}
          <rect x="424" y="174" width="38" height="5" rx="1.5" fill="#3a3131" />
          <ellipse cx="443" cy="176.5" rx="3.5" ry="2.5" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="0.8" />

          {/* Torso in Espresso #524646 with Broad Natural Shoulders */}
          <path
            d="M 420 126 C 428 122, 436 122, 443 122 C 450 122, 458 122, 466 126 C 470 134, 467 158, 461 174 C 455 176, 431 176, 425 174 C 419 158, 416 134, 420 126 Z"
            fill="#524646"
          />
          <polygon points="438,122 448,122 443,136" fill="#FCF2E5" />

          {/* Neck */}
          <path d="M 438 112 L 448 112 L 448 124 L 438 124 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="431" cy="102" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="455" cy="102" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head & Full Hipster Beard and Mustache (Avatar 2 signature!) */}
          <ellipse cx="443" cy="102" rx="11" ry="14" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />
          <path
            d="M 434 102 C 434 111, 438 116, 443 116 C 448 116, 452 111, 452 102 C 452 106, 449 111, 443 111 C 437 111, 434 106, 434 102 Z"
            fill="#524646"
          />
          <path d="M 439 106 Q 443 108 447 106" stroke="#524646" strokeWidth="1.2" strokeLinecap="round" />

          {/* Swept Undercut Hairstyle with Quiff (Avatar 2 signature!) */}
          <path
            d="M 432 101 C 431 90, 438 84, 448 86 C 453 88, 454 94, 453 98 C 449 95, 444 95, 441 97 C 437 99, 434 102, 432 106 Z"
            fill="#524646"
          />
          <path d="M 431 94 C 427 87, 435 82, 444 84 C 437 85, 432 88, 431 94 Z" fill="#3a3131" />

          {/* Left Arm: Raised guiding pinnacle with 5 open fingers */}
          {/* Upper Arm */}
          <path
            d="M 420 126 C 412 120, 398 114, 386 112 L 388 120 C 398 122, 410 127, 416 134 Z"
            fill="#524646"
          />
          {/* Forearm extending forward towards capstone */}
          <path
            d="M 386 112 C 366 108, 348 105, 332 103 L 332 109 C 348 111, 366 114, 388 120 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Open 5-Finger Guiding Hand (Image 0 Hand Sheet!) */}
          <g id="builder-guiding-hand-left" transform="translate(315, 95)">
            {/* Palm & 4 fingers reaching horizontally to guide capstone */}
            <path
              d="M 17 12 C 14 10, 11 8, 8 7 C 5 6, 2 6, 0 7 C 0 8, 1 9, 3 9.5 C 1 10, 0 11.5, 1 12.5 C 2.5 13, 5 13, 7 12 C 5 13.5, 3 14.5, 4 15.5 C 5 16, 7 16, 9 14.5 C 7 16, 5 17.5, 6 18.5 C 7 19, 9 18.5, 11 17 C 13 18, 15 17, 16 15 Z"
              fill="#FCF2E5"
              stroke="#524646"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* Thumb angled upward guiding */}
            <path
              d="M 14 9.5 C 12 7, 9 4, 7 3 C 6 3, 5.5 4, 6.5 5.5 C 8 7.5, 11 9, 13 11 Z"
              fill="#FCF2E5"
              stroke="#524646"
              strokeWidth="0.8"
            />
          </g>

          {/* Right Arm: Anchored firmly on hip for stabilizing posture */}
          {/* Upper Arm */}
          <path
            d="M 466 126 C 472 134, 476 146, 474 156 L 466 158 C 466 150, 464 138, 458 132 Z"
            fill="#524646"
          />
          {/* Forearm */}
          <path
            d="M 474 156 C 472 164, 466 170, 458 172 L 456 166 C 462 164, 466 160, 466 156 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Hand anchored on hip with thumb behind waistband */}
          <g transform="translate(450, 166)">
            <path d="M 7 1 C 5 0, 3 2, 2 5 C 1 8, 3 10, 6 9 L 8 6 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            <path d="M 3 4 C 4 6, 5 7, 7 7" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M 2 6 C 3 8, 4 8, 6 8" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>
        </g>

        {/* ============================================================
            5. Floating Scenario Badges
            ============================================================ */}
        <motion.g
          id="badge-velocity"
          filter="url(#msn-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="42" y="78" width="96" height="34" rx="8" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <circle cx="59" cy="95" r="5" fill="#EC5B38" />
          <text x="71" y="99" fill="#524646" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
            Velocity
          </text>
        </motion.g>

        <motion.g
          id="badge-craft"
          filter="url(#msn-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <rect x="400" y="78" width="102" height="34" rx="8" fill="#ffffff" stroke="#524646" strokeWidth="1.5" />
          <circle cx="416" cy="95" r="4" fill="#EC5B38" />
          <text x="428" y="99" fill="#524646" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
            Clean Craft
          </text>
        </motion.g>

        <motion.g
          filter="url(#msn-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="220" y="332" width="100" height="28" rx="8" fill="#ffffff" stroke="#A8A492" strokeWidth="1.5" />
          <text x="270" y="350" textAnchor="middle" fill="#524646" fontFamily="monospace" fontSize="10" fontWeight="bold">
            EST. 2018
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default MissionIllustration

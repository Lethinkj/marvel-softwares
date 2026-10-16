import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { IllustrationProps } from './WebDevIllustration'

/**
 * UiUxIllustration
 * Scenario: Design Systems, Prototyping & Figma-grade Canvas.
 * Features:
 * - Product Designer avatar directly styled after Avatar 1 from user's reference sheet:
 *   * Spiky modern dark designer hair
 *   * Iconic white designer glasses/sunglasses
 *   * Mock-neck sweater with modern circular chest emblem
 *   * Slim trousers and lace-up sneakers with white soles
 *   * Articulated hand with precision pinch grip holding digital stylus
 *   * Holding color swatch fan in other hand
 * - Expansive design artboard with vector curves, bezier handles, and design token swatches.
 * - Mild scenario animations: Stylus drawing motion, floating interactive cursor, design token badge.
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const UiUxIllustration: React.FC<IllustrationProps> = ({
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
        aria-label="UI/UX Design - Design Systems and Vector Prototyping"
      >
        <defs>
          <filter id="ui-shadow" x="-8%" y="-8%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#524646" floodOpacity="0.09" />
          </filter>
          <linearGradient id="canvas-grad" x1="140" y1="50" x2="420" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" stopOpacity="0.55" />
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
            2. Studio Easel / Artboard Stand
            ============================================================ */}
        <path d="M 230 265 L 210 338 L 222 338 L 238 265 Z" fill="#A8A492" />
        <path d="M 330 265 L 350 338 L 338 338 L 322 265 Z" fill="#A8A492" />
        <rect x="200" y="336" width="160" height="8" rx="4" fill="#524646" />

        {/* ============================================================
            3. Figma-grade Design Canvas / Artboard
            ============================================================ */}
        <g id="ui-artboard" filter="url(#ui-shadow)">
          <rect x="140" y="52" width="280" height="215" rx="14" fill="url(#canvas-grad)" stroke="#A8A492" strokeWidth="1.5" />

          {/* Canvas Toolbar Header */}
          <rect x="140" y="52" width="280" height="26" rx="14" fill="#FCF2E5" />
          <line x1="140" y1="78" x2="420" y2="78" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />

          {/* Tool Icons */}
          <rect x="156" y="60" width="10" height="10" rx="2" fill="#524646" />
          <polygon points="174,60 184,65 174,70" fill="#EC5B38" />
          <circle cx="196" cy="65" r="4.5" fill="#A8A492" />
          <line x1="208" y1="60" x2="208" y2="70" stroke="#A8A492" strokeWidth="1.5" />

          {/* Canvas Zoom & Title */}
          <rect x="220" y="58" width="55" height="14" rx="7" fill="#ffffff" />
          <text x="247" y="68" textAnchor="middle" fill="#524646" fontFamily="sans-serif" fontSize="8" fontWeight="bold">
            100% Canvas
          </text>

          {/* Canvas Ruler Grid Marks */}
          <line x1="150" y1="88" x2="410" y2="88" stroke="#A8A492" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.5" />

          {/* Active UI Artboard Component Wireframe */}
          <rect x="175" y="98" width="130" height="150" rx="10" fill="#ffffff" stroke="#A8A492" strokeWidth="1.2" strokeOpacity="0.5" />
          <rect x="185" y="108" width="110" height="20" rx="5" fill="#FCF2E5" />
          <circle cx="198" cy="118" r="4" fill="#EC5B38" />
          <rect x="208" y="115" width="45" height="4" rx="2" fill="#524646" />

          <rect x="185" y="136" width="110" height="44" rx="6" fill="#FCF2E5" fillOpacity="0.5" />
          <rect x="193" y="144" width="60" height="5" rx="2.5" fill="#524646" />
          <rect x="193" y="153" width="80" height="3" rx="1.5" fill="#A8A492" />
          <rect x="193" y="162" width="30" height="10" rx="3" fill="#EC5B38" />

          <rect x="185" y="188" width="110" height="48" rx="6" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.4" />
          <rect x="193" y="196" width="40" height="4" rx="2" fill="#524646" />
          <rect x="193" y="204" width="65" height="3" rx="1.5" fill="#A8A492" />
          <circle cx="278" cy="212" r="8" fill="#FCF2E5" />
          <circle cx="278" cy="212" r="4" fill="#EC5B38" />

          {/* Vector Curve Path with Bezier Anchor Points */}
          <path
            d="M 315 120 C 335 90, 365 140, 385 110 C 395 95, 405 130, 410 115"
            stroke="#EC5B38"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="315" cy="120" r="4" fill="#ffffff" stroke="#EC5B38" strokeWidth="2" />
          <circle cx="385" cy="110" r="4" fill="#ffffff" stroke="#EC5B38" strokeWidth="2" />
          <line x1="365" y1="140" x2="385" y2="110" stroke="#A8A492" strokeWidth="1" strokeDasharray="2 2" />

          {/* Color Palette Swatches */}
          <g transform="translate(325, 145)">
            <rect x="0" y="0" width="82" height="96" rx="8" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.4" />
            <text x="10" y="16" fill="#524646" fontFamily="sans-serif" fontSize="8" fontWeight="bold">Palette</text>
            <circle cx="18" cy="34" r="8" fill="#524646" />
            <rect x="32" y="31" width="38" height="4" rx="2" fill="#524646" />
            <circle cx="18" cy="54" r="8" fill="#EC5B38" />
            <rect x="32" y="51" width="38" height="4" rx="2" fill="#EC5B38" />
            <circle cx="18" cy="74" r="8" fill="#A8A492" />
            <rect x="32" y="71" width="38" height="4" rx="2" fill="#A8A492" />
          </g>
        </g>

        {/* ============================================================
            4. Scenario Animation: Stylus Pen Drawing Along Vector Curve
            ============================================================ */}
        <motion.g
          animate={shouldReduceMotion ? {} : { x: [0, 8, 0], y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          transform="translate(230, 115) rotate(-38)"
        >
          <rect x="0" y="0" width="10" height="58" rx="3.5" fill="#EC5B38" />
          <polygon points="0,58 10,58 5,72" fill="#524646" />
          <line x1="3" y1="0" x2="3" y2="52" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
        </motion.g>

        {/* ============================================================
            5. Reference Avatar: UI/UX Designer Character
               (Modeled directly after Avatar 1 from Image 1!)
               - Broad natural shoulders in Espresso mock-neck sweater with chest ring
               - Solid, well-proportioned legs with clean pelvic fork & retro lace-up sneakers
               - Articulated hands: left hand holding color swatchbook, right hand holding stylus
               - Iconic white designer glasses & spiky dark hair
            ============================================================ */}
        <g id="char-designer-avatar">
          <ellipse cx="80" cy="346" rx="34" ry="6" fill="#524646" fillOpacity="0.14" />

          {/* Left Leg in Espresso #524646 Trousers */}
          <path
            d="M 64 242 C 63 255, 63 285, 64 305 C 65 318, 66 328, 67 332 L 77 332 C 77 328, 77 318, 78 305 C 78 285, 79 255, 79 250 Z"
            fill="#524646"
          />
          {/* Left Lace-up Sneaker */}
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
          {/* Right Lace-up Sneaker */}
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

          {/* Torso in Mock-Neck Sweater (Broad natural shoulders!) */}
          <path
            d="M 57 194 C 64 190, 73 190, 80 190 C 87 190, 96 190, 103 194 C 107 202, 104 224, 98 238 C 92 240, 68 240, 62 238 C 56 224, 53 202, 57 194 Z"
            fill="#524646"
          />
          {/* Circular Chest Ring Graphic (Avatar 1 signature!) */}
          <circle cx="80" cy="214" r="6" fill="none" stroke="#FCF2E5" strokeWidth="2" />
          <circle cx="80" cy="214" r="2.5" fill="#EC5B38" />

          {/* Mock-Neck Collar */}
          <rect x="74" y="186" width="12" height="9" rx="2" fill="#3e3434" />

          {/* Neck */}
          <path d="M 75 178 L 85 178 L 85 188 L 75 188 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="68" cy="168" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="92" cy="168" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head */}
          <ellipse cx="80" cy="166" rx="12" ry="15" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />

          {/* Iconic White Designer Glasses (Avatar 1 signature!) */}
          <rect x="70" y="161" width="9" height="7" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
          <rect x="71.5" y="162.5" width="6" height="4" rx="1" fill="#524646" />
          <rect x="81" y="161" width="9" height="7" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
          <rect x="82.5" y="162.5" width="6" height="4" rx="1" fill="#524646" />
          <rect x="79" y="163" width="2" height="1.5" fill="#ffffff" />
          <line x1="70" y1="164" x2="67" y2="165" stroke="#ffffff" strokeWidth="1" />
          <line x1="90" y1="164" x2="93" y2="165" stroke="#ffffff" strokeWidth="1" />

          {/* Nose & Smile */}
          <path d="M 80 169 L 79 172 L 81 172" stroke="#524646" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 77 175 Q 80 177 83 175" stroke="#524646" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* Spiky Modern Designer Hairstyle (Avatar 1 signature!) */}
          <path
            d="M 69 162 C 67 154, 71 146, 76 144 L 78 139 L 82 143 L 86 138 L 89 143 L 92 141 L 93 149 C 95 154, 95 160, 92 164 C 91 158, 89 154, 83 153 C 76 152, 71 156, 69 162 Z"
            fill="#524646"
          />

          {/* Left Arm: Holding Design Swatchbook Fan */}
          <path
            d="M 57 194 C 52 202, 48 214, 50 224 L 58 226 C 58 218, 62 204, 65 197 Z"
            fill="#524646"
          />
          {/* Forearm */}
          <path d="M 50 224 C 54 232, 60 236, 68 234 L 70 228 C 64 228, 58 224, 56 220 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          {/* Articulated Hand holding swatchbook fan */}
          <g transform="translate(64, 226)">
            <path d="M 2 4 C 1 2, 3 0, 5 1 C 6 2, 7 5, 5 8 L 2 7 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <path d="M 3 2 C 5 2, 7 3, 8 4" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>
          {/* Swatchbook Fan */}
          <polygon points="68,228 84,220 88,232 72,238" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
          <line x1="72" y1="226" x2="82" y2="229" stroke="#EC5B38" strokeWidth="2" />
          <line x1="74" y1="231" x2="84" y2="234" stroke="#A8A492" strokeWidth="2" />

          {/* Right Arm: Articulated reaching forward with Stylus */}
          <path
            d="M 103 194 C 108 200, 114 208, 116 216 L 108 220 C 106 212, 102 204, 98 198 Z"
            fill="#524646"
          />
          <path
            d="M 112 216 C 122 208, 134 200, 144 192 L 148 196 C 138 204, 126 212, 116 220 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Hand holding stylus pen */}
          <g transform="translate(144, 188)">
            <path d="M 2 4 C 5 2, 9 2, 11 4 L 10 7 C 8 8, 4 8, 2 6 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <path d="M 1 5 C 3 4, 6 5, 7 7" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>
          <line x1="144" y1="196" x2="164" y2="176" stroke="#524646" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="165" cy="175" r="1.5" fill="#EC5B38" />
        </g>

        {/* ============================================================
            6. Floating Scenario Badges
            ============================================================ */}
        <motion.g
          animate={shouldReduceMotion ? {} : { x: [0, 4, 0], y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          transform="translate(385, 155) rotate(-20)"
          filter="url(#ui-shadow)"
        >
          <polygon points="0,0 0,22 6,16 13,24 17,21 10,13 18,13" fill="#EC5B38" stroke="#ffffff" strokeWidth="1.5" />
        </motion.g>

        <motion.g
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#ui-shadow)"
        >
          <rect x="42" y="78" width="88" height="34" rx="8" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <circle cx="59" cy="95" r="5" fill="#EC5B38" />
          <text x="71" y="99" fill="#524646" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
            Tokens
          </text>
        </motion.g>

        <motion.g
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          filter="url(#ui-shadow)"
        >
          <rect x="225" y="275" width="88" height="30" rx="8" fill="#ffffff" stroke="#524646" strokeWidth="1.5" />
          <circle cx="239" cy="290" r="4" fill="#EC5B38" />
          <text x="249" y="294" fill="#524646" fontFamily="sans-serif" fontSize="10" fontWeight="bold">
            AAA A11y
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default UiUxIllustration

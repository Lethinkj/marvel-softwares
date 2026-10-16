import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'

export interface IllustrationProps {
  className?: string
}

/**
 * WebDevIllustration
 * Scenario: Code-to-Browser Live Hot Reload & Engineering.
 * Features:
 * - Developer avatar directly styled after Avatar 1 / Image 0 from user's reference sheets:
 *   * Spiky modern dark designer hair
 *   * Iconic white designer glasses with dark lenses
 *   * Mock-neck sweater in terracotta (#EC5B38) with circular chest emblem
 *   * Articulated hands with individual fingers coding on mechanical keyboard
 *   * Seated in ergonomic studio mesh chair with 5-star castor base
 *   * Ceramic coffee mug with rising steam
 *   * Modern lace-up sneakers with contrasting sole
 * - Split-view IDE code editor on left with syntax lines and blinking cursor.
 * - Live browser DOM preview on right with interactive components.
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const WebDevIllustration: React.FC<IllustrationProps> = ({
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
        aria-label="Web Application Development - Code and Live Browser Preview"
      >
        <defs>
          <filter id="web-shadow" x="-8%" y="-8%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#524646" floodOpacity="0.09" />
          </filter>
          <filter id="chair-shadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#524646" floodOpacity="0.08" />
          </filter>
          <linearGradient id="code-bg-grad" x1="50" y1="60" x2="260" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#524646" />
            <stop offset="100%" stopColor="#3d3434" />
          </linearGradient>
          <linearGradient id="browser-bg-grad" x1="280" y1="50" x2="490" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="dev-sweater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="100%" stopColor="#cf4624" />
          </linearGradient>
        </defs>

        {/* ============================================================
            1. Organic Background Backdrop Shapes
            ============================================================ */}
        <path
          d="M 50 170 C 30 90, 130 30, 230 40 C 340 50, 470 30, 495 120 C 520 210, 480 320, 390 350 C 280 380, 140 360, 80 310 C 40 270, 70 230, 50 170 Z"
          fill="#FCF2E5"
        />
        <path
          d="M 30 130 C 10 80, 80 35, 130 55 C 170 75, 150 140, 105 160 C 60 180, 50 170, 30 130 Z"
          fill="#EC5B38"
          fillOpacity="0.12"
        />

        {/* Ambient floating circles */}
        <circle cx="490" cy="70" r="10" fill="#EC5B38" fillOpacity="0.2" />
        <circle cx="510" cy="95" r="5" fill="#A8A492" fillOpacity="0.3" />
        <circle cx="55" cy="270" r="6" fill="#EC5B38" fillOpacity="0.25" />
        <path d="M 470 140 L 480 140 M 475 135 L 475 145" stroke="#EC5B38" strokeWidth="2.5" strokeLinecap="round" />

        {/* Ground Floor Shadow */}
        <ellipse cx="270" cy="354" rx="190" ry="14" fill="#524646" fillOpacity="0.07" />

        {/* ============================================================
            2. Split Workstation: Left Window (Code IDE Editor)
            ============================================================ */}
        <g id="ide-window" filter="url(#web-shadow)">
          <rect x="52" y="60" width="208" height="218" rx="14" fill="url(#code-bg-grad)" stroke="#524646" strokeWidth="2" />

          {/* IDE Window Header */}
          <rect x="52" y="60" width="208" height="26" rx="14" fill="#3a3131" />
          <circle cx="68" cy="73" r="3.5" fill="#EC5B38" />
          <circle cx="78" cy="73" r="3.5" fill="#A8A492" />
          <circle cx="88" cy="73" r="3.5" fill="#FCF2E5" fillOpacity="0.6" />

          {/* Tab */}
          <rect x="105" y="65" width="72" height="18" rx="4" fill="#524646" />
          <text x="141" y="77" textAnchor="middle" fill="#FCF2E5" fontFamily="monospace" fontSize="9" fontWeight="bold">
            App.tsx
          </text>

          {/* Lines & Blinking Cursor */}
          <g transform="translate(64, 98)" fontFamily="monospace" fontSize="9">
            <text x="0" y="10" fill="#A8A492" fillOpacity="0.6">1</text>
            <text x="16" y="10" fill="#EC5B38" fontWeight="bold">import</text>
            <text x="56" y="10" fill="#FCF2E5">React</text>

            <text x="0" y="26" fill="#A8A492" fillOpacity="0.6">2</text>
            <text x="16" y="26" fill="#EC5B38" fontWeight="bold">function</text>
            <text x="68" y="26" fill="#ffffff" fontWeight="bold">Web()</text>

            <text x="0" y="42" fill="#A8A492" fillOpacity="0.6">3</text>
            <text x="26" y="42" fill="#A8A492">const [ui] =</text>
            <text x="96" y="42" fill="#EC5B38">state()</text>

            <text x="0" y="58" fill="#A8A492" fillOpacity="0.6">4</text>
            <text x="26" y="58" fill="#EC5B38" fontWeight="bold">return</text>
            <text x="66" y="58" fill="#FCF2E5">&lt;Hero /&gt;</text>

            <text x="0" y="74" fill="#A8A492" fillOpacity="0.6">5</text>
            <text x="32" y="74" fill="#FCF2E5">&lt;Grid</text>
            <text x="70" y="74" fill="#A8A492">fast=</text>
            <text x="98" y="74" fill="#EC5B38">&quot;100&quot;</text>

            <text x="0" y="90" fill="#A8A492" fillOpacity="0.6">6</text>
            <text x="16" y="90" fill="#ffffff">&#125;</text>

            <motion.line
              x1="32"
              y1="96"
              x2="32"
              y2="108"
              stroke="#EC5B38"
              strokeWidth="2"
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        </g>

        {/* Sync Lightning Arrow */}
        <motion.g
          animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          transform="translate(254, 150)"
        >
          <circle cx="16" cy="16" r="16" fill="#EC5B38" filter="url(#chair-shadow)" />
          <path d="M 17 6 L 10 17 L 16 17 L 15 26 L 22 15 L 16 15 Z" fill="#ffffff" />
        </motion.g>

        {/* ============================================================
            3. Split Workstation: Right Window (Live Browser DOM Viewport)
            ============================================================ */}
        <g id="browser-window" filter="url(#web-shadow)">
          <rect x="282" y="50" width="208" height="228" rx="14" fill="url(#browser-bg-grad)" stroke="#A8A492" strokeWidth="1.5" />

          {/* Browser Header */}
          <rect x="282" y="50" width="208" height="28" rx="14" fill="#FCF2E5" />
          <line x1="282" y1="78" x2="490" y2="78" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="296" cy="64" r="3" fill="#EC5B38" />
          <circle cx="305" cy="64" r="3" fill="#A8A492" />
          <circle cx="314" cy="64" r="3" fill="#524646" fillOpacity="0.4" />

          {/* Search Address Bar */}
          <rect x="328" y="57" width="115" height="14" rx="7" fill="#ffffff" />
          <circle cx="336" cy="64" r="2" fill="#EC5B38" />
          <rect x="343" y="62" width="52" height="4" rx="2" fill="#A8A492" fillOpacity="0.8" />

          {/* Live Web App UI */}
          <rect x="294" y="88" width="184" height="56" rx="8" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="304" y="98" width="70" height="6" rx="3" fill="#524646" />
          <rect x="304" y="108" width="92" height="3.5" rx="1.75" fill="#A8A492" fillOpacity="0.8" />
          <rect x="304" y="123" width="36" height="13" rx="4" fill="#EC5B38" />
          <circle cx="322" cy="129.5" r="2.5" fill="#ffffff" />

          <rect x="414" y="95" width="54" height="42" rx="6" fill="#FCF2E5" />
          <circle cx="432" cy="110" r="7" fill="#EC5B38" fillOpacity="0.3" />
          <path d="M 418 132 L 432 121 L 446 129 L 462 118 L 466 132 Z" fill="#A8A492" fillOpacity="0.4" />

          {/* Cards Grid */}
          <rect x="294" y="152" width="88" height="66" rx="7" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="300" y="158" width="76" height="26" rx="5" fill="#FCF2E5" />
          <rect x="300" y="190" width="48" height="4" rx="2" fill="#524646" />
          <rect x="300" y="198" width="60" height="3" rx="1.5" fill="#A8A492" />

          <rect x="390" y="152" width="88" height="66" rx="7" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="396" y="158" width="76" height="26" rx="5" fill="#FCF2E5" />
          <rect x="396" y="190" width="52" height="4" rx="2" fill="#524646" />
          <rect x="396" y="198" width="64" height="3" rx="1.5" fill="#A8A492" />

          {/* Dragging component */}
          <motion.g
            animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="330" y="226" width="112" height="22" rx="6" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" filter="url(#chair-shadow)" />
            <circle cx="342" cy="237" r="4" fill="#EC5B38" />
            <rect x="352" y="234" width="48" height="4" rx="2" fill="#524646" />
            <rect x="420" y="233" width="16" height="7" rx="3.5" fill="#EC5B38" />
          </motion.g>
        </g>

        {/* ============================================================
            4. Reference Avatar: Software Engineer at Workstation
               (Modeled directly after Avatar 1 & Image 0 Reference!)
               - Broad natural shoulders in Terracotta mock-neck sweater with chest ring
               - Realistic seated legs with clean 90-degree knees and retro lace-up sneaker
               - Articulated typing hands with distinct arched fingers coding on mechanical keyboard
               - Ergonomic mesh task chair and studio desk
            ============================================================ */}
        <g id="char-developer-avatar">
          <ellipse cx="260" cy="354" rx="50" ry="8" fill="#524646" fillOpacity="0.12" />

          {/* Ergonomic Studio Task Chair */}
          <line x1="210" y1="346" x2="238" y2="340" stroke="#524646" strokeWidth="3" strokeLinecap="round" />
          <line x1="238" y1="340" x2="258" y2="346" stroke="#524646" strokeWidth="3" strokeLinecap="round" />
          <circle cx="210" cy="347" r="2.5" fill="#524646" />
          <circle cx="258" cy="347" r="2.5" fill="#524646" />
          <rect x="235" y="322" width="6" height="20" rx="2" fill="#A8A492" />
          <path d="M 218 318 C 218 316, 258 316, 258 318 L 255 324 C 255 326, 221 326, 221 324 Z" fill="#524646" />
          <path
            d="M 216 262 C 214 278, 214 298, 220 316 L 227 315 C 222 298, 222 278, 223 262 Z"
            fill="#524646"
          />

          {/* Seated Legs in Espresso #524646 (Horizontal thigh + vertical calf to floor) */}
          <path
            d="M 224 308 C 238 308, 260 308, 270 308 C 274 312, 274 322, 273 332 C 273 338, 272 344, 271 346 L 261 346 C 262 342, 263 336, 263 328 C 263 322, 258 322, 246 322 C 234 322, 224 320, 224 308 Z"
            fill="#524646"
          />
          {/* Retro Lace-up Sneaker */}
          <g transform="translate(257, 342)">
            <rect x="0" y="4" width="22" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 3 4 C 3 1, 8 -0.5, 14 -0.5 C 18 -0.5, 20 2, 20 4 Z" fill="#EC5B38" />
            <line x1="6" y1="1" x2="13" y2="1" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="5" y1="2.5" x2="14" y2="2.5" stroke="#ffffff" strokeWidth="0.8" />
          </g>

          {/* Torso in Terracotta Mock-Neck Sweater (Broad natural shoulders!) */}
          <path
            d="M 220 248 C 228 244, 238 244, 244 244 C 250 244, 258 244, 264 248 C 268 258, 264 286, 258 308 C 252 312, 232 312, 226 308 C 222 286, 218 258, 220 248 Z"
            fill="url(#dev-sweater)"
          />
          {/* Circular Chest Emblem (Avatar 1 signature!) */}
          <circle cx="242" cy="266" r="6" fill="none" stroke="#FCF2E5" strokeWidth="1.8" />
          <circle cx="242" cy="266" r="2.5" fill="#524646" />

          {/* Mock-Neck Collar */}
          <rect x="237" y="240" width="12" height="8" rx="2" fill="#ba3e1f" />

          {/* Neck */}
          <path d="M 239 232 L 247 232 L 247 242 L 239 242 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="233" cy="226" rx="2" ry="3.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="251" cy="226" rx="2" ry="3.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head & Iconic White Designer Glasses (Avatar 1 signature!) */}
          <ellipse cx="242" cy="226" rx="9" ry="11.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />
          {/* White Designer Sunglasses Frame */}
          <rect x="235" y="222" width="6.5" height="5" rx="1.5" fill="#ffffff" stroke="#524646" strokeWidth="0.6" />
          <rect x="236" y="223" width="4.5" height="3" rx="1" fill="#524646" />
          <rect x="243" y="222" width="6.5" height="5" rx="1.5" fill="#ffffff" stroke="#524646" strokeWidth="0.6" />
          <rect x="244" y="223" width="4.5" height="3" rx="1" fill="#524646" />
          <rect x="241.5" y="223.5" width="1.5" height="1" fill="#ffffff" />
          <line x1="235" y1="224.5" x2="233" y2="225" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="249.5" y1="224.5" x2="251" y2="225" stroke="#ffffff" strokeWidth="0.8" />

          {/* Spiky Modern Designer Hairstyle (Avatar 1 signature!) */}
          <path
            d="M 234 223 C 233 214, 237 207, 241 205 L 243 200 L 246 204 L 249 200 L 251 204 L 254 208 C 255 214, 255 220, 252 224 C 251 218, 248 214, 243 213 C 238 212, 235 217, 234 223 Z"
            fill="#524646"
          />

          {/* Desk Surface & Keyboard */}
          <rect x="195" y="294" width="165" height="10" rx="3" fill="#524646" />
          <rect x="200" y="304" width="6" height="42" rx="2" fill="#A8A492" />
          <rect x="350" y="304" width="6" height="42" rx="2" fill="#A8A492" />
          <rect x="238" y="289" width="58" height="6" rx="2" fill="#FCF2E5" stroke="#A8A492" strokeWidth="1" />
          <line x1="244" y1="292" x2="290" y2="292" stroke="#524646" strokeWidth="1.5" strokeDasharray="2 2" />
          <rect x="308" y="290" width="10" height="5" rx="2.5" fill="#EC5B38" />

          {/* Ceramic Coffee Mug */}
          <rect x="330" y="284" width="10" height="10" rx="2" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
          <path d="M 340 286 C 342 286, 343 289, 340 292" stroke="#524646" strokeWidth="1" fill="none" />
          <motion.path
            d="M 333 281 C 333 277, 337 277, 337 274"
            stroke="#EC5B38"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            animate={shouldReduceMotion ? {} : { y: [0, -3, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Left Arm & Articulated Hand actively typing on mechanical keyboard */}
          <path
            d="M 222 250 C 218 260, 218 274, 224 286 L 232 284 C 228 274, 228 262, 230 252 Z"
            fill="#EC5B38"
          />
          {/* Forearm extending forward */}
          <path
            d="M 224 284 C 230 287, 238 288, 248 288 L 248 284 C 240 284, 232 283, 226 280 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Left Hand with arched typing fingers */}
          <g transform="translate(244, 282)">
            <path d="M 2 4 C 4 2, 8 2, 10 4 L 11 7 C 9 8, 4 8, 2 7 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <line x1="5" y1="3" x2="6" y2="7" stroke="#524646" strokeWidth="0.6" />
            <line x1="8" y1="3" x2="9" y2="7" stroke="#524646" strokeWidth="0.6" />
            <path d="M 1 6 C 2 7, 4 7, 5 7" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>

          {/* Right Arm & Articulated Hand actively typing on mechanical keyboard */}
          <path
            d="M 262 250 C 266 260, 266 274, 262 284 L 254 282 C 257 274, 258 262, 256 252 Z"
            fill="#cf4624"
          />
          {/* Forearm extending forward */}
          <path
            d="M 258 282 C 264 286, 270 287, 278 288 L 278 284 C 272 283, 266 282, 260 279 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Right Hand with arched typing fingers */}
          <g transform="translate(272, 281)">
            <path d="M 2 4 C 4 2, 8 2, 10 4 L 11 7 C 9 8, 4 8, 2 7 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <line x1="5" y1="3" x2="6" y2="7" stroke="#524646" strokeWidth="0.6" />
            <line x1="8" y1="3" x2="9" y2="7" stroke="#524646" strokeWidth="0.6" />
            <path d="M 1 6 C 2 7, 4 7, 5 7" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>
        </g>

        {/* ============================================================
            5. Floating Scenario Badges
            ============================================================ */}
        <motion.g
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#web-shadow)"
        >
          <rect x="24" y="90" width="82" height="34" rx="8" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <text x="65" y="112" textAnchor="middle" fill="#EC5B38" fontFamily="monospace" fontSize="12" fontWeight="bold">
            &lt;web /&gt;
          </text>
        </motion.g>

        <motion.g
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          filter="url(#web-shadow)"
        >
          <rect x="424" y="115" width="86" height="32" rx="8" fill="#ffffff" stroke="#524646" strokeWidth="1.5" />
          <circle cx="438" cy="131" r="5" fill="#EC5B38" />
          <text x="449" y="135" fill="#524646" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold">
            100 Score
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default WebDevIllustration

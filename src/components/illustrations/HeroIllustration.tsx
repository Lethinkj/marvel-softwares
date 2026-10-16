import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { IllustrationProps } from './WebDevIllustration'

/**
 * HeroIllustration
 * Scenario: Modern Digital Studio Website Design & Engineering.
 * Features characters directly styled after the user's uploaded avatar reference sheets:
 * 1. Top Character on Monitor Bezel: Modeled after Avatar 2 (swept undercut with quiff, hipster beard/mustache, V-neck, belt buckle, lace-up sneakers).
 * 2. Left Character Stepping on Dome: Modeled after Image 0 (collared shirt with tie, styled fringe hair, eyes/smile, hand in pocket, lace-up shoes).
 * 3. Right Character with Giant Stylus: Modeled after Avatar 1 (spiky dark hair, iconic white designer sunglasses, mock-neck sweater with circular chest emblem, lace-up sneakers).
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const HeroIllustration: React.FC<IllustrationProps> = ({
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
        aria-label="Marvel Softwares Studio - Website Design and Digital Engineering"
      >
        <defs>
          <filter id="hero-main-shadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#524646" floodOpacity="0.1" />
          </filter>
          <filter id="hero-card-shadow" x="-12%" y="-12%" width="124%" height="124%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#524646" floodOpacity="0.08" />
          </filter>
          <linearGradient id="monitor-frame-grad" x1="140" y1="70" x2="400" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="100%" stopColor="#d94b28" />
          </linearGradient>
          <linearGradient id="hero-giant-pen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="50%" stopColor="#de4c29" />
            <stop offset="100%" stopColor="#b63819" />
          </linearGradient>
          <linearGradient id="organic-blob-left" x1="20" y1="120" x2="160" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#524646" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#524646" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* ============================================================
            1. Organic Background Backdrop Shapes
            ============================================================ */}
        {/* Large Warm Cream Base Blob */}
        <path
          d="M 60 160 C 40 70, 150 25, 270 35 C 390 45, 490 20, 510 120 C 525 210, 480 330, 390 355 C 270 380, 130 355, 80 290 C 50 245, 80 215, 60 160 Z"
          fill="#FCF2E5"
        />

        {/* Top-Right Terracotta Accent Blob */}
        <path
          d="M 430 40 C 480 20, 520 60, 510 110 C 500 160, 440 140, 420 100 C 400 60, 410 45, 430 40 Z"
          fill="#EC5B38"
          fillOpacity="0.14"
        />

        {/* Left Side Organic Shape */}
        <path
          d="M 20 220 C 10 150, 50 90, 110 80 C 160 70, 175 130, 145 190 C 115 250, 45 285, 20 220 Z"
          fill="url(#organic-blob-left)"
        />

        {/* Ambient floating circles & sparkles */}
        <circle cx="496" cy="65" r="9" fill="#EC5B38" fillOpacity="0.22" />
        <circle cx="516" cy="95" r="5" fill="#A8A492" fillOpacity="0.35" />
        <circle cx="46" cy="285" r="7" fill="#EC5B38" fillOpacity="0.25" />
        <circle cx="270" cy="25" r="4" fill="#A8A492" fillOpacity="0.4" />
        <path d="M 476 135 L 486 135 M 481 130 L 481 140" stroke="#EC5B38" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 72 75 L 82 75 M 77 70 L 77 80" stroke="#A8A492" strokeWidth="2" strokeLinecap="round" />

        {/* Ground Floor Shadow */}
        <ellipse cx="270" cy="354" rx="205" ry="14" fill="#524646" fillOpacity="0.08" />

        {/* ============================================================
            2. Central Desktop Computer Stand & Curved Base
            ============================================================ */}
        <ellipse cx="270" cy="336" rx="55" ry="8" fill="#524646" />
        <ellipse cx="270" cy="334" rx="44" ry="5" fill="#A8A492" />
        <path d="M 262 255 C 262 285, 256 315, 252 334 L 288 334 C 284 315, 278 285, 278 255 Z" fill="#A8A492" />
        <path d="M 268 255 L 265 334 L 275 334 L 272 255 Z" fill="#524646" fillOpacity="0.18" />

        {/* ============================================================
            3. Large Desktop Monitor (Terracotta Frame)
            ============================================================ */}
        <g id="hero-desktop-monitor" filter="url(#hero-main-shadow)">
          <rect x="145" y="75" width="260" height="186" rx="16" fill="url(#monitor-frame-grad)" stroke="#c84422" strokeWidth="2" />
          <rect x="154" y="84" width="242" height="168" rx="10" fill="#ffffff" />

          {/* Browser Header Bar */}
          <rect x="154" y="84" width="242" height="24" rx="10" fill="#FCF2E5" />
          <line x1="154" y1="108" x2="396" y2="108" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.25" />
          <circle cx="168" cy="96" r="3.5" fill="#EC5B38" />
          <circle cx="178" cy="96" r="3.5" fill="#A8A492" />
          <circle cx="188" cy="96" r="3.5" fill="#524646" fillOpacity="0.4" />

          {/* Address Bar */}
          <rect x="206" y="90" width="112" height="12" rx="6" fill="#ffffff" />
          <circle cx="214" cy="96" r="2.5" fill="#EC5B38" />
          <rect x="222" y="94.5" width="48" height="3" rx="1.5" fill="#A8A492" fillOpacity="0.75" />

          {/* Nav Links */}
          <rect x="334" y="94" width="16" height="4" rx="2" fill="#524646" />
          <rect x="356" y="94" width="16" height="4" rx="2" fill="#A8A492" />
          <rect x="378" y="92" width="14" height="8" rx="3" fill="#EC5B38" />

          {/* Hero Banner Section */}
          <rect x="166" y="118" width="218" height="52" rx="7" fill="#FCF2E5" />
          <rect x="176" y="126" width="75" height="6" rx="3" fill="#524646" />
          <rect x="176" y="136" width="105" height="3" rx="1.5" fill="#A8A492" />
          <rect x="176" y="142" width="85" height="3" rx="1.5" fill="#A8A492" />
          <motion.g
            animate={shouldReduceMotion ? {} : { scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="176" y="150" width="38" height="12" rx="4" fill="#524646" />
            <rect x="182" y="154" width="26" height="3.5" rx="1.75" fill="#ffffff" />
          </motion.g>

          <rect x="306" y="124" width="68" height="40" rx="6" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="328" cy="138" r="8" fill="#EC5B38" fillOpacity="0.25" />
          <path d="M 312 158 L 328 144 L 344 154 L 358 142 L 372 158 Z" fill="#A8A492" fillOpacity="0.35" />

          {/* Lower Content Cards */}
          <rect x="166" y="178" width="104" height="64" rx="6" fill="#FCF2E5" fillOpacity="0.75" stroke="#A8A492" strokeWidth="0.8" strokeOpacity="0.4" />
          <rect x="174" y="186" width="88" height="24" rx="4" fill="#ffffff" />
          <rect x="174" y="216" width="50" height="4" rx="2" fill="#524646" />
          <rect x="174" y="224" width="70" height="3" rx="1.5" fill="#A8A492" />

          <rect x="280" y="178" width="104" height="64" rx="6" fill="#FCF2E5" fillOpacity="0.75" stroke="#A8A492" strokeWidth="0.8" strokeOpacity="0.4" />
          <rect x="288" y="186" width="88" height="24" rx="4" fill="#ffffff" />
          <rect x="288" y="216" width="56" height="4" rx="2" fill="#524646" />
          <rect x="288" y="224" width="74" height="3" rx="1.5" fill="#A8A492" />
        </g>

        {/* ============================================================
            4. Reference Avatar 1: Tech Founder on Monitor (Avatar 2 from Image 1)
               - Swept undercut with quiff & sculpted hipster beard
               - Terracotta V-neck tee with natural broad shoulders
               - Belt with oval buckle & tailored trousers
               - Solid, well-proportioned legs & lace-up sneakers
               - Articulated vector hand wrapped around pointer pole
            ============================================================ */}
        <g id="char-top-avatar">
          {/* Left Leg in Espresso #524646 */}
          <path
            d="M 275 48 C 275 56, 274 65, 274 72 L 282 72 C 282 65, 283 56, 283 48 Z"
            fill="#524646"
          />
          {/* Left Lace-up Sneaker */}
          <g transform="translate(270, 70)">
            <rect x="1" y="2" width="14" height="3" rx="1.5" fill="#ffffff" stroke="#524646" strokeWidth="0.6" />
            <path d="M 3 0 C 5 -0.5, 12 -0.5, 13 1.5 L 2 1.5 Z" fill="#EC5B38" />
            <line x1="5" y1="0.8" x2="10" y2="0.8" stroke="#ffffff" strokeWidth="0.6" />
          </g>

          {/* Right Leg in Espresso #453b3b */}
          <path
            d="M 284 48 C 284 56, 285 65, 286 72 L 294 72 C 294 65, 292 56, 292 48 Z"
            fill="#453b3b"
          />
          {/* Right Lace-up Sneaker */}
          <g transform="translate(283, 70)">
            <rect x="1" y="2" width="14" height="3" rx="1.5" fill="#ffffff" stroke="#524646" strokeWidth="0.6" />
            <path d="M 3 0 C 5 -0.5, 12 -0.5, 13 1.5 L 2 1.5 Z" fill="#EC5B38" />
            <line x1="5" y1="0.8" x2="10" y2="0.8" stroke="#ffffff" strokeWidth="0.6" />
          </g>

          {/* Belt with Oval Buckle (Avatar 2 signature!) */}
          <rect x="272" y="45" width="23" height="3.5" rx="1" fill="#3a3131" />
          <ellipse cx="283.5" cy="46.8" rx="2.8" ry="1.8" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="0.6" />

          {/* Torso in Terracotta (#EC5B38) V-Neck Tee with Natural Shoulders */}
          <path
            d="M 268 20 C 274 16, 293 16, 299 20 C 302 26, 298 38, 294 45 C 290 47, 277 47, 273 45 C 269 38, 265 26, 268 20 Z"
            fill="#EC5B38"
          />
          {/* V-Neck Cutout */}
          <polygon points="279,20 288,20 283.5,29" fill="#FCF2E5" />

          {/* Neck */}
          <path d="M 280 12 L 287 12 L 287 20 L 280 20 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="274" cy="9" rx="1.8" ry="3" fill="#FCF2E5" stroke="#524646" strokeWidth="0.6" />
          <ellipse cx="293" cy="9" rx="1.8" ry="3" fill="#FCF2E5" stroke="#524646" strokeWidth="0.6" />

          {/* Head & Full Hipster Beard/Mustache (Avatar 2 signature!) */}
          <ellipse cx="283.5" cy="8" rx="8.5" ry="10" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
          {/* Beard Contour */}
          <path
            d="M 276 8 C 276 14, 279 18, 283.5 18 C 288 18, 291 14, 291 8 C 291 11, 289 15, 283.5 15 C 278 15, 276 11, 276 8 Z"
            fill="#524646"
          />
          {/* Mustache */}
          <path d="M 280 12 Q 283.5 14 287 12" stroke="#524646" strokeWidth="1" strokeLinecap="round" />

          {/* Swept Undercut Hairstyle with Quiff (Avatar 2 signature!) */}
          <path
            d="M 275 8 C 274 0, 279 -5, 288 -4 C 292 -2, 293 2, 292 5 C 289 2, 285 3, 283 4 C 280 5, 278 6, 275 9 Z"
            fill="#524646"
          />
          <path d="M 274 -1 C 270 -6, 278 -8, 285 -6 C 279 -5, 274 -4, 274 -1 Z" fill="#3a3131" />

          {/* Left Arm: Relaxed at side with natural hand */}
          <path
            d="M 268 20 C 265 25, 263 32, 264 38 L 268 38 C 269 33, 271 26, 272 21 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.6"
          />
          <path d="M 264 38 C 263 41, 265 43, 267 43 C 268 41, 268 38, 268 38 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.5" />

          {/* Right Arm: Angling forward with articulated hand gripping pointer pole */}
          <path
            d="M 299 20 C 302 24, 305 29, 304 35 L 300 35 C 299 30, 297 25, 295 21 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.6"
          />
          {/* Hand gripping pole (curled fingers wrapping around the pole + thumb) */}
          <g transform="translate(299, 31)">
            <rect x="0" y="0" width="4" height="7" rx="2" fill="#FCF2E5" stroke="#524646" strokeWidth="0.6" />
            <path d="M 0 2 Q 3 2 4 4" stroke="#524646" strokeWidth="0.5" fill="none" />
            <path d="M -1 1 C -1 0, 1 1, 2 2" stroke="#524646" strokeWidth="0.6" strokeLinecap="round" />
          </g>

          {/* Vertical Pointer Pole */}
          <motion.g
            animate={shouldReduceMotion ? {} : { rotate: [0, 1.5, 0, -1.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            transform="translate(301, 34)"
          >
            <line x1="0" y1="-44" x2="0" y2="65" stroke="#524646" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="0" cy="-45" r="3.5" fill="#EC5B38" />
            <circle cx="0" cy="65" r="2" fill="#A8A492" />
          </motion.g>
        </g>

        {/* ============================================================
            5. Avatar 2: Character on Left Stepping on Dome (Image 0 Reference)
               - Natural broad shoulders in collared shirt with terracotta tie
               - Belt with buckle & clean pelvic fork
               - Continuous, anatomically curved stepped leg resting on dome
               - Solid upright standing leg with lace-up sneaker
               - Left arm with hand naturally in pocket
               - Right arm extending with articulated index finger pointing at UI
            ============================================================ */}
        <g id="char-left-avatar">
          {/* Terracotta Rounded Half-Circle Dome */}
          <path
            d="M 98 348 C 98 322, 134 322, 134 348 Z"
            fill="#EC5B38"
            stroke="#d44724"
            strokeWidth="1.5"
          />
          <ellipse cx="116" cy="348" rx="20" ry="3" fill="#524646" fillOpacity="0.2" />

          {/* Right Leg planted straight on ground */}
          <path
            d="M 64 242 C 63 256, 62 286, 63 306 C 63 318, 64 328, 65 332 L 75 332 C 75 328, 75 318, 76 306 C 77 286, 78 256, 78 250 Z"
            fill="#524646"
          />
          {/* Right Lace-up Sneaker */}
          <g transform="translate(56, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Left Leg stepped onto Dome (Continuous anatomical thigh, knee, calf curve) */}
          <path
            d="M 80 248 C 88 250, 99 262, 107 274 C 111 280, 115 292, 116 318 L 124 318 C 123 294, 118 280, 112 270 C 104 258, 93 246, 82 242 Z"
            fill="#453b3b"
          />
          {/* Left Lace-up Sneaker on Dome */}
          <g transform="translate(108, 314)">
            <rect x="0" y="6" width="21" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 3 6 C 3 2, 8 0, 13 0 C 17 0, 19 3, 19 6 Z" fill="#524646" />
            <line x1="6" y1="2.5" x2="12" y2="2.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="5" y1="4.5" x2="13" y2="4.5" stroke="#ffffff" strokeWidth="0.8" />
          </g>

          {/* Belt with Buckle */}
          <rect x="62" y="238" width="34" height="4.5" rx="1.5" fill="#3a3131" />
          <ellipse cx="78" cy="240.2" rx="3" ry="2" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="0.8" />

          {/* Torso in Collared Shirt (Broad natural shoulders!) */}
          <path
            d="M 58 194 C 65 190, 74 190, 81 190 C 88 190, 97 190, 102 194 C 105 202, 103 224, 96 238 C 90 240, 70 240, 64 238 C 58 224, 55 202, 58 194 Z"
            fill="#FCF2E5"
            stroke="#A8A492"
            strokeWidth="1.2"
          />
          {/* Tie in Terracotta (#EC5B38) */}
          <polygon points="78,196 84,196 85,230 81,236 77,230" fill="#EC5B38" />
          {/* White Collar Tabs */}
          <polygon points="73,192 81,200 77,192" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />
          <polygon points="89,192 81,200 85,192" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />

          {/* Neck */}
          <path d="M 76 180 L 86 180 L 86 192 L 76 192 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="69" cy="170" rx="3" ry="5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="93" cy="170" rx="3" ry="5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head & Facial Features */}
          <ellipse cx="81" cy="168" rx="12" ry="15" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />
          <path d="M 74 162 C 76 160, 78 160, 80 162" stroke="#524646" strokeWidth="1" strokeLinecap="round" />
          <circle cx="77" cy="165" r="1.5" fill="#524646" />
          <path d="M 82 162 C 84 160, 86 160, 88 162" stroke="#524646" strokeWidth="1" strokeLinecap="round" />
          <circle cx="85" cy="165" r="1.5" fill="#524646" />
          <path d="M 81 165 L 80 169 L 82 169" stroke="#524646" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 78 173 Q 81 176 84 173" stroke="#EC5B38" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Side-Parted Fringe Hair (Image 0) */}
          <path
            d="M 70 168 C 69 155, 76 148, 86 149 C 92 150, 94 157, 92 161 C 89 158, 85 158, 82 160 C 79 157, 74 157, 72 160 C 70 163, 70 165, 70 168 Z"
            fill="#524646"
          />

          {/* Left Arm: Hand in pocket */}
          <path
            d="M 58 194 C 54 200, 50 206, 49 214 L 57 217 C 59 211, 62 202, 64 196 Z"
            fill="#FCF2E5"
            stroke="#A8A492"
            strokeWidth="0.8"
          />
          <path d="M 53 216 C 53 216, 56 232, 59 240 L 66 238 C 64 230, 60 216, 60 216 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <path d="M 59 238 C 58 242, 61 245, 65 244 C 66 242, 66 238, 64 237 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <line x1="62" y1="240" x2="67" y2="250" stroke="#3a3131" strokeWidth="1.2" strokeLinecap="round" />

          {/* Right Arm: Extending forward pointing to UI screen */}
          <path
            d="M 102 194 C 106 198, 110 204, 114 210 L 107 215 C 103 208, 100 202, 97 197 Z"
            fill="#FCF2E5"
            stroke="#A8A492"
            strokeWidth="0.8"
          />
          <path
            d="M 111 209 C 117 205, 126 199, 134 193 L 138 197 C 130 203, 120 210, 115 214 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Beautifully Articulated Pointing Hand */}
          <g transform="translate(134, 188)">
            {/* Extended Index Finger */}
            <path d="M 4 5 C 7 3, 11 2, 14 2 C 15 2.5, 15 3.5, 14 4 C 11 4.5, 7 5.5, 4 6.5 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            {/* Curled Knuckles & Palm */}
            <path d="M 0 5 C 1 3, 3 3, 4 4.5 C 5 6, 5 9, 3 10 C 1 10, 0 8, 0 5 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            {/* Thumb */}
            <path d="M 1 5 C 3 4, 5 4, 6 5.5" stroke="#524646" strokeWidth="0.7" fill="none" />
          </g>
        </g>

        {/* ============================================================
            6. Avatar 3: Creative Designer with Giant Stylus (Avatar 1 from Image 1)
               - Natural shoulders in Espresso mock-neck sweater with chest ring
               - Realistic seated legs with clean knees and retro lace-up sneakers
               - Articulated vector hands wrapping securely around the giant stylus
            ============================================================ */}
        <g id="char-right-avatar">
          <ellipse cx="460" cy="346" rx="36" ry="6" fill="#524646" fillOpacity="0.14" />

          {/* Left Leg (Seated posture: horizontal thigh + vertical calf) */}
          <path
            d="M 454 260 C 444 266, 436 276, 434 290 C 432 304, 434 320, 435 332 L 445 332 C 444 320, 442 306, 444 294 C 446 284, 452 274, 460 266 Z"
            fill="#524646"
          />
          {/* Left Lace-up Sneaker */}
          <g transform="translate(426, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Right Leg */}
          <path
            d="M 468 260 C 474 268, 480 280, 482 294 C 484 308, 485 322, 486 332 L 496 332 C 495 322, 494 308, 492 294 C 490 280, 484 268, 478 260 Z"
            fill="#453b3b"
          />
          {/* Right Lace-up Sneaker */}
          <g transform="translate(478, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Torso in Mock-Neck Sweater (Broad natural shoulders!) */}
          <path
            d="M 450 206 C 458 202, 470 202, 478 202 C 486 202, 494 202, 498 206 C 501 216, 497 242, 488 260 C 482 264, 462 264, 456 260 C 448 242, 446 216, 450 206 Z"
            fill="#524646"
          />
          {/* Circular Chest Ring Graphic (Avatar 1 signature!) */}
          <circle cx="474" cy="225" r="7" fill="none" stroke="#FCF2E5" strokeWidth="2" />
          <circle cx="474" cy="225" r="3" fill="#EC5B38" />

          {/* Mock-Neck Collar */}
          <rect x="468" y="196" width="12" height="10" rx="2" fill="#3e3434" />

          {/* Neck */}
          <path d="M 469 188 L 479 188 L 479 198 L 469 198 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="461" cy="178" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="487" cy="178" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head */}
          <ellipse cx="474" cy="176" rx="11" ry="14" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />

          {/* Iconic White Designer Sunglasses (Avatar 1 signature!) */}
          <rect x="463" y="171" width="9" height="7" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
          <rect x="464.5" y="172.5" width="6" height="4" rx="1" fill="#524646" />
          <rect x="475" y="171" width="9" height="7" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
          <rect x="476.5" y="172.5" width="6" height="4" rx="1" fill="#524646" />
          <rect x="472" y="173" width="3" height="1.5" fill="#ffffff" />
          <line x1="463" y1="174" x2="460" y2="175" stroke="#ffffff" strokeWidth="1" />
          <line x1="484" y1="174" x2="487" y2="175" stroke="#ffffff" strokeWidth="1" />

          {/* Nose & Smile */}
          <path d="M 474 179 L 473 182 L 475 182" stroke="#524646" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 471 185 Q 474 187 477 185" stroke="#524646" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* Spiky Modern Designer Hairstyle (Avatar 1 signature!) */}
          <path
            d="M 463 171 C 461 163, 465 157, 470 154 L 472 149 L 476 153 L 480 148 L 483 153 L 486 151 L 487 159 C 489 163, 489 169, 486 173 C 485 167, 483 163, 477 162 C 470 161, 465 165, 463 171 Z"
            fill="#524646"
          />

          {/* ============================================================
              Giant Stylus / Marker Pen (Drawn diagonally to monitor)
              ============================================================ */}
          <motion.g
            animate={shouldReduceMotion ? {} : { rotate: [-2, 1, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            transform="translate(420, 260)"
          >
            <g transform="rotate(-38)">
              <rect x="-12" y="-95" width="24" height="120" rx="4" fill="url(#hero-giant-pen)" />
              <line x1="-5" y1="-95" x2="-5" y2="25" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
              <rect x="-12" y="16" width="24" height="8" fill="#A8A492" />
              <rect x="-12" y="24" width="24" height="14" rx="3.5" fill="#FCF2E5" />
              <polygon points="-12,-95 12,-95 0,-122" fill="#FCF2E5" />
              <polygon points="-5,-108 5,-108 0,-122" fill="#524646" />
            </g>
          </motion.g>

          {/* Shimmer Sparkle at Pen Tip touching Screen */}
          <motion.circle
            cx="396"
            cy="166"
            r="4"
            fill="#EC5B38"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Arms realistically grasping the giant stylus with articulated hands */}
          {/* Upper Arm 1 */}
          <path
            d="M 452 208 C 446 218, 436 232, 428 244 L 436 248 C 444 236, 452 224, 458 214 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Hand 1: fingers curled around the stylus shaft */}
          <g transform="translate(424, 240)">
            <path d="M 3 2 C 5 0, 9 1, 10 3 C 11 5, 10 8, 8 9 L 2 7 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            <line x1="5" y1="2" x2="8" y2="6" stroke="#524646" strokeWidth="0.6" />
            <line x1="7" y1="3" x2="9" y2="7" stroke="#524646" strokeWidth="0.6" />
            {/* Thumb wrapping over */}
            <path d="M 1 5 C 0 3, 2 2, 4 3 L 6 6 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
          </g>

          {/* Upper Arm 2 */}
          <path
            d="M 474 212 C 466 226, 454 242, 442 254 L 449 258 C 460 246, 470 230, 480 218 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Hand 2: fingers curled around lower grip */}
          <g transform="translate(438, 252)">
            <path d="M 3 2 C 5 0, 9 1, 10 3 C 11 5, 10 8, 8 9 L 2 7 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            <line x1="5" y1="2" x2="8" y2="6" stroke="#524646" strokeWidth="0.6" />
            <line x1="7" y1="3" x2="9" y2="7" stroke="#524646" strokeWidth="0.6" />
            <path d="M 1 5 C 0 3, 2 2, 4 3 L 6 6 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
          </g>
        </g>

        {/* ============================================================
            7. Floating Scenario Badges
            ============================================================ */}
        <motion.g
          filter="url(#hero-card-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="36" y="112" width="92" height="34" rx="9" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <circle cx="52" cy="129" r="4.5" fill="#EC5B38" />
          <text x="63" y="133" fill="#524646" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold">
            Web Design
          </text>
        </motion.g>

        <motion.g
          filter="url(#hero-card-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <rect x="420" y="108" width="90" height="32" rx="9" fill="#EC5B38" />
          <text x="465" y="128" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold">
            Get Started
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default HeroIllustration

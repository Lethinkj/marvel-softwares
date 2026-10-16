import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { IllustrationProps } from './WebDevIllustration'

/**
 * MobileDevIllustration
 * Scenario: Cross-Platform Mobile Engineering & Gesture Interaction.
 * Features:
 * - Mobile QA Engineer avatar directly styled after Avatar 3 from user's reference sheet:
 *   * Sleek brunette hair parted in center and tucked behind ears
 *   * Crisp white collared shirt with pointed lapels under terracotta cardigan/blazer
 *   * Slim trousers and lace-up sneakers with white soles
 *   * Articulated arm extending index finger to phone screen triggering touch ripple
 *   * Holding mini test device at hip
 * - Dual modern smartphones (iOS & Android) with interactive card feeds.
 * - Animated touch ripple expanding from user's index finger contact point.
 * - Floating push notification and 60 FPS performance gauge.
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const MobileDevIllustration: React.FC<IllustrationProps> = ({
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
        aria-label="Mobile Application Development - iOS and Android Mockups"
      >
        <defs>
          <filter id="mob-shadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#524646" floodOpacity="0.1" />
          </filter>
          <linearGradient id="phone-ios-grad" x1="100" y1="50" x2="230" y2="310" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="phone-android-grad" x1="220" y1="80" x2="350" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* ============================================================
            1. Organic Background Backdrop Shapes
            ============================================================ */}
        <path
          d="M 60 170 C 40 80, 140 25, 250 40 C 360 55, 480 30, 495 130 C 515 220, 470 330, 380 350 C 270 375, 130 350, 80 290 C 50 250, 80 220, 60 170 Z"
          fill="#FCF2E5"
        />
        <path
          d="M 390 120 C 450 60, 520 120, 500 190 C 480 260, 410 240, 380 200 C 350 160, 330 180, 390 120 Z"
          fill="#EC5B38"
          fillOpacity="0.12"
        />

        {/* Ambient floating elements */}
        <circle cx="70" cy="90" r="8" fill="#EC5B38" fillOpacity="0.2" />
        <circle cx="490" cy="80" r="6" fill="#A8A492" fillOpacity="0.3" />
        <circle cx="510" cy="270" r="8" fill="#EC5B38" fillOpacity="0.2" />
        <path d="M 80 140 L 90 140 M 85 135 L 85 145" stroke="#EC5B38" strokeWidth="2.5" strokeLinecap="round" />

        {/* Ground Floor Shadow */}
        <ellipse cx="260" cy="354" rx="190" ry="14" fill="#524646" fillOpacity="0.07" />

        {/* ============================================================
            2. Smartphone 1: iOS iPhone Device Mockup (Left)
            ============================================================ */}
        <g id="phone-ios" filter="url(#mob-shadow)">
          <rect x="95" y="45" width="135" height="265" rx="26" fill="#524646" />
          <rect x="100" y="50" width="125" height="255" rx="22" fill="url(#phone-ios-grad)" />

          {/* Dynamic Island */}
          <rect x="137" y="57" width="50" height="12" rx="6" fill="#524646" />
          <circle cx="178" cy="63" r="2.5" fill="#1f1a1a" />

          {/* App Header */}
          <circle cx="118" cy="85" r="7" fill="#EC5B38" />
          <rect x="132" y="80" width="55" height="5" rx="2.5" fill="#524646" />
          <rect x="132" y="88" width="38" height="3" rx="1.5" fill="#A8A492" />
          <circle cx="210" cy="85" r="4" fill="#A8A492" fillOpacity="0.5" />

          {/* Featured Card */}
          <rect x="110" y="105" width="105" height="68" rx="10" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="118" y="113" width="89" height="32" rx="6" fill="#FCF2E5" />
          <circle cx="134" cy="129" r="6" fill="#EC5B38" fillOpacity="0.4" />
          <rect x="118" y="152" width="54" height="4" rx="2" fill="#524646" />
          <rect x="118" y="160" width="70" height="3" rx="1.5" fill="#A8A492" />

          {/* List items */}
          <rect x="110" y="184" width="105" height="28" rx="7" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="122" cy="198" r="5" fill="#EC5B38" fillOpacity="0.3" />
          <rect x="134" y="194" width="46" height="4" rx="2" fill="#524646" />
          <rect x="134" y="201" width="32" height="2.5" rx="1.25" fill="#A8A492" />
          <rect x="194" y="193" width="14" height="10" rx="3" fill="#FCF2E5" />

          <rect x="110" y="220" width="105" height="28" rx="7" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="122" cy="234" r="5" fill="#A8A492" fillOpacity="0.4" />
          <rect x="134" y="230" width="52" height="4" rx="2" fill="#524646" />
          <rect x="134" y="237" width="38" height="2.5" rx="1.25" fill="#A8A492" />

          <rect x="140" y="293" width="45" height="3" rx="1.5" fill="#524646" />
        </g>

        {/* ============================================================
            3. Smartphone 2: Android Mockup (Center-Right)
            ============================================================ */}
        <g id="phone-android" filter="url(#mob-shadow)">
          <rect x="220" y="70" width="138" height="270" rx="22" fill="#ffffff" stroke="#A8A492" strokeWidth="2" />
          <rect x="225" y="75" width="128" height="260" rx="18" fill="url(#phone-android-grad)" />

          <circle cx="289" cy="85" r="3.5" fill="#524646" />

          {/* Android App Header */}
          <rect x="238" y="100" width="22" height="4" rx="2" fill="#524646" />
          <circle cx="336" cy="102" r="5" fill="#EC5B38" />

          {/* Analytics Chart Feed */}
          <rect x="236" y="116" width="106" height="74" rx="8" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="244" y="124" width="48" height="4" rx="2" fill="#524646" />
          <rect x="244" y="131" width="34" height="3" rx="1.5" fill="#A8A492" />

          <rect x="246" y="156" width="10" height="24" rx="3" fill="#FCF2E5" />
          <rect x="262" y="146" width="10" height="34" rx="3" fill="#EC5B38" />
          <rect x="278" y="152" width="10" height="28" rx="3" fill="#A8A492" />
          <rect x="294" y="142" width="10" height="38" rx="3" fill="#524646" />
          <rect x="310" y="148" width="10" height="32" rx="3" fill="#EC5B38" />

          {/* Interactive Button */}
          <rect x="236" y="202" width="106" height="38" rx="9" fill="#EC5B38" />
          <circle cx="254" cy="221" r="7" fill="#ffffff" />
          <rect x="268" y="217" width="58" height="4.5" rx="2.25" fill="#ffffff" />
          <rect x="268" y="224" width="38" height="3" rx="1.5" fill="#FCF2E5" />

          <rect x="236" y="250" width="106" height="44" rx="8" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="244" y="258" width="55" height="4" rx="2" fill="#524646" />
          <rect x="244" y="266" width="75" height="3" rx="1.5" fill="#A8A492" />
          <rect x="244" y="278" width="32" height="9" rx="3" fill="#FCF2E5" />
        </g>

        {/* ============================================================
            4. Scenario Animation: Animated Touch Gesture Ripple
            ============================================================ */}
        <g id="touch-ripple" transform="translate(320, 226)">
          <motion.circle
            cx="0"
            cy="0"
            r="8"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            animate={shouldReduceMotion ? {} : { r: [4, 22], opacity: [1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.circle
            cx="0"
            cy="0"
            r="16"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            animate={shouldReduceMotion ? {} : { r: [8, 30], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
          />
        </g>

        {/* ============================================================
            5. Reference Avatar: Mobile QA Engineer
               (Modeled directly after Avatar 3 from Image 1!)
               - Broad natural shoulders in Terracotta blazer over white collared shirt
               - Well-proportioned straight-leg trousers in warm taupe with clean pelvic fork
               - Retro lace-up sneakers with rubber outsole & white laces
               - Articulated hands: right hand holding test device, left arm reaching forward
                 with beautifully articulated index finger tapping screen ripple
            ============================================================ */}
        <g id="char-mobile-avatar">
          <ellipse cx="438" cy="346" rx="34" ry="6" fill="#524646" fillOpacity="0.14" />

          {/* Long Hair Cascading Behind Shoulders (Avatar 3 signature!) */}
          <path
            d="M 424 176 C 420 200, 420 224, 426 242 L 450 242 C 456 224, 456 200, 452 176 Z"
            fill="#3a3030"
          />

          {/* Left Leg in Warm Taupe #A8A492 Trousers */}
          <path
            d="M 422 242 C 421 255, 421 285, 422 305 C 423 318, 424 328, 425 332 L 435 332 C 435 328, 435 318, 436 305 C 436 285, 437 255, 437 250 Z"
            fill="#A8A492"
          />
          {/* Left Lace-up Sneaker */}
          <g transform="translate(416, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Right Leg */}
          <path
            d="M 439 250 C 439 255, 440 285, 440 305 C 441 318, 441 328, 442 332 L 452 332 C 452 328, 453 318, 454 305 C 454 285, 454 255, 454 242 Z"
            fill="#8e8977"
          />
          {/* Right Lace-up Sneaker */}
          <g transform="translate(436, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Pelvic Fork */}
          <path d="M 436 248 L 438 252 L 440 248" stroke="#3a3131" strokeWidth="1.2" strokeLinecap="round" />

          {/* Belt with Buckle */}
          <rect x="419" y="238" width="37" height="5" rx="1.5" fill="#3a3131" />
          <ellipse cx="438" cy="240.5" rx="3.5" ry="2.5" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="0.8" />

          {/* Torso in Terracotta (#EC5B38) Cardigan/Blazer (Broad natural shoulders!) */}
          <path
            d="M 415 194 C 422 190, 431 190, 438 190 C 445 190, 454 190, 461 194 C 465 202, 462 224, 456 238 C 450 240, 426 240, 420 238 C 414 224, 411 202, 415 194 Z"
            fill="#EC5B38"
          />
          {/* Contrast Lapel Trim */}
          <polygon points="432,192 444,192 441,238 435,238" fill="#524646" />
          {/* Inner Crisp White Collared Shirt with Pointed Lapels (Avatar 3 signature!) */}
          <polygon points="435,190 441,190 438,206" fill="#ffffff" />
          <polygon points="432,188 437,196 434,188" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />
          <polygon points="444,188 439,196 442,188" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />

          {/* Neck */}
          <path d="M 433 176 L 443 176 L 443 188 L 433 188 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="426" cy="166" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="450" cy="166" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head & Facial Features */}
          <ellipse cx="438" cy="165" rx="12" ry="15" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />
          {/* Eyes & Eyebrows */}
          <path d="M 431 160 C 433 158, 435 158, 437 160" stroke="#524646" strokeWidth="1" strokeLinecap="round" />
          <circle cx="434" cy="163" r="1.5" fill="#524646" />
          <path d="M 439 160 C 441 158, 443 158, 445 160" stroke="#524646" strokeWidth="1" strokeLinecap="round" />
          <circle cx="442" cy="163" r="1.5" fill="#524646" />
          {/* Nose & Smile */}
          <path d="M 438 164 L 437 168 L 439 168" stroke="#524646" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 435 172 Q 438 175 441 172" stroke="#EC5B38" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Sleek Hair Front Profile (Tucked behind ears, center parting - Avatar 3!) */}
          <path
            d="M 427 166 C 426 154, 432 145, 443 147 C 449 148, 450 155, 449 160 C 446 156, 442 156, 439 158 C 436 156, 431 156, 429 159 C 428 162, 428 164, 427 166 Z"
            fill="#524646"
          />

          {/* Right Arm: Holding Mini Test Device at Hip */}
          <path
            d="M 461 194 C 466 200, 469 210, 467 220 L 459 222 C 459 216, 458 206, 455 198 Z"
            fill="#EC5B38"
          />
          {/* Forearm */}
          <path d="M 467 220 C 465 228, 459 234, 452 232 L 450 226 C 456 226, 460 222, 461 218 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          {/* Mini Smartphone Device & Hand */}
          <rect x="444" y="222" width="13" height="20" rx="3" fill="#524646" />
          <rect x="446" y="225" width="9" height="14" rx="1.5" fill="#ffffff" />
          {/* Articulated fingers supporting device */}
          <g transform="translate(449, 226)">
            <path d="M 1 3 C 0 1, 2 0, 4 0.5 C 5 1.5, 6 4, 4 6 L 1 5 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
          </g>

          {/* Left Arm: Articulated reaching forward to touch Android screen */}
          {/* Upper Arm */}
          <path
            d="M 415 194 C 408 200, 398 206, 388 212 L 392 218 C 402 212, 412 206, 421 198 Z"
            fill="#EC5B38"
          />
          {/* Forearm extending forward (solid human thickness!) */}
          <path
            d="M 388 212 C 368 218, 348 222, 332 225 L 332 231 C 348 228, 368 224, 392 218 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Hand with extended index finger cleanly touching ripple */}
          <g transform="translate(320, 222)">
            {/* Extended Index Finger */}
            <path d="M 12 3 C 8 3.5, 3 4, 0 4.5 C -0.5 5, 0 6, 2 6 C 5 6, 9 5.5, 12 5.5 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            {/* Palm & Curled Knuckles */}
            <path d="M 12 2 C 14 1.5, 16 3, 16 5 C 16 7, 14 8, 12 8 C 11 7, 11 4, 12 2 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            {/* Thumb */}
            <path d="M 13 2 C 11 1, 9 2, 8 3" stroke="#524646" strokeWidth="0.7" fill="none" />
          </g>
        </g>

        {/* ============================================================
            6. Floating Scenario Badges
            ============================================================ */}
        <motion.g
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#mob-shadow)"
        >
          <rect x="340" y="58" width="144" height="42" rx="10" fill="#ffffff" stroke="#A8A492" strokeWidth="1.2" />
          <circle cx="358" cy="79" r="10" fill="#FCF2E5" />
          <circle cx="358" cy="79" r="4" fill="#EC5B38" />
          <rect x="376" y="72" width="65" height="5" rx="2.5" fill="#524646" />
          <rect x="376" y="81" width="92" height="3" rx="1.5" fill="#A8A492" />
          <circle cx="470" cy="68" r="4" fill="#EC5B38" />
        </motion.g>

        <motion.g
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          filter="url(#mob-shadow)"
        >
          <rect x="46" y="174" width="86" height="34" rx="8" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <circle cx="62" cy="191" r="5" fill="#EC5B38" />
          <text x="74" y="195" fill="#524646" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
            60 FPS
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default MobileDevIllustration

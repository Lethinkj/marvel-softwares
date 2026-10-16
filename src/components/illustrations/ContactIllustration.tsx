import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { IllustrationProps } from './WebDevIllustration'

/**
 * ContactIllustration
 * Scenario: Client Collaboration, Quick Consultation & Direct Engineering Reach.
 * Features:
 * - Solutions Lead avatar directly modeled after user's reference character sheet (Image 0):
 *   * Collared shirt with white collar tabs and tie
 *   * Friendly smiling face with eyes, eyebrows, nose and defined ears
 *   * Right arm raised in open 5-finger waving greeting
 *   * Left hand resting casually in trouser pocket
 *   * Modern lace-up sneakers with contrasting sole
 * - Communication station desk with interactive terminal and message cards.
 * - Animated origami paper airplane carrying project brief.
 * - Floating chat bubbles ("Let's build!", "24h Response") and 24h SLA badge.
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const ContactIllustration: React.FC<IllustrationProps> = ({
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
        aria-label="Contact Marvel Softwares - Consultation Station and Direct Engineering Reach"
      >
        <defs>
          <filter id="cnt-shadow" x="-8%" y="-8%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#524646" floodOpacity="0.09" />
          </filter>
          <linearGradient id="cnt-desk-grad" x1="160" y1="120" x2="380" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="plane-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="100%" stopColor="#cf4624" />
          </linearGradient>
          <linearGradient id="avatar-shirt-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCF2E5" />
            <stop offset="100%" stopColor="#eedbc7" />
          </linearGradient>
        </defs>

        {/* ============================================================
            1. Organic Background Backdrop Shapes
            ============================================================ */}
        <path
          d="M 60 160 C 40 70, 150 20, 260 35 C 370 50, 480 20, 495 120 C 515 210, 470 320, 380 345 C 270 370, 130 345, 80 285 C 50 245, 80 215, 60 160 Z"
          fill="#F4F5FF"
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
            2. Customer Launch Console Station (Center-Right)
            ============================================================ */}
        <g id="contact-desk" filter="url(#cnt-shadow)">
          {/* Main Terminal Frame */}
          <rect x="180" y="110" width="220" height="150" rx="14" fill="url(#cnt-desk-grad)" stroke="#A8A492" strokeWidth="1.5" />

          {/* Terminal Header */}
          <rect x="180" y="110" width="220" height="26" rx="14" fill="#FCF2E5" />
          <line x1="180" y1="136" x2="400" y2="136" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="196" cy="123" r="3.5" fill="#EC5B38" />
          <circle cx="206" cy="123" r="3.5" fill="#A8A492" />
          <circle cx="216" cy="123" r="3.5" fill="#524646" fillOpacity="0.4" />
          <rect x="230" y="117" width="90" height="12" rx="6" fill="#ffffff" />
          <text x="275" y="126" textAnchor="middle" fill="#524646" fontFamily="sans-serif" fontSize="8" fontWeight="bold">
            Direct Line: Connected
          </text>

          {/* Message Thread Feed inside Console */}
          <rect x="195" y="148" width="140" height="30" rx="7" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="208" cy="163" r="5" fill="#EC5B38" />
          <rect x="218" y="157" width="70" height="4" rx="2" fill="#524646" />
          <rect x="218" y="165" width="95" height="3" rx="1.5" fill="#A8A492" />

          <rect x="235" y="186" width="150" height="30" rx="7" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="248" cy="201" r="5" fill="#524646" />
          <rect x="258" y="195" width="85" height="4" rx="2" fill="#EC5B38" />
          <rect x="258" y="203" width="110" height="3" rx="1.5" fill="#524646" />

          {/* Quick Input Bar at Bottom */}
          <rect x="195" y="224" width="190" height="24" rx="6" fill="#ffffff" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="208" cy="236" r="4" fill="#A8A492" fillOpacity="0.5" />
          <rect x="218" y="234" width="60" height="4" rx="2" fill="#A8A492" fillOpacity="0.6" />
          <rect x="355" y="228" width="24" height="16" rx="4" fill="#EC5B38" />
          <polygon points="364,233 372,236 364,239" fill="#ffffff" />

          {/* Desk Stand Base */}
          <path d="M 265 260 L 255 334 L 325 334 L 315 260 Z" fill="#A8A492" />
          <rect x="230" y="332" width="120" height="8" rx="4" fill="#524646" />
        </g>

        {/* ============================================================
            3. Scenario Animation: Animated Origami Paper Airplane
            ============================================================ */}
        <motion.g
          id="origami-plane"
          transform="translate(290, 80) rotate(-12)"
          animate={shouldReduceMotion ? {} : { y: [0, -8, 0], x: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#cnt-shadow)"
        >
          <polygon points="0,20 44,0 26,30" fill="url(#plane-grad)" />
          <polygon points="26,30 44,0 14,24" fill="#ba3c1e" />
          <polygon points="14,24 26,30 22,36" fill="#524646" />
          <path d="M -12 24 C -2 24, 0 20, 0 20" stroke="#EC5B38" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        </motion.g>

        {/* ============================================================
            4. Scenario Badges & Chat Bubbles
            ============================================================ */}
        {/* Chat Bubble 1: "Let's build!" (Top Left) */}
        <motion.g
          id="chat-bubble-1"
          filter="url(#cnt-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="42" y="78" width="124" height="38" rx="10" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <circle cx="58" cy="97" r="6" fill="#FCF2E5" />
          <circle cx="58" cy="97" r="3" fill="#EC5B38" />
          <rect x="72" y="91" width="76" height="5" rx="2.5" fill="#524646" />
          <rect x="72" y="100" width="50" height="3" rx="1.5" fill="#A8A492" />
          <polygon points="70,116 80,116 65,124" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <line x1="70" y1="116" x2="80" y2="116" stroke="#ffffff" strokeWidth="2" />
        </motion.g>

        {/* Chat Bubble 2: "24h Response" (Top Right) */}
        <motion.g
          id="chat-bubble-2"
          filter="url(#cnt-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <rect x="360" y="105" width="128" height="38" rx="10" fill="#FCF2E5" stroke="#524646" strokeWidth="1.5" />
          <circle cx="376" cy="124" r="6" fill="#ffffff" />
          <circle cx="376" cy="124" r="3" fill="#524646" />
          <rect x="390" y="118" width="84" height="5" rx="2.5" fill="#524646" />
          <rect x="390" y="127" width="56" height="3" rx="1.5" fill="#EC5B38" />
          <polygon points="380,143 390,143 375,151" fill="#FCF2E5" stroke="#524646" strokeWidth="1.5" />
          <line x1="380" y1="143" x2="390" y2="143" stroke="#FCF2E5" strokeWidth="2" />
        </motion.g>

        {/* ============================================================
            5. Reference Avatar: Solutions Lead Character
               (Faithfully styled after Image 0 Reference Sheet!)
               - Anatomically balanced torso with natural broad shoulders
               - Crisp short-sleeve collared shirt with terracotta tie & belt
               - Solid, well-proportioned straight-leg trousers with clean pelvic fork
               - Retro lace-up sneakers with rubber outsole & laces
               - Right hand raised in elegant open 5-finger wave greeting
               - Left arm with hand resting naturally in pocket
            ============================================================ */}
        <g id="char-contact-avatar">
          {/* Ground contact shadow */}
          <ellipse cx="110" cy="346" rx="34" ry="6" fill="#524646" fillOpacity="0.14" />

          {/* Left Leg (Weight-bearing Leg in Espresso #524646 Trousers) */}
          <path
            d="M 94 242 C 93 255, 93 285, 94 305 C 95 318, 96 328, 97 332 L 107 332 C 107 328, 107 318, 108 305 C 108 285, 109 255, 109 250 Z"
            fill="#524646"
          />
          {/* Left Lace-up Sneaker (White rubber outsole, espresso upper, white laces) */}
          <g transform="translate(88, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Right Leg (Stepped Slightly Outward) */}
          <path
            d="M 111 250 C 111 255, 112 285, 112 305 C 113 318, 113 328, 114 332 L 124 332 C 124 328, 125 318, 126 305 C 126 285, 126 255, 126 242 Z"
            fill="#453b3b"
          />
          {/* Right Lace-up Sneaker */}
          <g transform="translate(108, 328)">
            <rect x="0" y="8" width="23" height="4" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
            <path d="M 4 8 C 4 3, 9 1, 14 1 C 18 1, 21 4, 21 8 Z" fill="#524646" />
            <path d="M 17 8 C 17 5, 19 3, 22 5 C 23 7, 23 8, 23 8 Z" fill="#ffffff" stroke="#A8A492" strokeWidth="0.6" />
            <line x1="8" y1="3.5" x2="14" y2="3.5" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="4" y="11" width="18" height="1.5" rx="0.75" fill="#EC5B38" />
          </g>

          {/* Pelvic Fork / Crotch Seam */}
          <path d="M 108 248 L 110 252 L 112 248" stroke="#3a3131" strokeWidth="1.2" strokeLinecap="round" />

          {/* Belt with Oval Buckle (Image 0 & Image 1) */}
          <rect x="91" y="238" width="37" height="5" rx="1.5" fill="#3a3131" />
          <ellipse cx="110" cy="240.5" rx="3.5" ry="2.5" fill="#FCF2E5" stroke="#EC5B38" strokeWidth="0.8" />

          {/* Torso in Short-Sleeve Collared Shirt (Broad natural shoulders!) */}
          <path
            d="M 87 194 C 94 190, 103 190, 110 190 C 117 190, 126 190, 133 194 C 137 202, 134 224, 128 238 C 122 240, 98 240, 92 238 C 86 224, 83 202, 87 194 Z"
            fill="url(#avatar-shirt-grad)"
            stroke="#A8A492"
            strokeWidth="1"
          />

          {/* Tie in Terracotta (#EC5B38) - Iconic from Image 0! */}
          <polygon points="107,196 113,196 114,232 110,238 106,232" fill="#EC5B38" />
          <polygon points="106,192 114,192 112,196 108,196" fill="#d24825" />

          {/* White Pointed Collar Tabs (Image 0) */}
          <polygon points="102,190 110,198 107,190" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />
          <polygon points="118,190 110,198 113,190" fill="#ffffff" stroke="#A8A492" strokeWidth="0.8" />

          {/* Neck */}
          <path d="M 105 178 L 115 178 L 115 192 L 105 192 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="98" cy="168" rx="3.5" ry="5.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />
          <ellipse cx="122" cy="168" rx="3.5" ry="5.5" fill="#FCF2E5" stroke="#524646" strokeWidth="1" />

          {/* Head / Face Oval */}
          <ellipse cx="110" cy="166" rx="12" ry="15" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />

          {/* Facial Features (Matching Image 0 Expression Sheet!) */}
          {/* Eyebrows */}
          <path d="M 102 160 C 104 158, 107 158, 108 160" stroke="#524646" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 112 160 C 113 158, 116 158, 118 160" stroke="#524646" strokeWidth="1.2" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="105" cy="164" r="1.8" fill="#524646" />
          <circle cx="115" cy="164" r="1.8" fill="#524646" />
          {/* Nose */}
          <path d="M 110 164 L 109 169 L 111 169" stroke="#524646" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          {/* Warm Friendly Smile */}
          <path d="M 106 173 Q 110 177 114 173" stroke="#EC5B38" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Modern Side-Parted Hairstyle with Bangs (Image 0) */}
          <path
            d="M 97 166 C 96 152, 103 144, 114 145 C 123 146, 126 153, 125 158 C 122 154, 119 155, 116 157 C 112 153, 107 153, 104 156 C 99 160, 98 163, 97 168 Z"
            fill="#524646"
          />

          {/* Left Arm: Hand Resting Casually in Trouser Pocket (Direct Pose from Image 0!) */}
          {/* Short Sleeve */}
          <path
            d="M 87 194 C 84 200, 80 206, 78 214 L 88 217 C 90 211, 92 202, 93 196 Z"
            fill="url(#avatar-shirt-grad)"
            stroke="#A8A492"
            strokeWidth="0.8"
          />
          <rect x="78" y="214" width="10" height="3" rx="1.5" fill="#A8A492" transform="rotate(15 78 214)" />
          {/* Forearm angled down to pocket */}
          <path d="M 82 217 C 82 217, 85 234, 88 242 L 95 240 C 93 232, 89 217, 89 217 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          {/* Hand cleanly entering pocket with thumb along seam */}
          <path d="M 88 240 C 87 244, 90 248, 94 246 C 95 244, 95 240, 93 239 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <path d="M 90 242 C 92 245, 93 245, 95 243" stroke="#524646" strokeWidth="0.7" strokeLinecap="round" />
          {/* Pocket Seam Line */}
          <line x1="91" y1="242" x2="96" y2="252" stroke="#3a3131" strokeWidth="1.2" strokeLinecap="round" />

          {/* Right Arm: Raised in Open 5-Finger Wave Greeting (Direct Pose from Image 0!) */}
          {/* Short Sleeve */}
          <path
            d="M 133 194 C 137 198, 142 204, 146 210 L 138 216 C 134 208, 130 202, 127 197 Z"
            fill="url(#avatar-shirt-grad)"
            stroke="#A8A492"
            strokeWidth="0.8"
          />
          <rect x="137" y="210" width="10" height="3" rx="1.5" fill="#A8A492" transform="rotate(-35 137 210)" />
          {/* Forearm raised upward in wave */}
          <path
            d="M 142 208 C 148 198, 154 186, 158 174 L 166 177 C 162 188, 155 202, 148 213 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />

          {/* Unified, Beautifully Articulated 5-Finger Waving Hand (Image 0 Hand Sheet!) */}
          <g id="waving-hand-5-fingers" transform="translate(156, 152)">
            {/* Palm & 4 fingers unified vector silhouette */}
            <path
              d="M 2 22 C 0 18, 1 12, 2 8 C 2.5 5, 4.5 4, 6 5 C 7 6, 7.5 8, 8 10 C 8.5 6, 10.5 4, 12 5 C 13.5 6, 13.5 8, 14 10 C 14.5 7, 16.5 5, 18 6 C 19.5 7, 19.5 9, 19.5 12 C 20 9, 21.5 8, 23 9 C 24.5 10, 24 13, 23 16 C 21 21, 17 24, 12 25 C 7 26, 3 25, 2 22 Z"
              fill="#FCF2E5"
              stroke="#524646"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            {/* Finger dividing creases */}
            <line x1="8" y1="10" x2="8.5" y2="17" stroke="#524646" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="14" y1="10" x2="14" y2="17" stroke="#524646" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="19.5" y1="12" x2="19" y2="18" stroke="#524646" strokeWidth="0.7" strokeLinecap="round" />
            {/* Articulated Thumb extending gracefully outward */}
            <path
              d="M 3 19 C -1 18, -4 14, -3 11 C -2 9, 1 10, 3 13 Z"
              fill="#FCF2E5"
              stroke="#524646"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* ============================================================
            6. Floating Calendar & Direct Consultation 24h SLA Badge
            ============================================================ */}
        <motion.g
          id="badge-calendar"
          filter="url(#cnt-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="390" y="225" width="94" height="34" rx="8" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <circle cx="406" cy="242" r="5" fill="#EC5B38" />
          <text x="418" y="246" fill="#524646" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
            24h SLA
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default ContactIllustration

import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { IllustrationProps } from './WebDevIllustration'

/**
 * AiMlIllustration
 * Scenario: Artificial Intelligence, Neural Network Architectures & LLM Tuning.
 * Features:
 * - Central holographic neural matrix display with transformer attention weights and glowing nodes.
 * - Realistic AI research engineer tuning neural hyperparameters with articulated hands.
 * - Floating friendly AI assistant orb with gentle hover animation.
 * - Pulsing neural synaptic weight nodes and LLM / Vector Embed badges.
 * Palette: #524646, #A8A492, #FCF2E5, #EC5B38, white.
 */
export const AiMlIllustration: React.FC<IllustrationProps> = ({
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
        aria-label="AI & Machine Learning - Neural Matrix, LLM Tuning and Intelligent Agent"
      >
        <defs>
          <filter id="ai-shadow" x="-8%" y="-8%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#524646" floodOpacity="0.1" />
          </filter>
          <linearGradient id="matrix-scr-grad" x1="130" y1="50" x2="410" y2="270" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#FCF2E5" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="chip-core-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="100%" stopColor="#524646" />
          </linearGradient>
          <linearGradient id="scientist-knit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EC5B38" />
            <stop offset="100%" stopColor="#c94423" />
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
            2. Central Neural Display Terminal & Base
            ============================================================ */}
        <g id="ai-display" filter="url(#ai-shadow)">
          {/* Bezel */}
          <rect x="130" y="55" width="280" height="215" rx="14" fill="#524646" />
          <rect x="138" y="63" width="264" height="191" rx="9" fill="url(#matrix-scr-grad)" />

          {/* Top Header */}
          <rect x="138" y="63" width="264" height="24" rx="9" fill="#FCF2E5" />
          <line x1="138" y1="87" x2="402" y2="87" stroke="#A8A492" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="152" cy="75" r="3.5" fill="#EC5B38" />
          <circle cx="162" cy="75" r="3.5" fill="#A8A492" />
          <circle cx="172" cy="75" r="3.5" fill="#524646" fillOpacity="0.4" />
          <rect x="185" y="70" width="80" height="10" rx="5" fill="#ffffff" />
          <text x="225" y="78" textAnchor="middle" fill="#524646" fontFamily="monospace" fontSize="7.5" fontWeight="bold">
            neural_weights.pt
          </text>

          {/* Neural Synaptic Connections (Circuit lines) */}
          {/* Layer 1 Input Nodes */}
          <circle cx="170" cy="115" r="5" fill="#EC5B38" />
          <circle cx="170" cy="145" r="5" fill="#EC5B38" />
          <circle cx="170" cy="175" r="5" fill="#EC5B38" />
          <circle cx="170" cy="205" r="5" fill="#EC5B38" />

          {/* Layer 2 Hidden Nodes */}
          <circle cx="230" cy="105" r="6" fill="#524646" />
          <circle cx="230" cy="135" r="6" fill="#524646" />
          <circle cx="230" cy="165" r="6" fill="#524646" />
          <circle cx="230" cy="195" r="6" fill="#524646" />
          <circle cx="230" cy="225" r="6" fill="#524646" />

          {/* Layer 3 Attention Nodes */}
          <circle cx="310" cy="105" r="6" fill="#524646" />
          <circle cx="310" cy="135" r="6" fill="#524646" />
          <circle cx="310" cy="165" r="6" fill="#524646" />
          <circle cx="310" cy="195" r="6" fill="#524646" />
          <circle cx="310" cy="225" r="6" fill="#524646" />

          {/* Layer 4 Output Inference Nodes */}
          <circle cx="370" cy="125" r="5" fill="#EC5B38" />
          <circle cx="370" cy="165" r="5" fill="#EC5B38" />
          <circle cx="370" cy="205" r="5" fill="#EC5B38" />

          {/* Synaptic Interconnect Lines */}
          <g stroke="#A8A492" strokeWidth="1" strokeOpacity="0.45">
            <line x1="170" y1="115" x2="230" y2="105" />
            <line x1="170" y1="115" x2="230" y2="135" />
            <line x1="170" y1="145" x2="230" y2="135" />
            <line x1="170" y1="145" x2="230" y2="165" />
            <line x1="170" y1="175" x2="230" y2="165" />
            <line x1="170" y1="175" x2="230" y2="195" />
            <line x1="170" y1="205" x2="230" y2="195" />
            <line x1="170" y1="205" x2="230" y2="225" />

            <line x1="230" y1="105" x2="310" y2="105" stroke="#EC5B38" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="230" y1="135" x2="310" y2="165" stroke="#EC5B38" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="230" y1="165" x2="310" y2="135" stroke="#EC5B38" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="230" y1="195" x2="310" y2="195" />
            <line x1="230" y1="225" x2="310" y2="225" />

            <line x1="310" y1="105" x2="370" y2="125" />
            <line x1="310" y1="135" x2="370" y2="125" />
            <line x1="310" y1="165" x2="370" y2="165" />
            <line x1="310" y1="195" x2="370" y2="205" />
            <line x1="310" y1="225" x2="370" y2="205" />
          </g>

          {/* Stand */}
          <path d="M 252 260 L 244 326 L 296 326 L 288 260 Z" fill="#A8A492" />
          <rect x="210" y="325" width="120" height="14" rx="7" fill="#524646" />
        </g>

        {/* Central Floating Neural AI Processor Chip */}
        <motion.g
          id="ai-chip"
          transform="translate(242, 172)"
          filter="url(#ai-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="0" y="0" width="56" height="56" rx="12" fill="url(#chip-core-grad)" stroke="#EC5B38" strokeWidth="2" />
          <line x1="14" y1="-5" x2="14" y2="0" stroke="#EC5B38" strokeWidth="2.5" />
          <line x1="28" y1="-5" x2="28" y2="0" stroke="#EC5B38" strokeWidth="2.5" />
          <line x1="42" y1="-5" x2="42" y2="0" stroke="#EC5B38" strokeWidth="2.5" />
          <line x1="14" y1="56" x2="14" y2="61" stroke="#EC5B38" strokeWidth="2.5" />
          <line x1="28" y1="56" x2="28" y2="61" stroke="#EC5B38" strokeWidth="2.5" />
          <line x1="42" y1="56" x2="42" y2="61" stroke="#EC5B38" strokeWidth="2.5" />
          <text x="28" y="35" textAnchor="middle" fill="#FCF2E5" fontFamily="monospace" fontSize="16" fontWeight="bold">
            AI
          </text>
        </motion.g>

        {/* ============================================================
            3. Scenario Animation: Floating Friendly AI Assistant Orb
            ============================================================ */}
        <motion.g
          id="ai-assistant-orb"
          transform="translate(420, 160)"
          filter="url(#ai-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -8, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#EC5B38" strokeWidth="2" />
          {/* Friendly Eyes */}
          <circle cx="15" cy="18" r="2.5" fill="#524646" />
          <circle cx="25" cy="18" r="2.5" fill="#524646" />
          <path d="M 17 23 Q 20 26 23 23" stroke="#EC5B38" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Little Antenna */}
          <line x1="20" y1="2" x2="20" y2="-4" stroke="#524646" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="-5" r="2.5" fill="#EC5B38" />
        </motion.g>

        {/* ============================================================
            4. Reference Avatar: AI Research Engineer / Data Scientist
               (Faithfully styled after Avatar 1 & Character Rig reference sheets!)
               - Broad natural shoulders in Terracotta mock-neck sweater with chest ring
               - Solid, well-proportioned legs with clean pelvic fork & retro lace-up sneakers
               - Articulated hands: left hand holding neural analytics tablet,
                 right hand gracefully calibrating synaptic neural node
               - Spiky textured modern hair & white designer glasses
            ============================================================ */}
        <g id="char-scientist">
          {/* Ground shadow under scientist */}
          <ellipse cx="80" cy="346" rx="34" ry="6" fill="#524646" fillOpacity="0.14" />

          {/* Left Leg (Weight-bearing Leg in Espresso #524646 Trousers) */}
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

          {/* Right Leg (Forward Stance) */}
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

          {/* Torso in Smart Terracotta Mock-Neck Sweater / Cardigan (Broad natural shoulders!) */}
          <path
            d="M 57 194 C 64 190, 73 190, 80 190 C 87 190, 96 190, 103 194 C 107 202, 104 224, 98 238 C 92 240, 68 240, 62 238 C 56 224, 53 202, 57 194 Z"
            fill="url(#scientist-knit)"
          />
          {/* Circular Chest Ring Graphic (Avatar 1 reference!) */}
          <circle cx="80" cy="214" r="6" fill="none" stroke="#FCF2E5" strokeWidth="2" />
          <circle cx="80" cy="214" r="2.5" fill="#524646" />

          {/* Inner Collared Shirt Accent */}
          <path d="M 76 190 L 80 197 L 84 190" stroke="#FCF2E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Neck */}
          <path d="M 75 178 L 85 178 L 85 190 L 75 190 Z" fill="#FCF2E5" />

          {/* Ears */}
          <ellipse cx="68" cy="168" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          <ellipse cx="92" cy="168" rx="2.5" ry="4.5" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />

          {/* Head */}
          <ellipse cx="80" cy="166" rx="12" ry="15" fill="#FCF2E5" stroke="#524646" strokeWidth="1.2" />

          {/* Iconic White Designer Glasses (Avatar 1 signature from reference!) */}
          <rect x="70" y="161" width="9" height="7" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
          <rect x="71.5" y="162.5" width="6" height="4" rx="1" fill="#524646" />
          <line x1="72.5" y1="164" x2="76.5" y2="164" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.8" />

          <rect x="81" y="161" width="9" height="7" rx="2" fill="#ffffff" stroke="#524646" strokeWidth="0.8" />
          <rect x="82.5" y="162.5" width="6" height="4" rx="1" fill="#524646" />
          <line x1="83.5" y1="164" x2="87.5" y2="164" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="0.8" />

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

          {/* Left Arm: Holding Neural Analytics Tablet */}
          <path
            d="M 57 194 C 52 202, 48 214, 50 224 L 58 226 C 58 218, 62 204, 65 197 Z"
            fill="#EC5B38"
          />
          {/* Forearm */}
          <path d="M 50 224 C 54 232, 60 236, 68 234 L 70 228 C 64 228, 58 224, 56 220 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
          {/* Neural Tablet */}
          <rect x="64" y="220" width="22" height="28" rx="3.5" fill="#524646" />
          <rect x="66" y="223" width="18" height="22" rx="1.5" fill="#FCF2E5" />
          {/* Animated Loss Curve on tablet */}
          <path d="M 68 238 Q 74 233 82 227" stroke="#EC5B38" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Articulated fingers supporting the tablet */}
          <g transform="translate(62, 226)">
            <path d="M 2 4 C 1 2, 3 0, 5 1 C 6 2, 7 5, 5 8 L 2 7 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
          </g>

          {/* Right Arm: Articulated reaching forward to tune synaptic nodes */}
          <path
            d="M 103 194 C 108 200, 114 208, 116 216 L 108 220 C 106 212, 102 204, 98 198 Z"
            fill="#EC5B38"
          />
          {/* Forearm extending toward neural matrix */}
          <path
            d="M 112 216 C 124 208, 138 198, 148 188 L 152 192 C 142 202, 128 212, 116 220 Z"
            fill="#FCF2E5"
            stroke="#524646"
            strokeWidth="0.8"
          />
          {/* Articulated Hand with index finger & thumb calibrating neural synapse */}
          <g transform="translate(148, 182)">
            {/* Extended Index Finger touching synaptic node */}
            <path d="M 2 5 C 6 3, 11 1, 15 0 C 16 0.5, 16 1.5, 14 2.5 C 10 3.5, 6 5, 3 6.5 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.8" />
            {/* Palm & Thumb */}
            <path d="M 0 5 C 2 3, 4 3, 5 4.5 C 6 6, 5 8, 3 9 Z" fill="#FCF2E5" stroke="#524646" strokeWidth="0.7" />
            <path d="M 2 6 C 4 6, 6 7, 7 8" stroke="#524646" strokeWidth="0.6" fill="none" />
          </g>
        </g>

        {/* ============================================================
            5. Floating Scenario Badges (LLM Core, RAG/Embed)
            ============================================================ */}
        <motion.g
          id="badge-llm"
          filter="url(#ai-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="52" y="105" width="84" height="34" rx="8" fill="#ffffff" stroke="#EC5B38" strokeWidth="1.5" />
          <circle cx="68" cy="122" r="5" fill="#EC5B38" />
          <text x="80" y="126" fill="#524646" fontFamily="sans-serif" fontSize="11" fontWeight="bold">
            LLM Core
          </text>
        </motion.g>

        <motion.g
          id="badge-rag"
          filter="url(#ai-shadow)"
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <rect x="400" y="95" width="88" height="34" rx="8" fill="#ffffff" stroke="#524646" strokeWidth="1.5" />
          <circle cx="416" cy="112" r="4" fill="#EC5B38" />
          <text x="427" y="116" fill="#524646" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold">
            RAG Vector
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

export default AiMlIllustration

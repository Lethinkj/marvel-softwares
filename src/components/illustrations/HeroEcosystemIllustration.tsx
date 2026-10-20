import React from 'react'

export interface HeroEcosystemIllustrationProps {
  className?: string
}

export const HeroEcosystemIllustration: React.FC<HeroEcosystemIllustrationProps> = ({
  className = 'w-full h-auto',
}) => {
  return (
    <div className={`relative w-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 580"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Marvel Softwares Intelligent Software Ecosystem - Web, Mobile, Cloud and AI Architecture"
      >
        <defs>
          {/* Keyframe Animations */}
          <style>{`
            @keyframes heroFloatA {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(0.4deg); }
            }
            @keyframes heroFloatB {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-13px) rotate(-0.6deg); }
            }
            @keyframes heroFloatC {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            @keyframes heroPulseGlow {
              0%, 100% { opacity: 0.55; transform: scale(1); }
              50% { opacity: 0.95; transform: scale(1.08); }
            }
            @keyframes heroDashFlow {
              from { stroke-dashoffset: 48; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes heroRingSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes heroBlink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
            @keyframes heroRadarPing {
              0% { r: 6; opacity: 0.8; }
              100% { r: 28; opacity: 0; }
            }

            .hero-anim-float-a {
              animation: heroFloatA 7s ease-in-out infinite;
              transform-origin: center;
            }
            .hero-anim-float-b {
              animation: heroFloatB 8.5s ease-in-out infinite;
              animation-delay: -3s;
              transform-origin: center;
            }
            .hero-anim-float-c {
              animation: heroFloatC 6s ease-in-out infinite;
              animation-delay: -1.5s;
              transform-origin: center;
            }
            .hero-anim-pulse {
              animation: heroPulseGlow 3.6s ease-in-out infinite;
              transform-box: fill-box;
              transform-origin: center;
            }
            .hero-anim-dash {
              stroke-dasharray: 6 8;
              animation: heroDashFlow 2.8s linear infinite;
            }
            .hero-anim-dash-reverse {
              stroke-dasharray: 6 8;
              animation: heroDashFlow 3.2s linear infinite reverse;
            }
            .hero-anim-spin {
              animation: heroRingSpin 26s linear infinite;
              transform-box: fill-box;
              transform-origin: center;
            }
            .hero-anim-blink {
              animation: heroBlink 2.2s ease-in-out infinite;
            }
            .hero-anim-radar {
              animation: heroRadarPing 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
              transform-origin: center;
            }

            @media (prefers-reduced-motion: reduce) {
              .hero-anim-float-a,
              .hero-anim-float-b,
              .hero-anim-float-c,
              .hero-anim-pulse,
              .hero-anim-dash,
              .hero-anim-dash-reverse,
              .hero-anim-spin,
              .hero-anim-blink,
              .hero-anim-radar {
                animation: none !important;
              }
            }
          `}</style>

          {/* Core Gradients */}
          <linearGradient id="darkHeroBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0057E7" />
            <stop offset="100%" stopColor="#00A3FF" />
          </linearGradient>

          <linearGradient id="darkHeroCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#0057E7" />
          </linearGradient>

          <linearGradient id="darkHeroOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8A00" />
            <stop offset="100%" stopColor="#FF4500" />
          </linearGradient>

          {/* Dark Glass Surfaces (blends into #050D1E / #071733 hero background) */}
          <linearGradient id="darkWindowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E1E3D" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#08142B" stopOpacity="0.94" />
          </linearGradient>

          <linearGradient id="darkWindowHeader" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14264A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0F1F3E" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="darkCardSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#13274E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0A1833" stopOpacity="0.92" />
          </linearGradient>

          <linearGradient id="darkChartFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00CFFF" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#0057E7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0057E7" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="darkChartStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00CFFF" />
            <stop offset="60%" stopColor="#2E82FF" />
            <stop offset="100%" stopColor="#FF6B00" />
          </linearGradient>

          {/* Ambient Seamless Radial Glows */}
          <radialGradient id="darkHeroAmbientMain" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#0057E7" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#00CFFF" stopOpacity="0.14" />
            <stop offset="75%" stopColor="#0057E7" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#050D1E" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="darkHeroAmbientCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.38" />
            <stop offset="50%" stopColor="#00CFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="darkHeroAmbientOrange" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.34" />
            <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Drop Shadows & Glow Filters */}
          <filter id="darkWindowShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="24" stdDeviation="30" floodColor="#000000" floodOpacity="0.65" />
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0057E7" floodOpacity="0.25" />
          </filter>

          <filter id="darkFloatingShadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="18" stdDeviation="20" floodColor="#000000" floodOpacity="0.75" />
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#00CFFF" floodOpacity="0.22" />
          </filter>

          <filter id="darkPillShadow" x="-20%" y="-30%" width="140%" height="170%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.6" />
          </filter>

          <filter id="darkCoreBloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ==============================================================
            1. AMBIENT BACKGROUND GLOWS (Fades smoothly into hero page)
            ============================================================== */}
        <g id="hero-ambient-layer" aria-hidden="true">
          {/* Main Central Glow */}
          <circle cx="420" cy="280" r="300" fill="url(#darkHeroAmbientMain)" />
          {/* Top Right Cyan Glow */}
          <circle cx="660" cy="130" r="170" fill="url(#darkHeroAmbientCyan)" className="hero-anim-pulse" />
          {/* Bottom Left Orange Warm Glow */}
          <circle cx="150" cy="430" r="160" fill="url(#darkHeroAmbientOrange)" className="hero-anim-pulse" style={{ animationDelay: '-1.8s' }} />

          {/* Perspective grid floor lines (fading into the page) */}
          <g stroke="#00CFFF" strokeOpacity="0.12" strokeWidth="1.2">
            <line x1="60" y1="540" x2="740" y2="540" />
            <line x1="110" y1="500" x2="690" y2="500" strokeOpacity="0.08" />
            <line x1="160" y1="470" x2="640" y2="470" strokeOpacity="0.05" />
            {/* Perspective ray lines */}
            <line x1="160" y1="555" x2="300" y2="460" />
            <line x1="320" y1="555" x2="380" y2="460" />
            <line x1="460" y1="555" x2="430" y2="460" />
            <line x1="620" y1="555" x2="510" y2="460" />
          </g>

          {/* Constellation Nodes & Micro Crosses */}
          <g fill="#00CFFF" opacity="0.45">
            <circle cx="85" cy="190" r="3" />
            <circle cx="195" cy="80" r="2.5" />
            <circle cx="710" cy="240" r="3" />
            <circle cx="740" cy="410" r="2.5" />
          </g>
          <g stroke="#FF7A00" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
            <line x1="700" y1="75" x2="710" y2="75" />
            <line x1="705" y1="70" x2="705" y2="80" />
            <line x1="110" y1="130" x2="118" y2="130" />
            <line x1="114" y1="126" x2="114" y2="134" />
          </g>
        </g>

        {/* ==============================================================
            2. ANIMATED CONNECTING DATA PIPELINES (Glowing streams)
            ============================================================== */}
        <g id="hero-pipelines" aria-hidden="true" strokeLinecap="round">
          {/* Path: Cloud AI Hub -> Main Platform */}
          <path
            d="M 630 160 C 585 160, 530 180, 485 200"
            stroke="#00CFFF"
            strokeOpacity="0.2"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 630 160 C 585 160, 530 180, 485 200"
            stroke="url(#darkHeroCyanGrad)"
            strokeWidth="2.5"
            fill="none"
            className="hero-anim-dash"
          />

          {/* Path: Main Platform -> Mobile Device */}
          <path
            d="M 280 295 C 235 315, 195 340, 180 375"
            stroke="#0057E7"
            strokeOpacity="0.25"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 280 295 C 235 315, 195 340, 180 375"
            stroke="url(#darkHeroBlueGrad)"
            strokeWidth="2.5"
            fill="none"
            className="hero-anim-dash-reverse"
          />

          {/* Path: Main Platform -> Microservices Core */}
          <path
            d="M 450 385 C 480 415, 520 440, 580 445"
            stroke="#FF7A00"
            strokeOpacity="0.25"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 450 385 C 480 415, 520 440, 580 445"
            stroke="url(#darkHeroOrangeGrad)"
            strokeWidth="2.5"
            fill="none"
            className="hero-anim-dash"
          />
        </g>

        {/* ==============================================================
            3. CENTRAL HERO COMPONENT: MAIN DESKTOP / ENTERPRISE PLATFORM
            ============================================================== */}
        <g id="hero-main-dashboard" className="hero-anim-float-a">
          <g filter="url(#darkWindowShadow)">
            {/* Window Glass Body with sleek neon rim */}
            <rect
              x="210"
              y="90"
              width="430"
              height="305"
              rx="22"
              fill="url(#darkWindowGlass)"
              stroke="rgba(0, 207, 255, 0.35)"
              strokeWidth="1.8"
            />
            {/* Subtle inner highlight */}
            <rect
              x="211"
              y="91"
              width="428"
              height="303"
              rx="21"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />

            {/* Window Header */}
            <path
              d="M 210 112 C 210 99, 221 90, 232 90 L 618 90 C 629 90, 640 99, 640 112 L 640 138 L 210 138 Z"
              fill="url(#darkWindowHeader)"
            />
            <line x1="210" y1="138" x2="640" y2="138" stroke="rgba(0, 207, 255, 0.15)" strokeWidth="1" />

            {/* Window Dots */}
            <circle cx="236" cy="114" r="4.5" fill="#FF5F56" />
            <circle cx="251" cy="114" r="4.5" fill="#FFBD2E" />
            <circle cx="266" cy="114" r="4.5" fill="#27C93F" />

            {/* URL / Omnibar pill */}
            <rect x="296" y="104" width="195" height="20" rx="10" fill="#0A162C" stroke="rgba(0, 207, 255, 0.2)" strokeWidth="1" />
            <circle cx="310" cy="114" r="3.5" fill="none" stroke="#5D7A9E" strokeWidth="1.2" />
            <line x1="313" y1="117" x2="317" y2="121" stroke="#5D7A9E" strokeWidth="1.2" strokeLinecap="round" />
            <text x="325" y="118" fill="#88A3C7" fontSize="8.5" fontFamily="monospace">
              marvel-softwares.internal/hub
            </text>

            {/* User Avatar & Ping Status */}
            <circle cx="614" cy="114" r="8" fill="url(#darkHeroBlueGrad)" />
            <circle cx="614" cy="112" r="3" fill="#FFFFFF" />
            <circle cx="586" cy="114" r="4" fill="#00E5FF" className="hero-anim-blink" />

            {/* Left Mini Sidebar */}
            <rect x="210" y="139" width="62" height="255" fill="#081429" fillOpacity="0.85" />
            <line x1="272" y1="139" x2="272" y2="394" stroke="rgba(0, 207, 255, 0.12)" strokeWidth="1" />
            {/* Active Nav Item */}
            <rect x="222" y="156" width="38" height="34" rx="10" fill="url(#darkHeroBlueGrad)" />
            <rect x="234" y="167" width="14" height="12" rx="3" fill="#FFFFFF" />
            <circle cx="241" cy="210" r="5" fill="#243C63" />
            <circle cx="241" cy="238" r="5" fill="#243C63" />
            <circle cx="241" cy="266" r="5" fill="#243C63" />
            <rect x="231" y="352" width="20" height="4" rx="2" fill="#243C63" />

            {/* Dashboard Title & Real-Time Pill */}
            <text x="288" y="166" fill="#FFFFFF" fontSize="13.5" fontWeight="700" fontFamily="Inter, sans-serif">
              Enterprise Ecosystem
            </text>
            <rect x="288" y="174" width="76" height="3" rx="1.5" fill="#3D5A85" />

            {/* Live Operational Status Badge */}
            <rect x="536" y="153" width="86" height="20" rx="10" fill="rgba(16, 185, 129, 0.14)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
            <circle cx="548" cy="163" r="3.5" fill="#10B981" />
            <text x="556" y="167" fill="#34D399" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">
              ● Live 99.99%
            </text>

            {/* KPI Cards inside Dashboard */}
            {/* Stat Card 1: Processing Throughput */}
            <g>
              <rect x="288" y="188" width="158" height="54" rx="12" fill="url(#darkCardSurface)" stroke="rgba(0, 207, 255, 0.22)" strokeWidth="1" />
              <text x="302" y="206" fill="#7E9BBF" fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif">
                SYSTEM THROUGHPUT
              </text>
              <text x="302" y="230" fill="#00E5FF" fontSize="19" fontWeight="800" fontFamily="Inter, sans-serif">
                18.4k <tspan fontSize="11" fill="#7E9BBF" fontWeight="500">req/s</tspan>
              </text>
              <path d="M 412 226 L 420 216 L 428 221 L 438 208" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 434 208 L 438 208 L 438 212" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Stat Card 2: Business Automation ROI */}
            <g>
              <rect x="456" y="188" width="166" height="54" rx="12" fill="url(#darkCardSurface)" stroke="rgba(255, 107, 0, 0.25)" strokeWidth="1" />
              <text x="470" y="206" fill="#7E9BBF" fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif">
                BUSINESS EFFICIENCY
              </text>
              <text x="470" y="230" fill="#FF8A00" fontSize="19" fontWeight="800" fontFamily="Inter, sans-serif">
                +48.6%
              </text>
              <circle cx="598" cy="220" r="11" fill="rgba(255, 107, 0, 0.16)" />
              <path d="M 595 220 L 601 220 M 598 217 L 598 223" stroke="#FF8A00" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Glowing Analytics Area Chart */}
            <g transform="translate(288, 256)">
              <rect x="0" y="0" width="334" height="124" rx="14" fill="#091730" stroke="rgba(0, 207, 255, 0.2)" strokeWidth="1" />

              {/* Chart Grid Lines */}
              <line x1="16" y1="30" x2="318" y2="30" stroke="#142849" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="16" y1="62" x2="318" y2="62" stroke="#142849" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="16" y1="94" x2="318" y2="94" stroke="#142849" strokeWidth="1" strokeDasharray="3 3" />

              {/* Area Gradient Fill */}
              <path
                d="M 20 96 Q 64 78, 105 70 T 185 52 T 260 28 L 314 20 L 314 108 L 20 108 Z"
                fill="url(#darkChartFill)"
              />

              {/* Glowing Line */}
              <path
                d="M 20 96 Q 64 78, 105 70 T 185 52 T 260 28 L 314 20"
                fill="none"
                stroke="url(#darkChartStroke)"
                strokeWidth="3.4"
                strokeLinecap="round"
              />

              {/* Data Node Points */}
              <circle cx="105" cy="70" r="4" fill="#00E5FF" stroke="#091730" strokeWidth="2" />
              <circle cx="185" cy="52" r="4" fill="#2E82FF" stroke="#091730" strokeWidth="2" />
              <circle cx="260" cy="28" r="5" fill="#FF8A00" stroke="#091730" strokeWidth="2" className="hero-anim-pulse" />
              <circle cx="314" cy="20" r="5.5" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="2" />

              {/* Floating Metric Marker */}
              <rect x="238" y="2" width="68" height="20" rx="6" fill="#0057E7" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="272" y="15" fill="#FFFFFF" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">
                🚀 Scaled
              </text>
            </g>
          </g>
        </g>

        {/* ==============================================================
            4. FLOATING MOBILE APP DEVICE (Left Side, Modern Bezel)
            ============================================================== */}
        <g id="hero-mobile-device" className="hero-anim-float-b">
          <g filter="url(#darkFloatingShadow)">
            {/* Phone Outer Chassis */}
            <rect
              x="70"
              y="240"
              width="160"
              height="295"
              rx="30"
              fill="#060F22"
              stroke="rgba(0, 207, 255, 0.4)"
              strokeWidth="2.5"
            />
            {/* Phone Screen Glass */}
            <rect
              x="77"
              y="247"
              width="146"
              height="281"
              rx="24"
              fill="#0A1835"
            />

            {/* Dynamic Island / Top Notch */}
            <rect x="124" y="254" width="52" height="10" rx="5" fill="#040A17" />
            <circle cx="166" cy="259" r="2.2" fill="#00E5FF" />

            {/* Mobile Header Bar */}
            <rect x="92" y="276" width="38" height="6" rx="3" fill="#00CFFF" />
            <circle cx="206" cy="279" r="6" fill="#152B52" />

            {/* Mobile Hero Banner */}
            <rect x="90" y="294" width="120" height="76" rx="14" fill="url(#darkHeroBlueGrad)" />
            <text x="102" y="316" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="Inter, sans-serif">
              Marvel Portal
            </text>
            <text x="102" y="331" fill="rgba(255,255,255,0.8)" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif">
              Real-Time Sync
            </text>
            <rect x="102" y="341" width="66" height="17" rx="8.5" fill="#FFFFFF" />
            <text x="135" y="353" fill="#0057E7" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="Inter, sans-serif">
              Connected
            </text>

            {/* Mobile Feed Cards */}
            <g transform="translate(90, 382)">
              {/* Card 1: Auth & API */}
              <rect x="0" y="0" width="120" height="36" rx="10" fill="#0F244C" stroke="rgba(0, 207, 255, 0.25)" strokeWidth="1" />
              <rect x="8" y="9" width="18" height="18" rx="6" fill="rgba(0, 87, 231, 0.4)" />
              <path d="M 17 15 L 17 21 M 14 18 L 20 18" stroke="#00E5FF" strokeWidth="1.6" strokeLinecap="round" />
              <rect x="32" y="11" width="56" height="4" rx="2" fill="#FFFFFF" />
              <rect x="32" y="20" width="40" height="3" rx="1.5" fill="#5E7EAA" />
              <circle cx="107" cy="18" r="3.5" fill="#10B981" />

              {/* Card 2: Cloud Workflow */}
              <rect x="0" y="44" width="120" height="36" rx="10" fill="#0F244C" stroke="rgba(255, 107, 0, 0.25)" strokeWidth="1" />
              <rect x="8" y="53" width="18" height="18" rx="6" fill="rgba(255, 107, 0, 0.2)" />
              <circle cx="17" cy="62" r="4.5" fill="none" stroke="#FF8A00" strokeWidth="1.6" />
              <rect x="32" y="55" width="62" height="4" rx="2" fill="#FFFFFF" />
              <rect x="32" y="64" width="44" height="3" rx="1.5" fill="#5E7EAA" />
              <circle cx="107" cy="62" r="3.5" fill="#FF8A00" />

              {/* Mini Bottom Line */}
              <rect x="0" y="88" width="120" height="16" rx="6" fill="#091A38" />
              <rect x="8" y="94" width="44" height="4" rx="2" fill="#4B6A96" />
            </g>

            {/* Phone Bottom Home Bar */}
            <rect x="128" y="514" width="44" height="4" rx="2" fill="#3D5A85" />
          </g>
        </g>

        {/* ==============================================================
            5. CLOUD & AI NEURAL ENGINE CORE (Top Right Hub)
            ============================================================== */}
        <g id="hero-cloud-core" className="hero-anim-float-c" transform="translate(620, 115)">
          <g filter="url(#darkFloatingShadow)">
            {/* Outer Rotating Glowing Ring */}
            <circle
              cx="45"
              cy="45"
              r="66"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2"
              strokeDasharray="4 12"
              className="hero-anim-spin"
            />
            {/* Secondary Concentric Ring */}
            <circle
              cx="45"
              cy="45"
              r="50"
              fill="none"
              stroke="#0057E7"
              strokeOpacity="0.45"
              strokeWidth="2"
            />

            {/* Glowing Core Orb with Bloom */}
            <circle cx="45" cy="45" r="38" fill="url(#darkHeroBlueGrad)" filter="url(#darkCoreBloom)" />
            <circle cx="45" cy="45" r="38" fill="url(#darkHeroBlueGrad)" stroke="#00E5FF" strokeWidth="2.5" />

            {/* AI Chip / Neural Processor Icon */}
            <g transform="translate(29, 29)" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="7" y="7" width="18" height="18" rx="4" fill="#00E5FF" fillOpacity="0.35" />
              <line x1="11" y1="2" x2="11" y2="7" />
              <line x1="16" y1="2" x2="16" y2="7" />
              <line x1="21" y1="2" x2="21" y2="7" />

              <line x1="11" y1="25" x2="11" y2="30" />
              <line x1="16" y1="25" x2="16" y2="30" />
              <line x1="21" y1="25" x2="21" y2="30" />

              <line x1="2" y1="11" x2="7" y2="11" />
              <line x1="2" y1="16" x2="7" y2="16" />
              <line x1="2" y1="21" x2="7" y2="21" />

              <line x1="25" y1="11" x2="30" y2="11" />
              <line x1="25" y1="16" x2="30" y2="16" />
              <line x1="25" y1="21" x2="30" y2="21" />

              <circle cx="16" cy="16" r="3.2" fill="#FFFFFF" />
            </g>

            {/* Satellite Particle Orbit Nodes */}
            <circle cx="45" cy="-21" r="5" fill="#FF8A00" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="111" cy="45" r="4.5" fill="#00E5FF" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="-5" cy="74" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        </g>

        {/* ==============================================================
            6. FLOATING LIVE CODE CARD (Bottom Right)
            ============================================================== */}
        <g id="hero-code-card" className="hero-anim-float-a" transform="translate(490, 400)">
          <g filter="url(#darkPillShadow)">
            <rect
              x="0"
              y="0"
              width="240"
              height="120"
              rx="18"
              fill="#061226"
              stroke="rgba(0, 207, 255, 0.35)"
              strokeWidth="1.5"
            />
            {/* Top Bar */}
            <circle cx="18" cy="18" r="3.5" fill="#FF5F56" />
            <circle cx="31" cy="18" r="3.5" fill="#FFBD2E" />
            <circle cx="44" cy="18" r="3.5" fill="#27C93F" />
            <text x="68" y="22" fill="#7593B8" fontSize="9.5" fontFamily="monospace">
              deploy.config.ts
            </text>
            <line x1="0" y1="32" x2="240" y2="32" stroke="#102547" strokeWidth="1" />

            {/* Code Lines with Syntax Colors */}
            <g fontFamily="Consolas, Monaco, monospace" fontSize="10">
              <text x="16" y="52" fill="#00E5FF">
                const <tspan fill="#FF9A4D">marvelApp</tspan> = <tspan fill="#FFFFFF">createApp</tspan>({'{'}
              </text>
              <text x="28" y="70" fill="#88A5CC">
                scalable: <tspan fill="#10B981">true</tspan>,
              </text>
              <text x="28" y="87" fill="#88A5CC">
                cloudReady: <tspan fill="#FFBD2E">&quot;enterprise&quot;</tspan>
              </text>
              <text x="16" y="105" fill="#00E5FF">
                {'}'}); <tspan fill="#10B981" className="hero-anim-blink">● Deployed</tspan>
              </text>
            </g>
          </g>
        </g>

        {/* ==============================================================
            7. FLOATING TECH PILLS & BADGES
            ============================================================== */}
        {/* Pill 1: Web & Mobile (Top Left) */}
        <g id="hero-badge-1" className="hero-anim-float-c" transform="translate(130, 80)">
          <g filter="url(#darkPillShadow)">
            <rect
              x="0"
              y="0"
              width="160"
              height="42"
              rx="21"
              fill="#0A1C3C"
              stroke="rgba(0, 207, 255, 0.4)"
              strokeWidth="1.4"
            />
            <circle cx="21" cy="21" r="13" fill="url(#darkHeroBlueGrad)" />
            <path
              d="M 17 18 L 14 21 L 17 24 M 25 18 L 28 21 L 25 24"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="44" y="25" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
              Web &amp; Mobile Apps
            </text>
          </g>
        </g>

        {/* Pill 2: ERP & Automation (Center Bottom) */}
        <g id="hero-badge-2" className="hero-anim-float-b" transform="translate(240, 435)">
          <g filter="url(#darkPillShadow)">
            <rect
              x="0"
              y="0"
              width="178"
              height="44"
              rx="22"
              fill="#0A1C3C"
              stroke="rgba(255, 107, 0, 0.4)"
              strokeWidth="1.4"
            />
            <circle cx="22" cy="22" r="14" fill="rgba(255, 107, 0, 0.2)" />
            <circle cx="22" cy="22" r="5" stroke="#FF8A00" strokeWidth="2" fill="none" />
            <path
              d="M 22 14 L 22 16 M 22 28 L 22 30 M 14 22 L 16 22 M 28 22 L 30 22"
              stroke="#FF8A00"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text x="46" y="26" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
              ERP &amp; Automation
            </text>
            <circle cx="160" cy="22" r="3.5" fill="#10B981" />
          </g>
        </g>

        {/* Pill 3: AI Solutions (Top Center / Right) */}
        <g id="hero-badge-3" className="hero-anim-float-a" transform="translate(440, 50)">
          <g filter="url(#darkPillShadow)">
            <rect
              x="0"
              y="0"
              width="145"
              height="40"
              rx="20"
              fill="#0A1C3C"
              stroke="rgba(0, 229, 255, 0.4)"
              strokeWidth="1.4"
            />
            <circle cx="20" cy="20" r="12" fill="rgba(0, 229, 255, 0.2)" />
            <path
              d="M 20 13 L 21.5 17.5 L 26 19 L 21.5 20.5 L 20 25 L 18.5 20.5 L 14 19 L 18.5 17.5 Z"
              fill="#00E5FF"
            />
            <text x="42" y="24" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
              AI Solutions
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default HeroEcosystemIllustration

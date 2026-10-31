import React from 'react'
import AnimatedSection from './AnimatedSection'
import { SpotlightCard } from './SpotlightCard'
import { teamMembers, siteConfig } from '../data/siteData'
import { LinkedInIcon, GitHubIcon, TwitterIcon, MailIcon } from './Icons'

interface MemberMetadata {
  initials: string
  avatarBg: string
  avatarBorder: string
  avatarRing: string
  avatarText: string
  spotlightColor: string
  socials: {
    linkedin: string
    github?: string
    twitter?: string
    email: string
  }
}

const memberMetadataMap: Record<string, MemberMetadata> = {
  'Alex Chen': {
    initials: 'AC',
    avatarBg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-50',
    avatarBorder: 'border-blue-200/90',
    avatarRing: 'ring-blue-100/70',
    avatarText: 'text-[#0047BA]',
    spotlightColor: '#0057E7',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  },
  'Sarah Mitchell': {
    initials: 'SM',
    avatarBg: 'bg-gradient-to-br from-indigo-100 via-violet-50 to-indigo-50',
    avatarBorder: 'border-indigo-200/90',
    avatarRing: 'ring-indigo-100/70',
    avatarText: 'text-[#4338CA]',
    spotlightColor: '#4F46E5',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  },
  'Marcus Johnson': {
    initials: 'MJ',
    avatarBg: 'bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-50',
    avatarBorder: 'border-sky-200/90',
    avatarRing: 'ring-sky-100/70',
    avatarText: 'text-[#0284C7]',
    spotlightColor: '#0284C7',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  },
  'Elena Rodriguez': {
    initials: 'ER',
    avatarBg: 'bg-gradient-to-br from-blue-100 via-indigo-50 to-sky-50',
    avatarBorder: 'border-blue-200/90',
    avatarRing: 'ring-blue-100/70',
    avatarText: 'text-[#1D4ED8]',
    spotlightColor: '#2563EB',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  },
}

const getMemberMeta = (name: string): MemberMetadata => {
  if (memberMetadataMap[name]) return memberMetadataMap[name]
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  return {
    initials,
    avatarBg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50',
    avatarBorder: 'border-blue-200/90',
    avatarRing: 'ring-blue-100/70',
    avatarText: 'text-[#0057E7]',
    spotlightColor: '#0057E7',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  }
}

export const OurTeam: React.FC = () => {
  return (
    <div className="container">
      {/* Section Header */}
      <AnimatedSection style={{ maxWidth: 720 }} className="text-center mx-auto">
        <h2 id="team-heading" className="text-section-title">
          Our Team
        </h2>
        <p className="section-subtitle">
          A dedicated group of experienced engineers, designers, and system architects passionate about building reliable software.
        </p>
      </AnimatedSection>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" style={{ marginTop: 44 }}>
        {teamMembers.map((member, i) => {
          const meta = getMemberMeta(member.name)

          return (
            <AnimatedSection key={member.name} delay={i * 0.08} className="h-full">
              <SpotlightCard
                theme="light"
                spotlightColor={meta.spotlightColor}
                spotlightSize={320}
                intensity={0.25}
                borderGlow={0.8}
                className="group rounded-[24px] p-6 sm:p-7 flex flex-col justify-between h-full bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="flex flex-col flex-1">
                  {/* Top: Avatar */}
                  <div>
                    <div
                      className={`w-16 h-16 rounded-full ${meta.avatarBg} border ${meta.avatarBorder} ring-4 ${meta.avatarRing} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 select-none`}
                      role="img"
                      aria-label={`${member.name} avatar`}
                    >
                      <span className={`text-xl font-bold tracking-wider ${meta.avatarText}`}>
                        {meta.initials}
                      </span>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="mt-5">
                    <h3 className="text-card-title group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-semibold mt-1">
                      {member.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-body text-sm leading-relaxed mt-3 flex-1">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-100">
                    {member.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200/80 tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action: Social Icons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2.5">
                  <a
                    href={meta.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#0057E7] border border-slate-200/80 hover:border-blue-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs hover:scale-105"
                    aria-label={`${member.name} on LinkedIn`}
                    title="LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>

                  {meta.socials.github && (
                    <a
                      href={meta.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#0057E7] border border-slate-200/80 hover:border-blue-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs hover:scale-105"
                      aria-label={`${member.name} on GitHub`}
                      title="GitHub"
                    >
                      <GitHubIcon className="w-4 h-4" />
                    </a>
                  )}

                  {meta.socials.twitter && (
                    <a
                      href={meta.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#0057E7] border border-slate-200/80 hover:border-blue-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs hover:scale-105"
                      aria-label={`${member.name} on X (Twitter)`}
                      title="X (Twitter)"
                    >
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={`mailto:${meta.socials.email}`}
                    className="w-10 h-10 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#0057E7] border border-slate-200/80 hover:border-blue-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-xs hover:scale-105"
                    aria-label={`Email ${member.name}`}
                    title="Send Email"
                  >
                    <MailIcon className="w-4 h-4" />
                  </a>
                </div>
              </SpotlightCard>
            </AnimatedSection>
          )
        })}
      </div>
    </div>
  )
}

export default OurTeam
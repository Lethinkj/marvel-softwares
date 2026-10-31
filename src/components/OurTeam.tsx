import React, { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { SpotlightCard } from './SpotlightCard'
import { teamMembers, siteConfig } from '../data/siteData'
import { LinkedInIcon, GitHubIcon, TwitterIcon, MailIcon } from './Icons'

interface MemberMetadata {
  initials: string
  photo: string
  avatarBg: string
  avatarBorder: string
  avatarRing: string
  avatarText: string
  spotlightColor: string
  bottomBg: string
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
    photo: '/team/alex-chen.jpg',
    avatarBg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-50',
    avatarBorder: 'border-blue-200/90',
    avatarRing: 'ring-blue-100/70',
    avatarText: 'text-[#0047BA]',
    spotlightColor: '#0057E7',
    bottomBg: 'bg-gradient-to-r from-[#0057E7] via-[#0047BA] to-[#0033A0]',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  },
  'Sarah Mitchell': {
    initials: 'SM',
    photo: '/team/sarah-mitchell.jpg',
    avatarBg: 'bg-gradient-to-br from-indigo-100 via-violet-50 to-indigo-50',
    avatarBorder: 'border-indigo-200/90',
    avatarRing: 'ring-indigo-100/70',
    avatarText: 'text-[#4338CA]',
    spotlightColor: '#4F46E5',
    bottomBg: 'bg-gradient-to-r from-[#0057E7] via-[#0047BA] to-[#0033A0]',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  },
  'Marcus Johnson': {
    initials: 'MJ',
    photo: '/team/marcus-johnson.jpg',
    avatarBg: 'bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-50',
    avatarBorder: 'border-sky-200/90',
    avatarRing: 'ring-sky-100/70',
    avatarText: 'text-[#0284C7]',
    spotlightColor: '#0284C7',
    bottomBg: 'bg-gradient-to-r from-[#0057E7] via-[#0047BA] to-[#0033A0]',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  },
  'Elena Rodriguez': {
    initials: 'ER',
    photo: '/team/elena-rodriguez.jpg',
    avatarBg: 'bg-gradient-to-br from-blue-100 via-indigo-50 to-sky-50',
    avatarBorder: 'border-blue-200/90',
    avatarRing: 'ring-blue-100/70',
    avatarText: 'text-[#1D4ED8]',
    spotlightColor: '#2563EB',
    bottomBg: 'bg-gradient-to-r from-[#0057E7] via-[#0047BA] to-[#0033A0]',
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
    photo: '/team/alex-chen.jpg',
    avatarBg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50',
    avatarBorder: 'border-blue-200/90',
    avatarRing: 'ring-blue-100/70',
    avatarText: 'text-[#0057E7]',
    spotlightColor: '#0057E7',
    bottomBg: 'bg-gradient-to-r from-[#0057E7] via-[#0047BA] to-[#0033A0]',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  }
}

interface TeamMemberCardProps {
  member: (typeof teamMembers)[0]
  meta: MemberMetadata
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, meta }) => {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <SpotlightCard
      theme="light"
      spotlightColor={meta.spotlightColor}
      spotlightSize={320}
      intensity={0.25}
      borderGlow={0.8}
      className="group rounded-[24px] flex flex-col justify-between h-full bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Top / Body Section (Centered content) */}
      <div className="p-6 sm:p-7 pb-5 flex flex-col flex-1 items-center text-center">
        {/* Centered Photo with ambient glow & stylish ring */}
        <div className="relative mb-5 flex justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl transform scale-125 -z-10 group-hover:bg-blue-500/25 transition-all duration-300" />
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#0057E7] via-sky-400 to-indigo-500 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center">
            {!imgFailed && meta.photo ? (
              <img
                src={meta.photo}
                alt={member.name}
                onError={() => setImgFailed(true)}
                className="w-full h-full rounded-full object-cover bg-slate-100"
                loading="lazy"
              />
            ) : (
              <div
                className={`w-full h-full rounded-full ${meta.avatarBg} flex items-center justify-center select-none`}
                role="img"
                aria-label={`${member.name} avatar`}
              >
                <span className={`text-xl font-bold tracking-wider ${meta.avatarText}`}>
                  {meta.initials}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Name & Role */}
        <div className="w-full">
          <h3 className="text-card-title group-hover:text-blue-600 transition-colors">
            {member.name}
          </h3>
          <p className="text-sm text-blue-600 font-semibold mt-1">
            {member.role}
          </p>
        </div>

        {/* Bio */}
        <p className="text-body text-sm leading-relaxed mt-3.5 flex-1 text-slate-600">
          {member.bio}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-5 pt-4 border-t border-slate-100 w-full">
          {member.expertise.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200/80 tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Distinct Background Color with White Social Icons */}
      <div className={`w-full py-3.5 px-6 ${meta.bottomBg} flex items-center justify-center gap-3 transition-colors duration-300`}>
        <a
          href={meta.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xs"
          aria-label={`${member.name} on LinkedIn`}
          title="LinkedIn"
        >
          <LinkedInIcon className="w-4 h-4 text-white" />
        </a>

        {meta.socials.github && (
          <a
            href={meta.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xs"
            aria-label={`${member.name} on GitHub`}
            title="GitHub"
          >
            <GitHubIcon className="w-4 h-4 text-white" />
          </a>
        )}

        {meta.socials.twitter && (
          <a
            href={meta.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xs"
            aria-label={`${member.name} on X (Twitter)`}
            title="X (Twitter)"
          >
            <TwitterIcon className="w-3.5 h-3.5 text-white" />
          </a>
        )}

        <a
          href={`mailto:${meta.socials.email}`}
          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xs"
          aria-label={`Email ${member.name}`}
          title="Send Email"
        >
          <MailIcon className="w-4 h-4 text-white" />
        </a>
      </div>
    </SpotlightCard>
  )
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
              <TeamMemberCard member={member} meta={meta} />
            </AnimatedSection>
          )
        })}
      </div>
    </div>
  )
}

export default OurTeam

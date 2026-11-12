import React, { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { SpotlightCard } from './SpotlightCard'
import { teamMembers, siteConfig } from '../data/siteData'
import { LinkedInIcon, GitHubIcon, TwitterIcon, MailIcon } from './Icons'

interface MemberMetadata {
  initials: string
  photo: string
  avatarBg: string
  avatarText: string
  bottomBg: string
  socials: {
    linkedin: string
    github?: string
    twitter?: string
    email: string
  }
}

const memberMetadataMap: Record<string, MemberMetadata> = {
  'Er. Sundareswara Nathan': {
    initials: 'SN',
    photo: '/images/team/sundareswaranathan.png',
    avatarBg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-50',
    avatarText: 'text-[#0047BA]',
    bottomBg: 'bg-gradient-to-r from-[#0057E7] via-[#0047BA] to-[#0033A0]',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
      email: siteConfig.email,
    },
  },
  'Er. Sindhu Kumar': {
    initials: 'SK',
    photo: '/images/team/sindhukumar.png',
    avatarBg: 'bg-gradient-to-br from-indigo-100 via-violet-50 to-indigo-50',
    avatarText: 'text-[#4338CA]',
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
    photo: '',
    avatarBg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50',
    avatarText: 'text-[#0057E7]',
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
      spotlightColor="transparent"
      spotlightSize={320}
      intensity={0.25}
      borderGlow={0.8}
      className="team-card group rounded-[24px] flex flex-col justify-between h-full bg-white border border-slate-200/80 transition-all duration-300 hover:-translate-y-1.5 focus-within:-translate-y-1.5 overflow-hidden"
      style={{
        boxShadow:
          '0 24px 60px -15px rgba(15, 23, 42, 0.42), 0 10px 24px -12px rgba(15, 23, 42, 0.2)',
      }}
    >
      {/* Full-bleed square portrait, flush with the card's top and sides */}
      <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
        {!imgFailed && meta.photo ? (
          <img
            src={meta.photo}
            alt={member.name}
            onError={() => setImgFailed(true)}
            className={`absolute inset-0 block w-full object-cover ${
              member.name === 'Er. Sundareswara Nathan'
                ? 'object-[center_40%]'
                : member.name === 'Er. Sindhu Kumar'
                  ? 'object-[center_0%]'
                  : ''
            }`}
            style={{ height: '100%' }}
            loading="lazy"
          />
        ) : (
          <div
            className={`absolute inset-0 ${meta.avatarBg} flex items-center justify-center select-none`}
            role="img"
            aria-label={`${member.name} avatar`}
          >
            <span className={`text-4xl font-bold tracking-wider ${meta.avatarText}`}>
              {meta.initials}
            </span>
          </div>
        )}
      </div>

      <div className="w-full px-6 sm:px-7 pt-5 pb-5 text-center">
        <h3 className="text-card-title group-hover:text-blue-600 transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-blue-600 font-semibold mt-1">
          {member.role}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {member.description}
        </p>
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
      <AnimatedSection className="text-center mx-auto w-full">
        <h2 id="team-heading" className="text-section-title">
          The People Behind <span className="heading-last-word">Our Success</span>
        </h2>
        <p className="section-subtitle w-full max-w-full text-balance" style={{ maxWidth: '100%' }}>
          A dedicated group of experienced engineers, designers, and system architects passionate about building reliable software. Together, we combine deep domain expertise, modern development methodologies, and a collaborative mindset to engineer high-impact digital products for your business.
        </p>
      </AnimatedSection>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-[720px] mx-auto" style={{ marginTop: 28 }}>
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

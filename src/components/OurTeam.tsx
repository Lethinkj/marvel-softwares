import React, { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { teamMembers, siteConfig } from '../data/siteData'
import { LinkedInIcon, GitHubIcon, TwitterIcon, MailIcon } from './Icons'

interface MemberMetadata {
  initials: string
  photo: string
  /** Keeps faces centred inside the portrait crop. */
  photoPosition?: string
  /** Adds breathing room above portraits that sit too close to the crop edge. */
  photoShift?: string
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
    photoPosition: '50% 18%',
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
    photoPosition: '50% 0%',
    photoShift: 'clamp(22px, 3.4vw, 48px)',
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
    <article className="team-card">
      <div className="team-card-media">
        {!imgFailed && meta.photo ? (
          <img
            src={meta.photo}
            alt={member.name}
            onError={() => setImgFailed(true)}
            className="team-card-photo"
            style={
              {
                ...(meta.photoPosition ? { objectPosition: meta.photoPosition } : {}),
                ...(meta.photoShift ? { '--team-photo-shift': meta.photoShift } : {}),
              } as React.CSSProperties
            }
            loading="lazy"
          />
        ) : (
          <div className="team-card-fallback" role="img" aria-label={`${member.name} avatar`}>
            <span>{meta.initials}</span>
          </div>
        )}
      </div>

      <div className="team-card-body">
        <h3 className="team-card-name">{member.name}</h3>
        <p className="team-card-role">{member.role}</p>

        <div className="team-card-socials">
          <a
            href={meta.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="team-card-social"
            aria-label={`${member.name} on LinkedIn`}
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>

          {meta.socials.github && (
            <a
              href={meta.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card-social"
              aria-label={`${member.name} on GitHub`}
              title="GitHub"
            >
              <GitHubIcon />
            </a>
          )}

          {meta.socials.twitter && (
            <a
              href={meta.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card-social"
              aria-label={`${member.name} on X (Twitter)`}
              title="X (Twitter)"
            >
              <TwitterIcon />
            </a>
          )}

          <a
            href={`mailto:${meta.socials.email}`}
            className="team-card-social"
            aria-label={`Email ${member.name}`}
            title="Send Email"
          >
            <MailIcon />
          </a>
        </div>
      </div>
    </article>
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
      <div className="team-grid">
        {teamMembers.map((member, i) => {
          const meta = getMemberMeta(member.name)

          return (
            <AnimatedSection key={member.name} as="div" delay={i * 0.08} className="h-full">
              <TeamMemberCard member={member} meta={meta} />
            </AnimatedSection>
          )
        })}
      </div>
    </div>
  )
}

export default OurTeam

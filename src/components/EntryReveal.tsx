import { useEffect, useState } from 'react'

const sparkles = [
  { top: '18%', left: '22%', delay: '0s', size: 5 },
  { top: '26%', left: '78%', delay: '0.45s', size: 4 },
  { top: '70%', left: '18%', delay: '0.8s', size: 4 },
  { top: '64%', left: '84%', delay: '0.25s', size: 5 },
  { top: '38%', left: '50%', delay: '0.65s', size: 3 },
]

export default function EntryReveal() {
  const [leaving, setLeaving] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1350)
    const hideTimer = window.setTimeout(() => setVisible(false), 1800)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`entry-reveal${leaving ? ' entry-reveal--leaving' : ''}`} aria-hidden="true">
      {/* Ambient layers */}
      <div className="entry-reveal__dots" />
      <div className="entry-reveal__glow entry-reveal__glow--cyan" />
      <div className="entry-reveal__glow entry-reveal__glow--orange" />

      {/* Twinkling sparkles */}
      {sparkles.map((sparkle, i) => (
        <span
          key={i}
          className="entry-reveal__sparkle"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
          }}
        />
      ))}

      <div className="entry-reveal__content">
        <div className="entry-reveal__stage">
          <div className="entry-reveal__ring" />
          <div className="entry-reveal__halo" />
          <img
            src="/images/brand/logo-horizontal.avif"
            alt=""
            className="entry-reveal__logo"
          />
        </div>
        <span className="entry-reveal__line" />
        <span className="entry-reveal__tagline">Digital solutions, built to grow</span>
        <span className="entry-reveal__loader">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  )
}

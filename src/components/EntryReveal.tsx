import { useEffect, useState } from 'react'

export default function EntryReveal() {
  const [leaving, setLeaving] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1050)
    const hideTimer = window.setTimeout(() => setVisible(false), 1650)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`entry-reveal${leaving ? ' entry-reveal--leaving' : ''}`} aria-hidden="true">
      <div className="entry-reveal__halo" />
      <div className="entry-reveal__content">
        <img
          src="/marvel-softwares-logo-horizontal.png"
          alt=""
          className="entry-reveal__logo"
        />
        <span className="entry-reveal__line" />
        <span className="entry-reveal__tagline">Digital solutions, built to grow</span>
      </div>
    </div>
  )
}

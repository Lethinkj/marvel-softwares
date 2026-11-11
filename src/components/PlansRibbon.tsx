import React from 'react'

interface PlansRibbonProps {
  badge?: string
}

export const PlansRibbon: React.FC<PlansRibbonProps> = ({ badge = 'Popular' }) => {
  return (
    <div className="corner-ribbon-wrap" aria-hidden="true">
      <div className="corner-ribbon-band">
        <span>{badge}</span>
      </div>
    </div>
  )
}

export default PlansRibbon

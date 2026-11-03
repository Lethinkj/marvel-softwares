import React from 'react'

export type AnimationDirection = 'up' | 'left' | 'right' | 'none'

export interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  className?: string
  delay?: number
  direction?: AnimationDirection
  as?: 'section' | 'div' | 'article' | 'aside'
  id?: string
  once?: boolean
  style?: React.CSSProperties
}

/**
 * AnimatedSection coordinates with the layout-based scroll-scene system.
 * Cards and elements with `delay` cascade in smoothly when their parent
 * layout section enters the viewport.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  as = 'section',
  id,
  style,
  delay = 0,
  direction: _direction,
  once: _once,
  ...rest
}) => {
  const Component: any = as || 'section'
  const delayMs = Math.min(Math.round(delay * 1000), 320)

  return (
    <Component
      id={id}
      className={`mild-reveal ${className}`.trim()}
      style={{
        ...style,
        ...(delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : {}),
      }}
      {...(rest as any)}
    >
      {children}
    </Component>
  )
}

export default AnimatedSection

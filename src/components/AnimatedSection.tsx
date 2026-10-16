import React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useMediaQuery'

export type AnimationDirection = 'up' | 'left' | 'right' | 'none'

export interface AnimatedSectionProps
  extends Omit<HTMLMotionProps<'section'>, 'direction' | 'children'> {
  children?: React.ReactNode
  className?: string
  delay?: number
  direction?: AnimationDirection
  as?: 'section' | 'div' | 'article' | 'aside'
  id?: string
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as = 'section',
  id,
  ...rest
}) => {
  const [ref, inView] = useInView<HTMLElement>({
    threshold: 0.1,
    once: true,
  })
  const shouldReduceMotion = useReducedMotion()

  const getInitial = () => {
    if (shouldReduceMotion) {
      return { opacity: 1, x: 0, y: 0 }
    }
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 32 }
      case 'left':
        return { opacity: 0, x: -32 }
      case 'right':
        return { opacity: 0, x: 32 }
      case 'none':
      default:
        return { opacity: 0 }
    }
  }

  const getAnimate = () => {
    if (shouldReduceMotion) {
      return { opacity: 1, x: 0, y: 0 }
    }
    if (!inView) {
      return getInitial()
    }
    switch (direction) {
      case 'up':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      case 'none':
      default:
        return { opacity: 1 }
    }
  }

  const MotionComponent =
    as === 'div'
      ? motion.div
      : as === 'article'
      ? motion.article
      : as === 'aside'
      ? motion.aside
      : motion.section

  return (
    <MotionComponent
      ref={ref as unknown as React.Ref<HTMLElement>}
      id={id}
      initial={getInitial()}
      animate={getAnimate()}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...(rest as any)}
    >
      {children}
    </MotionComponent>
  )
}

export default AnimatedSection

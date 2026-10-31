import React, { useEffect, useRef, useState } from 'react'
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
  once?: boolean
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as = 'section',
  id,
  once = false,
  ...rest
}) => {
  const [ref, inView] = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '24px 0px 24px 0px',
    once,
  })
  const shouldReduceMotion = useReducedMotion()

  // Track scroll direction: down vs up
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY
      if (Math.abs(cur - lastScrollY.current) > 6) {
        setScrollDir(cur > lastScrollY.current ? 'down' : 'up')
        lastScrollY.current = cur
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getInitial = () => {
    if (shouldReduceMotion) {
      return { opacity: 1, x: 0, y: 0 }
    }
    const yOffset = scrollDir === 'down' ? 24 : -24
    switch (direction) {
      case 'up':
        return { opacity: 0, y: yOffset }
      case 'left':
        return { opacity: 0, x: -28 }
      case 'right':
        return { opacity: 0, x: 28 }
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
        duration: shouldReduceMotion ? 0.01 : 0.52,
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

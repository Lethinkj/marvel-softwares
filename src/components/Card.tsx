import React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { useReducedMotion } from '../hooks/useMediaQuery'

export interface CardProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    children,
    className = '',
    hover = false,
    gradient = false,
    ...props
  },
  ref
) {
  const shouldReduceMotion = useReducedMotion()

  const baseClasses =
    'min-w-0 rounded-2xl border p-[var(--card-padding)] text-[#1E293B] transition-[border-color,box-shadow,transform] duration-200 ease-out'

  const bgClasses = gradient
    ? 'bg-gradient-to-br from-white via-[#F0F5FF]/60 to-white border-[#CBD5E1]/40 shadow-sm'
    : 'bg-white border-[#CBD5E1]/40 shadow-sm'

  const hoverClasses = hover
    ? 'hover:border-[#0057E7] hover:shadow-xl hover:shadow-[#0057E7]/10'
    : ''

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={hover && !shouldReduceMotion ? { y: -4, transition: { duration: 0.2 } } : undefined}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`${baseClasses} ${bgClasses} ${hoverClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </motion.div>
  )
})

export default Card

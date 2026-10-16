import React from 'react'
import { motion, type Variants } from 'motion/react'
import { useReducedMotion } from '../hooks/useMediaQuery'

export interface SectionHeadingProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  label?: React.ReactNode
  centered?: boolean
  className?: string
  id?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  label,
  centered = false,
  className = '',
  id,
}) => {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <motion.div
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'} ${className}`.trim()}
    >
      {label && (
        <motion.div variants={itemVariants} className="mb-3">
          <span className="inline-flex items-center px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-[#0057E7] bg-[#F0F5FF] border border-[#0057E7]/30 rounded-full shadow-xs">
            {label}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={itemVariants}
        className="text-section-title text-[#0033A0] font-bold tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={`mt-4 text-[#334155] text-base sm:text-lg max-w-2xl leading-relaxed text-body font-normal ${centered ? 'mx-auto' : ''}`.trim()}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading

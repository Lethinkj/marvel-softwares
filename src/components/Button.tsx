import React from 'react'
import { Link } from 'react-router-dom'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  as?: 'button' | 'link' | 'a'
  href?: string
  to?: string
  children?: React.ReactNode
  className?: string
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  target?: string
  rel?: string
  id?: string
  title?: string
  ariaLabel?: string
  'aria-label'?: string
  tabIndex?: number
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#0057E7] text-white hover:bg-[#0033A0] active:bg-[#002780] shadow-sm shadow-[#0057E7]/25 hover:shadow-md hover:shadow-[#0057E7]/35 border border-transparent font-medium',
  secondary:
    'bg-[#FF5A00] text-white hover:bg-[#e04f00] active:bg-[#c94600] shadow-sm shadow-[#FF5A00]/25 hover:shadow-md hover:shadow-[#FF5A00]/35 border border-transparent font-semibold',
  outline:
    'bg-white text-[#0057E7] border-2 border-[#0057E7] hover:bg-[#0057E7] hover:text-white hover:border-[#0057E7] active:bg-[#0033A0] font-medium',
  ghost:
    'bg-transparent text-[#0033A0] border border-transparent hover:text-[#0057E7] hover:bg-[#F0F5FF] active:bg-[#E0ECFF] font-medium',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-3.5 py-1.5 text-xs sm:text-sm rounded-lg gap-1.5',
  md: 'min-h-[44px] px-5 py-2.5 text-sm sm:text-base rounded-xl gap-2',
  lg: 'min-h-[48px] sm:min-h-[52px] px-6 py-3.5 text-base sm:text-lg rounded-xl gap-2.5',
}

function isExternalUrl(url: string): boolean {
  return /^([a-z]+:)?\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:')
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      as,
      href,
      to,
      children,
      className = '',
      fullWidth = false,
      disabled = false,
      type = 'button',
      onClick,
      target,
      rel,
      id,
      title,
      ariaLabel,
      'aria-label': ariaLabelAttr,
      tabIndex,
      ...rest
    },
    ref
  ) {
    const destination = href || to
    const isExternal = destination ? isExternalUrl(destination) : false
    const computedAs = as || (destination ? (isExternal ? 'a' : 'link') : 'button')

    const baseClasses =
      'inline-flex items-center justify-center font-medium leading-none text-center select-none ' +
      'transition-all duration-200 ease-in-out cursor-pointer ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057E7] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

    const widthClass = fullWidth ? 'w-full flex' : 'w-auto'
    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : ''

    const combinedClassName = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${disabledClasses} ${className}`.trim()

    const label = ariaLabel || ariaLabelAttr

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    if (computedAs === 'link' && destination) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={destination}
          className={combinedClassName}
          onClick={handleClick}
          id={id}
          title={title}
          aria-label={label}
          aria-disabled={disabled ? true : undefined}
          tabIndex={disabled ? -1 : tabIndex}
          {...rest}
        >
          {children}
        </Link>
      )
    }

    if (computedAs === 'a' && destination) {
      const computedRel = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={destination}
          className={combinedClassName}
          onClick={handleClick}
          target={target}
          rel={computedRel}
          id={id}
          title={title}
          aria-label={label}
          aria-disabled={disabled ? true : undefined}
          tabIndex={disabled ? -1 : tabIndex}
          {...rest}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={combinedClassName}
        onClick={handleClick}
        id={id}
        title={title}
        aria-label={label}
        aria-disabled={disabled ? true : undefined}
        tabIndex={tabIndex}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

export default Button

'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import './StaggeredMenu.css'

export interface StaggeredMenuItem {
  label: string
  ariaLabel?: string
  link: string
}

export interface StaggeredMenuSocialItem {
  label: string
  link: string
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right'
  items?: StaggeredMenuItem[]
  socialItems?: StaggeredMenuSocialItem[]
  displaySocials?: boolean
  displayItemNumbering?: boolean
  className?: string
  logoUrl?: string
  showLogo?: boolean
  menuButtonColor?: string
  openMenuButtonColor?: string
  accentColor?: string
  changeMenuColorOnOpen?: boolean
  isFixed?: boolean
  closeOnClickAway?: boolean
  headerPadding?: string
  activeSection?: string
  headerHeight?: string | number
  onMenuOpen?: () => void
  onMenuClose?: () => void
  onItemClick?: (item: StaggeredMenuItem, e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = false,
  className,
  logoUrl = '/marvel-softwares-logo-removebg-preview.png',
  showLogo = true,
  menuButtonColor = '#0057E7',
  openMenuButtonColor = '#14203a',
  accentColor = '#0057E7',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  headerPadding,
  headerHeight,
  activeSection,
  onMenuOpen,
  onMenuClose,
  onItemClick,
}) => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const panelRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)

  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTweenRef = useRef<gsap.core.Tween | null>(null)
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null)
  const colorTweenRef = useRef<gsap.core.Tween | null>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const busyRef = useRef(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const l1 = line1Ref.current
      const l2 = line2Ref.current
      const l3 = line3Ref.current
      if (!panel || !l1 || !l2 || !l3) return

      const offscreen = position === 'left' ? -100 : 100
      gsap.set(panel, { xPercent: offscreen, opacity: 1 })
      gsap.set(l1, { transformOrigin: '50% 50%', y: 0, rotate: 0 })
      gsap.set(l2, { transformOrigin: '50% 50%', opacity: 1, scaleX: 1 })
      gsap.set(l3, { transformOrigin: '50% 50%', y: 0, rotate: 0 })
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor })
    })
    return () => ctx.revert()
  }, [menuButtonColor, position])

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current
    if (!panel) return null

    openTlRef.current?.kill()
    if (closeTweenRef.current) {
      closeTweenRef.current.kill()
      closeTweenRef.current = null
    }

    const offscreen = position === 'left' ? -100 : 100
    const tl = gsap.timeline({ paused: true })
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: 0.25, ease: 'power2.out' },
      0,
    )

    openTlRef.current = tl
    return tl
  }, [position])

  const playOpen = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true
    const tl = buildOpenTimeline()
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false
      })
      tl.play(0)
    } else {
      busyRef.current = false
    }
  }, [buildOpenTimeline])

  const playClose = useCallback(() => {
    openTlRef.current?.kill()
    openTlRef.current = null

    const panel = panelRef.current
    if (!panel) return

    closeTweenRef.current?.kill()
    const offscreen = position === 'left' ? -100 : 100
    closeTweenRef.current = gsap.to(panel, {
      xPercent: offscreen,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => {
        busyRef.current = false
      },
    })
  }, [position])

  const animateIcon = useCallback((opening: boolean) => {
    const l1 = line1Ref.current
    const l2 = line2Ref.current
    const l3 = line3Ref.current
    if (!l1 || !l2 || !l3) return
    spinTweenRef.current?.kill()
    if (opening) {
      spinTweenRef.current = gsap
        .timeline()
        .to(l2, { opacity: 0, scaleX: 0, duration: 0.2, ease: 'power2.in' }, 0)
        .to(l1, { y: 7, rotate: 45, duration: 0.32, ease: 'power3.out' }, 0.04)
        .to(l3, { y: -7, rotate: -45, duration: 0.32, ease: 'power3.out' }, 0.04)
    } else {
      spinTweenRef.current = gsap
        .timeline()
        .to(l1, { y: 0, rotate: 0, duration: 0.28, ease: 'power3.out' }, 0)
        .to(l3, { y: 0, rotate: 0, duration: 0.28, ease: 'power3.out' }, 0)
        .to(l2, { opacity: 1, scaleX: 1, duration: 0.24, ease: 'power2.out' }, 0.06)
    }
  }, [])

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current
      if (!btn) return
      colorTweenRef.current?.kill()
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.set(btn, { color: menuButtonColor })
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  )

  useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor
        gsap.set(toggleBtnRef.current, { color: targetColor })
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor })
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor])

  const toggleMenu = useCallback(() => {
    const target = !openRef.current
    openRef.current = target
    setOpen(target)
    if (target) {
      onMenuOpen?.()
      playOpen()
    } else {
      onMenuClose?.()
      playClose()
    }
    animateIcon(target)
    animateColor(target)
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose])

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false
      setOpen(false)
      onMenuClose?.()
      playClose()
      animateIcon(false)
      animateColor(false)
    }
  }, [playClose, animateIcon, animateColor, onMenuClose])

  // Prevent background scroll and blur background page content when fixed menu is open
  useEffect(() => {
    if (!isFixed || !open) {
      document.body.classList.remove('nav-menu-open')
      return
    }
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('nav-menu-open')

    return () => {
      document.body.style.overflow = original
      document.body.classList.remove('nav-menu-open')
    }
  }, [isFixed, open])

  // Handle outside clicks
  useEffect(() => {
    if (!closeOnClickAway || !open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeOnClickAway, open, closeMenu])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openRef.current) {
        closeMenu()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeMenu])

  const handleItemClick = (it: StaggeredMenuItem, e: React.MouseEvent<HTMLAnchorElement>) => {
    onItemClick?.(it, e)
    if (e.defaultPrevented) return

    if (it.link.startsWith('#') || it.link.startsWith('/#')) {
      e.preventDefault()
      const targetId = it.link.replace(/^(\/)?#/, '')
      const el = document.getElementById(targetId)
      if (el) {
        const headerOffset = 70
        const elementPosition = el.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        window.history.pushState(null, '', `#${targetId}`)
      }
      closeMenu()
    } else if (it.link === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', '/')
      closeMenu()
    } else {
      closeMenu()
    }
  }

  const customStyle: React.CSSProperties = {
    ...(accentColor ? { ['--sm-accent' as any]: accentColor } : {}),
    ...(headerPadding ? { ['--sm-header-padding' as any]: headerPadding } : {}),
    ...(headerHeight ? { ['--sm-header-height' as any]: typeof headerHeight === 'number' ? `${headerHeight}px` : headerHeight } : {}),
  }

  const menuContent = (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={Object.keys(customStyle).length ? customStyle : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      {/* Backdrop overlay for the remaining screen area */}
      <div className="sm-scrim" onClick={closeMenu} aria-hidden="true" />

      <header className="staggered-menu-header" aria-label="Main navigation header">
        {showLogo && (
          <div className="sm-logo" aria-label="Logo">
            <Link to="/" onClick={closeMenu} className="flex items-center" aria-label="MARVEL SOFTWARES — Home">
              <img
                src={logoUrl || '/marvel-softwares-logo-removebg-preview.png'}
                alt="Logo"
                className="sm-logo-img"
                draggable={false}
                width={120}
                height={32}
              />
            </Link>
          </div>
        )}
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={iconRef} className="sm-burger" aria-hidden="true">
            <span ref={line1Ref} className="sm-burger-line sm-burger-line-1" />
            <span ref={line2Ref} className="sm-burger-line sm-burger-line-2" />
            <span ref={line3Ref} className="sm-burger-line sm-burger-line-3" />
          </span>
        </button>
      </header>

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          {/* Top — White Header Band */}
          <div className="sm-panel-top">
            <Link to="/" onClick={closeMenu} className="sm-panel-logo" aria-label="MARVEL SOFTWARES — Home">
              <img
                src={logoUrl || '/marvel-softwares-logo-removebg-preview.png'}
                alt="MARVEL SOFTWARES"
                className="sm-logo-img"
                draggable={false}
                width={120}
                height={32}
              />
            </Link>
          </div>

          {/* Middle — Ash Silver Formal Menu */}
          <div className="sm-panel-body">
            <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
              {items && items.length ? (
                items.map((it, idx) => {
                  const itemSection = it.link.replace(/^(\/)?#/, '')
                  const active = activeSection
                    ? itemSection === activeSection || (it.link === '/' && activeSection === 'home')
                    : it.link === '/'
                      ? location.pathname === '/' && !location.hash
                      : it.link.startsWith('/#') || it.link.startsWith('#')
                        ? location.hash === `#${itemSection}`
                        : location.pathname.startsWith(it.link)

                  return (
                    <li className="sm-panel-itemWrap" key={it.label + idx}>
                      <a
                        className={`sm-panel-item ${active ? 'sm-panel-item--active' : ''}`}
                        href={it.link}
                        aria-label={it.ariaLabel || it.label}
                        aria-current={active ? 'page' : undefined}
                        data-index={idx + 1}
                        onClick={(e) => handleItemClick(it, e)}
                      >
                        <span className="sm-panel-itemLabel">{it.label}</span>
                      </a>
                    </li>
                  )
                })
              ) : (
                <li className="sm-panel-itemWrap" aria-hidden="true">
                  <span className="sm-panel-item">
                    <span className="sm-panel-itemLabel">No items</span>
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Bottom — White Socials Band */}
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Quick links">
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target={s.link.startsWith('http') ? '_blank' : undefined}
                      rel={s.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="sm-socials-link"
                      onClick={() => closeMenu()}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  )

  if (isFixed && typeof document !== 'undefined') {
    return createPortal(menuContent, document.body)
  }

  return menuContent
}

export default StaggeredMenu

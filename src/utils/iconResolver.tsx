import React from 'react'
import { AppIcon } from '../components/Icons'

/**
 * Helper to render an application icon dynamically by name
 */
export const renderAppIcon = (iconName: string, className = 'w-5 h-5'): React.ReactNode => {
  return <AppIcon name={iconName} className={className} />
}

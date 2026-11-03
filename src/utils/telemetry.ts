import { hasConsented } from './consent'
import { SECTION_TITLES } from './analytics'
import { supabase } from '../lib/supabase'

const VISITOR_ID_KEY = 'marvel_visitor_id'
const SESSION_ID_KEY = 'marvel_session_id'
const SESSION_EXPIRY_KEY = 'marvel_session_expiry'
const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes

export interface ClientMeta {
  device_type: 'mobile' | 'tablet' | 'desktop'
  browser: string
  os: string
  screen_resolution: string
  language: string
  referrer: string
}

export interface TelemetryEventPayload {
  event_name: string
  page_path: string
  section_id?: string
  section_name?: string
  dwell_time_seconds?: number
  element_label?: string
  metadata?: Record<string, unknown>
}

/**
 * Generates or retrieves a persistent visitor UUID.
 */
export function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY)
    if (!id) {
      id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
      localStorage.setItem(VISITOR_ID_KEY, id)
    }
    return id
  } catch {
    return 'anonymous-visitor'
  }
}

/**
 * Retrieves the current session UUID or creates a new one if expired (>30m).
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const now = Date.now()
    const expiry = Number(sessionStorage.getItem(SESSION_EXPIRY_KEY) || '0')
    let sessionId = sessionStorage.getItem(SESSION_ID_KEY)

    if (!sessionId || now > expiry) {
      sessionId = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `s-${now}-${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem(SESSION_ID_KEY, sessionId)
    }
    sessionStorage.setItem(SESSION_EXPIRY_KEY, String(now + SESSION_TIMEOUT_MS))
    return sessionId
  } catch {
    return 'anonymous-session'
  }
}

/**
 * Extracts non-invasive client metadata (device, screen, OS).
 */
export function getClientMeta(): ClientMeta {
  if (typeof window === 'undefined') {
    return {
      device_type: 'desktop',
      browser: 'Unknown',
      os: 'Unknown',
      screen_resolution: '',
      language: '',
      referrer: '',
    }
  }

  const ua = navigator.userAgent || ''
  const width = window.innerWidth || window.screen.width || 1024

  let device_type: 'mobile' | 'tablet' | 'desktop' = 'desktop'
  if (width < 640 || /Mobile|Android|iPhone/i.test(ua)) device_type = 'mobile'
  else if (width < 1024 || /iPad|Tablet/i.test(ua)) device_type = 'tablet'

  let browser = 'Unknown'
  if (ua.includes('Edg/')) browser = 'Edge'
  else if (ua.includes('Chrome/')) browser = 'Chrome'
  else if (ua.includes('Safari/')) browser = 'Safari'
  else if (ua.includes('Firefox/')) browser = 'Firefox'

  let os = 'Unknown'
  if (ua.includes('Win')) os = 'Windows'
  else if (ua.includes('Mac')) os = 'macOS'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS'

  return {
    device_type,
    browser,
    os,
    screen_resolution: `${window.screen.width || 0}x${window.screen.height || 0}`,
    language: navigator.language || 'en',
    referrer: document.referrer || '',
  }
}

/**
 * Sends a telemetry event directly to Supabase (dev_telemetry_events table).
 * Also upserts the visitor profile in dev_visitors.
 * Respects user cookie/privacy consent.
 */
export function sendTelemetry(event: TelemetryEventPayload): void {
  if (typeof window === 'undefined') return

  // Strict privacy compliance: only track if user has accepted cookies
  if (!hasConsented()) {
    return
  }

  const visitor_id = getVisitorId()
  const session_id = getSessionId()
  const client_meta = getClientMeta()

  const payload = {
    visitor_id,
    session_id,
    client_meta,
    event_name: event.event_name,
    page_path: event.page_path || window.location.pathname,
    section_id: event.section_id,
    section_name: event.section_name || (event.section_id ? SECTION_TITLES[event.section_id] : undefined),
    dwell_time_seconds: event.dwell_time_seconds || 0,
    element_label: event.element_label,
    metadata: event.metadata,
  }

  if (import.meta.env.DEV) {
    console.log('🛰️ [Supabase Telemetry]', payload)
  }

  // Mirror to localStorage for offline/admin dashboard fallback (max 200 events)
  try {
    const rawLocal = localStorage.getItem('dev_telemetry_events')
    const localEvents = rawLocal ? JSON.parse(rawLocal) : []
    localEvents.unshift({ id: Date.now(), ...payload, created_at: new Date().toISOString() })
    if (localEvents.length > 200) localEvents.length = 200
    localStorage.setItem('dev_telemetry_events', JSON.stringify(localEvents))
  } catch {
    // Non-blocking
  }

  // Fire-and-forget upsert visitor + insert telemetry event into Supabase
  ;(async () => {
    try {
      // 1. Upsert visitor profile
      await supabase.from('dev_visitors').upsert(
        {
          visitor_id,
          device_type: client_meta.device_type,
          browser: client_meta.browser,
          os: client_meta.os,
          screen_resolution: client_meta.screen_resolution,
          language: client_meta.language,
          referrer: client_meta.referrer,
          last_seen: new Date().toISOString(),
        },
        { onConflict: 'visitor_id', ignoreDuplicates: false }
      )

      // 2. Insert telemetry event
      await supabase.from('dev_telemetry_events').insert({
        visitor_id,
        session_id: session_id || null,
        event_name: payload.event_name,
        page_path: payload.page_path,
        section_id: payload.section_id || null,
        section_name: payload.section_name || null,
        dwell_time_seconds: payload.dwell_time_seconds,
        element_label: payload.element_label || null,
        metadata: {
          ...(payload.metadata || {}),
          client_meta,
        },
      })
    } catch {
      // Silently fail — telemetry must never break the UI
    }
  })()
}

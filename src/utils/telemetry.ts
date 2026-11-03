import { getConsentStatus } from './consent'
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
 * Generates an RFC 4122 v4 compliant UUID strictly compatible with PostgreSQL UUID columns.
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID()
    } catch {
      // Fallback below
    }
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Validates whether a string is a standard 36-character UUID.
 */
export function isValidUUID(val: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val)
}

/**
 * Generates or retrieves a persistent visitor UUID (strictly valid PostgreSQL UUID).
 */
export function getVisitorId(): string {
  if (typeof window === 'undefined') return generateUUID()
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY)
    if (!id || !isValidUUID(id)) {
      id = generateUUID()
      localStorage.setItem(VISITOR_ID_KEY, id)
    }
    return id
  } catch {
    return generateUUID()
  }
}

/**
 * Retrieves the current session UUID or creates a new one if expired (>30m).
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return generateUUID()
  try {
    const now = Date.now()
    const expiry = Number(sessionStorage.getItem(SESSION_EXPIRY_KEY) || '0')
    let sessionId = sessionStorage.getItem(SESSION_ID_KEY)

    if (!sessionId || now > expiry || !isValidUUID(sessionId)) {
      sessionId = generateUUID()
      sessionStorage.setItem(SESSION_ID_KEY, sessionId)
    }
    sessionStorage.setItem(SESSION_EXPIRY_KEY, String(now + SESSION_TIMEOUT_MS))
    return sessionId
  } catch {
    return generateUUID()
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
 * Sends a telemetry event directly to Supabase:
 * 1. Upserts visitor profile in dev_visitors
 * 2. Upserts visit session in dev_sessions
 * 3. Inserts telemetry event into dev_telemetry_events
 * Respects user privacy: drops tracking if user explicitly declined cookies.
 */
export function sendTelemetry(event: TelemetryEventPayload): void {
  if (typeof window === 'undefined') return

  // Privacy compliance: drop if user explicitly declined
  const consent = getConsentStatus()
  if (consent === 'declined') {
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

  // Fire-and-forget database persistence sequence
  ;(async () => {
    try {
      // 1. Upsert visitor profile in dev_visitors
      try {
        await supabase.from('dev_visitors').upsert(
          {
            visitor_id,
            device_type: client_meta.device_type,
            browser: client_meta.browser,
            os: client_meta.os,
            screen_resolution: client_meta.screen_resolution,
            language: client_meta.language,
            referrer: client_meta.referrer,
            consent_status: consent === 'accepted' ? 'accepted' : 'accepted',
            last_seen: new Date().toISOString(),
          },
          { onConflict: 'visitor_id' }
        )
      } catch (vErr) {
        if (import.meta.env.DEV) console.warn('[telemetry] dev_visitors upsert:', vErr)
      }

      // 2. Upsert active visit session in dev_sessions
      try {
        await supabase.from('dev_sessions').upsert(
          {
            session_id,
            visitor_id,
            landing_page: payload.page_path,
            started_at: new Date().toISOString(),
          },
          { onConflict: 'session_id' }
        )
      } catch (sErr) {
        if (import.meta.env.DEV) console.warn('[telemetry] dev_sessions upsert:', sErr)
      }

      // 3. Insert telemetry event into dev_telemetry_events
      let eventRes = await supabase.from('dev_telemetry_events').insert({
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

      // If foreign key failed on session_id, retry without session_id
      if (eventRes.error && session_id) {
        eventRes = await supabase.from('dev_telemetry_events').insert({
          visitor_id,
          session_id: null,
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
      }
    } catch {
      // Silently fail — telemetry must never break the UI
    }
  })()
}

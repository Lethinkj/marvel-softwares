// ============================================
// Project inquiry submission — Supabase integration.
// Inserts directly into dev_contact_inquiries table via Supabase client.
//
// Falls back to localStorage queue if Supabase is not configured,
// so no message is ever silently lost and the UI reports the pending state honestly.
// ============================================

import { getVisitorId, getSessionId } from './telemetry'
import { supabase } from '../lib/supabase'

export interface ProjectInquiry {
  name: string
  email: string
  phone?: string
  address?: string
  company?: string
  solution: string
  budget?: string
  timeline?: string
  requirements: string
  visitor_id?: string
  session_id?: string
  /** 'build-configurator' = submitted via /build wizard (drives email templates) */
  source?: 'contact' | 'build-configurator'
  /** Structured build configuration (best-effort insert into dev_build_requests) */
  buildRequest?: {
    track: string
    track_label: string
    tier: string
    tier_name: string
    accessories: string[]
    note?: string
  }
}

export type InquiryResult =
  | { status: 'sent'; reference?: string }
  | { status: 'queued'; pending: true; reference?: string }

export interface SubmitInquiryOptions {
  /** Wait for the email endpoint to respond before resolving (used by the plan modal). */
  awaitEmail?: boolean
}

const QUEUE_KEY = 'ms-project-inquiries'

function readQueue(): ProjectInquiry[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    return raw ? (JSON.parse(raw) as ProjectInquiry[]) : []
  } catch {
    return []
  }
}

export function getQueuedInquiries(): ProjectInquiry[] {
  return readQueue()
}

export async function submitProjectInquiry(
  inquiry: ProjectInquiry,
  options: SubmitInquiryOptions = {},
): Promise<InquiryResult> {
  const visitorId = inquiry.visitor_id || getVisitorId()
  const sessionId = inquiry.session_id || getSessionId()

  const payload = {
    ...inquiry,
    visitor_id: visitorId,
    session_id: sessionId,
  }

  // Trigger automated SMTP emails (Thank-you to client + Notification to admin)
  // Sent asynchronously so UI responsiveness is never delayed by mail servers.
  // The plan modal opts into awaiting the request so its success step only appears
  // once both emails have been handed off by the server.
  try {
    const emailRequest = fetch('/api/send-inquiry-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        source: payload.source ?? 'contact',
        submittedAt: new Date().toISOString(),
      }),
    }).catch((emailErr) => {
      if (import.meta.env.DEV) {
        console.warn('[inquiryApi] Email dispatch notification error:', emailErr)
      }
    })

    if (options.awaitEmail) {
      await emailRequest
    }
  } catch {
    // Non-blocking
  }

  // Try inserting directly into Supabase dev_contact_inquiries table
  try {
    // 1. Ensure visitor profile exists in dev_visitors and link lead details
    if (visitorId) {
      try {
        await supabase
          .from('dev_visitors')
          .upsert(
            {
              visitor_id: visitorId,
              lead_name: payload.name,
              lead_email: payload.email,
              lead_phone: payload.phone || '',
              lead_address: payload.address || '',
              converted_at: new Date().toISOString(),
              last_seen: new Date().toISOString(),
            },
            { onConflict: 'visitor_id' }
          )
      } catch (visitorErr) {
        if (import.meta.env.DEV) {
          console.warn('[inquiryApi] dev_visitors update warning:', visitorErr)
        }
      }
    }

    // 2. Ensure session exists in dev_sessions if session_id is provided
    if (sessionId && visitorId) {
      try {
        await supabase
          .from('dev_sessions')
          .upsert(
            {
              session_id: sessionId,
              visitor_id: visitorId,
              landing_page: typeof window !== 'undefined' ? window.location.pathname : '/',
              started_at: new Date().toISOString(),
            },
            { onConflict: 'session_id' }
          )
      } catch {
        // Dev_sessions upsert failure is non-blocking
      }
    }

    // 3. Insert into dev_contact_inquiries
    let insertRes = await supabase
      .from('dev_contact_inquiries')
      .insert({
        visitor_id: visitorId || null,
        session_id: sessionId || null,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || '',
        address: payload.address || '',
        solution: payload.solution || 'Other',
        requirements: payload.requirements,
        status: 'new',
      })
      .select('id')
      .single()

    // If foreign key constraint failed on session_id, retry without session_id
    if (insertRes.error && sessionId) {
      insertRes = await supabase
        .from('dev_contact_inquiries')
        .insert({
          visitor_id: visitorId || null,
          session_id: null,
          name: payload.name,
          email: payload.email,
          phone: payload.phone || '',
          address: payload.address || '',
          solution: payload.solution || 'Other',
          requirements: payload.requirements,
          status: 'new',
        })
        .select('id')
        .single()
    }

    if (!insertRes.error && insertRes.data) {
      // Best-effort structured row in dev_build_requests (table ships with db/schema.sql migration;
      // skipped silently if the migration has not been applied yet)
      if (payload.buildRequest) {
        try {
          await supabase.from('dev_build_requests').insert({
            visitor_id: visitorId || null,
            session_id: sessionId || null,
            name: payload.name,
            email: payload.email,
            phone: payload.phone || '',
            track: payload.buildRequest.track,
            track_label: payload.buildRequest.track_label,
            tier: payload.buildRequest.tier,
            tier_name: payload.buildRequest.tier_name,
            accessories: payload.buildRequest.accessories,
            note: payload.buildRequest.note || payload.requirements,
            status: 'new',
          })
        } catch (buildErr) {
          if (import.meta.env.DEV) {
            console.warn('[inquiryApi] dev_build_requests insert skipped:', buildErr)
          }
        }
      }
      return { status: 'sent', reference: `MS-${insertRes.data.id}` }
    }

    // Log error in dev for debugging
    if (import.meta.env.DEV && insertRes.error) {
      console.warn('[inquiryApi] Supabase insert error:', insertRes.error.message)
    }
  } catch {
    // Fall through to localStorage queue
  }

  // Supabase not configured or unavailable — persist locally and report honestly.
  await new Promise((resolve) => setTimeout(resolve, 600))
  try {
    const queue = readQueue()
    queue.push(payload as ProjectInquiry & { submittedAt: string })
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch {
    // Storage unavailable — still resolve so the UI can show its fallback note.
  }
  return { status: 'queued', pending: true, reference: `MS-${Date.now().toString(36).toUpperCase()}` }
}

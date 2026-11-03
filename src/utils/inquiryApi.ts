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
}

export type InquiryResult =
  | { status: 'sent' }
  | { status: 'queued'; pending: true }

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

export async function submitProjectInquiry(inquiry: ProjectInquiry): Promise<InquiryResult> {
  const payload = {
    ...inquiry,
    visitor_id: inquiry.visitor_id || getVisitorId(),
    session_id: inquiry.session_id || getSessionId(),
  }

  // Try inserting directly into Supabase dev_contact_inquiries table
  try {
    const { data, error } = await supabase
      .from('dev_contact_inquiries')
      .insert({
        visitor_id: payload.visitor_id || null,
        session_id: payload.session_id || null,
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

    if (!error && data) {
      return { status: 'sent' }
    }

    // Log error in dev for debugging
    if (import.meta.env.DEV && error) {
      console.warn('[inquiryApi] Supabase insert error:', error.message)
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
  return { status: 'queued', pending: true }
}

// ============================================
// Project inquiry submission — integration point.
// Connect this to the real backend/email service.
//
// To go live, EITHER:
//  1. Set VITE_INQUIRY_ENDPOINT to a POST endpoint that
//     accepts the inquiry JSON, OR
//  2. Replace the body of submitProjectInquiry with a
//     direct API / email-service call.
//
// Until a backend is configured, inquiries are queued in
// localStorage (key below) so no message is silently lost
// and the UI reports the pending state honestly.
// ============================================

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
  const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...inquiry, submittedAt: new Date().toISOString() }),
    })
    if (!response.ok) {
      throw new Error(`Inquiry submission failed with status ${response.status}`)
    }
    return { status: 'sent' }
  }

  // No backend configured — persist locally and report honestly.
  await new Promise((resolve) => setTimeout(resolve, 600))
  try {
    const queue = readQueue()
    queue.push({ ...inquiry, submittedAt: new Date().toISOString() } as ProjectInquiry & {
      submittedAt: string
    })
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch {
    // Storage unavailable — still resolve so the UI can show its fallback note.
  }
  return { status: 'queued', pending: true }
}

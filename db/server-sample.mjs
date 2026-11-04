/**
 * ====================================================================
 * MARVEL SOFTWARES — Telemetry & Inquiries Ingestion Server (Supabase)
 * (All tables use prefix: dev_)
 * ====================================================================
 * Connects to Supabase and ingests telemetry packets and contact forms.
 *
 * Dependencies required to run:
 *   npm install express @supabase/supabase-js cors
 *
 * Environment variables:
 *   SUPABASE_URL=https://your-project-id.supabase.co
 *   SUPABASE_SERVICE_KEY=your-service-role-key   (use service key for server-side)
 *   PORT=4000
 * ====================================================================
 */

import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import { sendInquiryEmails } from '../server/emailService.mjs'

const app = express()
const port = process.env.PORT || 4000

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

app.use(cors())
app.use(express.json())

// Helper to extract true client IP behind reverse proxy / Nginx / Cloudflare
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress || '127.0.0.1'
}

/**
 * GET /health
 * Simple health check endpoint
 */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

/**
 * POST /api/telemetry
 * Ingests first-party visitor telemetry & section views into dev_telemetry_events
 */
app.post('/api/telemetry', async (req, res) => {
  try {
    const { visitor_id, session_id, event_name, page_path, section_id, section_name, dwell_time_seconds, client_meta, metadata } = req.body

    if (!visitor_id || !event_name) {
      return res.status(400).json({ error: 'Missing visitor_id or event_name' })
    }

    const ip = getClientIp(req)
    const country = req.headers['cf-ipcountry'] || 'India'
    const city = req.headers['cf-ipcity'] || null
    const region = req.headers['cf-region'] || null

    // 1. Upsert visitor profile in dev_visitors
    const { error: visitorError } = await supabase.from('dev_visitors').upsert(
      {
        visitor_id,
        ip_address: ip,
        country,
        region,
        city,
        device_type: client_meta?.device_type || 'desktop',
        browser: client_meta?.browser || 'Unknown',
        os: client_meta?.os || 'Unknown',
        screen_resolution: client_meta?.screen_resolution || '',
        language: client_meta?.language || '',
        referrer: client_meta?.referrer || '',
        last_seen: new Date().toISOString(),
      },
      { onConflict: 'visitor_id' }
    )

    if (visitorError) {
      console.error('Visitor upsert error:', visitorError.message)
    }

    // 2. Insert event in dev_telemetry_events
    const { error: eventError } = await supabase.from('dev_telemetry_events').insert({
      visitor_id,
      session_id: session_id || null,
      event_name,
      page_path: page_path || '/',
      section_id: section_id || null,
      section_name: section_name || null,
      dwell_time_seconds: dwell_time_seconds || 0,
      metadata: metadata || null,
    })

    if (eventError) {
      console.error('Telemetry insert error:', eventError.message)
      return res.status(500).json({ error: 'Failed to record telemetry event' })
    }

    return res.status(200).json({ status: 'ok' })
  } catch (error) {
    console.error('Error recording telemetry:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * POST /api/inquiry
 * Ingests contact inquiries into dev_contact_inquiries and associates with dev_visitors
 */
app.post('/api/inquiry', async (req, res) => {
  try {
    const { visitor_id, session_id, name, email, phone, address, solution, requirements } = req.body

    if (!name || !email || !requirements) {
      return res.status(400).json({ error: 'Name, email, and requirements are required' })
    }

    const ip = getClientIp(req)
    const country = req.headers['cf-ipcountry'] || 'India'
    const city = req.headers['cf-ipcity'] || null
    const region = req.headers['cf-region'] || null
    const userAgent = req.headers['user-agent'] || null

    // 1. Insert into dev_contact_inquiries table
    const { data, error: inquiryError } = await supabase
      .from('dev_contact_inquiries')
      .insert({
        visitor_id: visitor_id || null,
        session_id: session_id || null,
        name,
        email,
        phone: phone || '',
        address: address || '',
        solution: solution || 'Other',
        requirements,
        ip_address: ip,
        city,
        region,
        country,
        user_agent: userAgent,
        status: 'new',
      })
      .select('id, created_at')
      .single()

    if (inquiryError) {
      console.error('Inquiry insert error:', inquiryError.message)
      return res.status(500).json({ error: 'Failed to process inquiry' })
    }

    // 2. Link visitor profile in dev_visitors if visitor_id is provided
    if (visitor_id) {
      await supabase
        .from('dev_visitors')
        .update({
          lead_name: name,
          lead_email: email,
          lead_phone: phone || null,
          lead_address: address || null,
          converted_at: new Date().toISOString(),
        })
        .eq('visitor_id', visitor_id)
    }

    // 3. Dispatch automated SMTP emails (Thank you to client & Alert to admin)
    sendInquiryEmails({
      ...req.body,
      ip_address: ip,
      city,
      country,
      region,
      submittedAt: data.created_at || new Date().toISOString(),
    }).catch((emailErr) => {
      console.warn('[server] SMTP email dispatch warning:', emailErr.message)
    })

    return res.status(201).json({ status: 'sent', inquiryId: data.id })
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return res.status(500).json({ error: 'Failed to process inquiry' })
  }
})

/**
 * POST /api/send-inquiry-email
 * Direct endpoint for frontend SMTP email dispatch
 */
app.post('/api/send-inquiry-email', async (req, res) => {
  try {
    const ip = getClientIp(req)
    const country = req.headers['cf-ipcountry'] || 'India'
    const city = req.headers['cf-ipcity'] || null

    const result = await sendInquiryEmails({
      ...req.body,
      ip_address: ip,
      city,
      country,
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error('Error sending inquiry emails:', error)
    return res.status(500).json({ error: error.message || 'Failed to dispatch email' })
  }
})

app.listen(port, () => {
  console.log(`🚀 Marvel Softwares Telemetry API running on port ${port} (Supabase backend, Tables: dev_*)`)
})

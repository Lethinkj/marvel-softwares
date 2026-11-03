/**
 * ====================================================================
 * MARVEL SOFTWARES — Example Telemetry & Inquiries Ingestion Server
 * (All tables use prefix: dev_)
 * ====================================================================
 * Connects to PostgreSQL and ingests telemetry packets and contact forms.
 *
 * Dependencies required to run:
 *   npm install express pg cors
 *
 * Environment variables:
 *   DATABASE_URL=postgres://postgres:password@localhost:5432/marvel_telemetry
 *   PORT=4000
 * ====================================================================
 */

import express from 'express'
import cors from 'cors'
import pkg from 'pg'
const { Pool } = pkg

const app = express()
const port = process.env.PORT || 4000

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/marvel_telemetry',
})

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
    await pool.query(
      `INSERT INTO dev_visitors (
        visitor_id, ip_address, country, region, city,
        device_type, browser, os, screen_resolution, language, referrer, last_seen
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      ON CONFLICT (visitor_id) DO UPDATE SET
        last_seen = NOW(),
        ip_address = COALESCE(EXCLUDED.ip_address, dev_visitors.ip_address),
        country = COALESCE(EXCLUDED.country, dev_visitors.country),
        city = COALESCE(EXCLUDED.city, dev_visitors.city);`,
      [
        visitor_id,
        ip,
        country,
        region,
        city,
        client_meta?.device_type || 'desktop',
        client_meta?.browser || 'Unknown',
        client_meta?.os || 'Unknown',
        client_meta?.screen_resolution || '',
        client_meta?.language || '',
        client_meta?.referrer || '',
      ],
    )

    // 2. Insert event in dev_telemetry_events
    await pool.query(
      `INSERT INTO dev_telemetry_events (
        visitor_id, session_id, event_name, page_path,
        section_id, section_name, dwell_time_seconds, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [
        visitor_id,
        session_id || null,
        event_name,
        page_path || '/',
        section_id || null,
        section_name || null,
        dwell_time_seconds || 0,
        metadata ? JSON.stringify(metadata) : null,
      ],
    )

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
    const result = await pool.query(
      `INSERT INTO dev_contact_inquiries (
        visitor_id, session_id, name, email, phone, address,
        solution, requirements, ip_address, city, region, country, user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, created_at;`,
      [
        visitor_id || null,
        session_id || null,
        name,
        email,
        phone || '',
        address || '',
        solution || 'Other',
        requirements,
        ip,
        city,
        region,
        country,
        userAgent,
      ],
    )

    // 2. Link visitor profile in dev_visitors if visitor_id is provided
    if (visitor_id) {
      await pool.query(
        `UPDATE dev_visitors SET
          lead_name = $1,
          lead_email = $2,
          lead_phone = $3,
          lead_address = $4,
          converted_at = NOW()
        WHERE visitor_id = $5;`,
        [name, email, phone || null, address || null, visitor_id],
      )
    }

    return res.status(201).json({ status: 'sent', inquiryId: result.rows[0].id })
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return res.status(500).json({ error: 'Failed to process inquiry' })
  }
})

app.listen(port, () => {
  console.log(`🚀 Marvel Softwares Telemetry API running on port ${port} (Tables: dev_*)`)
})

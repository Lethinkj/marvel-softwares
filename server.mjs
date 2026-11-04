/**
 * ==============================================================================
 * MARVEL SOFTWARES — Production Application & API Server
 * ==============================================================================
 * Serves the built Vite frontend and handles API endpoints, including
 * automated SMTP email dispatch for prospective client contact inquiries.
 *
 * Start with:
 *   node server.mjs
 *   or: npm start
 * ==============================================================================
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import { sendInquiryEmails, getSmtpConfig } from './server/emailService.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000
const DIST_DIR = path.resolve(__dirname, 'dist')

app.use(cors())
app.use(express.json())

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress || '127.0.0.1'
}

// Health check endpoint
app.get('/health', (_req, res) => {
  const cfg = getSmtpConfig()
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    smtp_configured: cfg.isConfigured,
    smtp_host: cfg.host || 'not_set',
  })
})

/**
 * POST /api/send-inquiry-email
 * Primary endpoint called by the contact form to dispatch:
 * 1. Thank-you / confirmation email to the client
 * 2. Lead notification email to the admin/sales team
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
    console.error('[server] Error sending inquiry email:', error)
    return res.status(500).json({ error: error.message || 'Failed to dispatch email' })
  }
})

/**
 * POST /api/inquiry
 * Alternative endpoint for combined inquiry processing
 */
app.post('/api/inquiry', async (req, res) => {
  try {
    const ip = getClientIp(req)
    const country = req.headers['cf-ipcountry'] || 'India'
    const city = req.headers['cf-ipcity'] || null

    const emailResult = await sendInquiryEmails({
      ...req.body,
      ip_address: ip,
      city,
      country,
    })

    return res.status(200).json({ status: 'sent', email: emailResult })
  } catch (error) {
    console.error('[server] Error processing inquiry:', error)
    return res.status(500).json({ error: error.message || 'Failed to process inquiry' })
  }
})

// Serve static assets from dist/ if it exists
if (fs.existsSync(DIST_DIR)) {
  app.use(
    express.static(DIST_DIR, {
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache')
        }
      },
    })
  )

  // SPA fallback
  app.use((_req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'))
  })
}

app.listen(PORT, () => {
  const cfg = getSmtpConfig()
  console.log(`🚀 Marvel Softwares Server running on http://localhost:${PORT}`)
  console.log(
    `📧 SMTP Mailer status: ${
      cfg.isConfigured
        ? `Configured (Host: ${cfg.host}, User: ${cfg.user})`
        : 'Not configured yet (Fill SMTP credentials in .env)'
    }`
  )
})

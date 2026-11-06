/**
 * ==============================================================================
 * MARVEL SOFTWARES — SMTP Email Dispatch Service
 * ==============================================================================
 * Sends two emails upon contact form submission:
 * 1. Professional HTML Confirmation & Thank-You email to the prospective client
 * 2. Instant Lead Notification email to the Marvel Softwares Admin / Sales team
 *
 * Configured via .env:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 *   SMTP_FROM_NAME, SMTP_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL
 * ==============================================================================
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')

// Simple .env parser to ensure environment variables are available
// even if process was started without --env-file
function loadEnvFallback() {
  const envPath = path.resolve(PROJECT_ROOT, '.env')
  if (!fs.existsSync(envPath)) return

  try {
    const content = fs.readFileSync(envPath, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue

      const key = trimmed.slice(0, eqIdx).trim()
      let val = trimmed.slice(eqIdx + 1).trim()

      // Strip surrounding quotes
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }

      if (!(key in process.env)) {
        process.env[key] = val
      }
    }
  } catch (err) {
    console.warn('[emailService] Warning: Could not read .env file:', err.message)
  }
}

// Load env variables at module initialization
loadEnvFallback()

/**
 * Get current SMTP Configuration from process.env
 */
export function getSmtpConfig() {
  loadEnvFallback()

  const host = process.env.SMTP_HOST || ''
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const secure = process.env.SMTP_SECURE === 'true' || port === 465
  const user = process.env.SMTP_USER || ''
  const pass = process.env.SMTP_PASS || ''
  const fromName = process.env.SMTP_FROM_NAME || 'MARVEL SOFTWARES'
  const fromEmail = process.env.SMTP_FROM_EMAIL || user || 'sales@marvelsoftwares.in'
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'sales@marvelsoftwares.in'

  const isConfigured = Boolean(host && user && pass)

  return {
    host,
    port,
    secure,
    user,
    pass,
    fromName,
    fromEmail,
    adminEmail,
    isConfigured,
  }
}

/**
 * Escape HTML to prevent XSS in email templates
 */
function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Generate User Confirmation / Thank You HTML Email
 */
export function renderUserConfirmationEmail(inquiry) {
  const isBuild = inquiry.source === 'build-configurator'
  const name = escapeHtml(inquiry.name || 'Valued Client')
  const solution = escapeHtml(inquiry.solution || 'Custom Software Solution')
  const phone = escapeHtml(inquiry.phone || 'Not provided')
  const address = escapeHtml(inquiry.address || 'Not specified')
  const requirements = escapeHtml(inquiry.requirements || 'No additional details provided.')
  const year = new Date().getFullYear()
  const summaryTitle = isBuild ? 'Your Build Configuration' : 'Summary of Your Inquiry'
  const leadText = isBuild
    ? 'Thank you — we have successfully received your <strong>Build &amp; Price</strong> request.'
    : 'Thank you for reaching out to <strong>Marvel Softwares</strong>. We have successfully received your consultation inquiry.'
  const secondLead = isBuild
    ? 'Our engineering team is reviewing the exact configuration you selected. <strong>Our team will contact you soon</strong> with a tailored written quote and next steps.'
    : 'Our engineering and project advisory team is currently reviewing your project requirements. One of our technical leads will get in touch with you shortly to discuss your vision, architecture, and timeline.'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Marvel Softwares</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f1f5f9;
      padding: 30px 10px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 51, 160, 0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0033A0 0%, #0057E7 100%);
      padding: 32px 30px;
      text-align: center;
    }
    .header-logo {
      max-width: 170px;
      height: auto;
      display: inline-block;
      margin-bottom: 12px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    }
    .header-title {
      color: #ffffff;
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .header-tagline {
      color: #cbd5e1;
      margin: 6px 0 0;
      font-size: 13px;
      letter-spacing: 0.03em;
    }
    .content {
      padding: 36px 32px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 700;
      color: #0033A0;
      margin: 0 0 16px;
    }
    .lead-text {
      font-size: 15px;
      line-height: 1.6;
      color: #334155;
      margin: 0 0 24px;
    }
    .summary-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #0057E7;
      border-radius: 10px;
      padding: 20px 22px;
      margin: 0 0 26px;
    }
    .summary-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #0057E7;
      margin: 0 0 14px;
    }
    .summary-item {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 1.5;
    }
    .summary-label {
      color: #64748b;
      font-weight: 600;
      display: inline-block;
      min-width: 130px;
    }
    .summary-value {
      color: #0f172a;
      font-weight: 600;
    }
    .message-box {
      margin-top: 14px;
      padding: 12px 14px;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 13.5px;
      line-height: 1.55;
      color: #1e293b;
      white-space: pre-wrap;
    }
    .help-banner {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 10px;
      padding: 18px 20px;
      margin: 0 0 28px;
    }
    .help-title {
      color: #1e40af;
      font-size: 14px;
      font-weight: 700;
      margin: 0 0 6px;
    }
    .help-text {
      font-size: 13.5px;
      color: #1e3a8a;
      margin: 0;
      line-height: 1.5;
    }
    .help-link {
      color: #0057E7;
      font-weight: 600;
      text-decoration: none;
    }
    .signoff {
      font-size: 14.5px;
      color: #334155;
      line-height: 1.6;
      border-top: 1px solid #f1f5f9;
      padding-top: 20px;
    }
    .footer {
      background-color: #0f172a;
      padding: 24px 20px;
      text-align: center;
      color: #94a3b8;
      font-size: 12px;
      line-height: 1.6;
    }
    .footer a {
      color: #60a5fa;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- HEADER -->
      <div class="header">
        <img src="cid:marvelsoftwareslogo" alt="MARVEL SOFTWARES" class="header-logo" />
        <h1 class="header-title">Marvel Softwares</h1>
        <p class="header-tagline">Innovative Software &amp; Enterprise Solutions</p>
      </div>

      <!-- BODY CONTENT -->
      <div class="content">
        <p class="greeting">Dear ${name},</p>
        <p class="lead-text">
          ${leadText}
        </p>
        <p class="lead-text">
          ${secondLead}
        </p>

        <!-- SUBMITTED INQUIRY RECAP -->
        <div class="summary-card">
          <div class="summary-title">${summaryTitle}</div>
          <div class="summary-item">
            <span class="summary-label">${isBuild ? 'Your Build:' : 'Requested Solution:'}</span>
            <span class="summary-value" style="color: #0057E7;">${solution}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Contact Number:</span>
            <span class="summary-value">${phone}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Location / Address:</span>
            <span class="summary-value">${address}</span>
          </div>
          <div style="margin-top: 10px;">
            <span class="summary-label" style="display: block; margin-bottom: 4px;">Project Scope &amp; Details:</span>
            <div class="message-box">${requirements}</div>
          </div>
        </div>

        <!-- CONTACT DETAILS -->
        <div class="help-banner">
          <div class="help-title">Need Urgent Assistance?</div>
          <p class="help-text">
            If your requirement is time-sensitive, feel free to call our direct line:
            <br>
            📞 <a href="tel:+918088218609" class="help-link">+91 8088218609</a> / <a href="tel:+918903711003" class="help-link">+91 8903711003</a>
            <br>
            ✉️ Email: <a href="mailto:sales@marvelsoftwares.in" class="help-link">sales@marvelsoftwares.in</a>
          </p>
        </div>

        <!-- FORMAL SIGN-OFF -->
        <div class="signoff">
          Warm regards,<br>
          <strong style="color: #0033A0; font-size: 15px;">The Team at Marvel Softwares</strong><br>
          <span style="color: #64748b; font-size: 13px;">Engineering Scalable &amp; High-Performance Solutions</span>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p style="margin: 0 0 6px;">
          © ${year} Marvel Softwares. All rights reserved.
        </p>
        <p style="margin: 0;">
          <a href="https://marvelsoftwares.in">marvelsoftwares.in</a> &bull; Coimbatore &amp; Bangalore, India
        </p>
        <p style="margin: 8px 0 0; font-size: 11px; color: #64748b;">
          This is an automated confirmation sent because an inquiry was submitted with this email address.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`

  const text = `Dear ${inquiry.name || 'Valued Client'},

${isBuild ? 'Thank you — we have received your Build & Price request.\n\nOur engineering team is reviewing the exact configuration you selected. Our team will contact you soon with a tailored written quote.' : 'Thank you for reaching out to Marvel Softwares. We have successfully received your inquiry and our engineering team is reviewing your requirements.\n\nWe will contact you shortly to discuss your project in detail.'}

Summary of Your Submission:
- ${isBuild ? 'Your Build' : 'Solution Requested'}: ${inquiry.solution || 'Custom Software Solution'}
- Contact Number: ${inquiry.phone || 'Not provided'}
- Location: ${inquiry.address || 'Not specified'}
- Requirements:
${inquiry.requirements || 'N/A'}

Need urgent assistance?
Call us: +91 8088218609 / +91 8903711003
Email: sales@marvelsoftwares.in
Website: https://marvelsoftwares.in

Warm regards,
Marvel Softwares Team
https://marvelsoftwares.in
`

  return { html, text }
}

/**
 * Generate Admin Notification HTML Email
 */
export function renderAdminNotificationEmail(inquiry) {
  const isBuild = inquiry.source === 'build-configurator'
  const name = escapeHtml(inquiry.name || 'Anonymous')
  const email = escapeHtml(inquiry.email || 'N/A')
  const phone = escapeHtml(inquiry.phone || 'Not provided')
  const address = escapeHtml(inquiry.address || 'Not specified')
  const solution = escapeHtml(inquiry.solution || 'General Inquiry')
  const requirements = escapeHtml(inquiry.requirements || 'No details entered.')
  const ip = escapeHtml(inquiry.ip_address || 'Unknown')
  const city = escapeHtml(inquiry.city || '')
  const country = escapeHtml(inquiry.country || '')
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  })

  const geoString = [city, country].filter(Boolean).join(', ')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Received - Marvel Softwares</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
    }
    .wrapper {
      width: 100%;
      background-color: #f1f5f9;
      padding: 30px 10px;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid #cbd5e1;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08);
    }
    .banner {
      background: #0033A0;
      padding: 24px 28px;
      color: #ffffff;
    }
    .badge {
      display: inline-block;
      background: #FFB300;
      color: #0f172a;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 9999px;
      margin-bottom: 10px;
    }
    .banner-title {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
    .body {
      padding: 28px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 22px;
    }
    .table td {
      padding: 10px 12px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
    }
    .label {
      color: #64748b;
      font-weight: 600;
      width: 130px;
    }
    .val {
      color: #0f172a;
      font-weight: 600;
    }
    .msg-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #FFB300;
      border-radius: 6px;
      padding: 14px 16px;
      font-size: 14px;
      line-height: 1.6;
      color: #1e293b;
      white-space: pre-wrap;
      margin-bottom: 24px;
    }
    .btn-row {
      margin-top: 10px;
    }
    .btn {
      display: inline-block;
      background: #0057E7;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 600;
      font-size: 13.5px;
      padding: 10px 18px;
      border-radius: 8px;
      margin-right: 10px;
      margin-bottom: 8px;
    }
    .btn-alt {
      background: #0f172a;
    }
    .footer-admin {
      background: #f8fafc;
      padding: 16px 28px;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="banner">
        <span class="badge">${isBuild ? 'Build & Price Request' : 'New Contact Inquiry'}</span>
        <h1 class="banner-title">${isBuild ? '🛠️ New Build Quote Request — Action Needed' : '⚡ Response Received from Website'}</h1>
        <p style="margin: 6px 0 0; color: #93c5fd; font-size: 13px;">
          Submitted at ${submittedAt} (IST)
        </p>
      </div>

      <div class="body">
        <table class="table">
          <tr>
            <td class="label">Client Name:</td>
            <td class="val">${name}</td>
          </tr>
          <tr>
            <td class="label">Client Email:</td>
            <td class="val"><a href="mailto:${email}" style="color: #0057E7;">${email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone:</td>
            <td class="val"><a href="tel:${phone}" style="color: #0057E7;">${phone}</a></td>
          </tr>
          <tr>
            <td class="label">Location / Address:</td>
            <td class="val">${address}</td>
          </tr>
          <tr>
            <td class="label">${isBuild ? 'Your Build:' : 'Requested Solution:'}</td>
            <td class="val" style="color: #0033A0;">${solution}</td>
          </tr>
          ${isBuild ? '<tr><td class="label">Request Type:</td><td class="val" style="color:#b45309;">Build &amp; Price Configurator (/build)</td></tr>' : ''}
          <tr>
            <td class="label">IP / Location:</td>
            <td class="val" style="font-size: 12.5px; color: #64748b;">${ip}${geoString ? ` (${geoString})` : ''}</td>
          </tr>
        </table>

        <div style="font-weight: 700; font-size: 13px; text-transform: uppercase; color: #475569; margin-bottom: 8px;">
          Client Requirements / Message:
        </div>
        <div class="msg-box">${requirements}</div>

        <div class="btn-row">
          <a href="mailto:${email}?subject=Re:%20Inquiry%20regarding%20${encodeURIComponent(inquiry.solution || 'Project')}%20-%20Marvel%20Softwares" class="btn">
            ✉️ Reply to ${name}
          </a>
          ${inquiry.phone ? `<a href="tel:${inquiry.phone}" class="btn btn-alt">📞 Call Client</a>` : ''}
          <a href="https://marvelsoftwares.in/admin" class="btn btn-alt">
            📊 View Admin Portal
          </a>
        </div>
      </div>

      <div class="footer-admin">
        This is an automated notification from Marvel Softwares website consultation system.
      </div>
    </div>
  </div>
</body>
</html>`

  const text = `${isBuild ? '[NEW BUILD & PRICE QUOTE REQUEST]' : '[NEW CONTACT INQUIRY RECEIVED]'}
Time: ${submittedAt} (IST)

Client Details:
- Name: ${inquiry.name || 'Anonymous'}
- Email: ${inquiry.email || 'N/A'}
- Phone: ${inquiry.phone || 'N/A'}
- Location: ${inquiry.address || 'N/A'}
- Service: ${inquiry.solution || 'General'}${isBuild ? '\n- Source: Build & Price Configurator (/build)' : ''}
- IP / Location: ${inquiry.ip_address || 'Unknown'} (${geoString || 'N/A'})

Message / Requirements:
${inquiry.requirements || 'No details provided.'}

---
Marvel Softwares System
`

  return { html, text }
}

/**
 * Creates Nodemailer Transporter
 */
function createTransporter(cfg) {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: {
      user: cfg.user,
      pass: cfg.pass,
    },
    // Useful defaults for modern email providers
    tls: {
      rejectUnauthorized: false,
    },
  })
}

/**
 * Dispatches both User Confirmation and Admin Notification emails
 * @param {object} inquiry
 * @returns {Promise<{ success: boolean, skipped?: boolean, error?: string, userMessageId?: string, adminMessageId?: string }>}
 */
export async function sendInquiryEmails(inquiry) {
  const cfg = getSmtpConfig()

  if (!cfg.isConfigured) {
    console.warn(
      '[SMTP] Email dispatch skipped: SMTP credentials are not yet configured in .env (Set SMTP_HOST, SMTP_USER, SMTP_PASS).'
    )
    return {
      success: false,
      skipped: true,
      message: 'SMTP credentials not configured in .env',
    }
  }

  // Ensure recipient email exists
  if (!inquiry || !inquiry.email) {
    console.warn('[SMTP] Email dispatch skipped: No client email provided in inquiry.')
    return {
      success: false,
      skipped: true,
      message: 'No client email provided',
    }
  }

  const transporter = createTransporter(cfg)

  // Attach logo if it exists on disk
  const logoPath = path.resolve(PROJECT_ROOT, 'public/marvel-softwares-logo-horizontal.png')
  const logoExists = fs.existsSync(logoPath)

  const commonAttachments = logoExists
    ? [
        {
          filename: 'marvel-softwares-logo.png',
          path: logoPath,
          cid: 'marvelsoftwareslogo',
        },
      ]
    : []

  const isBuildInquiry = inquiry.source === 'build-configurator'
  const userTemplates = renderUserConfirmationEmail(inquiry)
  const adminTemplates = renderAdminNotificationEmail(inquiry)

  const fromHeader = `"${cfg.fromName}" <${cfg.fromEmail}>`

  const results = {
    success: true,
    userMessageId: null,
    adminMessageId: null,
    errors: [],
  }

  // 1. Send Thank You email to User
  try {
    const userMailOptions = {
      from: fromHeader,
      to: inquiry.email,
      replyTo: cfg.adminEmail,
      subject: isBuildInquiry
        ? 'Your Marvel Softwares build request — what happens next'
        : `Thank you for contacting Marvel Softwares`,
      text: userTemplates.text,
      html: userTemplates.html,
      attachments: commonAttachments,
    }

    const userRes = await transporter.sendMail(userMailOptions)
    results.userMessageId = userRes.messageId
    console.log(`[SMTP] ✅ Confirmation email sent to user: ${inquiry.email} (ID: ${userRes.messageId})`)
  } catch (userErr) {
    console.error('[SMTP] ❌ Failed to send confirmation email to user:', userErr.message)
    results.errors.push({ target: 'user', error: userErr.message })
  }

  // 2. Send Notification email to Admin
  try {
    const adminMailOptions = {
      from: fromHeader,
      to: cfg.adminEmail,
      replyTo: inquiry.email,
      subject: isBuildInquiry
        ? `🛠️ New Build Quote Request: ${inquiry.name || 'Prospect'} (${inquiry.solution || 'Build'})`
        : `🔔 New Project Inquiry: ${inquiry.name || 'Prospect'} (${inquiry.solution || 'General'})`,
      text: adminTemplates.text,
      html: adminTemplates.html,
      attachments: commonAttachments,
    }

    const adminRes = await transporter.sendMail(adminMailOptions)
    results.adminMessageId = adminRes.messageId
    console.log(`[SMTP] ✅ Lead notification email sent to admin: ${cfg.adminEmail} (ID: ${adminRes.messageId})`)
  } catch (adminErr) {
    console.error('[SMTP] ❌ Failed to send notification email to admin:', adminErr.message)
    results.errors.push({ target: 'admin', error: adminErr.message })
  }

  if (results.errors.length > 0 && !results.userMessageId && !results.adminMessageId) {
    results.success = false
  }

  return results
}

export default sendInquiryEmails

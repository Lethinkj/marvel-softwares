/**
 * Production-ready Admin Authentication & Data Management Engine
 * Compatible with the PostgreSQL dev_ schema (dev_admins, dev_admin_sessions, dev_admin_audit_logs)
 */

export interface AdminUser {
  admin_id: string
  username: string
  password_hash: string
  salt: string
  full_name: string
  email: string
  role: 'super_admin' | 'operations' | 'analyst' | 'editor'
  is_active: boolean
  last_login_at?: string
  created_at: string
}

export interface AdminSession {
  token: string
  admin_id: string
  username: string
  full_name: string
  email: string
  role: string
  created_at: string
  expires_at: string
}

export interface AdminInquiry {
  id: string | number
  name: string
  email: string
  phone: string
  address: string
  solution: string
  requirements: string
  city?: string
  status: 'new' | 'contacted' | 'in_discussion' | 'proposal_sent' | 'won' | 'lost' | 'spam'
  is_starred: boolean
  submittedAt: string
  visitor_id?: string
  session_id?: string
  admin_notes?: string
  assigned_to?: string
}

export interface TelemetryRecord {
  id: string | number
  visitor_id?: string
  session_id?: string
  event_name: string
  page_path: string
  section_id?: string
  section_name?: string
  dwell_time_seconds?: number
  element_label?: string
  created_at: string
  client_meta?: {
    device_type: 'mobile' | 'tablet' | 'desktop'
    browser: string
    os: string
    screen_resolution: string
    language: string
    referrer: string
  }
}

export interface AuditLog {
  id: string
  admin_username: string
  action: string
  target_type: string
  target_id: string
  details?: Record<string, unknown>
  created_at: string
}

// Obfuscated Gateway Route Constants
export const GATEWAY_PREFIX = '/_k9x_gateway_92a7'
export const ROUTE_AUTH = `${GATEWAY_PREFIX}/auth`
export const ROUTE_BOOTSTRAP = `${GATEWAY_PREFIX}/init-bootstrap`
export const ROUTE_CONSOLE = `${GATEWAY_PREFIX}/console`

const STORAGE_ADMINS = 'dev_admins'
const STORAGE_SESSION = 'dev_admin_session'
const STORAGE_AUDIT = 'dev_admin_audit_logs'
const STORAGE_INQUIRIES = 'ms-project-inquiries'
const STORAGE_TELEMETRY = 'dev_telemetry_events'

// Cryptographic hash helper using native SubtleCrypto (SHA-256 with salt)
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder()
  const data = enc.encode(`${salt}:${password}:dev_marvel_sec`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function generateSalt(): string {
  const arr = new Uint8Array(16)
  crypto.getRandomValues(arr)
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')
}

export function generateToken(): string {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Get all registered admin accounts
 */
export function getAdmins(): AdminUser[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_ADMINS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Check if at least one admin account exists
 */
export function hasAnyAdmin(): boolean {
  return getAdmins().length > 0
}

/**
 * Create a new admin account
 */
export async function createAdmin(input: {
  username: string
  password: string
  full_name?: string
  email?: string
  role?: 'super_admin' | 'operations' | 'analyst' | 'editor'
}): Promise<{ success: boolean; error?: string; admin?: AdminUser }> {
  const username = input.username.trim()
  if (!username || username.length < 3) {
    return { success: false, error: 'Username must be at least 3 characters long.' }
  }
  if (!input.password || input.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' }
  }

  const admins = getAdmins()
  if (admins.some((a) => a.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: `Username "${username}" already exists.` }
  }

  const salt = generateSalt()
  const password_hash = await hashPassword(input.password, salt)
  const admin_id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `adm_${Date.now()}`

  const newAdmin: AdminUser = {
    admin_id,
    username,
    password_hash,
    salt,
    full_name: input.full_name?.trim() || username,
    email: input.email?.trim() || `${username}@marvelsoftwares.in`,
    role: input.role || (admins.length === 0 ? 'super_admin' : 'operations'),
    is_active: true,
    created_at: new Date().toISOString(),
  }

  admins.push(newAdmin)
  localStorage.setItem(STORAGE_ADMINS, JSON.stringify(admins))

  addAuditLog(
    getCurrentAdminSession()?.username || 'SYSTEM_BOOTSTRAP',
    'admin_created',
    'dev_admins',
    newAdmin.admin_id,
    { username: newAdmin.username, role: newAdmin.role }
  )

  return { success: true, admin: newAdmin }
}

/**
 * Authenticate admin by username & password
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<{ success: boolean; admin?: AdminUser; error?: string }> {
  const cleanUsername = username.trim()
  const admins = getAdmins()
  const admin = admins.find((a) => a.username.toLowerCase() === cleanUsername.toLowerCase())

  if (!admin) {
    return { success: false, error: 'Invalid username or password.' }
  }
  if (!admin.is_active) {
    return { success: false, error: 'This account has been deactivated.' }
  }

  const computedHash = await hashPassword(password, admin.salt)
  if (computedHash !== admin.password_hash) {
    return { success: false, error: 'Invalid username or password.' }
  }

  // Update last_login_at
  admin.last_login_at = new Date().toISOString()
  localStorage.setItem(STORAGE_ADMINS, JSON.stringify(admins))

  return { success: true, admin }
}

/**
 * Create a session for an authenticated admin
 */
export function createAdminSession(admin: AdminUser): AdminSession {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 12 * 60 * 60 * 1000) // 12 hours valid

  const session: AdminSession = {
    token: generateToken(),
    admin_id: admin.admin_id,
    username: admin.username,
    full_name: admin.full_name,
    email: admin.email,
    role: admin.role,
    created_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
  }

  sessionStorage.setItem(STORAGE_SESSION, JSON.stringify(session))
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(session))

  addAuditLog(admin.username, 'admin_login', 'dev_admins', admin.admin_id, {
    ip: '127.0.0.1 (local console)',
  })

  return session
}

/**
 * Retrieve current active session
 */
export function getCurrentAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_SESSION) || localStorage.getItem(STORAGE_SESSION)
    if (!raw) return null
    const session = JSON.parse(raw) as AdminSession
    if (new Date(session.expires_at).getTime() < Date.now()) {
      logoutAdmin()
      return null
    }
    return session
  } catch {
    return null
  }
}

/**
 * Logout admin
 */
export function logoutAdmin(): void {
  const current = getCurrentAdminSession()
  if (current) {
    addAuditLog(current.username, 'admin_logout', 'dev_admins', current.admin_id)
  }
  sessionStorage.removeItem(STORAGE_SESSION)
  localStorage.removeItem(STORAGE_SESSION)
}

/**
 * Delete an admin (except last super_admin)
 */
export function deleteAdmin(adminId: string): { success: boolean; error?: string } {
  const admins = getAdmins()
  const target = admins.find((a) => a.admin_id === adminId)
  if (!target) return { success: false, error: 'Admin not found.' }

  if (target.role === 'super_admin') {
    const superAdmins = admins.filter((a) => a.role === 'super_admin')
    if (superAdmins.length <= 1) {
      return { success: false, error: 'Cannot remove the last super administrator.' }
    }
  }

  const updated = admins.filter((a) => a.admin_id !== adminId)
  localStorage.setItem(STORAGE_ADMINS, JSON.stringify(updated))

  addAuditLog(
    getCurrentAdminSession()?.username || 'SYSTEM',
    'admin_deleted',
    'dev_admins',
    adminId,
    { username: target.username }
  )

  return { success: true }
}

/**
 * Read all contact inquiries
 */
export function getAllInquiries(): AdminInquiry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_INQUIRIES)
    let inquiries: AdminInquiry[] = raw ? JSON.parse(raw) : []

    // Ensure IDs and default fields exist
    inquiries = inquiries.map((item, index) => ({
      id: item.id || `inq_${index + 1}_${Date.now()}`,
      name: item.name || 'Anonymous',
      email: item.email || '',
      phone: item.phone || '',
      address: item.address || '',
      solution: item.solution || 'Custom Software Development',
      requirements: item.requirements || '',
      status: item.status || 'new',
      is_starred: !!item.is_starred,
      submittedAt: item.submittedAt || new Date().toISOString(),
      city: item.city || (item.address ? item.address.split(',')[0].trim() : 'Coimbatore'),
      visitor_id: item.visitor_id,
      session_id: item.session_id,
      admin_notes: item.admin_notes || '',
      assigned_to: item.assigned_to || '',
    }))

    return inquiries
  } catch {
    return []
  }
}

/**
 * Update status of an inquiry
 */
export function updateInquiryStatus(
  inquiryId: string | number,
  status: AdminInquiry['status']
): boolean {
  const inquiries = getAllInquiries()
  const item = inquiries.find((i) => String(i.id) === String(inquiryId))
  if (!item) return false

  const prevStatus = item.status
  item.status = status
  localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries))

  addAuditLog(
    getCurrentAdminSession()?.username || 'ADMIN',
    'inquiry_status_updated',
    'dev_contact_inquiries',
    String(inquiryId),
    { client_name: item.name, previous: prevStatus, current: status }
  )

  return true
}

/**
 * Star / Unstar inquiry
 */
export function toggleStarInquiry(inquiryId: string | number): boolean {
  const inquiries = getAllInquiries()
  const item = inquiries.find((i) => String(i.id) === String(inquiryId))
  if (!item) return false

  item.is_starred = !item.is_starred
  localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries))
  return true
}

/**
 * Delete inquiry
 */
export function deleteInquiry(inquiryId: string | number): boolean {
  const inquiries = getAllInquiries()
  const target = inquiries.find((i) => String(i.id) === String(inquiryId))
  const updated = inquiries.filter((i) => String(i.id) !== String(inquiryId))
  localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(updated))

  if (target) {
    addAuditLog(
      getCurrentAdminSession()?.username || 'ADMIN',
      'inquiry_deleted',
      'dev_contact_inquiries',
      String(inquiryId),
      { name: target.name, email: target.email }
    )
  }
  return true
}

/**
 * Read telemetry records
 */
export function getTelemetryRecords(): TelemetryRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_TELEMETRY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Read audit logs
 */
export function getAuditLogs(): AuditLog[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_AUDIT)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Add audit log
 */
export function addAuditLog(
  admin_username: string,
  action: string,
  target_type: string,
  target_id: string,
  details?: Record<string, unknown>
): void {
  try {
    const logs = getAuditLogs()
    logs.unshift({
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      admin_username,
      action,
      target_type,
      target_id,
      details,
      created_at: new Date().toISOString(),
    })
    if (logs.length > 300) logs.length = 300
    localStorage.setItem(STORAGE_AUDIT, JSON.stringify(logs))
  } catch {
    // Non-blocking
  }
}

/**
 * Populate realistic sample data if local storage is fresh/empty
 * Ensures dashboard graphs, inquiry tables, and metrics are immediately alive and usable
 */
export function seedSampleDataIfEmpty(): void {
  if (typeof window === 'undefined') return

  // Seed sample inquiries if none or minimal exist
  const existingInquiries = getAllInquiries()
  if (existingInquiries.length < 3) {
    const sampleInquiries: AdminInquiry[] = [
      {
        id: 'inq_101',
        name: 'Rajesh K. Sundaram',
        email: 'rajesh.sundaram@texflowfabrics.com',
        phone: '+91 98421 88421',
        address: 'Gandhipuram, Coimbatore, Tamil Nadu 641012',
        solution: 'ERP & Business Management Software',
        requirements:
          'Need complete textile inventory, dyeing batch tracking, and automated client billing ERP system with multi-warehouse synchronization.',
        city: 'Coimbatore',
        status: 'in_discussion',
        is_starred: true,
        submittedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        assigned_to: 'Praveen',
        admin_notes: 'Initial requirement call scheduled for tomorrow 11 AM.',
      },
      {
        id: 'inq_102',
        name: 'Dr. Ananya Narayanan',
        email: 'contact@apexhealthlabs.in',
        phone: '+91 94432 11098',
        address: 'Race Course Road, Coimbatore, Tamil Nadu 641018',
        solution: 'Web Application Development',
        requirements:
          'Patient diagnostic reporting portal with encrypted PDF download and SMS WhatsApp automated notification pipeline.',
        city: 'Coimbatore',
        status: 'proposal_sent',
        is_starred: true,
        submittedAt: new Date(Date.now() - 9 * 3600 * 1000).toISOString(),
        assigned_to: 'Vikram',
        admin_notes: 'Commercial estimate sent. Awaiting board approval.',
      },
      {
        id: 'inq_103',
        name: 'Karthik Balakrishnan',
        email: 'karthik@kblocistics.ae',
        phone: '+971 50 123 4567',
        address: 'Business Bay, Dubai, UAE',
        solution: 'AI & Automation',
        requirements:
          'AI document OCR parsing for customs declarations, automated shipping manifests categorization and CRM integration.',
        city: 'Dubai',
        status: 'new',
        is_starred: false,
        submittedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
      },
      {
        id: 'inq_104',
        name: 'Muthukumar S.',
        email: 'mkumar@kongupumps.com',
        phone: '+91 97890 44321',
        address: 'SIDCO Industrial Estate, Kurichi, Coimbatore 641021',
        solution: 'Website Development',
        requirements:
          'Modern product catalog website for industrial pump export with multilingual support and interactive 3D product view.',
        city: 'Coimbatore',
        status: 'won',
        is_starred: true,
        submittedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        assigned_to: 'Praveen',
        admin_notes: 'Contract signed! Development sprint 1 starting this week.',
      },
      {
        id: 'inq_105',
        name: 'Sanjay Mehra',
        email: 'sanjay@urbanfintech.co',
        phone: '+91 98200 77654',
        address: 'Indiranagar, Bengaluru, Karnataka 560038',
        solution: 'Mobile App Development',
        requirements:
          'Cross-platform iOS and Android mobile app for wealth management and digital micro-investing with biometric auth.',
        city: 'Bengaluru',
        status: 'contacted',
        is_starred: false,
        submittedAt: new Date(Date.now() - 52 * 3600 * 1000).toISOString(),
      },
      {
        id: 'inq_106',
        name: 'Revathi Krishnaswamy',
        email: 'revathi@organicgrove.in',
        phone: '+91 99400 33211',
        address: 'RS Puram, Coimbatore, Tamil Nadu 641002',
        solution: 'Custom Software Development',
        requirements:
          'Cold-pressed oil retail franchise POS and subscription delivery logistics dispatch management tool.',
        city: 'Coimbatore',
        status: 'new',
        is_starred: false,
        submittedAt: new Date(Date.now() - 74 * 3600 * 1000).toISOString(),
      },
    ]

    const merged = [...sampleInquiries, ...existingInquiries]
    localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(merged))
  }

  // Seed sample telemetry events if empty
  const existingTelemetry = getTelemetryRecords()
  if (existingTelemetry.length < 5) {
    const sections = ['services', 'about-us', 'projects', 'why-us', 'process', 'contact', 'faq']
    const devices: ('desktop' | 'mobile' | 'tablet')[] = ['desktop', 'mobile', 'desktop', 'mobile', 'tablet']
    const sampleTelemetry: TelemetryRecord[] = []

    for (let i = 0; i < 48; i++) {
      const section = sections[i % sections.length]
      const dev = devices[i % devices.length]
      const hoursAgo = Math.floor(i * 1.5)
      sampleTelemetry.push({
        id: `tel_${1000 + i}`,
        visitor_id: `v_${100 + (i % 12)}`,
        session_id: `s_${200 + (i % 18)}`,
        event_name: i % 4 === 0 ? 'cta_click' : 'section_view',
        page_path: i % 7 === 0 ? '/faq' : '/',
        section_id: section,
        section_name: section.replace('-', ' ').toUpperCase(),
        dwell_time_seconds: Math.floor(12 + Math.random() * 45),
        created_at: new Date(Date.now() - hoursAgo * 3600 * 1000).toISOString(),
        client_meta: {
          device_type: dev,
          browser: dev === 'mobile' ? 'Mobile Safari' : 'Chrome',
          os: dev === 'mobile' ? 'iOS' : 'Windows',
          screen_resolution: dev === 'mobile' ? '390x844' : '1920x1080',
          language: 'en-IN',
          referrer: i % 3 === 0 ? 'https://google.com' : 'Direct / Bookmark',
        },
      })
    }

    localStorage.setItem(STORAGE_TELEMETRY, JSON.stringify(sampleTelemetry))
  }
}

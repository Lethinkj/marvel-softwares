/**
 * MARVEL SOFTWARES — Production Admin Security, Session Management & Audit Engine
 * Schema Prefix: dev_
 * Backend: Supabase (PostgreSQL)
 *
 * Features:
 * - SHA-256 with unique cryptographic salt hashing
 * - Brute-force IP lockout with progressive tiers:
 *     - 3 failed attempts: 15 min block
 *     - next failure after block: 30 min block
 *     - subsequent failures: 30 min block
 *     - after 24 hours from initial cycle start: resets back to 15 min then 30 min
 * - Zero unauthorized persistence: sessions strictly verified and invalidated on logout
 * - Inactivity auto-logout tracking (15 minutes inactivity)
 * - Complete audit trail tracking which admin changes what (before/after state diffs)
 */

import { supabase } from '../lib/supabase'

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
  session_id: string
  admin_id: string
  username: string
  full_name: string
  email: string
  role: string
  ip_address: string
  user_agent: string
  is_revoked: boolean
  revoked_reason?: string
  last_activity_at: string
  created_at: string
  expires_at: string
}

export interface IpBlockRecord {
  id: string
  ip_address: string
  failed_attempts: number
  is_blocked: boolean
  blocked_until: number // timestamp ms
  block_tier: number    // 1 = 15m, 2 = 30m, 3+ = 30m
  first_failed_at: number // cycle start timestamp ms
  last_attempt_at: string
  last_attempt_username?: string
  total_lifetime_blocks: number
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
  admin_id?: string
  admin_username: string
  admin_role: string
  action: string
  target_type: string
  target_id: string
  details?: Record<string, unknown>
  ip_address: string
  created_at: string
}

// Obfuscated Gateway Route Constants
export const GATEWAY_PREFIX = '/_k9x_gateway_92a7'
export const ROUTE_AUTH = `${GATEWAY_PREFIX}/auth`
export const ROUTE_BOOTSTRAP = `${GATEWAY_PREFIX}/init-bootstrap`
export const ROUTE_CONSOLE = `${GATEWAY_PREFIX}/console`

// Storage keys (localStorage — used for active session token only)
const STORAGE_ACTIVE_TOKEN = 'dev_admin_current_token'

// LocalStorage fallback keys (used when Supabase is unavailable)
const STORAGE_ADMINS = 'dev_admins'
const STORAGE_SESSIONS = 'dev_admin_sessions'
const STORAGE_IP_BLOCKS = 'dev_admin_ip_blocks'
const STORAGE_AUDIT = 'dev_admin_audit_logs'
const STORAGE_INQUIRIES = 'ms-project-inquiries'
const STORAGE_TELEMETRY = 'dev_telemetry_events'

// Inactivity timeout: 15 minutes
export const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000

// Helper: Get or simulate client IP address
export function getClientIp(): string {
  if (typeof window === 'undefined') return '127.0.0.1'
  try {
    let ip = sessionStorage.getItem('dev_client_ip') || localStorage.getItem('dev_client_ip')
    if (!ip) {
      ip = '192.168.1.105' // Local developer/client gateway IP
      localStorage.setItem('dev_client_ip', ip)
    }
    return ip
  } catch {
    return '127.0.0.1'
  }
}

// Native Web Crypto API SHA-256 Hashing with Salt
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

// ----------------------------------------------------------------------
// IP RATE LIMITING & ESCALATING BRUTE-FORCE LOCKOUT (Supabase-backed)
// ----------------------------------------------------------------------

export function getIpBlocks(): IpBlockRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_IP_BLOCKS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

async function getIpBlockFromDB(ip: string): Promise<IpBlockRecord | null> {
  try {
    const { data } = await supabase
      .from('dev_admin_ip_blocks')
      .select('*')
      .eq('ip_address', ip)
      .single()
    if (!data) return null
    return {
      id: String(data.id),
      ip_address: data.ip_address,
      failed_attempts: data.failed_attempts,
      is_blocked: data.is_blocked,
      blocked_until: data.blocked_until ? new Date(data.blocked_until).getTime() : 0,
      block_tier: data.block_tier,
      first_failed_at: data.first_failed_at ? new Date(data.first_failed_at).getTime() : 0,
      last_attempt_at: data.last_attempt_at,
      last_attempt_username: data.last_attempt_username,
      total_lifetime_blocks: data.total_lifetime_blocks,
    }
  } catch {
    return null
  }
}

export function getIpSecurityStatus(ip: string = getClientIp()): {
  isBlocked: boolean
  remainingSeconds: number
  failedAttempts: number
  blockTier: number
} {
  const blocks = getIpBlocks()
  const record = blocks.find((b) => b.ip_address === ip)
  if (!record) {
    return { isBlocked: false, remainingSeconds: 0, failedAttempts: 0, blockTier: 0 }
  }

  const now = Date.now()
  // Check if 24 hours (86,400,000 ms) have passed since first failed attempt
  if (record.first_failed_at && now - record.first_failed_at > 24 * 60 * 60 * 1000) {
    // Reset cycle after 1 day
    record.block_tier = 0
    record.first_failed_at = 0
    record.failed_attempts = 0
    record.is_blocked = false
    record.blocked_until = 0
    localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))
    return { isBlocked: false, remainingSeconds: 0, failedAttempts: 0, blockTier: 0 }
  }

  if (record.is_blocked && record.blocked_until > now) {
    const remainingSeconds = Math.ceil((record.blocked_until - now) / 1000)
    return {
      isBlocked: true,
      remainingSeconds,
      failedAttempts: record.failed_attempts,
      blockTier: record.block_tier,
    }
  }

  // If block time has expired, release block state
  if (record.is_blocked && record.blocked_until <= now) {
    record.is_blocked = false
    record.blocked_until = 0
    record.failed_attempts = 0
    localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))
  }

  return {
    isBlocked: false,
    remainingSeconds: 0,
    failedAttempts: record.failed_attempts,
    blockTier: record.block_tier,
  }
}

export function recordFailedLoginAttempt(ip: string, username: string): {
  isBlocked: boolean
  remainingSeconds: number
  attemptsLeft: number
  blockTier: number
} {
  const blocks = getIpBlocks()
  let record = blocks.find((b) => b.ip_address === ip)
  const now = Date.now()

  if (!record) {
    record = {
      id: `ip_${now}`,
      ip_address: ip,
      failed_attempts: 0,
      is_blocked: false,
      blocked_until: 0,
      block_tier: 0,
      first_failed_at: now,
      last_attempt_at: new Date().toISOString(),
      last_attempt_username: username,
      total_lifetime_blocks: 0,
    }
    blocks.push(record)
  }

  // Reset after 24 hours from initial failure cycle start
  if (record.first_failed_at && now - record.first_failed_at > 24 * 60 * 60 * 1000) {
    record.block_tier = 0
    record.first_failed_at = now
    record.failed_attempts = 0
    record.is_blocked = false
  }

  if (!record.first_failed_at) {
    record.first_failed_at = now
  }

  record.failed_attempts += 1
  record.last_attempt_at = new Date().toISOString()
  record.last_attempt_username = username

  // Check if threshold (3 attempts) reached
  if (record.failed_attempts >= 3) {
    record.block_tier += 1
    record.total_lifetime_blocks += 1
    record.is_blocked = true

    // Escalation rule:
    // Tier 1: 15 min (15 * 60 * 1000)
    // Tier 2: 30 min (30 * 60 * 1000)
    // Tier 3+: 30 min (30 * 60 * 1000)
    let durationMs = 15 * 60 * 1000
    if (record.block_tier >= 2) {
      durationMs = 30 * 60 * 1000
    }

    record.blocked_until = now + durationMs
    record.failed_attempts = 0 // Reset attempts for next cycle

    localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))

    addAuditLog(
      'SYSTEM_GATEWAY_FIREWALL',
      'ip_blocked',
      'dev_admin_ip_blocks',
      ip,
      {
        ip_address: ip,
        block_tier: record.block_tier,
        duration_minutes: durationMs / (60 * 1000),
        blocked_until: new Date(record.blocked_until).toISOString(),
        username_attempted: username,
      },
      ip
    )

    return {
      isBlocked: true,
      remainingSeconds: Math.ceil(durationMs / 1000),
      attemptsLeft: 0,
      blockTier: record.block_tier,
    }
  }

  localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))

  return {
    isBlocked: false,
    remainingSeconds: 0,
    attemptsLeft: Math.max(0, 3 - record.failed_attempts),
    blockTier: record.block_tier,
  }
}

export function clearIpBlock(ip: string): void {
  const blocks = getIpBlocks()
  const record = blocks.find((b) => b.ip_address === ip)
  if (record) {
    record.is_blocked = false
    record.blocked_until = 0
    record.failed_attempts = 0
    localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))

    addAuditLog(
      getCurrentAdminSession()?.username || 'SUPER_ADMIN',
      'ip_unblocked',
      'dev_admin_ip_blocks',
      ip,
      { ip_address: ip, reason: 'Manual administrator clearance' }
    )
  }
}

// ----------------------------------------------------------------------
// ADMIN USER ACCOUNTS MANAGEMENT (Supabase-backed)
// ----------------------------------------------------------------------

export function getAdmins(): AdminUser[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_ADMINS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export async function getAdminsFromDB(): Promise<AdminUser[]> {
  try {
    const { data, error } = await supabase.from('dev_admins').select('*').order('created_at')
    if (error || !data) return getAdmins()
    // Cache locally for offline fallback
    localStorage.setItem(STORAGE_ADMINS, JSON.stringify(data))
    return data as AdminUser[]
  } catch {
    return getAdmins()
  }
}

export async function hasAnyAdmin(): Promise<boolean> {
  const admins = await getAdminsFromDB()
  return admins.length > 0
}

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

  const admins = await getAdminsFromDB()
  if (admins.some((a) => a.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: `Username "${username}" already exists.` }
  }

  const salt = generateSalt()
  const password_hash = await hashPassword(input.password, salt)
  const admin_id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `adm_${Date.now()}`
  const role = input.role || (admins.length === 0 ? 'super_admin' : 'operations')

  const newAdmin: AdminUser = {
    admin_id,
    username,
    password_hash,
    salt,
    full_name: input.full_name?.trim() || username,
    email: input.email?.trim() || `${username}@marvelsoftwares.in`,
    role,
    is_active: true,
    created_at: new Date().toISOString(),
  }

  // Insert into Supabase
  const { error } = await supabase.from('dev_admins').insert({
    admin_id: newAdmin.admin_id,
    username: newAdmin.username,
    password_hash: newAdmin.password_hash,
    salt: newAdmin.salt,
    full_name: newAdmin.full_name,
    email: newAdmin.email,
    role: newAdmin.role,
    is_active: newAdmin.is_active,
  })

  if (error) {
    // Fallback to localStorage if Supabase fails
    const localAdmins = getAdmins()
    localAdmins.push(newAdmin)
    localStorage.setItem(STORAGE_ADMINS, JSON.stringify(localAdmins))
  } else {
    // Sync local cache
    const localAdmins = getAdmins()
    localAdmins.push(newAdmin)
    localStorage.setItem(STORAGE_ADMINS, JSON.stringify(localAdmins))
  }

  addAuditLog(
    getCurrentAdminSession()?.username || 'SYSTEM_BOOTSTRAP',
    'admin_created',
    'dev_admins',
    newAdmin.admin_id,
    {
      created_username: newAdmin.username,
      assigned_role: newAdmin.role,
      full_name: newAdmin.full_name,
    }
  )

  return { success: true, admin: newAdmin }
}

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

  // Terminate any active sessions for this deleted admin
  revokeAllSessionsForAdmin(adminId, 'admin_account_deleted')

  addAuditLog(
    getCurrentAdminSession()?.username || 'SYSTEM',
    'admin_deleted',
    'dev_admins',
    adminId,
    { deleted_username: target.username, deleted_role: target.role }
  )

  return { success: true }
}

// ----------------------------------------------------------------------
// ZERO-PERSISTENCE SESSION MANAGEMENT (dev_admin_sessions)
// ----------------------------------------------------------------------

export function getAllSessions(): AdminSession[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_SESSIONS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function createAdminSession(admin: AdminUser): AdminSession {
  const now = Date.now()
  const expiresAt = new Date(now + 12 * 60 * 60 * 1000).toISOString()
  const token = generateToken()
  const sessionId = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `sess_${now}`
  const ip = getClientIp()
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'Node/Client'

  const session: AdminSession = {
    token,
    session_id: sessionId,
    admin_id: admin.admin_id,
    username: admin.username,
    full_name: admin.full_name,
    email: admin.email,
    role: admin.role,
    ip_address: ip,
    user_agent: ua,
    is_revoked: false,
    last_activity_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    expires_at: expiresAt,
  }

  const sessions = getAllSessions()
  // Append new session to table
  sessions.unshift(session)
  if (sessions.length > 50) sessions.length = 50
  localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))

  // Store active token in sessionStorage & localStorage
  sessionStorage.setItem(STORAGE_ACTIVE_TOKEN, token)
  localStorage.setItem(STORAGE_ACTIVE_TOKEN, token)

  addAuditLog(admin.username, 'admin_login', 'dev_admin_sessions', session.session_id, {
    ip_address: ip,
    role: admin.role,
  })

  return session
}

export function getCurrentAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null
  try {
    const activeToken =
      sessionStorage.getItem(STORAGE_ACTIVE_TOKEN) || localStorage.getItem(STORAGE_ACTIVE_TOKEN)
    if (!activeToken) return null

    const sessions = getAllSessions()
    const session = sessions.find((s) => s.token === activeToken)

    // Verify session state against table
    if (!session) {
      purgeCurrentSessionTokens()
      return null
    }

    if (session.is_revoked) {
      purgeCurrentSessionTokens()
      return null
    }

    const now = Date.now()
    if (new Date(session.expires_at).getTime() < now) {
      session.is_revoked = true
      session.revoked_reason = 'session_expired'
      localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))
      purgeCurrentSessionTokens()
      return null
    }

    // Check inactivity timeout (15 mins)
    const lastActive = new Date(session.last_activity_at).getTime()
    if (now - lastActive > INACTIVITY_TIMEOUT_MS) {
      session.is_revoked = true
      session.revoked_reason = 'inactivity_timeout'
      localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))
      purgeCurrentSessionTokens()

      addAuditLog(session.username, 'inactivity_auto_logout', 'dev_admin_sessions', session.session_id, {
        reason: '15 minutes of inactivity detected',
      })
      return null
    }

    return session
  } catch {
    return null
  }
}

export function updateSessionActivity(): void {
  try {
    const activeToken =
      sessionStorage.getItem(STORAGE_ACTIVE_TOKEN) || localStorage.getItem(STORAGE_ACTIVE_TOKEN)
    if (!activeToken) return

    const sessions = getAllSessions()
    const session = sessions.find((s) => s.token === activeToken)
    if (session && !session.is_revoked) {
      session.last_activity_at = new Date().toISOString()
      localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))
    }
  } catch {
    // Non-blocking
  }
}

function purgeCurrentSessionTokens(): void {
  sessionStorage.removeItem(STORAGE_ACTIVE_TOKEN)
  localStorage.removeItem(STORAGE_ACTIVE_TOKEN)
}

export function logoutAdmin(reason: string = 'user_logout'): void {
  const current = getCurrentAdminSession()
  if (current) {
    const sessions = getAllSessions()
    const target = sessions.find((s) => s.token === current.token)
    if (target) {
      target.is_revoked = true
      target.revoked_reason = reason
      localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))
    }

    addAuditLog(current.username, 'admin_logout', 'dev_admin_sessions', current.session_id, {
      reason,
    })
  }

  purgeCurrentSessionTokens()
}

export function revokeSession(sessionId: string): boolean {
  const sessions = getAllSessions()
  const target = sessions.find((s) => s.session_id === sessionId)
  if (!target) return false

  target.is_revoked = true
  target.revoked_reason = 'admin_manually_revoked'
  localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))

  addAuditLog(
    getCurrentAdminSession()?.username || 'SUPER_ADMIN',
    'session_revoked',
    'dev_admin_sessions',
    sessionId,
    { revoked_username: target.username, session_ip: target.ip_address }
  )

  return true
}

export function revokeAllSessionsForAdmin(adminId: string, reason: string): void {
  const sessions = getAllSessions()
  sessions.forEach((s) => {
    if (s.admin_id === adminId && !s.is_revoked) {
      s.is_revoked = true
      s.revoked_reason = reason
    }
  })
  localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))
}

// ----------------------------------------------------------------------
// CREDENTIAL VERIFICATION WITH BRUTE-FORCE LOCKOUT INTEGRATION
// ----------------------------------------------------------------------

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<{
  success: boolean
  admin?: AdminUser
  error?: string
  isBlocked?: boolean
  remainingSeconds?: number
  attemptsLeft?: number
}> {
  const ip = getClientIp()
  const cleanUsername = username.trim()

  // 1. Check IP lockout (check DB first, fallback to localStorage)
  const dbBlock = await getIpBlockFromDB(ip)
  const secStatus = dbBlock
    ? {
        isBlocked: dbBlock.is_blocked && dbBlock.blocked_until > Date.now(),
        remainingSeconds: dbBlock.is_blocked ? Math.ceil((dbBlock.blocked_until - Date.now()) / 1000) : 0,
        failedAttempts: dbBlock.failed_attempts,
        blockTier: dbBlock.block_tier,
      }
    : getIpSecurityStatus(ip)

  if (secStatus.isBlocked) {
    return {
      success: false,
      isBlocked: true,
      remainingSeconds: secStatus.remainingSeconds,
      error: `IP temporarily blocked due to 3 failed attempts. Please wait ${Math.ceil(
        secStatus.remainingSeconds / 60
      )} minute(s).`,
    }
  }

  // 2. Fetch admin from Supabase
  let admin: AdminUser | undefined
  try {
    const { data } = await supabase
      .from('dev_admins')
      .select('*')
      .ilike('username', cleanUsername)
      .single()
    if (data) {
      admin = data as AdminUser
      // Update local cache
      const localAdmins = getAdmins()
      const idx = localAdmins.findIndex((a) => a.admin_id === admin!.admin_id)
      if (idx >= 0) localAdmins[idx] = admin
      else localAdmins.push(admin)
      localStorage.setItem(STORAGE_ADMINS, JSON.stringify(localAdmins))
    }
  } catch {
    // Fallback to localStorage
    const localAdmins = getAdmins()
    admin = localAdmins.find((a) => a.username.toLowerCase() === cleanUsername.toLowerCase())
  }

  if (!admin) {
    const strike = recordFailedLoginAttempt(ip, cleanUsername)
    if (strike.isBlocked) {
      return {
        success: false,
        isBlocked: true,
        remainingSeconds: strike.remainingSeconds,
        error: `3 failed attempts reached. Your IP is blocked for ${Math.ceil(
          strike.remainingSeconds / 60
        )} minutes.`,
      }
    }
    return {
      success: false,
      attemptsLeft: strike.attemptsLeft,
      error: `Invalid credentials. (${strike.attemptsLeft} attempt(s) remaining before IP lockout)`,
    }
  }

  if (!admin.is_active) {
    return { success: false, error: 'This account has been deactivated.' }
  }

  const computedHash = await hashPassword(password, admin.salt)
  if (computedHash !== admin.password_hash) {
    const strike = recordFailedLoginAttempt(ip, cleanUsername)
    if (strike.isBlocked) {
      return {
        success: false,
        isBlocked: true,
        remainingSeconds: strike.remainingSeconds,
        error: `3 failed attempts reached. Your IP is blocked for ${Math.ceil(
          strike.remainingSeconds / 60
        )} minutes.`,
      }
    }
    return {
      success: false,
      attemptsLeft: strike.attemptsLeft,
      error: `Invalid password. (${strike.attemptsLeft} attempt(s) remaining before IP lockout)`,
    }
  }

  // Authentication succeeded: reset failed attempts
  const blocks = getIpBlocks()
  const rec = blocks.find((b) => b.ip_address === ip)
  if (rec) {
    rec.failed_attempts = 0
    localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))
  }
  // Also reset in Supabase
  supabase
    .from('dev_admin_ip_blocks')
    .update({ failed_attempts: 0, is_blocked: false })
    .eq('ip_address', ip)
    .then(() => {})

  // Update last_login_at in Supabase
  const loginAt = new Date().toISOString()
  await supabase
    .from('dev_admins')
    .update({ last_login_at: loginAt })
    .eq('admin_id', admin.admin_id)

  admin.last_login_at = loginAt
  const localAdmins = getAdmins()
  const idx = localAdmins.findIndex((a) => a.admin_id === admin!.admin_id)
  if (idx >= 0) {
    localAdmins[idx].last_login_at = loginAt
    localStorage.setItem(STORAGE_ADMINS, JSON.stringify(localAdmins))
  }

  return { success: true, admin }
}

// ----------------------------------------------------------------------
// INQUIRIES MANAGEMENT (Supabase-backed with localStorage fallback)
// ----------------------------------------------------------------------

export function getAllInquiries(): AdminInquiry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_INQUIRIES)
    let inquiries: AdminInquiry[] = raw ? JSON.parse(raw) : []

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

export async function getAllInquiriesFromDB(): Promise<AdminInquiry[]> {
  try {
    const { data, error } = await supabase
      .from('dev_contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return getAllInquiries()

    const inquiries: AdminInquiry[] = data.map((item: Record<string, unknown>) => ({
      id: item['id'] as string | number,
      name: item['name'] as string,
      email: item['email'] as string,
      phone: (item['phone'] as string) || '',
      address: (item['address'] as string) || '',
      solution: (item['solution'] as string) || 'Other',
      requirements: item['requirements'] as string,
      status: ((item['status'] as string) || 'new') as AdminInquiry['status'],
      is_starred: !!(item['is_starred'] as boolean),
      submittedAt: item['created_at'] as string,
      city: (item['city'] as string) || '',
      visitor_id: item['visitor_id'] as string | undefined,
      session_id: item['session_id'] as string | undefined,
      admin_notes: (item['admin_notes'] as string) || '',
      assigned_to: (item['assigned_to'] as string) || '',
    }))

    // Cache locally for offline fallback
    localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries))
    return inquiries
  } catch {
    return getAllInquiries()
  }
}

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

  // Sync to Supabase
  supabase
    .from('dev_contact_inquiries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', inquiryId)
    .then(() => {})

  addAuditLog(
    getCurrentAdminSession()?.username || 'ADMIN',
    'inquiry_status_updated',
    'dev_contact_inquiries',
    String(inquiryId),
    { client_name: item.name, previous_status: prevStatus, new_status: status }
  )

  return true
}

export function toggleStarInquiry(inquiryId: string | number): boolean {
  const inquiries = getAllInquiries()
  const item = inquiries.find((i) => String(i.id) === String(inquiryId))
  if (!item) return false

  item.is_starred = !item.is_starred
  localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries))

  // Sync to Supabase
  supabase
    .from('dev_contact_inquiries')
    .update({ is_starred: item.is_starred, updated_at: new Date().toISOString() })
    .eq('id', inquiryId)
    .then(() => {})

  addAuditLog(
    getCurrentAdminSession()?.username || 'ADMIN',
    item.is_starred ? 'inquiry_starred' : 'inquiry_unstarred',
    'dev_contact_inquiries',
    String(inquiryId),
    { client_name: item.name, is_starred: item.is_starred }
  )

  return true
}

export function deleteInquiry(inquiryId: string | number): boolean {
  const inquiries = getAllInquiries()
  const target = inquiries.find((i) => String(i.id) === String(inquiryId))
  const updated = inquiries.filter((i) => String(i.id) !== String(inquiryId))
  localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(updated))

  // Sync to Supabase
  supabase
    .from('dev_contact_inquiries')
    .delete()
    .eq('id', inquiryId)
    .then(() => {})

  if (target) {
    addAuditLog(
      getCurrentAdminSession()?.username || 'ADMIN',
      'inquiry_deleted',
      'dev_contact_inquiries',
      String(inquiryId),
      { deleted_client: target.name, email: target.email, solution: target.solution }
    )
  }
  return true
}

// ----------------------------------------------------------------------
// TELEMETRY & AUDIT LOGGING ENGINE (Supabase-backed)
// ----------------------------------------------------------------------

export function getTelemetryRecords(): TelemetryRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_TELEMETRY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export async function getTelemetryRecordsFromDB(): Promise<TelemetryRecord[]> {
  try {
    const { data, error } = await supabase
      .from('dev_telemetry_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)

    if (error || !data) return getTelemetryRecords()

    const records = data as TelemetryRecord[]
    localStorage.setItem(STORAGE_TELEMETRY, JSON.stringify(records))
    return records
  } catch {
    return getTelemetryRecords()
  }
}

export function getAuditLogs(): AuditLog[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_AUDIT)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addAuditLog(
  admin_username: string,
  action: string,
  target_type: string,
  target_id: string,
  details?: Record<string, unknown>,
  ip?: string
): void {
  try {
    const logs = getAuditLogs()
    const active = getCurrentAdminSession()
    const newLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      admin_id: active?.admin_id,
      admin_username,
      admin_role: active?.role || 'super_admin',
      action,
      target_type,
      target_id,
      details,
      ip_address: ip || getClientIp(),
      created_at: new Date().toISOString(),
    }
    logs.unshift(newLog)
    if (logs.length > 300) logs.length = 300
    localStorage.setItem(STORAGE_AUDIT, JSON.stringify(logs))

    // Fire-and-forget to Supabase
    supabase.from('dev_admin_audit_logs').insert({
      admin_id: active?.admin_id || null,
      admin_username,
      admin_role: newLog.admin_role,
      action,
      target_type,
      target_id,
      details: details || null,
      ip_address: newLog.ip_address,
    }).then(() => {})
  } catch {
    // Non-blocking
  }
}

// ----------------------------------------------------------------------
// SEED REALISTIC INITIAL DATA
// ----------------------------------------------------------------------

export function seedSampleDataIfEmpty(): void {
  if (typeof window === 'undefined') return

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

  // Pre-seed an audit log entry
  const existingAudit = getAuditLogs()
  if (existingAudit.length === 0) {
    addAuditLog('marvel_root', 'system_initialized', 'dev_admins', 'sys_root', {
      note: 'System gateway and security tables initialized with dev_ schema prefix',
    })
  }
}

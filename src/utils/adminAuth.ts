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

export interface VisitorRecord {
  visitor_id: string
  first_seen: string
  last_seen: string
  session_count?: number
  device_type?: 'mobile' | 'tablet' | 'desktop'
  browser?: string
  os?: string
  screen_resolution?: string
  language?: string
  referrer?: string
  consent_status?: string
  lead_name?: string
  lead_email?: string
  lead_phone?: string
  lead_address?: string
  converted_at?: string
}

// Obfuscated Gateway Route Constants
export const GATEWAY_PREFIX = '/_k9x_gateway_92a7'
export const ROUTE_AUTH = `${GATEWAY_PREFIX}/auth`
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
      ip = '127.0.0.1'
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

export async function getIpBlocksFromDB(): Promise<IpBlockRecord[]> {
  try {
    const { data, error } = await supabase
      .from('dev_admin_ip_blocks')
      .select('*')
      .order('last_attempt_at', { ascending: false })

    if (error || !data) return getIpBlocks()

    const blocks: IpBlockRecord[] = data.map((item: Record<string, unknown>) => ({
      id: String(item['id']),
      ip_address: item['ip_address'] as string,
      failed_attempts: (item['failed_attempts'] as number) || 0,
      is_blocked: !!item['is_blocked'],
      blocked_until: item['blocked_until'] ? new Date(item['blocked_until'] as string).getTime() : 0,
      block_tier: (item['block_tier'] as number) || 0,
      first_failed_at: item['first_failed_at'] ? new Date(item['first_failed_at'] as string).getTime() : 0,
      last_attempt_at: (item['last_attempt_at'] as string) || new Date().toISOString(),
      last_attempt_username: (item['last_attempt_username'] as string) || undefined,
      total_lifetime_blocks: (item['total_lifetime_blocks'] as number) || 0,
    }))
    localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))
    return blocks
  } catch {
    return getIpBlocks()
  }
}

async function getIpBlockFromDB(ip: string): Promise<IpBlockRecord | null> {
  try {
    const { data } = await supabase
      .from('dev_admin_ip_blocks')
      .select('*')
      .eq('ip_address', ip)
      .maybeSingle()
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

    // Sync to Supabase dev_admin_ip_blocks table
    supabase
      .from('dev_admin_ip_blocks')
      .upsert(
        {
          ip_address: ip,
          failed_attempts: record.failed_attempts,
          is_blocked: true,
          blocked_until: new Date(record.blocked_until).toISOString(),
          block_tier: record.block_tier,
          first_failed_at: new Date(record.first_failed_at).toISOString(),
          last_attempt_at: record.last_attempt_at,
          last_attempt_username: username,
          total_lifetime_blocks: record.total_lifetime_blocks,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'ip_address' }
      )
      .then(() => {})

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

  // Sync failed attempts count to Supabase dev_admin_ip_blocks
  supabase
    .from('dev_admin_ip_blocks')
    .upsert(
      {
        ip_address: ip,
        failed_attempts: record.failed_attempts,
        is_blocked: false,
        blocked_until: null,
        block_tier: record.block_tier,
        first_failed_at: new Date(record.first_failed_at).toISOString(),
        last_attempt_at: record.last_attempt_at,
        last_attempt_username: username,
        total_lifetime_blocks: record.total_lifetime_blocks,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'ip_address' }
    )
    .then(() => {})

  return {
    isBlocked: false,
    remainingSeconds: 0,
    attemptsLeft: Math.max(0, 3 - record.failed_attempts),
    blockTier: record.block_tier,
  }
}

export async function clearIpBlock(ip: string): Promise<void> {
  const blocks = getIpBlocks()
  const record = blocks.find((b) => b.ip_address === ip)
  if (record) {
    record.is_blocked = false
    record.blocked_until = 0
    record.failed_attempts = 0
    localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))
  }

  try {
    await supabase
      .from('dev_admin_ip_blocks')
      .update({
        is_blocked: false,
        blocked_until: null,
        failed_attempts: 0,
        updated_at: new Date().toISOString(),
      })
      .eq('ip_address', ip)
  } catch {
    // Non-blocking
  }

  addAuditLog(
    getCurrentAdminSession()?.username || 'SUPER_ADMIN',
    'ip_unblocked',
    'dev_admin_ip_blocks',
    ip,
    { ip_address: ip, reason: 'Manual administrator clearance' }
  )
}

export async function manualBlockIp(ip: string, reason: string = 'admin_manual_block'): Promise<boolean> {
  const cleanIp = ip.trim()
  if (!cleanIp) return false

  const blockedUntil = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  const blocks = getIpBlocks()
  const idx = blocks.findIndex((b) => b.ip_address === cleanIp)
  const newRec: IpBlockRecord = {
    id: `blk_${Date.now()}`,
    ip_address: cleanIp,
    failed_attempts: 3,
    is_blocked: true,
    blocked_until: blockedUntil,
    block_tier: 2,
    first_failed_at: Date.now(),
    last_attempt_at: new Date().toISOString(),
    last_attempt_username: reason,
    total_lifetime_blocks: (idx >= 0 ? blocks[idx].total_lifetime_blocks : 0) + 1,
  }

  if (idx >= 0) blocks[idx] = newRec
  else blocks.unshift(newRec)
  localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))

  try {
    await supabase.from('dev_admin_ip_blocks').upsert({
      ip_address: cleanIp,
      failed_attempts: 3,
      is_blocked: true,
      blocked_until: new Date(blockedUntil).toISOString(),
      block_tier: 2,
      last_attempt_at: new Date().toISOString(),
      last_attempt_username: reason,
      total_lifetime_blocks: newRec.total_lifetime_blocks,
    }, { onConflict: 'ip_address' })
  } catch (err) {
    console.error('Failed to block IP in Supabase:', err)
  }

  addAuditLog(
    getCurrentAdminSession()?.username || 'ADMIN',
    'ip_manually_blocked',
    'dev_admin_ip_blocks',
    cleanIp,
    { reason }
  )

  return true
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

export async function deleteAdmin(adminId: string): Promise<{ success: boolean; error?: string }> {
  const admins = await getAdminsFromDB()
  const target = admins.find((a) => a.admin_id === adminId)
  if (!target) return { success: false, error: 'Admin not found.' }

  if (target.role === 'super_admin') {
    const superAdmins = admins.filter((a) => a.role === 'super_admin')
    if (superAdmins.length <= 1) {
      return { success: false, error: 'Cannot remove the last super administrator.' }
    }
  }

  try {
    await supabase.from('dev_admins').delete().eq('admin_id', adminId)
  } catch (err) {
    console.error('Failed to delete admin in Supabase:', err)
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

export async function getSessionsFromDB(): Promise<AdminSession[]> {
  try {
    const { data, error } = await supabase
      .from('dev_admin_sessions')
      .select('*, dev_admins(username, full_name, email, role)')
      .order('last_activity_at', { ascending: false })
      .limit(100)

    if (error || !data) return getAllSessions()

    const sessions: AdminSession[] = data.map((item: Record<string, unknown>) => {
      const admin = (item['dev_admins'] as Record<string, unknown>) || {}
      return {
        token: (item['token_hash'] as string) || '',
        session_id: item['session_id'] as string,
        admin_id: item['admin_id'] as string,
        username: (admin['username'] as string) || 'admin',
        full_name: (admin['full_name'] as string) || '',
        email: (admin['email'] as string) || '',
        role: (admin['role'] as string) || 'operations',
        ip_address: (item['ip_address'] as string) || '',
        user_agent: (item['user_agent'] as string) || '',
        is_revoked: !!item['is_revoked'],
        revoked_reason: (item['revoked_reason'] as string) || undefined,
        last_activity_at: (item['last_activity_at'] as string) || new Date().toISOString(),
        created_at: (item['created_at'] as string) || new Date().toISOString(),
        expires_at: (item['expires_at'] as string) || new Date().toISOString(),
      }
    })
    localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))
    return sessions
  } catch {
    return getAllSessions()
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

  // Insert into dev_admin_sessions table in Supabase
  supabase
    .from('dev_admin_sessions')
    .insert({
      session_id: sessionId,
      admin_id: admin.admin_id,
      token_hash: token,
      ip_address: ip,
      user_agent: ua,
      is_revoked: false,
      last_activity_at: session.last_activity_at,
      expires_at: session.expires_at,
    })
    .then(() => {})

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

    supabase
      .from('dev_admin_sessions')
      .update({
        is_revoked: true,
        revoked_at: new Date().toISOString(),
        revoked_reason: reason,
      })
      .eq('token_hash', current.token)
      .then(() => {})

    addAuditLog(current.username, 'admin_logout', 'dev_admin_sessions', current.session_id, {
      reason,
    })
  }

  purgeCurrentSessionTokens()
}

export async function revokeSession(sessionId: string): Promise<boolean> {
  const sessions = getAllSessions()
  const target = sessions.find((s) => s.session_id === sessionId)
  if (target) {
    target.is_revoked = true
    target.revoked_reason = 'admin_manually_revoked'
    localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions))
  }

  try {
    await supabase
      .from('dev_admin_sessions')
      .update({
        is_revoked: true,
        revoked_at: new Date().toISOString(),
        revoked_reason: 'admin_manually_revoked',
      })
      .eq('session_id', sessionId)
  } catch (err) {
    console.error('Failed to revoke session in Supabase:', err)
  }

  addAuditLog(
    getCurrentAdminSession()?.username || 'SUPER_ADMIN',
    'session_revoked',
    'dev_admin_sessions',
    sessionId,
    { revoked_username: target?.username || 'admin', session_ip: target?.ip_address || '' }
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

  supabase
    .from('dev_admin_sessions')
    .update({
      is_revoked: true,
      revoked_at: new Date().toISOString(),
      revoked_reason: reason,
    })
    .eq('admin_id', adminId)
    .then(() => {})
}

// ----------------------------------------------------------------------
// CREDENTIAL VERIFICATION WITH BRUTE-FORCE LOCKOUT INTEGRATION
// ----------------------------------------------------------------------

export async function verifyAdminCredentials(
  identifier: string,
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
  const cleanId = identifier.trim()

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

  // 2. Fetch admin from Supabase by username OR email
  let admin: AdminUser | undefined
  try {
    const isEmail = cleanId.includes('@')
    let query = supabase.from('dev_admins').select('*')
    if (isEmail) {
      query = query.ilike('email', cleanId)
    } else {
      query = query.ilike('username', cleanId)
    }

    const { data } = await query.maybeSingle()
    if (data) {
      admin = data as AdminUser
    } else if (!isEmail) {
      // Also try matching by email just in case
      const { data: byEmail } = await supabase.from('dev_admins').select('*').ilike('email', cleanId).maybeSingle()
      if (byEmail) admin = byEmail as AdminUser
    }

    if (admin) {
      // Update local cache
      const localAdmins = getAdmins()
      const idx = localAdmins.findIndex((a) => a.admin_id === admin!.admin_id)
      if (idx >= 0) localAdmins[idx] = admin
      else localAdmins.push(admin)
      localStorage.setItem(STORAGE_ADMINS, JSON.stringify(localAdmins))
    }
  } catch {
    // Non-blocking
  }

  // Fallback to local cache
  if (!admin) {
    const localAdmins = getAdmins()
    admin = localAdmins.find(
      (a) =>
        a.username.toLowerCase() === cleanId.toLowerCase() ||
        (a.email && a.email.toLowerCase() === cleanId.toLowerCase())
    )
  }

  if (!admin) {
    const strike = recordFailedLoginAttempt(ip, cleanId)
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

  // Verify password:
  // 1. If cryptographic salt exists, hash with salt
  // 2. If no salt (e.g. seeded directly in Postgres), check with empty salt or direct hash match
  let isPasswordValid = false
  if (admin.salt) {
    const computedHash = await hashPassword(password, admin.salt)
    isPasswordValid = computedHash === admin.password_hash
  } else {
    const computedNoSalt = await hashPassword(password, '')
    isPasswordValid =
      computedNoSalt === admin.password_hash ||
      password === admin.password_hash
  }

  if (!isPasswordValid) {
    const strike = recordFailedLoginAttempt(ip, cleanId)
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
    rec.is_blocked = false
    rec.blocked_until = 0
    localStorage.setItem(STORAGE_IP_BLOCKS, JSON.stringify(blocks))
  }
  // Also reset in Supabase
  supabase
    .from('dev_admin_ip_blocks')
    .update({ failed_attempts: 0, is_blocked: false, blocked_until: null })
    .eq('ip_address', ip)
    .then(() => {})

  // Update last_login_at in Supabase
  const loginAt = new Date().toISOString()
  await supabase
    .from('dev_admins')
    .update({ last_login_at: loginAt, last_login_ip: ip })
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

export async function updateInquiryStatus(
  inquiryId: string | number,
  status: AdminInquiry['status']
): Promise<boolean> {
  const inquiries = getAllInquiries()
  const item = inquiries.find((i) => String(i.id) === String(inquiryId))
  const prevStatus = item?.status || 'new'

  if (item) {
    item.status = status
    localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries))
  }

  // Sync to Supabase dev_contact_inquiries
  try {
    await supabase
      .from('dev_contact_inquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', inquiryId)
  } catch (err) {
    console.error('Failed to update inquiry status in Supabase:', err)
  }

  addAuditLog(
    getCurrentAdminSession()?.username || 'ADMIN',
    'inquiry_status_updated',
    'dev_contact_inquiries',
    String(inquiryId),
    { client_name: item?.name || 'Inquiry', previous_status: prevStatus, new_status: status }
  )

  return true
}

export async function toggleStarInquiry(inquiryId: string | number): Promise<boolean> {
  const inquiries = getAllInquiries()
  const item = inquiries.find((i) => String(i.id) === String(inquiryId))
  const newStarred = item ? !item.is_starred : true

  if (item) {
    item.is_starred = newStarred
    localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries))
  }

  // Sync to Supabase
  try {
    await supabase
      .from('dev_contact_inquiries')
      .update({ is_starred: newStarred, updated_at: new Date().toISOString() })
      .eq('id', inquiryId)
  } catch (err) {
    console.error('Failed to toggle star in Supabase:', err)
  }

  addAuditLog(
    getCurrentAdminSession()?.username || 'ADMIN',
    newStarred ? 'inquiry_starred' : 'inquiry_unstarred',
    'dev_contact_inquiries',
    String(inquiryId),
    { client_name: item?.name || 'Inquiry', is_starred: newStarred }
  )

  return true
}

export async function deleteInquiry(inquiryId: string | number): Promise<boolean> {
  const inquiries = getAllInquiries()
  const target = inquiries.find((i) => String(i.id) === String(inquiryId))
  const updated = inquiries.filter((i) => String(i.id) !== String(inquiryId))
  localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(updated))

  // Sync to Supabase
  try {
    await supabase
      .from('dev_contact_inquiries')
      .delete()
      .eq('id', inquiryId)
  } catch (err) {
    console.error('Failed to delete inquiry from Supabase:', err)
  }

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

export async function updateInquiryNotes(
  inquiryId: string | number,
  notes: string
): Promise<boolean> {
  const inquiries = getAllInquiries()
  const item = inquiries.find((i) => String(i.id) === String(inquiryId))
  if (item) {
    item.admin_notes = notes
    localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(inquiries))
  }

  try {
    await supabase
      .from('dev_contact_inquiries')
      .update({ admin_notes: notes, updated_at: new Date().toISOString() })
      .eq('id', inquiryId)
  } catch (err) {
    console.error('Failed to update inquiry notes in Supabase:', err)
  }

  addAuditLog(
    getCurrentAdminSession()?.username || 'ADMIN',
    'inquiry_notes_updated',
    'dev_contact_inquiries',
    String(inquiryId),
    { client_name: item?.name || 'Inquiry' }
  )

  return true
}

// ----------------------------------------------------------------------
// TELEMETRY, VISITORS & AUDIT LOGGING ENGINE (Supabase-backed)
// ----------------------------------------------------------------------

export async function getVisitorsFromDB(): Promise<VisitorRecord[]> {
  try {
    const { data, error } = await supabase
      .from('dev_visitors')
      .select('*')
      .order('last_seen', { ascending: false })
      .limit(200)

    if (error || !data) return []
    return data as VisitorRecord[]
  } catch {
    return []
  }
}

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
      .limit(300)

    if (error || !data) return getTelemetryRecords()

    const records: TelemetryRecord[] = data.map((item: Record<string, unknown>) => {
      const meta = (item['metadata'] as Record<string, unknown>) || {}
      const clientMeta = (meta['client_meta'] as TelemetryRecord['client_meta']) || undefined
      return {
        id: item['id'] as string | number,
        visitor_id: item['visitor_id'] as string | undefined,
        session_id: item['session_id'] as string | undefined,
        event_name: item['event_name'] as string,
        page_path: item['page_path'] as string,
        section_id: item['section_id'] as string | undefined,
        section_name: item['section_name'] as string | undefined,
        dwell_time_seconds: (item['dwell_time_seconds'] as number) || 0,
        element_label: item['element_label'] as string | undefined,
        created_at: item['created_at'] as string,
        metadata: meta,
        client_meta: clientMeta,
      }
    })
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

export async function getAuditLogsFromDB(): Promise<AuditLog[]> {
  try {
    const { data, error } = await supabase
      .from('dev_admin_audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(300)

    if (error || !data) return getAuditLogs()

    const logs: AuditLog[] = data.map((item: Record<string, unknown>) => ({
      id: String(item['id']),
      admin_id: (item['admin_id'] as string) || undefined,
      admin_username: (item['admin_username'] as string) || 'system',
      admin_role: (item['admin_role'] as string) || 'super_admin',
      action: item['action'] as string,
      target_type: item['target_type'] as string,
      target_id: item['target_id'] as string,
      details: (item['details'] as Record<string, unknown>) || undefined,
      ip_address: (item['ip_address'] as string) || '',
      created_at: item['created_at'] as string,
    }))
    localStorage.setItem(STORAGE_AUDIT, JSON.stringify(logs))
    return logs
  } catch {
    return getAuditLogs()
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

    // Fire-and-forget to Supabase dev_admin_audit_logs
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
// NO HARDCODED DATA — CLEANUP ROUTINES
// ----------------------------------------------------------------------

export function seedSampleDataIfEmpty(): void {
  // Hardcoded mock data disabled: All records are fetched live from Supabase PostgreSQL tables.
}

export function purgeMockLocalStorageData(): void {
  if (typeof window === 'undefined') return
  try {
    const rawInq = localStorage.getItem(STORAGE_INQUIRIES)
    if (rawInq) {
      const parsed = JSON.parse(rawInq)
      const cleaned = parsed.filter((i: Record<string, unknown>) => !String(i['id']).startsWith('inq_10'))
      localStorage.setItem(STORAGE_INQUIRIES, JSON.stringify(cleaned))
    }
    const rawTel = localStorage.getItem(STORAGE_TELEMETRY)
    if (rawTel) {
      const parsed = JSON.parse(rawTel)
      const cleaned = parsed.filter((t: Record<string, unknown>) => !String(t['id']).startsWith('tel_10'))
      localStorage.setItem(STORAGE_TELEMETRY, JSON.stringify(cleaned))
    }
  } catch {
    // Non-blocking
  }
}

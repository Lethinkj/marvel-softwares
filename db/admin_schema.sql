-- ====================================================================
-- MARVEL SOFTWARES — Production Admin, Security & Audit Schema (Prefix: dev_)
-- ====================================================================
-- All tables, indexes, triggers, and views are prefixed with "dev_" to safely
-- coexist inside existing or shared databases without table name collisions.
-- Compatible with PostgreSQL 13, 14, 15, 16, 17+ (Neon, Supabase, Local, RDS).
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- 1. DEV_ADMINS TABLE
-- Stores administrative user credentials, roles, and access state.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_admins (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(60) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Stored as bcrypt / argon2 / sha256-salt
    salt VARCHAR(64),
    full_name VARCHAR(120),
    email VARCHAR(255) UNIQUE,
    role VARCHAR(30) NOT NULL DEFAULT 'super_admin', -- 'super_admin', 'operations', 'analyst', 'editor'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_admins_username ON dev_admins (username);
CREATE INDEX IF NOT EXISTS idx_dev_admins_email ON dev_admins (email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_dev_admins_is_active ON dev_admins (is_active);

-- --------------------------------------------------------------------
-- 2. DEV_ADMIN_IP_BLOCKS TABLE
-- Tracks failed login attempts per IP address, escalating lockout tiers
-- (Tier 1: 15 min, Tier 2: 30 min, Tier 3+: 30 min, resets after 24 hrs).
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_admin_ip_blocks (
    id BIGSERIAL PRIMARY KEY,
    ip_address INET NOT NULL UNIQUE,
    failed_attempts INT NOT NULL DEFAULT 0,
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    blocked_until TIMESTAMPTZ,
    block_tier INT NOT NULL DEFAULT 0, -- 1 = 15m, 2 = 30m, 3+ = 30m
    first_failed_at TIMESTAMPTZ,       -- Reference start of cycle (resets tier after 24h)
    last_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_attempt_username VARCHAR(60),
    total_lifetime_blocks INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_ip_blocks_ip ON dev_admin_ip_blocks (ip_address);
CREATE INDEX IF NOT EXISTS idx_dev_ip_blocks_blocked_until ON dev_admin_ip_blocks (blocked_until) WHERE is_blocked = TRUE;

-- --------------------------------------------------------------------
-- 3. DEV_ADMIN_SESSIONS TABLE
-- Authenticated administrator session tokens with expiration and auto-logout tracking.
-- Zero session persistence policy: invalid/expired sessions are purged or marked revoked.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_admin_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES dev_admins(admin_id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_at TIMESTAMPTZ,
    revoked_reason VARCHAR(100), -- 'user_logout', 'inactivity_timeout', 'admin_revoked', 'expired'
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_admin_sessions_admin_id ON dev_admin_sessions (admin_id);
CREATE INDEX IF NOT EXISTS idx_dev_admin_sessions_token ON dev_admin_sessions (token_hash);
CREATE INDEX IF NOT EXISTS idx_dev_admin_sessions_expires_at ON dev_admin_sessions (expires_at);
CREATE INDEX IF NOT EXISTS idx_dev_admin_sessions_active ON dev_admin_sessions (is_revoked, expires_at);

-- --------------------------------------------------------------------
-- 4. DEV_ADMIN_AUDIT_LOGS TABLE
-- Complete audit trail recording which admin changes what, with before/after diffs.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_admin_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    admin_id UUID REFERENCES dev_admins(admin_id) ON DELETE SET NULL,
    admin_username VARCHAR(60) NOT NULL,
    admin_role VARCHAR(30) DEFAULT 'super_admin',
    action VARCHAR(80) NOT NULL, -- 'admin_login', 'admin_logout', 'inactivity_auto_logout', 'inquiry_status_updated', 'inquiry_deleted', 'inquiry_starred', 'admin_created', 'admin_deleted', 'ip_blocked', 'session_revoked', 'data_exported'
    target_type VARCHAR(60),     -- 'dev_admins', 'dev_contact_inquiries', 'dev_admin_sessions', 'dev_admin_ip_blocks'
    target_id VARCHAR(100),
    details JSONB,               -- E.g. { previous_status: 'new', new_status: 'in_discussion', client_name: 'Rajesh' }
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_admin_audit_admin_id ON dev_admin_audit_logs (admin_id);
CREATE INDEX IF NOT EXISTS idx_dev_admin_audit_username ON dev_admin_audit_logs (admin_username);
CREATE INDEX IF NOT EXISTS idx_dev_admin_audit_action ON dev_admin_audit_logs (action);
CREATE INDEX IF NOT EXISTS idx_dev_admin_audit_created_at ON dev_admin_audit_logs (created_at DESC);

-- --------------------------------------------------------------------
-- 5. ANALYTICAL & SECURITY VIEWS (Prefix: dev_)
-- --------------------------------------------------------------------

-- View: Active sessions verification
CREATE OR REPLACE VIEW dev_view_active_sessions AS
SELECT
    s.session_id,
    s.admin_id,
    a.username,
    a.full_name,
    a.role,
    s.ip_address,
    s.last_activity_at,
    s.expires_at,
    s.created_at,
    CASE 
        WHEN s.is_revoked THEN 'revoked'
        WHEN s.expires_at <= NOW() THEN 'expired'
        ELSE 'active'
    END AS status
FROM dev_admin_sessions s
JOIN dev_admins a ON s.admin_id = a.admin_id
WHERE s.is_revoked = FALSE AND s.expires_at > NOW()
ORDER BY s.last_activity_at DESC;

-- View: Active IP Lockouts
CREATE OR REPLACE VIEW dev_view_active_ip_blocks AS
SELECT
    id,
    ip_address,
    failed_attempts,
    block_tier,
    blocked_until,
    ROUND(EXTRACT(EPOCH FROM (blocked_until - NOW())) / 60) AS remaining_minutes,
    last_attempt_username,
    total_lifetime_blocks
FROM dev_admin_ip_blocks
WHERE is_blocked = TRUE AND blocked_until > NOW()
ORDER BY blocked_until DESC;

-- --------------------------------------------------------------------
-- 6. BOOTSTRAP INITIAL SUPER ADMIN SEED QUERY
-- Default credentials: username 'marvel_root', password 'MarvelAdmin#2026'
-- --------------------------------------------------------------------
INSERT INTO dev_admins (username, password_hash, full_name, email, role)
VALUES (
    'marvel_root',
    crypt('MarvelAdmin#2026', gen_salt('bf', 10)),
    'System Administrator',
    'admin@marvelsoftwares.in',
    'super_admin'
)
ON CONFLICT (username) DO NOTHING;

-- --------------------------------------------------------------------
-- 7. AUTOMATIC TIMESTAMP UPDATE TRIGGER
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION dev_update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_dev_admins_updated_at ON dev_admins;
CREATE TRIGGER trg_dev_admins_updated_at
BEFORE UPDATE ON dev_admins
FOR EACH ROW
EXECUTE FUNCTION dev_update_timestamp_column();

DROP TRIGGER IF EXISTS trg_dev_ip_blocks_updated_at ON dev_admin_ip_blocks;
CREATE TRIGGER trg_dev_ip_blocks_updated_at
BEFORE UPDATE ON dev_admin_ip_blocks
FOR EACH ROW
EXECUTE FUNCTION dev_update_timestamp_column();

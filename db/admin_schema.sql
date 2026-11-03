-- ====================================================================
-- MARVEL SOFTWARES — Production Admin & Security Schema (Prefix: dev_)
-- ====================================================================
-- All tables, indexes, and views are prefixed with "dev_" to safely
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
-- 2. DEV_ADMIN_SESSIONS TABLE
-- Authenticated administrator session tokens with expiration tracking.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_admin_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES dev_admins(admin_id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_admin_sessions_admin_id ON dev_admin_sessions (admin_id);
CREATE INDEX IF NOT EXISTS idx_dev_admin_sessions_token ON dev_admin_sessions (token_hash);
CREATE INDEX IF NOT EXISTS idx_dev_admin_sessions_expires_at ON dev_admin_sessions (expires_at);

-- --------------------------------------------------------------------
-- 3. DEV_ADMIN_AUDIT_LOGS TABLE
-- Complete audit trail of administrative modifications and inquiries actions.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_admin_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    admin_id UUID REFERENCES dev_admins(admin_id) ON DELETE SET NULL,
    admin_username VARCHAR(60),
    action VARCHAR(80) NOT NULL, -- 'admin_login', 'admin_created', 'inquiry_status_updated', 'inquiry_deleted', 'data_exported'
    target_type VARCHAR(60),     -- 'dev_admins', 'dev_contact_inquiries', 'dev_telemetry_events'
    target_id VARCHAR(100),
    details JSONB,               -- E.g. { previous_status: 'new', new_status: 'in_discussion' }
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_admin_audit_admin_id ON dev_admin_audit_logs (admin_id);
CREATE INDEX IF NOT EXISTS idx_dev_admin_audit_action ON dev_admin_audit_logs (action);
CREATE INDEX IF NOT EXISTS idx_dev_admin_audit_created_at ON dev_admin_audit_logs (created_at DESC);

-- --------------------------------------------------------------------
-- 4. BOOTSTRAP INITIAL SUPER ADMIN SEED QUERY
-- Creates the initial super admin with secure bcrypt password hash.
-- Default credentials: username 'marvel_root', password 'MarvelAdmin#2026'
-- (Change password immediately upon first login!)
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
-- 5. AUTOMATIC TIMESTAMP UPDATE TRIGGER
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

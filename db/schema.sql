-- ====================================================================
-- MARVEL SOFTWARES — Production PostgreSQL Schema (Prefix: dev_)
-- ====================================================================
-- All tables, indexes, and views are prefixed with "dev_" to safely
-- coexist inside existing or shared databases without table name collisions.
-- Compatible with PostgreSQL 13, 14, 15, 16, 17+ (Local, Docker, Neon, Supabase, RDS).
-- ====================================================================

-- Enable UUID extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- 1. DEV_VISITORS TABLE
-- Stores unique visitor profiles across sessions.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_visitors (
    visitor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    session_count INT NOT NULL DEFAULT 1,
    
    -- Network & Location (Resolved from client IP on backend)
    ip_address INET,
    country VARCHAR(100),
    country_code VARCHAR(10),
    region VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(30),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    timezone VARCHAR(60),
    
    -- Client & Hardware Details
    device_type VARCHAR(20) DEFAULT 'desktop', -- 'mobile', 'tablet', 'desktop'
    browser VARCHAR(50),
    os VARCHAR(50),
    screen_resolution VARCHAR(30),
    language VARCHAR(20),
    referrer TEXT,
    consent_status VARCHAR(20) NOT NULL DEFAULT 'accepted', -- 'accepted', 'declined'

    -- Lead Correlation (Populated when visitor submits contact/inquiry form)
    lead_name VARCHAR(150),
    lead_email VARCHAR(255),
    lead_phone VARCHAR(50),
    lead_address TEXT,
    converted_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_visitors_last_seen ON dev_visitors (last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_dev_visitors_ip ON dev_visitors (ip_address);
CREATE INDEX IF NOT EXISTS idx_dev_visitors_lead_email ON dev_visitors (lead_email) WHERE lead_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_dev_visitors_city ON dev_visitors (city) WHERE city IS NOT NULL;

-- --------------------------------------------------------------------
-- 2. DEV_SESSIONS TABLE
-- Represents visit sessions (rolling 30-minute inactivity window).
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL REFERENCES dev_visitors(visitor_id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    page_views_count INT NOT NULL DEFAULT 1,
    landing_page VARCHAR(255),
    exit_page VARCHAR(255),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_sessions_visitor_id ON dev_sessions (visitor_id);
CREATE INDEX IF NOT EXISTS idx_dev_sessions_started_at ON dev_sessions (started_at DESC);

-- --------------------------------------------------------------------
-- 3. DEV_TELEMETRY_EVENTS TABLE
-- Captures pageviews, section scrolls, CTA clicks, modal previews, and FAQ toggles.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_telemetry_events (
    id BIGSERIAL PRIMARY KEY,
    visitor_id UUID NOT NULL REFERENCES dev_visitors(visitor_id) ON DELETE CASCADE,
    session_id UUID REFERENCES dev_sessions(session_id) ON DELETE CASCADE,
    event_name VARCHAR(60) NOT NULL, -- 'page_view', 'section_view', 'cta_click', 'contact_click', 'form_submit', 'project_view', 'faq_toggle'
    page_path VARCHAR(255) NOT NULL, -- '/', '/faq'
    section_id VARCHAR(60),          -- 'home', 'services', 'projects', 'contact', etc.
    section_name VARCHAR(120),       -- 'Core Engineering Services', etc.
    dwell_time_seconds INT DEFAULT 0,
    element_label VARCHAR(150),
    metadata JSONB,                  -- Freeform event metadata (e.g. { error: "validation" })
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_events_visitor_created ON dev_telemetry_events (visitor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dev_events_session ON dev_telemetry_events (session_id);
CREATE INDEX IF NOT EXISTS idx_dev_events_event_name ON dev_telemetry_events (event_name);
CREATE INDEX IF NOT EXISTS idx_dev_events_section ON dev_telemetry_events (section_id) WHERE section_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_dev_events_created_at ON dev_telemetry_events (created_at DESC);

-- --------------------------------------------------------------------
-- 4. DEV_CONTACT_INQUIRIES TABLE
-- Dedicated, production-ready storage for the Marvel Softwares contact form.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dev_contact_inquiries (
    id BIGSERIAL PRIMARY KEY,
    visitor_id UUID REFERENCES dev_visitors(visitor_id) ON DELETE SET NULL,
    session_id UUID REFERENCES dev_sessions(session_id) ON DELETE SET NULL,
    
    -- Client Contact Details (From Form)
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    solution VARCHAR(100) DEFAULT 'Other',
    requirements TEXT NOT NULL,
    
    -- Network & Location Verification
    ip_address INET,
    city VARCHAR(100),
    region VARCHAR(100),
    country VARCHAR(100),
    user_agent TEXT,

    -- Business Operations & CRM Status
    status VARCHAR(30) NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'in_discussion', 'proposal_sent', 'won', 'lost', 'spam'
    assigned_to VARCHAR(100),                  -- Staff member responsible for follow-up
    admin_notes TEXT,                          -- Internal consultation notes
    is_starred BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dev_inquiries_created_at ON dev_contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dev_inquiries_email ON dev_contact_inquiries (email);
CREATE INDEX IF NOT EXISTS idx_dev_inquiries_phone ON dev_contact_inquiries (phone);
CREATE INDEX IF NOT EXISTS idx_dev_inquiries_visitor ON dev_contact_inquiries (visitor_id);
CREATE INDEX IF NOT EXISTS idx_dev_inquiries_status ON dev_contact_inquiries (status);

-- ====================================================================
-- ANALYTICAL VIEWS (Prefix: dev_)
-- ====================================================================

-- View 1: Daily Website Traffic & Inquiries
CREATE OR REPLACE VIEW dev_view_daily_traffic AS
SELECT
    DATE_TRUNC('day', created_at) AS date,
    COUNT(DISTINCT visitor_id) AS unique_visitors,
    COUNT(DISTINCT session_id) AS total_sessions,
    COUNT(*) FILTER (WHERE event_name = 'page_view') AS total_pageviews,
    COUNT(*) FILTER (WHERE event_name = 'form_submit') AS total_inquiries
FROM dev_telemetry_events
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- View 2: Section Engagement & Average Dwell Time
CREATE OR REPLACE VIEW dev_view_section_engagement AS
SELECT
    section_id,
    section_name,
    COUNT(*) AS total_views,
    COUNT(DISTINCT visitor_id) AS unique_visitors_viewed,
    ROUND(AVG(dwell_time_seconds), 1) AS avg_dwell_seconds
FROM dev_telemetry_events
WHERE event_name = 'section_view' AND section_id IS NOT NULL
GROUP BY section_id, section_name
ORDER BY total_views DESC;

-- View 3: Complete Lead Journey Attribution
-- Shows the exact sequence of sections each prospect read before submitting the contact form!
CREATE OR REPLACE VIEW dev_view_lead_attribution_journey AS
SELECT
    ci.id AS inquiry_id,
    ci.name AS client_name,
    ci.email AS client_email,
    ci.phone AS client_phone,
    ci.address AS client_address,
    ci.solution AS requested_solution,
    ci.requirements,
    ci.city AS client_city,
    ci.status AS inquiry_status,
    ci.created_at AS inquiry_submitted_at,
    v.first_seen AS visitor_first_seen,
    v.session_count,
    v.device_type,
    (
        SELECT STRING_AGG(te.section_id, ' -> ' ORDER BY te.created_at)
        FROM dev_telemetry_events te
        WHERE te.visitor_id = ci.visitor_id
          AND te.event_name = 'section_view'
          AND te.created_at <= ci.created_at
    ) AS sections_explored_journey
FROM dev_contact_inquiries ci
LEFT JOIN dev_visitors v ON ci.visitor_id = v.visitor_id
ORDER BY ci.created_at DESC;

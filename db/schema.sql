-- ====================================================================
-- MARVEL SOFTWARES — Production PostgreSQL Telemetry & Analytics Schema
-- ====================================================================
-- This schema stores first-party visitor telemetry, page/section journeys,
-- and links prospective leads directly to their browsing history.
-- Compatible with PostgreSQL 13, 14, 15, 16, 17+ and cloud Postgres
-- (Supabase, Neon, AWS RDS, GCP Cloud SQL, self-hosted Docker Postgres).
-- ====================================================================

-- Enable UUID extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- 1. VISITORS TABLE
-- Represents a unique browser/device profile over time.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS visitors (
    visitor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    session_count INT NOT NULL DEFAULT 1,
    
    -- Network & Location (Resolved from IP on backend)
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

-- Indexing for fast lookups
CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors (last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_ip ON visitors (ip_address);
CREATE INDEX IF NOT EXISTS idx_visitors_lead_email ON visitors (lead_email) WHERE lead_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_visitors_city ON visitors (city) WHERE city IS NOT NULL;

-- --------------------------------------------------------------------
-- 2. SESSIONS TABLE
-- Represents a single visit window (resets after 30 min of inactivity).
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL REFERENCES visitors(visitor_id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_sessions_visitor_id ON sessions (visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON sessions (started_at DESC);

-- --------------------------------------------------------------------
-- 3. TELEMETRY EVENTS TABLE
-- High-throughput event stream capturing pageviews, section scrolls,
-- CTA clicks, project previews, and contact interactions.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS telemetry_events (
    id BIGSERIAL PRIMARY KEY,
    visitor_id UUID NOT NULL REFERENCES visitors(visitor_id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(session_id) ON DELETE CASCADE,
    event_name VARCHAR(60) NOT NULL, -- 'page_view', 'section_view', 'cta_click', 'contact_click', 'form_submit', 'project_view', 'faq_toggle'
    page_path VARCHAR(255) NOT NULL, -- '/', '/faq'
    section_id VARCHAR(60),          -- 'home', 'services', 'projects', 'contact', etc.
    section_name VARCHAR(120),       -- 'Core Engineering Services', etc.
    dwell_time_seconds INT DEFAULT 0,
    element_label VARCHAR(150),
    metadata JSONB,                  -- Freeform event metadata (e.g. { error: "validation" })
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Optimized indexes for analytical queries
CREATE INDEX IF NOT EXISTS idx_events_visitor_created ON telemetry_events (visitor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_session ON telemetry_events (session_id);
CREATE INDEX IF NOT EXISTS idx_events_event_name ON telemetry_events (event_name);
CREATE INDEX IF NOT EXISTS idx_events_section ON telemetry_events (section_id) WHERE section_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_events_created_at ON telemetry_events (created_at DESC);

-- --------------------------------------------------------------------
-- 4. LEADS TABLE (Inquiries & Consultations)
-- Secure storage of direct business inquiries received from the site.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    visitor_id UUID REFERENCES visitors(visitor_id) ON DELETE SET NULL,
    session_id UUID REFERENCES sessions(session_id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    solution VARCHAR(100) DEFAULT 'Other',
    requirements TEXT NOT NULL,
    ip_address INET,
    city VARCHAR(100),
    country VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'closed'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_visitor ON leads (visitor_id);

-- ====================================================================
-- ANALYTICAL VIEWS FOR REPORTING & DASHBOARDS
-- ====================================================================

-- View 1: Daily Traffic & Unique Visitors
CREATE OR REPLACE VIEW view_daily_traffic AS
SELECT
    DATE_TRUNC('day', created_at) AS date,
    COUNT(DISTINCT visitor_id) AS unique_visitors,
    COUNT(DISTINCT session_id) AS total_sessions,
    COUNT(*) FILTER (WHERE event_name = 'page_view') AS total_pageviews,
    COUNT(*) FILTER (WHERE event_name = 'form_submit') AS total_inquiries
FROM telemetry_events
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- View 2: Section Engagement & Average Dwell Time
CREATE OR REPLACE VIEW view_section_engagement AS
SELECT
    section_id,
    section_name,
    COUNT(*) AS total_views,
    COUNT(DISTINCT visitor_id) AS unique_visitors_viewed,
    ROUND(AVG(dwell_time_seconds), 1) AS avg_dwell_seconds
FROM telemetry_events
WHERE event_name = 'section_view' AND section_id IS NOT NULL
GROUP BY section_id, section_name
ORDER BY total_views DESC;

-- View 3: Complete Lead Journey Attribution
-- Shows the exact sections and pages a prospective client explored before submitting an inquiry!
CREATE OR REPLACE VIEW view_lead_attribution_journey AS
SELECT
    l.id AS lead_id,
    l.name AS client_name,
    l.email AS client_email,
    l.phone AS client_phone,
    l.city AS client_city,
    l.created_at AS lead_submitted_at,
    v.first_seen AS visitor_first_seen,
    v.session_count,
    v.device_type,
    (
        SELECT STRING_AGG(te.section_id, ' -> ' ORDER BY te.created_at)
        FROM telemetry_events te
        WHERE te.visitor_id = l.visitor_id
          AND te.event_name = 'section_view'
          AND te.created_at <= l.created_at
    ) AS sections_explored_journey
FROM leads l
LEFT JOIN visitors v ON l.visitor_id = v.visitor_id
ORDER BY l.created_at DESC;

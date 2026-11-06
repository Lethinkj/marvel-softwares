# Marvel Softwares — PostgreSQL Schema & Ingestion Setup

All database tables, indexes, and views are prefixed with **`dev_`** (`dev_visitors`, `dev_sessions`, `dev_telemetry_events`, `dev_contact_inquiries`) so they can be safely loaded into your existing or shared database without any naming collisions!

---

## 📁 Files in This Directory

* **[`schema.sql`](file:///home/lethin/projects/backup/marvel-dev/db/schema.sql)**: Production DDL schema with `dev_` prefix, indexes, and analytical views.
* **[`server-sample.mjs`](file:///home/lethin/projects/backup/marvel-dev/db/server-sample.mjs)**: Standalone Express + `pg` Node.js server that ingests telemetry and contact form submissions into `dev_*` tables.

---

## 📋 Tables Overview (Prefix: `dev_`)

### 1. `dev_contact_inquiries` (Contact Form Submissions)
Matches the Marvel Softwares consultation form:
* `id`: Serial Primary Key
* `visitor_id`: UUID (foreign key to `dev_visitors`)
* `session_id`: UUID (foreign key to `dev_sessions`)
* `name`: Client Full Name
* `email`: Client Email Address
* `phone`: Client Phone Number
* `address`: Street, city, state
* `solution`: Service requested (`Web Development`, `ERP`, `Mobile App`, `AI & Automation`, `Other`)
* `requirements`: Message / project details
* `ip_address`: Visitor IP address
* `city`, `region`, `country`: Resolved GeoIP location
* `status`: Lead workflow status (`new`, `contacted`, `in_discussion`, `proposal_sent`, `won`, `lost`, `spam`)
* `admin_notes`: Internal follow-up notes
* `created_at`, `updated_at`: Timestamps

### 2. `dev_visitors` (Visitor Profiles)
* `visitor_id`: Persistent UUID stored in client `localStorage`
* `ip_address`: Visitor connection IP
* `country`, `region`, `city`, `latitude`, `longitude`
* `device_type`: `desktop`, `mobile`, `tablet`
* `browser`, `os`, `screen_resolution`, `language`, `referrer`
* `lead_name`, `lead_email`, `lead_phone`: Automatically linked once inquiry is submitted!

### 3. `dev_sessions` (Visit Sessions)
* `session_id`: Session UUID rotating after 30 minutes of inactivity
* `started_at`, `ended_at`, `page_views_count`, `landing_page`

### 4. `dev_telemetry_events` (Page & Section Journey)
* `event_name`: `page_view`, `section_view`, `cta_click`, `contact_click`, `form_submit`, `project_view`, `faq_toggle`
* `section_id`: `home`, `about`, `services`, `projects`, `contact`, etc.
* `dwell_time_seconds`: Reading time in seconds
* `metadata`: JSON payload

### 5. `dev_build_requests` (Build & Price Configurator Leads — optional)
The `/build` wizard stores its structured configuration here. It is written best-effort: even without this table, every request is also saved in `dev_contact_inquiries` and emailed to the admin, so no lead is ever lost.
* `track`: `website` | `software`
* `tier`: `basic` | `modern` | `ultra`
* `accessories`: JSONB array of selected add-on names
* `note`: Free-form client note
* `status`: `new`, `contacted`, `quoted`, `won`, `lost`, `spam`

---

## 🚀 How to Execute Schema in PostgreSQL

Run in terminal:
```bash
# Connect to your existing database and load the schema
psql "postgres://username:password@your-db-host:5432/your_database_name" -f db/schema.sql
```

Or from inside `psql`:
```sql
\c your_existing_db
\i db/schema.sql
```

---

## 🔍 Useful SQL Analytics Queries

### 1. View Inquiries along with their prior Section Browsing History
```sql
SELECT
  client_name,
  client_email,
  client_phone,
  client_city,
  requested_solution,
  inquiry_submitted_at,
  sections_explored_journey
FROM dev_view_lead_attribution_journey;
```

### 2. View Most Engaged Website Sections
```sql
SELECT
  section_name,
  total_views,
  unique_visitors_viewed,
  avg_dwell_seconds
FROM dev_view_section_engagement;
```

### 3. View Daily Traffic Summary
```sql
SELECT * FROM dev_view_daily_traffic;
```

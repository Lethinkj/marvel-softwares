# Marvel Softwares — PostgreSQL Telemetry & Database Setup

This directory contains the production-ready PostgreSQL database schema and ingestion server sample for Marvel Softwares.

---

## 📁 Files Included

* **`schema.sql`**: Full DDL schema for PostgreSQL, including tables (`visitors`, `sessions`, `telemetry_events`, `leads`), analytical indexes, and views (`view_daily_traffic`, `view_section_engagement`, `view_lead_attribution_journey`).
* **`server-sample.mjs`**: Standalone Node.js/Express server demonstrating how to receive telemetry packets, resolve client IP + GeoIP (City, Region, Country), and insert directly into PostgreSQL.

---

## 🚀 Step 1: Connecting to PostgreSQL

You can connect to any PostgreSQL instance:
* **Local / Linux Server**: `sudo apt install postgresql`
* **Docker**: `docker run -d --name marvel-postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=marvel_db -p 5432:5432 postgres:16-alpine`
* **Cloud Managed Postgres**: Supabase, Neon.tech, AWS RDS, GCP Cloud SQL, or DigitalOcean Managed Databases.

### Create the Database & Apply Schema

```bash
# 1. Connect via psql
psql -U postgres -h localhost

# 2. Create database
CREATE DATABASE marvel_telemetry;
\c marvel_telemetry

# 3. Apply the schema
\i db/schema.sql
```

Or run directly from your shell:
```bash
psql "postgres://username:password@localhost:5432/marvel_telemetry" -f db/schema.sql
```

---

## 📊 Step 2: What Gets Stored

### 1. `visitors` Table
* **Visitor ID**: Persistent UUID stored in client `localStorage`.
* **Client IP & Location**: Client IP address, City, Region, Country, Latitude, Longitude.
* **Device**: Mobile/Desktop/Tablet, Browser, OS, Screen Resolution, Language.
* **Lead Correlation**: Once a visitor submits a contact inquiry, their name, email, phone number, and address are automatically tied to this visitor profile!

### 2. `telemetry_events` Table
* **Event Types**: `page_view`, `section_view`, `cta_click`, `contact_click`, `form_submit`, `project_view`, `faq_toggle`.
* **Section ID & Name**: Identifies which section was viewed (e.g. `services` - *Core Engineering Services*).
* **Dwell Time**: Seconds spent reading each section.

### 3. `leads` Table
* Name, Email, Phone, Address, Solution, Project Requirements.
* Connected via `visitor_id` so you can view their prior browsing journey.

---

## 🔍 Useful SQL Queries

### 1. View Most Popular Website Sections by Visitor Interest
```sql
SELECT * FROM view_section_engagement;
```

### 2. View Lead Attribution Journey
```sql
-- Shows the exact sequence of sections each customer read before filling out the form!
SELECT
  client_name,
  client_email,
  client_city,
  lead_submitted_at,
  sections_explored_journey
FROM view_lead_attribution_journey;
```

### 3. List Inquiries from a Specific City (e.g. Coimbatore or Bangalore)
```sql
SELECT name, email, phone, city, requirements, created_at
FROM leads
WHERE city ILIKE '%Coimbatore%' OR city ILIKE '%Bangalore%'
ORDER BY created_at DESC;
```

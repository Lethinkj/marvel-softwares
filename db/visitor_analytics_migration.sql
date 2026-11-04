-- Run once against the existing database before deploying the visitor analytics update.
ALTER TABLE dev_visitors
  ADD COLUMN IF NOT EXISTS user_agent TEXT;

CREATE INDEX IF NOT EXISTS idx_dev_visitors_country
  ON dev_visitors (country);

CREATE INDEX IF NOT EXISTS idx_dev_visitors_last_seen
  ON dev_visitors (last_seen DESC);

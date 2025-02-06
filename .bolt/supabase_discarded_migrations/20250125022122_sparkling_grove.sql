-- Drop existing function and trigger
DROP FUNCTION IF EXISTS send_waitlist_welcome_email CASCADE;
DROP TRIGGER IF EXISTS send_waitlist_welcome_email_trigger ON waitlist_users;
DROP TABLE IF EXISTS waitlist_emails;

-- Keep only the basic waitlist functionality
CREATE TABLE IF NOT EXISTS waitlist_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert into waitlist"
  ON waitlist_users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can read waitlist data"
  ON waitlist_users
  FOR SELECT
  USING (true);

-- Grant necessary permissions
GRANT ALL ON waitlist_users TO anon, authenticated, service_role;
-- Drop existing function and trigger
DROP FUNCTION IF EXISTS handle_waitlist_registration CASCADE;
DROP TRIGGER IF EXISTS on_waitlist_registration ON waitlist_users;

-- Create waitlist_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS waitlist_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert into waitlist" ON waitlist_users;
DROP POLICY IF EXISTS "Public can read waitlist data" ON waitlist_users;

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
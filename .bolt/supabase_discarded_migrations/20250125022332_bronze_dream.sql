-- Drop existing table and functions
DROP TABLE IF EXISTS waitlist_users CASCADE;

-- Create waitlist users table with simplified schema
CREATE TABLE waitlist_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "Anyone can insert into waitlist"
  ON waitlist_users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read waitlist data"
  ON waitlist_users
  FOR SELECT
  USING (true);

-- Grant necessary permissions
GRANT ALL ON waitlist_users TO anon, authenticated, service_role;
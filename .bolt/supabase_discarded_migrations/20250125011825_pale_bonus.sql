-- Drop everything related to waitlist_users first
DROP TABLE IF EXISTS waitlist_users CASCADE;
DROP FUNCTION IF EXISTS update_waitlist_users_updated_at CASCADE;
DROP TRIGGER IF EXISTS update_waitlist_users_updated_at ON waitlist_users CASCADE;
DROP POLICY IF EXISTS "Anyone can insert into waitlist" ON waitlist_users CASCADE;
DROP POLICY IF EXISTS "Public can read waitlist data" ON waitlist_users CASCADE;

-- Create waitlist users table
CREATE TABLE waitlist_users (
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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_waitlist_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_users_updated_at
  BEFORE UPDATE ON waitlist_users
  FOR EACH ROW
  EXECUTE FUNCTION update_waitlist_users_updated_at();

-- Grant ALL permissions explicitly
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE waitlist_users TO anon, authenticated, service_role;
GRANT ALL ON SEQUENCE waitlist_users_id_seq TO anon, authenticated, service_role;
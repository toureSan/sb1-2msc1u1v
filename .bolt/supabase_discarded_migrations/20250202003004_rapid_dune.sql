-- Drop existing waitlist tables if they exist
DROP TABLE IF EXISTS waitlist_users CASCADE;
DROP TABLE IF EXISTS user_waitlist CASCADE;

-- Create simplified user_waitlist table
CREATE TABLE user_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert into user_waitlist"
  ON user_waitlist
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can read user_waitlist data"
  ON user_waitlist
  FOR SELECT
  USING (true);

-- Grant necessary permissions
GRANT ALL ON user_waitlist TO anon, authenticated, service_role;
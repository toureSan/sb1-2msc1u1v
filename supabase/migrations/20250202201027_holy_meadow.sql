-- Create waitlist users table
CREATE TABLE IF NOT EXISTS user_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert access for all users"
  ON user_waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users"
  ON user_waitlist
  FOR SELECT
  TO public
  USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON user_waitlist TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
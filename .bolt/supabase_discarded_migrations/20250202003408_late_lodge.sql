-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert into user_waitlist" ON user_waitlist;
DROP POLICY IF EXISTS "Public can read user_waitlist data" ON user_waitlist;

-- Create more permissive policies for the waitlist
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

-- Ensure proper permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON user_waitlist TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert access for all users" ON user_waitlist;
DROP POLICY IF EXISTS "Enable read access for all users" ON user_waitlist;
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Anyone can insert a user" ON users;

-- Create more permissive policies for user_waitlist
CREATE POLICY "Anyone can insert into waitlist"
  ON user_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read waitlist"
  ON user_waitlist
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create more permissive policies for users
CREATE POLICY "Public profiles are viewable by everyone"
  ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert a user"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
-- Add email column to providers table
ALTER TABLE providers ADD COLUMN IF NOT EXISTS email text UNIQUE NOT NULL;

-- Update existing policies to include email field
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON providers;
DROP POLICY IF EXISTS "Anyone can insert a provider profile" ON providers;
DROP POLICY IF EXISTS "Anyone can update their own profile" ON providers;

-- Recreate policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON providers
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert a provider profile"
  ON providers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own profile"
  ON providers
  FOR UPDATE
  USING (true);
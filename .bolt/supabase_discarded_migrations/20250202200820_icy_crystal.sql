-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON providers;
DROP POLICY IF EXISTS "Users can insert their own profile" ON providers;
DROP POLICY IF EXISTS "Users can update their own profile" ON providers;

-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  address text,
  profile_picture_url text,
  service_description text,
  service_rate numeric,
  service_radius integer,
  experience_description text,
  certifications text[],
  provider_references text[],
  schedule jsonb,
  start_date date,
  services text[],
  rating numeric DEFAULT 4.5,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON providers
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Users can insert their own profile"
  ON providers
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON providers
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_providers_updated_at ON providers;

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
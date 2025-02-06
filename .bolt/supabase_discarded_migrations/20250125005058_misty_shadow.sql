-- Drop and recreate providers table
DROP TABLE IF EXISTS providers CASCADE;

CREATE TABLE providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Recreate policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON providers;
DROP POLICY IF EXISTS "Anyone can insert a provider profile" ON providers;

CREATE POLICY "Public profiles are viewable by everyone"
  ON providers
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert a provider profile"
  ON providers
  FOR INSERT
  WITH CHECK (true);

-- Recreate trigger
DROP TRIGGER IF EXISTS update_providers_updated_at ON providers;
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Recreate storage bucket and policies
DO $$
BEGIN
  -- Drop existing bucket
  DELETE FROM storage.buckets WHERE id = 'profile-pictures';
  -- This will cascade delete all objects and policies
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- Recreate bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true);

-- Recreate storage policies
DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete profile pictures" ON storage.objects;

CREATE POLICY "Profile pictures are publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile-pictures');

CREATE POLICY "Anyone can upload profile pictures"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'profile-pictures');

CREATE POLICY "Anyone can update profile pictures"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'profile-pictures');

CREATE POLICY "Anyone can delete profile pictures"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'profile-pictures');

-- Grant necessary permissions
GRANT ALL ON providers TO anon, authenticated;
GRANT ALL ON storage.buckets TO anon, authenticated;
GRANT ALL ON storage.objects TO anon, authenticated;
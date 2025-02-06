/*
  # Clean up and simplify database schema
  
  1. Changes
    - Remove all duplicate tables and functions
    - Keep only essential tables: users and waitlist_users
    - Add proper RLS policies
    - Add storage configuration for profile pictures
    
  2. Security
    - Enable RLS on all tables
    - Add policies for data protection
    - Add storage policies for profile pictures
*/

-- Clean up everything first
DROP TABLE IF EXISTS providers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS waitlist_users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS update_users_updated_at CASCADE;
DROP FUNCTION IF EXISTS update_waitlist_users_updated_at CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;

-- Remove all storage policies
DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile picture" ON storage.objects;

-- Remove storage bucket
DO $$
BEGIN
  DELETE FROM storage.buckets WHERE id = 'profile-pictures';
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('client', 'provider')),
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

-- Create waitlist users table
CREATE TABLE waitlist_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can insert a user"
  ON users
  FOR INSERT
  WITH CHECK (true);

-- Create policies for waitlist_users table
CREATE POLICY "Anyone can insert into waitlist"
  ON waitlist_users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can read waitlist data"
  ON waitlist_users
  FOR SELECT
  USING (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_waitlist_users_updated_at
  BEFORE UPDATE ON waitlist_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create trigger to automatically insert user data
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true);

-- Create storage policies
CREATE POLICY "Profile pictures are publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can upload their own profile picture"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-pictures' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own profile picture"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'profile-pictures' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own profile picture"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'profile-pictures' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Grant necessary permissions
GRANT ALL ON users TO anon, authenticated, service_role;
GRANT ALL ON waitlist_users TO anon, authenticated, service_role;
GRANT ALL ON storage.buckets TO anon, authenticated, service_role;
GRANT ALL ON storage.objects TO anon, authenticated, service_role;
/*
  # Clean up and simplify database schema
  
  1. Changes
    - Remove all duplicate tables and functions
    - Keep only users table with essential functionality
    - Add profile picture support
    - Add proper RLS policies
    
  2. Security
    - Enable RLS on users table
    - Add policies for user data protection
    - Add storage policies for profile pictures
*/

-- Clean up everything first
DROP TABLE IF EXISTS providers CASCADE;
DROP TABLE IF EXISTS waitlist_users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS update_users_updated_at CASCADE;
DROP FUNCTION IF EXISTS update_waitlist_users_updated_at CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;

-- Remove all storage policies
DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete profile pictures" ON storage.objects;

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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();

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
GRANT ALL ON storage.buckets TO anon, authenticated, service_role;
GRANT ALL ON storage.objects TO anon, authenticated, service_role;
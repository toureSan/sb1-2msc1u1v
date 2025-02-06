-- Create storage bucket for profile pictures if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'profile-pictures'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('profile-pictures', 'profile-pictures', true);
  END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile picture" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile picture" ON storage.objects;

-- Allow public access to profile pictures
CREATE POLICY "Profile pictures are publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile-pictures');

-- Allow authenticated users to upload their own profile picture
CREATE POLICY "Users can upload their own profile picture"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-pictures' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to update their own profile picture
CREATE POLICY "Users can update their own profile picture"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'profile-pictures' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own profile picture
CREATE POLICY "Users can delete their own profile picture"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'profile-pictures' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
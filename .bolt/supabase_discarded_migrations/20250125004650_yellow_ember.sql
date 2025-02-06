-- Drop existing bucket if it exists
DO $$
BEGIN
  DELETE FROM storage.buckets WHERE id = 'profile-pictures';
  DELETE FROM storage.objects WHERE bucket_id = 'profile-pictures';
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload profile pictures" ON storage.objects;

-- Allow public access to profile pictures
CREATE POLICY "Profile pictures are publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile-pictures');

-- Allow public upload to profile pictures
CREATE POLICY "Anyone can upload profile pictures"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'profile-pictures');

-- Allow public update to profile pictures
CREATE POLICY "Anyone can update profile pictures"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'profile-pictures');

-- Allow public delete of profile pictures
CREATE POLICY "Anyone can delete profile pictures"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'profile-pictures');
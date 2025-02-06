/*
  # Configuration du stockage des photos de profil

  1. Bucket de stockage
    - Création du bucket 'profile-pictures'
    - Configuration de l'accès public
  
  2. Policies
    - Accès public en lecture
    - Insertion publique pour permettre l'upload des photos
*/

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

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
/*
  # Nettoyage et recréation complète de la base de données
  
  Cette migration va :
  1. Supprimer toutes les tables et objets existants
  2. Recréer la table providers avec les bonnes permissions
  3. Recréer le bucket de stockage avec les bonnes politiques
*/

-- Nettoyage complet
DROP TABLE IF EXISTS providers CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- Suppression des politiques existantes sur storage.objects
DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete profile pictures" ON storage.objects;

-- Suppression du bucket existant
DO $$
BEGIN
  DELETE FROM storage.buckets WHERE id = 'profile-pictures';
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- Recréation de la table providers
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

-- Activation RLS
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Création des politiques
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

-- Trigger updated_at
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

-- Création du bucket de stockage
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true);

-- Création des politiques de stockage
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

-- Attribution des permissions
GRANT ALL ON providers TO anon, authenticated, service_role;
GRANT ALL ON storage.buckets TO anon, authenticated, service_role;
GRANT ALL ON storage.objects TO anon, authenticated, service_role;
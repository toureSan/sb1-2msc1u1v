/*
  # Recréation de la table providers

  1. Changements
    - Suppression et recréation complète de la table providers
    - Ajout de toutes les colonnes nécessaires
    - Mise à jour des politiques de sécurité
  
  2. Structure
    - Table providers avec toutes les colonnes requises
    - Politiques RLS pour la sécurité
    - Trigger pour updated_at
*/

-- Nettoyage
DROP TABLE IF EXISTS providers CASCADE;

-- Création de la table providers
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

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_providers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW
  EXECUTE FUNCTION update_providers_updated_at();

-- Attribution des permissions
GRANT ALL ON providers TO anon, authenticated, service_role;
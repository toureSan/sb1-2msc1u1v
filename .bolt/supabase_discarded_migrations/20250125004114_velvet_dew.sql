/*
  # Configuration initiale des prestataires

  1. Nouvelle Table
    - `providers`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `address` (text)
      - `profile_picture_url` (text)
      - `service_description` (text)
      - `service_rate` (numeric)
      - `service_radius` (integer)
      - `experience_description` (text)
      - `certifications` (text[])
      - `provider_references` (text[])
      - `schedule` (jsonb)
      - `start_date` (date)
      - `services` (text[])
      - `rating` (numeric)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS
    - Policies pour l'accès public et les modifications
*/

-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
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

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON providers
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert a provider profile"
  ON providers
  FOR INSERT
  WITH CHECK (true);

-- Create updated_at trigger
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
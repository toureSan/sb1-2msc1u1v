/*
  # Create providers table
  
  1. New Tables
    - `providers` table for storing provider-specific data
      - id (uuid, primary key)
      - user_id (uuid, references users.id)
      - service_description (text)
      - service_rate (numeric)
      - service_radius (integer)
      - experience_description (text)
      - certifications (text[])
      - provider_references (text[])
      - schedule (jsonb)
      - start_date (date)
      - services (text[])
      - rating (numeric)
      - status (text)
      
  2. Security
    - Enable RLS on providers table
    - Add policies for data protection
    - Link providers to users table
*/

-- Create providers table
CREATE TABLE providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL UNIQUE,
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
CREATE POLICY "Providers can read their own data"
  ON providers
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Providers can update their own data"
  ON providers
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can insert provider data"
  ON providers
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Grant necessary permissions
GRANT ALL ON providers TO anon, authenticated, service_role;
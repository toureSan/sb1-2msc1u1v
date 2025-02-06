/*
  # Add waitlist users table
  
  1. New Tables
    - `waitlist_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policies for public access
    - Add trigger for updated_at
*/

-- Create waitlist users table
CREATE TABLE IF NOT EXISTS waitlist_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert into waitlist"
  ON waitlist_users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can read waitlist data"
  ON waitlist_users
  FOR SELECT
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_waitlist_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_users_updated_at
  BEFORE UPDATE ON waitlist_users
  FOR EACH ROW
  EXECUTE FUNCTION update_waitlist_users_updated_at();

-- Grant necessary permissions
GRANT ALL ON waitlist_users TO anon, authenticated, service_role;
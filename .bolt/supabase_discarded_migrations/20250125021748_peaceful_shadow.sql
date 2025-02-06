-- Create waitlist_emails table to store email templates
CREATE TABLE waitlist_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  html_body text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Insert welcome email template
INSERT INTO waitlist_emails (subject, html_body)
VALUES (
  'Bienvenue sur la liste d''attente WIM !',
  '<h2>Merci de votre inscription !</h2>
   <p>Nous sommes ravis de vous compter parmi nos futurs utilisateurs.</p>
   <p>Nous vous tiendrons informé dès que notre service sera disponible dans votre région.</p>
   <p>À très bientôt,<br>L''équipe WIM</p>'
);

-- Create function to handle waitlist registration
CREATE OR REPLACE FUNCTION handle_waitlist_registration()
RETURNS TRIGGER AS $$
BEGIN
  -- Here you would typically trigger your email sending logic
  -- For now, we'll just return the NEW record
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for waitlist registration
CREATE TRIGGER on_waitlist_registration
  AFTER INSERT ON waitlist_users
  FOR EACH ROW
  EXECUTE FUNCTION handle_waitlist_registration();
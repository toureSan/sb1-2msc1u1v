/*
  # Add Welcome Email Trigger

  1. New Function
    - Creates a function to send welcome email when a user joins the waitlist
  
  2. Trigger
    - Adds trigger to automatically send email after waitlist registration
*/

-- Create function to send welcome email
CREATE OR REPLACE FUNCTION send_waitlist_welcome_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Send welcome email using Supabase's built-in email functionality
  PERFORM net.http_post(
    url := net.http_build_url(
      'https://api.supabase.com/v1/send-email',
      ARRAY[
        ROW('apikey', current_setting('supabase.auth.email_server_key'))::http_param
      ]
    ),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', concat('Bearer ', current_setting('supabase.auth.email_server_key'))
    ),
    body := jsonb_build_object(
      'to', NEW.email,
      'subject', 'Bienvenue sur la liste d''attente WIM !',
      'html_body', concat(
        '<h2>Merci de votre inscription !</h2>',
        '<p>Nous sommes ravis de vous compter parmi nos futurs utilisateurs.</p>',
        '<p>Nous vous tiendrons informé dès que notre service sera disponible dans votre région.</p>',
        '<p>À très bientôt,<br>L''équipe WIM</p>'
      )
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to send welcome email
CREATE TRIGGER send_waitlist_welcome_email_trigger
  AFTER INSERT ON waitlist_users
  FOR EACH ROW
  EXECUTE FUNCTION send_waitlist_welcome_email();
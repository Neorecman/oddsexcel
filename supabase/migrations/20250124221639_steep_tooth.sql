-- Drop existing policies and tables if they exist
DROP POLICY IF EXISTS "Anyone can read admin roles" ON admin_roles;
DROP TABLE IF EXISTS admin_roles CASCADE;

-- Create a simplified admin_roles table
CREATE TABLE IF NOT EXISTS admin_roles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- Create policy for admin_roles
CREATE POLICY "Anyone can read admin roles"
  ON admin_roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM admin_roles
    WHERE user_id = $1
  );
$$;

-- Insert test admin user if not exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@example.com'
  ) THEN
    INSERT INTO admin_roles (user_id)
    SELECT id
    FROM auth.users
    WHERE email = 'admin@example.com'
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END
$$;
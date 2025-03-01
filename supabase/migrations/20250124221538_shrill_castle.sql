-- Drop existing policies and tables
DROP POLICY IF EXISTS "Admin roles are viewable by authenticated users" ON admin_roles;
DROP TABLE IF EXISTS admin_roles CASCADE;

-- Recreate admin_roles table with simplified structure
CREATE TABLE admin_roles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- Create simple policy for admin_roles
CREATE POLICY "Anyone can read admin roles"
  ON admin_roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert test admin user (you should change this email to your actual admin email)
INSERT INTO admin_roles (user_id)
SELECT id
FROM auth.users
WHERE email = 'admin@example.com'
ON CONFLICT (user_id) DO NOTHING;
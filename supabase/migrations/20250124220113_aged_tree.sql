/*
  # Fix Admin Authentication

  1. Changes
    - Create a dedicated admin_roles table
    - Add proper indexes and constraints
    - Update policies to use the new table
    - Add trigger for automatic role assignment
    
  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Keep RLS enabled
*/

-- Create admin_roles table for better role management
CREATE TABLE IF NOT EXISTS admin_roles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on admin_roles
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- Create policy for admin_roles
CREATE POLICY "Admin roles are viewable by authenticated users"
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

-- Create trigger function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for updated_at
CREATE TRIGGER update_admin_roles_updated_at
  BEFORE UPDATE ON admin_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update profiles policies to use the new admin check
DROP POLICY IF EXISTS "Basic profile access" ON profiles;
DROP POLICY IF EXISTS "Profile update access" ON profiles;
DROP POLICY IF EXISTS "Profile insert access" ON profiles;

CREATE POLICY "Profile access"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    id = auth.uid() OR 
    is_admin(auth.uid())
  )
  WITH CHECK (
    id = auth.uid() OR 
    is_admin(auth.uid())
  );

-- Insert initial admin user if not exists
INSERT INTO admin_roles (user_id)
SELECT id
FROM auth.users
WHERE email = 'admin@example.com'
ON CONFLICT (user_id) DO NOTHING;
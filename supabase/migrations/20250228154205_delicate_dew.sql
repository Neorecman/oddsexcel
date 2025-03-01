/*
  # Create admin user and set up admin role

  1. Updates
    - Create admin role for existing users
    - Set up admin permissions
  
  2. Security
    - Ensure only admins can manage other users
*/

-- Set admin role for specific user (replace with your admin email)
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@example.com'
AND role != 'admin';

-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Create policy for admins to manage all users
CREATE POLICY "Admins can manage all users"
  ON auth.users
  FOR ALL
  TO authenticated
  USING (is_admin());
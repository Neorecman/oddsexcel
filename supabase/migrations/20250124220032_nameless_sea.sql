/*
  # Fix Profile Policies

  1. Changes
    - Remove recursive policies that check admin status within themselves
    - Create simpler, non-recursive policies
    - Add materialized admin role check
    
  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Keep RLS enabled
*/

-- First, clean up existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Create a materialized view for admin users to avoid recursion
CREATE MATERIALIZED VIEW IF NOT EXISTS admin_users AS
SELECT id
FROM profiles
WHERE role = 'admin';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_id ON admin_users(id);

-- Create function to refresh admin users
CREATE OR REPLACE FUNCTION refresh_admin_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY admin_users;
  RETURN NULL;
END;
$$;

-- Create trigger to refresh admin users view
DROP TRIGGER IF EXISTS refresh_admin_users_trigger ON profiles;
CREATE TRIGGER refresh_admin_users_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON profiles
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_admin_users();

-- Create new non-recursive policies
CREATE POLICY "Basic profile access"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Profile update access"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    id = auth.uid() OR 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    id = auth.uid() OR 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Profile insert access"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Refresh the admin users view initially
REFRESH MATERIALIZED VIEW admin_users;
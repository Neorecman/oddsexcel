/*
  # Admin Policies and Role Function

  1. Changes
    - Creates admin-specific policies for profile management
    - Adds is_admin() function for role verification
    - Ensures proper access control for admin operations

  2. Security
    - Implements role-based access control
    - Adds secure function for admin role verification
*/

-- Create admin-specific policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
  DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

  -- Create new policies
  CREATE POLICY "Admins can read all profiles"
    ON profiles
    FOR SELECT
    TO authenticated
    USING (
      (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
      OR auth.uid() = id
    );

  CREATE POLICY "Admins can update all profiles"
    ON profiles
    FOR UPDATE
    TO authenticated
    USING (
      (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
      OR auth.uid() = id
    )
    WITH CHECK (
      (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
      OR auth.uid() = id
    );
END $$;

-- Create or replace the is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$;
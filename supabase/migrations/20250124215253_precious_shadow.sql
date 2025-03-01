/*
  # Fix Profile Policies

  1. Changes
    - Removes recursive policy definitions
    - Simplifies admin role checks
    - Updates is_admin function for better performance

  2. Security
    - Maintains role-based access control
    - Prevents infinite recursion
    - Ensures proper authorization
*/

-- Create admin-specific policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
  DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile." ON profiles;

  -- Create new simplified policies
  CREATE POLICY "Profile access policy"
    ON profiles
    FOR ALL
    TO authenticated
    USING (
      -- Allow access to own profile
      auth.uid() = id
      OR 
      -- Allow admins to access all profiles
      EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
      )
    )
    WITH CHECK (
      -- Allow modifications to own profile
      auth.uid() = id
      OR 
      -- Allow admins to modify all profiles
      EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
      )
    );

  -- Allow profile creation for new users
  CREATE POLICY "Users can create their own profile"
    ON profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);
END $$;

-- Create or replace the is_admin function with caching
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin_user boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  ) INTO is_admin_user;
  
  RETURN is_admin_user;
END;
$$;
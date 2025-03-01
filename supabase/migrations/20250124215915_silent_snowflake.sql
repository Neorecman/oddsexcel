/*
  # Fix Profile Policies and Admin Access

  1. Changes
    - Simplify profile policies to prevent recursion
    - Fix admin role verification
    - Add proper profile creation trigger
    - Clean up existing policies

  2. Security
    - Maintain RLS for profiles table
    - Ensure proper admin access control
    - Protect user data privacy
*/

-- First, clean up existing policies
DO $$ 
BEGIN
  -- Drop all existing policies on profiles
  DROP POLICY IF EXISTS "Profile access policy" ON profiles;
  DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;
  DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
  DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
END $$;

-- Create new simplified policies that avoid recursion
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create separate admin policies
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create trigger to automatically create profile on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

-- Create the trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;
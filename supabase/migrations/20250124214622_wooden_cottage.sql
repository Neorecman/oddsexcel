/*
  # Create admin user and profile

  1. Changes
    - Create admin profile in public.profiles table
    - Set up admin role
  
  2. Security
    - Uses secure role management
    - Maintains RLS policies
*/

-- Create admin profile if not exists
INSERT INTO public.profiles (id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'admin@example.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- Note: The actual admin user must be created through Supabase Auth UI or API
-- as we cannot directly insert into auth.users table
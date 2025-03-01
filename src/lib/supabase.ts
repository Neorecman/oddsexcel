import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase bağlantı bilgileri eksik. Lütfen .env dosyasını kontrol edin.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Simplified connection check for faster response
export const checkConnection = async () => {
  try {
    // Simple health check that doesn't require database access
    const { data, error } = await supabase.auth.getSession();
    return !error;
  } catch (error) {
    console.error('Connection check failed:', error);
    return false;
  }
};
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Clear any existing session on component mount
  useEffect(() => {
    const clearSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && !localStorage.getItem('rememberedCredentials')) {
        await supabase.auth.signOut();
        localStorage.clear();
        sessionStorage.clear();
      }
    };
    clearSession();
  }, []);

  // Load saved credentials only if "Remember Me" was previously checked
  useEffect(() => {
    const savedCredentials = localStorage.getItem('rememberedCredentials');
    if (savedCredentials) {
      const { email, rememberMe } = JSON.parse(savedCredentials);
      if (rememberMe) {
        setFormData(prev => ({ ...prev, email }));
        setRememberMe(true);
      } else {
        // Clear saved credentials if "Remember Me" was not checked
        localStorage.removeItem('rememberedCredentials');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Clear any existing session data first
      if (!rememberMe) {
        await supabase.auth.signOut();
        localStorage.clear();
        sessionStorage.clear();
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        if (rememberMe) {
          // Save credentials only if "Remember Me" is checked
          localStorage.setItem('rememberedCredentials', JSON.stringify({
            email: formData.email,
            rememberMe: true
          }));
        } else {
          // Ensure all storage is cleared if "Remember Me" is not checked
          localStorage.removeItem('rememberedCredentials');
          sessionStorage.clear();
        }

        // Check if user is admin
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (!profileError && profileData && profileData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/analyses');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Giriş Yap
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete={rememberMe ? 'on' : 'off'}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete={rememberMe ? 'email' : 'off'}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete={rememberMe ? 'current-password' : 'off'}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                    if (!e.target.checked) {
                      // Clear saved data when unchecking
                      localStorage.removeItem('rememberedCredentials');
                      sessionStorage.clear();
                    }
                  }}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Beni Hatırla
                </span>
              </label>
              <div className="text-sm">
                <button type="button" className="text-green-600 hover:text-green-500 dark:text-green-400">
                  Şifremi Unuttum
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hesabınız yok mu?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-green-600 hover:text-green-500 dark:text-green-400 font-medium"
              >
                Üye Ol
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
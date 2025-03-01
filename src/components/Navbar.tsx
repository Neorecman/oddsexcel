import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Navbar = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (!error && data) {
          setUserRole(data.role);
        }
      }
    };
    
    fetchUserRole();
  }, [session]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('rememberedCredentials');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:text-green-600 transition-colors duration-200">
              <div className="h-12 w-12 relative">
                <img 
                  src="https://media.discordapp.net/attachments/905519529763954750/1332489534742593678/output.png?ex=67957115&is=67941f95&hm=79ac0753ff24ab5ec1e80e58c7e9441c455f8758fd0992f0e34d530f89169630&=&format=webp&quality=lossless&width=689&height=671" 
                  alt="OddsExcel Logo" 
                  className="h-full w-full object-contain transform scale-125"
                  style={{
                    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>
              <span className="ml-2 text-xl font-bold dark:text-white">OddsExcel</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 transition-colors duration-200">
              Ana Sayfa
            </Link>
            <Link to="/analyses" className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 transition-colors duration-200">
              Analizler
            </Link>
            {session && userRole === 'admin' && (
              <Link to="/admin" className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 transition-colors duration-200">
                Admin Panel
              </Link>
            )}
            {!session ? (
              <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105">
                Giriş Yap
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 px-3 py-2">
                  <User className="h-5 w-5" />
                  <span>{session.user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 transition-colors duration-200">
                Ana Sayfa
              </Link>
              <Link to="/analyses" className="block text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 transition-colors duration-200">
                Analizler
              </Link>
              {session && userRole === 'admin' && (
                <Link to="/admin" className="block text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 transition-colors duration-200">
                  Admin Panel
                </Link>
              )}
              {!session ? (
                <Link to="/login" className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200">
                  Giriş Yap
                </Link>
              ) : (
                <>
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 px-3 py-2">
                    <User className="h-5 w-5" />
                    <span>{session.user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                  >
                    Çıkış Yap
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
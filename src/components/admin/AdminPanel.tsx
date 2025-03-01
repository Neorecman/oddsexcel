import React, { useState } from 'react';
import { Users, FileSpreadsheet, Settings, BarChart3, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import FileUpload from './FileUpload';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-5">
                <div className="h-8 w-8 relative">
                  <img 
                    src="https://media.discordapp.net/attachments/905519529763954750/1332489534742593678/output.png?ex=67957115&is=67941f95&hm=79ac0753ff24ab5ec1e80e58c7e9441c455f8758fd0992f0e34d530f89169630&=&format=webp&quality=lossless&width=689&height=671" 
                    alt="OddsExcel Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'dashboard'
                      ? 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'users'
                      ? 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Kullanıcılar
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'files'
                      ? 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <FileSpreadsheet className="mr-3 h-5 w-5" />
                  Dosya Yükleme
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'settings'
                      ? 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Ayarlar
                </button>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 group block w-full"
              >
                <div className="flex items-center">
                  <div>
                    <LogOut className="inline-block h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-500 group-hover:text-red-700">
                      Çıkış Yap
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-10">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs mt-1">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'users' ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">Kullanıcılar</span>
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'files' ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <FileSpreadsheet className="h-6 w-6" />
              <span className="text-xs mt-1">Dosyalar</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center py-3 px-4 ${
                activeTab === 'settings' ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Settings className="h-6 w-6" />
              <span className="text-xs mt-1">Ayarlar</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'files' && <FileUpload />}
                {activeTab === 'settings' && (
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sistem Ayarları</h2>
                    <p className="text-gray-500 dark:text-gray-400">Ayarlar sayfası yapım aşamasındadır.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
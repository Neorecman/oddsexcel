import React, { useEffect, useState, useRef } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { checkConnection } from '../lib/supabase';

const ConnectionStatus = () => {
  const [status, setStatus] = useState({ online: true, error: null });
  const [isChecking, setIsChecking] = useState(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkConnectionStatus = async () => {
    if (isChecking) return;
    
    setIsChecking(true);
    try {
      const isConnected = await checkConnection();
      setStatus({ online: isConnected, error: isConnected ? null : 'Sunucuya bağlanılamıyor' });
    } catch (error) {
      setStatus({ online: false, error: 'Bağlantı hatası oluştu' });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Initial check with delay to allow other components to load first
    const initialCheckTimeout = setTimeout(() => {
      checkConnectionStatus();
    }, 2000);

    // Regular interval check
    const intervalId = setInterval(checkConnectionStatus, 60000); // Check every minute instead of 30 seconds

    return () => {
      clearTimeout(initialCheckTimeout);
      clearInterval(intervalId);
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, []);

  if (status.online) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center space-x-3">
        <WifiOff className="h-5 w-5 text-red-500" />
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Bağlantı Hatası
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {status.error}
          </p>
        </div>
        <button
          onClick={checkConnectionStatus}
          disabled={isChecking}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <RefreshCw className={`h-4 w-4 text-gray-500 dark:text-gray-400 ${isChecking ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default ConnectionStatus;
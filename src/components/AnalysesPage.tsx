import React, { useState } from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

const AnalysesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const oneDriveUrl = "https://1drv.ms/x/c/994e176d5584d662/EYHqPVu-mkFNvdJkF6kdZsgB2U4A6o7t0TRU236t74Hu6w?e=3SDdZz";
  
  // Use SharePoint embed URL format
  const embedUrl = "https://onedrive.live.com/embed?resid=994E176D5584D662&authkey=!AO7t0TRU236t74Hu6w";

  return (
    <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analizler</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Güncel analiz ve tahminler</p>
        </div>

        {/* Excel Viewer */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <iframe
              src={embedUrl}
              width="100%"
              height="800"
              frameBorder="0"
              className="w-full"
              title="Excel Analizleri"
              onLoad={() => setIsLoading(false)}
            ></iframe>

            {/* Loading Message */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800">
                <div className="text-center p-8">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Excel Görüntüleyici Yükleniyor
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Excel dosyası yükleniyor, lütfen bekleyin...
                  </p>
                  <a 
                    href={oneDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    OneDrive'da Aç
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysesPage;
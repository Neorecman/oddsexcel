import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const AgeVerification = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Always show modal on first load
    setShowModal(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ageVerified', 'true');
    localStorage.setItem('ageVerifiedTimestamp', new Date().getTime().toString());
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-auto transform transition-all duration-300 scale-100">
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 relative">
              <img 
                src="https://media.discordapp.net/attachments/905519529763954750/1332489534742593678/output.png?ex=67957115&is=67941f95&hm=79ac0753ff24ab5ec1e80e58c7e9441c455f8758fd0992f0e34d530f89169630&=&format=webp&quality=lossless&width=689&height=671" 
                alt="OddsExcel Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">OddsExcel</span>
          </div>
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Yasal Uyarı</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              oddsexcel.com bahis şirketlerinin açılış ve kapanış oranları ile oran analizi yapılması için veritabanı sunan bir analiz programıdır.
            </p>
            <p>
              Web sitemiz özel veri analiz programı ile tahminlerinizdeki başarı yüzdesini arttırmayı hedefler, kesinlikle bahis oynatmaz! Hiçbir analiz ve tahminin %100 garantisi yoktur. Ciddi zararlar doğurabilir.
            </p>
            <p>
              Her kullanıcı kendi yaşadığı ülkenin yasal düzenlemeleri ve kanunlarına uymakla yükümlüdür. Türkiye'de yaşayan kullanıcılar için yasal sağlayıcı iddaa.com'dur.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleAccept}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 transform hover:scale-105 font-medium flex items-center justify-center space-x-2"
          >
            <span>18 Yaşından Büyüğüm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
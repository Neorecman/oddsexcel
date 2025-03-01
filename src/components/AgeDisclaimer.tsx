import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AgeDisclaimer: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-40 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-5 w-5 relative">
              <img 
                src="https://media.discordapp.net/attachments/905519529763954750/1332489534742593678/output.png?ex=67957115&is=67941f95&hm=79ac0753ff24ab5ec1e80e58c7e9441c455f8758fd0992f0e34d530f89169630&=&format=webp&quality=lossless&width=689&height=671" 
                alt="OddsExcel Logo" 
                className="h-full w-full object-contain"
                style={{
                  filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
                }}
              />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">OddsExcel</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            18 yaş ve üzeri kullanıcılar içindir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeDisclaimer;
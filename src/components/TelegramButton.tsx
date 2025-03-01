import React from 'react';
import { Send } from 'lucide-react';

const TelegramButton = () => {
  return (
    <a
      href="https://t.me/oddsexcel"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
      aria-label="Join our Telegram channel"
    >
      <Send className="h-6 w-6" />
    </a>
  );
};

export default TelegramButton;
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Send, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Kurumsal': [
      { name: 'Hakkımızda', href: '/about' },
      { name: 'Gizlilik Politikası', href: '/privacy' },
      { name: 'Kullanım Koşulları', href: '/terms' },
    ],
  };

  const socialLinks = [
    { name: 'Youtube', icon: Youtube, href: 'https://youtube.com' },
    { name: 'Telegram', icon: Send, href: 'https://t.me/oddsexcel' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center">
              <div className="h-10 w-10 relative">
                <img 
                  src="https://media.discordapp.net/attachments/905519529763954750/1332489534742593678/output.png?ex=67957115&is=67941f95&hm=79ac0753ff24ab5ec1e80e58c7e9441c455f8758fd0992f0e34d530f89169630&=&format=webp&quality=lossless&width=689&height=671" 
                  alt="OddsExcel Logo" 
                  className="h-full w-full object-contain"
                  style={{
                    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">OddsExcel</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              İçeriğimiz 18 yaşından küçük kullanıcılara yönelik değildir. Sadece analiz yapmak için kullanılmakta olup KESİNLİKLE bahis oynatılmamaktadır.!
            </p>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Sosyal Medya
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    aria-label={name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {category}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400">
              &copy; {currentYear} OddsExcel. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
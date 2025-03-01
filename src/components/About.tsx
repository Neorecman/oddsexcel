import React from 'react';

const About = () => {
  return (
    <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Hakkımızda
            </h1>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p className="leading-relaxed">
                Herhangi bir bahis şirketinin geçmişte açtığı oranlar ile günümüzde açılan maçların oranlarıyla karşılaştırılarak yapılan analiz sistemidir. OddsExcel.com bahis şirketlerinin açılış ve kapanış oranları ile oran analizi yapılması için veritabanı sunan bir analiz programıdır.
              </p>

              <p className="leading-relaxed">
                Bahis şirketleri açtıkları oranları takımların performansı, maçın risk durumu, eksik oyuncular, hava şartları ve bizim bilmediğimiz bir çok etkene göre belirler. Bahis şirketleri belirledikleri bu oranları aslında oyunculara satar, oyuncularda bu oranlara para yatırarak kazanç elde etmeye çalışır. Bu sebeple geçmişte açılan oranlar ile oran analizi yapmak en iyi yol gösterici ve analiz yöntemlerinden biridir. Hiçbir analizde olmadığı gibi oran analizinde de %100 başarı mümkün olmayıp, yatırım tavsiyesi değildir.
              </p>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-900">
                <p className="text-yellow-800 dark:text-yellow-200">
                  OddsExcel.com özel veri analiz programı ile tahminlerinizdeki başarı yüzdesini arttırmayı hedefler, kesinlikle bahis oynatmaz!
                </p>
              </div>

              <p className="leading-relaxed">
                Her kullanıcı kendi yaşadığı ülkenin yasal düzenlemeleri ve kanunlarına uymakla yükümlüdür.
              </p>

              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-900">
                <p className="text-green-800 dark:text-green-200">
                  Türkiye'de yaşayan kullanıcılar için yasal sağlayıcı iddaa.com'dur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
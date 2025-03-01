import React from 'react';

const Privacy = () => {
  return (
    <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Gizlilik Politikası
            </h1>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p className="text-sm mb-8">
                Web sitesi türü: Web analiz portalı.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Amaç</h2>
                <p>Bu gizlilik politikasının (bu "Gizlilik Politikası") amacı, Sitemizin kullanıcılarını aşağıdakiler hakkında bilgilendirmektir:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Toplayacağımız kişisel veriler;</li>
                  <li>Toplanan verilerin kullanımı;</li>
                  <li>Toplanan verilere kimin erişimi var?</li>
                  <li>Site kullanıcılarının hakları; ve</li>
                  <li>Sitenin çerez politikası.</li>
                </ul>
                <p className="mt-4">Bu Gizlilik Politikası, Sitemizin hüküm ve koşullarına ek olarak geçerlidir.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Rıza</h2>
                <p>Kullanıcılar Sitemizi kullanarak aşağıdakileri kabul etmiş olurlar:</p>
                <p>Bu Gizlilik Politikasında belirtilen koşullar.</p>
                <p>Kişisel verilerinizi işlememizin yasal dayanağı söz konusu işleme için onay vermiş olmanız olduğunda, onayınızı istediğiniz zaman geri çekebilirsiniz. Onayınızı geri çekmeniz, siz onayınızı geri çekmeden önce tamamladığımız işlemeyi hukuka aykırı hale getirmeyecektir.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">İşlemenin Yasal Dayanağı</h2>
                <ul className="list-disc pl-6 space-y-4">
                  <li>Kullanıcılar, verilerinin bir veya daha fazla özel amaç için işlenmesine izin vermişlerdir;</li>
                  <li>Kullanıcı kişisel verilerinin işlenmesi, bizim veya üçüncü bir tarafın meşru bir menfaati takip etmesi için gereklidir.</li>
                  <li>Kullanıcı kişisel verilerinin işlenmesi, bir kullanıcının talebi üzerine, bir sözleşmeye girmeden önce veya bir kullanıcının taraf olduğu bir sözleşmenin ifası için gerekli adımları atmamız için gereklidir.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">İletişim Bilgileri</h2>
                <p>Soru ve önerileriniz için lütfen bizimle iletişime geçin.</p>
                <p>İletişim bilgilerimiz aşağıdaki gibidir;</p>
                <p>Bizimle iletişime geçmek için "info@orananaliziyap.com" adresine e-posta gönderin.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
import React from 'react';

const Terms = () => {
  return (
    <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Şartlar ve Koşullar
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p className="mb-6">
                Bu platformu kullanarak, belirtilen tüm şartları ve koşulları kabul etmiş sayılırsınız. 
                Platformdaki içeriklerin tüm hakları saklıdır ve izinsiz kullanımı yasaktır. 
                Kullanıcılar platformu yasal ve etik kurallara uygun şekilde kullanmakla yükümlüdür.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Yasal Uyarı</h2>
                <p>
                  Bu platform üzerinden sunulan bilgiler sadece bilgilendirme amaçlıdır. 
                  İçeriklerin kullanımından doğabilecek herhangi bir zarardan platform sorumlu tutulamaz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Sorumluluk Reddi</h2>
                <p>
                  Platform içeriğinin doğruluğu ve güncelliği konusunda garanti vermemektedir. 
                  Kullanıcılar, içerikleri kendi sorumluluklarında kullanır.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
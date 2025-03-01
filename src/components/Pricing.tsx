import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Başlangıç',
    price: '49',
    features: [
      'Günlük 3 analiz',
      'Temel istatistikler',
      'Forum erişimi',
      'Email desteği',
    ],
  },
  {
    name: 'Premium',
    price: '149',
    features: [
      'Sınırsız analiz',
      'Detaylı istatistikler',
      'VIP forum erişimi',
      '7/24 Whatsapp desteği',
      'Özel analiz talep hakkı',
      'Canlı maç analizleri',
    ],
    popular: true,
  },
  {
    name: 'Profesyonel',
    price: '299',
    features: [
      'Premium paket özellikleri',
      'Birebir danışmanlık',
      'Özel stratejiler',
      'Risk yönetimi desteği',
      'Telegram özel grup',
      'Öncelikli destek',
    ],
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Üyelik Paketleri
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Size en uygun paketi seçin, analizlerimizden faydalanmaya başlayın.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-green-600' : ''
              }`}
            >
              <div className="px-6 py-8 bg-white">
                {plan.popular && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full mb-4">
                    En Popüler
                  </span>
                )}
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /ay
                    </span>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="ml-3 text-base text-gray-500">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-6 py-8 bg-gray-50">
                <button
                  onClick={() => navigate(`/register/${plan.name}`)}
                  className={`w-full py-3 px-6 rounded-md shadow-sm text-center text-base font-medium transition-all duration-200 transform hover:scale-105 ${
                    plan.popular
                      ? 'text-white bg-green-600 hover:bg-green-700'
                      : 'text-green-600 bg-white hover:bg-gray-50 border border-green-600'
                  }`}
                >
                  Paketi Seç
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
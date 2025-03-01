import React from 'react';
import { BarChart3, Shield, Trophy, Users } from 'lucide-react';

const features = [
  {
    name: 'Detaylı Analizler',
    description: 'Her maç için kapsamlı istatistikler ve profesyonel analizler.',
    icon: BarChart3,
  },
  {
    name: 'Güvenli Sistem',
    description: 'SSL korumalı güvenli ödeme sistemi ve veri güvenliği.',
    icon: Shield,
  },
  {
    name: 'Uzman Kadro',
    description: 'Alanında uzman analistlerden oluşan profesyonel ekip.',
    icon: Trophy,
  },
  {
    name: 'Aktif Topluluk',
    description: '10.000+ aktif üye ile büyüyen analiz topluluğu.',
    icon: Users,
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            En güncel veriler ve profesyonel analizlerle kazanma şansınızı artırın.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-green-600 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
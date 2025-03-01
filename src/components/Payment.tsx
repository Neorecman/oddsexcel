import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Payment = () => {
  const { plan } = useParams();
  const navigate = useNavigate();

  const prices = {
    'Başlangıç': '49',
    'Premium': '149',
    'Profesyonel': '299'
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Ödeme Bilgileri
          </h2>
          <div className="mb-8">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Seçilen Paket: {plan}</h3>
              <p className="text-2xl font-bold text-blue-600">{prices[plan as keyof typeof prices]} TL/ay</p>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                  Kart Üzerindeki İsim
                </label>
                <input
                  type="text"
                  id="cardName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Kart Numarası
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                    Son Kullanma Tarihi
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
              >
                Ödemeyi Tamamla
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
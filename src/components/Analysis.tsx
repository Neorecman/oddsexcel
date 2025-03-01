import React from 'react';

const matches = [
  {
    league: 'Süper Lig',
    home: 'Galatasaray',
    away: 'Fenerbahçe',
    date: '2024-03-17 19:00',
    odds: { home: 2.10, draw: 3.40, away: 3.20 },
    prediction: 'Galatasaray & Üst 2.5',
  },
  {
    league: 'Premier Lig',
    home: 'Arsenal',
    away: 'Liverpool',
    date: '2024-03-17 17:30',
    odds: { home: 2.30, draw: 3.50, away: 2.90 },
    prediction: 'KG Var & Üst 2.5',
  },
  {
    league: 'La Liga',
    home: 'Real Madrid',
    away: 'Barcelona',
    date: '2024-03-17 22:00',
    odds: { home: 1.95, draw: 3.60, away: 3.50 },
    prediction: 'Real Madrid',
  },
];

const Analysis = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Günün Öne Çıkan Analizleri
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-green-600">{match.league}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(match.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-semibold">{match.home}</div>
                  <div className="text-sm text-gray-500">vs</div>
                  <div className="text-lg font-semibold">{match.away}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">1</div>
                    <div className="font-semibold">{match.odds.home}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">X</div>
                    <div className="font-semibold">{match.odds.draw}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">2</div>
                    <div className="font-semibold">{match.odds.away}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
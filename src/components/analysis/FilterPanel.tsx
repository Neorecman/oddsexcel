import React from 'react';
import { Calendar, Filter } from 'lucide-react';

const FilterPanel = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Filtreler
      </h3>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tarih Aralığı
        </label>
        <div className="flex space-x-2">
          <input
            type="date"
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="date"
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* League Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Lig
        </label>
        <select className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white">
          <option>Tüm Ligler</option>
          <option>Premier Lig</option>
          <option>La Liga</option>
          <option>Bundesliga</option>
          <option>Serie A</option>
        </select>
      </div>

      {/* Match Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Maç Tipi
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Lig Maçları</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Kupa Maçları</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Hazırlık Maçları</span>
          </label>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
        Filtreleri Uygula
      </button>
    </div>
  );
};

export default FilterPanel;
import React from 'react';
import { BarChart3, TrendingUp, Calendar, Filter, Download } from 'lucide-react';
import DataGrid from './DataGrid';
import TrendChart from './TrendChart';
import FilterPanel from './FilterPanel';
import MetricsPanel from './MetricsPanel';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analiz Paneli</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Detaylı istatistikler ve analizler
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filtrele
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricsPanel />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Trend Analizi
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  Günlük
                </button>
                <button className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  Haftalık
                </button>
                <button className="px-3 py-1 text-sm rounded-md bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-300">
                  Aylık
                </button>
              </div>
            </div>
            <TrendChart />
          </div>

          {/* Filter Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <FilterPanel />
          </div>
        </div>

        {/* Data Grid */}
        <div className="mt-8">
          <DataGrid />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
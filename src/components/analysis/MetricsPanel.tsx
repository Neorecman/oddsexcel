import React from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart2 } from 'lucide-react';

const metrics = [
  {
    title: 'Başarı Oranı',
    value: '68%',
    change: '+2.5%',
    trend: 'up',
    icon: Activity,
  },
  {
    title: 'Toplam Analiz',
    value: '1,284',
    change: '+12%',
    trend: 'up',
    icon: BarChart2,
  },
  {
    title: 'Ortalama Oran',
    value: '2.45',
    change: '-0.3',
    trend: 'down',
    icon: TrendingDown,
  },
  {
    title: 'Kazanç Oranı',
    value: '58%',
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
  },
];

const MetricsPanel = () => {
  return (
    <>
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <metric.icon
                  className={`h-6 w-6 ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {metric.title}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {metric.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <span
                className={`font-medium ${
                  metric.trend === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {metric.change}
              </span>
              <span className="text-gray-500 dark:text-gray-300 ml-2">
                geçen aya göre
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MetricsPanel;
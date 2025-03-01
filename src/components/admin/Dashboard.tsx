import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BarChart3, Users, FileSpreadsheet, Activity, Cpu, Clock, Database } from 'lucide-react';
import { DataGrid, UserManagement, ActivityLogs } from './';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: {
      total: 2847,
      active24h: 856,
      trend: '+15%',
      onlineCount: 234
    },
    analyses: {
      total: 1256,
      today: 45,
      trend: '+8%'
    },
    visits: {
      daily: 15234,
      avgDuration: '12m 34s',
      bounceRate: '32%',
      trend: '+12%'
    },
    performance: {
      uptime: '99.2%',
      responseTime: '245ms',
      cpuUsage: '42%',
      memoryUsage: '68%',
      trend: '+0.5%'
    }
  });

  // Simüle edilmiş gerçek zamanlı güncelleme
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        users: {
          ...prevStats.users,
          total: prevStats.users.total + Math.floor(Math.random() * 3),
          active24h: 800 + Math.floor(Math.random() * 100),
          onlineCount: 200 + Math.floor(Math.random() * 50)
        },
        performance: {
          ...prevStats.performance,
          responseTime: `${240 + Math.floor(Math.random() * 10)}ms`,
          cpuUsage: `${40 + Math.floor(Math.random() * 5)}%`,
          memoryUsage: `${65 + Math.floor(Math.random() * 5)}%`
        }
      }));
    }, 5000); // 5 saniyede bir güncelle

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Toplam Kullanıcı"
            value={stats.users.total.toLocaleString()}
            subValue={`${stats.users.active24h} aktif kullanıcı`}
            icon={Users}
            trend={stats.users.trend}
          />
          <StatCard
            title="Aktif Analizler"
            value={stats.analyses.total.toLocaleString()}
            subValue={`Bugün: ${stats.analyses.today} yeni`}
            icon={FileSpreadsheet}
            trend={stats.analyses.trend}
          />
          <StatCard
            title="Günlük Ziyaret"
            value={stats.visits.daily.toLocaleString()}
            subValue={`Ort. Süre: ${stats.visits.avgDuration}`}
            icon={BarChart3}
            trend={stats.visits.trend}
          />
          <StatCard
            title="Sistem Performansı"
            value={stats.performance.uptime}
            subValue={`${stats.performance.responseTime} yanıt süresi`}
            icon={Activity}
            trend={stats.performance.trend}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistem Performansı</h3>
            <div className="grid grid-cols-2 gap-4">
              <PerformanceMetric
                icon={Clock}
                title="Yanıt Süresi"
                value={stats.performance.responseTime}
                color="blue"
              />
              <PerformanceMetric
                icon={Cpu}
                title="CPU Kullanımı"
                value={stats.performance.cpuUsage}
                color="green"
              />
              <PerformanceMetric
                icon={Database}
                title="Bellek Kullanımı"
                value={stats.performance.memoryUsage}
                color="purple"
              />
              <PerformanceMetric
                icon={Activity}
                title="Çevrimiçi Kullanıcı"
                value={stats.users.onlineCount.toString()}
                color="yellow"
              />
            </div>
          </div>
          <div>
            <ActivityLogs />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DataGrid />
          <UserManagement />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subValue: string;
  icon: React.FC<any>;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subValue, icon: Icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          <p className="mt-1 text-sm text-gray-500">{subValue}</p>
        </div>
        <div className="bg-blue-50 rounded-full p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-green-600 text-sm font-medium">{trend}</span>
        <span className="text-gray-500 text-sm ml-2">vs geçen ay</span>
      </div>
    </div>
  );
};

interface PerformanceMetricProps {
  icon: React.FC<any>;
  title: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
      <div className={`rounded-full p-2 ${colorClasses[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Activity, User, FileText, Settings } from 'lucide-react';

const activities = [
  {
    id: '1',
    type: 'user',
    action: 'Yeni premium üye kaydı',
    user: 'Mehmet Yılmaz',
    time: '3 dakika önce',
    icon: User
  },
  {
    id: '2',
    type: 'file',
    action: 'Yeni analiz yayınlandı',
    user: 'Ayşe Kaya',
    time: '12 dakika önce',
    icon: FileText
  },
  {
    id: '3',
    type: 'settings',
    action: 'Sistem güncellemesi',
    user: 'Admin',
    time: '45 dakika önce',
    icon: Settings
  },
  {
    id: '4',
    type: 'user',
    action: 'Kullanıcı yetkisi güncellendi',
    user: 'Ali Demir',
    time: '1 saat önce',
    icon: User
  }
];

const ActivityLogs = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Aktivite Logları</h2>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex space-x-3">
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${activity.type === 'user' ? 'bg-green-100' : 
                activity.type === 'file' ? 'bg-blue-100' : 'bg-purple-100'}
            `}>
              <activity.icon className={`h-4 w-4
                ${activity.type === 'user' ? 'text-green-600' :
                  activity.type === 'file' ? 'text-blue-600' : 'text-purple-600'}
              `} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-500">
                {activity.user}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full text-center text-sm text-blue-600 hover:text-blue-700">
        Tüm aktiviteleri görüntüle
      </button>
    </div>
  );
};

export default ActivityLogs;
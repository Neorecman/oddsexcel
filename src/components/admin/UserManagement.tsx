import React, { useState } from 'react';
import { User, Shield, Trash2, Edit } from 'lucide-react';

const UserManagement = () => {
  const [users] = useState([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      role: 'premium',
      lastLogin: '2024-03-19 15:45',
      status: 'active'
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      role: 'moderator',
      lastLogin: '2024-03-19 14:30',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      role: 'premium',
      lastLogin: '2024-03-19 13:15',
      status: 'active'
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Kullanıcı Yönetimi</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Yeni Kullanıcı
        </button>
      </div>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span className="capitalize">{user.role}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Edit className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
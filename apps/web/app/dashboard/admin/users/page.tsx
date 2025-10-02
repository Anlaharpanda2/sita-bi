import React from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

// Dummy data, replace with actual data from your API
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Mahasiswa',
    status: 'Aktif',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Dosen',
    status: 'Aktif',
  },
  {
    id: 3,
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    role: 'Admin',
    status: 'Nonaktif',
  },
  // ... more users
];

const RoleBadge = ({ role }) => {
  const baseClasses = 'px-3 py-1 text-sm font-semibold rounded-full';
  let roleClasses = '';
  switch (role) {
    case 'Admin':
      roleClasses = 'bg-maroon-100 text-maroon-800';
      break;
    case 'Dosen':
      roleClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'Mahasiswa':
      roleClasses = 'bg-green-100 text-green-800';
      break;
    default:
      roleClasses = 'bg-gray-100 text-gray-800';
  }
  return <span className={`${baseClasses} ${roleClasses}`}>{role}</span>;
};

const StatusBadge = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-sm font-semibold rounded-full';
  const statusClasses = status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

export default function KelolaPenggunaPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-maroon-800">Kelola Pengguna</h1>
        <button className="flex items-center bg-maroon-600 text-white px-4 py-2 rounded-lg hover:bg-maroon-700 transition-colors duration-200">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Pengguna
        </button>
      </div>

      <div className="mb-6 flex items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Cari pengguna..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
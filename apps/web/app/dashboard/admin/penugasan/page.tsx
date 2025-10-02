import React from 'react';
import { Plus, Search, UserPlus } from 'lucide-react';

// Dummy data, replace with actual data from your API
const assignments = [
  {
    id: 1,
    studentName: 'Budi Santoso',
    taTitle: 'Pengembangan Sistem Informasi Akademik...',
    pembimbing1: 'Dr. Ir. Suryo, M.Sc.',
    pembimbing2: '-',
    penguji1: '-',
    penguji2: '-',
  },
  {
    id: 2,
    studentName: 'Citra Lestari',
    taTitle: 'Analisis Sentimen Opini Publik...',
    pembimbing1: 'Prof. Dr. Retno, S.Kom.',
    pembimbing2: 'Dr. Budi, M.Kom.',
    penguji1: '-',
    penguji2: '-',
  },
  // ... more assignments
];

export default function PenugasanPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-maroon-800">Penugasan Dosen</h1>
      </div>

      <div className="mb-6 flex items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Cari mahasiswa atau judul TA..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mahasiswa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pembimbing 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pembimbing 2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penguji 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penguji 2</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{assignment.studentName}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{assignment.taTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{assignment.pembimbing1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{assignment.pembimbing2}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{assignment.penguji1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{assignment.penguji2}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="flex items-center text-maroon-600 hover:text-maroon-800">
                    <UserPlus className="w-5 h-5 mr-1" />
                    Tugaskan
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
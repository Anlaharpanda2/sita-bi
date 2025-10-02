import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Dummy data, replace with actual data from your API
const announcements = [
  {
    id: 1,
    title: 'Jadwal Sidang Tugas Akhir Semester Ganjil 2024/2025',
    excerpt: 'Diberitahukan kepada seluruh mahasiswa tingkat akhir bahwa jadwal sidang...',
    publishDate: '20 Oktober 2024',
  },
  {
    id: 2,
    title: 'Perpanjangan Waktu Pengumpulan Laporan Kemajuan',
    excerpt: 'Mengingat adanya kendala teknis, maka waktu pengumpulan laporan kemajuan...',
    publishDate: '15 Oktober 2024',
  },
  // ... more announcements
];

export default function PengumumanPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-maroon-800">Kelola Pengumuman</h1>
        <Link
          href="/dashboard/admin/pengumuman/create"
          className="flex items-center bg-maroon-600 text-white px-4 py-2 rounded-lg hover:bg-maroon-700 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Buat Pengumuman
        </Link>
      </div>

      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{announcement.title}</h2>
                <p className="text-gray-600 mb-4">{announcement.excerpt}</p>
                <p className="text-sm text-gray-500">Diterbitkan pada: {announcement.publishDate}</p>
              </div>
              <div className="flex items-center space-x-3 ml-4">
                <Link href={`/dashboard/admin/pengumuman/edit/${announcement.id}`}>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Edit className="w-5 h-5" />
                  </button>
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
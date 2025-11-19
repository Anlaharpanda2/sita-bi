'use client';

import Link from 'next/link';
import {
  PlusCircle,
  MessageSquare,
  Calendar,
  FileText,
  BookOpen,
  Bell,
} from 'lucide-react';

export default function QuickActions() {
  const actions = [
    {
      title: 'Ajukan Judul',
      description: 'Ajukan judul tugas akhir baru',
      href: '/dashboard/mahasiswa/tugas-akhir',
      icon: PlusCircle,
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Catat Bimbingan',
      description: 'Tambah catatan bimbingan',
      href: '/dashboard/mahasiswa/bimbingan',
      icon: MessageSquare,
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Jadwal Sidang',
      description: 'Lihat jadwal sidang',
      href: '/dashboard/mahasiswa/jadwal-sidang',
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Daftar Sidang',
      description: 'Daftarkan diri untuk sidang',
      href: '/dashboard/mahasiswa/sidang',
      icon: FileText,
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Pengumuman',
      description: 'Lihat pengumuman terbaru',
      href: '/dashboard/mahasiswa/pengumuman',
      icon: Bell,
      gradient: 'from-amber-500 to-yellow-500',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Dokumen',
      description: 'Kelola dokumen tugas akhir',
      href: '/dashboard/mahasiswa/tugas-akhir',
      icon: BookOpen,
      gradient: 'from-indigo-500 to-blue-500',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Aksi Cepat</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link key={action.title} href={action.href}>
            <div
              className="group relative p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              {/* Content */}
              <div className="relative">
                <div
                  className={`${action.iconBg} p-3 rounded-xl inline-flex group-hover:scale-110 transition-transform duration-300 mb-3`}
                >
                  <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                </div>

                <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {action.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Bottom accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${action.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              ></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

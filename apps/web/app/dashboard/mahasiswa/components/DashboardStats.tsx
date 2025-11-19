'use client';

import { useEffect, useState } from 'react';
import {
  BookOpen,
  MessagesSquare,
  TrendingUp,
  Calendar,
  Award,
} from 'lucide-react';

interface StatsData {
  tugasAkhir: {
    total: number;
    disetujui: number;
    pending: number;
    ditolak: number;
  };
  bimbingan: {
    total: number;
    bulanIni: number;
    rataRata: number;
  };
  sidang: {
    status: string;
    tanggal: string | null;
  };
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API
    setTimeout(() => {
      setStats({
        tugasAkhir: {
          total: 3,
          disetujui: 1,
          pending: 1,
          ditolak: 1,
        },
        bimbingan: {
          total: 12,
          bulanIni: 4,
          rataRata: 3,
        },
        sidang: {
          status: 'Terdaftar',
          tanggal: '2025-12-15',
        },
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
          >
            <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Pengajuan',
      value: stats?.tugasAkhir.total || 0,
      subtitle: `${stats?.tugasAkhir.disetujui || 0} Disetujui`,
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      trend: '+12%',
    },
    {
      title: 'Sesi Bimbingan',
      value: stats?.bimbingan.total || 0,
      subtitle: `${stats?.bimbingan.bulanIni || 0} Bulan ini`,
      icon: MessagesSquare,
      gradient: 'from-emerald-500 to-green-500',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      trend: '+8%',
    },
    {
      title: 'Status Sidang',
      value: stats?.sidang.status || 'Belum',
      subtitle: stats?.sidang.tanggal ? new Date(stats.sidang.tanggal).toLocaleDateString('id-ID') : 'Belum dijadwalkan',
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      trend: '',
    },
    {
      title: 'Progress TA',
      value: '75%',
      subtitle: 'Menuju sidang',
      icon: Award,
      gradient: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      trend: '+5%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((card, index) => (
        <div
          key={card.title}
          className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          ></div>

          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`${card.iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
              >
                <card.icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
              {card.trend && (
                <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {card.trend}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                {card.value}
              </p>
              <p className="text-xs text-gray-500">{card.subtitle}</p>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
          ></div>
        </div>
      ))}
    </div>
  );
}

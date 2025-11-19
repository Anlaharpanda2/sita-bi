'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface TimelineItem {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
}

export default function ProgressTimeline() {
  const [timeline] = useState<TimelineItem[]>([
    {
      title: 'Pengajuan Judul',
      description: 'Judul tugas akhir telah disetujui',
      status: 'completed',
      date: '15 Sep 2024',
    },
    {
      title: 'Bimbingan',
      description: '12 sesi bimbingan telah dilakukan',
      status: 'current',
      date: 'Sedang berlangsung',
    },
    {
      title: 'Pendaftaran Sidang',
      description: 'Menunggu kelengkapan berkas',
      status: 'upcoming',
    },
    {
      title: 'Sidang Tugas Akhir',
      description: 'Belum dijadwalkan',
      status: 'upcoming',
    },
  ]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Timeline Progress</h3>
        <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Tahap 2/4
        </div>
      </div>

      <div className="space-y-6">
        {timeline.map((item, index) => (
          <div
            key={item.title}
            className="group relative flex gap-4 hover:bg-gray-50 p-3 rounded-xl transition-all duration-300"
          >
            {/* Timeline line */}
            {index < timeline.length - 1 && (
              <div className="absolute left-7 top-12 bottom-0 w-0.5 bg-gray-200 group-hover:bg-blue-300 transition-colors duration-300"></div>
            )}

            {/* Status icon */}
            <div className="relative flex-shrink-0">
              {item.status === 'completed' && (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              )}
              {item.status === 'current' && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-blue-50">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              )}
              {item.status === 'upcoming' && (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Circle className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4
                  className={`font-semibold ${
                    item.status === 'completed'
                      ? 'text-gray-900'
                      : item.status === 'current'
                      ? 'text-blue-900'
                      : 'text-gray-500'
                  } group-hover:text-blue-600 transition-colors duration-300`}
                >
                  {item.title}
                </h4>
                {item.date && (
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {item.date}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Progress Keseluruhan
          </span>
          <span className="text-sm font-bold text-blue-600">50%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out hover:from-blue-600 hover:to-purple-600"
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

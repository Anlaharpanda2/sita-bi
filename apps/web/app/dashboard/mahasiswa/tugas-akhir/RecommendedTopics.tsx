'use client';

import { BookMarked, PlusCircle, User, Users2, Sparkles, TrendingUp } from 'lucide-react';
import Card from '@/app/components/ui/Card';
import { useRecommendedTopics } from '@/hooks/useTugasAkhir';
import SkeletonCard from '@/app/components/loading/SkeletonCard';

interface RecommendedTopicsProps {
  onSelectTitle: (_title: string) => void;
}

export default function RecommendedTopics({
  onSelectTitle,
}: RecommendedTopicsProps) {
  const { recommendedTitles, loading } = useRecommendedTopics();

  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (recommendedTitles.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-300 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookMarked className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-700 text-base font-semibold mb-2">Tidak Ada Topik Tersedia</p>
          <p className="text-gray-500 text-sm">
            Periksa kembali nanti untuk topik rekomendasi dari dosen ahli kami.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-maroon-900 p-3 rounded-lg">
          <BookMarked className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-700">
            Topik Rekomendasi
          </h2>
          <p className="text-sm text-gray-500">Dikurasi oleh dosen ahli untuk Anda</p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        {recommendedTitles.map((topic, idx) => (
          <div
            key={topic.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-maroon-900/30 transition-all duration-300"
          >
            <div className="flex gap-4">
              {/* Left Side - Number */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-maroon-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {idx + 1}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">
                  {topic.judul_topik}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {topic.deskripsi}
                </p>
                
                {/* Info Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Lecturer */}
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <User className="h-4 w-4 text-maroon-900" />
                    <div>
                      <p className="text-xs text-gray-500">Dosen</p>
                      <p className="text-sm font-semibold text-gray-800">{topic.dosenPencetus.name}</p>
                    </div>
                  </div>

                  {/* Quota */}
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <Users2 className="h-4 w-4 text-maroon-900" />
                    <div>
                      <p className="text-xs text-gray-500">Kuota</p>
                      <p className="text-sm font-semibold text-gray-800">{topic.kuota} slot</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 flex items-center">
                <button
                  onClick={() => onSelectTitle(topic.judul_topik)}
                  className="bg-maroon-900 text-white px-5 py-3 rounded-lg font-semibold hover:bg-maroon-800 active:scale-95 transition-all duration-200 flex flex-col items-center gap-1"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="text-xs">Gunakan</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

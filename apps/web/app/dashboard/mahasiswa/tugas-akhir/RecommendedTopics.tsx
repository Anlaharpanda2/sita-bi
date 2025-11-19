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
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl border-2 border-gray-200 p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-gray-400 to-slate-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BookMarked className="h-10 w-10 text-white" />
          </div>
          <p className="text-gray-700 text-lg font-semibold mb-2">No Topics Available</p>
          <p className="text-gray-500">
            Check back later for recommended topics from our expert lecturers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="group flex items-center gap-4 mb-2">
        <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <BookMarked className="h-7 w-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
            Recommended Topics
          </h2>
          <p className="text-sm text-gray-600">Curated by expert lecturers for you</p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid gap-5">
        {recommendedTitles.map((topic, idx) => (
          <div
            key={topic.id}
            className="group/card relative bg-gradient-to-br from-white to-red-50/30 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-red-100 hover:border-red-300"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-pink-500/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10 p-7">
              <div className="flex gap-6">
                {/* Left Side - Icon & Number */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-300">
                      {idx + 1}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover/card:text-red-700 transition-colors duration-300 leading-tight">
                    {topic.judul_topik}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2 group-hover/card:line-clamp-none transition-all duration-300">
                    {topic.deskripsi}
                  </p>
                  
                  {/* Info Pills */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Lecturer */}
                    <div className="group/pill flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center group-hover/pill:scale-110 transition-transform duration-300">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-500 font-medium">Lecturer</p>
                        <p className="text-sm font-bold text-gray-800">{topic.dosenPencetus.name}</p>
                      </div>
                    </div>

                    {/* Quota */}
                    <div className="group/pill flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover/pill:scale-110 transition-transform duration-300">
                        <Users2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-500 font-medium">Quota</p>
                        <p className="text-sm font-bold text-gray-800">{topic.kuota} slots</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 flex items-center">
                  <button
                    onClick={() => onSelectTitle(topic.judul_topik)}
                    className="group/btn relative bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center gap-2">
                      <PlusCircle className="h-6 w-6 group-hover/btn:rotate-90 transition-transform duration-500" />
                      <span className="text-xs whitespace-nowrap">Use Topic</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-1 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

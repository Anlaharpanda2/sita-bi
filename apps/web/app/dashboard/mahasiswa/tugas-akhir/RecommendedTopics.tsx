'use client';

import { BookMarked, PlusCircle } from 'lucide-react';
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
      <Card>
        <p className="text-gray-600 text-center py-8">
          No recommended topics available at this time.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookMarked className="h-6 w-6 text-red-800" />
        <h2 className="text-xl font-semibold text-gray-800">
          Recommended Topics from Lecturers
        </h2>
      </div>

      {recommendedTitles.map((topic) => (
        <Card key={topic.id} hover className="border-l-4 border-red-800">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {topic.judul_topik}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{topic.deskripsi}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  <strong>Lecturer:</strong> {topic.dosenPencetus.name}
                </span>
                <span>
                  <strong>Quota:</strong> {topic.kuota}
                </span>
              </div>
            </div>
            <button
              onClick={() => onSelectTitle(topic.judul_topik)}
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
            >
              <PlusCircle size={18} />
              Use This Topic
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

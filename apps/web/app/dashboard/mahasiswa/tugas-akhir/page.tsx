'use client';

import { useState } from 'react';
import { Trash2, BookOpen, Sparkles, Users, CheckCircle2 } from 'lucide-react';
import { useTugasAkhir } from '@/hooks/useTugasAkhir';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import { getStatusChip } from '@/app/components/ui/StatusChip';
import PageLoader from '@/app/components/loading/PageLoader';
import SimilarityForm from './SimilarityForm';
import RecommendedTopics from './RecommendedTopics';
import SubmittedTitlesTable from './SubmittedTitlesTable';

export default function TugasAkhirPage() {
  const { tugasAkhir, loading, error, refetch, deleteTugasAkhir } =
    useTugasAkhir();
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleDeleteTugasAkhir = async () => {
    if (
      !confirm(
        'Are you sure you want to delete your thesis submission? This action cannot be undone.',
      )
    )
      return;
    try {
      await deleteTugasAkhir();
      alert('Submission successfully deleted.');
    } catch (err) {
      alert(`Error: ${(err as Error).message}`);
    }
  };

  const handleSelectRecommendedTitle = (title: string) => {
    setSelectedTitle(title);
    // Scroll to form
    document.getElementById('similarity-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  if (loading) return <PageLoader />;

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Hero Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-maroon-900 p-3 rounded-xl group-hover:scale-105 transition-transform duration-300">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-700">
              Tugas Akhir
            </h1>
            <p className="text-gray-500 text-base mt-1">
              Kelola pengajuan tugas akhir, cek kemiripan judul, dan jelajahi topik rekomendasi dari dosen
            </p>
          </div>
        </div>
      </div>

      {/* Current Thesis Status */}
      {tugasAkhir ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1 space-y-4">
              {/* Header with Status */}
              <div className="flex items-start gap-4">
                <div className="bg-maroon-900 p-3 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-700">
                      Tugas Akhir Anda Saat Ini
                    </h2>
                    {getStatusChip(tugasAkhir.status)}
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {tugasAkhir.judul}
                  </p>
                </div>
              </div>

              {/* Supervisors Section */}
              {tugasAkhir.peranDosenTa.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-maroon-900" />
                    <h3 className="font-semibold text-gray-700">
                      Pembimbing
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {tugasAkhir.peranDosenTa.map((peran, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="w-10 h-10 bg-maroon-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {peran.dosen.user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {peran.dosen.user.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {peran.peran}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Delete Button */}
            {tugasAkhir.status === 'DIAJUKAN' && (
              <button
                onClick={handleDeleteTugasAkhir}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                <Trash2 size={18} />
                <span>Hapus</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div id="similarity-form">
            <SimilarityForm initialTitle={selectedTitle} onSuccess={refetch} />
          </div>

          <RecommendedTopics onSelectTitle={handleSelectRecommendedTitle} />
        </>
      )}

      <SubmittedTitlesTable />
    </div>
  );
}

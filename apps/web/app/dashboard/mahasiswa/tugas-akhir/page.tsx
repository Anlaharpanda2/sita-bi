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
    <div className="space-y-8 p-6 animate-in fade-in duration-500">
      {/* Hero Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 md:p-12 group">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24 group-hover:scale-150 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 group-hover:translate-x-2 transition-transform duration-300">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Final Project
              </h1>
              <p className="text-white/90 text-lg drop-shadow">Tugas Akhir</p>
            </div>
          </div>
          <p className="text-white/95 text-lg max-w-2xl leading-relaxed drop-shadow group-hover:translate-x-2 transition-transform duration-300 delay-75">
            Manage your final project submission, check similarity, and explore recommended topics from expert lecturers
          </p>
        </div>
      </div>

      {/* Current Thesis Status */}
      {tugasAkhir ? (
        <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-green-100 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200/30 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
          </div>

          <div className="relative z-10 flex justify-between items-start gap-6">
            <div className="flex-1 space-y-6">
              {/* Header with Status */}
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                      Your Current Thesis
                    </h2>
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      {getStatusChip(tugasAkhir.status)}
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {tugasAkhir.judul}
                  </p>
                </div>
              </div>

              {/* Supervisors Section */}
              {tugasAkhir.peranDosenTa.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm group-hover:shadow-md transition-all duration-300 border border-green-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-green-600" />
                    <h3 className="font-bold text-gray-800">
                      Supervisors
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {tugasAkhir.peranDosenTa.map((peran, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-transparent rounded-xl hover:from-green-100 hover:translate-x-2 transition-all duration-300 group/item"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover/item:scale-110 transition-transform duration-300">
                          {peran.dosen.user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 group-hover/item:text-green-700 transition-colors duration-300">
                            {peran.dosen.user.name}
                          </p>
                          <p className="text-sm text-gray-600">
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
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Trash2 size={18} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                  <span>Delete</span>
                </div>
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div id="similarity-form" className="animate-in slide-in-from-bottom-4 duration-500">
            <SimilarityForm initialTitle={selectedTitle} onSuccess={refetch} />
          </div>

          <div className="animate-in slide-in-from-bottom-5 duration-700">
            <RecommendedTopics onSelectTitle={handleSelectRecommendedTitle} />
          </div>
        </>
      )}

      <div className="animate-in slide-in-from-bottom-6 duration-900">
        <SubmittedTitlesTable />
      </div>
    </div>
  );
}

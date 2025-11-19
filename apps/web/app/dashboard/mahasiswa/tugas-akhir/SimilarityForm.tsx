'use client';

import { useState } from 'react';
import { Search, FileCheck, AlertTriangle, CheckCircle, Sparkles, Send } from 'lucide-react';
import Button from '@/app/components/ui/Button';
import { useSimilarityCheck, useSubmitTitle } from '@/hooks/useTugasAkhir';

interface SimilarityFormProps {
  initialTitle?: string;
  onSuccess: () => void;
}

export default function SimilarityForm({
  initialTitle = '',
  onSuccess,
}: SimilarityFormProps) {
  const [judulMandiri, setJudulMandiri] = useState(initialTitle);
  const { similarityResults, isBlocked, isChecking, checkSimilarity, reset } =
    useSimilarityCheck();
  const { submitTitle, loading: submitting } = useSubmitTitle();

  const handleCheckSimilarity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!judulMandiri.trim()) {
      alert('Please enter a title.');
      return;
    }
    try {
      await checkSimilarity(judulMandiri);
    } catch (err) {
      alert(`Error: ${(err as Error).message}`);
    }
  };

  const handleSubmit = async () => {
    if (!judulMandiri.trim()) {
      alert('Please enter a title.');
      return;
    }
    try {
      await submitTitle(judulMandiri, () => {
        alert('Successfully submitted title for approval.');
        reset();
        onSuccess();
      });
    } catch (err) {
      alert(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-maroon-900 p-3 rounded-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-700">
            Ajukan Judul Sendiri
          </h2>
          <p className="text-sm text-gray-500">Masukkan dan periksa kemiripan judul tugas akhir Anda</p>
        </div>
      </div>

      <form onSubmit={handleCheckSimilarity} className="space-y-4">
        {/* Input Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-maroon-900" />
            Judul Tugas Akhir
          </label>
          <input
            type="text"
            value={judulMandiri}
            onChange={(e) => setJudulMandiri(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-maroon-900 focus:ring-2 focus:ring-maroon-900/20 transition-all duration-200"
            placeholder="Masukkan judul tugas akhir Anda di sini..."
          />
          <p className="text-xs text-gray-500 mt-2">
            Pastikan judul Anda jelas, ringkas, dan merepresentasikan penelitian Anda
          </p>
        </div>

        {/* Check Button */}
        <button
          type="submit"
          disabled={isChecking}
          className="w-full bg-maroon-900 text-white font-semibold py-3 rounded-lg hover:bg-maroon-800 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Search className={`h-5 w-5 ${isChecking ? 'animate-spin' : ''}`} />
          <span>{isChecking ? 'Memeriksa Kemiripan...' : 'Periksa Kemiripan'}</span>
        </button>
      </form>

      {/* Similarity Results */}
      {!!similarityResults && (
        <div className="mt-6 space-y-4 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-maroon-900 p-2 rounded-lg">
              <Search className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-700">
              Hasil Pemeriksaan Kemiripan
            </h3>
          </div>
          
          {similarityResults.length > 0 ? (
            <div className="space-y-2">
              {similarityResults.map((result, idx) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center font-semibold text-gray-600 text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-800">
                      {result.judul}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        result.similarity >= 80
                          ? 'bg-red-100 text-red-700'
                          : result.similarity >= 50
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {result.similarity}% mirip
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-600 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-green-800 text-base">Kabar Baik!</p>
                  <p className="text-green-700 text-sm">
                    Tidak ditemukan kemiripan signifikan. Judul Anda unik dan siap diajukan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Blocked Warning */}
          {!!isBlocked && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-red-800 text-base mb-2">Pengajuan Diblokir</p>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Judul Anda memiliki tingkat kemiripan <span className="font-bold">80% atau lebih</span> dengan judul yang sudah ada. 
                    Silakan revisi judul Anda agar lebih unik dan original.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {!isBlocked && (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className={`h-5 w-5 ${submitting ? 'animate-bounce' : ''}`} />
              <span>{submitting ? 'Mengirim...' : 'Ajukan Judul untuk Persetujuan'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

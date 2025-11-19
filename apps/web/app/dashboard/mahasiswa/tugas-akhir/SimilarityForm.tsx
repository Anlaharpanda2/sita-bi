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
    <div className="group/form relative bg-gradient-to-br from-white to-blue-50/30 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-0 group-hover/form:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg group-hover/form:scale-110 group-hover/form:rotate-3 transition-all duration-300">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 group-hover/form:text-blue-700 transition-colors duration-300">
              Submit Your Own Title
            </h2>
            <p className="text-sm text-gray-600">Enter and check your thesis title for similarity</p>
          </div>
        </div>

        <form onSubmit={handleCheckSimilarity} className="space-y-6">
          {/* Input Field */}
          <div className="group/input">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-blue-600" />
              Thesis Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={judulMandiri}
                onChange={(e) => setJudulMandiri(e.target.value)}
                className="w-full rounded-2xl border-2 border-gray-200 shadow-sm px-5 py-4 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-md group-hover/input:border-blue-400"
                placeholder="Enter your unique thesis title here..."
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 ml-1">
              Make sure your title is clear, concise, and represents your research
            </p>
          </div>

          {/* Check Button */}
          <button
            type="submit"
            disabled={isChecking}
            className="group/btn relative w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Search className={`h-5 w-5 ${isChecking ? 'animate-spin' : 'group-hover/btn:rotate-12 transition-transform duration-300'}`} />
              <span>{isChecking ? 'Checking Similarity...' : 'Check Similarity'}</span>
            </div>
          </button>
        </form>

      {/* Similarity Results */}
      {!!similarityResults && (
        <div className="mt-8 space-y-6 pt-8 border-t-2 border-gray-200 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl shadow-md">
              <Search className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Similarity Check Results
            </h3>
          </div>
          
          {similarityResults.length > 0 ? (
            <div className="space-y-3">
              {similarityResults.map((result, idx) => (
                <div
                  key={result.id}
                  className="group/result relative flex items-center justify-between p-5 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50 to-blue-50/0 opacity-0 group-hover/result:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center font-bold text-blue-700 group-hover/result:scale-110 transition-transform duration-300">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-800 font-medium group-hover/result:text-blue-700 transition-colors duration-300">
                      {result.judul}
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex-shrink-0 ml-4">
                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-bold shadow-md group-hover/result:scale-110 transition-all duration-300 ${
                        result.similarity >= 80
                          ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
                          : result.similarity >= 50
                            ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      }`}
                    >
                      {result.similarity}% match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 animate-in fade-in zoom-in duration-500">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="font-bold text-green-800 text-lg">Great News!</p>
                  <p className="text-green-700">
                    No significant similarity found. Your title is unique and ready to submit.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Blocked Warning */}
          {!!isBlocked && (
            <div className="group/warning relative bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 rounded-2xl p-6 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-transparent opacity-0 group-hover/warning:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 rounded-2xl shadow-lg group-hover/warning:scale-110 group-hover/warning:rotate-3 transition-all duration-300">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-red-800 text-xl mb-2">Submission Blocked</p>
                  <p className="text-red-700 leading-relaxed">
                    Your title has a similarity score of <span className="font-bold">80% or higher</span> with an existing title. 
                    Please revise your title to make it more unique and original.
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
              className="group/submit relative w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed animate-in fade-in slide-in-from-bottom duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover/submit:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Send className={`h-5 w-5 ${submitting ? 'animate-bounce' : 'group-hover/submit:translate-x-1 transition-transform duration-300'}`} />
                <span className="text-lg">{submitting ? 'Submitting...' : 'Submit Title for Approval'}</span>
              </div>
            </button>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

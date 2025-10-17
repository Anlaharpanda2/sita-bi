'use client';

import { useState } from 'react';
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Submit Your Own Title
      </h2>

      <form onSubmit={handleCheckSimilarity} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={judulMandiri}
            onChange={(e) => setJudulMandiri(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border"
            placeholder="Enter your thesis title"
          />
        </div>

        <Button type="submit" loading={isChecking} className="w-full">
          {isChecking ? 'Checking...' : 'Check Similarity'}
        </Button>
      </form>

      {/* Similarity Results */}
      {!!similarityResults && (
        <div className="mt-6 space-y-4 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-800">
            Similarity Check Results
          </h3>
          {similarityResults.length > 0 ? (
            <div className="space-y-2">
              {similarityResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded border"
                >
                  <p className="text-sm text-gray-700">{result.judul}</p>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      result.similarity >= 80
                        ? 'bg-red-100 text-red-800'
                        : result.similarity >= 50
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {result.similarity}% similar
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No significant similarity found. You can proceed.
            </p>
          )}

          {!!isBlocked && (
            <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p className="font-bold">Submission Blocked</p>
              <p>
                Your title has a similarity score of 80% or higher with an
                existing title. Please revise your title.
              </p>
            </div>
          )}

          {!isBlocked && (
            <Button
              onClick={handleSubmit}
              loading={submitting}
              variant="success"
              className="w-full"
            >
              Submit Title
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

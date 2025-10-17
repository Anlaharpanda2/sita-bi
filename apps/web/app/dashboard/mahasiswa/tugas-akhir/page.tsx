'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
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
        <Card>
          <p className="text-red-600">Error: {error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Final Project (Tugas Akhir)
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your final project submission and view recommendations
        </p>
      </div>

      {/* Current Thesis Status */}
      {tugasAkhir ? (
        <Card>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your Current Thesis
                </h2>
                {getStatusChip(tugasAkhir.status)}
              </div>
              <p className="text-lg text-gray-700 mb-4">{tugasAkhir.judul}</p>

              {tugasAkhir.peranDosenTa.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Supervisors:
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {tugasAkhir.peranDosenTa.map((peran, idx) => (
                      <li key={idx} className="text-gray-600">
                        {peran.dosen.user.name} ({peran.peran})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {tugasAkhir.status === 'DIAJUKAN' && (
              <Button
                variant="danger"
                onClick={handleDeleteTugasAkhir}
                className="flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete Submission
              </Button>
            )}
          </div>
        </Card>
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

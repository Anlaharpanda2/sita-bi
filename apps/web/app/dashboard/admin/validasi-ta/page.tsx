import React from 'react';
import { CheckCircle, XCircle, Search } from 'lucide-react';

// Dummy data, replace with actual data from your API
const submissions = [
  {
    id: 'TA001',
    title: 'Pengembangan Sistem Informasi Akademik Berbasis Web',
    studentName: 'Budi Santoso',
    studentId: '123456789',
    submissionDate: '2024-05-10',
  },
  {
    id: 'TA002',
    title: 'Analisis Sentimen Opini Publik terhadap Kebijakan Pemerintah di Media Sosial',
    studentName: 'Citra Lestari',
    studentId: '987654321',
    submissionDate: '2024-05-12',
  },
  // ... more submissions
];

export default function ValidasiTAPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-maroon-800">Validasi Tugas Akhir</h1>
      </div>

      <div className="mb-6 flex items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau nama mahasiswa..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="space-y-6">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-white shadow-md rounded-lg p-6 border-l-4 border-maroon-500">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{submission.title}</h2>
                <p className="text-sm text-gray-600">
                  Oleh: <span className="font-semibold">{submission.studentName}</span> ({submission.studentId})
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Tanggal Pengajuan: {submission.submissionDate}
                </p>
              </div>
              <div className="flex items-center space-x-3 ml-4">
                <button className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
                  <CheckCircle className="w-6 h-6" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
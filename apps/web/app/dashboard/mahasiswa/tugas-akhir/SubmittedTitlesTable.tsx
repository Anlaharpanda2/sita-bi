'use client';

import { useMemo, useState } from 'react';
import { Search, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAllTitles } from '@/hooks/useTugasAkhir';
import TableSkeleton from '@/app/components/loading/TableSkeleton';

export default function SubmittedTitlesTable() {
  const { allTitles, loading } = useAllTitles();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTitles = useMemo(() => {
    if (!searchQuery.trim()) return allTitles;
    const lowerQuery = searchQuery.toLowerCase();
    return allTitles.filter((t) => t.judul.toLowerCase().includes(lowerQuery));
  }, [allTitles, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredTitles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredTitles.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-maroon-900 p-3 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              Semua Judul yang Diajukan
            </h2>
            <p className="text-sm text-gray-500">
              Telusuri {allTitles.length} judul tugas akhir dalam database kami
            </p>
          </div>
        </div>

        {/* Stats Badge */}
        <div className="hidden md:flex items-center gap-2 bg-maroon-900 text-white px-4 py-2 rounded-lg">
          <span className="font-bold">{filteredTitles.length}</span>
          <span className="text-sm">Hasil</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Cari judul tugas akhir..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-900/20 focus:border-maroon-900 transition-all duration-200 text-gray-800 placeholder-gray-400"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Judul Tugas Akhir
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((title, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-600">
                        {startIndex + index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-800">
                        {title.judul}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-gray-200 w-16 h-16 rounded-lg flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold mb-1">
                          {searchQuery ? 'Tidak Ada Hasil' : 'Tidak Ada Data'}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {searchQuery 
                            ? `Tidak ada judul yang cocok dengan pencarian "${searchQuery}"`
                            : 'Belum ada judul tugas akhir dalam database.'
                          }
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredTitles.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Menampilkan <span className="font-semibold text-gray-800">{startIndex + 1}</span> - <span className="font-semibold text-gray-800">{Math.min(endIndex, filteredTitles.length)}</span> dari <span className="font-semibold text-gray-800">{filteredTitles.length}</span> judul
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-maroon-900 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

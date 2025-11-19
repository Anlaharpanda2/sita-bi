'use client';

import { useMemo, useState } from 'react';
import { Search, FileText, Filter, SortAsc, Archive } from 'lucide-react';
import { useAllTitles } from '@/hooks/useTugasAkhir';
import TableSkeleton from '@/app/components/loading/TableSkeleton';

export default function SubmittedTitlesTable() {
  const { allTitles, loading } = useAllTitles();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTitles = useMemo(() => {
    if (!searchQuery.trim()) return allTitles;
    const lowerQuery = searchQuery.toLowerCase();
    return allTitles.filter((t) => t.judul.toLowerCase().includes(lowerQuery));
  }, [allTitles, searchQuery]);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="group/table relative bg-gradient-to-br from-white to-slate-50/30 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-slate-200">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-0 group-hover/table:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-slate-600 to-gray-700 p-3 rounded-2xl shadow-lg group-hover/table:scale-110 group-hover/table:rotate-3 transition-all duration-300">
              <Archive className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 group-hover/table:text-slate-700 transition-colors duration-300">
                All Submitted Titles
              </h2>
              <p className="text-sm text-gray-600">
                Browse {allTitles.length} thesis titles in our database
              </p>
            </div>
          </div>

          {/* Stats Badge */}
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <FileText className="h-5 w-5" />
            <span className="font-bold">{filteredTitles.length}</span>
            <span className="text-sm">Results</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative group/search">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover/search:opacity-100 blur-xl transition-opacity duration-500"></div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for thesis titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 hover:border-blue-300 hover:shadow-md text-gray-800 placeholder-gray-400"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl group-hover/search:scale-110 group-hover/search:rotate-12 transition-all duration-300">
              <Search className="h-5 w-5 text-white" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-700 to-gray-800">
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-24">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      #
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Thesis Title
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredTitles.map((title, index) => (
                  <tr 
                    key={index} 
                    className="group/row hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-100 to-slate-200 rounded-xl font-bold text-gray-700 group-hover/row:from-blue-500 group-hover/row:to-indigo-600 group-hover/row:text-white group-hover/row:scale-110 transition-all duration-300 shadow-sm">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 leading-relaxed group-hover/row:text-blue-700 group-hover/row:font-semibold transition-all duration-300">
                        {title.judul}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTitles.length === 0 && (
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-gray-400 to-slate-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <p className="text-gray-700 text-lg font-semibold mb-2">
                  {searchQuery ? 'No Matching Titles' : 'No Titles Found'}
                </p>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `No titles match your search for "${searchQuery}"`
                    : 'There are no thesis titles in the database yet.'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {filteredTitles.length > 0 && (
          <div className="mt-6 flex items-center justify-between px-2 text-sm text-gray-600">
            <p>
              Showing <span className="font-bold text-gray-800">{filteredTitles.length}</span> of{' '}
              <span className="font-bold text-gray-800">{allTitles.length}</span> titles
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

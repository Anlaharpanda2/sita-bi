'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        All Submitted Titles
      </h2>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTitles.map((title, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {title.judul}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTitles.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            {searchQuery ? 'No titles match your search.' : 'No titles found.'}
          </p>
        )}
      </div>
    </div>
  );
}

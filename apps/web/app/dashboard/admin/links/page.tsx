import React from 'react';
import { Plus, Edit, Trash2, Link as LinkIcon } from 'lucide-react';

// Dummy data, replace with actual data from your API
const links = [
  {
    id: 1,
    title: 'Sistem Informasi Akademik (SIA)',
    url: 'https://sia.example.ac.id',
  },
  {
    id: 2,
    title: 'Perpustakaan Digital',
    url: 'https://library.example.ac.id',
  },
  {
    id: 3,
    title: 'Panduan Tugas Akhir',
    url: 'https://example.ac.id/docs/panduan-ta.pdf',
  },
  // ... more links
];

export default function KelolaTautanPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-maroon-800">Kelola Tautan</h1>
        <button className="flex items-center bg-maroon-600 text-white px-4 py-2 rounded-lg hover:bg-maroon-700 transition-colors duration-200">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Tautan
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {links.map((link) => (
            <li key={link.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div className="flex items-center">
                <LinkIcon className="w-5 h-5 mr-4 text-gray-400" />
                <div>
                  <p className="text-md font-semibold text-gray-800">{link.title}</p>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    {link.url}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-indigo-600 hover:text-indigo-900">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
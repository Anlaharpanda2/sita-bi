'use client';

import React from 'react';
import Link from 'next/link';
import { Save, ArrowLeft } from 'lucide-react';

export default function CreatePengumumanPage() {
  // In a real app, you would use state management (e.g., useState)
  // and a rich text editor component.

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-maroon-800">Buat Pengumuman Baru</h1>
        <Link
          href="/dashboard/admin/pengumuman"
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Daftar Pengumuman
        </Link>
      </div>

      <form className="bg-white shadow-md rounded-lg p-8">
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            Judul Pengumuman
          </label>
          <input
            type="text"
            id="title"
            placeholder="Masukkan judul pengumuman..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
            Isi Pengumuman
          </label>
          <textarea
            id="content"
            rows={10}
            placeholder="Tulis isi pengumuman di sini... Mendukung rich text editing."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
          ></textarea>
          <p className="text-sm text-gray-500 mt-2">Gunakan toolbar di atas untuk memformat teks (simulasi).</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center bg-maroon-600 text-white px-6 py-3 rounded-lg hover:bg-maroon-700 transition-colors duration-200"
          >
            <Save className="w-5 h-5 mr-2" />
            Terbitkan Pengumuman
          </button>
        </div>
      </form>
    </div>
  );
}
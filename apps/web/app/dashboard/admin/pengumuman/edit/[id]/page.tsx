'use client';

import React from 'react';
import Link from 'next/link';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';

// Dummy data for a specific announcement, fetched based on the [id] param
const announcement = {
  id: 1,
  title: 'Jadwal Sidang Tugas Akhir Semester Ganjil 2024/2025',
  content: 'Diberitahukan kepada seluruh mahasiswa tingkat akhir bahwa jadwal sidang tugas akhir untuk semester ganjil akan dilaksanakan mulai tanggal 1 Desember 2024. Pastikan semua persyaratan telah terpenuhi.',
};

export default function EditPengumumanPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-maroon-800">Edit Pengumuman</h1>
          <p className="text-gray-500 mt-1">Mengubah pengumuman dengan ID: {params.id}</p>
        </div>
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
            defaultValue={announcement.title}
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
            defaultValue={announcement.content}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-500"
          ></textarea>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Hapus Pengumuman
          </button>
          <button
            type="submit"
            className="flex items-center bg-maroon-600 text-white px-6 py-3 rounded-lg hover:bg-maroon-700 transition-colors duration-200"
          >
            <Save className="w-5 h-5 mr-2" />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
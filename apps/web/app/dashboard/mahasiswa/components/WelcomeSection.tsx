'use client';

import { useAuth } from '../../../../context/AuthContext';

export default function WelcomeSection() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Selamat Datang, {user?.name}!
      </h1>
      <p className="mt-2 text-gray-600">
        Ini adalah pusat kendali Anda. Kelola tugas akhir, bimbingan, dan
        pendaftaran sidang dari sini.
      </p>
    </div>
  );
}

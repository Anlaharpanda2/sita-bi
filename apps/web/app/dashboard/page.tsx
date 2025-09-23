'use client';

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardRedirector() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const roles = user.roles.map(r => r.name);
      if (roles.includes('admin')) {
        router.replace('/dashboard/admin');
      } else if (roles.includes('dosen')) {
        router.replace('/dashboard/dosen');
      } else if (roles.includes('mahasiswa')) {
        router.replace('/dashboard/mahasiswa');
      } else {
        // Fallback or error for users with no recognized role
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return <div>Loading...</div>; // Or a proper loading spinner
}

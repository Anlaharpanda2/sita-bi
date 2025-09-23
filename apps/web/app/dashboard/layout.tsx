'use client';

import { ReactNode } from 'react';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // This check might run before the useEffect in AuthProvider completes.
    // A more robust solution might involve server-side checks.
    if (typeof window !== 'undefined') {
        router.push('/login');
    }
    return null; // or a loading spinner
  }

  return <>{children}</>;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedLayout>{children}</ProtectedLayout>
    </AuthProvider>
  );
}

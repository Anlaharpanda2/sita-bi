'use client';

import { ReactNode, Suspense } from 'react';
import { useAuth } from '../../../context/AuthContext';
import dynamic from 'next/dynamic';

// Dynamic imports for components with lazy loading
const Header = dynamic(() => import('./components/Header'), { ssr: true });
const Sidebar = dynamic(() => import('./components/Sidebar'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'), { ssr: true });

export default function MahasiswaLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  const isMahasiswa = user?.roles?.some((role) => role.name === 'mahasiswa');

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-pulse text-center">
          <div className="h-8 w-8 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-700">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!isMahasiswa) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-600">This dashboard is for students only.</p>
        </div>
      </div>
    );
  }

  const scrollToSection = () => {
    // Dummy function for footer prop
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense
        fallback={<div className="h-16 bg-white shadow animate-pulse" />}
      >
        <Header />
      </Suspense>
      <div className="flex">
        <Suspense
          fallback={<div className="w-64 bg-white shadow-lg animate-pulse" />}
        >
          <Sidebar />
        </Suspense>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
      <Suspense fallback={<div className="h-32 bg-gray-800 animate-pulse" />}>
        <Footer scrollToSection={scrollToSection} />
      </Suspense>
    </div>
  );
}

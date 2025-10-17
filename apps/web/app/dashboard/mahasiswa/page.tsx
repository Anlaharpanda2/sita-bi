// Server Component with Suspense for better streaming
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BookOpen, MessagesSquare, FileText } from 'lucide-react';
import { DashboardCardSkeleton } from '../../components/Suspense/LoadingFallback';

// Dynamically import client components
const WelcomeSection = dynamic(() => import('./components/WelcomeSection'), {
  ssr: true,
});

const featureCards = [
  {
    title: 'Tugas Akhir',
    description:
      'Ajukan judul baru atau lihat status tugas akhir Anda saat ini.',
    href: '/dashboard/mahasiswa/tugas-akhir',
    icon: BookOpen,
  },
  {
    title: 'Bimbingan',
    description: 'Lihat riwayat bimbingan dan tambahkan catatan untuk dosen.',
    href: '/dashboard/mahasiswa/bimbingan',
    icon: MessagesSquare,
  },
  {
    title: 'Pendaftaran Sidang',
    description:
      'Daftarkan diri Anda untuk sidang dan pantau status verifikasi.',
    href: '/dashboard/mahasiswa/sidang',
    icon: FileText,
  },
];

export default function MahasiswaDashboardPage() {
  return (
    <div className="space-y-8">
      <Suspense
        fallback={<div className="h-24 animate-pulse bg-gray-200 rounded-lg" />}
      >
        <WelcomeSection />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureCards.map((card, index) => (
          <Suspense key={card.title} fallback={<DashboardCardSkeleton />}>
            <Link href={card.href}>
              <div
                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-red-800 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <card.icon className="h-6 w-6 text-red-800" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-800 transition-colors">
                    {card.title}
                  </h2>
                </div>
                <p className="mt-3 text-gray-600">{card.description}</p>
              </div>
            </Link>
          </Suspense>
        ))}
      </div>
    </div>
  );
}

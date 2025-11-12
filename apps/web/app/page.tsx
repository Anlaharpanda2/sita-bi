// Server Component (RSC) with streaming for better performance
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './components/landing-page/HeroSection';
import ChatBot from './components/ChatBot/ChatBot';
import {
  SectionSkeleton,
  TeamCardSkeleton,
} from './components/Suspense/LoadingFallback';

// Dynamic imports for below-the-fold sections (lazy load)
const TawaranTopikSection = dynamic(
  () => import('./components/landing-page/TawaranTopikSection'),
  {
    loading: () => <SectionSkeleton />,
  },
);

const JadwalSection = dynamic(
  () => import('./components/landing-page/JadwalSection'),
  {
    loading: () => <SectionSkeleton />,
  },
);

const PengumumanSection = dynamic(
  () => import('./components/landing-page/PengumumanSection'),
  {
    loading: () => <SectionSkeleton />,
  },
);

const TeamSection = dynamic(
  () => import('./components/landing-page/TeamSection'),
  {
    loading: () => (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[...Array(4)].map((_, i) => (
          <TeamCardSkeleton key={i} />
        ))}
      </div>
    ),
  },
);

const FooterWrapper = dynamic(
  () => import('./components/landing-page/FooterWrapper'),
);

// Lazy load client components for better performance - Import in client component
const ClientWrapperComponent = dynamic(
  () => import('./components/landing-page/ClientWrapper'),
);

// Team data - can be fetched from API in real scenario
const teamMembers = [
  {
    name: 'Erland Agsya Agustian',
    role: 'Frontend Developer',
    id: '2311083007',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYB48qcI4RmLRUfQqoGwJb6GIM7SqYE9rcBg&s',
  },
  {
    name: 'Nabil Achmad Khoir',
    role: 'Project Manager',
    id: '2311082032',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYB48qcI4RmLRUfQqoGwJb6GIM7SqYE9rcBg&s',
  },
  {
    name: 'Kasih Ananda Nardi',
    role: 'Sistem Analis',
    id: '2311081021',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYB48qcI4RmLRUfQqoGwJb6GIM7SqYE9rcBg&s',
  },
  {
    name: 'Gilang Dwi Yuwana',
    role: 'Backend Developer',
    id: '2311081016',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYB48qcI4RmLRUfQqoGwJb6GIM7SqYE9rcBg&s',
  },
];

export default function SitaBIHomepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Client-side interactive components (progress bar, header, scroll button) */}
      <ClientWrapperComponent />

      {/* AI Chatbot - Floating button */}
      <ChatBot />

      {/* Hero section - Above the fold, render immediately */}
      <HeroSection />

      {/* Below-the-fold sections with Suspense streaming */}
      <Suspense fallback={<SectionSkeleton />}>
        <TawaranTopikSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <JadwalSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <PengumumanSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-24 bg-gradient-to-b from-white to-orange-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[...Array(4)].map((_, i) => (
                  <TeamCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <TeamSection teamMembers={teamMembers} />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <FooterWrapper />
      </Suspense>
    </div>
  );
}

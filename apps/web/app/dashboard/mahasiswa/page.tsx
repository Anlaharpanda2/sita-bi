// Server Component with Suspense for better streaming
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { DashboardCardSkeleton } from '../../components/Suspense/LoadingFallback';

// Dynamically import client components
const WelcomeSection = dynamic(() => import('./components/WelcomeSection'), {
  ssr: true,
});

const DashboardStats = dynamic(() => import('./components/DashboardStats'));

const SubmissionChart = dynamic(() => import('./components/SubmissionChart'));

const ProgressTimeline = dynamic(() => import('./components/ProgressTimeline'));

const RecentActivity = dynamic(() => import('./components/RecentActivity'));

const QuickActions = dynamic(() => import('./components/QuickActions'));

const UpcomingSchedule = dynamic(() => import('./components/UpcomingSchedule'));

export default function MahasiswaDashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Section */}
      <Suspense
        fallback={
          <div className="h-32 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl" />
        }
      >
        <WelcomeSection />
      </Suspense>

      {/* Stats Cards */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <DashboardCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <DashboardStats />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Chart */}
          <Suspense fallback={<DashboardCardSkeleton />}>
            <SubmissionChart />
          </Suspense>

          {/* Progress Timeline */}
          <Suspense fallback={<DashboardCardSkeleton />}>
            <ProgressTimeline />
          </Suspense>

          {/* Quick Actions */}
          <Suspense fallback={<DashboardCardSkeleton />}>
            <QuickActions />
          </Suspense>
        </div>

        {/* Right Column - Activity & Schedule */}
        <div className="space-y-6">
          {/* Upcoming Schedule */}
          <Suspense fallback={<DashboardCardSkeleton />}>
            <UpcomingSchedule />
          </Suspense>

          {/* Recent Activity */}
          <Suspense fallback={<DashboardCardSkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Server Component
import Image from 'next/image';
import ClientOnly from '../ClientOnly';
import SitaBotButton from '../SitaBot/SitaBotButton';
import { Sparkles, TrendingUp, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-red-100 px-5 py-2.5 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-red-900 to-red-600 bg-clip-text text-transparent">
                Welcome to SITA-BI Platform
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              Kelola Tugas Akhir{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-900 bg-clip-text text-transparent">
                  Dengan Mudah
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C60 2 140 2 198 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#DC2626"/>
                      <stop offset="100%" stopColor="#7C2D12"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              Platform manajemen tugas akhir yang efisien. Kelola bimbingan, jadwal sidang, 
              dan pengumuman dalam satu tempat yang terintegrasi.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-red-100 shadow-sm">
                <TrendingUp className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">Efisien & Cepat</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-red-100 shadow-sm">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">Aman & Terpercaya</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/login"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white bg-gradient-to-r from-red-600 to-red-800 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">Mulai Sekarang</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </a>
              
              <ClientOnly
                fallback={
                  <button className="inline-flex items-center justify-center px-8 py-4 font-semibold text-red-900 bg-white border-2 border-red-200 rounded-full opacity-50 cursor-not-allowed">
                    Loading...
                  </button>
                }
              >
                <SitaBotButton />
              </ClientOnly>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative lg:ml-auto">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-white p-4 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYB48qcI4RmLRUfQqoGwJb6GIM7SqYE9rcBg&s"
                    alt="SITA-BI Platform Illustration"
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-red-100 animate-float hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">95%</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Success Rate</p>
                    <p className="text-sm font-semibold text-gray-900">Mahasiswa</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -right-6 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl border border-red-100 animate-float-delayed hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">500+</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Users</p>
                    <p className="text-sm font-semibold text-gray-900">Pengguna</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

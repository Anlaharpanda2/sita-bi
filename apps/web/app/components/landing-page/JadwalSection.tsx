// Server Component
import { GraduationCap } from 'lucide-react';

export default function JadwalSection() {
  return (
    <section
      id="jadwal"
      className="py-24 bg-gradient-to-b from-white to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-red-900 font-semibold text-sm uppercase tracking-widest mb-4">
            Schedule
          </p>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Jadwal Sidang
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pantau jadwal sidang Anda dengan mudah dan tetap terorganisir
          </p>
        </div>
        <div className="text-center p-16 bg-white rounded-3xl border-2 border-dashed border-red-900/20 hover:border-red-900 hover:shadow-2xl transition-all">
          <GraduationCap size={80} className="mx-auto mb-6 text-red-900" />
          <p className="text-xl text-gray-600">
            Belum ada jadwal untuk ditampilkan.
          </p>
        </div>
      </div>
    </section>
  );
}

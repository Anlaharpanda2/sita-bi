// Server Component
import { BookOpen } from 'lucide-react';

export default function TawaranTopikSection() {
  return (
    <section id="tawarantopik" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-red-900 font-semibold text-sm uppercase tracking-widest mb-4">
            Explore Topics
          </p>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Tawaran Topik
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan topik penelitian yang sesuai dengan minat dan kebutuhan Anda
          </p>
        </div>
        <div className="text-center p-16 bg-white rounded-3xl border-2 border-dashed border-red-900/20 hover:border-red-900 hover:shadow-2xl transition-all">
          <BookOpen size={80} className="mx-auto mb-6 text-red-900" />
          <p className="text-xl text-gray-600">
            Belum ada tawaran topik yang tersedia saat ini.
          </p>
        </div>
      </div>
    </section>
  );
}

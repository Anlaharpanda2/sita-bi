// Server Component
import { Megaphone } from 'lucide-react';

export default function PengumumanSection() {
  return (
    <section id="pengumuman" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-red-900 font-semibold text-sm uppercase tracking-widest mb-4">
            Announcements
          </p>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Pengumuman</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dapatkan informasi terbaru dan penting seputar kegiatan akademik
          </p>
        </div>
        <div className="text-center p-16 bg-white rounded-3xl border-2 border-dashed border-red-900/20 hover:border-red-900 hover:shadow-2xl transition-all">
          <Megaphone size={80} className="mx-auto mb-6 text-red-900" />
          <p className="text-xl text-gray-600">
            Belum ada pengumuman untuk ditampilkan.
          </p>
        </div>
      </div>
    </section>
  );
}

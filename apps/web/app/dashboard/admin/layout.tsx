'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  ClipboardList,
  FileText,
  Calendar,
  Link2,
  Megaphone,
  BookUser,
} from 'lucide-react';

// Komponen Header dan Footer diimpor dari direktori components, sesuai permintaan.
import Header from '@/app/components/landing-page/Header';
import Footer from '@/app/components/landing-page/Footer';

const navItems = [
  { href: '/dashboard/admin', icon: Home, label: 'Dashboard' },
  { href: '/dashboard/admin/users', icon: Users, label: 'Kelola Pengguna' },
  { href: '/dashboard/admin/validasi-ta', icon: ClipboardList, label: 'Validasi TA' },
  { href: '/dashboard/admin/penugasan', icon: BookUser, label: 'Penugasan' },
  { href: '/dashboard/admin/laporan', icon: FileText, label: 'Laporan' },
  { href: '/dashboard/admin/jadwal-sidang', icon: Calendar, label: 'Jadwal Sidang' },
  { href: '/dashboard/admin/links', icon: Link2, label: 'Kelola Tautan' },
  { href: '/dashboard/admin/pengumuman', icon: Megaphone, label: 'Pengumuman' },
];

const NavLink = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li className="px-3 py-1">
      <Link
        href={item.href}
        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-maroon-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-maroon-50 hover:text-maroon-700'
        }`}
      >
        <item.icon className="w-5 h-5 mr-3" />
        {item.label}
      </Link>
    </li>
  );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header dari komponen digunakan di sini */}
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-gray-200/75">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wider">
              Menu Navigasi
            </h2>
          </div>
          <nav className="mt-2">
            <ul>
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 lg:p-10">
          <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm w-full h-full border border-gray-200/75">
            {children}
          </div>
        </main>
      </div>
      {/* Footer dari komponen digunakan di sini */}
      <Footer />
    </div>
  );
}

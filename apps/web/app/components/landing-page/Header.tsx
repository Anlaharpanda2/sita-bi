'use client';
import React from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (_isOpen: boolean) => void;
  activeSection: string;
  scrollToSection: (_id: string) => void;
}

export default function Header({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Image
                src="https://bing.pnp.ac.id/wp-content/uploads/2025/01/cropped-LOGO-BAHASA-INGGRIS-PNP-TEXT-300x300-1.png"
                alt="Logo"
                width={44}
                height={44}
                className="rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                SITA-BI
              </h1>
              <p className="text-xs text-gray-500 font-medium">Thesis Management</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['hero', 'tawarantopik', 'jadwal', 'pengumuman'].map(
              (section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className={`relative font-medium transition-colors text-sm ${
                    activeSection === section
                      ? 'text-red-600'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {section === 'hero'
                    ? 'Home'
                    : section.charAt(0).toUpperCase() +
                      section.slice(1).replace('topik', ' Topik')}
                  {activeSection === section && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-full" />
                  )}
                </a>
              ),
            )}
            <a
              href="/dokumentasi"
              className="relative font-medium text-sm text-gray-700 hover:text-red-600 transition-colors"
            >
              Dokumentasi
            </a>
            <a
              href="/login"
              className="relative inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen ? (
          <nav className="md:hidden py-6 border-t border-gray-100 space-y-1">
            {['hero', 'tawarantopik', 'jadwal', 'pengumuman'].map(
              (section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                    setIsMenuOpen(false);
                  }}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                    activeSection === section
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                  }`}
                >
                  {section === 'hero'
                    ? 'Home'
                    : section.charAt(0).toUpperCase() +
                      section.slice(1).replace('topik', ' Topik')}
                </a>
              ),
            )}
            <a
              href="/dokumentasi"
              className="block py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              Dokumentasi
            </a>
            <a
              href="/login"
              className="block text-center bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-full font-semibold mt-4 hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Login
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

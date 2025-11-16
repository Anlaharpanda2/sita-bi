'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import Image from "next/image";

// Components
const SearchBar = () => (
  <div className="w-full max-w-[578px] h-10 bg-white rounded outline outline-1 outline-zinc-200 relative">
    <input 
      type="text" 
      placeholder="Cari Kursus"
      className="w-full h-full px-3 text-sm font-medium font-['Inter'] text-zinc-800 placeholder:text-neutral-300 outline-none"
    />
  </div>
);

const Logo = () => (
  <div className="flex items-center gap-2 cursor-pointer">
    <div className="flex items-center">
      <span className="text-black text-lg font-normal font-['Noto_Sans_Math']">Voca</span>
      <span className="text-neutral-600 text-xl font-normal font-['Oleo_Script']">Link</span>
    </div>
  </div>
);

const CategoryButton = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <button className={`h-9 px-5 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] whitespace-nowrap ${
    active 
      ? 'bg-cyan-600 outline-cyan-600 text-white' 
      : 'bg-white outline-zinc-300 text-zinc-800 transition-colors hover:bg-gray-100'
  } text-sm font-medium font-['Inter'] leading-tight`}>
    {children}
  </button>
);

const SkillBadgeItem = ({ imageSrc, text }: { imageSrc: string; text: string }) => (
  <div className="flex items-center gap-2">
    <Image src={imageSrc} alt={text} width={24} height={24} className="flex-shrink-0" />
    <span className="text-zinc-500 text-xs font-medium font-['Inter'] leading-tight">{text}</span>
  </div>
);

const CareerCard = ({ 
  imageSrc, 
  title, 
  badges,
  hasMore = false
}: { 
  imageSrc: string; 
  title: string; 
  badges: Array<{ src: string; text: string }>;
  hasMore?: boolean;
}) => (
  <div className="w-full max-w-[384px] h-40 bg-white rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)] overflow-hidden transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex">
    <div className="w-40 h-40 flex-shrink-0">
      <Image 
        width={160} 
        height={160} 
        className="w-full h-full object-cover" 
        src={imageSrc} 
        alt={title} 
      />
    </div>
    <div className="flex-1 p-3 flex flex-col">
      <h3 className="text-zinc-800 text-sm font-medium font-['Inter'] leading-tight mb-6">
        {title}
      </h3>
      <p className="text-zinc-600 text-xs font-medium font-['Inter'] leading-tight mb-3">
        Skill Badge yang dibutuhkan:
      </p>
      <div className="flex flex-col gap-1">
        {badges.map((badge, index) => (
          <SkillBadgeItem key={index} imageSrc={badge.src} text={badge.text} />
        ))}
        {hasMore && (
          <span className="text-zinc-500 text-xs font-medium font-['Inter'] leading-tight mt-1">
            + 2 lainnya
          </span>
        )}
      </div>
    </div>
  </div>
);

const Header = () => (
  <header className="w-full h-14 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] fixed top-0 left-0 z-50">
    <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between gap-4">
      <Logo />
      
      <div className="flex items-center gap-3 flex-1 max-w-[600px]">
        <SearchBar />
        <Image 
          width={24} 
          height={24} 
          className="w-6 h-6 cursor-pointer flex-shrink-0" 
          src="/home/icon-search.png" 
          alt="Search Icon" 
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="h-8 px-5 bg-sky-700 rounded-[20px] transition-colors hover:bg-sky-800 flex items-center gap-2">
          <Image 
            width={24} 
            height={24} 
            className="w-6 h-6" 
            src="/home/icon-home → SVG.svg" 
            alt="Beli Icon" 
          />
          <span className="text-white text-sm font-medium font-['Inter'] leading-tight">Beli</span>
        </button>
        
        <Link href="/kursus" className="flex items-center gap-2 group">
          <Image 
            width={24} 
            height={24} 
            className="w-6 h-6" 
            src="/home/icon-my-courses → SVG.svg" 
            alt="Kursus Saya Icon" 
          />
          <span className="text-zinc-800 text-sm font-medium font-['Inter'] leading-tight transition-colors group-hover:text-cyan-600">
            Kursus Saya
          </span>
        </Link>
        
        <button className="h-9 px-5 bg-sky-700 rounded-lg transition-colors hover:bg-sky-800">
          <span className="text-white text-sm font-medium font-['Inter'] leading-snug">Daftar</span>
        </button>
      </div>
    </div>
  </header>
);

const CareerSection = () => {
  const careerData = [
    {
      imageSrc: "/home/vocabot.png",
      title: "Tanya Vocabot",
      badges: [
        { src: "/home/beginer-badge.png", text: "Beginner" },
        { src: "/home/intermediate-badge.png", text: "Intermediate - Basic" },
      ],
      hasMore: true
    },
    {
      imageSrc: "/home/Spesialis Riset Pasar.png",
      title: "Spesialis Riset Pasar",
      badges: [
        { src: "/home/intermediate-badge.png", text: "Intermediate - Basic" },
        { src: "/home/intermediate-badge.png", text: "Intermediate - Basic" },
      ]
    },
    {
      imageSrc: "/home/Koordinator Produk.png",
      title: "Koordinator Produk",
      badges: [
        { src: "/home/advance-bage.png", text: "Advance" },
        { src: "/home/intermediate-badge.png", text: "Intermediate - Basic" },
      ]
    }
  ];

  const categories = [
    "Semua",
    "Teknik", 
    "Teknologi", 
    "Bisnis & Manajemen", 
    "Media & Kreatif", 
    "Pariwisata & Pelayanan", 
    "Kesehatan & Gaya Hidup"
  ];

  return (
    <section className="w-full bg-sky-100 py-8">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-6">
          <h1 className="text-sky-700 text-2xl font-bold font-['Inter'] leading-loose mb-3">
            Raih Karier Idaman dengan Kursus Terarah
          </h1>
          <p className="text-zinc-600 text-sm font-medium font-['Inter'] leading-tight max-w-[1200px] mx-auto">
            Kami menyediakan kursus yang selaras dengan berbagai tujuan karier. Raih Skill Badge pada program tertentu sebagai bukti terukur atas penguasaan Anda, yang akan memperkuat posisi Anda di dunia profesional.{' '}
            <a href="#" className="text-cyan-600 underline hover:text-cyan-700">
              Pelajari Selengkapnya.
            </a>
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category, index) => (
            <CategoryButton key={category} active={index === 0}>
              {category}
            </CategoryButton>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {careerData.map((career, index) => (
            <CareerCard
              key={index}
              imageSrc={career.imageSrc}
              title={career.title}
              badges={career.badges}
              hasMore={career.hasMore}
            />
          ))}
        </div>
        
        <div className="text-center">
          <a href="#" className="text-cyan-600 text-base font-medium font-['Inter'] leading-tight hover:underline">
            Lihat Semua Profesi
          </a>
        </div>
      </div>
    </section>
  );
};

const CoursesSection = () => (
  <section className="w-full bg-white py-12">
    <div className="max-w-[1280px] mx-auto px-6 text-center">
      <h2 className="text-sky-700 text-2xl font-bold font-['Inter'] leading-loose mb-6">
        Kursus Apa yang Ingin Kamu Pelajari?
      </h2>
      <p className="text-zinc-800 text-sm font-medium font-['Inter'] leading-tight">
        Belajar tanpa batas waktu & bersertifikat!
      </p>
    </div>
  </section>
);

const Page: NextPage = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="pt-14">
        <CareerSection />
        <CoursesSection />
      </main>
    </div>
  );
};

export default Page;
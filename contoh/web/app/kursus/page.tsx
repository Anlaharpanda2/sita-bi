'use client';

import type { NextPage } from 'next';
import { useCallback } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";

const KursusPage: NextPage = () => {
    
    const router = useRouter();
    const onContainerClick = useCallback(() => {
        // Placeholder for interactivity
    }, []);

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <div className="w-52 border-r border-zinc-200 flex-shrink-0">
                <div className="p-4 fixed">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-10">
                        <Image width={26} height={26} src="/kursus/ChatGPT Image 6 Sep 2025, 12.20.25 1.png" alt="logo" />
                        <div className="text-sm">
                            <span className="text-black font-normal">Voca</span>
                            <span className="text-neutral-600 font-normal">Link</span>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="space-y-1">
                        <div className="text-neutral-800/75 text-xs font-bold uppercase mb-4">Menu Utama</div>
                        
                        <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                            <Image width={16} height={11} src="/kursus/Img-12.svg" alt="" />
                            <span className="text-neutral-800/75 text-xs">Dashboard</span>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-2 rounded bg-blue-500 cursor-pointer">
                            <Image width={13} height={13} src="/kursus/Img.svg" alt="" />
                            <span className="text-white text-xs">Kelas Saya</span>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                            <Image width={11} height={13} src="/kursus/Img-6.svg" alt="" />
                            <span className="text-neutral-800/75 text-xs">Daftar Kelas</span>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                            <Image width={16} height={13} src="/kursus/Img-3.svg" alt="" />
                            <span className="text-neutral-800/75 text-xs">Pertanyaan</span>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                            <Image width={15} height={13} src="/kursus/Img-1.svg" alt="" />
                            <span className="text-neutral-800/75 text-xs">Leaderboard</span>
                        </div>

                        <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Image width={13} height={12} src="/kursus/Img-16.svg" alt="" />
                                <span className="text-neutral-800/75 text-xs">For You</span>
                            </div>
                            <Image width={11} height={6} src="/kursus/Img-13.svg" alt="" />
                        </div>

                        <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                            <Image width={14} height={14} src="/kursus/Img-7.svg" alt="" />
                            <span className="text-neutral-800/75 text-xs">For Mentor</span>
                        </div>
                    </div>

                    {/* Bottom Buttons */}
                    <div className="mt-auto space-y-3 pt-40">
                        <button className="w-full py-2 px-4 rounded border border-gray-500 flex items-center justify-center gap-2 hover:bg-gray-100">
                            <Image width={11} height={11} src="/kursus/Img-4.svg" alt="" />
                            <span className="text-gray-500 text-xs">Gabung Komunitas</span>
                        </button>
                        <button className="w-full py-2 px-4 rounded border border-gray-500 flex items-center justify-center gap-2 hover:bg-gray-100">
                            <Image width={10} height={11} src="/kursus/Img-15.svg" alt="" />
                            <span className="text-gray-500 text-xs">Tanya Mentor</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-slate-100">
                {/* Header */}
                <div className="bg-white px-10 py-4 flex items-center justify-between border-b border-zinc-200 fixed top-0 left-52 right-0 z-50 w-[calc(100%-13rem)]">                    
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Cari..." 
                                className="w-48 px-4 py-1.5 text-xs rounded-2xl border border-black outline-none"
                            />
                        </div>
                        <button className="p-1.5 bg-slate-100 rounded-xl border border-slate-100">
                            <Image width={12} height={12} src="/kursus/Img-8.svg" alt="search" />
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 pr-6 border-r border-zinc-200">
                            <Image width={17} height={14} src="/kursus/Img-2.svg" alt="help" />
                            <span className="text-neutral-800/75 text-xs">Butuh Bantuan?</span>
                        </div>
                        <div className="relative">
                            <Image width={15} height={18} src="/kursus/Img-5.svg" alt="notification" />
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white" />
                        </div>
                        <Image className="rounded-2xl" width={36} height={36} src="/kursus/Profile.png" alt="profile" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <h1 className="text-xl font-semibold text-neutral-500 mb-6">Kelas Saya</h1>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-4 gap-6">
                        {/* Card 1: Data Analyst - Roadmap */}
                        <div className="relative bg-white rounded-xl shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="relative h-64">
                                <Image 
                                    width={244} 
                                    height={259} 
                                    className="w-full h-full object-cover" 
                                    src="/kursus/Jagoan Java.png" 
                                    alt="Data Analyst Course" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                                <div className="absolute top-2 right-2 bg-slate-100 rounded px-2 py-1">
                                    <span className="text-neutral-800 text-[9.72px] font-bold">Roadmap</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="text-sm font-bold mb-3">Data Analyst</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Image width={10} height={11} src="/kursus/Img-12.svg" alt="" />
                                        <span className="text-xs">31 courses</span>
                                    </div>
                                    <div className="relative w-full h-1.5 bg-gray-200 rounded mb-2">
                                        <div className="absolute h-full bg-blue-500 rounded" style={{width: '0%'}}></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">0%</span>
                                        <div className="flex items-center gap-1 cursor-pointer hover:underline">
                                            <span className="text-xs">Mulai Belajar</span>
                                            <Image width={10} height={9} src="/kursus/Img-17.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: UI/UX - Roadmap */}
                        <div className="relative bg-white rounded-xl shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="relative h-64">
                                <Image 
                                    width={244} 
                                    height={259} 
                                    className="w-full h-full object-cover" 
                                    src="/kursus/Jagoan MySQL.png" 
                                    alt="UI/UX Course" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                                <div className="absolute top-2 right-2 bg-slate-100 rounded px-2 py-1">
                                    <span className="text-neutral-800 text-[9.72px] font-bold">Roadmap</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="text-sm font-bold mb-3">UI/UX</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Image width={10} height={11} src="/kursus/Img-12.svg" alt="" />
                                        <span className="text-xs">6 courses</span>
                                    </div>
                                    <div className="relative w-full h-1.5 bg-gray-200 rounded mb-2">
                                        <div className="absolute h-full bg-blue-500 rounded" style={{width: '0%'}}></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">0%</span>
                                        <div className="flex items-center gap-1 cursor-pointer hover:underline">
                                            <span className="text-xs">Mulai Belajar</span>
                                            <Image width={10} height={9} src="/kursus/Img-17.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Digital Marketing - Roadmap */}
                        <div className="relative bg-white rounded-xl shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="relative h-64">
                                <Image 
                                    width={244} 
                                    height={259} 
                                    className="w-full h-full object-cover" 
                                    src="/kursus/KelasFullstack.png" 
                                    alt="Digital Marketing Course" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                                <div className="absolute top-2 right-2 bg-slate-100 rounded px-2 py-1">
                                    <span className="text-neutral-800 text-[9.72px] font-bold">Roadmap</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="text-sm font-bold mb-3">digital marketing</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Image width={10} height={11} src="/kursus/Img-12.svg" alt="" />
                                        <span className="text-xs">85 courses</span>
                                    </div>
                                    <div className="relative w-full h-1.5 bg-gray-200 rounded mb-2 overflow-hidden">
                                        <div className="absolute h-full bg-blue-500 rounded" style={{width: '6%'}}></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">6%</span>
                                        <div className="flex items-center gap-1 cursor-pointer hover:underline">
                                            <span className="text-xs">Lanjut Belajar</span>
                                            <Image width={10} height={9} src="/kursus/Img-17.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Algoritma - Kelas */}
                        <div className="bg-white rounded-xl shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
                            <div className="relative h-32 flex-shrink-0">
                                <Image 
                                    width={245} 
                                    height={130} 
                                    className="w-full h-full object-cover" 
                                    src="/kursus/Algoritma dan Pemrograman Dasar.png" 
                                    alt="Algoritma Course" 
                                />
                                <div className="absolute top-2 right-2 bg-blue-500 rounded px-2 py-1">
                                    <span className="text-slate-100 text-[9.72px] font-bold">Kelas</span>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-xs font-bold text-neutral-800/75 mb-4 min-h-[32px]">Algoritma dan Pemrograman Dasar</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Image width={12} height={12} src="/kursus/Img-6.svg" alt="" />
                                        <span className="text-xs text-neutral-800/75">27 modul</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Image width={12} height={12} src="/kursus/Img-14.svg" alt="" />
                                        <span className="text-xs text-neutral-800/75">1 jam</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="relative w-full h-2 bg-gray-200 rounded mb-1">
                                        <div className="absolute h-full bg-blue-500 rounded" style={{width: '100%'}}></div>
                                    </div>
                                    <div className="flex justify-end mb-3">
                                        <span className="text-xs text-neutral-800/75">100%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-black/20 px-4 py-2 flex justify-end">
                                <div className="flex items-center gap-1 cursor-pointer text-blue-500 hover:underline">
                                    <span className="text-xs">Lihat Kelas</span>
                                    <Image width={10} height={11} src="/kursus/Img-11.svg" alt="" />
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Terminal - Kelas */}
                        <div className="bg-white rounded-xl shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
                            <div className="relative h-32 flex-shrink-0">
                                <Image 
                                    width={245} 
                                    height={130} 
                                    className="w-full h-full object-cover" 
                                    src="/kursus/Belajar Menggunakan Terminal atau CMD untuk Development.png" 
                                    alt="Terminal Course" 
                                />
                                <div className="absolute top-2 right-2 bg-blue-500 rounded px-2 py-1">
                                    <span className="text-slate-100 text-[9.72px] font-bold">Kelas</span>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-xs font-bold text-neutral-800/75 mb-4 min-h-[32px]">Belajar Menggunakan Terminal atau CMD untuk Development</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Image width={12} height={12} src="/kursus/Img-6.svg" alt="" />
                                        <span className="text-xs text-neutral-800/75">10 modul</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Image width={12} height={12} src="/kursus/Img-14.svg" alt="" />
                                        <span className="text-xs text-neutral-800/75">1 jam</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="relative w-full h-2 bg-gray-200 rounded mb-1">
                                        <div className="absolute h-full bg-blue-500 rounded" style={{width: '100%'}}></div>
                                    </div>
                                    <div className="flex justify-end mb-3">
                                        <span className="text-xs text-neutral-800/75">100%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-black/20 px-4 py-2 flex justify-end">
                                <div className="flex items-center gap-1 cursor-pointer text-blue-500 hover:underline">
                                    <span className="text-xs">Lihat Kelas</span>
                                    <Image width={10} height={11} src="/kursus/Img-11.svg" alt="" />
                                </div>
                            </div>
                        </div>

                        {/* Card 6: HTML - Kelas */}
                        <div className="bg-white rounded-xl shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
                            <div className="relative h-32 flex-shrink-0">
                                <Image 
                                    width={245} 
                                    height={130} 
                                    className="w-full h-full object-cover" 
                                    src="/kursus/Belajar Dasar HTML.png" 
                                    alt="HTML Course" 
                                />
                                <div className="absolute top-2 right-2 bg-blue-500 rounded px-2 py-1">
                                    <span className="text-slate-100 text-[9.72px] font-bold">Kelas</span>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-xs font-bold text-neutral-800/75 mb-4 min-h-[32px]">Belajar Dasar HTML</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Image width={12} height={12} src="/kursus/Img-6.svg" alt="" />
                                        <span className="text-xs text-neutral-800/75">30 modul</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Image width={12} height={12} src="/kursus/Img-14.svg" alt="" />
                                        <span className="text-xs text-neutral-800/75">3 jam</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="relative w-full h-2 bg-gray-200 rounded mb-1">
                                        <div className="absolute h-full bg-blue-500 rounded" style={{width: '30%'}}></div>
                                    </div>
                                    <div className="flex justify-end mb-3">
                                        <span className="text-xs text-neutral-800/75">30%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-black/20 px-4 py-2 flex justify-end">
                                <div className="flex items-center gap-1 cursor-pointer text-blue-500 hover:underline">
                                    <span className="text-xs">Lanjut Belajar</span>
                                    <Image width={10} height={11} src="/kursus/Img-11.svg" alt="" />
                                </div>
                            </div>
                        </div>

                        {/* Card 7: Bootstrap - Kelas */}
                        <div onClick={() => router.push("/kursus/kelas")}  className="bg-white rounded-xl shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
                            <div className="relative h-32 flex-shrink-0">
                                <Image 
                                    width={245} 
                                    height={130} 
                                    className="w-full h-full object-cover" 
                                    src="/kelas/Java Collection.png" 
                                    alt="Bootstrap Course" 
                                />
                                <div className="absolute top-2 right-2 bg-blue-500 rounded px-2 py-1">
                                    <span className="text-slate-100 text-[9.72px] font-bold">Kelas</span>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-xs font-bold text-neutral-800/75 mb-4 min-h-[32px]">Jagoan Java</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Image width={12} height={12} src="/kursus/Img-6.svg" alt="" />
                                        <span className="text-xs text-neutral-800/75">31 modul</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Image width={12} height={12} src="/kursus/Img-14.svg" alt="" />
                                        <span className="text-xs text-neutral-800/75">8 jam</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="relative w-full h-2 bg-gray-200 rounded mb-1">
                                        <div className="absolute h-full bg-blue-500 rounded" style={{width: '5%'}}></div>
                                    </div>
                                    <div className="flex justify-end mb-3">
                                        <span className="text-xs text-neutral-800/75">5%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-black/20 px-4 py-2 flex justify-end">
                                <div className="flex items-center gap-1 cursor-pointer text-blue-500 hover:underline">
                                    <span className="text-xs">Lanjut Belajar</span>
                                    <Image width={10} height={11} src="/kursus/Img-11.svg" alt="" />
                                </div>
                            </div>
                        </div>

                        {/* Card 8: Add New Class */}
                        <div className="bg-blue-500 rounded-xl shadow flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-xl min-h-[288px]">
                            <Image width={65} height={65} src="/kursus/Img-18.svg" alt="Add new class" />
                            <span className="text-white text-xs font-bold mt-4">Tambah Kelas Baru</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-100 py-5 px-8 flex items-center justify-center gap-4 mt-8">
                    <span className="text-neutral-800/75 text-xs">© 2025 VocaLink . All rights reserved.</span>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Image width={10} height={10} src="/kursus/Img-10.svg" alt="" />
                        <span className="text-blue-500 text-xs">System status</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KursusPage;
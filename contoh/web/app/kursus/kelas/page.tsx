"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface Course {
  id: string;
  title: string;
  image: string;
  duration: string;
  materials: number;
  level: string;
  type: string;
}

const courses: Course[] = [
  {
    id: 'java-dasar',
    title: 'Java Dasar',
    image: '/kelas/Java Dasar.png',
    duration: '3 Jam',
    materials: 32,
    level: 'Beginner',
    type: 'Main'
  },
  {
    id: 'studi-kasus-java-dasar',
    title: 'Studi Kasus Java Dasar : Aplikasi Todolist',
    image: '/kelas/Studi Kasus Java Dasar.png',
    duration: '1 Jam',
    materials: 22,
    level: 'Beginner',
    type: 'Main'
  },
  {
    id: 'java-oop',
    title: 'Java Object Oriented Programming',
    image: '/kelas/Java Object Oriented Programming.png',
    duration: '5 Jam',
    materials: 45,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-standard-classes',
    title: 'Java Standard Classes',
    image: '/kelas/Java Standard Classes.png',
    duration: '1 Jam',
    materials: 20,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'studi-kasus-java-oop',
    title: 'Studi Kasus Java OOP : Aplikasi Todolist',
    image: '/kelas/Studi Kasus Java OOP _ Aplikasi Todolist.png',
    duration: '1 Jam',
    materials: 19,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-generic',
    title: 'Java Generic',
    image: '/kelas/Java Generic.png',
    duration: '1 Jam',
    materials: 13,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-collection',
    title: 'Java Collection',
    image: '/kelas/Java Collection.png',
    duration: '2 Jam',
    materials: 26,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-lambda',
    title: 'Java Lambda',
    image: '/kelas/Java Lambda.png',
    duration: '1 Jam',
    materials: 9,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'apache-maven',
    title: 'Apache Maven',
    image: '/kelas/Apache Maven.png',
    duration: '1 Jam',
    materials: 13,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-unit-test',
    title: 'Java Unit Test',
    image: '/kelas/Java Unit Test.png',
    duration: '2 Jam',
    materials: 26,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-stream',
    title: 'Java Stream',
    image: '/kelas/Java Stream.png',
    duration: '2 Jam',
    materials: 19,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'mysql-dasar',
    title: 'MySQL Dasar',
    image: '/kelas/MySQL Dasar.png',
    duration: '6 Jam',
    materials: 47,
    level: 'Beginner',
    type: 'Main'
  },
  {
    id: 'java-database',
    title: 'Java Database',
    image: '/kelas/Java Database.png',
    duration: '3 Jam',
    materials: 17,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'studi-kasus-java-database',
    title: 'Studi Kasus Java Database : Aplikasi Todolist',
    image: '/kelas/Studi Kasus Java Database _ Aplikasi Todolist.png',
    duration: '1 Jam',
    materials: 12,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-internationalization',
    title: 'Java Internationalization',
    image: '/kelas/Java Internationalization.png',
    duration: '1 Jam',
    materials: 11,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-date-time',
    title: 'Java Date & Time',
    image: '/kelas/Java Date & Time.png',
    duration: '2 Jam',
    materials: 21,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-thread',
    title: 'Java Thread',
    image: '/kelas/Java Thread.png',
    duration: '6 Jam',
    materials: 33,
    level: 'Advanced',
    type: 'Main'
  },
  {
    id: 'java-reflection',
    title: 'Java Reflection',
    image: '/kelas/Java Reflection.png',
    duration: '2 Jam',
    materials: 20,
    level: 'Advanced',
    type: 'Main'
  },
  {
    id: 'java-validation',
    title: 'Java Validation',
    image: '/kelas/Java Validation.png',
    duration: '2 Jam',
    materials: 27,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-logging',
    title: 'Java Logging',
    image: '/kelas/Java Logging.png',
    duration: '1 Jam',
    materials: 12,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-lombok',
    title: 'Java Lombok',
    image: '/kelas/Java Lombok.png',
    duration: '2 Jam',
    materials: 18,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-resilience4j',
    title: 'Java Resilience4j',
    image: '/kelas/Java Resilience4j.png',
    duration: '2 Jam',
    materials: 25,
    level: 'Advanced',
    type: 'Main'
  },
  {
    id: 'java-input-output',
    title: 'Java Input Output',
    image: '/kelas/Java Input Output.png',
    duration: '2 Jam',
    materials: 23,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-json',
    title: 'Java JSON',
    image: '/kelas/Java JSON.png',
    duration: '2 Jam',
    materials: 18,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-csv',
    title: 'Java CSV',
    image: '/kelas/Java CSV.png',
    duration: '1 Jam',
    materials: 9,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-web-servlet',
    title: 'Java Web Servlet',
    image: '/kelas/Java Web Servlet.png',
    duration: '3 Jam',
    materials: 27,
    level: 'Advanced',
    type: 'Main'
  },
  {
    id: 'java-persistence-api',
    title: 'Java Persistence API',
    image: '/kelas/Java Persistence API.png',
    duration: '4 Jam',
    materials: 57,
    level: 'Advanced',
    type: 'Main'
  },
  {
    id: 'java-sequenced-collection',
    title: 'Java Sequenced Collection',
    image: '/kelas/Java Sequenced Collection.png',
    duration: '1 Jam',
    materials: 7,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-virtual-thread',
    title: 'Java Virtual Thread',
    image: '/kelas/Java Virtual Thread.png',
    duration: '1 Jam',
    materials: 7,
    level: 'Advanced',
    type: 'Main'
  },
  {
    id: 'java-record',
    title: 'Java Record',
    image: '/kelas/Java Record.png',
    duration: '2 Jam',
    materials: 14,
    level: 'Intermediate',
    type: 'Main'
  },
  {
    id: 'java-sealed-class',
    title: 'Java Sealed Class',
    image: '/kelas/Java Sealed Class.png',
    duration: '1 Jam',
    materials: 8,
    level: 'Advanced',
    type: 'Main'
  }
];

export default function KelasPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 bg-slate-50">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 lg: py-8">
            {/* Breadcrumb */}
            <nav className="mb-4">
              <ol className="flex items-center space-x-2 text-sm font-bold">
                <li>
                  <Link href="/kursus" className="text-blue-600 hover:underline">
                    Kelas Saya
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-600">jagoan-java</li>
              </ol>
            </nav>

            {/* Course Header Card */}
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-8 max-w-full">
              <div className="flex flex-wrap gap-1 mb-3 text-sm">
                <span className="text-blue-600 flex items-center gap-1">
                  By Originals
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                  </svg>
                </span>
                <span className="px-3 py-1 bg-white text-gray-800 rounded-full border border-blue-600 text-xs">
                  Lifetime Membership
                </span>
              </div>

              <h1 className="text-2xl font-bold mb-3">Jagoan Java</h1>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Belajar pemrograman Java dari pemula sampai mahir disertai studi kasus. Materi akan selalu di-update secara berkala
              </p>

              <div className="flex flex-col lg:flex-row gap-3 lg:items-center flex-wrap text-sm">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 576 512">
                    <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/>
                  </svg>
                  <span className="text-yellow-400 font-semibold">4.8</span>
                  <span className="text-gray-600">(234 Penilaian)</span>
                </div>

                <div className="flex items-center gap-1.5 lg:ml-3">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 640 512">
                    <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"/>
                  </svg>
                  <span className="text-gray-600">437 Siswa</span>
                </div>

                <div className="flex items-center gap-1.5 lg:ml-3">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                  </svg>
                  <span className="text-gray-600">-</span>
                </div>

                <div className="flex items-center gap-1.5 lg:ml-3">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"/>
                  </svg>
                  <span className="text-gray-600">Level Beginner</span>
                </div>

                <div className="lg:ml-auto">
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 576 512">
                      <path d="M352 224l-46.5 0c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8l-2.5 0c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144l80 0 0-61.3C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2l-3.7 0c-17.7 0-32-14.3-32-32l0-64zM80 96c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-48c0-17.7 14.3-32 32-32s32 14.3 32 32l0 48c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 112C0 67.8 35.8 32 80 32l48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 96z"/>
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Roadmap Materi */}
            <h2 className="text-2xl font-bold mb-4">Roadmap Materi</h2>
            
            <section className="py-8">
              <div className="relative">
                {/* Timeline */}
                <div className="flex items-start mb-8">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mt-1 z-6">
                    1
                  </div>
                  <div className="flex-1 ml-2">
                    <h3 className="text-xl font-bold mb-2">Jagoan Java</h3>
                    <p className="text-gray-600 mb-6">Jagoan Java</p>
                    
                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {courses.map((course) => (
                        <Link key={course.id} href={`/kursus/kelas/java-dasar`}>
                          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition h-full flex flex-col">
                            <div className="relative h-40 overflow-hidden rounded-t-lg">
                              <Image
                                src={course.image}
                                alt={course.title}
                                width={229}
                                height={121}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                              <h4 className="text-sm font-bold text-gray-700 mb-2 line-clamp-2">
                                {course.title}
                              </h4>
                              <div className="mb-3">
                                <span className="inline-block px-2 py-1 bg-white text-blue-600 border border-blue-600 rounded text-xs font-mono">
                                  {course.type}
                                </span>
                              </div>
                              <div className="mt-auto pt-3 border-t flex justify-between text-xs text-gray-600">
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                                  {course.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9l0-176c0-8.7 4.7-16.7 12.3-20.9z"/></svg>
                                  {course.materials} Materi
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
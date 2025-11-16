import { FunctionComponent } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const JavaDasarPage: FunctionComponent = () => {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <div className="w-full bg-neutral-800 px-8 py-20 mt-16">
          <div className="max-w-6xl">
            <div className="flex items-center gap-3 text-white text-xs mb-6">
              <span>Browse Course</span>
              <span>›</span>
              <span>Java Dasar</span>
            </div>
            <h1 className="text-white text-2xl mb-3">Java Dasar</h1>
            <p className="text-white text-xs mb-8">Panduan langkah demi langkah untuk belajar Java</p>
            <div className="flex items-center gap-6 text-white text-xs">
              <div className="flex items-center gap-2">
                <img className="w-8 h-5" src="/java-dasar/Siswa.png" alt="Students" />
                <span>338 Siswa</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                <span><span className="text-yellow-400 font-bold">4.9</span> (130) Penilaian</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📚</span>
                <span>Level beginner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto w-full px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* About Section */}
              <div className="bg-white rounded border border-black/20 p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3.5 h-3.5 bg-teal-500 rounded"></div>
                  <h2 className="text-neutral-800/75 text-base">Tentang Kelas</h2>
                </div>
                <p className="text-neutral-800/75 text-xs leading-relaxed">
                  Dalam kelas online ini kamu akan belajar langkah demi langkah dasar-dasar Java. Materi
                  belajar telah disusun sedemikian rupa agar kamu mudah dalam memahaminya.
                </p>
              </div>

              {/* Course Materials */}
              <div className="bg-white rounded border border-black/20 p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-teal-500 rounded"></div>
                  <h2 className="text-neutral-800/75 text-base">Daftar Materi</h2>
                </div>
                
                {/* Section Header */}
                <div className="bg-slate-100 px-4 py-3 mb-2 border-b border-gray-200">
                  <h3 className="text-teal-500 text-xs font-bold">Java Dasar</h3>
                </div>

                {/* Material List */}
                <div className="space-y-0">
                  {[
                    { title: "Pendahuluan", duration: "02:27" },
                    { title: "Pengenalan Java", duration: "14:43" },
                    { title: "Menginstall Java", duration: "11:04" },
                    { title: "Program Hello World", duration: "13:42" },
                    { title: "Tipe Data Number", duration: "15:03" },
                    { title: "Tipe Data Character", duration: "03:22" },
                    { title: "Tipe Data Boolean", duration: "02:39" },
                    { title: "Tipe Data String", duration: "04:55" },
                    { title: "Variable", duration: "10:47" },
                    { title: "Tipe Data Bukan Primitif", duration: "09:18" },
                    { title: "Tipe Data Array", duration: "14:35" },
                    { title: "Operasi Matematika", duration: "08:19" },
                    { title: "Operasi Perbandingan", duration: "02:44" },
                    { title: "Operasi Boolean", duration: "05:43" },
                    { title: "Expression, Statement dan Block", duration: "06:34" },
                    { title: "if Statement", duration: "09:24" },
                    { title: "Switch Statement", duration: "12:13" },
                    { title: "Ternary Operator", duration: "03:55" },
                    { title: "For Loop", duration: "07:40" },
                    { title: "While Loop", duration: "02:05" },
                    { title: "Do While Loop", duration: "03:36" },
                    { title: "Break dan Continue", duration: "06:07" },
                    { title: "For Each", duration: "04:37" },
                    { title: "Method", duration: "04:40" },
                    { title: "Method Parameter", duration: "03:11" },
                    { title: "Method Return Value", duration: "06:34" },
                    { title: "Method Variable Argument", duration: "06:27" },
                    { title: "Method Overloading", duration: "03:10" },
                    { title: "Recursive Method", duration: "09:26" },
                    { title: "Scope", duration: "04:28" },
                    { title: "Komentar", duration: "05:20" },
                    { title: "Materi Selanjutnya", duration: "00:57" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center border-b border-zinc-200 py-2 px-4 hover:bg-gray-50">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
                      <div className="flex-1 text-neutral-800/75 text-xs">{item.title}</div>
                      <div className="text-neutral-800/75 text-xs">{item.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar Info */}
                <div className="w-80 h-72 right-[32px] top-[75px] absolute scale-90">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                        {/* Thumbnail Area */}
                        <div className="relative h-44 flex-shrink-0">
                            <Link href="/kursus/kelas/java-dasar/pendahuluan" className="block w-full h-full group">
                                <img className="w-full h-full object-cover" src="/java-dasar/Image-1.png" alt="Java Dasar Thumbnail" />
                                {/* Overlay and Play Button */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-blue-500 bg-opacity-70 flex items-center justify-center cursor-pointer group-hover:bg-opacity-90 transition-all">
                                        <div style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }} className="w-5 h-5 bg-white ml-1"></div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Content Area */}
                        <div className="p-4 flex flex-col flex-grow justify-between">
                            <div>
                                <h3 className="font-semibold text-neutral-800 text-base">Mulai Belajar</h3>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2" />
                            </div>
                            <Link href="/kursus/kelas/java-dasar/pendahuluan">
                                <div className="w-full px-4 py-2 bg-blue-500 text-white text-center text-xs font-semibold rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                                    Masuk Kelas
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>              {/* Mentor Card */}
            <div className="space-y-6">
              
              {/* Video Player Card */}
              <div className="bg-white rounded border border-black/20 p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-4 bg-teal-500 rounded"></div>
                  <h2 className="text-neutral-800/75 text-base">Mentor</h2>
                </div>
                <div className="flex gap-4">
                  <img 
                    className="w-20 h-20 rounded-lg object-cover" 
                    src="/java-dasar/image 1.png"
                    alt="Mentor"
                  />
                  <div className="flex-1">
                    <h3 className="text-zinc-500 text-base font-bold mb-1">Andi Harpanda</h3>
                    <div className="w-20 h-0.5 bg-teal-500 mb-2"></div>
                    <p className="text-neutral-800/75 text-xs leading-relaxed">
                      mentor berpengalaman dengan tujuh tahun di industri teknologi, ahli dalam pengembangan full stack
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonials Card */}
              <div className="bg-white rounded border border-black/20 p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-teal-500 rounded"></div>
                  <h2 className="text-neutral-800/75 text-xs">Testimoni</h2>
                </div>
                
                {/* Rating Summary */}
                <div className="text-center mb-4">
                  <div className="text-5xl font-light text-neutral-800/75 mb-2">4.9</div>
                  <div className="flex justify-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <div className="text-neutral-800/75 text-xs">(130 reviews)</div>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-2 mb-4">
                  {[
                    { stars: 5, percent: 93 },
                    { stars: 4, percent: 7 },
                    { stars: 3, percent: 0 },
                    { stars: 2, percent: 0 },
                    { stars: 1, percent: 0 },
                  ].map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-2 text-xs">
                      <span className="w-16 text-right text-neutral-800/75">{rating.stars} Bintang</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded" 
                          style={{ width: `${rating.percent}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-neutral-800/75">{rating.percent}%</span>
                    </div>
                  ))}
                </div>

                {/* Reviews */}
                <div className="space-y-3">
                  {[
                    {
                      name: "Nova Kasyfurrahman",
                      avatar: "/java-dasar/Avatar.png",
                      text: "materi sangat bagus sekali dan sangat membantu dalam pembelajaran sayaa. semoga bisa bantu yang lain dalam belajar"
                    },
                    {
                      name: "Nova Kasyfurrahman",
                      avatar: "/java-dasar/Avatar-1.png",
                      text: "Kontennya menarik, Mudah dipahami"
                    }
                  ].map((review, index) => (
                    <div key={index} className="border border-black/20 rounded p-3">
                      <div className="flex gap-3 mb-2">
                        <img 
                          className="w-7 h-7 rounded-full" 
                          src={review.avatar}
                          alt={review.name}
                        />
                        <div className="flex-1">
                          <h4 className="text-neutral-800 text-xs font-bold mb-1">{review.name}</h4>
                          <p className="text-neutral-800/75 text-xs leading-relaxed">{review.text}</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xs">★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 text-center text-neutral-800 text-xs py-2 hover:bg-gray-50 rounded">
                  Muat lainnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaDasarPage;
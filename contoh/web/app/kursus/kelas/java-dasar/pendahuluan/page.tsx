'use client';
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Maximize,
  BookOpen,
  MessageCircleQuestion,
  FileText,
  ChevronDown,
  CheckCircle2,
  Bot,
  Activity,
  X
} from 'lucide-react';
import VocabotPage from '../../../../vocabot/page';
// --- Komponen Pemutar Video Kustom ---
const CustomVideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState(0);

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(video.currentTime);
    };
    const setVideoDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setVideoDuration);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', setVideoDuration);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressContainer = progressRef.current;
    const video = videoRef.current;
    if (progressContainer && video) {
      const rect = progressContainer.getBoundingClientRect();
      const seekPosition = (e.clientX - rect.left) / rect.width;
      video.currentTime = seekPosition * video.duration;
    }
  };

  const handleTimelineHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressContainer = progressRef.current;
    if (progressContainer && duration > 0) {
      const rect = progressContainer.getBoundingClientRect();
      const hoverPos = e.clientX - rect.left;
      const percentage = hoverPos / rect.width;
      const time = percentage * duration;
      setHoverTime(formatTime(time));
      setHoverPosition(hoverPos);
    }
  };

  return (
    <div className="bg-black rounded-t-lg overflow-hidden mb-0">
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center group">
        <video ref={videoRef} className="w-full h-full" onClick={togglePlayPause} preload="metadata">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!isPlaying && (
          <button
            onClick={togglePlayPause}
            className="absolute w-16 h-16 bg-red-400/80 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors shadow-lg z-10"
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </button>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div 
            ref={progressRef}
            className="relative mb-3 cursor-pointer h-2.5" 
            onClick={handleSeek}
            onMouseMove={handleTimelineHover}
            onMouseLeave={() => setHoverTime(null)}
          >
            <div className="h-1 bg-white/25 rounded-full absolute bottom-1 w-full">
              <div className="h-full bg-red-400 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            {hoverTime && (
              <div 
                className="absolute bottom-full mb-2 px-2 py-1 bg-black/75 text-white text-xs rounded"
                style={{ left: `${hoverPosition}px`, transform: 'translateX(-50%)' }}
              >
                {hoverTime}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={togglePlayPause} className="text-white hover:text-gray-300">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button className="text-white hover:text-gray-300"><SkipBack className="w-5 h-5" /></button>
            <button className="text-white hover:text-gray-300"><SkipForward className="w-5 h-5" /></button>
            <div className="flex items-center gap-1 text-white text-xs">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="text-white hover:text-gray-300"><Volume2 className="w-5 h-5" /></button>
              <button className="text-white hover:text-gray-300"><Settings className="w-5 h-5" /></button>
              <button className="text-white hover:text-gray-300"><Maximize className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Utama Halaman ---
const VocaLinkBootcamp = () => {
  const [isVocabotOpen, setIsVocabotOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [activeTab, setActiveTab] = useState('materi');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVocabotOpen) {
      // Set timer untuk menampilkan tombol setelah 3 detik
      timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 3000);
    } else {
      // Reset saat modal ditutup
      setShowCloseButton(false);
    }

    // Cleanup untuk membersihkan timer
    return () => clearTimeout(timer);
  }, [isVocabotOpen]);

  const lessons = [
    { title: 'Pendahuluan', duration: '00:32 menit', active: true },
    { title: 'Pengenalan Java', duration: '14:43 menit', active: false },
    { title: 'Menginstall Java', duration: '11:04 menit', active: false },
    { title: 'Program Hello World', duration: '13:42 menit', active: false },
    { title: 'Tipe Data Number', duration: '15:03 menit', active: false },
    { title: 'Tipe Data Character', duration: '03:22 menit', active: false },
    { title: 'Tipe Data Boolean', duration: '02:39 menit', active: false },
    { title: 'Tipe Data String', duration: '04:55 menit', active: false },
    { title: 'Variable', duration: '10:47 menit', active: false },
    { title: 'Tipe Data Bukan Primitif', duration: '09:18 menit', active: false },
    { title: 'Tipe Data Array', duration: '14:35 menit', active: false },
    { title: 'Operasi Matematika', duration: '08:19 menit', active: false },
    { title: 'Operasi Perbandingan', duration: '02:44 menit', active: false },
    { title: 'Operasi Boolean', duration: '05:43 menit', active: false },
    { title: 'Expression, Statement dan Block', duration: '06:34 menit', active: false },
    { title: 'if Statement', duration: '09:24 menit', active: false },
    { title: 'Switch Statement', duration: '12:13 menit', active: false },
    { title: 'Ternary Operator', duration: '03:55 menit', active: false },
    { title: 'For Loop', duration: '07:40 menit', active: false },
    { title: 'While Loop', duration: '02:05 menit', active: false },
    { title: 'Do While Loop', duration: '03:36 menit', active: false },
    { title: 'Break dan Continue', duration: '06:07 menit', active: false },
    { title: 'For Each', duration: '04:37 menit', active: false },
    { title: 'Method', duration: '04:40 menit', active: false },
    { title: 'Method Parameter', duration: '03:11 menit', active: false },
    { title: 'Method Return Value', duration: '06:34 menit', active: false },
    { title: 'Method Variable Argument', duration: '06:27 menit', active: false },
    { title: 'Method Overloading', duration: '03:10 menit', active: false },
    { title: 'Recursive Method', duration: '09:26 menit', active: false },
    { title: 'Scope', duration: '04:28 menit', active: false },
    { title: 'Komentar', duration: '05:20 menit', active: false },
    { title: 'Materi Selanjutnya', duration: '00:57 menit', active: false },
  ];

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image width={60} height={60} src="/logo.png" alt="logo" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-black">Voca</span>
              <span className="text-lg font-normal text-gray-600" style={{ fontFamily: 'cursive' }}>Link</span>
            </div>
          </div>
        </div>

        {/* Course Navigation */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-4">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded cursor-pointer">
              <span className="text-xs font-bold text-gray-700 uppercase">Java Dasar</span>
              <ChevronDown className="w-4 h-4 text-gray-600 rotate-180" />
            </div>
          </div>

          {/* Lessons List */}
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 cursor-pointer transition-colors ${
                  lesson.active
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Play className={`w-4 h-4 mt-0.5 flex-shrink-0 ${lesson.active ? 'text-white' : 'text-gray-700'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-normal mb-1 truncate">{lesson.title}</div>
                    <div className="text-[10px] font-normal opacity-90">{lesson.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 space-y-3 pb-4">
            <div className="border-t border-gray-300 pt-4">
              <button className="w-full text-center text-xs text-gray-700 py-2">
                Finish Course
              </button>
            </div>
            <div className="border-t border-gray-300 pt-3">
              <button className="w-full border border-gray-500 rounded text-xs text-gray-500 py-2 hover:bg-gray-50">
                Claim Certificate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <span>Kelas Saya</span>
            <span>/</span>
            <span>Java Dasar...</span>
            <span>/</span>
            <span>Pendahuluan</span>
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-700 mb-6">Pendahuluan</h1>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('materi')}
              className={`flex items-center gap-2 pb-3 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'materi'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Play className="w-4 h-4" />
              Materi
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-2 pb-3 text-xs font-bold border-b-2 transition-colors ${
                activeTab === 'questions'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageCircleQuestion className="w-4 h-4" />
              Questions
            </button>
          </div>

          {/* Pemutar Video Kustom Digunakan Di Sini */}
          <CustomVideoPlayer src="/videos/java/java.mp4" />

          {/* Action Bar */}
          <div className="bg-white border border-gray-200 rounded-b-lg p-4 flex items-center justify-between mb-6">
            <span className="text-sm text-gray-700">Apakah sudah paham?</span>
            <div className="flex gap-3">
              <button onClick={() => setIsVocabotOpen(true)} className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-xs transition-colors">
                <Bot className="w-5 h-5" />
                Tanyakan Vocabot
              </button>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-xs transition-colors">
                <CheckCircle2 className="w-4 h-4" />
                Ya, Saya Sudah Paham
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-600 mb-2">© 2025 Vocalink. All rights reserved.</p>
            <button className="inline-flex items-center gap-2 text-teal-500 hover:text-teal-600 text-xs">
              <Activity className="w-4 h-4" />
              System status
            </button>
          </div>
        </div>
      </div>

      {/* Penambahan Vocabot Overlay */}
      {isVocabotOpen && (
        <div className="fixed inset-0 z-50">
          <VocabotPage />
          {/* Tombol Close di atas segalanya */}
          {showCloseButton && (
            <button 
              onClick={() => setIsVocabotOpen(false)} 
              className="absolute top-[70px] right-[215px] w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-all z-50"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VocaLinkBootcamp;
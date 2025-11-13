// components/ChatBot/ChatBotPremium.tsx
'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageCircle, Send, Trash2, Sparkles, X } from 'lucide-react';
import { useGeminiChat } from '@/hooks/useGeminiChat';

export default function ChatBotPremium() {
  const [isOpen, setIsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const { chat, loading, error, conversation, clearConversation } =
    useGeminiChat();

  useEffect(() => {
    if (isOpen) {
      // Animasi intro modal
      setTimeout(() => setModalVisible(true), 50);

      // Transisi dari intro ke chat
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
    setModalVisible(false);
    setShowIntro(true);
    return undefined;
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage('');

    try {
      await chat(userMessage);
    } catch (err) {
      console.error('Chat error:', err);
    }
  };

  const handleClear = () => {
    if (confirm('Hapus semua percakapan?')) {
      clearConversation();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            AI
          </span>
        </button>
      )}

      {/* Modal Backdrop */}
      {!!isOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-500 z-40 ${modalVisible ? 'opacity-60' : 'opacity-0'}`}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-500 ${modalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            {showIntro ? (
              /* Premium Intro Animation */
              <div className="relative">
                {/* Glow Effect Layers */}
                <div className="absolute inset-0 -m-32">
                  <div className="absolute inset-0 bg-gradient-radial from-orange-400/30 via-orange-500/20 to-transparent blur-3xl animate-pulse-slow" />
                  <div
                    className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent blur-2xl animate-spin-slow"
                    style={{ animationDuration: '8s' }}
                  />
                </div>

                {/* Sparkle Effects */}
                <div className="absolute -top-10 -left-10 animate-float">
                  <Sparkles className="w-8 h-8 text-orange-300 opacity-60" />
                </div>
                <div
                  className="absolute -bottom-10 -right-10 animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <Sparkles className="w-6 h-6 text-orange-400 opacity-80" />
                </div>
                <div
                  className="absolute top-1/2 -right-16 animate-float"
                  style={{ animationDelay: '0.5s' }}
                >
                  <Sparkles className="w-5 h-5 text-white opacity-70" />
                </div>

                {/* Logo/Icon with Premium Glow */}
                <div className="relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-xl opacity-40 animate-pulse" />
                    <div className="w-56 h-56 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center relative z-10 drop-shadow-2xl animate-gentle-bounce">
                      <MessageCircle className="w-32 h-32 text-white" />
                    </div>
                  </div>
                  <div className="text-center mt-6 relative z-10">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
                      SITA BI Assistant
                    </h2>
                    <p className="text-orange-100 font-medium drop-shadow-md flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Powered by Gemini AI
                      <Sparkles className="w-4 h-4" />
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat Interface */
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden border border-orange-100 animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-white flex items-center gap-2">
                        SITA BI Assistant
                        <Sparkles className="w-4 h-4" />
                      </h1>
                      <p className="text-xs text-orange-100">
                        AI-Powered Learning Assistant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {conversation.length > 0 && (
                      <button
                        onClick={handleClear}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Clear conversation"
                        title="Hapus percakapan"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30">
                  <div className="px-6 py-8 space-y-6">
                    {conversation.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full py-12">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-20 animate-pulse" />
                          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center relative z-10 opacity-90">
                            <MessageCircle className="w-16 h-16 text-white" />
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-2">
                          Halo! Saya SITA BI Assistant 👋
                        </h2>
                        <p className="text-gray-500 text-center max-w-md mb-8">
                          Tanyakan apa saja tentang SITA BI, Tugas Akhir, atau
                          topik akademik lainnya!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                          {[
                            { icon: '📚', text: 'Apa itu SITA BI?' },
                            {
                              icon: '✍️',
                              text: 'Bagaimana cara mengajukan judul TA?',
                            },
                            { icon: '📅', text: 'Bagaimana proses bimbingan?' },
                            { icon: '🎓', text: 'Tips sukses sidang TA' },
                          ].map((prompt, idx) => (
                            <button
                              key={idx}
                              onClick={() => setMessage(prompt.text)}
                              className="px-4 py-3 bg-white border-2 border-orange-100 rounded-xl text-left text-gray-700 hover:border-orange-400 hover:bg-orange-50 hover:shadow-md transition-all duration-200 group"
                            >
                              <span className="text-lg mr-2 group-hover:scale-110 inline-block transition-transform">
                                {prompt.icon}
                              </span>
                              {prompt.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      conversation.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                        >
                          {msg.role === 'ai' && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-3 flex-shrink-0 shadow-lg">
                              <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <div
                            className={`max-w-2xl px-5 py-3 rounded-2xl shadow-md ${
                              msg.role === 'user'
                                ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                                : 'bg-white text-gray-800 border border-orange-100'
                            }`}
                          >
                            <div
                              className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}
                            >
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content || '...'}
                              </ReactMarkdown>
                            </div>
                          </div>
                          {msg.role === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ml-3 flex-shrink-0 shadow-lg">
                              <span className="text-gray-600 font-semibold text-xs">
                                You
                              </span>
                            </div>
                          )}
                        </div>
                      ))
                    )}

                    {!!loading && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-3 flex-shrink-0 shadow-lg">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-white border border-orange-100 px-5 py-3 rounded-2xl shadow-md">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                              style={{ animationDelay: '0.2s' }}
                            />
                            <div
                              className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                              style={{ animationDelay: '0.4s' }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {!!error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 animate-fade-in">
                        <p className="text-sm font-medium mb-1">Error</p>
                        <p className="text-xs">{error}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Area */}
                <div className="bg-white border-t border-orange-100 px-6 py-4 shadow-lg">
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-3"
                  >
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ketik pertanyaan Anda di sini..."
                      disabled={loading}
                      className="flex-1 px-5 py-3 border-2 border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all duration-200 text-gray-800 placeholder-gray-400"
                      maxLength={10000}
                    />
                    <button
                      type="submit"
                      disabled={loading || !message.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim</span>
                    </button>
                  </form>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    SITA BI Assistant dapat membuat kesalahan. Mohon verifikasi
                    informasi penting.
                  </p>
                </div>
              </div>
            )}
          </div>

          <style>{`
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes scale-in {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes gentle-bounce {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-15px);
              }
            }
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-20px) rotate(10deg);
              }
            }
            @keyframes pulse-slow {
              0%,
              100% {
                opacity: 0.3;
              }
              50% {
                opacity: 0.5;
              }
            }
            @keyframes spin-slow {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .animate-fade-in {
              animation: fade-in 0.3s ease-out;
            }
            .animate-scale-in {
              animation: scale-in 0.4s ease-out;
            }
            .animate-gentle-bounce {
              animation: gentle-bounce 2s ease-in-out infinite;
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            .animate-pulse-slow {
              animation: pulse-slow 3s ease-in-out infinite;
            }
            .animate-spin-slow {
              animation: spin-slow linear infinite;
            }
            .bg-gradient-radial {
              background: radial-gradient(circle, var(--tw-gradient-stops));
            }
          `}</style>
        </>
      )}
    </>
  );
}

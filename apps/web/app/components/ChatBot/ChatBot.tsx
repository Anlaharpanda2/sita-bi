// components/ChatBot/ChatBot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { MessageCircle, X, Send, Trash2, Loader2 } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { chat, loading, error, conversation, clearConversation } = useGeminiChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
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

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">SITA BI Assistant</h3>
                <p className="text-xs text-orange-100">Powered by Gemini AI</p>
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
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {conversation.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-orange-500" />
                  <p className="font-medium mb-2">Halo! 👋</p>
                  <p className="text-sm">
                    Saya asisten AI SITA BI. Ada yang bisa saya bantu?
                  </p>
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => setMessage('Apa itu SITA BI?')}
                      className="text-xs bg-orange-50 text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors w-full"
                    >
                      Apa itu SITA BI?
                    </button>
                    <button
                      onClick={() => setMessage('Bagaimana cara mengajukan judul TA?')}
                      className="text-xs bg-orange-50 text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors w-full"
                    >
                      Cara mengajukan judul TA?
                    </button>
                  </div>
                </div>
              </div>
            )}

            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                  <p className={`text-xs mt-1 ${
                    msg.role === 'user' ? 'text-orange-100' : 'text-gray-400'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                    <p className="text-sm text-gray-600">Mengetik...</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
                <p className="text-sm font-medium mb-1">Error</p>
                <p className="text-xs">{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                disabled={loading}
                maxLength={10000}
              />
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Didukung oleh Gemini 2.0 Flash
            </p>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useChatLogic() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      console.log('>>> [FRONTEND] Stream stopped by user.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
        signal: abortController.signal, // Pass the signal to fetch
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let boundary = buffer.indexOf('\n\n');

        while (boundary !== -1) {
          const message = buffer.substring(0, boundary);
          buffer = buffer.substring(boundary + 2);
          if (message.startsWith('data: ')) {
            const data = message.substring(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setMessages(prev => {
                  if (prev.length === 0) return prev;
                  const allButLast = prev.slice(0, -1);
                  const last = prev[prev.length - 1];
                  if (!last || last.role !== 'assistant') return prev;
                  const updatedLast = { ...last, content: last.content + parsed.content };
                  return [...allButLast, updatedLast];
                });
              }
            } catch (err) {
              console.error('Failed to parse JSON', err);
            }
          }
          boundary = buffer.indexOf('\n\n');
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Error wajar karena user menekan stop, tidak perlu menampilkan pesan error besar
        console.log('Fetch aborted by user.');
        setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant' && last.content.trim() === '') {
                return prev.slice(0, -1); // Hapus placeholder jika masih kosong
            }
            return prev;
        });
      } else {
        console.error('Fetch error:', error);
        setMessages(prev => prev.slice(0, -1)); // Hapus placeholder jika ada error lain
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return {
    messages,
    input,
    isLoading,
    chatContainerRef,
    setInput,
    handleSubmit,
    stop, // Ekspor fungsi stop
  };
}

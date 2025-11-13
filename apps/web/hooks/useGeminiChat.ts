// hooks/useGeminiChat.ts
'use client';

import { useState } from 'react';
import { streamChatMessage, type ChatMessage } from '@/lib/gemini-api';

export function useGeminiChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);

  const chat = async (message: string, token?: string) => {
    setLoading(true);
    setError(null);

    // Add user message to conversation
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setConversation((prev) => [...prev, userMessage]);

    try {
      let aiMessageContent = '';

      // Create placeholder AI message
      const aiMessage: ChatMessage = {
        role: 'ai',
        content: '',
        timestamp: new Date(),
      };

      setConversation((prev) => [...prev, aiMessage]);

      // Stream the response
      for await (const chunk of streamChatMessage(message, token)) {
        if (chunk.type === 'chunk' && chunk.text) {
          aiMessageContent += chunk.text;

          // Update the AI message in real-time
          setConversation((prev) => {
            const newConv = [...prev];
            const lastMessage = newConv[newConv.length - 1];
            if (lastMessage && lastMessage.role === 'ai') {
              lastMessage.content = aiMessageContent;
            }
            return newConv;
          });
        } else if (chunk.type === 'error') {
          throw new Error(chunk.error || 'Streaming error');
        } else if (chunk.type === 'done') {
          break;
        }
      }

      return { message: aiMessageContent };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);

      // Remove incomplete AI message
      setConversation((prev) => prev.slice(0, -1));

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setError(null);
  };

  return {
    chat,
    loading,
    error,
    conversation,
    clearConversation,
  };
}

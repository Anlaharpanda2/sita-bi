// hooks/useGeminiChat.ts
'use client';

import { useState } from 'react';
import { sendChatMessage, ChatMessage } from '@/lib/gemini-api';

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
    
    setConversation(prev => [...prev, userMessage]);
    
    try {
      const response = await sendChatMessage(message, token);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get response');
      }
      
      // Add AI response to conversation
      if (response.data) {
        const aiMessage: ChatMessage = {
          role: 'ai',
          content: response.data.message,
          timestamp: new Date(),
        };
        setConversation(prev => [...prev, aiMessage]);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // Remove user message if error
      setConversation(prev => prev.slice(0, -1));
      
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
    clearConversation 
  };
}

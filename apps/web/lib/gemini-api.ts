// lib/gemini-api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  data?: {
    message: string;
    apiKeyUsed: number;
  };
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export async function sendChatMessage(
  message: string,
  token?: string
): Promise<ChatResponse> {
  const endpoint = token 
    ? `${API_URL}/api/gemini/chat`
    : `${API_URL}/api/gemini/chat/public`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get response');
  }
  
  return response.json();
}

export async function getGeminiStatus(token: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/gemini/status`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to get status');
  }
  
  return response.json();
}

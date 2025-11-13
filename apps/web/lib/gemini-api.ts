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

export interface StreamChunk {
  type: 'connected' | 'chunk' | 'done' | 'error';
  text?: string;
  error?: string;
}

export async function sendChatMessage(
  message: string,
  token?: string,
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

// Stream chat message with SSE
export async function* streamChatMessage(
  message: string,
  token?: string,
): AsyncGenerator<StreamChunk, void, unknown> {
  const endpoint = token
    ? `${API_URL}/api/gemini/chat/stream`
    : `${API_URL}/api/gemini/chat/stream/public`;

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
    throw new Error('Failed to get streaming response');
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data) {
            try {
              const parsed = JSON.parse(data) as StreamChunk;
              yield parsed;

              if (parsed.type === 'done' || parsed.type === 'error') {
                return;
              }
            } catch {
              // Skip invalid JSON
              continue;
            }
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function getGeminiStatus(
  token: string,
): Promise<{ configured: boolean; model?: string }> {
  const response = await fetch(`${API_URL}/api/gemini/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get status');
  }

  return response.json();
}

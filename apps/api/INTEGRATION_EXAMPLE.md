# Gemini API - Frontend Integration Examples

## React/Next.js Integration

### 1. API Client Utility

```typescript
// lib/gemini-api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  success: boolean;
  data?: {
    message: string;
    apiKeyUsed: number;
  };
  error?: string;
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
  
  return response.json();
}

export async function getGeminiStatus(token: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/gemini/status`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
}
```

### 2. React Hook

```typescript
// hooks/useGeminiChat.ts
import { useState } from 'react';
import { sendChatMessage } from '@/lib/gemini-api';

export function useGeminiChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chat = async (message: string, token?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sendChatMessage(message, token);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get response');
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return { chat, loading, error };
}
```

### 3. Chat Component Example

```typescript
// components/GeminiChat.tsx
'use client';

import { useState } from 'react';
import { useGeminiChat } from '@/hooks/useGeminiChat';

export default function GeminiChat() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{
    role: 'user' | 'ai';
    content: string;
  }>>([]);
  
  const { chat, loading, error } = useGeminiChat();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || loading) return;
    
    // Add user message to conversation
    const userMessage = message;
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    
    try {
      // Get AI response
      const response = await chat(userMessage);
      
      // Add AI response to conversation
      if (response) {
        setConversation(prev => [...prev, { 
          role: 'ai', 
          content: response.message 
        }]);
      }
    } catch (err) {
      console.error('Chat error:', err);
    }
  };
  
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-100 ml-auto max-w-[80%]'
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            <p className="text-sm font-semibold mb-1">
              {msg.role === 'user' ? 'You' : 'AI'}
            </p>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        
        {loading && (
          <div className="bg-gray-100 p-4 rounded-lg mr-auto max-w-[80%]">
            <p className="text-sm font-semibold mb-1">AI</p>
            <p className="text-gray-500">Typing...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          maxLength={10000}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
```

### 4. Simple Example (No Auth)

```typescript
// app/chat/page.tsx
'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSend = async () => {
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:3002/api/gemini/chat/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error: ' + error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Gemini Chat</h1>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full p-4 border rounded mb-4"
        rows={4}
      />
      
      <button
        onClick={handleSend}
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Response:</h3>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}
```

## JavaScript/Vanilla Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Gemini Chat</title>
</head>
<body>
    <h1>Gemini Chatbot</h1>
    
    <textarea id="message" placeholder="Ask me anything..." rows="4" cols="50"></textarea>
    <br>
    <button onclick="sendMessage()">Send</button>
    
    <div id="response" style="margin-top: 20px; padding: 10px; background: #f0f0f0;"></div>
    
    <script>
        async function sendMessage() {
            const message = document.getElementById('message').value;
            const responseDiv = document.getElementById('response');
            
            if (!message.trim()) {
                alert('Please enter a message');
                return;
            }
            
            responseDiv.innerHTML = 'Loading...';
            
            try {
                const response = await fetch('http://localhost:3002/api/gemini/chat/public', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    responseDiv.innerHTML = '<strong>AI:</strong><br>' + data.data.message;
                } else {
                    responseDiv.innerHTML = '<strong style="color: red;">Error:</strong> ' + data.error;
                }
            } catch (error) {
                responseDiv.innerHTML = '<strong style="color: red;">Error:</strong> ' + error.message;
            }
        }
    </script>
</body>
</html>
```

## Error Handling

```typescript
try {
  const response = await sendChatMessage(message);
  
  if (!response.success) {
    // Handle specific errors
    if (response.error?.includes('limit')) {
      alert('Semua API key sudah mencapai limit. Coba lagi nanti.');
    } else if (response.error?.includes('too long')) {
      alert('Pesan terlalu panjang. Maksimal 10000 karakter.');
    } else {
      alert('Error: ' + response.error);
    }
  }
} catch (error) {
  // Network or other errors
  console.error('Failed to send message:', error);
  alert('Koneksi gagal. Periksa internet Anda.');
}
```

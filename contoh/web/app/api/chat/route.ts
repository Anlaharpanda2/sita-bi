import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  console.log('>>> [PROXY] /api/chat route hit');

  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat`;
    console.log(`>>> [PROXY] Forwarding request to: ${backendUrl}`)

    // 1. Forward cookies from the client to the backend
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const cookie = req.headers.get('cookie');
    if (cookie) {
      headers.set('cookie', cookie);
      console.log('>>> [PROXY] Forwarding client cookie to backend.');
    }

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: headers,
      body: req.body,
      // @ts-ignore
      duplex: 'half', // Required for streaming request body
    });

    // 2. Forward Set-Cookie header from the backend to the client
    const responseHeaders = new Headers();
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      responseHeaders.set('set-cookie', setCookie);
      console.log('>>> [PROXY] Forwarding new session cookie from backend to client.');
    }
    responseHeaders.set('Content-Type', 'text/plain; charset=utf-8');

    if (!response.body) {
      return new Response('Backend did not return a stream', { status: 500 });
    }

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error(">>> [PROXY] Internal Server Error:", error);
    return new Response('Internal Server Error in proxy', { status: 500 });
  }
}

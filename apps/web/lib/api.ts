import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = Cookies.get('token');
  const headers = new Headers(options.headers);

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  // Do not set Content-Type for FormData, browser will do it with boundary
  if (options.body && !(options.body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred');
  }

  // Handle cases with no content
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export default request;

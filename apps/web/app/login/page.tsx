'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import request from '../../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await request<{ access_token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.access_token) {
        Cookies.set('token', response.access_token, { expires: 1 }); // Expires in 1 day
        // TODO: Redirect based on role
        router.push('/dashboard'); // Redirect to a generic dashboard for now
      } else {
        setError('Login failed: No access token received.');
      }
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message || 'An unknown error occurred.');
        } else {
            setError('An unknown error occurred.');
        }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <a href="http://localhost:3000/auth/google" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', border: '1px solid #ccc', textDecoration: 'none', color: 'black' }}>
        Sign in with Google
      </a>
      <div style={{ marginTop: '1rem' }}>
        <p>Don&apos;t have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
}
'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import request from '../../lib/api';

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await request<{ access_token: string }>('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      });

      if (response.access_token) {
        Cookies.set('token', response.access_token, { expires: 1 });
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'An unknown error occurred.');
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    try {
        await request('/auth/resend-otp', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
        alert('A new OTP has been sent to your email.');
    } catch(err: unknown) {
        if (err instanceof Error) {
            setError(err.message || 'Failed to resend OTP.');
        } else {
            setError('An unknown error occurred while resending OTP.');
        }
    }
  }

  return (
    <div>
      <h1>Verify Your Account</h1>
      <p>An OTP has been sent to <strong>{email}</strong>. Please enter it below.</p>
      <form onSubmit={handleVerifySubmit}>
        <div>
          <label>OTP Code: </label>
          <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify'}</button>
      </form>
      <button onClick={handleResendOtp} style={{marginTop: '1rem'}}>Resend OTP</button>
    </div>
  );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtpForm />
        </Suspense>
    )
}
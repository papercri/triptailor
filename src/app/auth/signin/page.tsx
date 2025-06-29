'use client';
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import { useRouter } from 'next/navigation';
import '@/styles/auth.scss'
import Link from "next/link";
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signIn } = useUser();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl'); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push(callbackUrl ? callbackUrl : '/');
    } catch (error) {
      setError('Failed to sign in' + error);
    }
  };
  return (
    <>
      <Header />
      <main className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h2>Sign In</h2>
                <p>Welcome back, keep exploring the world</p>
              </div>

               <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=""
                    id="email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className=""
                      id="password"
                      required
                    />
                   
                  </div>
                </div>

                <button type="submit" className="btn btn--primary btn--full">Sign In</button>
                {error && (
                  <div className="auth-error" style={{ color: 'red', marginTop: '1rem' }}>
                    {error}
                  </div>
                )}
              </form>
              <div className="auth-footer">
                <p>
                Don&apos;t have an account?{' '}
                <Link href={`/auth/signup${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}>
                Sign up
                </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

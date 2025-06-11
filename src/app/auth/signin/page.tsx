'use client';
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import '../auth.scss'
import Link from "next/link";
import { useState } from 'react';
import { loginUser } from '@/services/authService';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
        await loginUser(email, password);
        alert('Logged in!');
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred.');
      }
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
                      required
                    />
                   
                  </div>
                </div>

                <button type="submit" className="btn btn--primary btn--full">Sign In</button>
              </form>
              <div className="auth-footer">
                <p>Don&apos;t have an account? <Link href="../signup">Sign up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

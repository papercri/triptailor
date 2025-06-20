'use client';
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import '../auth.scss'
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  // const [error, setError] = useState('');
  const router = useRouter();
  const { signUp } = useUser();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user = await signUp(email, password, username);
      console.log('User registered:', user.uid, user.displayName);
      toast.success("Registration successful!");
      router.push('/');
     
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
        
      } else {
        toast.error('An unknown error occurred.');
        
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
                <h2>Create an Account</h2>
                <p>Join TripTailor and start planning your adventures</p>
              </div>

              <form onSubmit={handleRegister} className="auth-form">
         
                  <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input
                      type="text"
                      placeholder="User Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className=""
                      id="userName"
                      required
                    />
                  </div>
             
        
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
    
         

                   <button type="submit" className="btn btn--primary btn--full">Register </button>
              </form>

    

              <div className="auth-footer">
                <p>Already have an account? <Link href="/auth/signin" >Sign in</Link></p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={1000} />
      </main>
      <Footer />
    </>
  )
}

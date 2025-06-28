'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import UserItineraries from "@/components/userPage/UserItineraries";
import Header from "@/components/layout/header/Header"
import Footer from "@/components/layout/footer/Footer"
import '@/styles/user.scss'

export default function UserPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); 
    }
  }, [user, loading, router]);
  if (loading || !user) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p>Please log in to access this page.</p>
      </main>
    );
  }
 
  return (
    <>
    <Header />
    <main>
     <section className="section user-area">
          <div className="container">
              <div className="user-area__content">
                  <div className="trip-list">
                       <UserItineraries />
                  </div>
              </div>
          </div>
      </section>
    </main>
    <Footer />
    </>
    
  );
}

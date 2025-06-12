'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';


function Nav() {
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const router = useRouter();

  
  const { user, loading, logout } = useUser();
  

  console.log(user?.displayName);
  const toggleMobileMenu = () => {
    setMobileMenuActive(prev => !prev);
  };
 const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/signin'); // Redirect to signin after logout
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
 
  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav__logo">
          ✈️ TripTailor
        </Link>

        <ul className="nav__menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#destinos">Destinations</Link></li>
          <li><Link href="/#planificador">Planner</Link></li>
          <li><Link href="/#sobre-nosotros">About Us</Link></li>
        </ul>

        <div className="nav__auth">
          <Link href="/auth/signin" className="btn btn--outline">Sign In</Link>
          <Link href="/auth/signup" className="btn btn--primary">Sign Up</Link>
        </div>

        <div
          className={`nav__hamburger ${isMobileMenuActive ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <div className={`sticky-header__mobile-menu ${isMobileMenuActive ? 'active' : ''}`}>
        <ul className="nav__menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#destinos">Destinations</a></li>
          <li><a href="#planificador">Planner</a></li>
          <li><a href="#sobre-nosotros">About Us</a></li>
        </ul>
        <div className="nav__auth">
          {user ? (
            <>
            <p>Welcome {user.displayName}</p>
            <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Logout
                </button>
            </>) :
          (
            <>
            
            <a href="/auth/signin" className="btn btn--outline">Sign In</a>
            <a href="/auth/signup" className="btn btn--primary">Sign Up</a>
        
            </>
          )}
         </div>
      </div>
    </>
  );
}

export default Nav;

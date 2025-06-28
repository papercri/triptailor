'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDestinationSearch } from '@/hooks/useDestinationSearch';
import { useUser } from '@/context/UserContext';
import { User } from 'lucide-react';
import { Tooltip } from 'react-tooltip'
import SearchNav from "./SearchNav"
import UserDropdown from './UserDropdown';

function Nav() {
  const { place, handleChange, handleSubmit } = useDestinationSearch();
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const router = useRouter();
  const { user,  logout } = useUser();

  const toggleMobileMenu = () => {
    setMobileMenuActive(prev => !prev);
  };
 const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); 
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
 
  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav__logo shadow-2xl">
          ✈️ TripTailor
        </Link>

        <ul className="nav__menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#destinos">Destinations</Link></li>
          <li><Link href="/#sobre-nosotros">About</Link></li>
          {user ? (<li><Link href="/user">My Trips</Link></li>):(<></>)}
        </ul>
        <div className="flex gap-4 relative">
          <span className="mobile-switch-reverse absolute right-14 z-2 ">
            <SearchNav
              place={place}
              onChange={handleChange}
              onSubmit={handleSubmit}
          />
          </span>
          
          <div className="nav__auth relative">
            <ul className="nav__menu items-center">
              {user ? (
              <>
                  <UserDropdown />
                </>
              ) :
              (
                <>
                  <Link href="/auth/signin"  data-tooltip-id="signin" data-tooltip-content="Sign In" className="flex items-center justify-center !w-10 h-10 rounded-full  transition-all duration-200 group border !border-white hover:!border-gray-200 !decoration-none ">
                  <User />
                  </Link>
                  <Tooltip id="signin" />
                </>
              )}
            </ul>
          </div>
        </div>

    {/* Mobile Nav     */}
        <div className="mobile-switch gap-4">
          
          <div className={`nav__hamburger ${isMobileMenuActive ? 'active' : ''}`} onClick={toggleMobileMenu} >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`mobile-switch ${isMobileMenuActive ? 'active' : ''}`}>
            {user ? (
              <>
                <Link href="/user" className="user-icon">
                <span className="flex flex-col gap uppercase text-xs items-center text-white">
                  <User /><span className="name">{user?.displayName}</span>
                </span>
                </Link>
              </>
              ) :
              (
                <>
                  <Link href="/auth/signin"  data-tooltip-id="signin" data-tooltip-content="Sign In"><User /></Link>
                  <Tooltip id="signin" />
                </>
              )}
          </div>
        </div>
      </nav>
      <div className={`sticky-header__mobile-menu ${isMobileMenuActive ? 'active' : ''}`}>
        <ul className="nav__menu">
          <SearchNav
              place={place}
              onChange={handleChange}
              onSubmit={handleSubmit}
          />
          <li><Link href="#home">Home</Link></li>
          <li><Link href="#destinos">Destinations</Link></li>
          <li><Link href="#sobre-nosotros">About</Link></li>
        </ul>
        <div className="nav__auth">
          <ul className="nav__menu">
            {user ? (
             <>
                <li><Link href="/user">My Account</Link></li>
                <li>  
                  <a onClick={handleLogout} className="font-semibold">
                  Logout
                </a></li>
              </>
             ) :
            (
                <Link href="/auth/signin">Sign In</Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;

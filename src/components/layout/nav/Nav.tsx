'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useDestinationSearch } from '@/hooks/useDestinationSearch';
import { useUser } from '@/context/UserContext';
import { CircleUser } from 'lucide-react';
import { Tooltip } from 'react-tooltip'
function Nav() {
    const {
      place,
      handleChange,
      handleSubmit,
    } = useDestinationSearch();
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const router = useRouter();
  const { user,  logout } = useUser();
  console.log(user?.displayName);
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
        <Link href="/" className="nav__logo ">
          ✈️ TripTailor
        </Link>

        <ul className="nav__menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#destinos">Destinations</Link></li>
          <li><Link href="/#sobre-nosotros">About Us </Link></li>
          <li><Link href="mailto:papercri@gmail.com">Contact Us </Link></li>
        </ul>
         <form onSubmit={handleSubmit} className="hero__search">
            <input
              type="text"
              value={place}
              onChange={handleChange}
              placeholder="Where do you want to travel?"
              className="border rounded p-2 w-full"
            />
            <button type="submit" className="btn btn--primary">
              <Search />
            </button>
          </form>
        <div className="nav__auth">
          <ul className="nav__menu items-center">
            {user ? (
             <>
                <li > 
                  <a onClick={handleLogout}  data-tooltip-id="logout" data-tooltip-content="Log Out" className="uppercase text-xs font-bold">
                  Log Out
                </a></li>
                <li >
                  <Link href="/user" data-tooltip-id="myaccount" data-tooltip-content="My Account" className="user-icon">
                  <span className="flex flex-col uppercase text-xs items-center ">
                    <CircleUser /><span className="name">{user?.displayName}</span>
                  </span>
                  </Link>
                </li>
                <Tooltip id="myaccount" />
                <Tooltip id="logout" />
              </>
             ) :
            (
               <>
                <Link href="/auth/signin"  data-tooltip-id="signin" data-tooltip-content="Sign In"><CircleUser /></Link>
                <Tooltip id="signin" />
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <div className={`nav__hamburger ${isMobileMenuActive ? 'active' : ''}`} onClick={toggleMobileMenu} >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`auth-mobile ${isMobileMenuActive ? 'active' : ''}`}>
            {user ? (
              <>
                <Link href="/user" className="user-icon">
                <span className="flex flex-col gap uppercase text-xs items-center ">
                  <CircleUser /><span className="name">{user?.displayName}</span>
                </span>
                </Link>
              </>
              ) :
              (
                <>
                  <Link href="/auth/signin"  data-tooltip-id="signin" data-tooltip-content="Sign In"><CircleUser /></Link>
                  <Tooltip id="signin" />
                </>
              )}
          </div>
        </div>
      </nav>
      <div className={`sticky-header__mobile-menu ${isMobileMenuActive ? 'active' : ''}`}>
        <ul className="nav__menu">
          <li><Link href="#home">Home</Link></li>
          <li><Link href="#destinos">Destinations</Link></li>
          <li><Link href="#planificador">Planner</Link></li>
          <li><Link href="#sobre-nosotros">About Us</Link></li>
          <li><Link href="/">Contact Us </Link></li>
        </ul>
        <div className="nav__auth">
          <ul className="nav__menu">
            {user ? (
             <>
                <li><Link href="/user">My Account</Link></li>
                <li>  <a onClick={handleLogout} className="font-semibold">
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

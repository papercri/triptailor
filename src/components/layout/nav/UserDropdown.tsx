'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useUser();
  const router = useRouter();
  const toggleDropdown = () => setOpen((prev) => !prev);
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); 
    } catch (error) {
      console.error('Failed to log out:', error);
    }
    console.log('Logging out...');
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}

      >
        <span className="flex flex-col gap uppercase text-xs items-center ">
                  <User /><span className="name">{user?.displayName}</span>
                </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <Link
                href="/user"
                className="block px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setOpen(false)}
              >
                My Account
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

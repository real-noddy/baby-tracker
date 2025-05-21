'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="font-bold text-xl">
                Baby Food Tracker
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {status === 'authenticated' && (
                  <>
                    <Link
                      href="/dashboard"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard')}`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/babies"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/babies')}`}
                    >
                      My Babies
                    </Link>
                    <Link
                      href="/food-intake"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/food-intake')}`}
                    >
                      Food Intake
                    </Link>
                    <Link
                      href="/activities"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/activities')}`}
                    >
                      Activities
                    </Link>
                    <Link
                      href="/reports"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/reports')}`}
                    >
                      Reports
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {status === 'loading' ? (
                <div className="px-3 py-2">Loading...</div>
              ) : status === 'authenticated' ? (
                <div className="flex items-center">
                  <span className="mr-3">{session.user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-x-2">
                  <Link
                    href="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/login')}`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`px-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700`}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {status === 'authenticated' && (
              <>
                <Link
                  href="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard')}`}
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link
                  href="/babies"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/babies')}`}
                  onClick={toggleMenu}
                >
                  My Babies
                </Link>
                <Link
                  href="/food-intake"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/food-intake')}`}
                  onClick={toggleMenu}
                >
                  Food Intake
                </Link>
                <Link
                  href="/activities"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/activities')}`}
                  onClick={toggleMenu}
                >
                  Activities
                </Link>
                <Link
                  href="/reports"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/reports')}`}
                  onClick={toggleMenu}
                >
                  Reports
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-blue-700">
            <div className="px-2 space-y-1">
              {status === 'loading' ? (
                <div className="px-3 py-2">Loading...</div>
              ) : status === 'authenticated' ? (
                <>
                  <div className="px-3 py-2">{session.user?.name}</div>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/login')}`}
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`block px-3 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700`}
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 
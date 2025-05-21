'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export function Sidebar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className={`bg-blue-900 text-white transition-all duration-300 ease-in-out h-screen flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo and toggle */}
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        {!isCollapsed && (
          <Link href="/" className="font-bold text-xl whitespace-nowrap">
            Baby Food Tracker
          </Link>
        )}
        <button 
          onClick={toggleSidebar}
          className={`p-1 rounded hover:bg-blue-800 ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Links */}
      {status === 'authenticated' && (
        <div className="flex-grow overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center px-3 py-2.5 rounded-md font-medium transition-colors ${isActive('/dashboard')} hover:bg-blue-800`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href="/babies"
              className={`flex items-center px-3 py-2.5 rounded-md font-medium transition-colors ${isActive('/babies')} hover:bg-blue-800`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {!isCollapsed && <span>My Babies</span>}
            </Link>
            <Link
              href="/food-intake"
              className={`flex items-center px-3 py-2.5 rounded-md font-medium transition-colors ${isActive('/food-intake')} hover:bg-blue-800`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {!isCollapsed && <span>Food Intake</span>}
            </Link>
            <Link
              href="/activities"
              className={`flex items-center px-3 py-2.5 rounded-md font-medium transition-colors ${isActive('/activities')} hover:bg-blue-800`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {!isCollapsed && <span>Activities</span>}
            </Link>
            <Link
              href="/reports"
              className={`flex items-center px-3 py-2.5 rounded-md font-medium transition-colors ${isActive('/reports')} hover:bg-blue-800`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {!isCollapsed && <span>Reports</span>}
            </Link>
            <Link
              href="/calendar"
              className={`flex items-center px-3 py-2.5 rounded-md font-medium transition-colors ${isActive('/calendar')} hover:bg-blue-800`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {!isCollapsed && <span>Calendar</span>}
            </Link>
          </nav>
        </div>
      )}

      {/* Settings Button */}
      <div className="border-t border-blue-800 py-3 px-2 relative">
        <button 
          onClick={toggleSettings}
          className={`w-full flex items-center px-3 py-2.5 rounded-md font-medium hover:bg-blue-800 transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {!isCollapsed && <span>Settings</span>}
        </button>

        {/* Settings Dropdown */}
        {showSettings && (
          <div className={`absolute ${isCollapsed ? 'left-16 bottom-0' : 'bottom-16 left-2 right-2'} bg-white text-gray-800 rounded-md shadow-lg py-2 z-10`}>
            <Link href="/settings/account" className="block px-4 py-2 hover:bg-gray-100">
              Account Settings
            </Link>
            <Link href="/settings/general" className="block px-4 py-2 hover:bg-gray-100">
              General Settings
            </Link>
            <Link href="/settings/notifications" className="block px-4 py-2 hover:bg-gray-100">
              Notifications
            </Link>
            <div className="border-t border-gray-200 my-1"></div>
            <button 
              onClick={() => signOut()}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 
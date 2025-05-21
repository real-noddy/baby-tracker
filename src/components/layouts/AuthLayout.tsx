'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function AuthLayout({ children, title }: AuthLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">
            Baby Food Tracker
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="bg-blue-50 mx-auto w-fit px-6 py-3 rounded-full mb-6">
            <h1 className="text-2xl font-bold text-center text-blue-700">{title}</h1>
          </div>
          {children}
        </div>
      </main>
      
      <footer className="bg-blue-600 text-white py-4 shadow-inner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Baby Food Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 
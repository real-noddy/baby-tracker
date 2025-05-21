'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AppLayout } from '@/components/layouts/AppLayout';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [babies, setBabies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBabies = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const response = await fetch('/api/babies');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch babies');
        }
        
        setBabies(data.babies || []);
      } catch (err: any) {
        console.error('Error fetching babies:', err);
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBabies();
  }, []);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name}!</h1>
        <p className="text-gray-600">
          Track your baby&apos;s food intake and activities all in one place.
        </p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading your data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
          <p className="mt-2">
            Please try refreshing the page or contact support if the problem persists.
          </p>
        </div>
      ) : (
        <>
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Babies</h2>
              <Link 
                href="/babies/add" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add New Baby
              </Link>
            </div>
            
            {babies.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-6 rounded-md text-center">
                <p className="mb-4">You haven&apos;t added any babies yet.</p>
                <Link 
                  href="/babies/add" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Your First Baby
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {babies.map((baby: any) => (
                  <div key={baby._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">{baby.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {calculateAge(baby.birthDate)}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        href={`/food-intake?babyId=${baby._id}`}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200"
                      >
                        Food Intake
                      </Link>
                      <Link
                        href={`/activities?babyId=${baby._id}`}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-md text-sm hover:bg-purple-200"
                      >
                        Activities
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/food-intake/add" className="flex items-center text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Food Intake
                  </Link>
                </li>
                <li>
                  <Link href="/activities/add" className="flex items-center text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Activity
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="flex items-center text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    View Reports
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Tips for Baby Nutrition</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Breast milk or formula should be the main source of nutrition for the first year.</li>
                <li>Start introducing solid foods around 6 months of age.</li>
                <li>Introduce one new food at a time to watch for allergies.</li>
                <li>Aim for a variety of fruits, vegetables, proteins, and grains.</li>
                <li>Avoid added sugar and salt in baby food.</li>
              </ul>
            </div>
          </section>
        </>
      )}
    </AppLayout>
  );
}

function calculateAge(birthDate: string) {
  const birth = new Date(birthDate);
  const now = new Date();
  
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 31) {
    return `${diffDays} days old`;
  }
  
  const months = Math.floor(diffDays / 30.44);
  
  if (months < 24) {
    return `${months} month${months === 1 ? '' : 's'} old`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  return `${years} year${years === 1 ? '' : 's'}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}` : ''} old`;
} 
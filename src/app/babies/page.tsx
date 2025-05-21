'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layouts/AppLayout';
import Link from 'next/link';

export default function BabiesPage() {
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Babies</h1>
        <p className="text-gray-600">Manage your baby profiles and track their growth.</p>
      </div>

      <div className="flex justify-end mb-6">
        <Link 
          href="/babies/add" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Baby
        </Link>
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
      ) : babies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No Babies Added Yet</h2>
          <p className="text-gray-600 mb-6">Add your first baby to start tracking their nutrition and activities.</p>
          <Link 
            href="/babies/add" 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
          >
            Add Your First Baby
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {babies.map((baby: any) => (
            <div key={baby._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{baby.name}</h3>
                <div className="text-gray-600 mb-4">
                  <p>Date of Birth: {new Date(baby.birthDate).toLocaleDateString()}</p>
                  <p>Age: {calculateAge(baby.birthDate)}</p>
                  <p>Gender: {baby.gender}</p>
                </div>
                <div className="flex space-x-2 mt-4">
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
                  <Link
                    href={`/reports?babyId=${baby._id}`}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200"
                  >
                    Reports
                  </Link>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <Link
                  href={`/babies/edit/${baby._id}`}
                  className="text-blue-600 hover:text-blue-800 mr-4"
                >
                  Edit
                </Link>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(baby._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );

  // Function to handle baby deletion (placeholder)
  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this baby profile? This action cannot be undone.')) {
      // Implement the deletion logic here
      console.log('Delete baby with ID:', id);
    }
  }
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
'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layouts/AppLayout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ReportsPage() {
  const searchParams = useSearchParams();
  const babyId = searchParams.get('babyId');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBaby, setSelectedBaby] = useState<any>(null);
  const [babies, setBabies] = useState<any[]>([]);
  const [reportType, setReportType] = useState('food');

  useEffect(() => {
    // Fetch babies list
    const fetchBabies = async () => {
      try {
        const response = await fetch('/api/babies');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch babies');
        }
        
        setBabies(data.babies || []);
        
        // If babyId is provided, set selected baby
        if (babyId && data.babies) {
          const baby = data.babies.find((b: any) => b._id === babyId);
          setSelectedBaby(baby || null);
        } else if (data.babies && data.babies.length > 0) {
          // Otherwise, select the first baby
          setSelectedBaby(data.babies[0]);
        }
      } catch (err) {
        console.error('Error fetching babies:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBabies();
  }, [babyId]);

  const handleBabyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const babyId = e.target.value;
    const baby = babies.find((b: any) => b._id === babyId);
    setSelectedBaby(baby || null);
  };

  const handleReportTypeChange = (type: string) => {
    setReportType(type);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Reports &amp; Analytics</h1>
        <p className="text-gray-600">Analyze your baby's nutrition and activities with detailed reports.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
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
          <p className="text-gray-600 mb-6">Add a baby profile first to view reports and analytics.</p>
          <Link 
            href="/babies/add" 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
          >
            Add Your First Baby
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <label htmlFor="babySelect" className="mr-2 font-medium text-gray-700">Select Baby:</label>
              <select 
                id="babySelect"
                className="border border-gray-300 rounded-md px-3 py-1.5"
                value={selectedBaby?._id || ''}
                onChange={handleBabyChange}
              >
                {babies.map((baby: any) => (
                  <option key={baby._id} value={baby._id}>
                    {baby.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${reportType === 'food' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                onClick={() => handleReportTypeChange('food')}
              >
                Food
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${reportType === 'activities' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                onClick={() => handleReportTypeChange('activities')}
              >
                Activities
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${reportType === 'growth' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                onClick={() => handleReportTypeChange('growth')}
              >
                Growth
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {renderReportContent()}
          </div>
        </>
      )}
    </AppLayout>
  );

  function renderReportContent() {
    switch (reportType) {
      case 'food':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Food Intake Report</h2>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Data Available Yet</h3>
              <p className="text-gray-600 mb-6">Start tracking your baby's food intake to see reports and analytics here.</p>
              <Link 
                href="/food-intake/add" 
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
              >
                Add Food Entry
              </Link>
            </div>
          </div>
        );
        
      case 'activities':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Activities Report</h2>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Data Available Yet</h3>
              <p className="text-gray-600 mb-6">Start tracking your baby's activities to see reports and analytics here.</p>
              <Link 
                href="/activities/add" 
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 inline-block"
              >
                Add Activity
              </Link>
            </div>
          </div>
        );
        
      case 'growth':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Growth Report</h2>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Growth Data Available Yet</h3>
              <p className="text-gray-600 mb-6">Add growth measurements to see your baby's growth charts here.</p>
              <Link 
                href="/babies/measurements/add" 
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 inline-block"
              >
                Add Measurement
              </Link>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  }
} 
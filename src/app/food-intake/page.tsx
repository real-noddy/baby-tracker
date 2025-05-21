'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layouts/AppLayout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function FoodIntakePage() {
  const searchParams = useSearchParams();
  const babyId = searchParams.get('babyId');
  
  const [foodEntries, setFoodEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBaby, setSelectedBaby] = useState<any>(null);
  const [babies, setBabies] = useState([]);

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
      }
    };
    
    fetchBabies();
  }, [babyId]);

  useEffect(() => {
    // Fetch food entries for the selected baby
    const fetchFoodEntries = async () => {
      if (!selectedBaby) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        // This is a placeholder - replace with actual API endpoint
        // const response = await fetch(`/api/food-intake?babyId=${selectedBaby._id}`);
        // const data = await response.json();
        
        // if (!response.ok) {
        //   throw new Error(data.error || 'Failed to fetch food entries');
        // }
        
        // setFoodEntries(data.entries || []);
        
        // Placeholder data
        setFoodEntries([
          {
            _id: '1',
            type: 'Breast Milk',
            amount: '120ml',
            date: new Date().toISOString(),
            notes: 'Fed well'
          },
          {
            _id: '2',
            type: 'Puree',
            food: 'Carrot and Apple',
            amount: '2 tbsp',
            date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            notes: 'Enjoyed it a lot'
          }
        ]);
      } catch (err: any) {
        console.error('Error fetching food entries:', err);
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFoodEntries();
  }, [selectedBaby]);

  const handleBabyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const babyId = e.target.value;
    const baby = babies.find((b: any) => b._id === babyId);
    setSelectedBaby(baby || null);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Food Intake Tracking</h1>
        <p className="text-gray-600">Monitor your baby's nutrition and feeding patterns.</p>
      </div>

      {babies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No Babies Added Yet</h2>
          <p className="text-gray-600 mb-6">Add a baby profile first to start tracking food intake.</p>
          <Link 
            href="/babies/add" 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
          >
            Add Your First Baby
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
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
            
            <Link 
              href="/food-intake/add"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Food Entry
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700">Loading food entries...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <p>{error}</p>
              <p className="mt-2">
                Please try refreshing the page or contact support if the problem persists.
              </p>
            </div>
          ) : foodEntries.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">No Food Entries Yet</h2>
              <p className="text-gray-600 mb-6">Start tracking your baby's food intake by adding the first entry.</p>
              <Link 
                href="/food-intake/add" 
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 inline-block"
              >
                Add First Food Entry
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food/Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {foodEntries.map((entry: any) => (
                    <tr key={entry._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(entry.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {entry.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {entry.food ? `${entry.food} (${entry.amount})` : entry.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {entry.notes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                        <Link
                          href={`/food-intake/edit/${entry._id}`}
                          className="text-blue-600 hover:text-blue-800 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(entry._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </AppLayout>
  );

  // Function to handle food entry deletion (placeholder)
  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this food entry? This action cannot be undone.')) {
      // Implement the deletion logic here
      console.log('Delete food entry with ID:', id);
    }
  }
} 
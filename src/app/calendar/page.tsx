'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, startOfMonth, endOfMonth, isSameDay, isSameMonth, isToday, parseISO, getDay } from 'date-fns';
import { AppLayout } from '@/components/layouts/AppLayout';

type FeedingData = {
  _id: string;
  babyId: string;
  date: string;
  foodName: string;
  amount: number;
  unit: string;
  notes?: string;
  babyName?: string;
};

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedingData, setFeedingData] = useState<FeedingData[]>([]);
  const [babies, setBabies] = useState<any[]>([]);
  const [selectedBabyId, setSelectedBabyId] = useState<string | null>(null);

  useEffect(() => {
    const babyId = searchParams.get('babyId');
    if (babyId) {
      setSelectedBabyId(babyId);
    }
    
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        // Fetch babies data
        const babiesResponse = await fetch('/api/babies');
        const babiesData = await babiesResponse.json();
        
        if (!babiesResponse.ok) {
          throw new Error(babiesData.error || 'Failed to fetch babies');
        }
        
        setBabies(babiesData.babies || []);
        
        // Set first baby as default if no baby is selected and there are babies
        if (!babyId && babiesData.babies && babiesData.babies.length > 0) {
          setSelectedBabyId(babiesData.babies[0]._id);
        }
        
        // Fetch feeding data
        const feedingResponse = await fetch(`/api/food-intake${babyId ? `?babyId=${babyId}` : ''}`);
        const feedingData = await feedingResponse.json();
        
        if (!feedingResponse.ok) {
          throw new Error(feedingData.error || 'Failed to fetch feeding data');
        }
        
        // Match baby names to feeding data
        const enrichedFeedingData = feedingData.feedings.map((feeding: any) => {
          const baby = babiesData.babies.find((b: any) => b._id === feeding.babyId);
          return {
            ...feeding,
            babyName: baby ? baby.name : 'Unknown',
          };
        });
        
        setFeedingData(enrichedFeedingData || []);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [searchParams]);

  const handleBabyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBabyId(e.target.value);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (viewMode === 'month') {
      setViewMode('day');
    }
  };

  const getDaysToDisplay = () => {
    switch (viewMode) {
      case 'day':
        return [selectedDate];
      case 'week':
        return eachDayOfInterval({
          start: startOfWeek(selectedDate, { weekStartsOn: 0 }),
          end: endOfWeek(selectedDate, { weekStartsOn: 0 }),
        });
      case 'month':
        return eachDayOfInterval({
          start: startOfMonth(selectedDate),
          end: endOfMonth(selectedDate),
        });
      default:
        return [];
    }
  };

  const previousPeriod = () => {
    switch (viewMode) {
      case 'day':
        setSelectedDate(prev => addDays(prev, -1));
        break;
      case 'week':
        setSelectedDate(prev => addDays(prev, -7));
        break;
      case 'month':
        // Move to previous month
        setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        break;
    }
  };

  const nextPeriod = () => {
    switch (viewMode) {
      case 'day':
        setSelectedDate(prev => addDays(prev, 1));
        break;
      case 'week':
        setSelectedDate(prev => addDays(prev, 7));
        break;
      case 'month':
        // Move to next month
        setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        break;
    }
  };

  const today = () => {
    setSelectedDate(new Date());
  };

  const getEventsForDay = (day: Date) => {
    return feedingData.filter(feeding => {
      const feedingDate = parseISO(feeding.date);
      return isSameDay(feedingDate, day);
    });
  };

  const getViewTitle = () => {
    switch (viewMode) {
      case 'day':
        return format(selectedDate, 'MMMM d, yyyy');
      case 'week':
        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      default:
        return '';
    }
  };

  const renderMonthView = () => {
    const days = getDaysToDisplay();
    const monthStart = startOfMonth(selectedDate);
    const dayOfWeek = getDay(monthStart);
    
    // Add empty divs for days before the start of month
    const blanks = [];
    for (let i = 0; i < dayOfWeek; i++) {
      blanks.push(
        <div key={`blank-${i}`} className="p-2 border border-gray-200 bg-gray-50"></div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-semibold bg-gray-100 border border-gray-200">
            {day}
          </div>
        ))}
        
        {blanks}
        
        {days.map(day => {
          const events = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          
          return (
            <div 
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              className={`p-2 border border-gray-200 min-h-[100px] ${
                isToday(day) ? 'bg-blue-50 border-blue-300' : 
                isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
              } cursor-pointer hover:bg-blue-50 transition-colors`}
            >
              <div className="font-medium mb-1">{format(day, 'd')}</div>
              
              <div className="space-y-1">
                {events.slice(0, 3).map(event => (
                  <div key={event._id} className="text-xs p-1 bg-green-100 rounded truncate">
                    {event.foodName}
                  </div>
                ))}
                
                {events.length > 3 && (
                  <div className="text-xs text-blue-600 font-medium">
                    + {events.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getDaysToDisplay();
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div key={day.toString()} className="text-center font-semibold p-2 bg-gray-100 border border-gray-200">
            <div>{format(day, 'E')}</div>
            <div className={`${isToday(day) ? 'text-blue-600' : ''}`}>{format(day, 'd')}</div>
          </div>
        ))}
        
        <div className="col-span-7 grid grid-cols-7 gap-1">
          {days.map(day => {
            const events = getEventsForDay(day);
            
            return (
              <div 
                key={`events-${day.toString()}`}
                className={`border border-gray-200 p-2 min-h-[300px] ${
                  isToday(day) ? 'bg-blue-50' : 'bg-white'
                } overflow-y-auto`}
              >
                {events.map(event => (
                  <div 
                    key={event._id}
                    className="mb-2 p-2 bg-green-100 rounded text-sm"
                  >
                    <div className="font-medium">{event.foodName}</div>
                    <div className="text-xs text-gray-600">
                      {event.amount} {event.unit}
                    </div>
                    {event.notes && (
                      <div className="text-xs mt-1 text-gray-600">{event.notes}</div>
                    )}
                  </div>
                ))}
                
                {events.length === 0 && (
                  <div className="text-center text-gray-400 text-sm mt-4">
                    No entries
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const events = getEventsForDay(selectedDate);
    
    return (
      <div className="border border-gray-200 rounded-lg bg-white p-4">
        <div className="text-xl font-semibold mb-4">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </div>
        
        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="font-medium text-lg">No food entries for this day</p>
            <p className="mt-2 text-gray-500">Add food intake entries to track your baby's nutrition.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {events.map(event => (
              <div key={event._id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{event.foodName}</h3>
                    <p className="text-gray-600">{event.amount} {event.unit}</p>
                    {event.babyName && (
                      <p className="text-sm text-blue-600 font-medium mt-1">
                        {event.babyName}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(parseISO(event.date), 'h:mm a')}
                  </div>
                </div>
                
                {event.notes && (
                  <div className="mt-2 text-gray-700 text-sm bg-gray-50 p-2 rounded">
                    {event.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Food Calendar</h1>
        <p className="text-gray-800">Track and view your baby's feeding schedule</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading calendar data...</p>
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
          {/* Calendar Controls */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={previousPeriod}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <h2 className="text-xl font-semibold">{getViewTitle()}</h2>
                
                <button 
                  onClick={nextPeriod}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button 
                  onClick={today}
                  className="ml-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                >
                  Today
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button 
                    onClick={() => setViewMode('day')} 
                    className={`px-3 py-1 text-sm ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                  >
                    Day
                  </button>
                  <button 
                    onClick={() => setViewMode('week')} 
                    className={`px-3 py-1 text-sm ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                  >
                    Week
                  </button>
                  <button 
                    onClick={() => setViewMode('month')} 
                    className={`px-3 py-1 text-sm ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                  >
                    Month
                  </button>
                </div>
                
                {babies.length > 0 && (
                  <select
                    value={selectedBabyId || ''}
                    onChange={handleBabyChange}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    {babies.map((baby) => (
                      <option key={baby._id} value={baby._id}>
                        {baby.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
          
          {/* Calendar View */}
          <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'day' && renderDayView()}
          </div>
        </>
      )}
    </AppLayout>
  );
} 
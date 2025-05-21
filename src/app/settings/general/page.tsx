'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layouts/AppLayout';

export default function GeneralSettingsPage() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    language: 'en',
    measurementSystem: 'metric',
    timezone: 'UTC'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleToggle = (field: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({
        type: 'success',
        text: 'Settings updated successfully!',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update settings. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">General Settings</h1>
        <p className="text-gray-800">Customize your app preferences and display settings</p>
      </div>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">App Notifications</h3>
                    <p className="text-sm text-gray-600">Receive in-app notifications for feeding reminders and milestones</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="absolute w-0 h-0 opacity-0"
                      checked={preferences.notifications}
                      onChange={() => handleToggle('notifications')}
                    />
                    <label
                      htmlFor="notifications"
                      className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                        preferences.notifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          preferences.notifications ? 'translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Updates</h3>
                    <p className="text-sm text-gray-600">Receive weekly summaries and important updates via email</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id="emailUpdates"
                      className="absolute w-0 h-0 opacity-0"
                      checked={preferences.emailUpdates}
                      onChange={() => handleToggle('emailUpdates')}
                    />
                    <label
                      htmlFor="emailUpdates"
                      className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                        preferences.emailUpdates ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          preferences.emailUpdates ? 'translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">Display</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-600">Enable dark mode for the app interface</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id="darkMode"
                      className="absolute w-0 h-0 opacity-0"
                      checked={preferences.darkMode}
                      onChange={() => handleToggle('darkMode')}
                    />
                    <label
                      htmlFor="darkMode"
                      className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                        preferences.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          preferences.darkMode ? 'translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Language</h3>
                  <select
                    name="language"
                    value={preferences.language}
                    onChange={handleChange}
                    className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">Measurements</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Measurement System</h3>
                  <select
                    name="measurementSystem"
                    value={preferences.measurementSystem}
                    onChange={handleChange}
                    className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="metric">Metric (grams, milliliters)</option>
                    <option value="imperial">Imperial (ounces, cups)</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Timezone</h3>
                  <select
                    name="timezone"
                    value={preferences.timezone}
                    onChange={handleChange}
                    className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="CST">CST (Central Standard Time)</option>
                    <option value="MST">MST (Mountain Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
} 
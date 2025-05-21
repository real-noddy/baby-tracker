'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layouts/AppLayout';

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState({
    feedingReminders: true,
    feedingReminderFrequency: '4',
    milestoneAlerts: true,
    nutritionReports: true,
    reportFrequency: 'weekly',
    appUpdates: true,
    emailNotifications: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleToggle = (field: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
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
        text: 'Notification settings updated successfully!',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update notification settings. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Notification Settings</h1>
        <p className="text-gray-800">Manage how and when you receive notifications about your baby's care</p>
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
              <h2 className="text-xl font-semibold mb-4">Feeding Reminders</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Feeding Reminders</h3>
                    <p className="text-sm text-gray-600">Get notifications when it's time for your baby's next meal</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id="feedingReminders"
                      className="absolute w-0 h-0 opacity-0"
                      checked={settings.feedingReminders}
                      onChange={() => handleToggle('feedingReminders')}
                    />
                    <label
                      htmlFor="feedingReminders"
                      className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                        settings.feedingReminders ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          settings.feedingReminders ? 'translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                {settings.feedingReminders && (
                  <div>
                    <h3 className="font-medium mb-2">Reminder Frequency</h3>
                    <div className="flex items-center space-x-2">
                      <select
                        name="feedingReminderFrequency"
                        value={settings.feedingReminderFrequency}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="2">Every 2 hours</option>
                        <option value="3">Every 3 hours</option>
                        <option value="4">Every 4 hours</option>
                        <option value="5">Every 5 hours</option>
                        <option value="6">Every 6 hours</option>
                      </select>
                      <span className="text-gray-600">during daytime</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">Growth & Development</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Milestone Alerts</h3>
                    <p className="text-sm text-gray-600">Get notified about developmental milestones your baby might reach</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id="milestoneAlerts"
                      className="absolute w-0 h-0 opacity-0"
                      checked={settings.milestoneAlerts}
                      onChange={() => handleToggle('milestoneAlerts')}
                    />
                    <label
                      htmlFor="milestoneAlerts"
                      className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                        settings.milestoneAlerts ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          settings.milestoneAlerts ? 'translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Nutrition Reports</h3>
                    <p className="text-sm text-gray-600">Receive summary reports of your baby's nutrition</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id="nutritionReports"
                      className="absolute w-0 h-0 opacity-0"
                      checked={settings.nutritionReports}
                      onChange={() => handleToggle('nutritionReports')}
                    />
                    <label
                      htmlFor="nutritionReports"
                      className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                        settings.nutritionReports ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          settings.nutritionReports ? 'translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                {settings.nutritionReports && (
                  <div>
                    <h3 className="font-medium mb-2">Report Frequency</h3>
                    <select
                      name="reportFrequency"
                      value={settings.reportFrequency}
                      onChange={handleChange}
                      className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Every two weeks</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">Other Notifications</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">App Updates</h3>
                    <p className="text-sm text-gray-600">Get notified about new features and updates</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id="appUpdates"
                      className="absolute w-0 h-0 opacity-0"
                      checked={settings.appUpdates}
                      onChange={() => handleToggle('appUpdates')}
                    />
                    <label
                      htmlFor="appUpdates"
                      className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                        settings.appUpdates ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          settings.appUpdates ? 'translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive notifications by email in addition to in-app alerts</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      className="absolute w-0 h-0 opacity-0"
                      checked={settings.emailNotifications}
                      onChange={() => handleToggle('emailNotifications')}
                    />
                    <label
                      htmlFor="emailNotifications"
                      className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                        settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          settings.emailNotifications ? 'translate-x-6' : ''
                        }`}
                      />
                    </label>
                  </div>
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
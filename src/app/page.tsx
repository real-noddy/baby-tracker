import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section with animation and better typography */}
        <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white"></div>
            <div className="absolute top-1/4 -right-24 w-64 h-64 rounded-full bg-white"></div>
            <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-white"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm">
                  Track Your Baby&apos;s <span className="text-yellow-300">Food</span> and <span className="text-yellow-300">Activities</span>
                </h1>
                <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-lg">
                  A simple and intuitive way to monitor your baby&apos;s nutrition, 
                  diaper changes, and daily activities for optimal health and development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/register" 
                    className="px-8 py-4 bg-white text-blue-600 font-bold rounded-md hover:bg-yellow-300 hover:text-blue-700 transition duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl text-center"
                  >
                    Get Started — It&apos;s Free
                  </Link>
                  <Link 
                    href="/login" 
                    className="px-8 py-4 bg-blue-800 text-white font-bold rounded-md hover:bg-blue-900 transition duration-300 shadow border-2 border-blue-400 text-center"
                  >
                    Login
                  </Link>
                </div>
              </div>
              
              <div className="relative h-80 md:h-auto animate-fade-in">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full -z-10 blur-2xl opacity-50"></div>
                <div className="relative z-10 flex justify-center">
                  <div className="relative h-72 md:h-96 w-72 md:w-96 overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image 
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=100" 
                      alt="Mother feeding baby healthy food" 
                      width={800} 
                      height={800}
                      className="object-cover h-full w-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,64C1120,64,1280,32,1360,16L1440,0L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Features section with improved cards and animations */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-3">FEATURES</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Everything You Need to Track Your Baby&apos;s Growth</h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                Our comprehensive tools help you monitor every aspect of your baby&apos;s development.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border border-blue-100 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Baby Profiles</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create and manage multiple baby profiles with comprehensive details for personalized tracking.
                </p>
              </div>
              
              <div className="p-8 bg-yellow-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border border-yellow-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Food Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Log breast milk, formula, and solid foods to ensure your baby gets the nutrients they need.
                </p>
              </div>
              
              <div className="p-8 bg-green-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border border-green-100 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 bg-green-600 text-white rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Activity Logging</h3>
                <p className="text-gray-600 leading-relaxed">
                  Record diaper changes, sleep patterns, and other daily activities with easy-to-use trackers.
                </p>
              </div>
              
              <div className="p-8 bg-purple-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border border-purple-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-purple-600 text-white rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Nutrition Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get detailed insights into your baby&apos;s nutritional intake and identify areas for improvement.
                </p>
              </div>
              
              <div className="p-8 bg-pink-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border border-pink-100 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="w-16 h-16 bg-pink-500 text-white rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Progress Reports</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track your baby&apos;s development with comprehensive reports, charts, and visualizations.
                </p>
              </div>
              
              <div className="p-8 bg-indigo-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border border-indigo-100 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Mobile Friendly</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access your baby&apos;s data on the go with our responsive, mobile-friendly design.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits section with mother and baby image */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-left">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-50"></div>
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
                    <Image 
                      src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=100" 
                      alt="Happy parents with newborn baby" 
                      width={600} 
                      height={600}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in-right">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-3">WHY CHOOSE US</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Peace of Mind for New Parents</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-800">Scientifically Backed</h3>
                      <p className="text-gray-600">Our nutrition recommendations are based on pediatric nutrition guidelines.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-800">Secure & Private</h3>
                      <p className="text-gray-600">Your baby's data is encrypted and never shared with third parties.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-800">Easy to Use</h3>
                      <p className="text-gray-600">Designed with busy parents in mind - log entries in seconds, not minutes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Parent Journey Timeline Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-3">PARENT JOURNEY</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Your Baby's Food Journey</h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-700 font-medium">
                Track your baby's nutritional evolution from birth through their developmental stages
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 z-0"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12 md:space-y-0">
                {/* Stage 1 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center mb-12 md:mb-24">
                  <div className="md:text-right md:pr-12 animate-fade-in-left" style={{ animationDuration: '0.8s' }}>
                    <div className="bg-blue-100 inline-block px-4 py-1 rounded-full text-blue-800 font-semibold text-sm mb-3">0-6 months</div>
                    <h3 className="text-2xl font-bold mb-3 text-blue-800">Milk-Based Nutrition</h3>
                    <p className="text-gray-700 mb-4 font-medium">
                      Track breast milk or formula feedings, including frequency, duration, and amounts to ensure your baby is getting proper nutrition.
                    </p>
                    <div className="flex md:justify-end gap-2">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Feeding Times</span>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Amount Tracking</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 relative md:pl-12 animate-fade-in-right" style={{ animationDuration: '0.8s' }}>
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="p-1 bg-blue-500"></div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-lg text-blue-800">Feeding Reminders</h4>
                        </div>
                        <p className="text-gray-700 mb-4 font-medium">Set feeding reminders and track nutrition intake with our easy-to-use interface.</p>
                        <div className="bg-blue-50 rounded-lg p-3 mb-3">
                          <div className="flex justify-between text-sm text-gray-700 font-medium mb-2">
                            <span>Today</span>
                            <span>8 feedings</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stage 2 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center mb-12 md:mb-24">
                  <div className="md:order-2 md:text-left md:pl-12 animate-fade-in-right" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}>
                    <div className="bg-green-100 inline-block px-4 py-1 rounded-full text-green-800 font-semibold text-sm mb-3">6-8 months</div>
                    <h3 className="text-2xl font-bold mb-3 text-green-800">First Solid Foods</h3>
                    <p className="text-gray-700 mb-4 font-medium">
                      Monitor your baby's introduction to solid foods with purees and single-ingredient foods, tracking reactions and preferences.
                    </p>
                    <div className="flex gap-2">
                      <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">Food Introduction</span>
                      <span className="inline-block px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">Allergy Tracking</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 relative md:order-1 md:pr-12 animate-fade-in-left" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}>
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-green-500 border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="p-1 bg-green-500"></div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-lg text-green-800">Allergy Monitoring</h4>
                        </div>
                        <p className="text-gray-700 mb-4 font-medium">Safely introduce new foods and track potential allergic reactions.</p>
                        <div className="flex gap-2 mb-3 flex-wrap">
                          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Avocado
                          </div>
                          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Sweet Potato
                          </div>
                          <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center font-medium">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                            Eggs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stage 3 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center mb-12 md:mb-24">
                  <div className="md:text-right md:pr-12 animate-fade-in-left" style={{ animationDuration: '0.8s', animationDelay: '0.4s' }}>
                    <div className="bg-purple-100 inline-block px-4 py-1 rounded-full text-purple-800 font-semibold text-sm mb-3">8-12 months</div>
                    <h3 className="text-2xl font-bold mb-3 text-purple-800">Texture Progression</h3>
                    <p className="text-gray-700 mb-4 font-medium">
                      Track your baby's transition to more textured foods and finger foods, monitoring nutritional variety and meal patterns.
                    </p>
                    <div className="flex md:justify-end gap-2">
                      <span className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">Meal Planning</span>
                      <span className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">Nutritional Balance</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 relative md:pl-12 animate-fade-in-right" style={{ animationDuration: '0.8s', animationDelay: '0.4s' }}>
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-500 border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="p-1 bg-purple-500"></div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-lg text-purple-800">Meal Variety</h4>
                        </div>
                        <p className="text-gray-700 mb-4 font-medium">Create balanced meal plans with nutritional analysis for healthy development.</p>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="p-2 bg-purple-50 rounded-lg text-center">
                            <div className="text-xs text-purple-700 mb-1 font-medium">Proteins</div>
                            <div className="text-lg font-bold text-purple-800">28%</div>
                          </div>
                          <div className="p-2 bg-blue-50 rounded-lg text-center">
                            <div className="text-xs text-blue-700 mb-1 font-medium">Carbs</div>
                            <div className="text-lg font-bold text-blue-800">45%</div>
                          </div>
                          <div className="p-2 bg-green-50 rounded-lg text-center">
                            <div className="text-xs text-green-700 mb-1 font-medium">Fats</div>
                            <div className="text-lg font-bold text-green-800">27%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stage 4 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:order-2 md:text-left md:pl-12 animate-fade-in-right" style={{ animationDuration: '0.8s', animationDelay: '0.6s' }}>
                    <div className="bg-orange-100 inline-block px-4 py-1 rounded-full text-orange-800 font-semibold text-sm mb-3">12+ months</div>
                    <h3 className="text-2xl font-bold mb-3 text-orange-800">Family Meals Transition</h3>
                    <p className="text-gray-700 mb-4 font-medium">
                      Monitor your toddler's transition to family foods with detailed nutrition tracking and meal planning for continued healthy development.
                    </p>
                    <div className="flex gap-2">
                      <span className="inline-block px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-medium">Family Recipes</span>
                      <span className="inline-block px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-medium">Growth Tracking</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 relative md:order-1 md:pr-12 animate-fade-in-left" style={{ animationDuration: '0.8s', animationDelay: '0.6s' }}>
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-orange-500 border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="p-1 bg-orange-500"></div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-lg text-orange-800">Food Preferences</h4>
                        </div>
                        <p className="text-gray-700 mb-4 font-medium">Track favorites and dislikes as your toddler develops their own food preferences.</p>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-1 text-xs font-bold">+</div>
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-1 text-xs font-bold">+</div>
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-1 text-xs font-bold">+</div>
                          </div>
                          <span className="text-sm text-gray-700 font-medium">27 foods tried this month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Parents Love Our App</h2>
              <p className="max-w-2xl mx-auto text-xl text-blue-100">
                Join thousands of parents who trust Baby Food Tracker for their little ones.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700 mr-4">JM</div>
                  <div>
                    <h4 className="font-bold">Jessica M.</h4>
                    <p className="text-gray-600 text-sm">Mother of 2</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"This app has been a lifesaver for tracking my twins' feeding schedules. The nutrition insights helped me introduce solids with confidence!"</p>
                <div className="flex text-yellow-500 mt-3">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              
              <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center font-bold text-green-700 mr-4">RK</div>
                  <div>
                    <h4 className="font-bold">Robert K.</h4>
                    <p className="text-gray-600 text-sm">Father of 1</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"As a new dad, I was overwhelmed until I found this app. Now I can track everything and share updates with my partner in real-time. Game changer!"</p>
                <div className="flex text-yellow-500 mt-3">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              
              <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center font-bold text-purple-700 mr-4">AT</div>
                  <div>
                    <h4 className="font-bold">Aisha T.</h4>
                    <p className="text-gray-600 text-sm">Mother of 3</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The nutrition tracking features are incredible. I can see exactly what my baby is eating and make sure she's getting all the nutrients she needs."</p>
                <div className="flex text-yellow-500 mt-3">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-12 md:p-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ready to Start Tracking?</h2>
                  <p className="text-xl mb-8 text-gray-600">
                    Join thousands of parents who trust Baby Food Tracker for their little ones' nutrition journey.
                  </p>
                  <Link
                    href="/register"
                    className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 shadow-lg transform hover:-translate-y-1"
                  >
                    Create Free Account
                  </Link>
                </div>
                <div className="relative h-80 md:h-full bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                      <defs>
                        <pattern id="polka-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle fill="#fff" cx="5" cy="5" r="3"></circle>
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"></rect>
                    </svg>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-60 md:h-60 bg-white rounded-full flex items-center justify-center">
                    <div className="text-blue-600 text-6xl md:text-7xl font-extrabold">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Baby Food Tracker</h3>
                <p className="mb-4">The complete solution for tracking your baby's nutrition and activities.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <span className="sr-only">X (Twitter)</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Testimonials</a></li>
                  <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Nutrition Guide</a></li>
                  <li><a href="#" className="hover:text-white transition">Development Milestones</a></li>
                  <li><a href="#" className="hover:text-white transition">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} Baby Food Tracker. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

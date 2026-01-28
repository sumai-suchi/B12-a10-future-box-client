import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../context/AnimationProvider';
import LoadingSkeleton from '../Components/LoadingSkeleton';

const LoadingPreview = () => {
  const { config } = useAnimation();
  const [activeDemo, setActiveDemo] = useState('skeletons');
  
  // State for various loading demos
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);
  const [topBarProgress, setTopBarProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');

  const demoSections = [
    { id: 'skeletons', title: 'Loading Skeletons', icon: '⏳' },
    { id: 'buttons', title: 'Loading Buttons', icon: '🔘' },
    { id: 'forms', title: 'Form States', icon: '📝' },
    { id: 'images', title: 'Image Loading', icon: '🖼️' },
    { id: 'pages', title: 'Page Transitions', icon: '📄' },
    { id: 'feedback', title: 'User Feedback', icon: '💬' }
  ];

  const handleButtonDemo = () => {
    setIsButtonLoading(true);
    setTimeout(() => {
      setIsButtonLoading(false);
    }, 3000);
  };

  const handleFormDemo = () => {
    setIsFormLoading(true);
    setTimeout(() => {
      setIsFormLoading(false);
    }, 2000);
  };

  const handlePageDemo = () => {
    setIsPageLoading(true);
    setTimeout(() => setIsPageLoading(false), 2000);
  };

  const handleTopBarDemo = () => {
    setShowTopBar(true);
    setTopBarProgress(0);
    const interval = setInterval(() => {
      setTopBarProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowTopBar(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleToastDemo = (type) => {
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderSkeletonDemo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Loading Skeletons</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Card Skeleton</h4>
          <LoadingSkeleton variant="card" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Text Skeleton</h4>
          <LoadingSkeleton variant="text" count={4} />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Button Skeleton</h4>
          <LoadingSkeleton variant="button" />
        </div>
      </div>
    </div>
  );

  const renderButtonDemo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Loading Buttons</h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleButtonDemo}
          disabled={isButtonLoading}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isButtonLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isButtonLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Loading...
            </div>
          ) : (
            'Click to Load'
          )}
        </button>
        
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Normal Button
        </button>
        
        <button disabled className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed">
          Disabled Button
        </button>
      </div>
    </div>
  );

  const renderFormDemo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Form Loading States</h3>
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
              disabled={isFormLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
              disabled={isFormLoading}
            />
          </div>
          <button
            type="button"
            onClick={handleFormDemo}
            disabled={isFormLoading}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              isFormLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isFormLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              'Submit Form'
            )}
          </button>
        </form>
        
        {/* Form Loading Overlay */}
        {isFormLoading && (
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center z-50 rounded-lg">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Processing...</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Please wait...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderImageDemo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Image Loading</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Loading Image</h4>
          <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">Loading...</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Loaded Image</h4>
          <img
            src="https://picsum.photos/400/300?random=1"
            alt="Example"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );

  const renderPageDemo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Page Transitions</h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handlePageDemo}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Full Page Loader
        </button>
        <button
          onClick={handleTopBarDemo}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Top Loading Bar
        </button>
      </div>
      
      {/* Loading Variants */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center h-16">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Spinner</p>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center h-16 space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Dots</p>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center h-16 space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-8 bg-indigo-600 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Bars</p>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center h-16">
            <div className="w-12 h-12 bg-indigo-600 rounded-full animate-ping"></div>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Pulse</p>
        </div>
      </div>
    </div>
  );

  const renderFeedbackDemo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">User Feedback</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Toast Notifications</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleToastDemo('success')}
              className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              Success Toast
            </button>
            <button
              onClick={() => handleToastDemo('error')}
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              Error Toast
            </button>
            <button
              onClick={() => handleToastDemo('warning')}
              className="px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm"
            >
              Warning Toast
            </button>
            <button
              onClick={() => handleToastDemo('info')}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Info Toast
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Interactive Feedback</h4>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105 active:scale-95">
              Hover & Click Me
            </button>
            
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 hover:shadow-lg">
              Shadow Effect
            </button>
            
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all duration-200 animate-pulse">
              Pulse Animation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveDemo = () => {
    switch (activeDemo) {
      case 'skeletons': return renderSkeletonDemo();
      case 'buttons': return renderButtonDemo();
      case 'forms': return renderFormDemo();
      case 'images': return renderImageDemo();
      case 'pages': return renderPageDemo();
      case 'feedback': return renderFeedbackDemo();
      default: return renderSkeletonDemo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Loading Components Preview
              </h1>
              <div className="ml-4 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">
                {config.reducedMotion ? 'Reduced Motion' : 'Full Animations'}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Task 10: Loading States & Feedback Systems
            </div>
          </div>
        </div>
      </div>

      {/* Top Loading Bar */}
      {showTopBar && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 z-50">
          <div 
            className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-200 ease-out"
            style={{ width: `${topBarProgress}%` }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Demo Sections
              </h2>
              <nav className="space-y-2">
                {demoSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveDemo(section.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                      activeDemo === section.id
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-3 text-lg">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {renderActiveDemo()}
            </div>
          </div>
        </div>
      </div>

      {/* Page Loading Overlay */}
      {isPageLoading && (
        <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Loading page content...</p>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-4 py-3 rounded-lg shadow-lg text-white ${
            toastType === 'success' ? 'bg-green-500' :
            toastType === 'error' ? 'bg-red-500' :
            toastType === 'warning' ? 'bg-yellow-500' :
            'bg-blue-500'
          }`}>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {toastType === 'success' && '✓'}
                {toastType === 'error' && '✕'}
                {toastType === 'warning' && '⚠'}
                {toastType === 'info' && 'ℹ'}
              </div>
              <p className="font-medium">This is a {toastType} notification!</p>
              <button
                onClick={() => setShowToast(false)}
                className="flex-shrink-0 text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingPreview;
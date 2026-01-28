import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Animation Context
const AnimationContext = createContext();

// Animation Provider Component
export const AnimationProvider = ({ children, config = {} }) => {
  const [animationConfig, setAnimationConfig] = useState({
    reducedMotion: false,
    performanceMode: 'high',
    theme: 'light',
    ...config
  });
  
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    animationCount: 0,
    memoryUsage: 0,
    renderTime: 0,
    lastOptimization: new Date()
  });
  
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize animation system
  useEffect(() => {
    const initializeAnimations = async () => {
      try {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Update config based on user preferences
        setAnimationConfig(prev => ({
          ...prev,
          reducedMotion: prefersReducedMotion
        }));
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize animation system:', error);
        setIsInitialized(true); // Still mark as initialized to prevent blocking
      }
    };

    initializeAnimations();
  }, []);

  // Handle reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      setAnimationConfig(prev => ({
        ...prev,
        reducedMotion: e.matches
      }));
      
      // Update document class for CSS
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Initial check
    handleChange(mediaQuery);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Animation control functions
  const updateConfig = useCallback((newConfig) => {
    setAnimationConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const getDuration = useCallback((duration) => {
    return animationConfig.reducedMotion ? 10 : duration;
  }, [animationConfig.reducedMotion]);

  const createStaggerDelay = useCallback((index, baseDelay = 100) => {
    return animationConfig.reducedMotion ? '0ms' : `${index * baseDelay}ms`;
  }, [animationConfig.reducedMotion]);

  // Context value
  const contextValue = {
    // Configuration
    config: animationConfig,
    updateConfig,
    isInitialized,
    
    // Performance metrics
    performanceMetrics,
    
    // Utility functions
    getDuration,
    createStaggerDelay,
    
    // Constants
    constants: {
      GLOBAL_DURATION: 300,
      GLOBAL_EASING: 'ease-out',
      REDUCED_MOTION_DURATION: 10,
      FPS_TARGET: 60,
      PERFORMANCE_THRESHOLD: 30
    },
    
    // Viewport information
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 768,
      isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      isDesktop: window.innerWidth >= 1024,
    },
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook to use animation context
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  
  return context;
};

export default AnimationProvider;
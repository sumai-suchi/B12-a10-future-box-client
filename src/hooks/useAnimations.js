import { useState, useEffect, useRef, useCallback } from 'react';
import { useAnimation } from '../context/AnimationProvider';

// Hook for hover animations
export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return [elementRef, isHovered];
};

// Hook for element animations on mount
export const useElementAnimation = (animationClass = 'animate-fade-up') => {
  const elementRef = useRef(null);
  const { config } = useAnimation();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || config.reducedMotion) return;

    // Add animation class
    element.classList.add(animationClass);

    // Remove animation class after animation completes
    const handleAnimationEnd = () => {
      element.classList.remove(animationClass);
    };

    element.addEventListener('animationend', handleAnimationEnd);

    return () => {
      element.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [animationClass, config.reducedMotion]);

  return elementRef;
};

// Hook for scroll progress tracking
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(Math.min(progress * 100, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

// Hook for intersection observer animations
export const useIntersectionAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
      }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [options]);

  return [elementRef, isVisible];
};

// Hook for staggered animations
export const useStaggeredAnimation = (itemCount, delay = 100) => {
  const { config } = useAnimation();
  
  return Array.from({ length: itemCount }, (_, index) => ({
    animationDelay: config.reducedMotion ? '0ms' : `${index * delay}ms`
  }));
};

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId;

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();

      if (currentTime >= lastTime.current + 1000) {
        const currentFps = Math.round(
          (frameCount.current * 1000) / (currentTime - lastTime.current)
        );
        setFps(currentFps);
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return fps;
};

// Hook for touch device detection
export const useTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  return isTouchDevice;
};

// Hook for viewport size tracking
export const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewportSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewportSize;
};

export default {
  useHoverAnimation,
  useElementAnimation,
  useScrollProgress,
  useIntersectionAnimation,
  useStaggeredAnimation,
  usePerformanceMonitor,
  useTouchDevice,
  useViewportSize
};
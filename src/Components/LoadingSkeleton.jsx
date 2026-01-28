import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";

const LoadingSkeleton = ({ 
  variant = 'card', 
  count = 1, 
  className = '',
  width = 'w-full',
  height = 'h-4'
}) => {
  const { config } = useAnimation();

  // Animation variants for skeleton pulse
  const skeletonVariants = {
    pulse: {
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: config.reducedMotion ? 0.01 : 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Shimmer animation variants
  const shimmerVariants = {
    shimmer: {
      x: ['-100%', '100%'],
      transition: {
        duration: config.reducedMotion ? 0.01 : 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Skeleton component variants based on type
  const renderSkeleton = (index) => {
    const baseClasses = `bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`;
    
    switch (variant) {
      case 'card':
        return (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-5 space-y-4"
            variants={skeletonVariants}
            animate="pulse"
          >
            {/* Image skeleton */}
            <div className="relative w-full h-44 bg-gray-300 dark:bg-gray-700 rounded-xl overflow-hidden">
              {!config.reducedMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              )}
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-3">
              {/* Title */}
              <div className="relative h-6 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden">
                {!config.reducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    variants={shimmerVariants}
                    animate="shimmer"
                    transition={{ delay: 0.2 }}
                  />
                )}
              </div>
              
              {/* Description lines */}
              <div className="space-y-2">
                <div className="relative h-4 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden">
                  {!config.reducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      variants={shimmerVariants}
                      animate="shimmer"
                      transition={{ delay: 0.4 }}
                    />
                  )}
                </div>
                <div className="relative h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 overflow-hidden">
                  {!config.reducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      variants={shimmerVariants}
                      animate="shimmer"
                      transition={{ delay: 0.6 }}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'text':
        return (
          <motion.div
            key={index}
            className={`relative ${height} ${width} ${baseClasses} overflow-hidden`}
            variants={skeletonVariants}
            animate="pulse"
          >
            {!config.reducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                variants={shimmerVariants}
                animate="shimmer"
              />
            )}
          </motion.div>
        );

      case 'button':
        return (
          <motion.div
            key={index}
            className={`relative ${width} ${height || 'h-10'} ${baseClasses} overflow-hidden`}
            variants={skeletonVariants}
            animate="pulse"
          >
            {!config.reducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                variants={shimmerVariants}
                animate="shimmer"
              />
            )}
          </motion.div>
        );

      default:
        return (
          <motion.div
            key={index}
            className={`relative ${height} ${width} ${baseClasses} overflow-hidden`}
            variants={skeletonVariants}
            animate="pulse"
          >
            {!config.reducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                variants={shimmerVariants}
                animate="shimmer"
              />
            )}
          </motion.div>
        );
    }
  };

  // Render multiple skeletons if count > 1
  if (count > 1) {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
      </div>
    );
  }

  return renderSkeleton(0);
};

export default LoadingSkeleton;
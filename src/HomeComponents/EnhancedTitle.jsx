import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";
import { SparklesIcon } from "@heroicons/react/24/outline";

const EnhancedTitle = ({ title, subtitle, badge }) => {
  const { config } = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.reducedMotion ? 0 : 0.2,
        delayChildren: config.reducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: config.reducedMotion ? 0.1 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className="text-center py-16 px-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/40 dark:via-teal-900/30 dark:to-cyan-900/40 rounded-full border border-emerald-200/60 dark:border-emerald-700/60 shadow-lg backdrop-blur-sm mb-6"
          variants={itemVariants}
          whileHover={config.reducedMotion ? {} : { scale: 1.05, y: -2 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: config.reducedMotion ? 0 : 20, repeat: Infinity, ease: "linear" }}
          >
            <SparklesIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
          </motion.div>
          <span className="text-base font-semibold text-emerald-700 dark:text-emerald-300">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
        variants={itemVariants}
      >
        <motion.span 
          className="bg-gradient-to-r from-slate-800 via-emerald-600 to-teal-600 dark:from-slate-100 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: config.reducedMotion ? 0 : 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {title}
        </motion.span>
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative Elements */}
      <motion.div
        className="flex justify-center items-center space-x-2 mt-8"
        variants={itemVariants}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: config.reducedMotion ? 0 : 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EnhancedTitle;
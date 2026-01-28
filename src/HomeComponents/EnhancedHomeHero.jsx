import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { NavLink } from "react-router";
import { useAnimation } from "../context/AnimationProvider";
import {
  PlayCircleIcon,
  UserGroupIcon,
  StarIcon,
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon,
  TrophyIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  FireIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import heroImg from "../assets/close-up-hand-writing-notebook-top-view.jpg";
import girlImg from "../assets/student-with-book-pen-library (1).png";

const EnhancedHomeHero = () => {
  const { config } = useAnimation();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  // Smooth mouse tracking
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.2]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX / innerWidth - 0.5) * 20);
      mouseY.set((clientY / innerHeight - 0.5) * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Visibility effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.reducedMotion ? 0 : 0.15,
        delayChildren: config.reducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: config.reducedMotion ? 0.1 : 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      rotate: [-2, 2, -2],
      transition: {
        duration: config.reducedMotion ? 0 : 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };



  const stats = [
    { icon: UserGroupIcon, value: "50K+", label: "Happy Learners", color: "from-emerald-400 to-teal-500" },
    { icon: BookOpenIcon, value: "1000+", label: "Expert Courses", color: "from-blue-400 to-cyan-500" },
    { icon: TrophyIcon, value: "95%", label: "Success Rate", color: "from-amber-400 to-orange-500" },
    { icon: StarIcon, value: "4.9", label: "Average Rating", color: "from-purple-400 to-pink-500" }
  ];

  const features = [
    { icon: RocketLaunchIcon, text: "Launch Your Career", color: "from-rose-400 to-pink-500" },
    { icon: LightBulbIcon, text: "Innovative Learning", color: "from-yellow-400 to-amber-500" },
    { icon: FireIcon, text: "Trending Skills", color: "from-orange-400 to-red-500" },
    { icon: HeartIcon, text: "Loved by Students", color: "from-pink-400 to-rose-500" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 pt-20">
      {/* Dynamic Background with Multiple Layers */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: y1,
          opacity,
          scale
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-indigo-50/80 to-purple-100/90 dark:from-slate-900/95 dark:via-indigo-900/90 dark:to-purple-900/95" />
      
      {/* Interactive Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-300/30 to-teal-400/30 rounded-full blur-2xl"
          style={{ x: mouseX, y: mouseY }}
        />
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-violet-300/30 to-purple-400/30 rounded-full blur-3xl"
          style={{ x: mouseX * -0.5, y: mouseY * -0.5 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-rose-300/30 to-pink-400/30 rounded-full blur-xl"
          style={{ x: mouseX * 0.3, y: mouseY * 0.3 }}
        />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${
              i % 4 === 0 ? 'from-emerald-400 to-teal-500' :
              i % 4 === 1 ? 'from-violet-400 to-purple-500' :
              i % 4 === 2 ? 'from-rose-400 to-pink-500' :
              'from-amber-400 to-orange-500'
            } rounded-full opacity-60`}
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: config.reducedMotion ? 0 : 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-10">
              {/* Animated Badge */}
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/40 dark:via-teal-900/30 dark:to-cyan-900/40 rounded-full border border-emerald-200/60 dark:border-emerald-700/60 shadow-lg backdrop-blur-sm"
                whileHover={config.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                animate={{
                  boxShadow: [
                    "0 4px 20px rgba(16, 185, 129, 0.1)",
                    "0 8px 30px rgba(16, 185, 129, 0.2)",
                    "0 4px 20px rgba(16, 185, 129, 0.1)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: config.reducedMotion ? 0 : 8, repeat: Infinity, ease: "linear" }}
                >
                  <SparklesIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                </motion.div>
                <span className="text-base font-semibold text-emerald-700 dark:text-emerald-300">
                  🚀 #1 Learning Platform
                </span>
              </motion.div>

              {/* Dynamic Main Heading */}
              <div className="space-y-6">
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
                  variants={itemVariants}
                >
                  <motion.span 
                    className="block bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: config.reducedMotion ? 0 : 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Transform
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: config.reducedMotion ? 0 : 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    Your Future
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: config.reducedMotion ? 0 : 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    Today
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-medium"
                  variants={itemVariants}
                >
                  Unlock your potential with 
                  <motion.span 
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {" "}world-class courses
                  </motion.span>, 
                  expert mentorship, and a community of ambitious learners ready to change the world.
                </motion.p>
              </div>

              {/* Feature Pills */}
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={itemVariants}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${feature.color} text-white rounded-full text-sm font-semibold shadow-lg`}
                    whileHover={config.reducedMotion ? {} : { scale: 1.1, y: -2 }}
                  >
                    <feature.icon className="w-4 h-4 mr-2" />
                    {feature.text}
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={config.reducedMotion ? {} : { scale: 1.05, y: -3 }}
                  whileTap={config.reducedMotion ? {} : { scale: 0.95 }}
                >
                  <NavLink
                    to="/allCourses"
                    className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="relative flex items-center">
                      <RocketLaunchIcon className="w-6 h-6 mr-3" />
                      Start Your Journey
                      <motion.div
                        className="ml-3"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRightIcon className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </NavLink>
                </motion.div>
                
                <motion.button
                  className="group inline-flex items-center px-10 py-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl text-slate-700 dark:text-slate-300 font-bold text-lg rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-500 shadow-xl"
                  whileHover={config.reducedMotion ? {} : { scale: 1.05, y: -3 }}
                  whileTap={config.reducedMotion ? {} : { scale: 0.95 }}
                >
                  <PlayCircleIcon className="w-6 h-6 mr-3 text-emerald-600" />
                  Watch Demo
                  <motion.div
                    className="ml-3 w-2 h-2 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.button>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
                variants={itemVariants}
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="text-center group"
                    whileHover={config.reducedMotion ? {} : { y: -8, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-3xl mb-4 shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced Hero Image */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.div
                className="relative z-10"
                style={{ y: y2 }}
                variants={floatingVariants}
                animate="animate"
              >
                <div className="relative">
                  {/* Main Image with Enhanced Effects */}
                  <motion.div
                    className="relative"
                    whileHover={config.reducedMotion ? {} : { scale: 1.02, rotate: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.img
                      src={girlImg}
                      alt="Student learning"
                      className="w-full max-w-lg mx-auto drop-shadow-2xl relative z-10"
                      animate={{
                        filter: [
                          "drop-shadow(0 25px 50px rgba(0,0,0,0.15))",
                          "drop-shadow(0 35px 60px rgba(0,0,0,0.2))",
                          "drop-shadow(0 25px 50px rgba(0,0,0,0.15))"
                        ]
                      }}
                      transition={{
                        duration: config.reducedMotion ? 0 : 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Glowing Ring Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: config.reducedMotion ? 0 : 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  
                  {/* Enhanced Floating Cards */}
                  <motion.div
                    className="absolute -top-12 -left-12 bg-gradient-to-br from-white/95 to-emerald-50/95 dark:from-slate-800/95 dark:to-emerald-900/30 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-slate-700/30"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: config.reducedMotion ? 0 : 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={config.reducedMotion ? {} : { scale: 1.1, y: -5 }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <BookOpenIcon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          Course Progress
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                          JavaScript Mastery
                        </div>
                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 2, delay: 1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-8 -right-12 bg-gradient-to-br from-white/95 to-violet-50/95 dark:from-slate-800/95 dark:to-violet-900/30 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-slate-700/30"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: config.reducedMotion ? 0 : 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    whileHover={config.reducedMotion ? {} : { scale: 1.1, y: -5 }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <TrophyIcon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          Achievement
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Certificate Earned! 🎉
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, 0]
                              }}
                              transition={{ 
                                duration: 0.5, 
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 3
                              }}
                            >
                              <StarIcon className="w-4 h-4 text-amber-400 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* New Floating Elements */}
                  <motion.div
                    className="absolute top-1/2 -right-8 bg-gradient-to-br from-white/95 to-rose-50/95 dark:from-slate-800/95 dark:to-rose-900/30 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-white/30 dark:border-slate-700/30"
                    animate={{
                      x: [0, 10, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: config.reducedMotion ? 0 : 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                        <HeartIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          +50 XP
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Streak Bonus!
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Background Decoration */}
              <div className="absolute inset-0 -z-10">
                <motion.div 
                  className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-emerald-200/40 to-teal-300/40 dark:from-emerald-800/30 dark:to-teal-900/30 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: config.reducedMotion ? 0 : 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-violet-200/40 to-purple-300/40 dark:from-violet-800/30 dark:to-purple-900/30 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: config.reducedMotion ? 0 : 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 15, 0]
        }}
        transition={{
          duration: config.reducedMotion ? 0 : 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="w-8 h-12 border-3 border-slate-300 dark:border-slate-600 rounded-full flex justify-center relative overflow-hidden backdrop-blur-sm bg-white/20 dark:bg-slate-800/20"
          whileHover={config.reducedMotion ? {} : { scale: 1.1 }}
        >
          <motion.div
            className="w-2 h-4 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full mt-2"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: config.reducedMotion ? 0 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <motion.p 
          className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EnhancedHomeHero;
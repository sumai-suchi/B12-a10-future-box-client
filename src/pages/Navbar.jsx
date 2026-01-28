import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router";
import { useAnimation } from "../context/AnimationProvider";
import { SiGreatlearning } from "react-icons/si";
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { SignOut, user } = useContext(AuthContext);
  const { config } = useAnimation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    SignOut()
      .then(() => {
        console.log("user Sign out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/allCourses", label: "Courses", icon: "📚" },
    { to: "/enhanced-dashboard", label: "Dashboard", icon: "📊" }
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: config.reducedMotion ? 0.1 : 0.8,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: config.reducedMotion ? 0.1 : 0.5,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: config.reducedMotion ? 0.1 : 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: config.reducedMotion ? 0.1 : 0.2
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-slate-200/50 dark:border-slate-700/50'
            : 'bg-gradient-to-r from-white/10 via-indigo-50/20 to-purple-100/30 dark:from-slate-900/20 dark:via-indigo-900/30 dark:to-purple-900/40 backdrop-blur-sm'
        }`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={config.reducedMotion ? {} : { scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <SiGreatlearning className="text-white text-xl" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-teal-500/30 to-cyan-600/30 rounded-2xl blur-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: config.reducedMotion ? 0 : 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-2xl font-black bg-gradient-to-r from-slate-800 via-emerald-600 to-teal-600 dark:from-slate-100 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: config.reducedMotion ? 0 : 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Future-Box
                </motion.h1>
                <motion.div
                  className="flex items-center space-x-1"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <SparklesIcon className="w-3 h-3 text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Learn & Grow
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/40 dark:via-teal-900/30 dark:to-cyan-900/40 text-emerald-700 dark:text-emerald-300 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50'
                          : isScrolled
                          ? 'text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50 dark:hover:from-slate-800/50 dark:hover:to-indigo-900/30'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-800/30 backdrop-blur-sm'
                      }`
                    }
                  >
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={config.reducedMotion ? {} : { y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-sm">{link.icon}</span>
                      <span>{link.label}</span>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={config.reducedMotion ? {} : { scale: 1.05 }}
                    />
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-800/50 dark:to-indigo-900/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm"
                    whileHover={config.reducedMotion ? {} : { scale: 1.02 }}
                  >
                    <div className="relative">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/32"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full ring-2 ring-emerald-400/50 shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-800"></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Welcome back! 👋
                      </p>
                    </div>
                  </motion.div>
                  <motion.button
                    onClick={handleSignOut}
                    className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    whileHover={config.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={config.reducedMotion ? {} : { scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="relative flex items-center space-x-2">
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Sign Out</span>
                    </div>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={config.reducedMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={config.reducedMotion ? {} : { scale: 0.95 }}
                >
                  <NavLink
                    to="/auth/login"
                    className="group inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="relative flex items-center space-x-2">
                      <UserCircleIcon className="w-5 h-5" />
                      <span>Login</span>
                    </div>
                  </NavLink>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-2xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300"
                whileHover={config.reducedMotion ? {} : { scale: 1.05 }}
                whileTap={config.reducedMotion ? {} : { scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Bars3Icon className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              className="absolute top-24 left-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 p-6"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/40 dark:via-teal-900/30 dark:to-cyan-900/40 text-emerald-700 dark:text-emerald-300 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50 dark:hover:from-slate-700/50 dark:hover:to-indigo-900/30'
                        }`
                      }
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.label}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

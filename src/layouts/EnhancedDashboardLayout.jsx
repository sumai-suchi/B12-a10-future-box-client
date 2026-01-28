import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Outlet, useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import { useAnimation } from "../context/AnimationProvider";
import ThemeToggle from "../Components/ThemeToggle";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";

const EnhancedDashboardLayout = () => {
  const { user, role, SignOut } = useContext(AuthContext);
  const { config } = useAnimation();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Navigation items based on role
  const getNavigationItems = () => {
    const baseRoute = '/enhanced-dashboard';
    const commonItems = [
      { 
        name: 'Dashboard', 
        href: `${baseRoute}/${role}/overview`, 
        icon: HomeIcon,
        description: 'Overview and analytics'
      }
    ];

    if (role === 'admin') {
      return [
        ...commonItems,
        { 
          name: 'Courses', 
          href: `${baseRoute}/admin/courses`, 
          icon: BookOpenIcon,
          description: 'Manage all courses'
        },
        { 
          name: 'Students', 
          href: `${baseRoute}/admin/students`, 
          icon: UserGroupIcon,
          description: 'Student management'
        },
        { 
          name: 'Analytics', 
          href: `${baseRoute}/admin/analytics`, 
          icon: ChartBarIcon,
          description: 'Performance metrics'
        },
        { 
          name: 'Add Course', 
          href: `${baseRoute}/admin/add-course`, 
          icon: PlusIcon,
          description: 'Create new course'
        },
        { 
          name: 'Settings', 
          href: `${baseRoute}/admin/settings`, 
          icon: CogIcon,
          description: 'System configuration'
        }
      ];
    } else {
      return [
        ...commonItems,
        { 
          name: 'My Courses', 
          href: `${baseRoute}/student/courses`, 
          icon: BookOpenIcon,
          description: 'Enrolled courses'
        },
        { 
          name: 'Progress', 
          href: `${baseRoute}/student/progress`, 
          icon: ChartBarIcon,
          description: 'Learning progress'
        },
        { 
          name: 'Profile', 
          href: `${baseRoute}/student/profile`, 
          icon: UserGroupIcon,
          description: 'Account settings'
        }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  // Sidebar animation variants (only for mobile)
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  const handleSignOut = async () => {
    try {
      await SignOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <Helmet>
        <title>Future-Box | Enhanced Dashboard</title>
      </Helmet>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 dark:border-slate-700/50">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-900/30">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">FB</span>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Future-Box
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {role} Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-rose-50 via-pink-50 to-fuchsia-50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-purple-900/20">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full ring-2 ring-white/50 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: config.reducedMotion ? 0.1 : 0.3 }}
                >
                  <NavLink
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 shadow-md'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50 dark:hover:from-slate-700/50 dark:hover:to-indigo-900/20 hover:text-slate-800 dark:hover:text-slate-100'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 transition-colors duration-300 ${
                        isActive
                          ? 'text-emerald-500 dark:text-emerald-400'
                          : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-sm"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-orange-900/10">
            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                className="flex items-center px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200"
              >
                <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-2" />
                Back to Home
              </NavLink>
              <button
                onClick={handleSignOut}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200"
                title="Sign Out"
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 dark:border-slate-700/50 lg:hidden"
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-900/30">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">FB</span>
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Future-Box
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                {role} Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition-all duration-200"
          >
            <XMarkIcon className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-rose-50 via-pink-50 to-fuchsia-50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-purple-900/20">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full ring-2 ring-white/50 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                {user?.displayName || 'User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: config.reducedMotion ? 0.1 : 0.3 }}
              >
                <NavLink
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50 dark:hover:from-slate-700/50 dark:hover:to-indigo-900/20 hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors duration-300 ${
                      isActive
                        ? 'text-emerald-500 dark:text-emerald-400'
                        : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-sm"
                      layoutId="activeIndicatorMobile"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Mobile Sidebar Footer */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-orange-900/10">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200"
            >
              <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-2" />
              Back to Home
            </NavLink>
            <button
              onClick={handleSignOut}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200"
              title="Sign Out"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition-all duration-200"
              >
                <Bars3Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </button>
              
              <div className="hidden lg:block ml-4">
                <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {navigationItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                </h1>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-slate-50/70 dark:bg-slate-700/70 border border-slate-200/50 dark:border-slate-600/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 dark:focus:border-emerald-600 transition-all duration-200 backdrop-blur-sm"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition-all duration-200">
                <BellIcon className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Profile Menu */}
              <div className="flex items-center">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/32"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-white/50 shadow-md"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-indigo-900/50 p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: config.reducedMotion ? 0.1 : 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedDashboardLayout;
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import { useAnimation } from "../context/AnimationProvider";
import Sidebar from "../DashboardComponents/Sidebar"; // Path pointing to the Sidebar component above
import {
  Bars3Icon,
  HomeIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const EnhancedDashboardLayout = () => {
  const { user, role, SignOut } = useContext(AuthContext);
  const { config } = useAnimation();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Close sidebar on route change (mobile adaptive wrapper)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Navigation schema logic parsing based on active context configurations
  const getNavigationItems = () => {
    const baseRoute = "/enhanced-dashboard";
    const commonItems = [
      {
        name: "Dashboard",
        href: `${baseRoute}/${role}/overview`,
        icon: HomeIcon,
        description: "Overview and analytics",
      },
    ];

    if (role === "admin") {
      return [
        ...commonItems,
        {
          name: "Courses",
          href: `enhanced-dashboard/admin/courses`,
          icon: BookOpenIcon,
          description: "Manage all courses",
        },
        {
          name: "Students",
          href: `${baseRoute}/admin/students`,
          icon: UserGroupIcon,
          description: "Student management",
        },
        {
          name: "Analytics",
          href: `${baseRoute}/admin/analytics`,
          icon: ChartBarIcon,
          description: "Performance metrics",
        },
        {
          name: "Add Course",
          href: `${baseRoute}/admin/add-course`,
          icon: PlusIcon,
          description: "Create new course",
        },
        {
          name: "Settings",
          href: `${baseRoute}/admin/settings`,
          icon: CogIcon,
          description: "System configuration",
        },
      ];
    } else {
      return [
        ...commonItems,
        {
          name: "My Courses",
          href: `${baseRoute}/student/courses`,
          icon: BookOpenIcon,
          description: "Enrolled courses",
        },
        {
          name: "Ai Mentor",
          href: `${baseRoute}/student/progress`,
          icon: ChartBarIcon,
          description: "Learn with AI mentor",
        },
        {
          name: "Profile",
          href: `${baseRoute}/student/profile`,
          icon: UserGroupIcon,
          description: "Account settings",
        },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const handleSignOut = async () => {
    try {
      await SignOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <Helmet>
        <title>Future-Box | Enhanced Dashboard</title>
      </Helmet>

      {/* Mobile Drawer Backdrop Wrapper */}
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

      {/* Reusable Sidebar Component Instance */}
      <Sidebar
        user={user}
        role={role}
        navigationItems={navigationItems}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        config={config}
        handleSignOut={handleSignOut}
        sidebarVariants={sidebarVariants}
      />

      {/* Main Container Content Segment */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Top Header Navigation Bar */}
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-700/50 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Left side panel triggers */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition-all duration-200"
              >
                <Bars3Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </button>

              <div className="hidden lg:block ml-4">
                <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {navigationItems.find((item) => item.href === location.pathname)?.name || "Dashboard"}
                </h1>
              </div>
            </div>

            {/* Right side functional tools */}
            <div className="flex items-center gap-4">
              {/* Context Search Filter */}
              <div className="hidden md:block relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-slate-50/70 dark:bg-slate-700/70 border border-slate-200/50 dark:border-slate-600/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 dark:focus:border-emerald-600 transition-all duration-200 backdrop-blur-sm"
                />
              </div>

              {/* Notification Badge Triggers */}
              <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition-all duration-200">
                <BellIcon className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Quick Profile Thumb */}
              <div className="flex items-center">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-white/50 shadow-md"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Route Display Window */}
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
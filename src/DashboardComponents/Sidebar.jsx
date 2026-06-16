import { NavLink, useLocation } from "react-router";
import { motion } from "framer-motion";
import { XMarkIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "../Components/ThemeToggle"; // Verify path aligns with your folders

const Sidebar = ({
  user,
  role,
  navigationItems,
  sidebarOpen,
  setSidebarOpen,
  config = {}, // Added fallback to prevent runtime crashes if config is undefined
  handleSignOut,
  sidebarVariants
}) => {
  const location = useLocation();

  // --- Reusable Layout Fragments ---
  const SidebarHeader = ({ showCloseButton }) => (
    <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
      <div className="flex items-center">
        <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20 dark:shadow-indigo-900/30">
          <span className="text-white font-bold text-sm tracking-wide">FB</span>
        </div>
        <div className="ml-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Future-Box
          </h2>
          <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {role}
          </p>
        </div>
      </div>
      {showCloseButton && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );

  const UserProfileSection = () => (
    <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex-shrink-0">
      <div className="flex items-center justify-between p-2 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 shadow-sm">
        <div className="flex items-center min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <img
              src={user?.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
          </div>
          <div className="ml-3 flex-1 min-w-0 pr-2">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 border-l border-slate-100 dark:border-slate-700/60 pl-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );

  const NavigationList = ({ activeLayoutId }) => (
    <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
      {navigationItems.map((item, index) => {
        const isActive = location.pathname === item.href;

        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.05,
              duration: config?.reducedMotion ? 0.1 : 0.25,
            }}
          >
            <NavLink
              to={item.href}
              className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-l-4 border-indigo-600 dark:border-indigo-500 pl-3"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200 border-l-4 border-transparent"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 transition-colors duration-200 flex-shrink-0 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className={`font-semibold ${isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                  {item.name}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate font-normal">
                  {item.description}
                </div>
              </div>
              {isActive && (
                <motion.div
                  className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full flex-shrink-0 ml-2"
                  layoutId={activeLayoutId}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </NavLink>
          </motion.div>
        );
      })}
    </nav>
  );

  const SidebarFooter = () => (
    <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 flex-shrink-0">
      <div className="flex items-center justify-between gap-2">
        <NavLink
          to="/"
          className="flex items-center px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-1"
        >
          <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-2 rotate-180" />
          Back to Home
        </NavLink>
        <button
          onClick={handleSignOut}
          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          title="Sign Out"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Panel */}
      <aside className="hidden lg:flex lg:flex-shrink-0 h-full">
        <div className="w-72 flex flex-col bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200/60 dark:border-slate-800/80">
          <SidebarHeader showCloseButton={false} />
          <UserProfileSection />
          <NavigationList activeLayoutId="activeIndicator" />
          <SidebarFooter />
        </div>
      </aside>

      {/* Mobile Drawer Panel */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-white dark:bg-slate-900 shadow-2xl border-r border-slate-200/60 dark:border-slate-800/80 lg:hidden"
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
      >
        <SidebarHeader showCloseButton={true} />
        <UserProfileSection />
        <NavigationList activeLayoutId="activeIndicatorMobile" />
        <SidebarFooter />
      </motion.aside>
    </>
  );
};

export default Sidebar;
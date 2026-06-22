import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router";
import { useAnimation } from "../context/AnimationProvider";
import { 
  BookOpenIcon, 
  CommandLineIcon, 
  Squares2X2Icon, 
  SparklesIcon, 
  ArrowRightStartOnRectangleIcon, 
  UserPlusIcon,
  Bars2Icon,
  XMarkIcon
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const { SignOut, user } = useContext(AuthContext);
  const { config } = useAnimation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    SignOut()
      .then(() => console.log("Logged out successfully"))
      .catch((error) => console.error("Logout error:", error));
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <BookOpenIcon className="w-3.5 h-3.5" /> },
    { to: "/allCourses", label: "All Courses", icon: <CommandLineIcon className="w-3.5 h-3.5" /> },
    { to: "/enhanced-dashboard", label: "Dashboard", icon: <Squares2X2Icon className="w-3.5 h-3.5" /> }
  ];

  return (
    <>
      {/* Outer Wrapper: Adjusts outer structural breathing room */}
      <div className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-500 ease-[0.16,1,0.3,1] ${
        isScrolled ? 'px-4 sm:px-6 py-4' : 'px-0 py-0'
      }`}>
        
        {/* Luxury Top Lightbar Accent (Visible only when at top) */}
        <div className={`absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent transition-opacity duration-500 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`} />

        <motion.nav
          className={`mx-auto transition-all duration-500 ease-[0.16,1,0.3,1] relative overflow-hidden backdrop-blur-xl ${
            isScrolled
              ? 'max-w-6xl rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]'
              : 'max-w-full bg-slate-950/40 border-b border-slate-900/80'
          }`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: config.reducedMotion ? 0.1 : 0.5 }}
        >
          {/* Internal Radial Glow Engine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-60 pointer-events-none" />

          {/* Dynamic Core Container Scaling */}
          <div className={`mx-auto flex items-center justify-between relative z-10 transition-all duration-500 ${
            isScrolled ? 'px-6 h-14 sm:h-16' : 'px-6 lg:px-12 h-20 sm:h-22'
          }`}>
            
            {/* Branding Core */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="h-8.5 w-8.5 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-[1px] flex items-center justify-center transform transition-all group-hover:rotate-6 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <SparklesIcon className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-[0.15em] text-white uppercase font-mono leading-none">
                  EduSphere
                </span>
                <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                  Lab Environment
                </span>
              </div>
            </NavLink>

            {/* Navigation Tracks Hub */}
            <div className={`hidden lg:flex items-center space-x-1 border rounded-xl p-1 transition-colors duration-500 ${
              isScrolled 
                ? 'bg-slate-900/40 border-slate-800/60' 
                : 'bg-slate-900/20 border-slate-900'
            }`}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-400 border border-emerald-500/10 shadow-[0_2px_10px_rgba(16,185,129,0.05)]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Account Utility Node */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* Student Capsule Display */}
                  <div className={`hidden sm:flex items-center gap-2.5 pl-2.5 pr-4 py-1.5 border rounded-xl transition-colors duration-500 ${
                    isScrolled ? 'bg-slate-900/40 border-slate-800/60' : 'bg-slate-900/20 border-slate-900'
                  }`}>
                    <div className="relative flex items-center">
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-5 h-5 rounded-md object-cover ring-1 ring-slate-800"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-1 ring-slate-950" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-300 max-w-[80px] truncate">
                      {user.displayName || 'Student'}
                    </span>
                  </div>

                  {/* Micro Logout Trigger */}
                  <button
                    onClick={handleSignOut}
                    className="p-2.5 rounded-xl bg-rose-500/5 hover:bg-rose-500 border border-rose-500/10 hover:border-rose-400 text-rose-500 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                    title="Sign Out"
                  >
                    <ArrowRightStartOnRectangleIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="inline-flex items-center gap-2 px-4.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.15)] transition-all active:scale-95"
                >
                  <UserPlusIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Join Academy</span>
                </NavLink>
              )}

              {/* Mobile Expansion Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-xl border text-slate-400 hover:text-white active:scale-95 transition-all cursor-pointer ${
                  isScrolled ? 'bg-slate-900/40 border-slate-800/60' : 'bg-slate-900/20 border-slate-900'
                }`}
              >
                {isMobileMenuOpen ? <XMarkIcon className="w-3.5 h-3.5" /> : <Bars2Icon className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>
        </motion.nav>
      </div>

      {/* Overlay Mobile Matrix Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-slate-950/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`absolute left-4 right-4 bg-slate-950 border border-slate-900 rounded-2xl p-4 shadow-2xl transition-all duration-500 ${
                isScrolled ? 'top-22' : 'top-26'
              }`}
              variants={{
                hidden: { opacity: 0, y: -10, scale: 0.99 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
                exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.15 } }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold text-xs transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                          : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
                      }`
                    }
                  >
                    <div className="p-1.5 rounded-lg bg-slate-900 text-slate-400">
                      {link.icon}
                    </div>
                    <span>{link.label}</span>
                  </NavLink>
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
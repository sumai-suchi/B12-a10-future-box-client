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
  CommandLineIcon,
  FireIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";
import girlImg from "../assets/student-with-book-pen-library (1).png";

const EnhancedHomeHero = () => {
  const { config } = useAnimation();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  // Smooth mouse tracking
  const springConfig = { damping: 30, stiffness: 600 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  
  // Advanced Parallax & Scroll Mechanics
  const yBg = useTransform(scrollY, [0, 800], [0, -120]);
  const textY = useTransform(scrollY, [0, 500], [0, 30]);
  const hubScale = useTransform(scrollY, [0, 600], [1, 0.98]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Small defensive check for touch devices to avoid unexpected jumps
      if (window.matchMedia("(pointer: coarse)").matches) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 25);
      mouseY.set((clientY / innerHeight - 0.5) * 25);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation Layout Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: config.reducedMotion ? 0 : 0.08, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: config.reducedMotion ? 0.1 : 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const stats = [
    { value: "50K+", label: "Happy Learners" },
    { value: "1000+", label: "Expert Courses" },
    { value: "95%", label: "Success Rate" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 pt-28 pb-16 lg:py-0 flex items-center selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Background Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-70 pointer-events-none" />
      
      {/* Ambient Glows */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-[-5%] left-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] rounded-full bg-indigo-500/10 blur-[80px] md:blur-[140px] pointer-events-none mix-blend-screen"
      />
      <motion.div 
        style={{ y: yBg }}
        className="absolute bottom-[5%] right-[-10%] w-[35rem] md:w-[60rem] h-[35rem] md:h-[60rem] rounded-full bg-emerald-500/10 blur-[90px] md:blur-[160px] pointer-events-none mix-blend-screen"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          
          {/* LEFT COLUMN: Narrative Typography Block */}
          <motion.div style={{ y: textY }} className="grid grid-cols-1 gap-6 md:gap-8 lg:col-span-5 text-left order-2 lg:order-1">
            
            {/* Tag Pill */}
            <motion.div variants={itemVariants} className="justify-self-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 backdrop-blur-md shadow-xl">
                <SparklesIcon className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  The Next-Gen Classroom
                </span>
              </div>
            </motion.div>

            {/* Typography Stack */}
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.15] lg:leading-[1.1]"
                variants={itemVariants}
              >
                Learn without <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  boundaries.
                </span>
              </motion.h1>

              <motion.p 
                className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed"
                variants={itemVariants}
              >
                An immersive ecosystem combining elite technical masterclasses, structured real-world workflows, and collaborative developer networks.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              variants={itemVariants}
            >
              <NavLink
                to="/allCourses"
                className="group relative inline-flex items-center justify-center px-6 py-3.5 bg-emerald-500 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:bg-emerald-400 text-center"
              >
                <span>Explore Ecosystem</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </NavLink>

              <button className="group inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 text-slate-300 hover:text-white font-medium transition-all duration-300">
                <PlayCircleIcon className="w-5 h-5 mr-2 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                See Framework
              </button>
            </motion.div>

            {/* Stats Block */}
            <motion.div 
              variants={itemVariants}
              className="pt-6 border-t border-slate-900/60 grid grid-cols-3 gap-2 sm:gap-4"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                  <div className="text-[11px] sm:text-xs font-medium text-slate-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Interactive Mockup Platform Dashboard */}
          <motion.div 
            style={{ scale: hubScale, x: mouseX, y: mouseY }}
            className="lg:col-span-7 relative w-full aspect-[4/3] max-w-xl lg:max-w-none mx-auto order-1 lg:order-2 mt-4 lg:mt-0 px-4 sm:px-0"
            variants={itemVariants}
          >
            
            {/* Main Interactive Hub Container */}
            <div className="absolute inset-0 bg-slate-900/30 rounded-2xl sm:rounded-3xl border border-slate-800/80 backdrop-blur-xl overflow-hidden p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between group">
              
              {/* Hub Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] font-mono text-slate-600 pl-1.5 hidden sm:inline">learning_matrix_v2.6.sh</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] sm:text-xs font-mono bg-slate-950/80 px-2 py-0.5 sm:py-1 rounded-md border border-slate-800/60">
                  <CommandLineIcon className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Live Sandbox Active</span>
                </div>
              </div>

              {/* Central Immersive Image Layer */}
              <div className="relative flex-1 my-4 sm:my-6 flex items-center justify-center rounded-xl bg-slate-950/70 overflow-hidden border border-slate-900/80">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-30" />
                
                <motion.img 
                  src={girlImg} 
                  alt="Student Platform Interface" 
                  className="h-full sm:h-[105%] w-full object-contain object-bottom filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent z-10" />
              </div>

              {/* Hub Bottom Panel Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-20">
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800/60 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <AcademicCapIcon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-slate-500 font-medium truncate">Active Track</div>
                    <div className="text-xs font-bold text-white tracking-tight truncate">Full-Stack Cloud Architecture</div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800/60 flex items-center justify-between sm:justify-center space-x-2">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-5 h-5 rounded-full ring-2 ring-slate-900 bg-slate-800 flex items-center justify-center text-[8px] text-white font-bold">
                        {`0${i}`}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium pl-1">
                    +412 peers coding live
                  </div>
                </div>
              </div>

            </div>

            {/* FLOATING PIECE 1: Top Right Progress Card */}
            <motion.div
              className="absolute -top-4 -right-2 md:-right-6 bg-slate-900/95 border border-slate-800/90 backdrop-blur-xl rounded-xl p-3.5 shadow-xl w-52 hidden sm:block pointer-events-auto"
              style={{ x: mouseX * -0.2, y: mouseY * -0.2 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <FireIcon className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white leading-tight">Daily Sprint</h4>
                    <p className="text-[9px] text-slate-500 font-medium leading-none">Data Structures</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">85%</span>
              </div>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </div>
            </motion.div>

            {/* FLOATING PIECE 2: Bottom Left Badge Card */}
            <motion.div
              className="absolute -bottom-4 -left-2 md:-left-6 bg-slate-900/95 border border-slate-800/90 backdrop-blur-xl rounded-xl p-2.5 sm:p-3 shadow-xl flex items-center space-x-3 hidden sm:flex pointer-events-auto"
              style={{ x: mouseX * 0.15, y: mouseY * -0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/10">
                <TrophyIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none">Current Streak</div>
                <div className="text-xs font-black text-white mt-0.5">18 Days Active</div>
              </div>
            </motion.div>

          </motion.div>

        </motion.div>
      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1.5 pointer-events-none hidden md:flex"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-700">Scroll Framework</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-slate-800 via-emerald-500/30 to-transparent relative overflow-hidden">
          <motion.div 
            className="absolute top-0 inset-x-0 h-3 bg-emerald-400"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

    </div>
  );
};

export default EnhancedHomeHero;
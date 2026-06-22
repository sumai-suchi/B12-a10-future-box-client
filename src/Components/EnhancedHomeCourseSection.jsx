import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";
import { useAllCoursesData } from "../hook/useAllCoursesData";
import LoadingSkeleton from "./LoadingSkeleton";

const EnhancedHomeCourseSection = () => {
  const { config } = useAnimation();
  const { allCourses, loadingData } = useAllCoursesData();
  console.log(allCourses);

  // 1. Safe Extraction: Fallback to an empty object if array is empty so it doesn't crash
  const mainFeaturedCourse = allCourses && allCourses.length > 0 ? allCourses[0] : null;
  
  // 2. Safe Dynamic Distribution: If you have cards, fill the layout slots dynamically
  const rightColumnCourse = allCourses && allCourses.length > 1 ? allCourses[1] : null;
  
  // 3. Bottom Row items (items starting from index 2 onwards)
  const bottomRowCourses = allCourses && allCourses.length > 2 ? allCourses.slice(2, 5) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.reducedMotion ? 0 : 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: config.reducedMotion ? 0.1 : 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="w-full bg-[#0B0C10] text-white py-24 px-6 lg:px-16 selection:bg-cyan-400 selection:text-[#0B0C10] overflow-hidden antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-row justify-between items-end pb-10">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#00F0FF] uppercase font-mono">
              Premium Catalog
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Featured Pathways
            </h2>
          </div>
          
          <a 
            href="/allCourses" 
            className="group flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#B266FF] uppercase font-mono hover:text-[#00F0FF] transition-colors duration-300"
          >
            Browse All Courses 
            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
              ➔
            </span>
          </a>
        </div>

        {/* LOADING ENGINE MAPPING */}
        {loadingData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[400px] bg-[#12141C] border border-slate-900 rounded-2xl animate-pulse" />
            <div className="h-[400px] bg-[#12141C] border border-slate-900 rounded-2xl animate-pulse" />
          </div>
        ) : !allCourses || allCourses.length === 0 ? (
          
          /* FALLBACK SCREEN: Shows if your database fetch returned an empty array [] */
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-[#12141C]/30">
            <p className="text-sm text-slate-400 font-mono">No active pathways found in database container.</p>
          </div>
        ) : (
          
          /* FIXED MESH BENTO MATRIX MAP */
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            
            {/* ROW 1 LAYOUT: Featured Box Left + 1 Card Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              
              {/* Left Main Featured Block */}
              {mainFeaturedCourse && (
                <motion.div 
                  variants={itemVariants}
                  className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#12141C] p-8 flex flex-col justify-between h-[380px] lg:h-auto group transition-all duration-300 hover:border-cyan-400/40"
                >
                  <div className="absolute inset-y-0 right-0 w-1/2 opacity-30 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none hidden md:block">
                    <div className="w-full h-full bg-gradient-to-l from-[#12141C] via-transparent to-[#12141C] absolute inset-0 z-10" />
                    <img 
                      src={mainFeaturedCourse.thumbnail || mainFeaturedCourse.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"} 
                      alt="Neural Canvas Graphic Asset" 
                      className="w-full h-full object-cover object-center filter mix-blend-screen"
                    />
                  </div>

                  <div className="space-y-4 max-w-md relative z-10">
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider font-mono uppercase bg-[#7A22FF]/20 text-[#D2B3FF] border border-[#7A22FF]/30">
                        BIO
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider font-mono uppercase bg-cyan-950/40 text-[#00F0FF] border border-cyan-500/20">
                        INTENSIVE
                      </span>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-white pt-2">
                      {mainFeaturedCourse.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {mainFeaturedCourse.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-6">
                    <a 
                      href={`/viewDetails/${mainFeaturedCourse._id}`}
                      className="inline-block px-6 py-2.5 bg-[#00F0FF] hover:bg-cyan-300 text-[#0B0C10] text-xs font-black tracking-wide rounded-md transition-all font-sans"
                    >
                      Enroll Now
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Right Column Stack Card */}
              {rightColumnCourse ? (
                <motion.div
                  variants={itemVariants}
                  className="rounded-2xl border border-slate-900 bg-[#12141C] p-5 flex flex-col justify-between group hover:border-slate-800 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-full h-36 overflow-hidden rounded-xl bg-slate-950 border border-slate-900">
                      <img 
                        src={rightColumnCourse.thumbnail || rightColumnCourse.image || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0"} 
                        alt={rightColumnCourse.title} 
                        className="w-full h-full object-cover filter brightness-75 group-hover:scale-[1.01] transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-200 tracking-wide group-hover:text-[#00F0FF] transition-colors">
                        {rightColumnCourse.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-medium">
                        {rightColumnCourse.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <span className="text-xs font-bold tracking-widest text-[#FF66CC] font-mono">
                      ${rightColumnCourse.price || "199.00"}
                    </span>
                    <a href={`/viewDetails/${rightColumnCourse._id}`} className="text-[#00F0FF] hover:text-white">
                      <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Empty Column Fallback slot to preserve layout architecture alignment */
                <div className="hidden lg:block rounded-2xl border border-slate-900/40 bg-[#12141C]/20 border-dashed" />
              )}
            </div>

            {/* ROW 2 LAYOUT: Bottom Secondary Grid Cards Row */}
            {bottomRowCourses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bottomRowCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    variants={itemVariants}
                    className="rounded-2xl border border-slate-900 bg-[#12141C] p-5 flex flex-col justify-between group hover:border-slate-800 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="w-full h-36 overflow-hidden rounded-xl bg-slate-950 border border-slate-900">
                        <img 
                          src={course.thumbnail || course.image || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0"} 
                          alt={course.title} 
                          className="w-full h-full object-cover filter brightness-75 group-hover:scale-[1.01] transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-200 tracking-wide group-hover:text-[#00F0FF] transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-medium">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-auto">
                      <span className="text-xs font-bold tracking-widest text-[#FF66CC] font-mono">
                        ${course.price || "199.00"}
                      </span>
                      <a href={`/viewDetails/${course._id}`} className="text-[#00F0FF] hover:text-white">
                        <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ROW 3 LAYOUT: Full-Width AI Mentor Banner Block */}
            <motion.div 
              variants={itemVariants}
              className="rounded-2xl border border-slate-900 bg-[#12141C] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="space-y-2 max-w-xl relative z-10">
                <span className="text-[10px] font-bold tracking-widest text-[#00F0FF] font-mono uppercase">
                  AI-Mentor System
                </span>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Your Personal Synthetic Guide
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Our proprietary AI mentors adapt in real-time to your learning pace, bio-feedback, and conceptual hurdles.
                </p>
              </div>

              <div className="relative z-10 shrink-0">
                <a 
                  href="/ai-match" 
                  className="inline-block px-5 py-2.5 bg-transparent border border-cyan-400/30 hover:border-[#00F0FF] text-[#00F0FF] text-xs font-bold tracking-wide rounded-md transition-colors font-mono"
                >
                  Meet Your Mentor
                </a>
              </div>
            </motion.div>

          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EnhancedHomeCourseSection;
import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";
import { useAllCoursesData } from "../hook/useAllCoursesData";
import EnhancedTitle from "../HomeComponents/EnhancedTitle";
import EnhancedCourseCard from "./EnhancedCourseCard";
import LoadingSkeleton from "./LoadingSkeleton";

const EnhancedHomeCourseSection = () => {
  const { config } = useAnimation();
  const { allCourses, loadingData } = useAllCoursesData();

  const featuredCourses = allCourses.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.reducedMotion ? 0 : 0.1,
        delayChildren: config.reducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: config.reducedMotion ? 0.1 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-purple-900/50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-teal-300/20 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: config.reducedMotion ? 0 : 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-violet-200/20 to-purple-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: config.reducedMotion ? 0 : 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Enhanced Title */}
        <EnhancedTitle
          title="Popular Courses"
          subtitle="Discover our most loved courses designed by industry experts to accelerate your learning journey"
          badge="🔥 Trending Now"
        />

        {/* Course Grid */}
        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loadingData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <LoadingSkeleton variant="card" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses?.map((course, index) => (
                <motion.div
                  key={course._id}
                  variants={itemVariants}
                  whileHover={config.reducedMotion ? {} : { y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <EnhancedCourseCard course={course} index={index} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* View All Courses Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: config.reducedMotion ? 0.1 : 0.8, delay: 0.5 }}
        >
          <motion.a
            href="/allCourses"
            className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 relative overflow-hidden"
            whileHover={config.reducedMotion ? {} : { scale: 1.05, y: -3 }}
            whileTap={config.reducedMotion ? {} : { scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="relative flex items-center">
              <span>Explore All Courses</span>
              <motion.svg
                className="w-5 h-5 ml-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHomeCourseSection;
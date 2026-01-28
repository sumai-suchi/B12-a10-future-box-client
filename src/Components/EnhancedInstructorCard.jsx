import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";
import {
  StarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

const EnhancedInstructorCard = ({ instructor, index }) => {
  const { config } = useAnimation();

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: config.reducedMotion ? 0.1 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: config.reducedMotion ? 1 : 1.05,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hover: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarSolidIcon key={i} className="w-4 h-4 text-amber-400" />
      );
    }
    
    const remainingStars = 5 - fullStars;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="w-4 h-4 text-slate-300" />
      );
    }
    
    return stars;
  };

  return (
    <motion.div
      className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden hover:shadow-emerald-500/20 transition-all duration-500 max-w-sm mx-auto"
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Instructor Image Section */}
      <div className="relative overflow-hidden h-64">
        <motion.img
          src={instructor.image}
          alt={instructor.name}
          className="w-full h-full object-cover"
          variants={imageVariants}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Rating Badge */}
        <motion.div
          className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <StarSolidIcon className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {instructor.rating.toFixed(1)}
          </span>
        </motion.div>

        {/* Verified Badge */}
        <motion.div
          className="absolute top-4 left-4 flex items-center space-x-1 px-3 py-2 bg-emerald-500/90 backdrop-blur-sm rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <CheckBadgeIcon className="w-4 h-4 text-white" />
          <span className="text-xs font-semibold text-white">Verified</span>
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-emerald-600/80 via-teal-500/40 to-transparent opacity-0 flex items-end justify-center pb-6"
          variants={overlayVariants}
        >
          <motion.div
            className="flex items-center space-x-2 text-white"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">View Profile</span>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-4 left-4 w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: config.reducedMotion ? 0 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Name and Expertise */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {instructor.name}
          </h3>
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full border border-emerald-200/50 dark:border-emerald-700/50"
            whileHover={config.reducedMotion ? {} : { scale: 1.05 }}
          >
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {instructor.expertise}
            </span>
          </motion.div>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-center line-clamp-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.6 }}
        >
          {instructor.bio}
        </motion.p>

        {/* Rating Stars */}
        <motion.div
          className="flex items-center justify-center space-x-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.7 }}
        >
          {renderStars(instructor.rating)}
          <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
            ({instructor.rating.toFixed(1)})
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.8 }}
        >
          <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-700/50 dark:to-indigo-900/30 rounded-2xl">
            <motion.div
              className="flex items-center justify-center mb-2"
              whileHover={config.reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
            >
              <UserGroupIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <motion.div
              className="text-xl font-bold text-slate-800 dark:text-slate-200"
            >
              {instructor.students.toLocaleString()}
            </motion.div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Students
            </div>
          </div>

          <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-700/50 dark:to-purple-900/30 rounded-2xl">
            <motion.div
              className="flex items-center justify-center mb-2"
              whileHover={config.reducedMotion ? {} : { scale: 1.1, rotate: -5 }}
            >
              <AcademicCapIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </motion.div>
            <motion.div
              className="text-xl font-bold text-slate-800 dark:text-slate-200"
            >
              {instructor.courses}
            </motion.div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Courses
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          className="group w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.9 }}
          whileHover={config.reducedMotion ? {} : { scale: 1.02, y: -2 }}
          whileTap={config.reducedMotion ? {} : { scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="relative flex items-center space-x-2">
            <span>View Courses</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: config.reducedMotion ? 0 : 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: config.reducedMotion ? 0 : 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.div>
  );
};

export default EnhancedInstructorCard;
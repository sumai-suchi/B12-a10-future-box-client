import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { useAnimation } from "../context/AnimationProvider";
import {
  StarIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

const EnhancedCourseCard = ({ course, index }) => {
  const { config } = useAnimation();

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: config.reducedMotion ? 0.1 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: config.reducedMotion ? 1 : 1.1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: {
      scale: config.reducedMotion ? 1 : 1.02,
      y: config.reducedMotion ? 0 : -2,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: config.reducedMotion ? 1 : 0.98
    }
  };

  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarSolidIcon key={i} className="w-4 h-4 text-amber-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="w-4 h-4 text-amber-400" />
          <StarSolidIcon className="w-4 h-4 text-amber-400 absolute top-0 left-0 clip-path-half" />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="w-4 h-4 text-slate-300" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/20 overflow-hidden hover:shadow-2xl transition-all duration-500"
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Course Image */}
      <div className="relative overflow-hidden rounded-t-3xl h-48">
        <motion.img
          src={course?.image}
          alt={course.title}
          className="w-full h-full object-cover"
          variants={imageVariants}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {course.category}
        </motion.div>

        {/* Rating Badge */}
        <motion.div
          className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <StarSolidIcon className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {course.rating}
          </span>
        </motion.div>

        {/* Hover Overlay with Quick Actions */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            className="flex items-center space-x-2 text-white"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <AcademicCapIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Quick Preview</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Course Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {course.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.6 }}
        >
          {course?.description?.length > 120
            ? course.description.slice(0, 120) + "..."
            : course.description}
        </motion.p>

        {/* Course Meta */}
        <motion.div
          className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.7 }}
        >
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <UserIcon className="w-4 h-4" />
            <span>{course.level}</span>
          </div>
        </motion.div>

        {/* Instructor */}
        <motion.div
          className="flex items-center space-x-3 py-3 border-t border-slate-200/50 dark:border-slate-700/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.8 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {course.instructor?.charAt(0) || 'I'}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Instructor</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {course.instructor}
            </p>
          </div>
        </motion.div>

        {/* Rating Stars */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.9 }}
        >
          <div className="flex items-center space-x-1">
            {renderStars(course.rating)}
            <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
              ({course.rating})
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ${course.price}
            </p>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 1.0 }}
        >
          <NavLink to={`/viewDetails/${course._id}`}>
            <motion.button
              className="group w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="relative flex items-center space-x-2">
                <span>View Details</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.button>
          </NavLink>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: config.reducedMotion ? 0 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default EnhancedCourseCard;
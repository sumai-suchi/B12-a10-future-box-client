import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";
import {
  UserGroupIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

const EnhancedInstructorCard = ({ instructor, index }) => {
  const { config } = useAnimation();

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: config.reducedMotion ? 0.1 : 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05
      }
    }
  };

  return (
    <motion.div
      className="group relative bg-[#12141C] border border-slate-900 rounded-2xl overflow-hidden hover:border-[#00F0FF]/30 hover:shadow-[0_0_25px_rgba(0,240,255,0.04)] transition-all duration-300 max-w-sm mx-auto flex flex-col h-full"
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Instructor Image Section */}
      <div className="relative overflow-hidden h-56 bg-[#0B0C10]">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />
        
        {/* Clean Vignette Shader for Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-black/20" />
        
        {/* Verified Badge */}
        <div className="absolute top-4 left-4 flex items-center space-x-1 px-2.5 py-1 bg-[#12141C]/90 border border-emerald-500/30 backdrop-blur-md rounded-md font-mono text-[9px] text-emerald-400 font-bold tracking-wider">
          <CheckBadgeIcon className="w-3 h-3 text-emerald-400" />
          <span>VERIFIED</span>
        </div>

        {/* Rating Floating Label */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-1 px-2 py-0.5 bg-[#12141C] border border-slate-800 rounded font-mono text-[10px] font-bold text-slate-200 shadow-lg">
          <StarSolidIcon className="w-3 h-3 text-[#00F0FF]" />
          <span>{instructor.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-wide font-sans group-hover:text-[#00F0FF] transition-colors duration-200">
              {instructor.name}
            </h3>
            <span className="font-mono text-[9px] text-slate-500 font-bold">ID // 0{index + 1}</span>
          </div>

          {/* Core Specialization Tag */}
          <span className="inline-block font-mono text-[10px] font-bold tracking-wide text-[#B266FF] uppercase bg-[#B266FF]/5 border border-[#B266FF]/10 px-2 py-0.5 rounded">
            {instructor.expertise}
          </span>
        </div>

        {/* Bio Description */}
        <p className="text-slate-400 text-xs leading-relaxed font-sans line-clamp-2">
          {instructor.bio}
        </p>

        {/* Platform Metric Trackers */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-950 font-mono">
          <div className="p-2.5 bg-[#0B0C10] border border-slate-900 rounded-lg">
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold mb-1">
              <span>GRADUATES</span>
              <UserGroupIcon className="w-3 h-3 text-slate-600" />
            </div>
            <div className="text-xs font-bold text-white font-sans">
              {instructor.students.toLocaleString()}
            </div>
          </div>

          <div className="p-2.5 bg-[#0B0C10] border border-slate-900 rounded-lg">
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold mb-1">
              <span>TRACKS</span>
              <AcademicCapIcon className="w-3 h-3 text-slate-600" />
            </div>
            <div className="text-xs font-bold text-white font-sans">
              {instructor.courses} Modules
            </div>
          </div>
        </div>

        {/* Interactive CTA Link */}
        <motion.button
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#0B0C10] hover:bg-[#00F0FF]/5 border border-slate-900 hover:border-[#00F0FF]/40 text-slate-300 hover:text-white font-mono text-[11px] font-bold rounded-xl transition-all duration-200"
          whileTap={config.reducedMotion ? {} : { scale: 0.98 }}
        >
          <span>VIEW_SYLLABUS</span>
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00F0FF] transition-colors" />
        </motion.button>

      </div>
    </motion.div>
  );
};

export default EnhancedInstructorCard;
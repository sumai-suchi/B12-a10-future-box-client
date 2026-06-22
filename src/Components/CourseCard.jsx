import Aos from "aos";
import { Star } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router";
import "aos/dist/aos.css";

const CourseCard = ({ course, isFeatured }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  // Safe Fallbacks for Descriptions
  const shortDescription =
    course?.description?.length > 110
      ? course.description.slice(0, 110) + "..."
      : course.description;

  const longDescription =
    course?.description?.length > 240
      ? course.description.slice(0, 240) + "..."
      : course.description;

  // --- 1. FEATURED PATHWAY CARD LAYOUT (Large Top Banner) ---
  if (isFeatured) {
    return (
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="w-full bg-gradient-to-br from-[#111625] to-[#090D1A] border border-cyan-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group min-h-[380px]"
      >
        {/* Visual Ambient Glow Behind Content */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

        {/* Text Details & Action Column */}
        <div className="flex-1 flex flex-col justify-between h-full space-y-5 z-10">
          <div className="space-y-4">
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold bg-[#1b173a] text-purple-400 px-2.5 py-1 rounded-md uppercase tracking-wider border border-purple-900/40">
                {course.level || "INTENSIVE"}
              </span>
              <span className="text-[10px] font-bold bg-[#0d2a30] text-cyan-400 px-2.5 py-1 rounded-md uppercase tracking-wider border border-cyan-950">
                {course.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500 bg-black/30 px-2 py-0.5 rounded-md text-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold">{course.rating}</span>
              </div>
            </div>

            {/* Course Title */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight group-hover:text-cyan-400 transition-colors duration-300">
              {course.title}
            </h2>

            {/* Course Description */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              {longDescription}
            </p>
          </div>

          {/* Instructor and Duration Subtext */}
          <div className="flex items-center gap-6 text-xs text-gray-500 border-t border-gray-800/60 pt-4">
            <div>
              <span className="text-gray-600 block">Instructor:</span>
              <span className="text-gray-300 font-medium">{course.instructor}</span>
            </div>
            <div>
              <span className="text-gray-600 block">Duration:</span>
              <span className="text-gray-300 font-medium">{course.duration}</span>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="pt-2">
            <NavLink
              to={`/viewDetails/${course._id}`}
              className="inline-block bg-[#00F3BB] hover:bg-[#00d4a3] text-[#070A13] font-bold text-sm px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#00F3BB]/10 active:scale-95"
            >
              Enroll Now
            </NavLink>
          </div>
        </div>

        {/* Graphics Graphic Frame Column */}
        <div className="flex-1 w-full md:w-auto flex justify-center items-center relative py-4 z-10">
          <div className="w-64 h-44 md:w-80 md:h-56 bg-[#060913] rounded-2xl border border-gray-800/80 p-4 flex items-center justify-center overflow-hidden shadow-2xl">
            <img
              src={course?.image}
              alt={course.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    );
  }

  // --- 2. STANDARD COMPACT GRID CARD LAYOUT ---
  return (
    <div
      data-aos="zoom-in"
      data-aos-delay="200"
      className="w-full h-full bg-[#111625] border border-gray-900/60 hover:border-gray-800 rounded-2xl p-5 flex flex-col justify-between group transition-all duration-300 shadow-xl"
    >
      <div className="space-y-4">
        {/* Banner Mockup Display Frame */}
        <div className="w-full h-44 bg-[#0A0D16] rounded-xl overflow-hidden flex items-center justify-center p-4 border border-gray-950 relative">
          <img
            src={course?.image}
            alt={course.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle Corner Rating Tag overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#0A0D16]/90 backdrop-blur-md px-2 py-1 rounded-lg text-yellow-500 border border-gray-800 text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>

        {/* Metadata Badges */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-cyan-400 font-semibold tracking-wide">
            {course.category}
          </span>
          <span className="text-gray-500 font-medium">
            {course.level} • {course.duration}
          </span>
        </div>

        {/* Description Body */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-200 line-clamp-1">
            {course.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
            {shortDescription}
          </p>
        </div>
      </div>

      {/* Meta Footer Row */}
      <div className="mt-5 pt-4 border-t border-gray-900/80 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-600 uppercase tracking-wider">Instructor</p>
          <p className="text-xs font-medium text-gray-300 line-clamp-1">{course.instructor}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-pink-500 font-mono font-bold text-base">
            ${course.price}
          </span>
          
          <NavLink
            to={`/viewDetails/${course._id}`}
            className="p-2.5 bg-[#171e33] text-gray-400 hover:text-black hover:bg-cyan-400 rounded-xl transition-all duration-200"
          >
            {/* Minimalist modern indicator arrow matching design archetype */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
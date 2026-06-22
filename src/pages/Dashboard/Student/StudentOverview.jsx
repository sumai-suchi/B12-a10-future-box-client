import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  SparklesIcon,
  PlayIcon,
  EnvelopeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const StudentOverview = () => {

  const {user,role}=useContext(AuthContext)
  console.log(user?.email,role);
    const [studentInformation, setStudentInformation] = useState(null);
  console.log("studentInfo",studentInformation);

  // Mocked state data focusing purely on available static structural properties
  const studentStats = [
    {
      title: "Enrolled Courses",
      value: studentInformation?.addedCourseData.length, 
      subtext: "Current active syllabus",
      icon: BookOpenIcon,
      color: "from-blue-400 via-indigo-500 to-violet-600",
      glow: "shadow-indigo-500/10"
    },
    {
      title: "Completed Courses",
      value: studentInformation?.completedCourseData.length,
      subtext: "Archived credentials",
      icon: AcademicCapIcon,
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      glow: "shadow-teal-500/10"
    },
    {
      title: "My Instructors",
      value: studentInformation?.addedCourseData.length,
      subtext: "Faculty mentors assigned",
      icon: UserGroupIcon,
      color: "from-amber-400 via-orange-500 to-rose-500",
      glow: "shadow-orange-500/10"
    },
  ];

  const activeCourses = [
    { 
      name: "Advanced React & Architecture Patterns", 
      instructor: "Prof. Sarah Jenkins", 
      officeHours: "Mon/Wed 2-4 PM",
      status: "In Progress",
      color: "border-blue-500 bg-blue-500/5"
    },
    { 
      name: "UI/UX Foundations Mastery", 
      instructor: "Eduardo Blanco", 
      officeHours: "Tue/Thu 1-3 PM",
      status: "In Progress",
      color: "border-amber-500 bg-amber-500/5"
    },
    { 
      name: "Node.js System Design Models", 
      instructor: "Dr. Alan Turing", 
      officeHours: "Friday 9-11 AM",
      status: "In Progress",
      color: "border-emerald-500 bg-emerald-500/5"
    },
  ];

  const instructorsList = [
    { name: "Prof. Sarah Jenkins", role: "Lead Frontend Architecture", email: "s.jenkins@academy.edu" },
    { name: "Eduardo Blanco", role: "Head of Product Experience", email: "e.blanco@academy.edu" },
    { name: "Dr. Alan Turing", role: "Distributed Systems Chair", email: "a.turing@academy.edu" },
  ];


  useEffect(()=>{

    const fetchStudentInformation = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/dashboardInfo?email=${user?.email}`);
     
        const data = response.data;
        setStudentInformation(data);
      } catch (error) {
        console.error("Error fetching student information:", error);
      }
    };
  
    fetchStudentInformation();
  
  },[user?.email])




  const upcomingDeadlines = [
    { id: 1, task: "Database Normalization Milestone Submission", course: "Node.js System Design", due: "Tomorrow, 11:59 PM", color: "border-l-rose-500 bg-rose-50/40 dark:bg-rose-950/10" },
    { id: 2, task: "Live Case Study Interactive Review", course: "UI/UX Foundations", due: "June 15, 4:00 PM", color: "border-l-amber-500 bg-amber-50/40 dark:bg-amber-950/10" },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-7xl mx-auto p-1"
    >
      {/* <Helmet>
        <title>Future-Box | Student Portal Overview</title>
      </Helmet> */}

      {/* 1. Static Motivation Header Box */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 rounded-3xl text-white shadow-xl border border-indigo-400 dark:border-slate-800"
      >
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-white/10 dark:bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 dark:bg-indigo-500/20 text-white dark:text-indigo-300 border border-white/30 dark:border-indigo-500/30 backdrop-blur-md">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-300 dark:text-amber-400" />
              Welcome Back Student
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Your Classrooms At A Glance.
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Review assigned submissions, contact curriculum instructors directly, or instantly jump back into your current course environments below.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="group inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-2xl shadow-lg shadow-white/5 transition-all duration-200">
              <PlayIcon className="w-4 h-4 fill-current text-slate-900" />
              Open Last Active Class
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {studentStats.map((stat) => (
          <StatCard key={stat.title} {...stat} itemVariants={itemVariants} />
        ))}
      </div>

      {/* 3. Main Operational Grid Layout split */}
      {/* 3. Main Operational Grid Layout split */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  
  {/* Enrolled Active Courses Block */}
  <motion.div
    variants={itemVariants}
    className="lg:col-span-2 p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-sm space-y-4"
  >
    <div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
        Enrolled Courses data
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
        Select an active curriculum workspace to study your course material.
      </p>
    </div>

    {/* Course Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {studentInformation?.addedCourseData.map((course) => (
        <div 
          key={course._id || course.id} 
          className="p-4 rounded-xl border flex flex-col justify-between hover:shadow-md transition-all duration-200 cursor-pointer group bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-700/60 overflow-hidden"
        >
          <div className="space-y-3">
            {/* Top Row: Category Badge & Course Duration Image/Placeholder */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">
                {course.category || "General"}
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                {course.duration}
              </span>
            </div>

            {/* Middle Section: Thumbnail Image & Dynamic Title Mapping */}
            <div className="flex gap-3 items-start">
              {course.image && (
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-100 dark:border-slate-700 shrink-0" 
                />
              )}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {course.title}
                </h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Meta Row: Instructor Context Box */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <span className="text-slate-400 dark:text-slate-500">Instructor: </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{course.instructor}</span>
            </div>
            {course.rating && (
              <div className="text-amber-500 font-bold flex items-center gap-0.5">
                ★ <span className="text-slate-600 dark:text-slate-400 font-medium">{course.rating}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </motion.div>

  {/* Course Schedule/Assignments Module */}


  {/* Course Schedule / Dynamic Priorities Module */}
<motion.div
  variants={itemVariants}
  className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-sm flex flex-col"
>
  <div className="mb-4">
    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
      Course Priorities
    </h3>
    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
      Review critical focus areas determined by course ratings and level metrics.
    </p>
  </div>

  <div className="space-y-3 flex-1 overflow-y-auto max-h-full custom-scrollbar pr-1">
    {/* 1. Sort courses dynamically so lower rating/higher difficulty targets appear first */}
    {studentInformation?.addedCourseData?.length > 0 && 
    [...studentInformation?.addedCourseData] 
      .sort((a, b) => (a.rating || 0) - (b.rating || 0))
      .map((course) => {
        // 2. Dynamically assign alert styling based on the rating scale thresholds
        const isCritical = (course.rating || 5) <= 4.6;
        const statusColor = isCritical
          ? "border-l-amber-500 bg-amber-50/40 dark:bg-amber-950/10 text-amber-700 dark:text-amber-400"
          : "border-l-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/10 text-indigo-700 dark:text-indigo-400";

        return (
          <div 
            key={course._id || course.id} 
            className={`p-3.5 rounded-xl border-l-4 shadow-sm border border-slate-200/40 dark:border-slate-700/30 text-xs flex gap-3 items-start transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 ${statusColor}`}
          >
            {/* Dynamic Status Badging based on your DB object properties */}
            <div className="space-y-1.5 min-w-0 w-full">
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="font-bold text-slate-800 dark:text-slate-100 block truncate max-w-[70%]">
                  Focus: {course.title}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 text-amber-500 shrink-0">
                  ★ {course.rating || "N/A"}
                </span>
              </div>
              
              <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
                Level: <span className="font-medium text-slate-600 dark:text-slate-300">{course.level || "Beginner"}</span>
              </p>
              
              <div className="flex items-center justify-between text-[10px] mt-1 text-slate-400 dark:text-slate-500 font-medium pt-1.5 border-t border-slate-100 dark:border-slate-800/60">
                <span>Duration: {course.duration}</span>
                <span className="underline cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400">
                  Open Syllabus
                </span>
              </div>
            </div>
          </div>
        );
      })} 

    {/* Fallback state check if array returns empty */}
    {activeCourses.length === 0 && (
      <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-500">
        No dynamic course priorities detected.
      </div>
    )}
  </div>
</motion.div>


</div>

      {/* 4. Instructor Roster Workspace Segment */}
     {/* 4. Instructor Roster Workspace Segment */}
<motion.div
  variants={itemVariants}
  className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-sm"
>
  <div className="mb-4">
    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
      Assigned Course Instructors
    </h3>
    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
      Connect directly with your course professors for support or guidance.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Maps over activeCourses directly using the real 'instructor', 'email', and 'title' keys */}
    {studentInformation?.addedCourseData && studentInformation?.addedCourseData?.map((course, i) => (
      <div 
        key={course._id || course.id || i} 
        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/60 text-xs gap-3 hover:border-slate-200 dark:hover:border-slate-700 transition-all"
      >
        <div className="min-w-0 space-y-0.5">
          {/* Main Instructor Name Display */}
          <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
            {course.instructor || "Assigned Faculty"}
          </p>
          {/* Displays the specific course they teach as their role context */}
          <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
            {course.title || "Course Instructor"}
          </p>
        </div>

        {/* Email Link anchor using real email parameters */}
        {course.email ? (
          <a 
            href={`mailto:${course.email}`}
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-xs hover:shadow transition-all group flex-shrink-0"
            title={`Email ${course.instructor}`}
          >
            <EnvelopeIcon className="w-4 h-4" />
          </a>
        ) : (
          <div className="p-2 text-slate-300 dark:text-slate-600 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl shrink-0 cursor-not-allowed">
            <EnvelopeIcon className="w-4 h-4" />
          </div>
        )}
      </div>
    ))}

    {/* Fallback state check if array returns empty */}
    {(!activeCourses || activeCourses.length === 0) && (
      <div className="col-span-full text-center py-6 text-xs text-slate-400 dark:text-slate-500">
        No active faculty assignments detected.
      </div>
    )}
  </div>
</motion.div>

    </motion.div>
  );
};

export default StudentOverview;

/* ================= Stat Card Sub-component ================= */
const StatCard = ({ title, value, subtext, icon: Icon, color, glow, itemVariants }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="p-5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-sm flex flex-col justify-between group relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-3xl font-bold text-slate-800 dark:text-slate-50 tracking-tight">
            {value}
          </p>
        </div>
        <div className={`w-11 h-11 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-md ${glow} transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-700/40 pt-3">
        {subtext}
      </div>
    </motion.div>
  );
};
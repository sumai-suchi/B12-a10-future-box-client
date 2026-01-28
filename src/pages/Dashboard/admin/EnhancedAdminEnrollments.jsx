import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { useAnimation } from "../../../context/AnimationProvider";
import LoadingSkeleton from "../../../Components/LoadingSkeleton";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  EnvelopeIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  Bars3Icon,
  Squares2X2Icon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";

const EnhancedAdminEnrollments = () => {
  const { config } = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);

  // Mock data with more detailed information
  const mockEnrollments = [
    {
      _id: "1",
      studentName: "John Doe",
      studentEmail: "john.doe@email.com",
      studentAvatar: "https://i.pravatar.cc/40?img=1",
      courseTitle: "React for Beginners",
      courseImage: "https://picsum.photos/100/60?random=1",
      instructor: "Sarah Johnson",
      enrollmentDate: "2026-01-20",
      completionDate: null,
      progress: 65,
      status: "Active",
      lastActivity: "2026-01-27",
      totalLessons: 24,
      completedLessons: 16,
      timeSpent: "18h 30m",
      grade: null
    },
    {
      _id: "2",
      studentName: "Jane Smith",
      studentEmail: "jane.smith@email.com",
      studentAvatar: "https://i.pravatar.cc/40?img=2",
      courseTitle: "Node & Express Basics",
      courseImage: "https://picsum.photos/100/60?random=2",
      instructor: "Mike Davis",
      enrollmentDate: "2026-01-22",
      completionDate: "2026-01-26",
      progress: 100,
      status: "Completed",
      lastActivity: "2026-01-26",
      totalLessons: 18,
      completedLessons: 18,
      timeSpent: "22h 15m",
      grade: "A"
    },
    {
      _id: "3",
      studentName: "Ali Rahman",
      studentEmail: "ali.rahman@email.com",
      studentAvatar: "https://i.pravatar.cc/40?img=3",
      courseTitle: "HTML & CSS Fundamentals",
      courseImage: "https://picsum.photos/100/60?random=3",
      instructor: "Lisa Wang",
      enrollmentDate: "2026-01-23",
      completionDate: null,
      progress: 30,
      status: "Active",
      lastActivity: "2026-01-25",
      totalLessons: 20,
      completedLessons: 6,
      timeSpent: "8h 45m",
      grade: null
    },
    {
      _id: "4",
      studentName: "Emma Wilson",
      studentEmail: "emma.wilson@email.com",
      studentAvatar: "https://i.pravatar.cc/40?img=4",
      courseTitle: "JavaScript Advanced",
      courseImage: "https://picsum.photos/100/60?random=4",
      instructor: "David Brown",
      enrollmentDate: "2026-01-15",
      completionDate: null,
      progress: 0,
      status: "Inactive",
      lastActivity: "2026-01-16",
      totalLessons: 30,
      completedLessons: 0,
      timeSpent: "0h 30m",
      grade: null
    },
    {
      _id: "5",
      studentName: "Carlos Rodriguez",
      studentEmail: "carlos.rodriguez@email.com",
      studentAvatar: "https://i.pravatar.cc/40?img=5",
      courseTitle: "Python for Data Science",
      courseImage: "https://picsum.photos/100/60?random=5",
      instructor: "Dr. Jennifer Lee",
      enrollmentDate: "2026-01-18",
      completionDate: "2026-01-25",
      progress: 100,
      status: "Completed",
      lastActivity: "2026-01-25",
      totalLessons: 25,
      completedLessons: 25,
      timeSpent: "35h 20m",
      grade: "A+"
    }
  ];

  // Load data
  useEffect(() => {
    const loadEnrollments = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEnrollments(mockEnrollments);
      setFilteredEnrollments(mockEnrollments);
      setIsLoading(false);
    };

    loadEnrollments();
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = enrollments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(enrollment =>
        enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(enrollment => enrollment.status === statusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.studentName;
          bValue = b.studentName;
          break;
        case 'course':
          aValue = a.courseTitle;
          bValue = b.courseTitle;
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'date':
        default:
          aValue = new Date(a.enrollmentDate);
          bValue = new Date(b.enrollmentDate);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredEnrollments(filtered);
  }, [enrollments, searchTerm, statusFilter, sortBy, sortOrder]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.reducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: config.reducedMotion ? 0.1 : 0.4 }
    }
  };

  // Get status icon and color
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Active':
        return {
          icon: ClockIcon,
          color: 'text-blue-600',
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'text-blue-800 dark:text-blue-200'
        };
      case 'Completed':
        return {
          icon: CheckCircleIcon,
          color: 'text-green-600',
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-800 dark:text-green-200'
        };
      case 'Inactive':
        return {
          icon: XCircleIcon,
          color: 'text-red-600',
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-800 dark:text-red-200'
        };
      default:
        return {
          icon: ClockIcon,
          color: 'text-gray-600',
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          text: 'text-gray-800 dark:text-gray-200'
        };
    }
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Handle selection
  const handleSelectEnrollment = (id) => {
    setSelectedEnrollments(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEnrollments.length === filteredEnrollments.length) {
      setSelectedEnrollments([]);
    } else {
      setSelectedEnrollments(filteredEnrollments.map(e => e._id));
    }
  };

  // Statistics
  const stats = {
    total: enrollments.length,
    active: enrollments.filter(e => e.status === 'Active').length,
    completed: enrollments.filter(e => e.status === 'Completed').length,
    inactive: enrollments.filter(e => e.status === 'Inactive').length,
    avgProgress: Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
  };

  if (isLoading) {
    return <EnrollmentsSkeleton />;
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>Student Enrollments | Enhanced Dashboard</title>
      </Helmet>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <UserGroupIcon className="w-8 h-8 mr-3 text-indigo-600" />
            Student Enrollments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and monitor student course enrollments and progress
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center gap-4">
          <motion.button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            whileHover={config.reducedMotion ? {} : { scale: 1.05 }}
            whileTap={config.reducedMotion ? {} : { scale: 0.95 }}
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Data
          </motion.button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <UserGroupIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgProgress}%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div variants={itemVariants}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, courses, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Inactive">Inactive</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-gray-600 text-indigo-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Bars3Icon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-indigo-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Squares2X2Icon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedEnrollments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  {selectedEnrollments.length} enrollment(s) selected
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    Send Message
                  </button>
                  <button className="px-3 py-1 text-sm border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                    Export Selected
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Enrollments Display */}
      <motion.div variants={itemVariants}>
        {viewMode === 'table' ? (
          <EnrollmentsTable
            enrollments={filteredEnrollments}
            selectedEnrollments={selectedEnrollments}
            onSelectEnrollment={handleSelectEnrollment}
            onSelectAll={handleSelectAll}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            getStatusConfig={getStatusConfig}
          />
        ) : (
          <EnrollmentsGrid
            enrollments={filteredEnrollments}
            getStatusConfig={getStatusConfig}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Table View Component
const EnrollmentsTable = ({
  enrollments,
  selectedEnrollments,
  onSelectEnrollment,
  onSelectAll,
  sortBy,
  sortOrder,
  onSort,
  getStatusConfig
}) => {
  const { config } = useAnimation();

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
    >
      {children}
      {sortBy === field && (
        sortOrder === 'asc' ? 
          <ChevronUpIcon className="w-4 h-4" /> : 
          <ChevronDownIcon className="w-4 h-4" />
      )}
    </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedEnrollments.length === enrollments.length && enrollments.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortButton field="name">Student</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortButton field="course">Course</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortButton field="progress">Progress</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <SortButton field="date">Enrolled</SortButton>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <AnimatePresence>
              {enrollments.map((enrollment, index) => {
                const statusConfig = getStatusConfig(enrollment.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <motion.tr
                    key={enrollment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05, duration: config.reducedMotion ? 0.1 : 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEnrollments.includes(enrollment._id)}
                        onChange={() => onSelectEnrollment(enrollment._id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={enrollment.studentAvatar}
                          alt={enrollment.studentName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {enrollment.studentName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {enrollment.studentEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={enrollment.courseImage}
                          alt={enrollment.courseTitle}
                          className="w-12 h-8 rounded object-cover"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {enrollment.courseTitle}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            by {enrollment.instructor}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                          <motion.div
                            className="bg-indigo-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${enrollment.progress}%` }}
                            transition={{ duration: config.reducedMotion ? 0.1 : 1, delay: index * 0.1 }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
                          {enrollment.progress}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {enrollment.completedLessons}/{enrollment.totalLessons} lessons
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon className={`w-3 h-3 mr-1 ${statusConfig.color}`} />
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <div>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</div>
                      <div className="text-xs">
                        Last active: {new Date(enrollment.lastActivity).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={config.reducedMotion ? {} : { scale: 1.1 }}
                          whileTap={config.reducedMotion ? {} : { scale: 0.9 }}
                          className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={config.reducedMotion ? {} : { scale: 1.1 }}
                          whileTap={config.reducedMotion ? {} : { scale: 0.9 }}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Send Message"
                        >
                          <EnvelopeIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {enrollments.length === 0 && (
        <div className="text-center py-12">
          <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No enrollments found</p>
        </div>
      )}
    </div>
  );
};

// Grid View Component
const EnrollmentsGrid = ({ enrollments, getStatusConfig }) => {
  const { config } = useAnimation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {enrollments.map((enrollment, index) => {
          const statusConfig = getStatusConfig(enrollment.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <motion.div
              key={enrollment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: config.reducedMotion ? 0.1 : 0.4 }}
              whileHover={config.reducedMotion ? {} : { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              {/* Student Info */}
              <div className="flex items-center mb-4">
                <img
                  src={enrollment.studentAvatar}
                  alt={enrollment.studentName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {enrollment.studentName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {enrollment.studentEmail}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                  <StatusIcon className={`w-3 h-3 mr-1 ${statusConfig.color}`} />
                  {enrollment.status}
                </span>
              </div>

              {/* Course Info */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <img
                    src={enrollment.courseImage}
                    alt={enrollment.courseTitle}
                    className="w-16 h-10 rounded object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {enrollment.courseTitle}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {enrollment.instructor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{enrollment.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-indigo-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${enrollment.progress}%` }}
                    transition={{ duration: config.reducedMotion ? 0.1 : 1, delay: index * 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{enrollment.completedLessons}/{enrollment.totalLessons} lessons</span>
                  <span>{enrollment.timeSpent}</span>
                </div>
              </div>

              {/* Dates */}
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div>
                  <span className="block">Enrolled</span>
                  <span className="font-medium">{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                </div>
                <div className="text-right">
                  <span className="block">Last Active</span>
                  <span className="font-medium">{new Date(enrollment.lastActivity).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={config.reducedMotion ? {} : { scale: 1.1 }}
                    whileTap={config.reducedMotion ? {} : { scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    title="View Details"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={config.reducedMotion ? {} : { scale: 1.1 }}
                    whileTap={config.reducedMotion ? {} : { scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30"
                    title="Send Message"
                  >
                    <EnvelopeIcon className="w-4 h-4" />
                  </motion.button>
                </div>
                {enrollment.grade && (
                  <div className="text-right">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Grade</span>
                    <div className="text-lg font-bold text-indigo-600">{enrollment.grade}</div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {enrollments.length === 0 && (
        <div className="col-span-full text-center py-12">
          <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No enrollments found</p>
        </div>
      )}
    </div>
  );
};

// Loading Skeleton Component
const EnrollmentsSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start">
        <div>
          <LoadingSkeleton variant="text" width="w-64" height="h-8" />
          <LoadingSkeleton variant="text" width="w-96" height="h-4" className="mt-2" />
        </div>
        <LoadingSkeleton variant="button" width="w-32" />
      </div>
      
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <LoadingSkeleton key={index} variant="card" height="h-24" />
        ))}
      </div>
      
      {/* Filters Skeleton */}
      <LoadingSkeleton variant="card" height="h-20" />
      
      {/* Table Skeleton */}
      <LoadingSkeleton variant="card" height="h-96" />
    </div>
  );
};

export default EnhancedAdminEnrollments;
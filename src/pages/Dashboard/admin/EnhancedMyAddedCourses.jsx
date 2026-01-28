import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useAnimation } from "../../../context/AnimationProvider";
import { useDashboardContext } from "../../../hooks/useDashboardContext";
import LoadingSkeleton from "../../../Components/LoadingSkeleton";
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TagIcon,
  StarIcon,
  Squares2X2Icon,
  Bars3Icon,
  EllipsisVerticalIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

const EnhancedMyAddedCourses = () => {
  const { user } = useContext(AuthContext);
  const { config } = useAnimation();
  const { getUpdateCourseRoute, getAddCourseRoute } = useDashboardContext();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Load courses
  useEffect(() => {
    const fetchUserAddedCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://b12-a10-future-box-server-hazel.vercel.app/addedCourses?email=${user?.email}`
        );
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchUserAddedCourses();
    }
  }, [user?.email]);

  // Filter and search
  useEffect(() => {
    let filtered = courses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'rating':
          return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case 'newest':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, categoryFilter, sortBy]);

  // Handle delete course
  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(
        `https://b12-a10-future-box-server-hazel.vercel.app/addedCourses/${courseId}`
      );
      
      if (response.data.deletedCount > 0) {
        setCourses(prev => prev.filter(course => course._id !== courseId));
        toast.success("Course deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    } finally {
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  // Get unique categories
  const categories = ["All", ...new Set(courses.map(course => course.category))];

  // Statistics
  const stats = {
    total: courses.length,
    published: courses.filter(c => c.status !== 'draft').length,
    totalRevenue: courses.reduce((sum, course) => sum + (parseFloat(course.price) || 0), 0),
    avgRating: courses.length > 0 ? 
      (courses.reduce((sum, course) => sum + (parseFloat(course.rating) || 0), 0) / courses.length).toFixed(1) : 0
  };

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

  if (isLoading) {
    return <CoursesSkeleton />;
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>My Added Courses | Enhanced Dashboard</title>
      </Helmet>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
            <BookOpenIcon className="w-8 h-8 mr-3 text-emerald-600" />
            My Added Courses
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage and monitor your created courses
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center gap-4">
          <NavLink
            to={getAddCourseRoute()}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <PlusIcon className="w-4 h-4" />
            Add New Course
          </NavLink>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
                <BookOpenIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Courses</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Published</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.published}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Value</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">${stats.totalRevenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 shadow-lg">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Rating</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.avgRating}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div variants={itemVariants}>
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 dark:focus:border-emerald-600 dark:bg-slate-700/50 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="price-low">Price Low-High</option>
                <option value="price-high">Price High-Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
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
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-indigo-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Bars3Icon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Courses Display */}
      <motion.div variants={itemVariants}>
        {filteredCourses.length === 0 ? (
          <EmptyState searchTerm={searchTerm} addCourseRoute={getAddCourseRoute()} />
        ) : viewMode === 'grid' ? (
          <CoursesGrid 
            courses={filteredCourses} 
            onDeleteCourse={(course) => {
              setCourseToDelete(course);
              setShowDeleteModal(true);
            }}
          />
        ) : (
          <CoursesList 
            courses={filteredCourses} 
            onDeleteCourse={(course) => {
              setCourseToDelete(course);
              setShowDeleteModal(true);
            }}
          />
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            course={courseToDelete}
            onConfirm={() => handleDeleteCourse(courseToDelete._id)}
            onCancel={() => {
              setShowDeleteModal(false);
              setCourseToDelete(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Grid View Component
const CoursesGrid = ({ courses, onDeleteCourse }) => {
  const { config } = useAnimation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1, duration: config.reducedMotion ? 0.1 : 0.4 }}
            whileHover={config.reducedMotion ? {} : { y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image || "https://via.placeholder.com/400x200"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-1">
                  <CourseActions 
                    course={course} 
                    onDelete={onDeleteCourse} 
                    updateCourseRoute={getUpdateCourseRoute(course._id)}
                  />
                </div>
              </div>
              {course.isFeatured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-2">
                  {course.title}
                </h3>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                {course.description || "No description available"}
              </p>

              {/* Course Meta */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">
                    <TagIcon className="w-3 h-3 mr-1" />
                    {course.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <StarIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {course.rating || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${course.price}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Level: {course.level} • Instructor: {course.instructor}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <NavLink
                  to={`/viewDetails/${course._id}`}
                  className="flex-1 px-3 py-2 text-center text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md"
                >
                  View Details
                </NavLink>
                <NavLink
                  to={getUpdateCourseRoute(course._id)}
                  className="px-3 py-2 text-sm border border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50/70 dark:hover:bg-slate-700/70 transition-all duration-200"
                >
                  Edit
                </NavLink>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// List View Component
const CoursesList = ({ courses, onDeleteCourse }) => {
  const { config } = useAnimation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <AnimatePresence>
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05, duration: config.reducedMotion ? 0.1 : 0.3 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-6">
                {/* Course Image */}
                <div className="relative w-24 h-16 flex-shrink-0">
                  <img
                    src={course.image || "https://via.placeholder.com/96x64"}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {course.isFeatured && (
                    <div className="absolute -top-1 -right-1">
                      <span className="bg-yellow-500 text-white px-1 py-0.5 rounded-full text-xs">
                        ★
                      </span>
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-1">
                        {course.description || "No description available"}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center">
                          <TagIcon className="w-3 h-3 mr-1" />
                          {course.category}
                        </span>
                        <span className="inline-flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {course.duration}
                        </span>
                        <span className="inline-flex items-center">
                          <CurrencyDollarIcon className="w-3 h-3 mr-1" />
                          ${course.price}
                        </span>
                        <span className="inline-flex items-center">
                          <StarIcon className="w-3 h-3 mr-1" />
                          {course.rating || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <NavLink
                        to={`/viewDetails/${course._id}`}
                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </NavLink>
                      <NavLink
                        to={getUpdateCourseRoute(course._id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Course"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </NavLink>
                      <button
                        onClick={() => onDeleteCourse(course)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Course"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Course Actions Dropdown
const CourseActions = ({ course, onDelete, updateCourseRoute }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <EllipsisVerticalIcon className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 top-full mt-1 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 z-10"
          >
            <div className="py-1">
              <NavLink
                to={`/viewDetails/${course._id}`}
                className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <EyeIcon className="w-4 h-4 mr-2" />
                View Details
              </NavLink>
              <NavLink
                to={updateCourseRoute}
                className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Course
              </NavLink>
              <button
                onClick={() => {
                  onDelete(course);
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/70 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Course
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ searchTerm, addCourseRoute }) => (
  <div className="text-center py-12">
    <BookOpenIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
      {searchTerm ? "No courses found" : "No courses added yet"}
    </h3>
    <p className="text-slate-500 dark:text-slate-400 mb-6">
      {searchTerm 
        ? "Try adjusting your search or filters" 
        : "Start by creating your first course to share your knowledge"
      }
    </p>
    {!searchTerm && (
      <NavLink
        to={addCourseRoute}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Add Your First Course
      </NavLink>
    )}
  </div>
);

// Delete Confirmation Modal
const DeleteModal = ({ course, onConfirm, onCancel }) => {
  const { config } = useAnimation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
            <TrashIcon className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Course
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              This action cannot be undone
            </p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "<strong>{course?.title}</strong>"? 
          This will permanently remove the course and all associated data.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={onConfirm}
            whileHover={config.reducedMotion ? {} : { scale: 1.02 }}
            whileTap={config.reducedMotion ? {} : { scale: 0.98 }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Course
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Loading Skeleton Component
const CoursesSkeleton = () => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingSkeleton key={index} variant="card" height="h-24" />
        ))}
      </div>
      
      {/* Filters Skeleton */}
      <LoadingSkeleton variant="card" height="h-20" />
      
      {/* Courses Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} variant="card" height="h-80" />
        ))}
      </div>
    </div>
  );
};

export default EnhancedMyAddedCourses;
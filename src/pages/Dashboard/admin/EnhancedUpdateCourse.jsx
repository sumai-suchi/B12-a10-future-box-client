import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useAnimation } from "../../../context/AnimationProvider";
import { useDashboardContext } from "../../../hooks/useDashboardContext";
import LoadingSkeleton from "../../../Components/LoadingSkeleton";
import {
  PhotoIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TagIcon,
  StarIcon,
  AcademicCapIcon,
  UserIcon,
  CheckCircleIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  EyeIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

const EnhancedUpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { config } = useAnimation();
  const { getMyCoursesRoute } = useDashboardContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    duration: "",
    category: "",
    description: "",
    rating: "",
    level: "",
    instructor: "",
    isFeatured: false
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: config.reducedMotion ? 0.1 : 0.6,
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

  // Load course data
  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call - replace with actual API endpoint
        const mockCourseData = {
          title: "Advanced React Development",
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
          price: "149.99",
          duration: "12 weeks",
          category: "Web Development",
          description: "Master advanced React concepts including hooks, context, performance optimization, and modern patterns. Build real-world applications with confidence.",
          rating: "4.8",
          level: "Advanced",
          instructor: "John Doe",
          isFeatured: true
        };
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setFormData(mockCourseData);
        setOriginalData(mockCourseData);
        setImagePreview(mockCourseData.image);
        
      } catch (error) {
        console.error("Error loading course data:", error);
        toast.error("Failed to load course data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCourseData();
    }
  }, [id]);

  // Check for changes
  useEffect(() => {
    if (originalData) {
      const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
      setHasChanges(hasFormChanges);
    }
  }, [formData, originalData]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }
    if (!formData.level.trim()) newErrors.level = "Level is required";
    if (!formData.instructor.trim()) newErrors.instructor = "Instructor name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle image URL input
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    if (url) {
      setImagePreview(url);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    const courseData = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating)
    };

    try {
      // Simulate API call - replace with actual update endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Course updated successfully!");
      setOriginalData(formData);
      setHasChanges(false);
      
      // Navigate back to courses list
      navigate(getMyCoursesRoute());
      
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to original data
  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
      setImagePreview(originalData.image);
      setErrors({});
      setHasChanges(false);
    }
  };

  // Predefined options
  const categories = [
    "Web Development", "Mobile Development", "Data Science", "Machine Learning",
    "UI/UX Design", "Digital Marketing", "Business", "Photography", "Music", "Other"
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Helmet>
          <title>Loading Course... | Enhanced Dashboard</title>
        </Helmet>
        
        <div className="text-center space-y-4">
          <LoadingSkeleton variant="text" width="w-64" height="h-8" className="mx-auto" />
          <LoadingSkeleton variant="text" width="w-48" height="h-4" className="mx-auto" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <LoadingSkeleton variant="card" count={1} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>Update Course | Enhanced Dashboard</title>
      </Helmet>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
              <PencilSquareIcon className="w-8 h-8 mr-3 text-emerald-600" />
              Update Course
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Course ID: <span className="font-mono text-sm bg-slate-100/70 dark:bg-slate-700/70 px-2 py-1 rounded">{id}</span>
            </p>
          </div>
        </div>
        
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-700"
          >
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Unsaved changes</span>
          </motion.div>
        )}
      </motion.div>

      {/* Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
      >
        <div className="p-8 space-y-8">
          
          {/* Course Image Upload */}
          <div className="space-y-4">
            <label className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              <PhotoIcon className="w-5 h-5 mr-2" />
              Course Image
            </label>
            
            {/* Drag and Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Course preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open(imagePreview, '_blank')}
                    className="absolute top-2 left-2 p-1 bg-gray-800 bg-opacity-75 text-white rounded-full hover:bg-opacity-100 transition-all"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <CloudArrowUpIcon className="w-16 h-16 mx-auto text-gray-400" />
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Drop your image here, or{" "}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Image URL Input */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="Or paste image URL here..."
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Course Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Course Title */}
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Course Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter an engaging course title..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all ${
                  errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                Price (USD) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="99.99"
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all ${
                  errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <ClockIcon className="w-4 h-4 mr-2" />
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 8 weeks, 40 hours"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all ${
                  errors.duration ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <TagIcon className="w-4 h-4 mr-2" />
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all ${
                  errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Level */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <AcademicCapIcon className="w-4 h-4 mr-2" />
                Difficulty Level *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all ${
                  errors.level ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select difficulty level</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              {errors.level && (
                <p className="text-red-500 text-sm mt-1">{errors.level}</p>
              )}
            </div>

            {/* Instructor */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <UserIcon className="w-4 h-4 mr-2" />
                Instructor Name *
              </label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                placeholder="Instructor name"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all ${
                  errors.instructor ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.instructor && (
                <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <StarIcon className="w-4 h-4 mr-2" />
                Rating *
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="4.5"
                min="1"
                max="5"
                step="0.1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all ${
                  errors.rating ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
              <DocumentTextIcon className="w-4 h-4 mr-2" />
              Course Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              placeholder="Describe what students will learn in this course..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="isFeatured" className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              Mark as Featured Course
            </label>
          </div>

          {/* Course Creator Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Course Creator</h3>
            <div className="flex items-center space-x-3">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="Creator"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 dark:bg-gray-700 px-8 py-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              {hasChanges && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                >
                  Reset Changes
                </button>
              )}
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting || !hasChanges}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
                isSubmitting || !hasChanges
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
              }`}
              whileHover={config.reducedMotion || isSubmitting || !hasChanges ? {} : { scale: 1.02 }}
              whileTap={config.reducedMotion || isSubmitting || !hasChanges ? {} : { scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Updating Course...</span>
                </div>
              ) : (
                'Update Course'
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default EnhancedUpdateCourse;
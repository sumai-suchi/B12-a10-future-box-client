import { useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useAnimation } from "../../../context/AnimationProvider";
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
  EyeIcon
} from "@heroicons/react/24/outline";

const EnhancedAddCourse = () => {
  const { user } = useContext(AuthContext);
  const { config } = useAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
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
      name: user?.displayName,
      email: user?.email,
      UserImage: user?.photoURL,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating)
    };

    try {
      const res = await axios.post(
        `https://b12-a10-future-box-server-hazel.vercel.app/addedCourses`,
        courseData
      );
      
      if (res.data.insertedId) {
        toast.success("Course added successfully!");
        // Reset form
        setFormData({
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
        setImagePreview(null);
        setErrors({});
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Predefined options
  const categories = [
    "Web Development", "Mobile Development", "Data Science", "Machine Learning",
    "UI/UX Design", "Digital Marketing", "Business", "Photography", "Music", "Other"
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>Add New Course | Enhanced Dashboard</title>
      </Helmet>

      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Create New Course
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Share your knowledge and create an engaging learning experience
        </p>
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
            <label className="flex items-center text-lg font-semibold text-slate-800 dark:text-slate-100">
              <PhotoIcon className="w-5 h-5 mr-2" />
              Course Image
            </label>
            
            {/* Drag and Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20'
                  : 'border-slate-300/50 dark:border-slate-600/50 hover:border-emerald-400'
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
                    <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
                      Drop your image here, or{" "}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-emerald-600 hover:text-emerald-700 font-semibold"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
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
                  className="w-full px-4 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-300 dark:focus:border-emerald-600 dark:bg-slate-700/50 dark:text-slate-100 transition-all duration-200"
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
                Initial Rating *
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

          {/* User Info Display */}
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
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setFormData({
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
                setImagePreview(null);
                setErrors({});
              }}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Reset Form
            </button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
              }`}
              whileHover={config.reducedMotion ? {} : { scale: 1.02 }}
              whileTap={config.reducedMotion ? {} : { scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Course...</span>
                </div>
              ) : (
                'Create Course'
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default EnhancedAddCourse;
import CourseImg from "../assets/student-class-looking-course.jpg";
import { useLocation } from "react-router";
import CourseCard from "../Components/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const AllCourses = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]); // Fixed casing conventions (cC -> c)
  const [selectedCategories, setSelectedCategories] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/Category`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingData(true);
        const url = selectedCategories && selectedCategories !== "Filter by Category"
          ? `http://localhost:3000/courses?category=${selectedCategories}`
          : `http://localhost:3000/courses`;
        const res = await axios.get(url);
        setCourses(res.data);
      } catch (error) {
        toast.error(error.message || "Failed to load courses");
      } finally {
        setLoadingData(false);
      }
    };
    fetchCourses();
  }, [selectedCategories]);

  const location = useLocation();

  return (
    <div className="w-full min-h-screen bg-[#070A13] text-white font-sans antialiased">
      <Helmet>
        <title>Future-Box | All Courses</title>
      </Helmet>

      {/* Hero Header Section */}
      <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden group">
        <img 
          src={CourseImg} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt="Courses Banner" 
        />
        {/* Sleek Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A13] via-[#070a13b4] to-transparent" />
        
        <div className="absolute bottom-12 left-6 md:left-16 max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Premium Catalog</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            Featured Pathways
          </h1>
          <p className="text-sm md:text-base text-gray-300 font-medium">
            Home <span className="text-cyan-400 mx-1">/</span> {location.pathname.replace("/", "") || "Courses"}
          </p>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-gray-400 text-sm">Explore top interactive tracks curated for your tech growth.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <select
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
            className="w-full bg-[#111726] border border-gray-800 text-gray-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer appearance-none transition-all duration-200"
          >
            <option value="">Filter by Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat} className="bg-[#111726]">
                {cat}
              </option>
            ))}
          </select>
          {/* Custom Dropdown Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Course Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {loadingData ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <span className="animate-spin inline-block w-12 h-12 border-[4px] border-current border-t-transparent text-cyan-400 rounded-full" role="status"></span>
            <p className="text-gray-400 text-sm tracking-wider animate-pulse">Loading amazing pathways...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl bg-[#0d1220]">
            <p className="text-gray-400 text-lg">No courses found matching this criteria.</p>
          </div>
        ) : (
          /* Asymmetric Dashboard Grid Style */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {courses.map((course, index) => {
              // Option: If you want to replicate the exact image where item 1 spans 2 columns
              const isFeatured = index === 0 && !selectedCategories; 
              
              return (
                <div 
                  key={course._id || index}
                  className={`${
                    isFeatured 
                      ? "md:col-span-2 lg:col-span-2" 
                      : "col-span-1"
                  } transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <CourseCard course={course} isFeatured={isFeatured} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
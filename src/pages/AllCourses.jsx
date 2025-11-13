import CourseImg from "../assets/student-class-looking-course.jpg";
import { useLocation } from "react-router";
import CourseCard from "../Components/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const AllCourses = () => {
  const [categories, setCategories] = useState([]);
  const [Courses, setCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      const categories = await axios.get(`http://localhost:3000/Category`);
      setCategories(categories.data);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = selectedCategories
          ? `http://localhost:3000/courses?category=${selectedCategories}`
          : `http://localhost:3000/courses`;
        const categories = await axios.get(url);
        setCourses(categories.data);
      } catch (error) {
        toast(error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchCourses();
  }, [selectedCategories]);

  const location = useLocation();

  return (
    <div className="w-full ">
      <Helmet>
        <title> Future-Box | AllCourses</title>
      </Helmet>
      <div className="relative ">
        <p className="absolute text-white text-3xl font-semibold top-30 right-180">
          Home {location.pathname}
        </p>
        <img src={CourseImg} className="w-full h-[450px]" alt="" />
      </div>

      <div className="w-2xl text-center mt-11">
        <select
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value)}
          className="select appearance-none"
        >
          <option>Filter by Category</option>

          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        {loadingData ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : (
          <div className="w-10/12 mx-auto my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Courses?.map((course) => (
              <CourseCard key={course._id} course={course}></CourseCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;

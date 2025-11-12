import Aos from "aos";
import { Star } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router";
import "aos/dist/aos.css";

const CourseCard = ({ course }) => {
  console.log(course);
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  return (
    <div
      className="max-w-sm  flex flex-col justify-center items-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      data-aos="zoom-in"
      data-aos-delay="200"
    >
      <img
        src={course?.image}
        alt={course.title}
        className="w-full object-cover  h-44 "
      />

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-indigo-600 font-semibold bg-indigo-50 dark:bg-indigo-800 dark:text-indigo-300 px-2 py-1 rounded-lg">
            {course.category}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {course.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {course?.description?.length > 100
            ? course.description.slice(0, 100) + "..."
            : course.description}
        </p>

        <div className="flex justify-between items-center pt-3">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Instructor:
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-100">
              {course.instructor}
            </p>
          </div>
          <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
            ${course.price}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
          <span>{course.duration}</span>
          <span>{course.level}</span>
        </div>

        <NavLink
          to={`/viewDetails/${course._id}`}
          className="w-full mt-3 btn bg-linear-to-r from-[#793ac7]/50 to-black/70 text-white font-semibold py-2 rounded-xl transition-colors duration-300"
        >
          See Details
        </NavLink>
      </div>
    </div>
  );
};

export default CourseCard;

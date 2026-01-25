import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const EnrolledCourseCard = ({ data }) => {
  const {
    category,
    description,
    email,
    image,
    instructor,
    price,
    title,
  } = data;

  // Initialize AOS inside the component
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // only animate once
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 md:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center"
    >
      {/* Image & Category */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <div className="relative w-full md:w-80 h-48 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="mt-3 text-sm md:text-lg font-semibold text-blue-700">
          {category}
        </h2>
        <p className="mt-2 text-gray-600 text-xs md:text-sm">
          {description.length > 130
            ? description.slice(0, 130) + "..."
            : description}
        </p>
      </div>

      {/* Course Info */}
      <div className="flex-1 flex flex-col justify-between">
        <h1 className="text-lg md:text-xl font-bold text-slate-800">
          {title}
        </h1>
        <p className="text-sm md:text-md text-gray-700">
          Instructor: <span className="font-medium">{instructor}</span>
        </p>
        <p className="text-sm md:text-md text-gray-700">
          Price: <span className="font-medium">${price}</span>
        </p>
        <p className="text-sm md:text-md text-gray-700">
          Email: <span className="font-medium">{email}</span>
        </p>

        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-2xl transition-all duration-300 w-full md:w-auto">
          Start Course
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;

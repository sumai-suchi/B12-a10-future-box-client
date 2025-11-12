import { Star } from "lucide-react";

const InstructorCard = ({ instructor }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 w-6/12 mx-auto"
    >
      {/* Instructor Image */}
      <div className="relative">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
          <Star size={16} className="text-yellow-400" />
          {instructor.rating.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {instructor.name}
        </h3>
        <p className="text-blue-600 font-medium text-sm mb-2">
          {instructor.expertise}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
          {instructor.bio}
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 text-gray-700 dark:text-gray-300 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-semibold">
              {instructor.students.toLocaleString()}
            </span>
            <span className="text-xs">Students</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold">{instructor.courses}</span>
            <span className="text-xs">Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;

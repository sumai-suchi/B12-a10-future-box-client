import { useAllCoursesData } from "../hook/useAllCoursesData";
import CourseImg from "../assets/student-class-looking-course.jpg";
import { useLocation } from "react-router";
import CourseCard from "../Components/CourseCard";

const AllCourses = () => {
  const { allCourses, loadingData } = useAllCoursesData();
  const location = useLocation();
  console.log(location);
  return (
    <div className="w-full ">
      <div className="relative ">
        <p className="absolute text-white text-3xl font-semibold top-30 right-180">
          Home {location.pathname}
        </p>
        <img src={CourseImg} className="w-full h-[450px]" alt="" />
      </div>
      <div>
        {loadingData ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : (
          <div className="w-10/12 mx-auto my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCourses?.map((course) => (
              <CourseCard key={course._id} course={course}></CourseCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;

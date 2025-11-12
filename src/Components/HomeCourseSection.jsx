import CourseCard from "./CourseCard";
import { useAllCoursesData } from "../hook/useAllCoursesData";
import Title from "../HomeComponents/Title";

const HomeCourseSection = () => {
  const { allCourses, loadingData } = useAllCoursesData();

  const SomeData = allCourses.slice(0, 6);

  return (
    <div className="">
      <Title title={"Popular Courses"} info={"explore popular courses"}></Title>
      <div className="bg-blue-50 py-5 mt-1">
        {loadingData ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : (
          <div className="w-10/12 mx-auto my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SomeData?.map((course) => (
              <CourseCard key={course._id} course={course}></CourseCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCourseSection;

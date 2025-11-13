import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import EnrolledCourseCard from "../Components/EnrolledCourseCard";

const MyEnrolledCourse = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const [enrollData, setEnrollData] = useState([]);
  useEffect(() => {
    const MyEnrolledDataFetch = async () => {
      try {
        const res = await axios.get(
          `https://b12-a10-future-box-server-hazel.vercel.app/EnrolledData?email=${user?.email}`
        );
        setEnrollData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    MyEnrolledDataFetch();
  }, [user?.email]);
  return (
    <div className="">
      <h1 className="text-xl md:text-3xl font-bold text-center text-white">
        Your Enrolled Courses
      </h1>

      <div className="grid grid-cols-1 gap-5 p-2 md:p-6 mt-4 ">
        {enrollData.map((data) => (
          <EnrolledCourseCard key={data._id} data={data}></EnrolledCourseCard>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourse;

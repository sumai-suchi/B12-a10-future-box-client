import axios from "axios";
import { useContext, useEffect, useState } from "react";

import EnrolledCourseCard from "../../../Components/EnrolledCourseCard";
import { AuthContext } from "../../../context/AuthContext";


const MyEnrolledCourse = () => {
  const { user } = useContext(AuthContext);
  const [enrollData, setEnrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledData = async () => {
      if (!user?.email) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `https://b12-a10-future-box-server-hazel.vercel.app/EnrolledData?email=${user.email}`
        );
        setEnrollData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your enrolled courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledData();
  }, [user?.email]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-6">
        Your Enrolled Courses
      </h1>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-slate-500">Loading your courses...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-600 font-medium">{error}</p>
      )}

      {/* Empty State */}
      {!loading && enrollData.length === 0 && !error && (
        <p className="text-center text-slate-500">
          You haven’t enrolled in any course yet.
        </p>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {enrollData.map((course) => (
          <EnrolledCourseCard key={course._id} data={course} />
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourse;

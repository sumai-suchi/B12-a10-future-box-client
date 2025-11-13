import axios from "axios";
import { useEffect, useState } from "react";

export const useAllCoursesData = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `https://b12-a10-future-box-server-hazel.vercel.app/courses`
        );
        setAllCourses(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchCourses();
  }, []);

  return { allCourses, loadingData, error };
};

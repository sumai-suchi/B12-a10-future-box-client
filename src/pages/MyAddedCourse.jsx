import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router";

const MyAddedCourse = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  const handleDeleteCourse = async (id) => {
    const resDelete = await axios.delete(
      `https://b12-a10-future-box-server-hazel.vercel.app/addedCourses/${id}`
    );
    console.log(resDelete?.data);
    if (resDelete?.data.deletedCount > 0) {
      const RemoveData = userData.filter((newD) => newD._id != id);
      setUserData(RemoveData);
      toast("Course deleted successfully");
    }
  };

  useEffect(() => {
    const fetchUserAddedCourse = async () => {
      try {
        const addedData = await axios.get(
          `https://b12-a10-future-box-server-hazel.vercel.app/addedCourses?email=${user?.email}`
        );
        setUserData(addedData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAddedCourse();
  }, [user?.email]);

  console.log(userData);

  return (
    <div className="flex flex-col gap-2.5">
      {userData?.length === 0 ? (
        <div className="text-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            There is no Course added here
          </h1>
        </div>
      ) : (
        userData?.map((data) => (
          <div
            key={data._id}
            className="flex flex-col md:flex-row mt-7 gap-4 md:gap-28 bg-black/50 rounded-2xl  text-white opacity-70 p-3"
          >
            <div className="flex gap-2 ">
              <img src={data?.image} className="w-2xs h-28" alt="" />

              <div className="flex flex-col">
                <h1 className="font-semibold text-xl">{data?.title}</h1>
                <p className="text-sm">{data?.duration}</p>

                <div className="badge badge-outline badge-secondary">
                  ${data?.price}
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 md:gap-32">
              <div className="flex space-y-4 flex-col">
                <h1 className="font-bold">Category</h1>

                <div className="badge badge-secondary">{data?.category}</div>
              </div>
              <div className="flex flex-col space-y-4">
                <h1 className="font-bold">Remove</h1>
                <button
                  className="badge badge-dash badge-secondary"
                  onClick={() => handleDeleteCourse(data?._id)}
                >
                  Delete
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <h1 className="font-bold">Update Data</h1>
                <NavLink
                  to={`/dashboard/UpdateDataInfo/${data?._id}`}
                  className="badge badge-dash badge-secondary"
                >
                  Update
                </NavLink>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAddedCourse;

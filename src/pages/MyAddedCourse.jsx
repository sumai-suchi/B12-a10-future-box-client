import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const MyAddedCourse = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserAddedCourse = async () => {
      try {
        const addedData = await axios.get(
          `http://localhost:3000/addedCourses?email=${user?.email}`
        );
        setUserData(addedData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAddedCourse();
  }, [user?.email]);

  console.log(userData);

  //   category
  // :
  // "Design"
  // duration
  // :
  // "7 weeks"
  // email
  // :
  // "rai@gmail.com"
  // image
  // :
  // "https://i.ibb.co.com/sdd6ms0g/Banner.jpg"
  // price
  // :
  // "900"
  // title
  // :
  // "UI UX Design"
  // _id
  // :
  // "691416026d567fb7a64e3b77"

  return (
    <div className="flex flex-col gap-2.5">
      {userData?.map((data) => (
        <div
          key={data._id}
          className="flex  justify-around bg-fuchsia-50 rounded-2xl  text-fuchsia-950 opacity-70 p-3"
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

          <div className="flex space-y-4 flex-col">
            <h1 className="font-bold">Category</h1>

            <div className="badge badge-secondary">{data?.category}</div>
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="font-bold">Remove</h1>
            <div className="badge badge-dash badge-secondary">Delete</div>
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="font-bold">Update Data</h1>
            <div className="badge badge-dash badge-secondary">Update</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAddedCourse;

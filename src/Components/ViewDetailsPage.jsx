import { useLocation, useParams } from "react-router";
import detailsImg from "../assets/premium_photo-1683120887619-8e6eca48afcb.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
import useAxios from "../hook/useAxios";

const ViewDetailsPage = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const { id } = useParams();
  console.log(id);
  const location = useLocation();
  console.log(location);
  const path = location.pathname.split("/");
  console.log(path[1]);

  const [detailsData, setDetails] = useState({});
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(true);
    const axiosInstance=useAxios();


  useEffect(() => {
    const courseDetailsFetch = async () => {
      try {
        const res = await axios.get(
          `https://b12-a10-future-box-server-hazel.vercel.app/viewDetails/${id}`
        );
        // const data = await res.data;
        setDetails(res.data);
        // if (res.data) {
        //   setDetailsData(res.data);
        // } else {
        //   setError("there is not dat");
        // }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    courseDetailsFetch();
  }, [id]);

  console.log(detailsData);

const handleUserEnroll = async () => {
  if (!user?.email) {
    console.log
    toast.error("User email not found. Please login first.");
    return;
  }

  const EnrollInformation = { ...detailsData, email: user?.email };

  try {
    // Optional: show loading state
    const res = await axiosInstance.post(
      "/enrolledUserData",
      EnrollInformation
    );

    if (res.status === 201 || res.data.insertedId) {
      toast.success("You have enrolled successfully!");
    } else {
      toast.error("Enrollment failed. Please try again.");
    }
  } catch (error) {
    console.error("Enroll API error:", error);
    toast.error("Network error. Please try again later.");
  }
};

  return (
    <div>
      <div className="relative">
        <img src={detailsImg} className="w-full h-[400px]" alt="" />
        <p className="absolute  top-14  left-5/12 text-white font-bold md:text-5xl">
          {path[1]}
        </p>
      </div>

      <div className="w-11/12 mx-auto my-20 flex flex-col md:flex-row justify-around  ">
        <div className="" data-aos="zoom-in" data-aos-delay="200">
          <h1 className="text-2xl font-bold">{detailsData.title}</h1>
          <img
            className="my-2 rounded-2xl w-2xl h-96"
            src={detailsData?.image}
            alt=""
          />
          <h1 className="font-bold text-xl">Description :</h1>
          <p className="w-full lg:w-2xl text-gray-400">
            {" "}
            {detailsData?.description}
          </p>

          <button className="btn w-2xs my-2" onClick={handleUserEnroll}>
            Enroll Now
          </button>
        </div>

        <div className="  " data-aos="flip-up" data-aos-delay="200">
          <div className="flex bg-fuchsia-300 w-2xs text-xl rounded-2xl h-full my-7 space-y-6 font-semibold flex-col justify-center items-center">
            <h2>Duration : {detailsData.duration}</h2>
            <hr className="text-fuchsia-950 w-44" />
            <h2> Level : {detailsData.level}</h2>
            <hr className="text-fuchsia-950 w-44" />
            <h2>Language : English</h2>
            <hr className="text-fuchsia-950 w-44" />
            <h2> Price :{detailsData.price}</h2>
            <hr className="text-fuchsia-950 w-44" />
            <h2>Certificate : Included</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsPage;

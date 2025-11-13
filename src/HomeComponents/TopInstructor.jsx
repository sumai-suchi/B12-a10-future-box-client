import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Title from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import InstructorCard from "../Components/InstructorCard";

const TopInstructor = () => {
  const [instructorData, setInstructorData] = useState([]);

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const data = await axios.get(
          `https://b12-a10-future-box-server-hazel.vercel.app/InstructorData`
        );
        console.log(data.data);
        setInstructorData(data.data);
      } catch (error) {
        toast(`${error}`);
      }
    };
    fetchInstructorData();
  }, []);

  console.log(instructorData);

  return (
    <div className="w-10/12 mx-auto">
      <div>
        <Title
          title={"Top Instructor"}
          info={"Experienced and Skilled"}
        ></Title>
      </div>
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <div className="w-8/12 mx-auto">
            {instructorData.map((instructor) => (
              <SwiperSlide key={instructor._id}>
                <InstructorCard instructor={instructor}></InstructorCard>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default TopInstructor;

import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

const Title = ({ title }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div
      className="my-20 text-4xl flex flex-col justify-center items-center gap-1 font-bold  text-center "
      data-aos="zoom-in-right"
      data-aos-delay="200"
    >
      <h1 className="text-blue-950 text-6xl ">{title}</h1>
    </div>
  );
};

export default Title;

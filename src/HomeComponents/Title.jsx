import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

const Title = ({ title, info }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div
      className="mt-12 text-4xl flex flex-col justify-center items-center gap-4 font-bold  text-center "
      data-aos="zoom-in-right"
      data-aos-delay="200"
    >
      <h1 className="text-blue-950">{title}</h1>
      <hr className="text-blue-950 w-2xs font-bold py-2   " />
      <p className="text-blue-800 text-sm opacity-80">{info}</p>
    </div>
  );
};

export default Title;

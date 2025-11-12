import { useEffect } from "react";
import heroImg from "../assets/close-up-hand-writing-notebook-top-view.jpg";
import girlImg from "../assets/student-with-book-pen-library (1).png";
import Aos from "aos";
import "aos/dist/aos.css";

const HomeHero = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  return (
    <div
      className="relative w-full  h-screen  bg-center  bg-cover"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="inset-0 absolute  bg-white/50">
        <div className="flex my-24  gap-10  justify-center items-center">
          <div
            className="max-w-md left-0.5 md:left-6 bottom-36 absolute p-2 md:p-6 rounded-2xl bg-white/70  bg-blur "
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="mb-5 text-2xl md:text-5xl font-bold">
              Learn With Us
            </h1>
            <p className="mb-5">
              "Learn anytime, anywhere. Join thousands of learners leveling up
              their skills through our hands-on courses and expert guidance.
              Your journey to success starts here!"
            </p>

            <button className="btn btn-dash">Explore here</button>
          </div>
          <div
            className="max-w-md  top-3.5 left-40   absolute p-6 rounded-2xl bg-white/70  bg-blur hidden md:block "
            data-aos="slide-right"
            data-aos-delay="200"
          >
            <h1 className="mb-5 text-2xl md:text-5xl font-bold">
              A smarter way to learn.
            </h1>
            <p className="mb-5">
              "Learn without limits. Connect with learners from around the world
              and build the skills that shape your future."
            </p>

            <button className="btn btn-dash">Start with us</button>
          </div>

          <div className="bottom-0 absolute right-10  w-4xl hidden md:block">
            <img
              src={girlImg}
              className="w-full "
              alt=""
              data-aos="fade-up"
              data-aos-delay="200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;

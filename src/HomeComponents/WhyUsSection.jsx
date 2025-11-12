import { CheckCircle } from "lucide-react";
import Title from "./Title";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const WhyUsSection = () => {
  const features = [
    "100% engaging and practical lessons.",
    "Personalized learning paths for each student.",
    "Hands-on projects and real-world examples.",
    "Community support and mentorship access.",
  ];
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div>
      <div>
        <Title title={"Why Us!!"}></Title>
      </div>
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Left Box 1 */}
          <div
            className="bg-white rounded-2xl border border-blue-200 shadow-md p-8 hover:shadow-lg transition"
            data-aos="flip-up"
            data-aos-delay="200"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              PROFESSIONAL INSTRUCTORS
            </h2>
            <p className="text-gray-600 mb-6">
              Learn from professional instructors with years of experience who
              guide you step-by-step through real-world lessons designed to help
              you grow your skills confidently.
            </p>

            <ul className="space-y-3">
              {features.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Box 2 */}
          <div
            className="bg-white rounded-2xl border border-indigo-200 shadow-md p-8 hover:shadow-lg transition"
            data-aos="flip-up"
            data-aos-delay="200"
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-3">
              COMPLETE & SPECIAL COURSES
            </h2>
            <p className="text-gray-600 mb-6">
              Our special courses are designed for all levels — from beginners
              to advanced learners. Each course is structured to make learning
              fun, interactive, and goal-oriented.
            </p>

            <ul className="space-y-3">
              {features.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Left Card 3 */}
          <div
            className="bg-white rounded-2xl border border-purple-200 shadow-md p-8 hover:shadow-lg transition"
            data-aos="flip-up"
            data-aos-delay="200"
          >
            <h2 className="text-2xl font-bold text-purple-700 mb-3">
              FLEXIBLE LEARNING
            </h2>
            <p className="text-gray-600 mb-6">
              Learn at your own pace with flexible schedules and resources that
              allow you to balance learning with daily life.
            </p>
            <ul className="space-y-3">
              {features.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card 4 */}
          <div
            className="bg-white rounded-2xl border border-teal-200 shadow-md p-8 hover:shadow-lg transition"
            data-aos="flip-up"
            data-aos-delay="200"
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              CERTIFIED COURSES
            </h2>
            <p className="text-gray-600 mb-6">
              Earn certificates to showcase your skills and achievements,
              helping you grow professionally.
            </p>
            <ul className="space-y-3">
              {features.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUsSection;

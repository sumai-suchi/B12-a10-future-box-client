import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { useAnimation } from "../context/AnimationProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EnhancedTitle from "./EnhancedTitle";
import EnhancedInstructorCard from "../Components/EnhancedInstructorCard";
import LoadingSkeleton from "../Components/LoadingSkeleton";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const EnhancedTopInstructor = () => {
  const { config } = useAnimation();
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        setLoading(true);
        const data = await axios.get(
          `https://b12-a10-future-box-server-hazel.vercel.app/InstructorData`
        );
        setInstructorData(data.data);
      } catch (error) {
        toast.error(`Failed to load instructors: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructorData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.reducedMotion ? 0 : 0.1,
        delayChildren: config.reducedMotion ? 0 : 0.2
      }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50/30 dark:from-slate-900 dark:via-indigo-900/50 dark:to-purple-900/30 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: config.reducedMotion ? 0 : 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-2xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: config.reducedMotion ? 0 : 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Enhanced Title */}
        <EnhancedTitle
          title="Meet Our Experts"
          subtitle="Learn from industry professionals who bring real-world experience and passion to every lesson"
          badge="⭐ Top Rated"
        />

        {/* Instructor Carousel */}
        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <LoadingSkeleton key={index} variant="card" />
              ))}
            </div>
          ) : (
            <div className="relative">
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                className="instructor-swiper pb-16"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                }}
              >
                {instructorData.map((instructor, index) => (
                  <SwiperSlide key={instructor._id} className="max-w-sm">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: config.reducedMotion ? 0.1 : 0.6,
                        delay: index * 0.1 
                      }}
                    >
                      <EnhancedInstructorCard instructor={instructor} index={index} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Styling */}
              <style jsx global>{`
                .instructor-swiper .swiper-button-next,
                .instructor-swiper .swiper-button-prev {
                  background: linear-gradient(135deg, #10b981, #14b8a6);
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  color: white;
                  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
                  transition: all 0.3s ease;
                }

                .instructor-swiper .swiper-button-next:hover,
                .instructor-swiper .swiper-button-prev:hover {
                  transform: scale(1.1);
                  box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4);
                }

                .instructor-swiper .swiper-button-next::after,
                .instructor-swiper .swiper-button-prev::after {
                  font-size: 18px;
                  font-weight: bold;
                }

                .instructor-swiper .swiper-pagination-bullet {
                  background: linear-gradient(135deg, #10b981, #14b8a6);
                  opacity: 0.3;
                  transition: all 0.3s ease;
                }

                .instructor-swiper .swiper-pagination-bullet-active {
                  opacity: 1;
                  transform: scale(1.2);
                }
              `}</style>
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: config.reducedMotion ? 0.1 : 0.8, delay: 0.3 }}
        >
          {[
            { number: "50+", label: "Expert Instructors", icon: "👨‍🏫" },
            { number: "10K+", label: "Students Taught", icon: "🎓" },
            { number: "4.9", label: "Average Rating", icon: "⭐" },
            { number: "95%", label: "Success Rate", icon: "🏆" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg"
              whileHover={config.reducedMotion ? {} : { y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-3xl mb-2"
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-1"
              >
                {stat.number}
              </motion.div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedTopInstructor;
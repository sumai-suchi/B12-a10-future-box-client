import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { useAnimation } from "../context/AnimationProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
    <section className="w-full bg-[#0B0C10] text-white py-24 px-6 lg:px-16 border-t border-slate-900/60 overflow-hidden antialiased relative">
      
      {/* Background Cyber Glow Coordinates */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#00F0FF]/5 dark:bg-[#00F0FF]/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Title Block - Styled precisely to match image references */}
        <div className="w-full pb-6 border-b border-slate-900 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase block">
              THE FACULTY
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
              Core Faculty Matrix
            </h2>
          </div>
          <div className="font-mono text-[10px] md:text-xs text-slate-600 font-bold tracking-wider select-none md:mb-1">
            // ACTIVE_METHODOLOGY_ENGINE
          </div>
        </div>

        {/* Instructor Carousel Slider */}
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
            <div className="relative group/swiper">
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 8,
                  stretch: -15,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
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
                className="instructor-swiper pb-20"
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 24 },
                  1024: { slidesPerView: 3, spaceBetween: 32 },
                }}
              >
                {instructorData.map((instructor, index) => (
                  <SwiperSlide key={instructor._id} className="max-w-sm">
                    {/* Realigned Card Container Token Wrapper */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: config.reducedMotion ? 0.1 : 0.5,
                        delay: index * 0.06,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="h-full rounded-2xl border border-slate-900 bg-[#12141C] p-2 relative overflow-hidden group/card transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.03)]"
                    >
                      {/* Top Chrome Accent Pin */}
                      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent group-hover/card:via-cyan-400/40 transition-all duration-500" />
                      
                      <div className="bg-transparent rounded-xl overflow-hidden h-full">
                        <EnhancedInstructorCard instructor={instructor} index={index} />
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Integrated Global Layout Navigation Styles */}
              <style jsx global>{`
                .instructor-swiper .swiper-button-next,
                .instructor-swiper .swiper-button-prev {
                  background: #12141C;
                  border: 1px solid #1e293b;
                  width: 44px;
                  height: 44px;
                  border-radius: 12px;
                  color: #00F0FF;
                  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                  opacity: 0;
                }

                .group/swiper:hover .swiper-button-next,
                .group/swiper:hover .swiper-button-prev {
                  opacity: 1;
                }

                .instructor-swiper .swiper-button-next:hover,
                .instructor-swiper .swiper-button-prev:hover {
                  border-color: #00F0FF;
                  color: #ffffff;
                  background: #00F0FF/5;
                  box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
                }

                .instructor-swiper .swiper-button-next::after,
                .instructor-swiper .swiper-button-prev::after {
                  font-size: 13px;
                  font-weight: 900;
                }

                .instructor-swiper .swiper-pagination-bullet {
                  background: #B266FF;
                  opacity: 0.2;
                  transition: all 0.3s ease;
                }

                .instructor-swiper .swiper-pagination-bullet-active {
                  background: #00F0FF;
                  opacity: 1;
                  transform: scale(1.15);
                  box-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
                }
              `}</style>
            </div>
          )}
        </motion.div>

        {/* Metric Dashboard Footer Track */}
        <motion.div
          className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: config.reducedMotion ? 0.1 : 0.6, delay: 0.1 }}
        >
          {[
            { number: "50+", label: "Expert Instructors", tag: "ENG_STAFF" },
            { number: "10K+", label: "Students Taught", tag: "OPERATORS" },
            { number: "4.9", label: "Average Rating", tag: "EVAL_INDEX" },
            { number: "95%", label: "Success Rate", tag: "GRAD_ROUTE" }
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 bg-[#12141C] border border-slate-900 rounded-xl flex flex-col justify-between group transition-all duration-300 hover:border-slate-800"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-4">
                <span>// {stat.tag}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-[#00F0FF] transition-colors" />
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-bold tracking-tight text-white font-sans">
                  {stat.number}
                </div>
                <div className="text-xs text-slate-400 font-sans font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedTopInstructor;
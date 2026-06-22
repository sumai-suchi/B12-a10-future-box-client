import { useLocation, useParams } from "react-router";
import detailsImg from "../assets/premium_photo-1683120887619-8e6eca48afcb.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
import useAxios from "../hook/useAxios";
import { Clock, Award, DollarSign, Layers, Globe, ShieldCheck } from "lucide-react";

const ViewDetailsPage = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname.split("/");

  const [detailsData, setDetails] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    const courseDetailsFetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/viewDetails/${id}`);
        setDetails(res.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
        toast.error("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    courseDetailsFetch();
  }, [id]);

  const handleUserEnroll = async () => {
    if (!user?.email) {
      toast.error("User email not found. Please login first.");
      return;
    }

    const EnrollInformation = { ...detailsData, email: user?.email };

    try {
      const res = await axiosInstance.post("/enrolledUserData", EnrollInformation);

      if (res.status === 201 || res.data.insertedId) {
        toast.success("You have enrolled successfully!");
      } else {
        toast.error("Enrollment failed. Please try again.");
      }
    } catch (err) {
      console.error("Enroll API error:", err);
      toast.error("Network error. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A13] flex flex-col items-center justify-center space-y-4">
        <span className="animate-spin inline-block w-12 h-12 border-[4px] border-current border-t-transparent text-cyan-400 rounded-full"></span>
        <p className="text-gray-400 text-sm tracking-widest animate-pulse">Loading curriculum parameters...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#070A13] text-white font-sans antialiased pb-24">
      
      {/* --- HERO IMAGE PROFILE HEADER --- */}
      <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden">
        <img 
          src={detailsImg} 
          className="w-full h-full object-cover opacity-40 filter brightness-75 scale-105" 
          alt="Course Presentation" 
        />
        {/* Modern dark mask fading down and right */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A13] via-[#070a138c] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A13] via-transparent to-transparent" />
        
        <div className="absolute bottom-10 left-6 md:left-16 max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-900/50 px-3 py-1 rounded-md">
            Path / {path[1]}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
            {detailsData.title}
          </h1>
          <p className="text-sm md:text-base text-cyan-400 font-medium">
            Instructed by <span className="text-white underline decoration-cyan-500/50">{detailsData.instructor || "Industry Expert"}</span>
          </p>
        </div>
      </div>

      {/* --- MAIN SPLIT CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Material Information */}
        <div className="lg:col-span-2 space-y-8" data-aos="zoom-in" data-aos-delay="200">
          
          {/* Main Visual Asset Wrapper */}
          <div className="relative group rounded-2xl overflow-hidden border border-gray-900 shadow-2xl bg-[#0B0F19] p-2">
            <img
              className="w-full h-64 sm:h-96 object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
              src={detailsData?.image}
              alt={detailsData.title}
            />
          </div>

          {/* Text Summary Body */}
          <div className="bg-[#0B0F19] border border-gray-900/80 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-bold text-xl md:text-2xl tracking-wide text-white">Course Overview</h2>
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {detailsData?.description}
            </p>
          </div>

          {/* CTA Trigger displayed inline for mobile devices only */}
          <div className="block lg:hidden pt-2">
            <button 
              className="w-full bg-[#00F3BB] hover:bg-[#00d4a3] text-[#070A13] font-extrabold text-md py-4 rounded-xl transition-all duration-200 shadow-xl shadow-[#00F3BB]/10 active:scale-95" 
              onClick={handleUserEnroll}
            >
              Enroll In Track Now
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Static Information Widget Sidebar */}
        <div className="lg:col-span-1 lg:sticky lg:top-8" data-aos="flip-up" data-aos-delay="200">
          <div className="bg-gradient-to-b from-[#111625] to-[#0A0D18] border border-gray-900/90 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            
            {/* Ambient Lighting accent inside panel */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
            
            <h3 className="text-gray-200 font-bold text-lg tracking-wide border-b border-gray-800 pb-4 mb-6">
              Syndicate Metrics
            </h3>

            {/* Structured Meta Fields Container */}
            <div className="space-y-5">
              
              {/* Field Entry */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Duration</span>
                </div>
                <span className="text-sm font-semibold text-gray-100">{detailsData.duration || "N/A"}</span>
              </div>
              <hr className="border-gray-900" />

              {/* Field Entry */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Skill Level</span>
                </div>
                <span className="text-sm font-semibold text-gray-100">{detailsData.level || "Beginner"}</span>
              </div>
              <hr className="border-gray-900" />

              {/* Field Entry */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Language</span>
                </div>
                <span className="text-sm font-semibold text-gray-100">English</span>
              </div>
              <hr className="border-gray-900" />

              {/* Field Entry */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Certificate</span>
                </div>
                <span className="text-sm font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">Included</span>
              </div>
              <hr className="border-gray-900" />

              {/* Pricing Display Frame */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <DollarSign className="w-5 h-5 text-pink-500" />
                  <span className="text-base font-medium">Total Cost</span>
                </div>
                <span className="text-2xl font-mono font-extrabold text-pink-500">
                  ${detailsData.price || "0.00"}
                </span>
              </div>
            </div>

            {/* Desktop Dynamic Purchase Action Anchor */}
            <div className="hidden lg:block mt-8 pt-2">
              <button 
                className="w-full bg-[#00F3BB] hover:bg-[#00d4a3] text-[#070A13] font-extrabold text-sm py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#00F3BB]/10 active:scale-95" 
                onClick={handleUserEnroll}
              >
                Enroll Now
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewDetailsPage;
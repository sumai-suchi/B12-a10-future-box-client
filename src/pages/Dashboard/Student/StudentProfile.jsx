import React from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaCalendarAlt, 
  FaUserShield, 
  FaCopy 
} from "react-icons/fa";
import { toast } from "react-toastify";

const StudentProfile = () => {
  // Your provided data schema
  const studentData = {
    _id: "6a39a868c4ee4559ba549e79",
    email: "scarline2.o@demo.com",
    photoURL: "https://i.ibb.co/60V0rF6Y/Whats-App-Image-2026-05-05-at-8-13-41-PM.jpg",
    name: "scarline2.o",
    role: "student",
    createdAt: "2026-06-22T21:26:00.541+00:00"
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "light"
    });
  };

  // Format date readable (e.g., June 22, 2026)
  const joinDate = new Date(studentData.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-[#f4f7fc] text-[#2d3748] p-4 md:p-8 font-sans flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Avatar container matching image style */}
            <div className="w-24 h-24 rounded-full bg-[#f1f5f9] border border-[#cbd5e1] overflow-hidden flex items-center justify-center shadow-inner">
              {studentData.photoURL ? (
                <img 
                  src={studentData.photoURL} 
                  alt={studentData.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
                  }}
                />
              ) : (
                <FaUser className="text-[#94a3b8] text-4xl" />
              )}
            </div>

            {/* Profile Core Meta */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-[#1a202c]">
                  {studentData.name}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e6fffa] text-[#319795] border border-[#b2f5ea]">
                  Good Standing
                </span>
              </div>
              
              <p className="text-sm font-medium text-[#718096] capitalize">
                {studentData.role} • Computer Science Department
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-[#a0aec0]">
                <FaEnvelope /> <span>{studentData.email}</span>
              </div>
            </div>
          </div>

          {/* Institutional Side Metrics */}
          <div className="text-center md:text-right border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto border-[#edf2f7] space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a0aec0]">
              Admitted Term
            </p>
            <p className="text-sm font-bold text-[#4a5568]">
              Summer 2026
            </p>
            <p className="text-[11px] text-[#cbd5e1] pt-1">
              Registered via Dashboard
            </p>
          </div>
        </div>

        {/* Detailed Info Layout Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Account Attributes */}
          <div className="md:col-span-2 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-xs space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#718096] pb-2 border-b border-[#edf2f7]">
              Account Parameters
            </h2>

            {/* ID Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#a0aec0] flex items-center gap-1.5">
                <FaIdCard /> System Identifier (_id)
              </label>
              <div className="flex items-center justify-between w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2.5 text-xs font-mono text-[#4a5568]">
                <span className="truncate mr-2">{studentData._id}</span>
                <button 
                  onClick={() => copyToClipboard(studentData._id, "System ID")}
                  className="text-[#a0aec0] hover:text-[#4a5568] transition cursor-pointer p-0.5"
                  title="Copy ID"
                >
                  <FaCopy size={14} />
                </button>
              </div>
            </div>

            {/* Email Field info row */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#a0aec0] flex items-center gap-1.5">
                <FaEnvelope /> Primary Communication Channel
              </label>
              <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2.5 text-xs text-[#4a5568]">
                {studentData.email}
              </div>
            </div>
          </div>

          {/* System Audit Attributes */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#718096] pb-2 border-b border-[#edf2f7] mb-4">
                Security & Metadata
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#ebf8ff] text-[#3182ce] text-sm mt-0.5">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#a0aec0]">Created Timestamp</h4>
                    <p className="text-sm font-semibold text-[#4a5568]">{joinDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#e6fffa] text-[#319795] text-sm mt-0.5">
                    <FaUserShield />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#a0aec0]">Access Authorization</h4>
                    <p className="text-sm font-semibold text-[#4a5568] capitalize">{studentData.role} Status</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#edf2f7] text-[11px] text-[#a0aec0] italic text-center md:text-left">
              Account secure and synchronized.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentProfile;
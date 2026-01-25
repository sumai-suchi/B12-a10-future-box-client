import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "../../../hook/useAxios";


const StudentProfile = () => {
  // Replace later with real user data (AuthContext / API)
 
const {user,userData}=useContext(AuthContext)
const axiosInstance=useAxios();



  

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      

      {/* ================= Header ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Student Profile
        </h1>
        <p className="text-slate-600 mt-1">
          View and manage your account information
        </p>
      </div>

      {/* ================= Profile Card ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Top Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

        <div className="px-6 pb-6">
          {/* Avatar */}
          

          {/* Divider */}
          <div className="my-8 border-t border-slate-200"></div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="font-medium text-slate-800">
                {userData?.name}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-500">Email Address</p>
              <p className="font-medium text-slate-800">
                {userData?.email}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-500">Role</p>
              <p className="font-medium text-slate-800">
                {userData?.role}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-500">Member Since</p>
              <p className="font-medium text-slate-800">
                {userData?.createdAt}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white
              text-sm font-medium hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>

            <button
              className="px-6 py-2.5 rounded-lg border border-blue-300
              text-blue-700 text-sm font-medium hover:bg-blue-50 transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

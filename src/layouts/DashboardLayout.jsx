import { useContext, useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { GiCrossedSabres } from "react-icons/gi";
import { NavLink, Outlet } from "react-router";
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { role } = useContext(AuthContext);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#f8fafc]">
      <Helmet>
        <title>Future-box | Dashboard</title>
      </Helmet>

      {/* ================= Sidebar ================= */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40
        w-72 bg-gradient-to-b from-[#e8f1fb] to-[#dbeafe]
        border-r border-blue-200
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900">
            {role === "admin" ? "Admin" : "User"} Dashboard
          </h2>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <GiCrossedSabres className="text-xl text-blue-700" />
          </button>
        </div>

    {/* Navigation */}
<nav className="p-5 space-y-2 text-slate-700">

  {/* ================= ADMIN LINKS ================= */}
  {role === "admin" && (
    <>
      <NavLink
        to="/dashboard/admin/overview"
        className={({ isActive }) =>
          `block px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
        }
      >
        Dashboard Overview
      </NavLink>

      <NavLink
        to="/dashboard/admin/myAddedCourse"
        className={({ isActive }) =>
          `block px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
        }
      >
        My Added Courses
      </NavLink>

      <NavLink
        to="/dashboard/admin/addCourse"
        className={({ isActive }) =>
          `block px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
        }
      >
        Add Course
      </NavLink>

      <NavLink
        to="/dashboard/admin/enrollments"
        className={({ isActive }) =>
          `block px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
        }
      >
        Enrollments
      </NavLink>

      <NavLink
        to="/dashboard/admin/updateCourse/1"
        className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-100"
      >
        Update Course
      </NavLink>
    </>
  )}

  {/* ================= STUDENT LINKS ================= */}
  {role === "student" && (
    <>
      <NavLink
        to="/dashboard/student/overview"
        className={({ isActive }) =>
          `block px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
        }
      >
        Dashboard Overview
      </NavLink>

      <NavLink
        to="/dashboard/student/myEnrolledCourse"
        className={({ isActive }) =>
          `block px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
        }
      >
        My Enrolled Courses
      </NavLink>

      <NavLink
        to="/dashboard/student/progress"
        className={({ isActive }) =>
          `block px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
        }
      >
        My Progress
      </NavLink>

      <NavLink
        to="/dashboard/student/course/1"
        className="block px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-100"
      >
        Course Details
      </NavLink>

      <NavLink
        to="/dashboard/student/profile"
        className={({ isActive }) =>
          `block px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
        }
      >
        My Profile
      </NavLink>
    </>
  )}

  {/* ================= COMMON ================= */}
  <NavLink
    to="/"
    className="block mt-6 px-4 py-2.5 rounded-lg text-sm
    border border-blue-300 text-blue-700 hover:bg-blue-100"
  >
    ← Back to Home
  </NavLink>

</nav>



      </aside>

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Topbar */}
        <div className="md:hidden h-16 flex items-center px-4 border-b bg-white">
          <button onClick={() => setOpen(true)}>
            <MdMenuOpen className="text-2xl text-blue-700" />
          </button>
          <span className="ml-4 font-semibold text-slate-800">
            Dashboard
          </span>
        </div>

        {/* Outlet Area */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

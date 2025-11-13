import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { GiCrossedSabres } from "react-icons/gi";
import { NavLink, Outlet } from "react-router";
import { Helmet } from "react-helmet";
const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full p-5 min-h-screen bg-linear-to-r from-[#FF0062]/35 via-[#090979]/50 to-[#020024] flex flex-col md:flex-row    mt-1">
      <Helmet>
        <title>Future-box | Dashboard</title>
      </Helmet>
      <div className="relative w-full md:w-3/12">
        <button onClick={() => setOpen(true)} className=" absolute top-0 ">
          <MdMenuOpen className="size-8" />
        </button>
      </div>
      <div
        className={`absolute z-10 top-0 left-0  h-72 bg-gray-800 text-white  transition-transform duration-800
      ${open ? "translate-y-8" : "-translate-y-full"} max-w-2xl p-5`}
      >
        <button onClick={() => setOpen(false)} className="ml-60 mt-2">
          {" "}
          <GiCrossedSabres className="size-7" />
        </button>
        <ul className="space-y-4 p-3 flex flex-col">
          <NavLink to={"/dashboard/myEnrolledCourse"}>
            My enrolled course
          </NavLink>
          <NavLink to={"/dashboard/addCourse"}>Add Course</NavLink>
          <NavLink to={"/dashboard/myAddedCourse"}>My added Course</NavLink>

          <NavLink to={"/"} className={"btn btn-dash btn-outline mt-3.5 "}>
            Go Back Home
          </NavLink>
        </ul>
      </div>

      <div className=" w-full md:w-9/12 bg-linear-to-r from-[] ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { GiCrossedSabres } from "react-icons/gi";
import { NavLink, Outlet } from "react-router";
const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-6 gap-5   mt-1">
      <button onClick={() => setOpen(!open)} className="">
        {open ? (
          <GiCrossedSabres className="size-7" />
        ) : (
          <MdMenuOpen className="size-8" />
        )}
      </button>
      <div
        className={`absolute top-0 left-0 w-full h-72 bg-gray-800 text-white  transition-transform duration-800
      ${open ? "translate-y-8" : "-translate-y-full"} max-w-2xs`}
      >
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

      <div className="bg-fuchsia-700 col-span-5 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;

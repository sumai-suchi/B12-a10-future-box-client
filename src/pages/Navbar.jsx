import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router";
import { SiGreatlearning } from "react-icons/si";

const links = (
  <>
    <NavLink
      className={"bg-white/80 p-4 opacity-70 rounded-4xl border border-white"}
      to={"/"}
    >
      Home
    </NavLink>
    <NavLink
      className={"bg-white/80 p-4 opacity-70 rounded-4xl border border-white"}
      to={"/allCourses"}
    >
      AllCourses
    </NavLink>
    <NavLink
      className={"bg-white/80 p-4 opacity-70 rounded-4xl border border-white"}
      to={"/dashboard"}
    >
      Dashboard
    </NavLink>
  </>
);

const Navbar = () => {
  const { SignOut, user } = useContext(AuthContext);

  const handleSignOut = () => {
    SignOut()
      .then(() => {
        console.log("user Sign out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-linear-to-r from-[#4d64e8]/50 to-[#3b4266] h-28  shadow-sm ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content gap-2   md:gap-11 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl md:text-4xl font-bold italic text-white">
          <SiGreatlearning />
          Future-Box
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleSignOut} className="btn">
            SignOut
          </button>
        ) : (
          <NavLink to={"/auth/login"} className="btn">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;

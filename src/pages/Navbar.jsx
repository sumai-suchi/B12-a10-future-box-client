import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router";

const links = (
  <>
    <NavLink to={"/"}>Home</NavLink>
    <NavLink to={"/allCourses"}>AllCourses</NavLink>
    <NavLink to={"/dashboard"}>Dashboard</NavLink>
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
    <div className="navbar bg-base-100 shadow-sm">
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
            className="menu menu-sm dropdown-content gap-2.5 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
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

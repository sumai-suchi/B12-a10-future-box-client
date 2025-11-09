import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";

const AuthLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayouts;

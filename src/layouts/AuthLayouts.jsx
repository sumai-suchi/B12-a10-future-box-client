import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../Components/Footer";

const AuthLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayouts;

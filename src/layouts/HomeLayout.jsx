import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../Components/Footer";

const HomeLayout = () => {
  return (
    <div className="m-0 p-0">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;

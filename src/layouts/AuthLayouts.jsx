import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../Components/Footer";

const AuthLayouts = () => {
  return (
    // We remove the global Navbar and Footer completely.
    // Instead, we ensure the authentication container takes up full screen height
    // and uses a dark, premium canvas base matching your Register page theme.
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-[#05070B] flex flex-col justify-center items-center">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default AuthLayouts;
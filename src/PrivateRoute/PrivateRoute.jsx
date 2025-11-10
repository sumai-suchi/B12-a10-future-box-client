import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/auth/login"} state={location.pathname}></Navigate>;
};

export default PrivateRoute;

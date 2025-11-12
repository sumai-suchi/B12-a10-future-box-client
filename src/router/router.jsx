import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AllCourses from "../pages/AllCourses";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyAddedCourse from "../pages/MyAddedCourse";
import MyEnrolledCourse from "../pages/MyEnrolledCourse";
import AddCourses from "../pages/AddCourses";
import ViewDetailsPage from "../Components/ViewDetailsPage";
import UpdateData from "../Components/UpdateData";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allCourses",
        element: (
          <PrivateRoute>
            <AllCourses></AllCourses>
          </PrivateRoute>
        ),
      },
      {
        path: "/viewDetails/:id",
        element: <ViewDetailsPage></ViewDetailsPage>,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayouts></AuthLayouts>,
    children: [
      {
        path: "Login",
        element: <Login></Login>,
      },
      {
        path: "Register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myAddedCourse",
        element: <MyAddedCourse></MyAddedCourse>,
      },
      {
        path: "myEnrolledCourse",
        element: <MyEnrolledCourse></MyEnrolledCourse>,
      },
      {
        path: "addCourse",
        element: <AddCourses></AddCourses>,
      },
      {
        path: "UpdateData/:id",
        element: <UpdateData></UpdateData>,
      },
    ],
  },
]);

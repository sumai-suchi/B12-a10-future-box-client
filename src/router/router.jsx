import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyAddedCourse from "../pages/MyAddedCourse";
import MyEnrolledCourse from "../pages/Dashboard/Student/MyEnrolledCourse";

import ViewDetailsPage from "../Components/ViewDetailsPage";
import UpdateData from "../pages/Dashboard/admin/UpdateData";
import ErrorPage from "../Components/ErrorPage";
import AddCourse from "../pages/Dashboard/admin/AddCourse";
import AllCourses from "../pages/AllCourses";
import AdminOverview from "../pages/Dashboard/admin/AdminOverview";
import AdminEnrollments from "../pages/Dashboard/admin/AdminEnrollments";
import StudentOverview from "../pages/Dashboard/Student/StudentOverview";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";
// import StudentPaymentHistory from "../pages/Dashboard/Student/StudentPaymentHistory";


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
        element: (
          <PrivateRoute>
            <ViewDetailsPage></ViewDetailsPage>
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <ErrorPage></ErrorPage>,
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
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
  path: "dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    // ================= ADMIN (5) =================
    {
      path: "admin/overview",
      element: <AdminOverview />,
    },
    {
      path: "admin/myAddedCourse",
      element: <MyAddedCourse />,
    },
    {
      path: "admin/addCourse",
      element: <AddCourse />,
    },
    
    {
      path: "admin/updateCourse/:id",
      element: <UpdateData />,
    },
    {
      path: "admin/enrollments",
      element: <AdminEnrollments />,
    },

    // ================= STUDENT (5) =================
    {
      path: "student/overview",
      element: <StudentOverview />,
    },
    {
      path: "student/myEnrolledCourse",
      element: <MyEnrolledCourse/>,
    },
    // {
    //   path: "student/course/:id",
    //   element: <StudentCourseDetails />,
    // },
  
    // {
    //   path: "student/StudentPaymentHistory",
    //   element: <StudentPaymentHistory />,
    // },
  
    {
      path: "student/profile",
      element: <StudentProfile />,
    },
  ],
  errorElement: <ErrorPage />,
}

]);

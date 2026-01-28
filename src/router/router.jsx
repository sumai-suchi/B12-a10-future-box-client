import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyEnrolledCourse from "../pages/Dashboard/Student/MyEnrolledCourse";

import ViewDetailsPage from "../Components/ViewDetailsPage";
import EnhancedUpdateCourse from "../pages/Dashboard/admin/EnhancedUpdateCourse";
import ErrorPage from "../Components/ErrorPage";
import EnhancedAddCourse from "../pages/Dashboard/admin/EnhancedAddCourse";
import EnhancedAdminEnrollments from "../pages/Dashboard/admin/EnhancedAdminEnrollments";
import EnhancedMyAddedCourses from "../pages/Dashboard/admin/EnhancedMyAddedCourses";
import AllCourses from "../pages/AllCourses";
import StudentOverview from "../pages/Dashboard/Student/StudentOverview";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";
import LoadingPreview from "../pages/LoadingPreview";
import EnhancedDashboardLayout from "../layouts/EnhancedDashboardLayout";
import EnhancedAdminOverview from "../pages/Dashboard/admin/EnhancedAdminOverview";
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
      {
        path: "/loading-preview",
        element: <LoadingPreview></LoadingPreview>,
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
      element:  <EnhancedAdminOverview />,
    },
    {
      path: "admin/myAddedCourse",
      element: <EnhancedMyAddedCourses />,
    },
    {
      path: "admin/addCourse",
      element: <EnhancedAddCourse></EnhancedAddCourse>,
    },
    
    {
      path: "admin/updateCourse/:id",
      element: <EnhancedUpdateCourse />,
    },
    {
      path: "admin/enrollments",
      element: <EnhancedAdminEnrollments />,
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
},
{
  path: "enhanced-dashboard",
  element: (
    <PrivateRoute>
      <EnhancedDashboardLayout />
    </PrivateRoute>
  ),
  children: [
    // ================= ADMIN ENHANCED =================
    {
      path: "admin/overview",
      element: <EnhancedAdminOverview />,
    },
    {
      path: "admin/courses",
      element: <EnhancedMyAddedCourses />,
    },
    {
      path: "admin/students",
      element: <EnhancedAdminEnrollments />,
    },
    {
      path: "admin/analytics",
      element: <EnhancedAdminOverview />,
    },
    {
      path: "admin/add-course",
      element: <EnhancedAddCourse />,
    },
    {
      path: "admin/update-course/:id",
      element: <EnhancedUpdateCourse />,
    },
    // {
    //   path: "admin/settings",
    //   element: <AdminOverview />,
    // },

    // ================= STUDENT ENHANCED =================
    {
      path: "student/overview",
      element: <StudentOverview />,
    },
    {
      path: "student/courses",
      element: <MyEnrolledCourse/>,
    },
    {
      path: "student/progress",
      element: <StudentProfile />,
    },
    {
      path: "student/profile",
      element: <StudentProfile />,
    },
  ],
  errorElement: <ErrorPage />,
}

]);

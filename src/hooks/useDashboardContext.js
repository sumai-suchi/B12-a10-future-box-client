import { useLocation } from 'react-router';

export const useDashboardContext = () => {
  const location = useLocation();

  const isEnhancedDashboard = location.pathname.startsWith('/enhanced-dashboard');
  const baseRoute = isEnhancedDashboard ? '/enhanced-dashboard' : '/dashboard';


  const getRoute = (route) => `${baseRoute}${route}`;

  const getUpdateCourseRoute = (courseId) => {
    return isEnhancedDashboard
      ? `/enhanced-dashboard/admin/update-course/${courseId}`
      : `/dashboard/admin/updateCourse/${courseId}`;
  };


  const getAddCourseRoute = () => {
    return isEnhancedDashboard 
      ? '/enhanced-dashboard/admin/add-course' 
      : '/dashboard/admin/addCourse';
  };

  const getMyCoursesRoute = () => {
    return isEnhancedDashboard 
      ? '/enhanced-dashboard/admin/courses' 
      : '/dashboard/admin/myAddedCourse';
  };

  return {
    isEnhancedDashboard,
    getRoute,
    getUpdateCourseRoute,
    getAddCourseRoute,
    getMyCoursesRoute
  };
};
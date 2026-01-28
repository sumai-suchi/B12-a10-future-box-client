import { useLocation } from 'react-router';

export const useDashboardContext = () => {
  const location = useLocation();
  
  const isEnhancedDashboard = location.pathname.startsWith('/enhanced-dashboard');
  
  const getRoute = (route) => {
    const baseRoute = isEnhancedDashboard ? '/enhanced-dashboard' : '/dashboard';
    return `${baseRoute}${route}`;
  };
  
  const getUpdateCourseRoute = (courseId) => {
    if (isEnhancedDashboard) {
      return `/enhanced-dashboard/admin/update-course/${courseId}`;
    }
    return `/dashboard/admin/updateCourse/${courseId}`;
  };
  
  const getAddCourseRoute = () => {
    if (isEnhancedDashboard) {
      return '/enhanced-dashboard/admin/add-course';
    }
    return '/dashboard/admin/addCourse';
  };
  
  const getMyCoursesRoute = () => {
    if (isEnhancedDashboard) {
      return '/enhanced-dashboard/admin/courses';
    }
    return '/dashboard/admin/myAddedCourse';
  };
  
  return {
    isEnhancedDashboard,
    getRoute,
    getUpdateCourseRoute,
    getAddCourseRoute,
    getMyCoursesRoute
  };
};

export default useDashboardContext;
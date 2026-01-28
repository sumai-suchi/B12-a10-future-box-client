import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useAnimation } from "../../../context/AnimationProvider";
import LoadingSkeleton from "../../../Components/LoadingSkeleton";
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  BookOpenIcon, 
  CurrencyDollarIcon,
   ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ClockIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

const EnhancedAdminOverview = () => {
  const { config } = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Simulate data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDashboardData({
        stats: {
          totalCourses: { value: 47, change: 12, trend: 'up' },
          totalStudents: { value: 1247, change: 8.5, trend: 'up' },
          totalEnrollments: { value: 3456, change: 15.2, trend: 'up' },
          totalRevenue: { value: 89750, change: -2.1, trend: 'down' },
          activeUsers: { value: 892, change: 5.7, trend: 'up' },
          completionRate: { value: 78.5, change: 3.2, trend: 'up' }
        },
        recentActivity: [
          { id: 1, type: 'enrollment', user: 'John Doe', course: 'React Fundamentals', time: '2 minutes ago' },
          { id: 2, type: 'completion', user: 'Jane Smith', course: 'JavaScript Advanced', time: '15 minutes ago' },
          { id: 3, type: 'review', user: 'Mike Johnson', course: 'Node.js Basics', rating: 5, time: '1 hour ago' },
          { id: 4, type: 'enrollment', user: 'Sarah Wilson', course: 'Python for Beginners', time: '2 hours ago' }
        ],
        topCourses: [
          { id: 1, title: 'React Fundamentals', enrollments: 234, rating: 4.8, revenue: 12450 },
          { id: 2, title: 'JavaScript Advanced', enrollments: 189, rating: 4.9, revenue: 9870 },
          { id: 3, title: 'Node.js Basics', enrollments: 156, rating: 4.7, revenue: 8340 },
          { id: 4, title: 'Python for Beginners', enrollments: 143, rating: 4.6, revenue: 7650 }
        ],
        alerts: [
          { id: 1, type: 'warning', message: 'Server response time increased by 15%', time: '30 minutes ago' },
          { id: 2, type: 'info', message: 'New course "Vue.js Mastery" pending approval', time: '1 hour ago' },
          { id: 3, type: 'success', message: 'Monthly revenue target achieved', time: '2 hours ago' }
        ]
      });
      
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.reducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: config.reducedMotion ? 0.1 : 0.5 }
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>Admin Dashboard | Enhanced Overview</title>
      </Helmet>

      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center gap-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
            whileHover={config.reducedMotion ? {} : { scale: 1.05 }}
            whileTap={config.reducedMotion ? {} : { scale: 0.95 }}
          >
            Refresh Data
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <StatsGrid stats={dashboardData.stats} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts and Analytics */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <RevenueChart />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <TopCoursesTable courses={dashboardData.topCourses} />
          </motion.div>
        </div>

        {/* Right Column - Activity and Alerts */}
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <RecentActivity activities={dashboardData.recentActivity} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <AlertsPanel alerts={dashboardData.alerts} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Stats Grid Component
const StatsGrid = ({ stats }) => {
  const { config } = useAnimation();
  
  const statItems = [
    {
      title: "Total Courses",
      value: stats.totalCourses.value,
      change: stats.totalCourses.change,
      trend: stats.totalCourses.trend,
      icon: BookOpenIcon,
      color: "emerald"
    },
    {
      title: "Total Students", 
      value: stats.totalStudents.value.toLocaleString(),
      change: stats.totalStudents.change,
      trend: stats.totalStudents.trend,
      icon: UserGroupIcon,
      color: "cyan"
    },
    {
      title: "Enrollments",
      value: stats.totalEnrollments.value.toLocaleString(),
      change: stats.totalEnrollments.change,
      trend: stats.totalEnrollments.trend,
      icon: ChartBarIcon,
      color: "violet"
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.value.toLocaleString()}`,
      change: stats.totalRevenue.change,
      trend: stats.totalRevenue.trend,
      icon: CurrencyDollarIcon,
      color: "amber"
    },
    {
      title: "Active Users",
      value: stats.activeUsers.value.toLocaleString(),
      change: stats.activeUsers.change,
      trend: stats.activeUsers.trend,
      icon: EyeIcon,
      color: "rose"
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate.value}%`,
      change: stats.completionRate.change,
      trend: stats.completionRate.trend,
      icon: StarIcon,
      color: "sky"
    }
  ];

  const colorClasses = {
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    cyan: "bg-gradient-to-br from-cyan-400 to-cyan-600", 
    violet: "bg-gradient-to-br from-violet-400 to-violet-600",
    amber: "bg-gradient-to-br from-amber-400 to-amber-600",
    rose: "bg-gradient-to-br from-rose-400 to-rose-600",
    sky: "bg-gradient-to-br from-sky-400 to-sky-600"
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map((item, index) => (
        <motion.div
          key={item.title}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
          whileHover={config.reducedMotion ? {} : { 
            y: -4,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: config.reducedMotion ? 0.1 : 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-2xl shadow-lg ${colorClasses[item.color]}`}>
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center text-sm font-medium ${
              item.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}>
              {item.trend === 'up' ? (
                < ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
              )}
              {Math.abs(item.change)}%
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {item.title}
            </h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {item.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
// Revenue Chart Component
const RevenueChart = () => {
  const { config } = useAnimation();
  
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Revenue Overview
        </h3>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-xl">
            7 Days
          </button>
          <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100/70 dark:hover:bg-slate-700/70 rounded-xl transition-all duration-200">
            30 Days
          </button>
          <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100/70 dark:hover:bg-slate-700/70 rounded-xl transition-all duration-200">
            90 Days
          </button>
        </div>
      </div>
      
      {/* Simplified Chart Representation */}
      <div className="h-64 flex items-end justify-between gap-2">
        {[65, 78, 52, 89, 94, 76, 85].map((height, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-t from-emerald-400 via-teal-400 to-cyan-400 rounded-t-2xl flex-1 shadow-sm"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ 
              delay: index * 0.1, 
              duration: config.reducedMotion ? 0.1 : 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
};

// Top Courses Table Component
const TopCoursesTable = ({ courses }) => {
  const { config } = useAnimation();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Top Performing Courses
        </h3>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                Course
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                Enrollments
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                Rating
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <motion.tr
                key={course.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: config.reducedMotion ? 0.1 : 0.3 }}
              >
                <td className="py-4">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {course.title}
                  </div>
                </td>
                <td className="py-4 text-gray-600 dark:text-gray-400">
                  {course.enrollments}
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-gray-900 dark:text-white">{course.rating}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-900 dark:text-white font-medium">
                  ${course.revenue.toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Recent Activity Component
const RecentActivity = ({ activities }) => {
  const { config } = useAnimation();
  
  const getActivityIcon = (type) => {
    switch (type) {
      case 'enrollment':
        return <UserGroupIcon className="w-5 h-5 text-blue-500" />;
      case 'completion':
        return <BookOpenIcon className="w-5 h-5 text-green-500" />;
      case 'review':
        return <StarIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: config.reducedMotion ? 0.1 : 0.3 }}
          >
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{activity.user}</span>
                {activity.type === 'enrollment' && ' enrolled in '}
                {activity.type === 'completion' && ' completed '}
                {activity.type === 'review' && ' reviewed '}
                <span className="font-medium">{activity.course}</span>
                {activity.rating && (
                  <span className="ml-1">
                    ({activity.rating} ⭐)
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Alerts Panel Component
const AlertsPanel = ({ alerts }) => {
  const { config } = useAnimation();
  
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };
  
  const getAlertBg = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          System Alerts
        </h3>
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
          {alerts.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            className={`p-4 rounded-lg border ${getAlertBg(alert.type)}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: config.reducedMotion ? 0.1 : 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  {alert.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {alert.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Dashboard Skeleton Component
const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start">
        <div>
          <LoadingSkeleton variant="text" width="w-64" height="h-8" />
          <LoadingSkeleton variant="text" width="w-96" height="h-4" className="mt-2" />
        </div>
        <LoadingSkeleton variant="button" width="w-32" />
      </div>
      
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} variant="card" />
        ))}
      </div>
      
      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <LoadingSkeleton variant="card" height="h-80" />
          <LoadingSkeleton variant="card" height="h-64" />
        </div>
        <div className="space-y-8">
          <LoadingSkeleton variant="card" height="h-64" />
          <LoadingSkeleton variant="card" height="h-48" />
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminOverview;
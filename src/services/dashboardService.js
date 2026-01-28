// Mock dashboard data service
export const dashboardService = {
  // Simulate API delay
  delay: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get dashboard statistics
  async getStats() {
    await this.delay(1500);
    
    return {
      totalCourses: { value: 47, change: 12, trend: 'up' },
      totalStudents: { value: 1247, change: 8.5, trend: 'up' },
      totalEnrollments: { value: 3456, change: 15.2, trend: 'up' },
      totalRevenue: { value: 89750, change: -2.1, trend: 'down' },
      activeUsers: { value: 892, change: 5.7, trend: 'up' },
      completionRate: { value: 78.5, change: 3.2, trend: 'up' }
    };
  },

  // Get recent activities
  async getRecentActivity() {
    await this.delay(800);
    
    return [
      { 
        id: 1, 
        type: 'enrollment', 
        user: 'John Doe', 
        course: 'React Fundamentals', 
        time: '2 minutes ago',
        avatar: 'https://i.pravatar.cc/40?img=1'
      },
      { 
        id: 2, 
        type: 'completion', 
        user: 'Jane Smith', 
        course: 'JavaScript Advanced', 
        time: '15 minutes ago',
        avatar: 'https://i.pravatar.cc/40?img=2'
      },
      { 
        id: 3, 
        type: 'review', 
        user: 'Mike Johnson', 
        course: 'Node.js Basics', 
        rating: 5, 
        time: '1 hour ago',
        avatar: 'https://i.pravatar.cc/40?img=3'
      },
      { 
        id: 4, 
        type: 'enrollment', 
        user: 'Sarah Wilson', 
        course: 'Python for Beginners', 
        time: '2 hours ago',
        avatar: 'https://i.pravatar.cc/40?img=4'
      },
      { 
        id: 5, 
        type: 'completion', 
        user: 'Alex Chen', 
        course: 'Vue.js Mastery', 
        time: '3 hours ago',
        avatar: 'https://i.pravatar.cc/40?img=5'
      }
    ];
  },

  // Get top performing courses
  async getTopCourses() {
    await this.delay(1200);
    
    return [
      { 
        id: 1, 
        title: 'React Fundamentals', 
        enrollments: 234, 
        rating: 4.8, 
        revenue: 12450,
        instructor: 'John Smith',
        category: 'Frontend'
      },
      { 
        id: 2, 
        title: 'JavaScript Advanced', 
        enrollments: 189, 
        rating: 4.9, 
        revenue: 9870,
        instructor: 'Sarah Johnson',
        category: 'Programming'
      },
      { 
        id: 3, 
        title: 'Node.js Basics', 
        enrollments: 156, 
        rating: 4.7, 
        revenue: 8340,
        instructor: 'Mike Davis',
        category: 'Backend'
      },
      { 
        id: 4, 
        title: 'Python for Beginners', 
        enrollments: 143, 
        rating: 4.6, 
        revenue: 7650,
        instructor: 'Lisa Wang',
        category: 'Programming'
      },
      { 
        id: 5, 
        title: 'Vue.js Mastery', 
        enrollments: 128, 
        rating: 4.8, 
        revenue: 6890,
        instructor: 'David Brown',
        category: 'Frontend'
      }
    ];
  },

  // Get system alerts
  async getAlerts() {
    await this.delay(600);
    
    return [
      { 
        id: 1, 
        type: 'warning', 
        message: 'Server response time increased by 15%', 
        time: '30 minutes ago',
        severity: 'medium'
      },
      { 
        id: 2, 
        type: 'info', 
        message: 'New course "Vue.js Mastery" pending approval', 
        time: '1 hour ago',
        severity: 'low'
      },
      { 
        id: 3, 
        type: 'success', 
        message: 'Monthly revenue target achieved', 
        time: '2 hours ago',
        severity: 'low'
      },
      { 
        id: 4, 
        type: 'error', 
        message: 'Payment gateway connection failed', 
        time: '4 hours ago',
        severity: 'high'
      }
    ];
  },

  // Get revenue chart data
  async getRevenueData() {
    await this.delay(900);
    
    return {
      daily: [
        { day: 'Mon', revenue: 2450, enrollments: 12 },
        { day: 'Tue', revenue: 3200, enrollments: 18 },
        { day: 'Wed', revenue: 1800, enrollments: 8 },
        { day: 'Thu', revenue: 4100, enrollments: 22 },
        { day: 'Fri', revenue: 3800, enrollments: 19 },
        { day: 'Sat', revenue: 2900, enrollments: 14 },
        { day: 'Sun', revenue: 3500, enrollments: 16 }
      ],
      monthly: [
        { month: 'Jan', revenue: 45000, enrollments: 234 },
        { month: 'Feb', revenue: 52000, enrollments: 267 },
        { month: 'Mar', revenue: 48000, enrollments: 245 },
        { month: 'Apr', revenue: 61000, enrollments: 312 },
        { month: 'May', revenue: 58000, enrollments: 298 },
        { month: 'Jun', revenue: 67000, enrollments: 345 }
      ]
    };
  },

  // Get user analytics
  async getUserAnalytics() {
    await this.delay(700);
    
    return {
      demographics: {
        ageGroups: [
          { range: '18-24', count: 312, percentage: 25 },
          { range: '25-34', count: 498, percentage: 40 },
          { range: '35-44', count: 249, percentage: 20 },
          { range: '45+', count: 188, percentage: 15 }
        ],
        locations: [
          { country: 'United States', count: 456, percentage: 36.5 },
          { country: 'Canada', count: 234, percentage: 18.8 },
          { country: 'United Kingdom', count: 189, percentage: 15.2 },
          { country: 'Australia', count: 156, percentage: 12.5 },
          { country: 'Others', count: 212, percentage: 17.0 }
        ]
      },
      engagement: {
        averageSessionTime: '24 minutes',
        completionRate: 78.5,
        returnRate: 65.2,
        satisfactionScore: 4.6
      }
    };
  }
};

export default dashboardService;
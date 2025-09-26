// API Configuration for Flask Backend
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-flask-app.herokuapp.com' // Replace with your production Flask URL
  : 'http://localhost:5000'; // Local Flask development server

export const API_ENDPOINTS = {
  // Student management
  students: `${API_BASE_URL}/api/students`,
  studentById: (id: string) => `${API_BASE_URL}/api/students/${id}`,
  
  // Notifications via Brevo
  sendNotification: `${API_BASE_URL}/api/send-notification`,
  sendBulkNotifications: `${API_BASE_URL}/api/send-bulk-notifications`,
  notificationHistory: `${API_BASE_URL}/api/notifications/history`,
  
  // Analytics
  analytics: `${API_BASE_URL}/api/analytics`,
  performanceStats: `${API_BASE_URL}/api/analytics/performance`,
  
  // AI Insights
  aiInsights: (studentId: string) => `${API_BASE_URL}/api/ai-insights/${studentId}`,
};

// API utility functions
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};
import { Student, NotificationData } from '../types/student';
import { API_ENDPOINTS, apiCall } from '../config/api';

export const studentService = {
  // Get all students from PostgreSQL via Flask
  async getAllStudents(): Promise<Student[]> {
    return apiCall(API_ENDPOINTS.students);
  },

  // Get student by ID
  async getStudentById(id: string): Promise<Student> {
    return apiCall(API_ENDPOINTS.studentById(id));
  },

  // Send notification via Brevo API (through Flask)
  async sendNotification(data: {
    student_id: string;
    student_name: string;
    parent_name: string;
    parent_contact: string;
    parent_whatsapp: string;
    message: string;
    notification_type: 'sms' | 'whatsapp' | 'both';
  }): Promise<{ success: boolean; message: string }> {
    return apiCall(API_ENDPOINTS.sendNotification, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Send bulk notifications
  async sendBulkNotifications(students: Array<{
    student_id: string;
    student_name: string;
    parent_name: string;
    parent_contact: string;
    parent_whatsapp: string;
    message: string;
  }>): Promise<{ success: boolean; results: Array<any> }> {
    return apiCall(API_ENDPOINTS.sendBulkNotifications, {
      method: 'POST',
      body: JSON.stringify({ students }),
    });
  },

  // Get notification history
  async getNotificationHistory(): Promise<NotificationData[]> {
    return apiCall(API_ENDPOINTS.notificationHistory);
  },

  // Get performance analytics
  async getPerformanceAnalytics(): Promise<any> {
    return apiCall(API_ENDPOINTS.performanceStats);
  },

  // Get AI insights for a student
  async getAIInsights(studentId: string): Promise<any> {
    return apiCall(API_ENDPOINTS.aiInsights(studentId));
  }
};
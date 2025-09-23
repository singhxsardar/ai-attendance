export interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  parentContact: string;
  parentWhatsApp: string;
  parentName: string;
  profileImage?: string;
  subjects: Subject[];
  attendance: AttendanceRecord;
  overallPerformance: PerformanceMetrics;
}

export interface Subject {
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

export interface AttendanceRecord {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  percentage: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

export interface PerformanceMetrics {
  overallGrade: string;
  percentage: number;
  rank: number;
  totalStudents: number;
  aiInsights: string[];
  recommendations: string[];
  strengths: string[];
  improvements: string[];
}

export interface NotificationData {
  studentId: string;
  parentContact: string;
  parentWhatsApp: string;
  message: string;
  type: 'sms' | 'whatsapp' | 'both';
  status: 'pending' | 'sent' | 'failed';
  sentAt?: Date;
}
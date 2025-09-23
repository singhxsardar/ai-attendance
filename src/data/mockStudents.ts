import { Student } from '../types/student';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    class: '10th Grade',
    rollNumber: 'S001',
    parentContact: '+91 9876543210',
    parentWhatsApp: '+91 9876543210',
    parentName: 'Mr. Rajesh Sharma',
    subjects: [
      { name: 'Mathematics', totalMarks: 100, obtainedMarks: 95, grade: 'A+', performance: 'excellent' },
      { name: 'Physics', totalMarks: 100, obtainedMarks: 88, grade: 'A', performance: 'excellent' },
      { name: 'Chemistry', totalMarks: 100, obtainedMarks: 82, grade: 'B+', performance: 'good' },
      { name: 'English', totalMarks: 100, obtainedMarks: 90, grade: 'A', performance: 'excellent' },
      { name: 'Hindi', totalMarks: 100, obtainedMarks: 85, grade: 'B+', performance: 'good' }
    ],
    attendance: {
      totalDays: 120,
      presentDays: 115,
      absentDays: 5,
      percentage: 95.8,
      status: 'excellent'
    },
    overallPerformance: {
      overallGrade: 'A',
      percentage: 88.0,
      rank: 2,
      totalStudents: 45,
      aiInsights: [
        'Exceptional performance in Mathematics and Physics',
        'Consistent attendance showing strong commitment',
        'Top 5% performer in the class'
      ],
      recommendations: [
        'Consider advanced mathematics courses',
        'Encourage participation in science olympiads',
        'Maintain current study schedule'
      ],
      strengths: ['Analytical thinking', 'Problem-solving', 'Consistent effort'],
      improvements: ['Creative writing skills', 'Group presentations']
    }
  },
  {
    id: '2',
    name: 'Priya Patel',
    class: '10th Grade',
    rollNumber: 'S002',
    parentContact: '+91 9876543211',
    parentWhatsApp: '+91 9876543211',
    parentName: 'Mrs. Sunita Patel',
    subjects: [
      { name: 'Mathematics', totalMarks: 100, obtainedMarks: 78, grade: 'B', performance: 'good' },
      { name: 'Physics', totalMarks: 100, obtainedMarks: 75, grade: 'B', performance: 'good' },
      { name: 'Chemistry', totalMarks: 100, obtainedMarks: 92, grade: 'A+', performance: 'excellent' },
      { name: 'English', totalMarks: 100, obtainedMarks: 94, grade: 'A+', performance: 'excellent' },
      { name: 'Hindi', totalMarks: 100, obtainedMarks: 88, grade: 'A', performance: 'excellent' }
    ],
    attendance: {
      totalDays: 120,
      presentDays: 108,
      absentDays: 12,
      percentage: 90.0,
      status: 'good'
    },
    overallPerformance: {
      overallGrade: 'A-',
      percentage: 85.4,
      rank: 5,
      totalStudents: 45,
      aiInsights: [
        'Strong performance in languages and chemistry',
        'Good overall academic standing',
        'Improvement needed in mathematical subjects'
      ],
      recommendations: [
        'Focus more time on mathematics practice',
        'Consider additional tutoring for physics',
        'Maintain excellent work in languages'
      ],
      strengths: ['Language skills', 'Chemistry concepts', 'Creative expression'],
      improvements: ['Mathematical problem-solving', 'Physics applications']
    }
  },
  {
    id: '3',
    name: 'Rohit Kumar',
    class: '10th Grade',
    rollNumber: 'S003',
    parentContact: '+91 9876543212',
    parentWhatsApp: '+91 9876543212',
    parentName: 'Mr. Suresh Kumar',
    subjects: [
      { name: 'Mathematics', totalMarks: 100, obtainedMarks: 65, grade: 'C+', performance: 'average' },
      { name: 'Physics', totalMarks: 100, obtainedMarks: 70, grade: 'B-', performance: 'average' },
      { name: 'Chemistry', totalMarks: 100, obtainedMarks: 68, grade: 'C+', performance: 'average' },
      { name: 'English', totalMarks: 100, obtainedMarks: 72, grade: 'B-', performance: 'average' },
      { name: 'Hindi', totalMarks: 100, obtainedMarks: 75, grade: 'B', performance: 'good' }
    ],
    attendance: {
      totalDays: 120,
      presentDays: 95,
      absentDays: 25,
      percentage: 79.2,
      status: 'average'
    },
    overallPerformance: {
      overallGrade: 'C+',
      percentage: 70.0,
      rank: 25,
      totalStudents: 45,
      aiInsights: [
        'Average performance across subjects',
        'Attendance issues affecting learning',
        'Potential for improvement with focused effort'
      ],
      recommendations: [
        'Improve daily attendance consistency',
        'Establish structured study routine',
        'Seek help from teachers for difficult topics',
        'Form study groups with peers'
      ],
      strengths: ['Hindi language', 'Practical skills', 'Sports activities'],
      improvements: ['Study consistency', 'Time management', 'Subject focus']
    }
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    class: '10th Grade',
    rollNumber: 'S004',
    parentContact: '+91 9876543213',
    parentWhatsApp: '+91 9876543213',
    parentName: 'Dr. Venkat Reddy',
    subjects: [
      { name: 'Mathematics', totalMarks: 100, obtainedMarks: 98, grade: 'A+', performance: 'excellent' },
      { name: 'Physics', totalMarks: 100, obtainedMarks: 96, grade: 'A+', performance: 'excellent' },
      { name: 'Chemistry', totalMarks: 100, obtainedMarks: 94, grade: 'A+', performance: 'excellent' },
      { name: 'English', totalMarks: 100, obtainedMarks: 89, grade: 'A', performance: 'excellent' },
      { name: 'Hindi', totalMarks: 100, obtainedMarks: 87, grade: 'A', performance: 'excellent' }
    ],
    attendance: {
      totalDays: 120,
      presentDays: 119,
      absentDays: 1,
      percentage: 99.2,
      status: 'excellent'
    },
    overallPerformance: {
      overallGrade: 'A+',
      percentage: 92.8,
      rank: 1,
      totalStudents: 45,
      aiInsights: [
        'Outstanding academic performance',
        'Class topper with exceptional consistency',
        'Perfect attendance demonstrates dedication'
      ],
      recommendations: [
        'Consider advanced placement courses',
        'Mentor other students in peer learning',
        'Explore STEM competitions and olympiads',
        'Maintain current excellence'
      ],
      strengths: ['Academic excellence', 'Time management', 'Leadership potential'],
      improvements: ['Public speaking', 'Creative arts']
    }
  },
  {
    id: '5',
    name: 'Akash Singh',
    class: '10th Grade',
    rollNumber: 'S005',
    parentContact: '+91 9876543214',
    parentWhatsApp: '+91 9876543214',
    parentName: 'Mrs. Meera Singh',
    subjects: [
      { name: 'Mathematics', totalMarks: 100, obtainedMarks: 55, grade: 'D+', performance: 'poor' },
      { name: 'Physics', totalMarks: 100, obtainedMarks: 58, grade: 'D+', performance: 'poor' },
      { name: 'Chemistry', totalMarks: 100, obtainedMarks: 62, grade: 'C', performance: 'average' },
      { name: 'English', totalMarks: 100, obtainedMarks: 65, grade: 'C+', performance: 'average' },
      { name: 'Hindi', totalMarks: 100, obtainedMarks: 70, grade: 'B-', performance: 'average' }
    ],
    attendance: {
      totalDays: 120,
      presentDays: 85,
      absentDays: 35,
      percentage: 70.8,
      status: 'poor'
    },
    overallPerformance: {
      overallGrade: 'D+',
      percentage: 62.0,
      rank: 38,
      totalStudents: 45,
      aiInsights: [
        'Struggling with mathematical and scientific concepts',
        'Poor attendance impacting learning outcomes',
        'Immediate intervention required'
      ],
      recommendations: [
        'Urgent: Schedule parent-teacher meeting',
        'Arrange remedial classes for core subjects',
        'Address attendance issues immediately',
        'Consider counseling support',
        'Create personalized learning plan'
      ],
      strengths: ['Creativity', 'Art skills', 'Social interaction'],
      improvements: ['Study habits', 'Attendance', 'Mathematical skills', 'Focus improvement']
    }
  }
];
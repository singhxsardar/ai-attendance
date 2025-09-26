import { useState } from 'react';
import { Student, NotificationData } from '../types/student';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  MessageSquare, 
  Phone, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock,
  Smartphone,
  Mail,
  Users,
  Zap
} from 'lucide-react';

interface NotificationCenterProps {
  students: Student[];
}

export const NotificationCenter = ({ students }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateAIReport = (student: Student): string => {
    const performanceLevel = student.overallPerformance.percentage >= 90 ? 'excellent' :
                           student.overallPerformance.percentage >= 75 ? 'good' :
                           student.overallPerformance.percentage >= 60 ? 'average' : 'needs attention';

    const attendanceLevel = student.attendance.percentage >= 90 ? 'excellent' :
                          student.attendance.percentage >= 80 ? 'good' : 'concerning';

    return `🎓 STUDENT PERFORMANCE REPORT - ${student.name}

📊 ACADEMIC PERFORMANCE:
• Overall Grade: ${student.overallPerformance.overallGrade} (${student.overallPerformance.percentage}%)
• Class Rank: #${student.overallPerformance.rank} out of ${student.overallPerformance.totalStudents}
• Performance Level: ${performanceLevel.toUpperCase()}

📚 TOP SUBJECTS:
${student.subjects
  .sort((a, b) => b.obtainedMarks - a.obtainedMarks)
  .slice(0, 3)
  .map(subject => `• ${subject.name}: ${subject.obtainedMarks}/${subject.totalMarks} (${subject.grade})`)
  .join('\n')}

📅 ATTENDANCE:
• ${student.attendance.percentage}% (${student.attendance.presentDays}/${student.attendance.totalDays} days)
• Status: ${attendanceLevel.toUpperCase()}

🤖 AI INSIGHTS:
${student.overallPerformance.aiInsights.slice(0, 2).map(insight => `• ${insight}`).join('\n')}

🎯 RECOMMENDATIONS:
${student.overallPerformance.recommendations.slice(0, 2).map(rec => `• ${rec}`).join('\n')}

For detailed analysis, contact the school.
Best regards, Academic AI Assistant`;
  };

  const sendNotification = async (student: Student, type: 'sms' | 'whatsapp' | 'both') => {
    setIsLoading(true);
    
    const message = generateAIReport(student);
    
    const newNotification: NotificationData = {
      studentId: student.id,
      parentContact: student.parentContact,
      parentWhatsApp: student.parentWhatsApp,
      message,
      type,
      status: 'pending'
    };

    setNotifications(prev => [...prev, newNotification]);

    try {
      // Call your Flask API endpoint
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: student.id,
          student_name: student.name,
          parent_name: student.parentName,
          parent_contact: student.parentContact,
          parent_whatsapp: student.parentWhatsApp,
          message: message,
          notification_type: type
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setNotifications(prev => 
        prev.map(notif => 
          notif.studentId === student.id && notif.status === 'pending'
            ? { ...notif, status: 'sent' as const, sentAt: new Date() }
            : notif
        )
      );

      toast({
        title: "Report Sent Successfully! ✅",
        description: `Performance report sent to ${student.parentName} via ${type} using Brevo API`,
      });

    } catch (error) {
      console.error('Failed to send notification:', error);
      
      setNotifications(prev => 
        prev.map(notif => 
          notif.studentId === student.id && notif.status === 'pending'
            ? { ...notif, status: 'failed' as const }
            : notif
        )
      );

      toast({
        title: "Failed to Send Report ❌",
        description: "Please check your Flask backend connection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendBulkReports = async () => {
    setIsLoading(true);
    
    try {
      // Call Flask bulk send endpoint
      const response = await fetch('/api/send-bulk-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          students: students.map(student => ({
            student_id: student.id,
            student_name: student.name,
            parent_name: student.parentName,
            parent_contact: student.parentContact,
            parent_whatsapp: student.parentWhatsApp,
            message: generateAIReport(student)
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "Bulk Reports Sent! 🚀",
        description: `Performance reports sent to all ${students.length} parents via Brevo`,
      });
      
    } catch (error) {
      console.error('Failed to send bulk notifications:', error);
      toast({
        title: "Bulk Send Failed ❌", 
        description: "Please check your Flask backend connection",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-4 h-4 text-excellent" />;
      case 'failed': return <XCircle className="w-4 h-4 text-poor" />;
      default: return <Clock className="w-4 h-4 text-average" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-excellent text-white';
      case 'failed': return 'bg-poor text-white';
      default: return 'bg-average text-white';
    }
  };

  const sentCount = notifications.filter(n => n.status === 'sent').length;
  const pendingCount = notifications.filter(n => n.status === 'pending').length;
  const failedCount = notifications.filter(n => n.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-excellent/10 to-excellent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-excellent/10">
                <CheckCircle className="w-5 h-5 text-excellent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reports Sent</p>
                <p className="text-2xl font-bold">{sentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-average/10 to-average/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-average/10">
                <Clock className="w-5 h-5 text-average" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-poor/10 to-poor/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-poor/10">
                <XCircle className="w-5 h-5 text-poor" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">{failedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            AI-Powered Bulk Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={sendBulkReports}
              disabled={isLoading}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? 'Sending...' : 'Send All Reports (SMS + WhatsApp)'}
            </Button>
            
            <Button variant="outline" disabled={isLoading}>
              <Mail className="w-4 h-4 mr-2" />
              Email Reports
            </Button>
          </div>
          
          <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-sm font-medium text-accent mb-2">🤖 AI Features Active:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Automated performance analysis</li>
              <li>• Personalized recommendations</li>
              <li>• Smart parent reports</li>
              <li>• Delivery tracking & retries</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Individual Student Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Send Individual Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => {
              const studentNotifications = notifications.filter(n => n.studentId === student.id);
              const lastNotification = studentNotifications[studentNotifications.length - 1];
              
              return (
                <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.parentName}</p>
                      <p className="text-xs text-muted-foreground">{student.parentContact}</p>
                    </div>
                    
                    {lastNotification && (
                      <div className="flex items-center gap-2">
                        {getStatusIcon(lastNotification.status)}
                        <Badge className={getStatusColor(lastNotification.status)}>
                          {lastNotification.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendNotification(student, 'sms')}
                      disabled={isLoading}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      SMS
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendNotification(student, 'whatsapp')}
                      disabled={isLoading}
                      className="text-excellent border-excellent/30"
                    >
                      <Smartphone className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => sendNotification(student, 'both')}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-primary to-primary/80"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Both
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notifications.slice().reverse().slice(0, 10).map((notification, index) => {
                const student = students.find(s => s.id === notification.studentId);
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(notification.status)}
                      <div>
                        <p className="font-medium">{student?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {notification.type} to {notification.parentContact}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(notification.status)}>
                      {notification.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
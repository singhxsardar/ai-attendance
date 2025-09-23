import { Student } from '../types/student';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Phone, MessageSquare, User, BookOpen, Calendar } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onSendReport: (student: Student) => void;
}

export const StudentCard = ({ student, onSendReport }: StudentCardProps) => {
  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-excellent text-white';
      case 'good': return 'bg-good text-white';
      case 'average': return 'bg-average text-white';
      case 'poor': return 'bg-poor text-white';
      default: return 'bg-muted';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-excellent';
    if (grade.includes('B')) return 'text-good';
    if (grade.includes('C')) return 'text-average';
    return 'text-poor';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-muted/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{student.class} • Roll: {student.rollNumber}</p>
            </div>
          </div>
          <Badge className={`${getPerformanceColor(student.overallPerformance.overallGrade.includes('A') ? 'excellent' : 
            student.overallPerformance.overallGrade.includes('B') ? 'good' : 
            student.overallPerformance.overallGrade.includes('C') ? 'average' : 'poor')}`}>
            Rank #{student.overallPerformance.rank}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Overall Grade</span>
            </div>
            <p className={`text-2xl font-bold ${getGradeColor(student.overallPerformance.overallGrade)}`}>
              {student.overallPerformance.overallGrade}
            </p>
            <p className="text-sm text-muted-foreground">{student.overallPerformance.percentage}%</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Attendance</span>
            </div>
            <p className={`text-2xl font-bold ${student.attendance.percentage >= 90 ? 'text-excellent' : 
              student.attendance.percentage >= 80 ? 'text-good' : 
              student.attendance.percentage >= 70 ? 'text-average' : 'text-poor'}`}>
              {student.attendance.percentage}%
            </p>
            <p className="text-sm text-muted-foreground">
              {student.attendance.presentDays}/{student.attendance.totalDays} days
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Top Subjects</h4>
          <div className="flex flex-wrap gap-1">
            {student.subjects
              .sort((a, b) => b.obtainedMarks - a.obtainedMarks)
              .slice(0, 3)
              .map((subject, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {subject.name}: {subject.grade}
                </Badge>
              ))}
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            Parent: {student.parentName}
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={() => onSendReport(student)}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              size="sm"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Report
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
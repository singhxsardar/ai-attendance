import { Student } from '../types/student';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Users, BookOpen, Calendar, Brain, Target } from 'lucide-react';

interface PerformanceAnalyticsProps {
  students: Student[];
}

export const PerformanceAnalytics = ({ students }: PerformanceAnalyticsProps) => {
  const totalStudents = students.length;
  const avgPerformance = students.reduce((sum, student) => sum + student.overallPerformance.percentage, 0) / totalStudents;
  const avgAttendance = students.reduce((sum, student) => sum + student.attendance.percentage, 0) / totalStudents;
  
  const performanceDistribution = {
    excellent: students.filter(s => s.overallPerformance.percentage >= 90).length,
    good: students.filter(s => s.overallPerformance.percentage >= 75 && s.overallPerformance.percentage < 90).length,
    average: students.filter(s => s.overallPerformance.percentage >= 60 && s.overallPerformance.percentage < 75).length,
    poor: students.filter(s => s.overallPerformance.percentage < 60).length,
  };

  const topPerformers = students
    .sort((a, b) => b.overallPerformance.percentage - a.overallPerformance.percentage)
    .slice(0, 3);

  const lowPerformers = students
    .filter(s => s.overallPerformance.percentage < 70)
    .sort((a, b) => a.overallPerformance.percentage - b.overallPerformance.percentage);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-excellent/10 to-excellent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-excellent/10">
                <BookOpen className="w-5 h-5 text-excellent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-good/10 to-good/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-good/10">
                <Calendar className="w-5 h-5 text-good" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold">{avgAttendance.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class Average</p>
                <p className="text-2xl font-bold">
                  {avgPerformance >= 85 ? 'A' : avgPerformance >= 75 ? 'B' : avgPerformance >= 65 ? 'C' : 'D'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Performance Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-excellent/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-excellent">{performanceDistribution.excellent}</span>
              </div>
              <p className="text-sm font-medium">Excellent</p>
              <p className="text-xs text-muted-foreground">90%+</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-good/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-good">{performanceDistribution.good}</span>
              </div>
              <p className="text-sm font-medium">Good</p>
              <p className="text-xs text-muted-foreground">75-89%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-average/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-average">{performanceDistribution.average}</span>
              </div>
              <p className="text-sm font-medium">Average</p>
              <p className="text-xs text-muted-foreground">60-74%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-poor/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-poor">{performanceDistribution.poor}</span>
              </div>
              <p className="text-sm font-medium">Needs Help</p>
              <p className="text-xs text-muted-foreground">&lt;60%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-excellent" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-excellent text-white">#{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-excellent">{student.overallPerformance.percentage}%</p>
                    <p className="text-sm text-muted-foreground">{student.overallPerformance.overallGrade}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students Needing Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-poor" />
              Needs Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowPerformers.length > 0 ? (
                lowPerformers.slice(0, 3).map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-poor/5 border border-poor/20">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-poor">{student.overallPerformance.percentage}%</p>
                      <p className="text-sm text-muted-foreground">Attendance: {student.attendance.percentage}%</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  🎉 All students performing well!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
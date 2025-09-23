import { Student } from '../types/student';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Brain, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';

interface AIInsightsProps {
  student: Student;
}

export const AIInsights = ({ student }: AIInsightsProps) => {
  const generatePerformanceTrend = () => {
    const percentage = student.overallPerformance.percentage;
    if (percentage >= 90) return { text: "Excellent trajectory", icon: TrendingUp, color: "text-excellent" };
    if (percentage >= 75) return { text: "Positive trend", icon: CheckCircle, color: "text-good" };
    if (percentage >= 60) return { text: "Needs improvement", icon: Target, color: "text-average" };
    return { text: "Requires intervention", icon: AlertTriangle, color: "text-poor" };
  };

  const trend = generatePerformanceTrend();
  const TrendIcon = trend.icon;

  return (
    <div className="space-y-6">
      {/* AI Overview */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Performance Analysis for {student.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <TrendIcon className={`w-6 h-6 ${trend.color}`} />
            <div>
              <p className="font-semibold">{trend.text}</p>
              <p className="text-sm text-muted-foreground">
                Current Grade: {student.overallPerformance.overallGrade} ({student.overallPerformance.percentage}%)
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-primary">#{student.overallPerformance.rank}</p>
              <p className="text-sm text-muted-foreground">Class Rank</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-excellent">{student.attendance.percentage}%</p>
              <p className="text-sm text-muted-foreground">Attendance</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-background/50">
              <p className="text-2xl font-bold text-good">{student.subjects.length}</p>
              <p className="text-sm text-muted-foreground">Subjects</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            AI-Generated Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {student.overallPerformance.aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                <Brain className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-excellent" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {student.overallPerformance.strengths.map((strength, index) => (
                <Badge key={index} variant="outline" className="mr-2 mb-2 border-excellent/30 text-excellent">
                  {strength}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-average" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {student.overallPerformance.improvements.map((improvement, index) => (
                <Badge key={index} variant="outline" className="mr-2 mb-2 border-average/30 text-average">
                  {improvement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {student.overallPerformance.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {student.subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    subject.performance === 'excellent' ? 'bg-excellent' :
                    subject.performance === 'good' ? 'bg-good' :
                    subject.performance === 'average' ? 'bg-average' : 'bg-poor'
                  }`} />
                  <span className="font-medium">{subject.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">{subject.obtainedMarks}/{subject.totalMarks}</p>
                  <p className="text-sm text-muted-foreground">Grade: {subject.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
import { useState } from 'react';
import { mockStudents } from '../data/mockStudents';
import { Student } from '../types/student';
import { StudentCard } from './StudentCard';
import { PerformanceAnalytics } from './PerformanceAnalytics';
import { NotificationCenter } from './NotificationCenter';
import { AIInsights } from './AIInsights';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  GraduationCap, 
  BarChart3, 
  MessageSquare, 
  Brain, 
  Search,
  Users,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';

export const StudentDashboard = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendReport = (student: Student) => {
    setSelectedStudent(student);
  };

  const totalStudents = students.length;
  const avgPerformance = students.reduce((sum, student) => sum + student.overallPerformance.percentage, 0) / totalStudents;
  const avgAttendance = students.reduce((sum, student) => sum + student.attendance.percentage, 0) / totalStudents;
  const topPerformers = students.filter(s => s.overallPerformance.percentage >= 90).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="w-8 h-8" />
                AI-Powered Student Performance System
              </h1>
              <p className="text-primary-foreground/80 mt-2">
                Automated performance tracking with intelligent parent notifications
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                🤖 AI Active
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                Class 10th Grade
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <div>
                  <p className="text-sm opacity-80">Total Students</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                <div>
                  <p className="text-sm opacity-80">Avg Performance</p>
                  <p className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <div>
                  <p className="text-sm opacity-80">Avg Attendance</p>
                  <p className="text-2xl font-bold">{avgAttendance.toFixed(1)}%</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6" />
                <div>
                  <p className="text-sm opacity-80">Top Performers</p>
                  <p className="text-2xl font-bold">{topPerformers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search students by name, class, or roll number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    Filter by Performance
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Student Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onSendReport={handleSendReport}
                />
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No students found matching your search.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <PerformanceAnalytics students={students} />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationCenter students={students} />
          </TabsContent>

          <TabsContent value="ai-insights">
            <div className="space-y-6">
              {selectedStudent ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">AI Insights for {selectedStudent.name}</h2>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedStudent(null)}
                    >
                      Back to Overview
                    </Button>
                  </div>
                  <AIInsights student={selectedStudent} />
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Select a Student for AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Choose a student to view detailed AI-powered performance analysis and recommendations.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {students.map((student) => (
                        <Button
                          key={student.id}
                          variant="outline"
                          onClick={() => setSelectedStudent(student)}
                          className="justify-start h-auto p-4"
                        >
                          <div className="text-left">
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.overallPerformance.overallGrade} • Rank #{student.overallPerformance.rank}
                            </p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
-- PostgreSQL Database Schema for Student Management System

-- Create database
CREATE DATABASE student_management;

-- Connect to the database
\c student_management;

-- Students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(50) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    parent_contact VARCHAR(15) NOT NULL,
    parent_whatsapp VARCHAR(15) NOT NULL,
    parent_name VARCHAR(100) NOT NULL,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    total_marks INTEGER NOT NULL DEFAULT 100,
    obtained_marks INTEGER NOT NULL,
    grade VARCHAR(5) NOT NULL,
    performance VARCHAR(20) CHECK (performance IN ('excellent', 'good', 'average', 'poor')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    total_days INTEGER NOT NULL,
    present_days INTEGER NOT NULL,
    absent_days INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('excellent', 'good', 'average', 'poor')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance metrics table
CREATE TABLE performance_metrics (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    overall_grade VARCHAR(5) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    rank INTEGER NOT NULL,
    total_students INTEGER NOT NULL,
    ai_insights TEXT[],
    recommendations TEXT[],
    strengths TEXT[],
    improvements TEXT[],
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    parent_contact VARCHAR(15) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(20) CHECK (notification_type IN ('sms', 'whatsapp', 'both')),
    status VARCHAR(20) CHECK (status IN ('pending', 'sent', 'failed')),
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (your existing students)
INSERT INTO students (name, class, roll_number, parent_contact, parent_whatsapp, parent_name) VALUES
('Arjun Sharma', '10th Grade', 'S001', '+91 9876543210', '+91 9876543210', 'Mr. Rajesh Sharma'),
('Priya Patel', '10th Grade', 'S002', '+91 9876543211', '+91 9876543211', 'Mrs. Sunita Patel'),
('Rohit Kumar', '10th Grade', 'S003', '+91 9876543212', '+91 9876543212', 'Mr. Suresh Kumar'),
('Sneha Reddy', '10th Grade', 'S004', '+91 9876543213', '+91 9876543213', 'Dr. Venkat Reddy'),
('Akash Singh', '10th Grade', 'S005', '+91 9876543214', '+91 9876543214', 'Mrs. Meera Singh'),
('Sagar Singh', 'BCA', '94', '7814507901', '7814507901', 'Rajinder Singh');

-- Insert subjects for Sagar Singh (student_id = 6)
INSERT INTO subjects (student_id, name, total_marks, obtained_marks, grade, performance) VALUES
(6, 'Mathematics', 100, 85, 'B+', 'good'),
(6, 'Physics', 100, 82, 'B+', 'good'),
(6, 'Chemistry', 100, 87, 'A', 'excellent'),
(6, 'English', 100, 80, 'B', 'good'),
(6, 'Hindi', 100, 84, 'B+', 'good');

-- Insert attendance for Sagar Singh
INSERT INTO attendance (student_id, total_days, present_days, absent_days, percentage, status) VALUES
(6, 120, 110, 10, 91.7, 'good');

-- Insert performance metrics for Sagar Singh
INSERT INTO performance_metrics (student_id, overall_grade, percentage, rank, total_students, ai_insights, recommendations, strengths, improvements) VALUES
(6, 'B+', 83.6, 4, 46, 
 ARRAY['Consistent performance across all subjects', 'Good attendance showing dedication', 'Strong academic foundation in BCA program'],
 ARRAY['Continue maintaining steady performance', 'Focus on practical programming skills', 'Consider advanced computer science topics'],
 ARRAY['Consistent effort', 'Good understanding', 'Regular attendance'],
 ARRAY['Advanced mathematics', 'Technical writing']);

-- Create indexes for better performance
CREATE INDEX idx_students_roll_number ON students(roll_number);
CREATE INDEX idx_subjects_student_id ON subjects(student_id);
CREATE INDEX idx_attendance_student_id ON attendance(student_id);
CREATE INDEX idx_performance_student_id ON performance_metrics(student_id);
CREATE INDEX idx_notifications_student_id ON notifications(student_id);
CREATE INDEX idx_notifications_status ON notifications(status);
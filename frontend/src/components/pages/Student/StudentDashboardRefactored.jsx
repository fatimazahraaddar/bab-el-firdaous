import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import {
  Card,
  PageHeader,
  Button,
  Badge,
  TableContainer,
  ListItem,
} from '../ui';

export default function StudentDashboardRefactored() {
  const studentInfo = {
    academicStatus: [
      { title: 'Average Grade', value: '87%', icon: '📊', status: 'Good' },
      { title: 'Attendance', value: '95%', icon: '✅', status: 'Excellent' },
      { title: 'Assignments', value: '12/12', icon: '📝', status: 'Complete' },
      { title: 'Pending', value: '1', icon: '⏳', status: 'Math Quiz' }
    ],
    courseGrades: [
      { course: 'Mathematics', grade: 92, teacher: 'Prof. Ahmed' },
      { course: 'English', grade: 85, teacher: 'Prof. Sarah' },
      { course: 'Science', grade: 88, teacher: 'Prof. Hassan' },
      { course: 'History', grade: 80, teacher: 'Prof. Fatima' }
    ],
    upcomingAssignments: [
      { id: 1, title: 'Math Chapter 6 Exercise', due: 'Apr 20, 2026', subject: 'Mathematics', icon: '📐' },
      { id: 2, title: 'English Essay - Poetry', due: 'Apr 22, 2026', subject: 'English', icon: '📖' },
      { id: 3, title: 'Science Lab Report', due: 'Apr 25, 2026', subject: 'Science', icon: '🔬' }
    ],
    announcements: [
      { id: 1, title: 'Mid-Term Exams Schedule', icon: '📅', date: 'Apr 18' },
      { id: 2, title: 'School Sports Day', icon: '🏆', date: 'Apr 20' },
      { id: 3, title: 'Holiday Notice', icon: '🎉', date: 'Apr 15' }
    ]
  };

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="dashboard-content-wrapper">
        {/* Page Header */}
        <PageHeader
          title="My Dashboard"
          subtitle="Your academic progress and upcoming tasks"
          actions={<Button variant="primary" size="sm">View Full Schedule</Button>}
        />

        {/* Academic Status */}
        <div className="card-grid card-grid-2">
          {studentInfo.academicStatus.map(status => (
            <Card key={status.title} className="status-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>
                    {status.title}
                  </p>
                  <h2 style={{ margin: '8px 0 0', fontSize: '28px', fontWeight: 700, color: '#111827' }}>
                    {status.value}
                  </h2>
                  <Badge variant="success" size="sm" style={{ marginTop: '8px' }}>
                    {status.status}
                  </Badge>
                </div>
                <div style={{ fontSize: '28px' }}>{status.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="card-grid card-grid-2">
          {/* Upcoming Assignments */}
          <Card title="Upcoming Assignments" subtitle="Tasks due soon">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {studentInfo.upcomingAssignments.map(assignment => (
                <ListItem
                  key={assignment.id}
                  icon={assignment.icon}
                  title={assignment.title}
                  subtitle={`${assignment.subject} • Due: ${assignment.due}`}
                  action={<Button variant="outline" size="sm">View</Button>}
                />
              ))}
            </div>
          </Card>

          {/* School Announcements */}
          <Card title="School Announcements" subtitle="Important updates">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {studentInfo.announcements.map(ann => (
                <ListItem
                  key={ann.id}
                  icon={ann.icon}
                  title={ann.title}
                  subtitle={ann.date}
                  action={<Button variant="outline" size="sm">Read</Button>}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Course Grades */}
        <TableContainer title="My Course Grades">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Course</th>
                <th>Grade</th>
                <th>Teacher</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentInfo.courseGrades.map((course, idx) => (
                <tr key={idx}>
                  <td>{course.course}</td>
                  <td style={{ fontSize: '16px', fontWeight: 600, color: '#4f46e5' }}>
                    {course.grade}%
                  </td>
                  <td>{course.teacher}</td>
                  <td>
                    {course.grade >= 90 && <Badge variant="success">Excellent</Badge>}
                    {course.grade >= 80 && course.grade < 90 && <Badge variant="primary">Good</Badge>}
                    {course.grade < 80 && <Badge variant="warning">Needs Improvement</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </div>

      <style>{`
        .dashboard-content-wrapper {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .status-card {
          transition: all 0.3s ease;
        }

        .status-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(79, 70, 229, 0.12);
        }

        @media (max-width: 768px) {
          .dashboard-content-wrapper {
            padding: 16px;
            gap: 16px;
          }

          .card-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

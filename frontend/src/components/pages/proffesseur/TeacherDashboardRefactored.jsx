import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import {
  Card,
  PageHeader,
  Button,
  Badge,
  TableContainer,
  ListItem,
  FormField,
} from '../ui';

export default function TeacherDashboardRefactored() {
  const [filter, setFilter] = useState('');

  const teacherInfo = {
    classes: [
      { id: 1, name: 'Class 10A', students: 30, icon: '📚' },
      { id: 2, name: 'Class 10B', students: 28, icon: '📚' },
      { id: 3, name: 'Class 11A', students: 32, icon: '📚' }
    ],
    recentAssignments: [
      { id: 1, title: 'Mathematics Chapter 5', class: 'Class 10A', due: 'Apr 20', status: 'Active' },
      { id: 2, title: 'History Essay', class: 'Class 10B', due: 'Apr 22', status: 'Active' },
      { id: 3, title: 'Science Project', class: 'Class 11A', due: 'Apr 25', status: 'Active' }
    ],
    todaySchedule: [
      { time: '09:00 AM', class: 'Class 10A', subject: 'Mathematics', room: 'Room 101' },
      { time: '10:30 AM', class: 'Class 10B', subject: 'Mathematics', room: 'Room 102' },
      { time: '01:00 PM', class: 'Class 11A', subject: 'Mathematics', room: 'Room 201' }
    ]
  };

  return (
    <DashboardLayout userRole="teacher" userName="Prof. Ahmed">
      <div className="dashboard-content-wrapper">
        {/* Page Header */}
        <PageHeader
          title="Dashboard"
          subtitle="Manage your classes and assignments"
          actions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="primary" size="sm">Create Assignment</Button>
              <Button variant="outline" size="sm">View Schedule</Button>
            </div>
          }
        />

        {/* My Classes */}
        <Card title="My Classes" subtitle="Classes you're teaching this semester">
          <div className="card-grid card-grid-3">
            {teacherInfo.classes.map(cls => (
              <Card key={cls.id} className="class-card">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{cls.icon}</div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{cls.name}</h3>
                  <p style={{ margin: '8px 0 0', color: '#6b7280', fontSize: '14px' }}>
                    {cls.students} Students
                  </p>
                  <Button variant="outline" size="sm" style={{ marginTop: '12px', width: '100%' }}>
                    Manage
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Main Grid */}
        <div className="card-grid card-grid-2">
          {/* Active Assignments */}
          <Card title="Active Assignments" subtitle="Assignments you've created">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {teacherInfo.recentAssignments.map(assignment => (
                <ListItem
                  key={assignment.id}
                  icon="📝"
                  title={assignment.title}
                  subtitle={`${assignment.class} • Due: ${assignment.due}`}
                  badge={<Badge variant="success" size="sm">{assignment.status}</Badge>}
                  action={<Button variant="outline" size="sm">Edit</Button>}
                />
              ))}
            </div>
          </Card>

          {/* Today's Schedule */}
          <Card title="Today's Schedule" subtitle="Your classes for today">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {teacherInfo.todaySchedule.map((session, idx) => (
                <ListItem
                  key={idx}
                  icon="🕐"
                  title={session.time}
                  subtitle={`${session.class} - ${session.subject} (${session.room})`}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Student Performance */}
        <TableContainer title="Student Performance - Class 10A">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Last Assignment</th>
                <th>Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ahmed Ibrahim</td>
                <td>Chapter 5 Quiz</td>
                <td>92%</td>
                <td><Badge variant="success">Excellent</Badge></td>
                <td><Button variant="outline" size="sm">Details</Button></td>
              </tr>
              <tr>
                <td>Fatima Hassan</td>
                <td>Chapter 5 Quiz</td>
                <td>85%</td>
                <td><Badge variant="primary">Good</Badge></td>
                <td><Button variant="outline" size="sm">Details</Button></td>
              </tr>
              <tr>
                <td>Mohammed Ali</td>
                <td>Chapter 5 Quiz</td>
                <td>70%</td>
                <td><Badge variant="warning">Fair</Badge></td>
                <td><Button variant="outline" size="sm">Details</Button></td>
              </tr>
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

        .class-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .class-card:hover {
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

          .card-grid-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

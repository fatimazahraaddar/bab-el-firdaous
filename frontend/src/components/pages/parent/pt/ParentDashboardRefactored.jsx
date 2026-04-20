import React, { useState } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import {
  Card,
  PageHeader,
  Button,
  Badge,
  TableContainer,
  ListItem,
} from '../ui';

export default function ParentDashboardRefactored() {
  const [selectedChild, setSelectedChild] = useState(0);

  const children = [
    {
      id: 1,
      name: 'Ahmed',
      class: 'Class 10A',
      avatar: '👦',
      attendance: '95%',
      averageGrade: '87%'
    },
    {
      id: 2,
      name: 'Fatima',
      class: 'Class 8B',
      avatar: '👧',
      attendance: '92%',
      averageGrade: '91%'
    }
  ];

  const child = children[selectedChild];

  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Meeting', date: 'Apr 22, 2026', icon: '👥' },
    { id: 2, title: 'School Sports Day', date: 'Apr 25, 2026', icon: '🏆' },
    { id: 3, title: 'End of Term Exam', date: 'May 1, 2026', icon: '📋' }
  ];

  const recentUpdates = [
    { id: 1, title: 'Assignment Completed', subject: 'Mathematics', date: 'Today' },
    { id: 2, title: 'Grade Posted', subject: 'English', score: '92%', date: 'Yesterday' },
    { id: 3, title: 'Absence Recorded', subject: 'Science', reason: 'Medical', date: '2 days ago' }
  ];

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="dashboard-content-wrapper">
        {/* Page Header */}
        <PageHeader
          title="My Children's Progress"
          subtitle="Monitor your children's academic performance"
          actions={<Button variant="primary" size="sm">Send Message</Button>}
        />

        {/* Child Selection */}
        <Card title="My Children" subtitle="Select a child to view details">
          <div className="card-grid card-grid-2">
            {children.map((c, idx) => (
              <div
                key={c.id}
                onClick={() => setSelectedChild(idx)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: selectedChild === idx ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: selectedChild === idx ? '#fafbff' : 'white'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{c.avatar}</div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{c.name}</h3>
                  <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '13px' }}>{c.class}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Child Performance Cards */}
        <div className="card-grid card-grid-2">
          <Card>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>
                Current Average
              </p>
              <h2 style={{ margin: '8px 0', fontSize: '28px', fontWeight: 700, color: '#111827' }}>
                {child.averageGrade}
              </h2>
              <Badge variant="success" size="sm">Excellent Performance</Badge>
            </div>
          </Card>

          <Card>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>
                Attendance Rate
              </p>
              <h2 style={{ margin: '8px 0', fontSize: '28px', fontWeight: 700, color: '#111827' }}>
                {child.attendance}
              </h2>
              <Badge variant="success" size="sm">On Track</Badge>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="card-grid card-grid-2">
          {/* Upcoming Events */}
          <Card title="Upcoming School Events" subtitle="Important dates">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingEvents.map(event => (
                <ListItem
                  key={event.id}
                  icon={event.icon}
                  title={event.title}
                  subtitle={event.date}
                  action={<Button variant="outline" size="sm">Calendar</Button>}
                />
              ))}
            </div>
          </Card>

          {/* Recent Updates */}
          <Card title="Recent Updates" subtitle={`${child.name}'s activity`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentUpdates.map(update => (
                <ListItem
                  key={update.id}
                  icon="ℹ️"
                  title={update.title}
                  subtitle={`${update.subject || update.reason || ''} • ${update.date}`}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Subject Grades */}
        <TableContainer title={`${child.name}'s Subject Grades`}>
          <table className="table-custom">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Current Grade</th>
                <th>Teacher</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mathematics</td>
                <td>92%</td>
                <td>Prof. Ahmed</td>
                <td><Badge variant="success">Excellent</Badge></td>
              </tr>
              <tr>
                <td>English</td>
                <td>85%</td>
                <td>Prof. Sarah</td>
                <td><Badge variant="primary">Good</Badge></td>
              </tr>
              <tr>
                <td>Science</td>
                <td>88%</td>
                <td>Prof. Hassan</td>
                <td><Badge variant="success">Excellent</Badge></td>
              </tr>
              <tr>
                <td>History</td>
                <td>80%</td>
                <td>Prof. Fatima</td>
                <td><Badge variant="primary">Good</Badge></td>
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

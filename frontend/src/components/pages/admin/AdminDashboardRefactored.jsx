import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import {
  Card,
  PageHeader,
  Button,
  Badge,
  Alert,
  ListItem,
  TableContainer,
} from '../ui';

export default function AdminDashboardRefactored() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'success', message: 'New student registered' }
  ]);

  // Stats data structure
  const stats = [
    { title: 'Total Students', value: 450, icon: '👨‍🎓', trend: '+12%' },
    { title: 'Teachers', value: 35, icon: '👩‍🏫', trend: '+2%' },
    { title: 'Classes', value: 18, icon: '🏫', trend: 'stable' },
    { title: 'Announcements', value: 28, icon: '📢', trend: '+5' }
  ];

  // Recent announcements
  const announcements = [
    { id: 1, title: 'School Festival', date: 'Apr 20, 2026', icon: '🎉' },
    { id: 2, title: 'Exam Schedule Released', date: 'Apr 18, 2026', icon: '📋' },
    { id: 3, title: 'Holiday Notice', date: 'Apr 15, 2026', icon: '🎄' }
  ];

  // Recent activities
  const activities = [
    { id: 1, icon: '✅', title: 'New student added', subtitle: 'Ahmed Ibrahim' },
    { id: 2, icon: '📝', title: 'Announcement published', subtitle: 'School Festival' },
    { id: 3, icon: '🔄', title: 'Schedule updated', subtitle: 'Class 9A' }
  ];

  return (
    <DashboardLayout userRole="admin" userName="Administrator">
      <div className="dashboard-content-wrapper">
        {/* Page Header */}
        <PageHeader
          title="Dashboard"
          subtitle="Welcome back! Here's your school overview."
          actions={<Button variant="primary" size="sm">Generate Report</Button>}
        />

        {/* Alerts */}
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
          />
        ))}

        {/* Stats Grid */}
        <div className="card-grid card-grid-2">
          {stats.map(stat => (
            <Card key={stat.title} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>
                    {stat.title}
                  </p>
                  <h2 style={{ margin: '8px 0 0', fontSize: '28px', fontWeight: 700, color: '#111827' }}>
                    {stat.value}
                  </h2>
                  <Badge variant="success" size="sm" style={{ marginTop: '8px' }}>
                    {stat.trend}
                  </Badge>
                </div>
                <div style={{ fontSize: '32px' }}>{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="card-grid card-grid-2">
          {/* Recent Announcements */}
          <Card title="Recent Announcements" subtitle="Latest school updates">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {announcements.map(ann => (
                <ListItem
                  key={ann.id}
                  icon={ann.icon}
                  title={ann.title}
                  subtitle={ann.date}
                  action={<Button variant="outline" size="sm">View</Button>}
                />
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card title="Recent Activities" subtitle="Recent system events">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.map(activity => (
                <ListItem
                  key={activity.id}
                  icon={activity.icon}
                  title={activity.title}
                  subtitle={activity.subtitle}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Students Performance Table */}
        <TableContainer title="Top Performing Students">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Average Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mohammed Youssef</td>
                <td>Class 12A</td>
                <td>92%</td>
                <td><Badge variant="success">Excellent</Badge></td>
              </tr>
              <tr>
                <td>Fatima Ahmed</td>
                <td>Class 11B</td>
                <td>88%</td>
                <td><Badge variant="success">Excellent</Badge></td>
              </tr>
              <tr>
                <td>Omar Hassan</td>
                <td>Class 10C</td>
                <td>78%</td>
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

        .stat-card {
          transition: all 0.3s ease;
        }

        .stat-card:hover {
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

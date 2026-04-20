import React, { useState, useEffect } from 'react';
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
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH API
  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then(res => res.json())
      .then(data => {
        setStats(data.stats || []);
        setAnnouncements(data.announcements || []);
        setActivities(data.activities || []);
        setStudents(data.students || []);
        setAlerts(data.alerts || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ LOADING
  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement du dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin" userName="Administrator">
      <div className="dashboard-content-wrapper">

        {/* HEADER */}
        <PageHeader
          title="Dashboard"
          subtitle="Vue globale de votre école"
          actions={<Button variant="primary" size="sm">Rapport</Button>}
        />

        {/* ALERTS */}
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
          />
        ))}

        {/* STATS */}
        <div className="card-grid card-grid-2">
          {stats.map((stat, i) => (
            <Card key={i} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p>{stat.title}</p>
                  <h2>{stat.value}</h2>
                  <Badge variant="success">{stat.change}</Badge>
                </div>
                <div style={{ fontSize: 28 }}>{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* ANNOUNCEMENTS + ACTIVITIES */}
        <div className="card-grid card-grid-2">

          <Card title="Annonces">
            {announcements.map(a => (
              <ListItem
                key={a.id}
                icon="📢"
                title={a.title}
                subtitle={a.date}
              />
            ))}
          </Card>

          <Card title="Activités">
            {activities.map(a => (
              <ListItem
                key={a.id}
                icon="⚡"
                title={a.message}
                subtitle={a.time}
              />
            ))}
          </Card>

        </div>

        {/* STUDENTS TABLE */}
        <TableContainer title="Top Élèves">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Classe</th>
                <th>Moyenne</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.class}</td>
                  <td>{s.average}%</td>
                  <td>
                    <Badge variant={s.average > 85 ? "success" : "primary"}>
                      {s.average > 85 ? "Excellent" : "Bon"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>

      </div>

      {/* STYLE */}
      <style>{`
        .dashboard-content-wrapper {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .loading {
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
      `}</style>
    </DashboardLayout>
  );
}
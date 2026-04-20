import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [stats, setStats] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH DATA
  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then(res => res.json())
      .then(data => {
        setStats(data.stats || []);
        setAnnouncements(data.announcements || []);
        setActivities(data.activities || []);
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
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted">Bienvenue dans le panneau d'administration</p>
        </div>

        {/* 📊 Stats */}
        <div className="row g-3 mb-4">
          {stats.map((s, i) => (
            <div key={i} className="col-md-3">
              <div className="card border-0 shadow-sm p-3 h-100">

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1">{s.title}</p>
                    <h4 className="fw-bold">{s.value}</h4>
                  </div>

                  <div style={{ fontSize: "28px" }}>
                    {s.icon || "📊"}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="row g-3">

          {/* 📢 Annonces */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-3 h-100">

              <h5 className="fw-semibold mb-3">📢 Annonces récentes</h5>

              {announcements.length === 0 ? (
                <p className="text-muted">Aucune annonce</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {announcements.map((a) => (
                    <li key={a.id} className="list-group-item d-flex justify-content-between px-0">
                      <span>{a.title}</span>
                      <small className="text-muted">
                        {new Date(a.date || a.created_at).toLocaleDateString()}
                      </small>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </div>

          {/* ⚡ Activités */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-3 h-100">

              <h5 className="fw-semibold mb-3">⚡ Activités récentes</h5>

              {activities.length === 0 ? (
                <p className="text-muted">Aucune activité</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {activities.map((a, i) => (
                    <li key={i} className="list-group-item px-0">
                      {a.message || a}
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </div>

        </div>

        {/* 📅 Section timetable */}
        <div className="card border-0 shadow-sm p-3 mt-4">
          <h5 className="fw-semibold mb-3">📅 Emploi du temps aujourd’hui</h5>

          <p className="text-muted">
            (À connecter avec API timetable plus tard)
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}
import DashboardLayout from '../../pages/Layouts/DashboardLayout';

export default function Dashboard() {

  const stats = [
    { title: "Élèves", value: 120, icon: "👨‍🎓" },
    { title: "Enseignants", value: 15, icon: "👩‍🏫" },
    { title: "Classes", value: 10, icon: "🏫" },
    { title: "Annonces", value: 5, icon: "📢" }
  ];

  const announcements = [
    { title: "Fête école", date: "2026-04-15" },
    { title: "Vacances", date: "2026-04-20" }
  ];

  const activities = [
    "Nouvel élève ajouté",
    "Annonce publiée",
    "Emploi du temps modifié"
  ];

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
                    {s.icon}
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

              <div className="d-flex justify-content-between mb-3">
                <h5 className="fw-semibold">📢 Annonces récentes</h5>
              </div>

              <ul className="list-group list-group-flush">
                {announcements.map((a, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between px-0">
                    <span>{a.title}</span>
                    <small className="text-muted">
                      {new Date(a.date).toLocaleDateString()}
                    </small>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {/* ⚡ Activités */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-3 h-100">

              <h5 className="fw-semibold mb-3">⚡ Activités récentes</h5>

              <ul className="list-group list-group-flush">
                {activities.map((a, i) => (
                  <li key={i} className="list-group-item px-0">
                    {a}
                  </li>
                ))}
              </ul>

            </div>
          </div>

        </div>

        {/* 📅 Section future */}
        <div className="card border-0 shadow-sm p-3 mt-4">
          <h5 className="fw-semibold mb-3">📅 Emploi du temps aujourd’hui</h5>

          <p className="text-muted">
            Aucun cours programmé aujourd’hui (exemple)
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useEffect, useState } from "react";

export default function AbsenceStatistics() {

  const [stats, setStats] = useState(null);
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/absences", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const rows = Array.isArray(data) ? data : [];
        const total = rows.length;
        const absent = rows.filter((a) => (a.status || "absent") === "absent").length;
        const present = rows.filter((a) => (a.status || "absent") === "present").length;
        const late = rows.filter((a) => (a.status || "absent") === "late").length;

        const byStudent = rows.reduce((acc, row) => {
          const studentName = row.student?.user?.name || "Inconnu";
          if (!acc[studentName]) acc[studentName] = 0;
          if ((row.status || "absent") === "absent") {
            acc[studentName] += 1;
          }
          return acc;
        }, {});

        const top = Object.entries(byStudent)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setStats({ total, absent, present, late });
        setTopStudents(top);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des statistiques...</p>;
  if (!stats) return <p>Erreur de chargement</p>;

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Statistiques des absences</h2>

        {/* Cards stats */}
        <div className="row mb-4">

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h5>Total</h5>
              <h3>{stats.total}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center text-danger">
              <h5>Absents</h5>
              <h3>{stats.absent}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center text-success">
              <h5>Présents</h5>
              <h3>{stats.present}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center text-warning">
              <h5>Retards</h5>
              <h3>{stats.late}</h3>
            </div>
          </div>

        </div>

        <div className="row">

          {/* Top students */}
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h5 className="mb-3">Élèves les plus absents</h5>

              <ul className="list-group">
                {topStudents.map((student, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <span>{student.name}</span>
                    <span className="badge bg-danger">{student.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Répartition */}
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h5 className="mb-3">Répartition</h5>

              <p>Absents : {stats.absent}</p>
              <p>Présents : {stats.present}</p>
              <p>Retards : {stats.late}</p>

              <div className="progress mt-3">
                <div
                  className="progress-bar bg-danger"
                  style={{ width: `${stats.total ? (stats.absent / stats.total) * 100 : 0}%` }}
                ></div>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${stats.total ? (stats.present / stats.total) * 100 : 0}%` }}
                ></div>
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${stats.total ? (stats.late / stats.total) * 100 : 0}%` }}
                ></div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function Absence() {

  const [filter, setFilter] = useState("all");

  const absences = [
    {
      id: 1,
      date: "2026-04-10",
      subject: "Math",
      type: "Absence",
      justified: false
    },
    {
      id: 2,
      date: "2026-04-08",
      subject: "Physique",
      type: "Retard",
      justified: true
    },
    {
      id: 3,
      date: "2026-04-05",
      subject: "Français",
      type: "Absence",
      justified: true
    }
  ];

  const filteredAbsences = absences.filter(a => {
    return filter === "all" || a.type === filter;
  });

  const totalAbsences = absences.filter(a => a.type === "Absence").length;
  const totalRetards = absences.filter(a => a.type === "Retard").length;

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📊 Absences</h2>
          <p>Suivi de vos absences et retards</p>
        </div>

        {/* SUMMARY */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Total Absences</h6>
              <h3 className="text-danger">{totalAbsences}</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Total Retards</h6>
              <h3 className="text-warning">{totalRetards}</h3>
            </div>
          </div>

        </div>

        {/* FILTER */}
        <div className="card shadow p-3 mb-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="Absence">Absences</option>
            <option value="Retard">Retards</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Matière</th>
                <th>Type</th>
                <th>Justifié</th>
              </tr>
            </thead>

            <tbody>
              {filteredAbsences.map((a) => (
                <tr key={a.id}>

                  <td>{a.date}</td>

                  <td>{a.subject}</td>

                  <td>
                    <span className={`badge ${
                      a.type === "Absence"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}>
                      {a.type}
                    </span>
                  </td>

                  <td>
                    {a.justified ? (
                      <span className="badge bg-success">✔ Oui</span>
                    ) : (
                      <span className="badge bg-secondary">❌ Non</span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}

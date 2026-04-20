import DashboardLayout from "../Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Absence() {

  const [filter, setFilter] = useState("all");
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/absences",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        setAbsences(res.data);

      } catch (err) {
        console.error("Erreur absences:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsences();
  }, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Chargement des absences...</div>
      </DashboardLayout>
    );
  }

  // 🔥 adapter données backend
  const formattedAbsences = absences.map(a => ({
    id: a.id,
    date: a.date,
    subject: a.subject || "—",
    type: a.status === "absent" ? "Absence" : "Retard",
    justified: a.justified ?? false
  }));

  // 🔍 filtre
  const filteredAbsences = formattedAbsences.filter(a => {
    return filter === "all" || a.type === filter;
  });

  // 📊 stats
  const totalAbsences = formattedAbsences.filter(a => a.type === "Absence").length;
  const totalRetards = formattedAbsences.filter(a => a.type === "Retard").length;

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <h2>📊 Absences</h2>
          <p>Suivi des absences de vos enfants</p>
        </div>

        {/* SUMMARY */}
        <div className="premium-stats">

          <div className="premium-card text-center">
            <h6>Total Absences</h6>
            <h3 className="text-danger">{totalAbsences}</h3>
          </div>

          <div className="premium-card text-center">
            <h6>Total Retards</h6>
            <h3 className="text-warning">{totalRetards}</h3>
          </div>

        </div>

        {/* FILTER */}
        <div className="premium-card mb-4">
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
        <div className="premium-card">

          <table className="table align-middle">
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
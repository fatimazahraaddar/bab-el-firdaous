import DashboardLayout from "../Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChildAbsences() {

  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/absences", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

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

  // 🔥 STATS
  const total = absences.length;
  const justified = absences.filter(a => a.justified).length;
  const notJustified = total - justified;

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <div>
            <h1>📊 Absences</h1>
            <p>Suivi détaillé des absences</p>
          </div>
        </div>

        {/* STATS */}
        <div className="premium-stats">

          <div className="premium-card stat-card">
            <h4>Total</h4>
            <p className="big danger">{total}</p>
          </div>

          <div className="premium-card stat-card">
            <h4>Justifiées</h4>
            <p className="big success">{justified}</p>
          </div>

          <div className="premium-card stat-card">
            <h4>Non justifiées</h4>
            <p className="big warning">{notJustified}</p>
          </div>

        </div>

        {/* TABLE */}
        <div className="premium-card">

          <table className="table align-middle modern-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Enfant</th>
                <th>Statut</th>
                <th>Raison</th>
              </tr>
            </thead>

            <tbody>
              {absences.length > 0 ? (
                absences.map((a) => (
                  <tr key={a.id}>

                    <td>{a.date}</td>

                    <td>{a.student?.user?.name || "—"}</td>

                    <td>
                      <span className={`badge ${
                        a.justified ? "bg-success" : "bg-danger"
                      }`}>
                        {a.justified ? "Justifiée" : "Non justifiée"}
                      </span>
                    </td>

                    <td>
                      {a.reason || "—"}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Aucune absence trouvée
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

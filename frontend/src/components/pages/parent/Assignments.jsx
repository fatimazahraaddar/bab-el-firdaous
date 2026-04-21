import DashboardLayout from "../Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChildAssignments() {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 vérifier retard
  const isLate = (date, status) => {
    return new Date(date) < new Date() && status !== "done";
  };

  useEffect(() => {
    // داخل useEffect في Assignments.jsx
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/assignments", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        // ✅ بما أنك تستعمل paginate(15)، المصفوفة موجودة داخل res.data.data
        // الـ fallback لـ res.data ضروري في حالة لم يكن هناك Pagination
        const dataArray = res.data.data || (Array.isArray(res.data) ? res.data : []);
        setAssignments(dataArray);

      } catch (err) {
        console.error("Erreur devoirs:", err);
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Chargement des devoirs...</div>
      </DashboardLayout>
    );
  }

  // 🔥 STATS
  const total = assignments.length;
  const done = assignments.filter((a) => a.status === "done").length;
  const late = assignments.filter((a) => isLate(a.due_date, a.status)).length;

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <div>
            <h1>📄 Devoirs</h1>
            <p>Suivi intelligent des devoirs</p>
          </div>
        </div>

        {/* STATS */}
        <div className="premium-stats">

          <div className="premium-card stat-card">
            <h4>Total</h4>
            <p className="big">{total}</p>
          </div>

          <div className="premium-card stat-card">
            <h4>Faits</h4>
            <p className="big success">{done}</p>
          </div>

          <div className="premium-card stat-card">
            <h4>En retard</h4>
            <p className="big danger">{late}</p>
          </div>

        </div>

        {/* TABLE */}
        <div className="premium-card">

          <table className="table align-middle modern-table">

            <thead>
              <tr>
                <th>Titre</th>
                <th>Matière</th>
                <th>Classe</th>
                <th>Date limite</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {assignments.length > 0 ? (
                assignments.map((a) => (
                  <tr key={a.id}>

                    <td>{a.title}</td>

                    <td>{a.subject}</td>

                    <td>{a.class?.name || "—"}</td>

                    <td>{a.due_date}</td>

                    <td>
                      <span className={`badge ${a.status === "done"
                          ? "bg-success"
                          : isLate(a.due_date, a.status)
                            ? "bg-danger"
                            : "bg-warning"
                        }`}>
                        {a.status === "done"
                          ? "✔ Fait"
                          : isLate(a.due_date, a.status)
                            ? "En retard"
                            : "En cours"}
                      </span>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Aucun devoir trouvé
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

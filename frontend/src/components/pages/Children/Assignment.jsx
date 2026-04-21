import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Assignments() {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 🔥 fonction retard
  const isLate = (date, status) => {
    return new Date(date) < new Date() && status !== "done";
  };

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <h2>📄 Devoirs</h2>
          <p>Suivi des devoirs de vos enfants</p>
        </div>

        {/* TABLE */}
        <div className="premium-card">

          <table className="table align-middle">
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
              {assignments.map((a) => {

                const late = isLate(a.due_date, a.status);

                return (
                  <tr key={a.id}>

                    <td>{a.title}</td>

                    <td>{a.subject}</td>

                    <td>{a.class?.name || "—"}</td>

                    <td>{a.due_date}</td>

                    <td>
                      <span className={`badge ${a.status === "done"
                          ? "bg-success"
                          : late
                            ? "bg-danger"
                            : "bg-warning"
                        }`}>
                        {a.status === "done"
                          ? "✔ Fait"
                          : late
                            ? "En retard"
                            : "En cours"}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [activeTab, setActiveTab] = useState("info");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_BASE, id]);

  if (loading || !student) {
    return (
      <DashboardLayout>
        <div className="text-center mt-5">Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail élève</h2>
          <button onClick={() => navigate(`/admin/students/edit/${student.id}`)} className="btn btn-warning">
            ✏️ Modifier
          </button>
        </div>

        <ul className="nav nav-tabs mb-3">
          {["info", "parent", "absences", "payments"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <div className="card shadow p-3">
          {activeTab === "info" && (
            <>
              <p>
                <strong>Nom :</strong> {student.user?.name}
              </p>
              <p>
                <strong>Email :</strong> {student.user?.email}
              </p>
              <p>
                <strong>Niveau :</strong> {student.level}
              </p>
              <p>
                <strong>Classe :</strong> {student.school_class?.name || "—"}
              </p>
              <p>
                <strong>Téléphone :</strong> {student.phone || "-"}
              </p>
              <p>
                <strong>Transport :</strong>{" "}
                {student.transport === "bus" ? `🚌 ${student.bus?.number || "Bus"}` : "🚶 Piéton"}
              </p>
            </>
          )}

          {activeTab === "parent" && (
            <>
              <p>
                <strong>Nom parent :</strong> {student.guardian?.name || "—"}
              </p>
              <p>
                <strong>Email parent :</strong> {student.guardian?.email || "—"}
              </p>
              <p>
                <strong>Téléphone parent :</strong> {student.guardian?.phone || "—"}
              </p>
            </>
          )}

          {activeTab === "absences" && (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Raison</th>
                  <th>Justifiée</th>
                </tr>
              </thead>
              <tbody>
                {(student.absences || []).map((a) => (
                  <tr key={a.id}>
                    <td>{new Date(a.date).toLocaleDateString()}</td>
                    <td>{a.reason || "—"}</td>
                    <td>{a.justified ? "Oui" : "Non"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "payments" && (
            <table className="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {(student.payments || []).map((p) => (
                  <tr key={p.id}>
                    <td>{p.description}</td>
                    <td>{p.amount}</td>
                    <td>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}


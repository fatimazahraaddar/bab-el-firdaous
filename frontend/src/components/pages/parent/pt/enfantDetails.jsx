import DashboardLayout from "../../Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ChildDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState(null);
  const [stats, setStats] = useState({
    absences: 0,
    assignments: 0,
    unpaidPayments: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };

        const [studentRes, absencesRes, paymentsRes, assignmentsRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/students/${id}`, { headers }),
          axios.get(`http://localhost:8000/api/absences?student_id=${id}`, { headers }),
          axios.get(`http://localhost:8000/api/payments?student_id=${id}`, { headers }),
          axios.get(`http://localhost:8000/api/assignments?student_id=${id}`, { headers }),
        ]);

        const payments = Array.isArray(paymentsRes.data) ? paymentsRes.data : [];

        setChild(studentRes.data);
        setStats({
          absences: Array.isArray(absencesRes.data) ? absencesRes.data.length : 0,
          assignments: Array.isArray(assignmentsRes.data) ? assignmentsRes.data.length : 0,
          unpaidPayments: payments.filter((p) => p.status === "unpaid").length,
        });
      } catch (err) {
        console.error("Erreur details enfant:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Chargement du profil enfant...</div>
      </DashboardLayout>
    );
  }

  if (!child) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Enfant introuvable.</div>
      </DashboardLayout>
    );
  }

  const name = child.user?.name || "Élève";
  const className = child.school_class?.name || child.schoolClass?.name || "--";
  const transport =
    child.transport === "bus"
      ? `Bus ${child.bus?.number || ""}`.trim()
      : child.transport || "Non défini";

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h2>👤 Détails de l'enfant</h2>
            <p>Suivi complet de {name}</p>
          </div>
          <button className="btn btn-outline-secondary" onClick={() => navigate("/parent/children")}>
            ← Retour
          </button>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="card shadow p-4 text-center">
              <img
                src="https://via.placeholder.com/120"
                alt="child"
                className="rounded-circle mb-3"
              />
              <h5>{name}</h5>
              <p className="text-muted">{className}</p>
              <span className="badge bg-primary">👨‍🎓 Élève</span>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card shadow p-3 mb-4">
              <h5>📋 Informations</h5>
              <div className="row mt-3">
                <div className="col-md-6 mb-2">
                  <strong>Niveau:</strong> {child.level || "--"}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Classe:</strong> {className}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Transport:</strong> 🚌 {transport}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Téléphone:</strong> {child.phone || "--"}
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card shadow p-3 text-center">
                  <h6>⚠️ Absences</h6>
                  <h3 className={stats.absences > 0 ? "text-danger" : "text-success"}>
                    {stats.absences}
                  </h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow p-3 text-center">
                  <h6>📝 Devoirs</h6>
                  <h3>{stats.assignments}</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow p-3 text-center">
                  <h6>💰 Paiements en attente</h6>
                  <h3 className={stats.unpaidPayments > 0 ? "text-danger" : "text-success"}>
                    {stats.unpaidPayments}
                  </h3>
                </div>
              </div>
            </div>

            <div className="card shadow p-3">
              <h5>⚡ Accès rapide</h5>
              <div className="row mt-3">
                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-danger w-100" onClick={() => navigate("/parent/absences")}>
                    📊 Absences
                  </button>
                </div>
                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-success w-100" onClick={() => navigate("/parent/assignments")}>
                    📄 Devoirs
                  </button>
                </div>
                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-info w-100" onClick={() => navigate("/parent/payments")}>
                    💰 Paiements
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


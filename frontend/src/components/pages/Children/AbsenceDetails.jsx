import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AbsenceDetails() {

  const { id } = useParams();

  const [absence, setAbsence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchAbsence = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8000/api/absences/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        setAbsence(res.data);

      } catch (err) {
        console.error("Erreur détail absence:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsence();
  }, [id]);

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Chargement...</div>
      </DashboardLayout>
    );
  }

  if (!absence) {
    return <div>Absence introuvable</div>;
  }

  // 🔥 adaptation backend → frontend
  const type = absence.status === "absent" ? "Absence" : "Retard";

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <h2>📄 Détail de l'absence</h2>
          <p>Informations complètes</p>
        </div>

        {/* MAIN CARD */}
        <div className="premium-card mb-4">

          <div className="row">

            <div className="col-md-6 mb-3">
              <h6>Date</h6>
              <p>{absence.date}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Matière</h6>
              <p>{absence.subject || "—"}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Type</h6>
              <span className={`badge ${
                type === "Absence" ? "bg-danger" : "bg-warning"
              }`}>
                {type}
              </span>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Statut</h6>
              {absence.justified ? (
                <span className="badge bg-success">✔ Justifiée</span>
              ) : (
                <span className="badge bg-danger">❌ Non justifiée</span>
              )}
            </div>

          </div>

        </div>

        {/* COMMENT */}
        <div className="premium-card mb-4">
          <h5>💬 Commentaire administration</h5>
          <p className="mt-2">{absence.comment || "Aucun commentaire"}</p>
        </div>

        {/* JUSTIFICATION */}
        {!absence.justified && (
          <div className="premium-card">

            <h5>📝 Justifier l'absence</h5>

            <textarea
              className="form-control mt-3"
              rows="4"
              placeholder="Écrire la raison..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>

            <button
              className="btn btn-primary mt-3"
              onClick={() => alert("Envoyer justification (API à faire)")}
            >
              Envoyer justification
            </button>

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}
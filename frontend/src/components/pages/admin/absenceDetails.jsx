import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AbsenceDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // 🔥 récupérer ID depuis URL

  const [absence, setAbsence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Reset loading mni kaye-tbeddel l-ID
    setLoading(true);

    fetch(`http://localhost:8000/api/absences/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        // 1. Ila l-id makayench (404) aw l-user ma3ndouch l-haq (403)
        if (!res.ok) {
          throw new Error(`Erreur: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // 2. Laravel kaye-reje3 l-absence nichan (machi data.data)
        setAbsence(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur AbsenceDetail:", err);
        setAbsence(null); // Bach n-affichiw "introuvable"
        setLoading(false);
      });
  }, [id]);

  const getStatusColor = (status) => {
    if (status === "absent") return "bg-danger";
    if (status === "present") return "bg-success";
    if (status === "late") return "bg-warning";
    return "bg-secondary";
  };

  if (loading) return <p>Chargement...</p>;
  if (!absence) return <p>Absence introuvable</p>;

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">
        <h2 className="mb-4">Détail de l'absence</h2>

        <div className="card shadow p-4">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Élève :</strong> {absence.student?.user?.name || "—"}
            </div>
            <div className="col-md-6">
              <strong>Raison :</strong> {absence.reason || "—"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Date :</strong>{" "}
              {new Date(absence.date).toLocaleDateString()}
            </div>
            <div className="col-md-6">
              <strong>Justifiée :</strong> {absence.justified ? "Oui" : "Non"}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Statut :</strong>{" "}
              <span className={`badge ${getStatusColor(absence.status || (absence.justified ? "present" : "absent"))}`}>
                {absence.status || (absence.justified ? "present" : "absent")}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <strong>Remarque :</strong>
            <p className="mt-2">{absence.reason || "Aucune remarque"}</p>
          </div>

          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Retour
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

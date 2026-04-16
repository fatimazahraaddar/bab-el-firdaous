import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function AbsenceDetail() {
  const absence = {
    student: "Ahmed Benali",
    course: "Mathématiques",
    date: "2026-04-10",
    status: "Absent",
    teacher: "Mme Fatima",
    note: "Absence non justifiée",
  };
  const getStatusColor = (status) => {
    if (status === "Absent") return "bg-danger";
    if (status === "Présent") return "bg-success";
    if (status === "Retard") return "bg-warning";
  };
  const navigate = useNavigate();
  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">
        <h2 className="mb-4">Détail de l'absence</h2>

        <div className="card shadow p-4">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Élève :</strong> {absence.student}
            </div>
            <div className="col-md-6">
              <strong>Cours :</strong> {absence.course}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Date :</strong> {absence.date}
            </div>
            <div className="col-md-6">
              <strong>Professeur :</strong> {absence.teacher}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Statut :</strong>{" "}
              <span className={`badge ${getStatusColor(absence.status)}`}>
                {absence.status}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <strong>Remarque :</strong>
            <p className="mt-2">{absence.note}</p>
          </div>

          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Retour
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function AbsenceDetails() {

  const absence = {
    date: "2026-04-10",
    subject: "Math",
    teacher: "Mr Karim",
    type: "Absence",
    justified: false,
    reason: "",
    comment: "Absence non justifiée"
  };

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📄 Détail de l'absence</h2>
          <p>Informations complètes</p>
        </div>

        {/* MAIN CARD */}
        <div className="card shadow p-4 mb-4">

          <div className="row">

            <div className="col-md-6 mb-3">
              <h6>Date</h6>
              <p>{absence.date}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Matière</h6>
              <p>{absence.subject}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Enseignant</h6>
              <p>{absence.teacher}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Type</h6>
              <span className={`badge ${
                absence.type === "Absence"
                  ? "bg-danger"
                  : "bg-warning"
              }`}>
                {absence.type}
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

        {/* COMMENT ADMIN */}
        <div className="card shadow p-3 mb-4">
          <h5>💬 Commentaire administration</h5>
          <p className="mt-2">{absence.comment}</p>
        </div>

        {/* JUSTIFICATION */}
        {!absence.justified && (
          <div className="card shadow p-3">

            <h5>📝 Justifier l'absence</h5>

            <textarea
              className="form-control mt-3"
              rows="4"
              placeholder="Écrire la raison..."
            ></textarea>

            <button className="btn btn-primary mt-3">
              Envoyer justification
            </button>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

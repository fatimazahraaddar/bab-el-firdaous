import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function AssignmentDetails() {

  const assignment = {
    title: "Exercice Math",
    subject: "Math",
    teacher: "Mr Karim",
    description: "Résoudre les exercices 1 à 5 page 23.",
    file: "exercice_math.pdf",
    dueDate: "2026-04-20",
    status: "Non rendu"
  };

  const [submittedFile, setSubmittedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // 📎 upload devoir étudiant
  const handleFile = (e) => {
    setSubmittedFile(e.target.files[0]);
  };

  const submitAssignment = () => {
    if (!submittedFile) {
      alert("Veuillez ajouter un fichier !");
      return;
    }

    console.log("Fichier envoyé :", submittedFile);

    setSubmitted(true);
    alert("Devoir envoyé !");
  };

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📄 Détail du devoir</h2>
          <p>{assignment.subject}</p>
        </div>

        {/* MAIN INFO */}
        <div className="card shadow p-4 mb-4">

          <div className="row">

            <div className="col-md-6 mb-3">
              <h6>Titre</h6>
              <p>{assignment.title}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Professeur</h6>
              <p>{assignment.teacher}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Date limite</h6>
              <p className="text-danger">{assignment.dueDate}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Statut</h6>
              <span className={`badge ${
                submitted ? "bg-success" : "bg-danger"
              }`}>
                {submitted ? "Rendu" : "Non rendu"}
              </span>
            </div>

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="card shadow p-3 mb-4">
          <h5>📝 Consigne</h5>
          <p className="mt-2">{assignment.description}</p>
        </div>

        {/* FILE FROM TEACHER */}
        <div className="card shadow p-3 mb-4">
          <h5>📎 Fichier du professeur</h5>

          <a href="#" className="btn btn-outline-primary mt-2">
            📥 Télécharger {assignment.file}
          </a>
        </div>

        {/* SUBMIT */}
        {!submitted && (
          <div className="card shadow p-3">

            <h5>📤 Rendre le devoir</h5>

            <input
              type="file"
              className="form-control mt-3"
              onChange={handleFile}
            />

            {submittedFile && (
              <p className="mt-2">📎 {submittedFile.name}</p>
            )}

            <button
              className="btn btn-success mt-3"
              onClick={submitAssignment}
            >
              Envoyer
            </button>

          </div>
        )}

        {/* DONE */}
        {submitted && (
          <div className="card shadow p-3 text-center">
            <h5 className="text-success">✔ Devoir envoyé avec succès</h5>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

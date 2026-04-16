import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function TeacherAssignments() {

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Exercice Math",
      class: "3A",
      dueDate: "2026-04-20"
    },
    {
      id: 2,
      title: "Rédaction Français",
      class: "3A",
      dueDate: "2026-04-15"
    }
  ]);

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const isExpired = (date) => {
    return new Date(date) < new Date();
  };

  return (
    <DashboardLayout userRole="teacher" userName="Mr Karim">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="d-flex justify-content-between mb-4">
          <div>
            <h2>📄 Gestion des devoirs</h2>
            <p>Créer et gérer les devoirs</p>
          </div>

          <button className="btn btn-primary">
            ➕ Ajouter
          </button>
        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Classe</th>
                <th>Date limite</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a) => (
                <tr key={a.id}>

                  <td>{a.title}</td>

                  <td>{a.class}</td>

                  <td>{a.dueDate}</td>

                  <td>
                    <span className={`badge ${
                      isExpired(a.dueDate)
                        ? "bg-danger"
                        : "bg-success"
                    }`}>
                      {isExpired(a.dueDate) ? "Expiré" : "Actif"}
                    </span>
                  </td>

                  <td>

                    <button className="btn btn-sm btn-outline-primary me-2">
                      👀
                    </button>

                    <button className="btn btn-sm btn-outline-warning me-2">
                      ✏️
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteAssignment(a.id)}
                    >
                      🗑
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}

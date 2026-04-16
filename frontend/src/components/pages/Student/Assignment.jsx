import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function Assignments() {

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Exercice Math",
      subject: "Math",
      dueDate: "2026-04-20",
      status: "Non fait"
    },
    {
      id: 2,
      title: "Rédaction Français",
      subject: "Français",
      dueDate: "2026-04-18",
      status: "Fait"
    }
  ]);

  const handleSubmit = (id) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, status: "Fait" } : a
    ));
  };

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📄 Devoirs</h2>
          <p>Consultez et rendez vos devoirs</p>
        </div>

        {/* LIST */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Matière</th>
                <th>Date limite</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a) => (
                <tr key={a.id}>

                  <td>{a.title}</td>

                  <td>{a.subject}</td>

                  <td>{a.dueDate}</td>

                  <td>
                    <span className={`badge ${
                      a.status === "Fait"
                        ? "bg-success"
                        : "bg-danger"
                    }`}>
                      {a.status}
                    </span>
                  </td>

                  <td>
                    {a.status === "Non fait" ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleSubmit(a.id)}
                      >
                        📤 Rendre
                      </button>
                    ) : (
                      <span className="text-success">✔ Déjà rendu</span>
                    )}
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

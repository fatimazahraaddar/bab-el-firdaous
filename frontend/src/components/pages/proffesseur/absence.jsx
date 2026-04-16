import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function TeacherAbsence() {

  const [students, setStudents] = useState([
    { id: 1, name: "Ahmed", status: "Présent" },
    { id: 2, name: "Sara", status: "Présent" },
    { id: 3, name: "Youssef", status: "Présent" }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, status: newStatus } : s
    ));
  };

  const saveAbsences = () => {
    console.log(students);
    alert("Absences enregistrées !");
  };

  const getBadge = (status) => {
    if (status === "Présent") return "bg-success";
    if (status === "Absent") return "bg-danger";
    return "bg-warning";
  };

  return (
    <DashboardLayout userRole="teacher" userName="Mr Karim">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📊 Gestion des absences</h2>
          <p>Marquer la présence des élèves</p>
        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id}>

                  <td>{s.name}</td>

                  <td>
                    <span className={`badge ${getBadge(s.status)}`}>
                      {s.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleStatusChange(s.id, "Présent")}
                    >
                      ✅
                    </button>

                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleStatusChange(s.id, "Absent")}
                    >
                      ❌
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleStatusChange(s.id, "Retard")}
                    >
                      ⚠️
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {/* SAVE */}
          <div className="text-end">
            <button className="btn btn-primary mt-3" onClick={saveAbsences}>
              💾 Enregistrer
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

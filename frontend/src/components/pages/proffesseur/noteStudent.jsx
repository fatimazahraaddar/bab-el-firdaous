import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function TeacherNotesStudents() {

  const [students, setStudents] = useState([
    { id: 1, name: "Ahmed", note: 15 },
    { id: 2, name: "Sara", note: 12 },
    { id: 3, name: "Youssef", note: 10 }
  ]);

  const handleNoteChange = (id, value) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, note: value } : s
    ));
  };

  const saveNotes = () => {
    console.log(students);
    alert("Notes enregistrées !");
  };

  const average = (
    students.reduce((acc, s) => acc + Number(s.note), 0) / students.length
  ).toFixed(2);

  const getColor = (note) => {
    if (note >= 16) return "bg-success";
    if (note >= 10) return "bg-warning";
    return "bg-danger";
  };

  return (
    <DashboardLayout userRole="teacher" userName="Mr Karim">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📊 Notes des élèves</h2>
          <p>Ajouter et modifier les notes</p>
        </div>

        {/* MOYENNE */}
        <div className="card shadow p-3 mb-4 text-center">
          <h6>Moyenne de la classe</h6>
          <h3>{average}/20</h3>
        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Note</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id}>

                  <td>{s.name}</td>

                  <td style={{ width: "150px" }}>
                    <input
                      type="number"
                      className="form-control"
                      value={s.note}
                      onChange={(e) =>
                        handleNoteChange(s.id, e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <span className={`badge ${getColor(s.note)}`}>
                      {s.note >= 10 ? "Validé" : "Échec"}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {/* SAVE */}
          <div className="text-end">
            <button className="btn btn-success mt-3" onClick={saveNotes}>
              💾 Enregistrer
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function MarkAbsence() {

  const [selectedClass, setSelectedClass] = useState("3A");
  const [date, setDate] = useState("");

  const [students, setStudents] = useState([
    { id: 1, name: "Ahmed", status: "Présent" },
    { id: 2, name: "Sara", status: "Présent" },
    { id: 3, name: "Youssef", status: "Présent" }
  ]);

  const handleStatus = (id, status) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, status } : s
    ));
  };

  const save = () => {
    console.log({ selectedClass, date, students });
    alert("Absences enregistrées !");
  };

  const getBadge = (status) => {
    if (status === "Présent") return "bg-success";
    if (status === "Absent") return "bg-danger";
    return "bg-warning";
  };

  const totalAbsent = students.filter(s => s.status === "Absent").length;
  const totalRetard = students.filter(s => s.status === "Retard").length;

  return (
    <DashboardLayout userRole="teacher" userName="Mr Karim">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📊 Marquer les absences</h2>
          <p>Gestion rapide des présences</p>
        </div>

        {/* FILTER */}
        <div className="card shadow p-3 mb-4">
          <div className="row">

            <div className="col-md-6">
              <label>Classe</label>
              <select
                className="form-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option>3A</option>
                <option>4B</option>
                <option>5C</option>
              </select>
            </div>

            <div className="col-md-6">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

          </div>
        </div>

        {/* SUMMARY */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card p-3 shadow text-center">
              <h6>Absents</h6>
              <h3 className="text-danger">{totalAbsent}</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3 shadow text-center">
              <h6>Retards</h6>
              <h3 className="text-warning">{totalRetard}</h3>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Statut</th>
                <th>Actions</th>
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
                      onClick={() => handleStatus(s.id, "Présent")}
                    >
                      ✅
                    </button>

                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleStatus(s.id, "Absent")}
                    >
                      ❌
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleStatus(s.id, "Retard")}
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
            <button className="btn btn-primary mt-3" onClick={save}>
              💾 Enregistrer
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

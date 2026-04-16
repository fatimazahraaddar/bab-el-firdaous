import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const bus = {
    id,
    number: "Bus 1",
    driver: "Ali",
    capacity: 3,
    zone: "Centre ville"
  };

  const [students, setStudents] = useState([
    { id: 1, name: "Ahmed Benali", class: "3ème A" },
    { id: 2, name: "Sara Ali", class: "6ème A" }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    class: ""
  });

  // ➕ Ajouter élève
  const addStudent = () => {
    if (!newStudent.name || !newStudent.class) return;

    if (students.length >= bus.capacity) {
      alert("Bus plein !");
      return;
    }

    setStudents([
      ...students,
      {
        id: Date.now(),
        ...newStudent
      }
    ]);

    setNewStudent({ name: "", class: "" });
  };

  // ❌ Supprimer élève
  const removeStudent = (id) => {
    if (window.confirm("Retirer cet élève ?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail du bus</h2>

          <button
            onClick={() => navigate(`/admin/transport/edit/${bus.id}`)}
            className="btn btn-warning"
          >
            ✏️ Modifier
          </button>
        </div>

        <div className="row">

          {/* 🚌 Infos */}
          <div className="col-md-4">
            <div className="card shadow p-3 mb-3">

              <h5>Informations</h5>

              <p><strong>Bus :</strong> {bus.number}</p>
              <p><strong>Chauffeur :</strong> {bus.driver}</p>
              <p><strong>Capacité :</strong> {bus.capacity}</p>
              <p><strong>Zone :</strong> {bus.zone}</p>

              <p>
                <strong>Occupation :</strong>{" "}
                <span className={`badge ${students.length >= bus.capacity ? "bg-danger" : "bg-success"}`}>
                  {students.length} / {bus.capacity}
                </span>
              </p>

              {/* ⚠️ Alerte */}
              {students.length >= bus.capacity && (
                <div className="alert alert-danger mt-2">
                  ⚠️ Bus plein !
                </div>
              )}

            </div>
          </div>

          {/* 👨‍🎓 Liste élèves */}
          <div className="col-md-8">
            <div className="card shadow p-3">

              <h5 className="mb-3">Liste des élèves</h5>

              {/* ➕ Ajouter élève */}
              <div className="row mb-3">
                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder="Nom"
                    className="form-control"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder="Classe"
                    className="form-control"
                    value={newStudent.class}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, class: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-2">
                  <button onClick={addStudent} className="btn btn-primary w-100">
                    +
                  </button>
                </div>
              </div>

              {/* Tableau */}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Classe</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.class}</td>

                      <td>
                        <button
                          onClick={() => navigate(`/admin/students/${s.id}`)}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          👀
                        </button>

                        <button
                          onClick={() => removeStudent(s.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

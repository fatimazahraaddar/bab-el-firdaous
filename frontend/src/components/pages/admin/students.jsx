import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Benali",
      class: "3ème A",
      parent: "Mohamed Benali",
      phone: "0600000000",
      transport: "bus",
      bus: "Bus 3"
    },
    {
      id: 2,
      name: "Sara Ali",
      class: "6ème A",
      parent: "Fatima Zahra",
      phone: "0611111111",
      transport: "pieton"
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet élève ?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Liste des élèves</h2>

          <button
            onClick={() => navigate('/admin/students/create')}
            className="btn btn-primary"
          >
            + Ajouter élève
          </button>
        </div>

        {/* Tableau */}
        <div className="card shadow p-3">

          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Classe</th>
                <th>Parent</th>
                <th>Téléphone</th>
                <th>Transport</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>

                    <td>{student.name}</td>
                    <td>{student.class}</td>
                    <td>{student.parent}</td>
                    <td>{student.phone}</td>

                    <td>
                      {student.transport === "bus" ? (
                        <span className="badge bg-primary">
                          🚌 {student.bus}
                        </span>
                      ) : (
                        <span className="badge bg-secondary">
                          🚶 Piéton
                        </span>
                      )}
                    </td>

                    <td>

                      <button
                        onClick={() => navigate(`/admin/students/${student.id}`)}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        👀
                      </button>

                      <button
                        onClick={() => navigate(`/admin/students/edit/${student.id}`)}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => handleDelete(student.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        🗑
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Aucun élève trouvé
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}

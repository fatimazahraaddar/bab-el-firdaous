import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Teachers() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Mr Ahmed",
      email: "ahmed@school.com",
      phone: "0600000000",
      subject: "Math",
      classes: ["3ème A", "6ème A"]
    },
    {
      id: 2,
      name: "Mme Fatima",
      email: "fatima@school.com",
      phone: "0611111111",
      subject: "Français",
      classes: ["3ème A"]
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet enseignant ?")) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Liste des enseignants</h2>

          <button
            onClick={() => navigate('/admin/teachers/create')}
            className="btn btn-primary"
          >
            + Ajouter enseignant
          </button>
        </div>

        {/* Tableau */}
        <div className="card shadow p-3">

          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Matière</th>
                <th>Classes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <tr key={teacher.id}>

                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.phone}</td>
                    <td>
                      <span className="badge bg-primary">
                        {teacher.subject}
                      </span>
                    </td>

                    <td>
                      {teacher.classes.map((c, i) => (
                        <span key={i} className="badge bg-secondary me-1">
                          {c}
                        </span>
                      ))}
                    </td>

                    <td>

                      <button
                        onClick={() => navigate(`/admin/teachers/${teacher.id}`)}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        👀
                      </button>

                      <button
                        onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => handleDelete(teacher.id)}
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
                    Aucun enseignant trouvé
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

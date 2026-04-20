import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Teachers() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH API
  useEffect(() => {
    fetch("http://localhost:8000/api/teachers")
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ⏳ LOADING
  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center mt-5">Chargement...</div>
      </DashboardLayout>
    );
  }

  // ❌ DELETE API
  const handleDelete = (id) => {
    if (!window.confirm("Supprimer cet enseignant ?")) return;

    fetch(`http://localhost:8000/api/teachers/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setTeachers(teachers.filter(t => t.id !== id));
      })
      .catch(err => console.error(err));
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

        {/* Table */}
        <div className="card shadow p-3">

          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Matière</th>
                <th>Classes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <tr key={teacher.id}>

                    {/* 🔥 NAME depuis user */}
                    <td>{teacher.user?.name}</td>

                    <td>{teacher.user?.email}</td>

                    <td>
                      <span className="badge bg-primary">
                        {teacher.subject?.name || "N/A"}
                      </span>
                    </td>

                    {/* 🎓 Classes */}
                    <td>
                      {teacher.classes?.length > 0 ? (
                        teacher.classes.map((c) => (
                          <span key={c.id} className="badge bg-secondary me-1">
                            {c.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">Aucune</span>
                      )}
                    </td>

                    {/* ACTIONS */}
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
                  <td colSpan="5" className="text-center">
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
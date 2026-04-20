import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Parents() {
  const navigate = useNavigate();

  const [parents, setParents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH DATA
  useEffect(() => {
    fetch("http://localhost:8000/api/guardians")
      .then(res => res.json())
      .then(data => {
        setParents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔍 FILTRAGE
  const filteredParents = parents.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ❌ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce parent ?")) return;

    try {
      await fetch(`http://localhost:8000/api/guardians/${id}`, {
        method: "DELETE"
      });

      setParents(parents.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOADING
  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Liste des parents</h2>

          <button
            onClick={() => navigate('/admin/parents/create')}
            className="btn btn-primary"
          >
            + Ajouter parent
          </button>
        </div>

        {/* 🔍 SEARCH */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Rechercher un parent..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredParents.length > 0 ? (
                filteredParents.map((parent) => (
                  <tr key={parent.id}>
                    <td>{parent.name}</td>
                    <td>{parent.phone}</td>
                    <td>{parent.email}</td>
                    <td>{parent.job}</td>
                    <td>

                      <button
                        onClick={() => navigate(`/admin/parents/edit/${parent.id}`)}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => handleDelete(parent.id)}
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
                    Aucun parent trouvé
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
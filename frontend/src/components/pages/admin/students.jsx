import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function Students() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ level: "", transport: "" });

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const params = new URLSearchParams({
        ...(search && { search }),
        ...(filters.level && { level: filters.level }),
        ...(filters.transport && { transport: filters.transport }),
      });

      const response = await axios.get(`${API_BASE}/api/students?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setStudents(
        Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.data)
            ? response.data.data
            : [],
      );
      console.log("STUDENTS API:", response.data);
    } catch (err) {
      console.error("Erreur chargement élèves:", err.response?.data || err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setError("Impossible de charger la liste des élèves");
      }
    } finally {
      setLoading(false);
    }
  }, [API_BASE, filters.level, filters.transport, navigate, search]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer définitivement cet élève ?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err.response?.data || err);
      alert("Échec de la suppression");
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Liste des élèves</h2>
          <button
            onClick={() => navigate("/admin/students/create")}
            className="btn btn-primary"
          >
            + Ajouter élève
          </button>
        </div>

        <div className="card shadow p-3 mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par nom ou email..."
                value={search}
                onChange={handleSearch}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.level}
                onChange={(e) => handleFilterChange("level", e.target.value)}
              >
                <option value="">Tous les niveaux</option>
                <option value="primaire">Primaire</option>
                <option value="college">Collège</option>
                <option value="lycee">Lycée</option>
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.transport}
                onChange={(e) =>
                  handleFilterChange("transport", e.target.value)
                }
              >
                <option value="">Tous les transports</option>
                <option value="pieton">Piéton</option>
                <option value="bus">Bus scolaire</option>
              </select>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => setFilters({ level: "", transport: "" })}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow p-3">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p className="mt-2">Chargement des élèves...</p>
            </div>
          ) : students.length > 0 ? (
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
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <strong>{student.user?.name || "—"}</strong>
                      <div className="text-muted small">
                        {student.user?.email || "—"}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {student.class || "—"}
                      </span>
                    </td>
                    <td>{student.guardian?.name || "Non assigné"}</td>
                    <td>{student.phone || "-"}</td>
                    <td>
                      {student.transport === "bus" ? (
                        <span className="badge bg-primary">
                          🚌 {student.bus?.number || "Bus"}
                        </span>
                      ) : (
                        <span className="badge bg-secondary">🚶 Piéton</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/admin/students/${student.id}`)
                        }
                        className="btn btn-sm btn-outline-primary me-1"
                        title="Voir"
                      >
                        👁
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/students/edit/${student.id}`)
                        }
                        className="btn btn-sm btn-outline-warning me-1"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="btn btn-sm btn-outline-danger"
                        title="Supprimer"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">Aucun élève trouvé</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin/students/create")}
              >
                + Ajouter un élève
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Transport() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/buses`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBuses(
          Array.isArray(data)
            ? data
            : Array.isArray(data.data)
              ? data.data
              : [],
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_BASE]);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce bus ?")) return;
    const token = localStorage.getItem("token");

    await fetch(`${API_BASE}/api/buses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    setBuses((prev) => prev.filter((bus) => bus.id !== id));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-4">Transport scolaire</h2>

          <button
            onClick={() => navigate("/admin/transport/create")}
            className="btn btn-primary"
          >
            + Ajouter bus
          </button>
        </div>

        <div className="card shadow p-3">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Bus</th>
                <th>Chauffeur</th>
                <th>Zone</th>
                <th>Capacité</th>
                <th>Nombre élèves</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {buses.length > 0 ? (
                buses.map((bus) => (
                  <tr key={bus.id}>
                    <td>
                      <span className="badge bg-primary">🚌 {bus.number}</span>
                    </td>
                    <td>{bus.driver_name}</td>
                    <td>{bus.zone || "—"}</td>
                    <td>{bus.capacity}</td>
                    <td>
                      <span className="badge bg-success">
                        {bus.students_count || 0} élèves
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => navigate(`/admin/transport/${bus.id}`)}
                      >
                        👀
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() =>
                          navigate(`/admin/transport/edit/${bus.id}`)
                        }
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(bus.id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Aucun bus disponible
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

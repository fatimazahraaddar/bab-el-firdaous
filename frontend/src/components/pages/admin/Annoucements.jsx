import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Announcements() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/announcements`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_BASE]);

  const togglePin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const current = announcements.find((a) => a.id === id);
      const res = await fetch(`${API_BASE}/api/announcements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          is_pinned: !(current?.is_pinned ?? false),
        }),
      });

      if (!res.ok) throw new Error();

      setAnnouncements((prev) =>
        prev.map((a) => (a.id === id ? { ...a, is_pinned: !a.is_pinned } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette annonce ?")) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE}/api/announcements/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const sorted = [...announcements].sort(
    (a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)
  );

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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Annonces</h2>
          <button onClick={() => navigate("/admin/announcements/create")} className="btn btn-primary">
            + Ajouter
          </button>
        </div>

        <div className="card shadow p-3">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Date</th>
                <th>Type</th>
                <th>Épinglé</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((a) => (
                <tr key={a.id}>
                  <td>
                    {a.is_pinned && <span className="me-2">📌</span>}
                    {a.title}
                  </td>

                  <td>{a.start_date ? new Date(a.start_date).toLocaleDateString() : "-"}</td>

                  <td>
                    <span className="badge bg-info">{a.type}</span>
                  </td>

                  <td>
                    <button
                      onClick={() => togglePin(a.id)}
                      className={`btn btn-sm ${a.is_pinned ? "btn-warning" : "btn-outline-secondary"}`}
                    >
                      {a.is_pinned ? "Désépingler" : "Épingler"}
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => navigate(`/admin/announcements/${a.id}`)}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      👀
                    </button>

                    <button
                      onClick={() => navigate(`/admin/announcements/edit/${a.id}`)}
                      className="btn btn-sm btn-outline-warning me-2"
                    >
                      ✏️
                    </button>

                    <button onClick={() => handleDelete(a.id)} className="btn btn-sm btn-outline-danger">
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}


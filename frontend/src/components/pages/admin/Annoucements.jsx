import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Announcements() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Fête de l'école",
      date: "2026-04-15",
      type: "event",
      isPinned: true
    },
    {
      id: 2,
      title: "Vacances",
      date: "2026-04-20",
      type: "vacances",
      isPinned: false
    }
  ]);

  // 📌 Toggle pin
  const togglePin = (id) => {
    setAnnouncements(
      announcements.map(a =>
        a.id === id ? { ...a, isPinned: !a.isPinned } : a
      )
    );
  };

  // ❌ Delete
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette annonce ?")) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  // 🔥 Trier (pinned en haut)
  const sorted = [...announcements].sort(
    (a, b) => b.isPinned - a.isPinned
  );

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Annonces</h2>

          <button
            onClick={() => navigate('/admin/announcements/create')}
            className="btn btn-primary"
          >
            + Ajouter
          </button>
        </div>

        {/* Liste */}
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
                    {a.isPinned && <span className="me-2">📌</span>}
                    {a.title}
                  </td>

                  <td>{new Date(a.date).toLocaleDateString()}</td>

                  <td>
                    <span className="badge bg-info">
                      {a.type}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => togglePin(a.id)}
                      className={`btn btn-sm ${a.isPinned ? "btn-warning" : "btn-outline-secondary"}`}
                    >
                      {a.isPinned ? "Désépingler" : "Épingler"}
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

                    <button
                      onClick={() => handleDelete(a.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
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

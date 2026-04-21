import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AnnouncementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH DATA
  useEffect(() => {
    const token = localStorage.getItem("token"); // جيب الـ Token

    fetch(`http://localhost:8000/api/announcements/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`, // ضروري جداً
        "Accept": "application/json",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then(data => {
        // رد البال هنا: يلا كنتي مصيفط ف الـ Controller $announcement نيشان، خدم بـ data
        // يلا كنتي مغلفها ف data: $announcement، خدم بـ data.data
        setAnnouncement(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // ✅ LOADING
  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement...</div>
      </DashboardLayout>
    );
  }

  // ❌ sécurité si null
  if (!announcement) {
    return (
      <DashboardLayout>
        <div className="text-center mt-5">Annonce introuvable</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail annonce</h2>

          <button
            onClick={() => navigate(`/admin/announcements/edit/${announcement.id}`)}
            className="btn btn-warning"
          >
            ✏️ Modifier
          </button>
        </div>

        {/* Card */}
        <div className="card shadow p-4">

          {/* Titre */}
          <h3 className="mb-3">
            {announcement.is_pinned && <span className="me-2">📌</span>}
            {announcement.title}
          </h3>

          {/* Infos */}
          <div className="mb-3">
            <span className="badge bg-info me-2">
              {announcement.type}
            </span>

            <span className="badge bg-secondary">
              {announcement.target}
            </span>
          </div>

          {/* Dates */}
          <p>
            <strong>Date :</strong>{" "}
            {announcement.start_date
              ? new Date(announcement.start_date).toLocaleDateString()
              : "-"}{" "}
            -{" "}
            {announcement.end_date
              ? new Date(announcement.end_date).toLocaleDateString()
              : "-"}
          </p>

          {/* Description */}
          <div className="mt-3">
            <h5>Description</h5>
            <p>{announcement.content}</p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
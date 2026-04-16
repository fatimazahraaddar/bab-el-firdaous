import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useParams, useNavigate } from "react-router-dom";

export default function AnnouncementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 Données simulées
  const announcement = {
    id,
    title: "Fête de l'école",
    description: "Une grande fête sera organisée avec plusieurs activités pour les élèves.",
    type: "event",
    target: "Tous les étudiants",
    startDate: "2026-04-15",
    endDate: "2026-04-16",
    isPinned: true
  };

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
            {announcement.isPinned && <span className="me-2">📌</span>}
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
            {new Date(announcement.startDate).toLocaleDateString()} -{" "}
            {new Date(announcement.endDate).toLocaleDateString()}
          </p>

          {/* Description */}
          <div className="mt-3">
            <h5>Description</h5>
            <p>{announcement.description}</p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

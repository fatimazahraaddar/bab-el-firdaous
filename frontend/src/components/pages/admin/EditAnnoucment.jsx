import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAnnouncement() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "Fête de l'école",
    description: "Une grande fête sera organisée",
    type: "event",
    target: "all",
    startDate: "2026-04-15",
    endDate: "2026-04-16",
    isPinned: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Update Announcement:", id, form);

    // 🔗 API Laravel plus tard
    navigate('/admin/announcements');
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Modifier annonce</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* Titre */}
            <div className="mb-3">
              <label>Titre</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {/* Type */}
            <div className="mb-3">
              <label>Type</label>
              <select
                name="type"
                className="form-select"
                value={form.type}
                onChange={handleChange}
              >
                <option value="event">Événement</option>
                <option value="vacances">Vacances</option>
                <option value="info">Information</option>
              </select>
            </div>

            {/* Cible */}
            <div className="mb-3">
              <label>Cible</label>
              <select
                name="target"
                className="form-select"
                value={form.target}
                onChange={handleChange}
              >
                <option value="all">Tous</option>
                <option value="primaire">Primaire</option>
                <option value="college">Collège</option>
                <option value="lycee">Lycée</option>
              </select>
            </div>

            {/* Dates */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Date début</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Date fin</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 📌 Épingler */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="isPinned"
                className="form-check-input"
                checked={form.isPinned}
                onChange={handleChange}
              />
              <label className="form-check-label">
                Épingler cette annonce
              </label>
            </div>

            {/* Boutons */}
            <div className="text-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary me-2"
              >
                Annuler
              </button>

              <button className="btn btn-primary">
                Modifier
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

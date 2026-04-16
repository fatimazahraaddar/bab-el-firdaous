import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAnnouncement() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "event",
    target: "all",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // 🔗 Ici plus tard → API Laravel
    navigate('/admin/announcements');
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter une annonce</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* Titre */}
            <div className="mb-3">
              <label className="form-label">Titre</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Entrer le titre"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                placeholder="Entrer la description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Type */}
            <div className="mb-3">
              <label className="form-label">Type</label>
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
              <label className="form-label">Cible</label>
              <select
                name="target"
                className="form-select"
                value={form.target}
                onChange={handleChange}
              >
                <option value="all">Tous les étudiants</option>
                <option value="niveau_1">Niveau 1</option>
                <option value="groupe_A">Groupe A</option>
              </select>
            </div>

            {/* Dates */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Date début</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date fin</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary me-2"
              >
                Annuler
              </button>

              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

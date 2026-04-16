import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTimetable() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    class: "",
    subject: "",
    teacher: "",
    day: "",
    startTime: "",
    endTime: "",
    room: ""
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

    // 🔗 API Laravel plus tard
    navigate('/admin/timetable');
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter emploi du temps</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* Classe */}
            <div className="mb-3">
              <label className="form-label">Classe</label>
              <select
                name="class"
                className="form-select"
                value={form.class}
                onChange={handleChange}
                required
              >
                <option value="">Choisir une classe</option>
                <option value="6A">6ème A</option>
                <option value="3A">3ème A</option>
                <option value="1Bac">1ère Bac</option>
              </select>
            </div>

            {/* Matière */}
            <div className="mb-3">
              <label className="form-label">Matière</label>
              <select
                name="subject"
                className="form-select"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Choisir une matière</option>
                <option value="math">Mathématiques</option>
                <option value="fr">Français</option>
                <option value="info">Informatique</option>
              </select>
            </div>

            {/* Enseignant */}
            <div className="mb-3">
              <label className="form-label">Enseignant</label>
              <select
                name="teacher"
                className="form-select"
                value={form.teacher}
                onChange={handleChange}
                required
              >
                <option value="">Choisir un enseignant</option>
                <option value="1">Mme Fatima</option>
                <option value="2">Mr Ahmed</option>
              </select>
            </div>

            {/* Jour */}
            <div className="mb-3">
              <label className="form-label">Jour</label>
              <select
                name="day"
                className="form-select"
                value={form.day}
                onChange={handleChange}
                required
              >
                <option value="">Choisir un jour</option>
                <option>Lundi</option>
                <option>Mardi</option>
                <option>Mercredi</option>
                <option>Jeudi</option>
                <option>Vendredi</option>
                <option>Samedi</option>
              </select>
            </div>

            {/* Heure */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Heure début</label>
                <input
                  type="time"
                  name="startTime"
                  className="form-control"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Heure fin</label>
                <input
                  type="time"
                  name="endTime"
                  className="form-control"
                  value={form.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Salle */}
            <div className="mb-3">
              <label className="form-label">Salle</label>
              <input
                type="text"
                name="room"
                className="form-control"
                placeholder="Ex: Salle B12"
                value={form.room}
                onChange={handleChange}
              />
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

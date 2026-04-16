import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTimetable() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 🔥 Données simulées (plus tard API Laravel)
  const existingData = {
    class: "3ème A",
    subject: "Math",
    teacher: "1",
    day: "Lundi",
    startTime: "08:00",
    endTime: "10:00",
    room: "B12"
  };

  const [form, setForm] = useState(existingData);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update ID:", id);
    console.log(form);

    // 🔗 API Laravel plus tard
    navigate('/admin/timetable');
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Modifier emploi du temps</h2>

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
                <option value="6A">6ème A</option>
                <option value="3ème A">3ème A</option>
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
                <option value="Math">Mathématiques</option>
                <option value="Français">Français</option>
                <option value="Informatique">Informatique</option>
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
                <option>Lundi</option>
                <option>Mardi</option>
                <option>Mercredi</option>
                <option>Jeudi</option>
                <option>Vendredi</option>
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
                Modifier
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTransport() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 🔥 Données simulées (à remplacer par API)
  const [form, setForm] = useState({
    number: "Bus 1",
    driver: "Ali",
    students: 20,
    capacity: 30
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Update Bus:", id, form);

    // 🔗 API Laravel plus tard
    navigate('/admin/transport');
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Modifier transport</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* 🚌 Numéro */}
            <div className="mb-3">
              <label>Numéro du bus</label>
              <input
                type="text"
                name="number"
                className="form-control"
                value={form.number}
                onChange={handleChange}
                required
              />
            </div>

            {/* 👨‍✈️ Chauffeur */}
            <div className="mb-3">
              <label>Chauffeur</label>
              <input
                type="text"
                name="driver"
                className="form-control"
                value={form.driver}
                onChange={handleChange}
                required
              />
            </div>

            {/* 👨‍🎓 Nombre élèves */}
            <div className="mb-3">
              <label>Nombre d’élèves</label>
              <input
                type="number"
                name="students"
                className="form-control"
                value={form.students}
                onChange={handleChange}
              />
            </div>

            {/* 🚐 Capacité */}
            <div className="mb-3">
              <label>Capacité du bus</label>
              <input
                type="number"
                name="capacity"
                className="form-control"
                value={form.capacity}
                onChange={handleChange}
              />
            </div>

            {/* ⚠️ Info */}
            {form.students > form.capacity && (
              <div className="alert alert-danger">
                ⚠️ Nombre d’élèves dépasse la capacité !
              </div>
            )}

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

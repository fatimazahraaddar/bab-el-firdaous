import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTransport() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    number: "",
    driver: "",
    capacity: "",
    students: 0,
    zone: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New Bus:", form);

    // 🔗 API Laravel plus tard
    navigate('/admin/transport');
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter un bus</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* 🚌 Numéro */}
            <div className="mb-3">
              <label>Numéro du bus</label>
              <input
                type="text"
                name="number"
                className="form-control"
                placeholder="Ex: Bus 3"
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
                placeholder="Nom du chauffeur"
                value={form.driver}
                onChange={handleChange}
                required
              />
            </div>

            {/* 🚐 Capacité */}
            <div className="mb-3">
              <label>Capacité</label>
              <input
                type="number"
                name="capacity"
                className="form-control"
                placeholder="Ex: 30"
                value={form.capacity}
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

            {/* 📍 Zone */}
            <div className="mb-3">
              <label>Zone / Trajet</label>
              <input
                type="text"
                name="zone"
                className="form-control"
                placeholder="Ex: Centre ville"
                value={form.zone}
                onChange={handleChange}
              />
            </div>

            {/* ⚠️ Vérification */}
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
                Ajouter
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

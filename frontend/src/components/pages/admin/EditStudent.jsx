import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 🔥 Données simulées (plus tard API)
  const [form, setForm] = useState({
    name: "Ahmed Benali",
    email: "ahmed@gmail.com",
    level: "college",
    class: "3A",
    phone: "0600000000",
    address: "Casablanca",
    transport: "bus",
    bus: "Bus 3",
    photo: "",
    parent1: "1",
    parent2: "2"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update student:", id, form);

    // 🔗 API Laravel plus tard
    navigate('/admin/students');
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Modifier élève</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* 👤 Infos */}
            <h5 className="mb-3">Informations élève</h5>

            <input
              type="text"
              name="name"
              className="form-control mb-3"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              className="form-control mb-3"
              value={form.email}
              onChange={handleChange}
            />

            {/* 🎓 Niveau + Classe */}
            <div className="row mb-3">
              <div className="col-md-6">
                <select
                  name="level"
                  className="form-select"
                  value={form.level}
                  onChange={handleChange}
                >
                  <option value="maternelle">Maternelle</option>
                  <option value="primaire">Primaire</option>
                  <option value="college">Collège</option>
                  <option value="lycee">Lycée</option>
                </select>
              </div>

              <div className="col-md-6">
                <select
                  name="class"
                  className="form-select"
                  value={form.class}
                  onChange={handleChange}
                >
                  <option value="6A">6ème A</option>
                  <option value="3A">3ème A</option>
                </select>
              </div>
            </div>

            {/* 👨‍👩‍👧 Parents */}
            <h5 className="mb-3">Parents</h5>

            <select
              name="parent1"
              className="form-select mb-3"
              value={form.parent1}
              onChange={handleChange}
            >
              <option value="1">Mohamed Benali</option>
              <option value="2">Fatima Zahra</option>
            </select>

            <select
              name="parent2"
              className="form-select mb-3"
              value={form.parent2}
              onChange={handleChange}
            >
              <option value="">Aucun</option>
              <option value="2">Fatima Zahra</option>
            </select>

            {/* 📞 */}
            <input
              type="text"
              name="phone"
              className="form-control mb-3"
              value={form.phone}
              onChange={handleChange}
            />

            {/* 🏠 */}
            <textarea
              name="address"
              className="form-control mb-3"
              value={form.address}
              onChange={handleChange}
            />

            {/* 🚸 Transport */}
            <select
              name="transport"
              className="form-select mb-3"
              value={form.transport}
              onChange={handleChange}
            >
              <option value="pieton">Piéton</option>
              <option value="bus">Bus</option>
            </select>

            {form.transport === "bus" && (
              <input
                type="text"
                name="bus"
                className="form-control mb-3"
                value={form.bus}
                onChange={handleChange}
              />
            )}

            {/* 📸 Photo */}
            <div className="mb-3">
              <label>Photo</label>
              <input type="file" className="form-control" />
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

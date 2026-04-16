import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    level: "",
    class: "",
    parent_id: "",
    phone: "",
    address: "",
    transport: "pieton",
    bus: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Student:", form);

    // 🔗 API Laravel plus tard
    navigate('/admin/students');
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter un élève</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* 👤 Infos élève */}
            <h5 className="mb-3">Informations élève</h5>

            <div className="mb-3">
              <label>Nom complet</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* 🎓 Niveau + Classe */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Niveau</label>
                <select
                  name="level"
                  className="form-select"
                  value={form.level}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir</option>
                  <option value="maternelle">Maternelle</option>
                  <option value="primaire">Primaire</option>
                  <option value="college">Collège</option>
                  <option value="lycee">Lycée</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Classe</label>
                <select
                  name="class"
                  className="form-select"
                  value={form.class}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir</option>
                  <option value="6A">6ème A</option>
                  <option value="3A">3ème A</option>
                  <option value="1Bac">1ère Bac</option>
                </select>
              </div>
            </div>

            {/* 👨‍👩‍👧 Parent (sélection) */}
            <div className="mb-3">
              <label>Parent</label>
              <select
                name="parent_id"
                className="form-select"
                value={form.parent_id}
                onChange={handleChange}
                required
              >
                <option value="">Choisir un parent</option>
                <option value="1">Mohamed Benali</option>
                <option value="2">Fatima Zahra</option>
              </select>
            </div>

            {/* 📞 Téléphone */}
            <div className="mb-3">
              <label>Téléphone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* 🏠 Adresse */}
            <div className="mb-3">
              <label>Adresse</label>
              <textarea
                name="address"
                className="form-control"
                rows="2"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            {/* 🚸 Transport */}
            <div className="mb-3">
              <label>Transport</label>
              <select
                name="transport"
                className="form-select"
                value={form.transport}
                onChange={handleChange}
              >
                <option value="pieton">Piéton</option>
                <option value="bus">Bus scolaire</option>
              </select>
            </div>

            {form.transport === "bus" && (
              <div className="mb-3">
                <label>Numéro du bus</label>
                <input
                  type="text"
                  name="bus"
                  className="form-control"
                  value={form.bus}
                  onChange={handleChange}
                />
              </div>
            )}

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

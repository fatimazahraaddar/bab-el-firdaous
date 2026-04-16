import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTeacher() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    subject: "",
    classes: []
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🎓 gérer plusieurs classes
  const handleClassChange = (className) => {
    if (form.classes.includes(className)) {
      setForm({
        ...form,
        classes: form.classes.filter(c => c !== className)
      });
    } else {
      setForm({
        ...form,
        classes: [...form.classes, className]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Teacher:", form);

    // 🔗 API Laravel plus tard
    navigate('/admin/teachers');
  };

  const classOptions = ["6ème A", "3ème A", "1ère Bac"];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter un enseignant</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* 👤 Infos */}
            <h5 className="mb-3">Informations</h5>

            <input
              type="text"
              name="name"
              className="form-control mb-3"
              placeholder="Nom complet"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className="form-control mb-3"
              placeholder="Mot de passe"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              className="form-control mb-3"
              placeholder="Téléphone"
              onChange={handleChange}
            />

            {/* 📚 Matière */}
            <div className="mb-3">
              <label>Matière</label>
              <select
                name="subject"
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="">Choisir</option>
                <option value="Math">Mathématiques</option>
                <option value="Français">Français</option>
                <option value="Informatique">Informatique</option>
              </select>
            </div>

            {/* 🎓 Classes multiples */}
            <div className="mb-3">
              <label>Classes</label>

              {classOptions.map((c) => (
                <div key={c} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={form.classes.includes(c)}
                    onChange={() => handleClassChange(c)}
                  />
                  <label className="form-check-label">{c}</label>
                </div>
              ))}
            </div>

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
                Enregistrer
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

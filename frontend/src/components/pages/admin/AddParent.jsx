import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddParent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    job: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/parents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'ajout");
      }

      navigate('/admin/parents');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter parent</h2>

        <div className="card shadow p-4">

          {/* ❗ erreur */}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              className="form-control mb-3"
              placeholder="Nom"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              className="form-control mb-3"
              placeholder="Téléphone"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="job"
              className="form-control mb-3"
              placeholder="Profession"
              value={form.job}
              onChange={handleChange}
            />

            <div className="text-end">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}
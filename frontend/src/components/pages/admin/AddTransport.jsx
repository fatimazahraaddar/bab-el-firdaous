import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTransport() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    number: "",
    driver_name: "",
    capacity: "",
    zone: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/buses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      navigate('/admin/transport');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter un bus</h2>

        <div className="card shadow p-4">

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>

            <input
              name="number"
              className="form-control mb-3"
              placeholder="Numéro bus"
              onChange={handleChange}
              required
            />

            <input
              name="driver_name"
              className="form-control mb-3"
              placeholder="Chauffeur"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="capacity"
              className="form-control mb-3"
              placeholder="Capacité"
              onChange={handleChange}
              required
            />

            <input
              name="zone"
              className="form-control mb-3"
              placeholder="Zone"
              onChange={handleChange}
            />

            <div className="text-end">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Ajout..." : "Ajouter"}
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}
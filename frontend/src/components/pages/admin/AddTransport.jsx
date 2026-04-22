import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextes/AuthProvider"; // ✅ Importe ton hook

export default function AddTransport() {
  const navigate = useNavigate();
  const { api } = useAuth(); // ✅ Récupère l'instance API configurée

  const [form, setForm] = useState({
    number: "",
    driver_name: "",
    capacity: "",
    zone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Plus besoin de fetch, headers ou token manuel
      const res = await api.post("/buses", form);

      console.log("Bus ajouté :", res.data);
      navigate("/admin/transport");
      
    } catch (err) {
      // ✅ Gestion d'erreur plus précise
      const message = err.response?.data?.message || "Erreur lors de l'ajout";
      setError(message);
      
      if (err.response?.status === 401) {
        setError("Votre session a expiré. Connectez-vous à nouveau.");
      }
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
            {/* ... Tes inputs restent les mêmes ... */}
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
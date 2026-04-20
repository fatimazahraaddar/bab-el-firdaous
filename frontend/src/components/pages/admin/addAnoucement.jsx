import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAnnouncement() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "info",
    target: "all",
    start_date: "",
    end_date: "",
    is_pinned: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/api/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Erreur lors de l'enregistrement");
      }

      navigate("/admin/announcements");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">
        <h2 className="mb-4">Ajouter une annonce</h2>

        <div className="card shadow p-4">
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Titre</label>
              <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="content" className="form-control" rows="4" value={form.content} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Type</label>
              <select name="type" className="form-select" value={form.type} onChange={handleChange}>
                <option value="info">Information</option>
                <option value="urgent">Urgent</option>
                <option value="event">Événement</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Cible</label>
              <select name="target" className="form-select" value={form.target} onChange={handleChange}>
                <option value="all">Tous</option>
                <option value="parents">Parents</option>
              </select>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Date début</label>
                <input type="date" name="start_date" className="form-control" value={form.start_date} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date fin</label>
                <input type="date" name="end_date" className="form-control" value={form.end_date} onChange={handleChange} />
              </div>
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" name="is_pinned" className="form-check-input" checked={form.is_pinned} onChange={handleChange} />
              <label className="form-check-label">Épingler cette annonce</label>
            </div>

            <div className="d-flex justify-content-end">
              <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary me-2">
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}


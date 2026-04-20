import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAnnouncement() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/announcements/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          content: data.content || "",
          type: data.type || "info",
          target: data.target || "all",
          start_date: data.start_date ? data.start_date.slice(0, 10) : "",
          end_date: data.end_date ? data.end_date.slice(0, 10) : "",
          is_pinned: data.is_pinned || false,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_BASE, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/announcements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erreur update");
      navigate("/admin/announcements");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">
        <h2 className="mb-4">Modifier annonce</h2>

        <div className="card shadow p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Titre</label>
              <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <textarea name="content" className="form-control" rows="4" value={form.content} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label>Type</label>
              <select name="type" className="form-select" value={form.type} onChange={handleChange}>
                <option value="info">Information</option>
                <option value="urgent">Urgent</option>
                <option value="event">Événement</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Cible</label>
              <select name="target" className="form-select" value={form.target} onChange={handleChange}>
                <option value="all">Tous</option>
                <option value="parents">Parents</option>
              </select>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label>Date début</label>
                <input type="date" name="start_date" className="form-control" value={form.start_date} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Date fin</label>
                <input type="date" name="end_date" className="form-control" value={form.end_date} onChange={handleChange} />
              </div>
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" name="is_pinned" className="form-check-input" checked={form.is_pinned} onChange={handleChange} />
              <label className="form-check-label">Épingler cette annonce</label>
            </div>

            <div className="text-end">
              <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary me-2">
                Annuler
              </button>
              <button className="btn btn-primary">Modifier</button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}


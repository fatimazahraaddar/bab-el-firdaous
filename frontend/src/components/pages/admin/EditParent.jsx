import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditParent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    job: ""
  });

  const [loading, setLoading] = useState(true);

  // 🔄 FETCH PARENT
  useEffect(() => {
    fetch(`http://localhost:8000/api/guardians/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          job: data.job || ""
        });

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 UPDATE API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/guardians/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Erreur update");

      navigate('/admin/parents');

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOADING
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

        <h2 className="mb-4">Modifier parent</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              value={form.name}
              className="form-control mb-3"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              className="form-control mb-3"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              value={form.email}
              className="form-control mb-3"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="job"
              value={form.job}
              className="form-control mb-3"
              onChange={handleChange}
            />

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
import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTransport() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    number: "",
    driver_name: "",
    capacity: "",
    zone: ""
  });

  const [studentsCount, setStudentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH BUS
  useEffect(() => {
    fetch(`http://localhost:8000/api/buses/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          number: data.number || "",
          driver_name: data.driver_name || "",
          capacity: data.capacity || "",
          zone: data.zone || ""
        });

        setStudentsCount(data.students?.length || 0);
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
      const res = await fetch(`http://localhost:8000/api/buses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error();

      navigate('/admin/transport');

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
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Modifier transport</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* Bus */}
            <div className="mb-3">
              <label>Numéro du bus</label>
              <input
                type="text"
                name="number"
                className="form-control"
                value={form.number}
                onChange={handleChange}
                required
              />
            </div>

            {/* Chauffeur */}
            <div className="mb-3">
              <label>Chauffeur</label>
              <input
                type="text"
                name="driver_name"
                className="form-control"
                value={form.driver_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Capacité */}
            <div className="mb-3">
              <label>Capacité</label>
              <input
                type="number"
                name="capacity"
                className="form-control"
                value={form.capacity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Zone */}
            <div className="mb-3">
              <label>Zone</label>
              <input
                type="text"
                name="zone"
                className="form-control"
                value={form.zone}
                onChange={handleChange}
              />
            </div>

            {/* INFO */}
            <div className="mb-3">
              <strong>Occupation :</strong>{" "}
              <span className={`badge ${studentsCount > form.capacity ? "bg-danger" : "bg-success"}`}>
                {studentsCount} / {form.capacity}
              </span>
            </div>

            {studentsCount > form.capacity && (
              <div className="alert alert-danger">
                ⚠️ Capacité dépassée !
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
                Modifier
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}
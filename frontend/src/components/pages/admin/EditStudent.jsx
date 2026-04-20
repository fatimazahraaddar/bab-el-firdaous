import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [form, setForm] = useState({
    level: "",
    class_id: "",
    guardian_id: "",
    phone: "",
    address: "",
    transport: "pieton",
    bus_id: "",
  });

  const [classes, setClasses] = useState([]);
  const [guardians, setGuardians] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    Promise.all([
      fetch(`${API_BASE}/api/students/${id}`, { headers }),
      fetch(`${API_BASE}/api/classes`, { headers }),
      fetch(`${API_BASE}/api/guardians`, { headers }),
      fetch(`${API_BASE}/api/buses`, { headers }),
    ])
      .then(async ([s, c, g, b]) => {
        const student = await s.json();
        const classesData = await c.json();
        const guardiansData = await g.json();
        const busesData = await b.json();

        setForm({
          level: student.level || "",
          class_id: student.class_id || "",
          guardian_id: student.guardian_id || "",
          phone: student.phone || "",
          address: student.address || "",
          transport: student.transport || "pieton",
          bus_id: student.bus_id || "",
        });

        setClasses(Array.isArray(classesData) ? classesData : []);
        setGuardians(Array.isArray(guardiansData) ? guardiansData : []);
        setBuses(Array.isArray(busesData) ? busesData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_BASE, id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          bus_id: form.transport === "bus" && form.bus_id ? Number(form.bus_id) : null,
        }),
      });

      if (!res.ok) throw new Error();
      navigate("/admin/students");
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
        <h2 className="mb-4">Modifier élève</h2>

        <div className="card shadow p-4">
          <form onSubmit={handleSubmit}>
            <select name="level" className="form-select mb-3" value={form.level} onChange={handleChange}>
              <option value="primaire">Primaire</option>
              <option value="college">Collège</option>
              <option value="lycee">Lycée</option>
            </select>

            <select name="class_id" className="form-select mb-3" value={form.class_id} onChange={handleChange}>
              <option value="">Choisir classe</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select name="guardian_id" className="form-select mb-3" value={form.guardian_id} onChange={handleChange}>
              <option value="">Choisir parent</option>
              {guardians.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <input type="text" name="phone" className="form-control mb-3" value={form.phone} onChange={handleChange} />
            <textarea name="address" className="form-control mb-3" value={form.address} onChange={handleChange} />

            <select name="transport" className="form-select mb-3" value={form.transport} onChange={handleChange}>
              <option value="pieton">Piéton</option>
              <option value="bus">Bus</option>
            </select>

            {form.transport === "bus" && (
              <select name="bus_id" className="form-select mb-3" value={form.bus_id} onChange={handleChange}>
                <option value="">Choisir bus</option>
                {buses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.number}
                  </option>
                ))}
              </select>
            )}

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


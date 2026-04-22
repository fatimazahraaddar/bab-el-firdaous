import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSchedule() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    class_id: "",
    subject_id: "",
    day: "",
    start_time: "",
    end_time: "",
    room: ""
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Charger classes
  useEffect(() => {
    fetch("http://localhost:8000/api/classes")
      .then(res => res.json())
      .then(data => {
        console.log("CLASSES:", data);
        setClasses(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const payload = {
        ...form,
        class_id: parseInt(form.class_id),
        subject_id: parseInt(form.subject_id)
      };
      const res = await fetch("http://localhost:8000/api/timetables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      console.log("RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Erreur");
        return;
      }

      alert("Emploi du temps ajouté ✅");
      navigate('/admin/timetable');

    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter emploi du temps</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* Classe */}
            <select name="class_id" className="form-select mb-3" onChange={handleChange} required>
              <option value="">Choisir une classe</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* Matière (temp) */}
            <input
              name="subject_id"
              className="form-control mb-3"
              placeholder="ID matière (temp)"
              onChange={handleChange}
              required
            />

            {/* Jour */}
            <select name="day" className="form-select mb-3" onChange={handleChange} required>
              <option value="">Jour</option>
              <option value="lundi">Lundi</option>
              <option value="mardi">Mardi</option>
              <option value="mercredi">Mercredi</option>
              <option value="jeudi">Jeudi</option>
              <option value="vendredi">Vendredi</option>
              <option value="samedi">Samedi</option>
            </select>

            {/* Heure */}
            <div className="row mb-3">
              <div className="col-md-6">
                <input type="time" name="start_time" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <input type="time" name="end_time" className="form-control" onChange={handleChange} required />
              </div>
            </div>

            {/* Salle */}
            <input
              type="text"
              name="room"
              className="form-control mb-3"
              placeholder="Salle"
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
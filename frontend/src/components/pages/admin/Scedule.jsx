import DashboardLayout from "../Layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTimetable() {
  const navigate = useNavigate();
  const API_BASE = "http://127.0.0.1:8000";

  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    class_id: "",
    subject_id: "",
    day: "",
    start_time: "",
    end_time: "",
    room: "",
  });

  // 🔥 charger classes
  useEffect(() => {
    fetch(`${API_BASE}/api/classes`)
      .then((res) => res.json())
      .then((data) => {
        setClasses(Array.isArray(data) ? data : []);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/timetables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("TIMETABLE CREATE:", data);

      if (!res.ok) {
        alert(data.message || "Erreur");
        return;
      }

      alert("Ajout réussi ✅");
      navigate("/admin/timetable");

    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin">

      <div className="container-fluid">
        <h2 className="mb-4">Ajouter emploi du temps</h2>

        <div className="card p-4 shadow">

          <form onSubmit={handleSubmit}>

            {/* Classe */}
            <select
              name="class_id"
              className="form-select mb-3"
              onChange={handleChange}
              required
            >
              <option value="">Choisir classe</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
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
            <select
              name="day"
              className="form-select mb-3"
              onChange={handleChange}
              required
            >
              <option value="">Jour</option>
              <option value="lundi">Lundi</option>
              <option value="mardi">Mardi</option>
              <option value="mercredi">Mercredi</option>
              <option value="jeudi">Jeudi</option>
              <option value="vendredi">Vendredi</option>
            </select>

            {/* Heure */}
            <input
              type="time"
              name="start_time"
              className="form-control mb-3"
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="end_time"
              className="form-control mb-3"
              onChange={handleChange}
              required
            />

            {/* Salle */}
            <input
              name="room"
              className="form-control mb-3"
              placeholder="Salle"
              onChange={handleChange}
            />

            <button className="btn btn-success">
              Enregistrer
            </button>

          </form>

        </div>
      </div>

    </DashboardLayout>
  );
}
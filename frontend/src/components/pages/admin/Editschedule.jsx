import DashboardLayout from '../Layouts/DashboardLayout';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTimetable() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    class_id: "",
    subject: "",
    teacher_id: "",
    day: "",
    start_time: "",
    end_time: "",
    room: ""
  });

  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH DATA
  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8000/api/timetables/${id}`),
      fetch(`http://localhost:8000/api/classes`),
      fetch(`http://localhost:8000/api/teachers`)
    ])
      .then(async ([t, c, te]) => {
        const timetable = await t.json();
        const classesData = await c.json();
        const teachersData = await te.json();

        setForm({
          class_id: timetable.class_id || "",
          subject: timetable.subject || "",
          teacher_id: timetable.teacher_id || "",
          day: timetable.day || "",
          start_time: timetable.start_time || "",
          end_time: timetable.end_time || "",
          room: timetable.room || ""
        });

        setClasses(classesData);
        setTeachers(teachersData);

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
      const res = await fetch(`http://localhost:8000/api/timetables/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error();

      navigate('/admin/timetable');

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

        <h2 className="mb-4">Modifier emploi du temps</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* Classe */}
            <select
              name="class_id"
              className="form-select mb-3"
              value={form.class_id}
              onChange={handleChange}
            >
              <option value="">Choisir classe</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Matière */}
            <input
              type="text"
              name="subject"
              className="form-control mb-3"
              value={form.subject}
              onChange={handleChange}
              placeholder="Matière"
            />

            {/* Enseignant */}
            <select
              name="teacher_id"
              className="form-select mb-3"
              value={form.teacher_id}
              onChange={handleChange}
            >
              <option value="">Choisir enseignant</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.user?.name}
                </option>
              ))}
            </select>

            {/* Jour */}
            <select
              name="day"
              className="form-select mb-3"
              value={form.day}
              onChange={handleChange}
            >
              <option>Lundi</option>
              <option>Mardi</option>
              <option>Mercredi</option>
              <option>Jeudi</option>
              <option>Vendredi</option>
            </select>

            {/* Heure */}
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="time"
                  name="start_time"
                  className="form-control"
                  value={form.start_time}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="time"
                  name="end_time"
                  className="form-control"
                  value={form.end_time}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Salle */}
            <input
              type="text"
              name="room"
              className="form-control mb-3"
              value={form.room}
              onChange={handleChange}
              placeholder="Salle"
            />

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
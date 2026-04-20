import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTeacher() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    classes: []
  });

  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH DATA
  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8000/api/teachers/${id}`),
      fetch(`http://localhost:8000/api/classes`)
    ])
      .then(async ([t, c]) => {
        const teacher = await t.json();
        const classesData = await c.json();

        setForm({
          name: teacher.name || "",
          email: teacher.email || "",
          phone: teacher.phone || "",
          subject: teacher.subject || "",
          classes: teacher.classes?.map(c => c.id) || []
        });

        setAllClasses(classesData);
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

  // 🎓 gérer classes (IDs)
  const handleClassChange = (classId) => {
    if (form.classes.includes(classId)) {
      setForm({
        ...form,
        classes: form.classes.filter(id => id !== classId)
      });
    } else {
      setForm({
        ...form,
        classes: [...form.classes, classId]
      });
    }
  };

  // 🔥 UPDATE API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/teachers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error();

      navigate('/admin/teachers');

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

        <h2 className="mb-4">Modifier enseignant</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* Infos */}
            <input
              type="text"
              name="name"
              className="form-control mb-3"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              className="form-control mb-3"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              className="form-control mb-3"
              value={form.phone}
              onChange={handleChange}
            />

            {/* Matière */}
            <select
              name="subject"
              className="form-select mb-3"
              value={form.subject}
              onChange={handleChange}
            >
              <option value="Math">Mathématiques</option>
              <option value="Français">Français</option>
              <option value="Informatique">Informatique</option>
            </select>

            {/* Classes dynamiques */}
            <div className="mb-3">
              <label>Classes</label>

              {allClasses.map((c) => (
                <div key={c.id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={form.classes.includes(c.id)}
                    onChange={() => handleClassChange(c.id)}
                  />
                  <label className="form-check-label">{c.name}</label>
                </div>
              ))}
            </div>

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
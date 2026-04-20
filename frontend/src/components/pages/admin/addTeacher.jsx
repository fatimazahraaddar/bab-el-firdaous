import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTeacher() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    subject_id: "",
    class_ids: []
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // 🔄 charger depuis API
  useEffect(() => {
    fetch("http://localhost:8000/api/classes")
      .then(res => res.json())
      .then(setClasses);

    fetch("http://localhost:8000/api/subjects")
      .then(res => res.json())
      .then(setSubjects);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleClassChange = (id) => {
    if (form.class_ids.includes(id)) {
      setForm({
        ...form,
        class_ids: form.class_ids.filter(c => c !== id)
      });
    } else {
      setForm({
        ...form,
        class_ids: [...form.class_ids, id]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Erreur");

      navigate('/admin/teachers');

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter un enseignant</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            <input name="name" className="form-control mb-3" placeholder="Nom" onChange={handleChange} required />

            <input name="email" className="form-control mb-3" placeholder="Email" onChange={handleChange} required />

            <input type="password" name="password" className="form-control mb-3" placeholder="Mot de passe" onChange={handleChange} required />

            <input name="phone" className="form-control mb-3" placeholder="Téléphone" onChange={handleChange} />

            {/* Matière dynamique */}
            <select name="subject_id" className="form-select mb-3" onChange={handleChange} required>
              <option value="">Choisir matière</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            {/* Classes multiples dynamiques */}
            <div className="mb-3">
              <label>Classes</label>

              {classes.map(c => (
                <div key={c.id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={form.class_ids.includes(c.id)}
                    onChange={() => handleClassChange(c.id)}
                  />
                  <label>{c.name}</label>
                </div>
              ))}
            </div>

            <div className="text-end">
              <button className="btn btn-primary">Enregistrer</button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}
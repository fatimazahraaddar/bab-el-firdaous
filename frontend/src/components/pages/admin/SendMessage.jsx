import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SendMessage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    receiverType: "",
    receiver: "",
    subject: "",
    message: ""
  });

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Charger contacts selon type
  useEffect(() => {
    if (!form.receiverType) return;

    fetch(`http://localhost:8000/api/users?role=${form.receiverType}`)
      .then(res => res.json())
      .then(data => {
        setContacts(data);
      })
      .catch(err => console.error(err));
  }, [form.receiverType]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 📩 ENVOI MESSAGE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.receiver || !form.message) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Erreur envoi");

      alert("Message envoyé avec succès !");
      navigate(-1);

    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Envoyer un message</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            {/* 🎯 Type */}
            <div className="mb-3">
              <label>Type destinataire</label>
              <select
                name="receiverType"
                className="form-select"
                value={form.receiverType}
                onChange={handleChange}
              >
                <option value="">Choisir</option>
                <option value="parent">Parent</option>
                <option value="student">Étudiant</option>
                <option value="teacher">Enseignant</option>
              </select>
            </div>

            {/* 👤 Destinataire */}
            {form.receiverType && (
              <div className="mb-3">
                <label>Destinataire</label>
                <select
                  name="receiver"
                  className="form-select"
                  value={form.receiver}
                  onChange={handleChange}
                >
                  <option value="">Choisir</option>

                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}

                </select>
              </div>
            )}

            {/* 📝 Sujet */}
            <div className="mb-3">
              <label>Sujet</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            {/* 💬 Message */}
            <div className="mb-3">
              <label>Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="5"
                value={form.message}
                onChange={handleChange}
              />
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

              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Envoi..." : "Envoyer"}
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}
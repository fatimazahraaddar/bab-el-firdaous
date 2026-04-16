import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendMessage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    receiverType: "",
    receiver: "",
    subject: "",
    message: ""
  });

  const contacts = {
    parent: [
      { id: "p1", name: "Parent Ahmed" },
      { id: "p2", name: "Parent Sara" }
    ],
    student: [
      { id: "s1", name: "Ahmed (élève)" }
    ],
    teacher: [
      { id: "t1", name: "Mr Ahmed (prof)" }
    ]
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.receiverType || !form.receiver || !form.message) return;

    console.log("Message envoyé :", form);

    alert("Message envoyé avec succès !");

    setForm({
      receiverType: "",
      receiver: "",
      subject: "",
      message: ""
    });

    navigate(-1);
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

                  {contacts[form.receiverType].map((c) => (
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
                placeholder="Ex: Paiement en retard"
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

              <button className="btn btn-primary">
                Envoyer
              </button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  // 🔥 Données simulées
  const student = {
    id,
    name: "Ahmed Benali",
    email: "ahmed@gmail.com",
    level: "Collège",
    class: "3ème A",
    phone: "0600000000",
    address: "Casablanca",
    transport: "bus",
    bus: "Bus 3",
    photo: "https://via.placeholder.com/100",

    parents: [
      {
        name: "Mohamed Benali",
        phone: "0612345678",
        email: "parent1@gmail.com",
        job: "Ingénieur"
      },
      {
        name: "Fatima Zahra",
        phone: "0622222222",
        email: "parent2@gmail.com",
        job: "Médecin"
      }
    ]
  };

  const timetable = [
    { day: "Lundi", subject: "Math", time: "08:00 - 10:00" }
  ];

  const absences = [
    { date: "2026-04-10", reason: "Maladie" }
  ];

  const notes = [
    { subject: "Math", note: 15 },
    { subject: "Français", note: 13 }
  ];

  const devoirs = [
    { title: "Exercice Math", date: "2026-04-12" }
  ];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail élève</h2>

          <button
            onClick={() => navigate(`/admin/students/edit/${student.id}`)}
            className="btn btn-warning"
          >
            ✏️ Modifier
          </button>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          {["info","parents","timetable","absences","notes","devoirs"].map(tab => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab && "active"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <div className="card shadow p-3">

          {/* 👤 INFO */}
          {activeTab === "info" && (
            <>
              <div className="text-center mb-3">
                <img src={student.photo} className="rounded-circle" width="100" />
              </div>

              <p><strong>Nom :</strong> {student.name}</p>
              <p><strong>Email :</strong> {student.email}</p>
              <p><strong>Classe :</strong> {student.class}</p>

              <p>
                <strong>Transport :</strong>{" "}
                {student.transport === "bus"
                  ? <span className="badge bg-primary">🚌 {student.bus}</span>
                  : <span className="badge bg-secondary">🚶 Piéton</span>}
              </p>
            </>
          )}

          {/* 👨‍👩‍👧 PARENTS */}
          {activeTab === "parents" && (
            <>
              <h5>Parents</h5>

              {student.parents.map((p, i) => (
                <div key={i} className="mb-3 border p-2 rounded">
                  <p><strong>Nom :</strong> {p.name}</p>
                  <p><strong>Téléphone :</strong> {p.phone}</p>
                  <p><strong>Email :</strong> {p.email}</p>
                  <p><strong>Profession :</strong> {p.job}</p>
                </div>
              ))}
            </>
          )}

          {/* 📅 TIMETABLE */}
          {activeTab === "timetable" && (
            <table className="table">
              <thead>
                <tr><th>Jour</th><th>Matière</th><th>Heure</th></tr>
              </thead>
              <tbody>
                {timetable.map((t,i)=>(
                  <tr key={i}>
                    <td>{t.day}</td>
                    <td>{t.subject}</td>
                    <td>{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 📊 ABSENCES */}
          {activeTab === "absences" && (
            <table className="table">
              <thead>
                <tr><th>Date</th><th>Raison</th></tr>
              </thead>
              <tbody>
                {absences.map((a,i)=>(
                  <tr key={i}>
                    <td>{new Date(a.date).toLocaleDateString()}</td>
                    <td>{a.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 📊 NOTES */}
          {activeTab === "notes" && (
            <table className="table">
              <thead>
                <tr><th>Matière</th><th>Note</th></tr>
              </thead>
              <tbody>
                {notes.map((n,i)=>(
                  <tr key={i}>
                    <td>{n.subject}</td>
                    <td><span className="badge bg-success">{n.note}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 📄 DEVOIRS */}
          {activeTab === "devoirs" && (
            <table className="table">
              <thead>
                <tr><th>Titre</th><th>Date</th></tr>
              </thead>
              <tbody>
                {devoirs.map((d,i)=>(
                  <tr key={i}>
                    <td>{d.title}</td>
                    <td>{new Date(d.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

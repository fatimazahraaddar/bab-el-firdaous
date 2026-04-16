import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  // 🔥 Données simulées
  const teacher = {
    id,
    name: "Mr Ahmed",
    email: "ahmed@school.com",
    phone: "0600000000",
    subject: "Math",
    photo: "https://via.placeholder.com/100",
    classes: ["3ème A", "6ème A"]
  };

  const timetable = [
    { day: "Lundi", class: "3ème A", time: "08:00 - 10:00" },
    { day: "Mardi", class: "6ème A", time: "10:00 - 12:00" }
  ];

  const students = [
    { name: "Ahmed Benali", class: "3ème A" },
    { name: "Sara Ali", class: "6ème A" }
  ];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail enseignant</h2>

          <button
            onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)}
            className="btn btn-warning"
          >
            ✏️ Modifier
          </button>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "info" && "active"}`} onClick={() => setActiveTab("info")}>
              Infos
            </button>
          </li>

          <li className="nav-item">
            <button className={`nav-link ${activeTab === "classes" && "active"}`} onClick={() => setActiveTab("classes")}>
              Classes
            </button>
          </li>

          <li className="nav-item">
            <button className={`nav-link ${activeTab === "timetable" && "active"}`} onClick={() => setActiveTab("timetable")}>
              Emploi du temps
            </button>
          </li>

          <li className="nav-item">
            <button className={`nav-link ${activeTab === "students" && "active"}`} onClick={() => setActiveTab("students")}>
              Élèves
            </button>
          </li>
        </ul>

        <div className="card shadow p-3">

          {/* 👤 INFOS */}
          {activeTab === "info" && (
            <>
              <div className="text-center mb-3">
                <img src={teacher.photo} className="rounded-circle" width="100" />
              </div>

              <p><strong>Nom :</strong> {teacher.name}</p>
              <p><strong>Email :</strong> {teacher.email}</p>
              <p><strong>Téléphone :</strong> {teacher.phone}</p>
              <p>
                <strong>Matière :</strong>{" "}
                <span className="badge bg-primary">{teacher.subject}</span>
              </p>
            </>
          )}

          {/* 🎓 CLASSES */}
          {activeTab === "classes" && (
            <>
              <h5>Classes</h5>

              {teacher.classes.map((c, i) => (
                <span key={i} className="badge bg-secondary me-2">
                  {c}
                </span>
              ))}
            </>
          )}

          {/* 📅 TIMETABLE */}
          {activeTab === "timetable" && (
            <table className="table">
              <thead>
                <tr>
                  <th>Jour</th>
                  <th>Classe</th>
                  <th>Heure</th>
                </tr>
              </thead>

              <tbody>
                {timetable.map((t, i) => (
                  <tr key={i}>
                    <td>{t.day}</td>
                    <td>{t.class}</td>
                    <td>{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 👨‍🎓 STUDENTS */}
          {activeTab === "students" && (
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Classe</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, i) => (
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td>{s.class}</td>
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

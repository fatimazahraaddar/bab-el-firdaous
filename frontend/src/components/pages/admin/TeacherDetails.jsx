import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("info");
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH TEACHER
  useEffect(() => {
    fetch(`http://localhost:8000/api/teachers/${id}`)
      .then(res => res.json())
      .then(data => {
        setTeacher(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // ⏳ LOADING
  if (loading || !teacher) {
    return (
      <DashboardLayout>
        <div className="text-center mt-5">Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail enseignant</h2>

          <button
            onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)}
            className="btn btn-warning"
          >
            ✏️ Modifier
          </button>
        </div>

        {/* TABS */}
        <ul className="nav nav-tabs mb-3">
          {["info","classes","timetable","students"].map(tab => (
            <li key={tab} className="nav-item">
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <div className="card shadow p-3">

          {/* 👤 INFOS */}
          {activeTab === "info" && (
            <>
              <div className="text-center mb-3">
                <img
                  src={teacher.photo || "https://via.placeholder.com/100"}
                  className="rounded-circle"
                  width="100"
                  alt="teacher"
                />
              </div>

              <p><strong>Nom :</strong> {teacher.user?.name}</p>
              <p><strong>Email :</strong> {teacher.user?.email}</p>
              <p><strong>Téléphone :</strong> {teacher.phone}</p>

              <p>
                <strong>Matière :</strong>{" "}
                <span className="badge bg-primary">
                  {teacher.subject?.name}
                </span>
              </p>
            </>
          )}

          {/* 🎓 CLASSES */}
          {activeTab === "classes" && (
            <>
              <h5>Classes</h5>

              {teacher.classes?.length > 0 ? (
                teacher.classes.map((c) => (
                  <span key={c.id} className="badge bg-secondary me-2">
                    {c.name}
                  </span>
                ))
              ) : (
                <p className="text-muted">Aucune classe</p>
              )}
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
                {teacher.timetables?.map((t) => (
                  <tr key={t.id}>
                    <td>{t.day}</td>
                    <td>{t.class?.name}</td>
                    <td>{t.start_time} - {t.end_time}</td>
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
                {teacher.students?.map((s) => (
                  <tr key={s.id}>
                    <td>{s.user?.name}</td>
                    <td>{s.class?.name}</td>
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
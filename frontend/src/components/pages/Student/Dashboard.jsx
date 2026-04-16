import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function StudentDashboard() {

  const student = {
    name: "Ahmed Ali",
    class: "3ème A",
    email: "ahmed@email.com",
    absences: 3,
    paymentsDue: 200
  };

  const timetable = [
    { day: "Lundi", subject: "Math", time: "08:00 - 10:00" },
    { day: "Mardi", subject: "Physique", time: "10:00 - 12:00" }
  ];

  const assignments = [
    { title: "Exercice Math", due: "2026-04-20" },
    { title: "Devoir Physique", due: "2026-04-22" }
  ];

  const announcements = [
    { title: "Vacances", date: "2026-04-25" },
    { title: "Fête école", date: "2026-05-01" }
  ];

  return (
    <DashboardLayout userRole="student" userName={student.name}>
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>🎓 Tableau de bord</h2>
          <p>Bienvenue, {student.name}</p>
        </div>

        {/* CARDS */}
        <div className="row mb-4">

          <div className="col-md-3">
            <div className="card shadow p-3">
              <h6>Classe</h6>
              <h4>{student.class}</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3">
              <h6>Absences</h6>
              <h4 className="text-danger">{student.absences}</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3">
              <h6>Paiements</h6>
              <h4 className="text-warning">{student.paymentsDue} DH</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3">
              <h6>Email</h6>
              <h6>{student.email}</h6>
            </div>
          </div>

        </div>

        {/* TIMETABLE */}
        <div className="card shadow p-3 mb-4">
          <h5>📅 Emploi du temps</h5>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Jour</th>
                <th>Matière</th>
                <th>Heure</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((t, i) => (
                <tr key={i}>
                  <td>{t.day}</td>
                  <td>{t.subject}</td>
                  <td>{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ASSIGNMENTS */}
        <div className="card shadow p-3 mb-4">
          <h5>📄 Devoirs</h5>
          <ul className="list-group mt-3">
            {assignments.map((a, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                {a.title}
                <span className="badge bg-primary">{a.due}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ANNOUNCEMENTS */}
        <div className="card shadow p-3">
          <h5>📢 Annonces</h5>
          <ul className="list-group mt-3">
            {announcements.map((a, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                {a.title}
                <span className="badge bg-success">{a.date}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </DashboardLayout>
  );
}

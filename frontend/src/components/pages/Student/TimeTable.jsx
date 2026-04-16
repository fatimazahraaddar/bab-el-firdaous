import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function Timetable() {

  const timetable = [
    { day: "Lundi", subject: "Math", time: "08:00 - 10:00", color: "bg-primary" },
    { day: "Lundi", subject: "Physique", time: "10:00 - 12:00", color: "bg-success" },
    { day: "Mardi", subject: "Français", time: "08:00 - 10:00", color: "bg-warning" },
    { day: "Mardi", subject: "Anglais", time: "10:00 - 12:00", color: "bg-info" },
    { day: "Mercredi", subject: "SVT", time: "08:00 - 10:00", color: "bg-danger" }
  ];

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📅 Emploi du temps</h2>
          <p>Consultez vos cours hebdomadaires</p>
        </div>

        {/* GRID TIMETABLE */}
        <div className="row">

          {days.map((day) => (
            <div key={day} className="col-md-2 mb-3">

              <div className="card shadow">

                <div className="card-header text-center bg-dark text-white">
                  {day}
                </div>

                <div className="p-2">

                  {timetable
                    .filter((t) => t.day === day)
                    .map((t, i) => (
                      <div
                        key={i}
                        className={`p-2 mb-2 text-white rounded ${t.color}`}
                      >
                        <strong>{t.subject}</strong>
                        <br />
                        <small>{t.time}</small>
                      </div>
                    ))}

                  {/* Si vide */}
                  {timetable.filter((t) => t.day === day).length === 0 && (
                    <p className="text-center text-muted mt-2">
                      Aucun cours
                    </p>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

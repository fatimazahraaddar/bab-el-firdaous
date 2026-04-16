import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function TeacherTimetable() {

  const timetable = [
    { day: "Lundi", class: "3A", subject: "Math", time: "08:00 - 10:00", color: "bg-primary" },
    { day: "Lundi", class: "4B", subject: "Math", time: "10:00 - 12:00", color: "bg-success" },
    { day: "Mardi", class: "3A", subject: "Math", time: "08:00 - 10:00", color: "bg-warning" },
    { day: "Mercredi", class: "5C", subject: "Math", time: "08:00 - 10:00", color: "bg-danger" }
  ];

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  return (
    <DashboardLayout userRole="teacher" userName="Mr Karim">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📅 Mon emploi du temps</h2>
          <p>Consultez vos cours hebdomadaires</p>
        </div>

        {/* GRID */}
        <div className="row">

          {days.map((day) => (
            <div key={day} className="col-md-2 mb-3">

              <div className="card shadow">

                {/* DAY HEADER */}
                <div className="card-header text-center bg-dark text-white">
                  {day}
                </div>

                {/* COURSES */}
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
                        <small>Classe: {t.class}</small>
                        <br />
                        <small>{t.time}</small>
                      </div>
                    ))}

                  {/* EMPTY */}
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

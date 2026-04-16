import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function ChildTimetable() {

  const timetable = [
    { day: "Lundi", subject: "Math", time: "08:00 - 10:00", teacher: "Mr Karim", color: "bg-primary" },
    { day: "Lundi", subject: "Physique", time: "10:00 - 12:00", teacher: "Mr Ali", color: "bg-success" },
    { day: "Mardi", subject: "Français", time: "08:00 - 10:00", teacher: "Mme Sara", color: "bg-warning" },
    { day: "Mardi", subject: "Anglais", time: "10:00 - 12:00", teacher: "Mr John", color: "bg-info" },
    { day: "Mercredi", subject: "SVT", time: "08:00 - 10:00", teacher: "Mme Lina", color: "bg-danger" }
  ];

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📅 Emploi du temps de l'enfant</h2>
          <p>Organisation des cours</p>
        </div>

        {/* GRID */}
        <div className="row">

          {days.map((day) => (
            <div key={day} className="col-md-2 mb-3">

              <div className="card shadow">

                {/* DAY */}
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
                        <small>{t.time}</small>
                        <br />
                        <small>👨‍🏫 {t.teacher}</small>
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

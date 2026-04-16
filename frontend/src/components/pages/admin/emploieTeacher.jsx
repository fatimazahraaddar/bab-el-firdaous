import DashboardLayout from '../../pages/Layouts/DashboardLayout';

export default function TeacherTimetable() {

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  const timetable = [
    {
      day: "Lundi",
      start: "08:00",
      end: "10:00",
      class: "3ème A",
      subject: "Math",
      room: "B12"
    },
    {
      day: "Mardi",
      start: "10:00",
      end: "12:00",
      class: "6ème A",
      subject: "Math",
      room: "A2"
    },
    {
      day: "Mercredi",
      start: "09:00",
      end: "11:00",
      class: "1ère Bac",
      subject: "Math",
      room: "C3"
    }
  ];

  // 🎨 Couleurs par classe
  const getColor = (className) => {
    if (className === "3ème A") return "bg-primary text-white";
    if (className === "6ème A") return "bg-success text-white";
    if (className === "1ère Bac") return "bg-warning";
    return "bg-secondary text-white";
  };

  return (
    <DashboardLayout userRole="teacher" userName="Mr Ahmed">
      <div className="container-fluid">

        <h2 className="mb-4">Mon emploi du temps</h2>

        <div className="row">

          {days.map((day) => (
            <div key={day} className="col-md-2">

              <div className="card shadow-sm p-2">

                <h5 className="text-center mb-3">{day}</h5>

                {timetable
                  .filter((t) => t.day === day)
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`p-2 mb-2 rounded ${getColor(item.class)}`}
                    >
                      <strong>{item.subject}</strong>

                      <br />
                      <small>{item.start} - {item.end}</small>

                      <br />
                      <small>Classe: {item.class}</small>

                      <br />
                      <small>Salle: {item.room}</small>
                    </div>
                  ))}

              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

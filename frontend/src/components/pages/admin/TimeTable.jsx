import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TimeTable() {
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState([
    {
      id: 1,
      day: "Lundi",
      start: "08:00",
      end: "10:00",
      subject: "Math",
      teacher: "Mr Ahmed",
      room: "B12"
    },
    {
      id: 2,
      day: "Lundi",
      start: "10:00",
      end: "12:00",
      subject: "Français",
      teacher: "Mme Fatima",
      room: "A2"
    },
    {
      id: 3,
      day: "Mardi",
      start: "09:00",
      end: "11:00",
      subject: "Informatique",
      teacher: "Mr Karim",
      room: "Lab1"
    }
  ]);

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  // 🎨 Couleurs matières
  const getColor = (subject) => {
    if (subject === "Math") return "bg-primary text-white";
    if (subject === "Français") return "bg-success text-white";
    if (subject === "Informatique") return "bg-warning";
    return "bg-secondary text-white";
  };

  // ❌ Supprimer
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce cours ?")) {
      setTimetable(timetable.filter((item) => item.id !== id));
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Emploi du temps</h2>

          <button
            onClick={() => navigate('/admin/timetable/create')}
            className="btn btn-primary"
          >
            + Ajouter
          </button>
        </div>

        {/* Calendrier */}
        <div className="row">

          {days.map((day) => (
            <div key={day} className="col-md-2">

              <div className="card shadow-sm p-2">

                <h5 className="text-center mb-3">{day}</h5>

                {timetable
                  .filter((t) => t.day === day)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`p-2 mb-2 rounded ${getColor(item.subject)}`}
                    >
                      <strong>{item.subject}</strong>

                      <br />
                      <small>{item.start} - {item.end}</small>

                      <br />
                      <small>{item.teacher}</small>

                      <br />
                      <small>{item.room}</small>

                      {/* Actions */}
                      <div className="mt-2 d-flex justify-content-between">

                        <button
                          onClick={() => navigate(`/admin/timetable/edit/${item.id}`)}
                          className="btn btn-sm btn-light"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-sm btn-danger"
                        >
                          🗑
                        </button>

                      </div>
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

import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function TeacherNotifications() {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "assignment",
      message: "Ahmed a rendu le devoir de Math",
      time: "10:30",
      read: false
    },
    {
      id: 2,
      type: "message",
      message: "Nouveau message de Sara",
      time: "09:15",
      read: false
    },
    {
      id: 3,
      type: "absence",
      message: "Youssef est absent aujourd’hui",
      time: "08:00",
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getIcon = (type) => {
    if (type === "assignment") return "📄";
    if (type === "message") return "💬";
    if (type === "absence") return "📊";
    return "🔔";
  };

  return (
    <DashboardLayout userRole="teacher" userName="Mr Karim">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>🔔 Notifications</h2>
          <p>Consultez vos dernières notifications</p>
        </div>

        {/* LIST */}
        <div className="card shadow p-3">

          <ul className="list-group">

            {notifications.map((n) => (
              <li
                key={n.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  !n.read ? "list-group-item-warning" : ""
                }`}
              >

                <div>
                  <span className="me-2">{getIcon(n.type)}</span>
                  {n.message}
                  <br />
                  <small className="text-muted">{n.time}</small>
                </div>

                {!n.read && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => markAsRead(n.id)}
                  >
                    Marquer lu
                  </button>
                )}

              </li>
            ))}

          </ul>

        </div>

      </div>
    </DashboardLayout>
  );
}

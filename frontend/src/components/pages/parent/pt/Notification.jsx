import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function ParentNotifications() {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "absence",
      message: "Ahmed est absent aujourd’hui",
      time: "08:00",
      read: false
    },
    {
      id: 2,
      type: "note",
      message: "Nouvelle note en Math: 16/20",
      time: "10:30",
      read: false
    },
    {
      id: 3,
      type: "assignment",
      message: "Nouveau devoir en Français",
      time: "09:00",
      read: true
    },
    {
      id: 4,
      type: "payment",
      message: "Paiement en attente",
      time: "Hier",
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getIcon = (type) => {
    if (type === "absence") return "📊";
    if (type === "note") return "📊";
    if (type === "assignment") return "📄";
    if (type === "payment") return "💰";
    if (type === "message") return "💬";
    return "🔔";
  };

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>🔔 Notifications</h2>
          <p>Suivi des informations importantes</p>
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

import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function Notifications() {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Paiement en attente",
      message: "Veuillez payer les frais de Février",
      type: "payment",
      read: false,
      date: "2026-04-10"
    },
    {
      id: 2,
      title: "Nouveau devoir",
      message: "Un devoir de math a été ajouté",
      type: "assignment",
      read: true,
      date: "2026-04-09"
    },
    {
      id: 3,
      title: "Annonce",
      message: "Fête scolaire le 25 avril",
      type: "announcement",
      read: false,
      date: "2026-04-08"
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getBadge = (type) => {
    switch (type) {
      case "payment":
        return "bg-danger";
      case "assignment":
        return "bg-primary";
      case "announcement":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>🔔 Notifications</h2>
          <p>Consultez vos alertes et messages importants</p>
        </div>

        {/* LIST */}
        <div className="card shadow p-3">

          {notifications.length === 0 ? (
            <p className="text-center">Aucune notification</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 mb-2 rounded border ${
                  n.read ? "bg-light" : "bg-white"
                }`}
              >

                <div className="d-flex justify-content-between">

                  <div>
                    <h6>
                      {n.title}
                      {!n.read && (
                        <span className="badge bg-warning ms-2">
                          Nouveau
                        </span>
                      )}
                    </h6>

                    <p className="mb-1">{n.message}</p>

                    <small className="text-muted">{n.date}</small>
                  </div>

                  <div className="text-end">

                    <span className={`badge ${getBadge(n.type)} mb-2`}>
                      {n.type}
                    </span>

                    <div>
                      {!n.read && (
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => markAsRead(n.id)}
                        >
                          ✔ Lu
                        </button>
                      )}

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteNotification(n.id)}
                      >
                        🗑
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";

export default function Settings() {

  const [school, setSchool] = useState({
    name: "École Excellence",
    email: "contact@ecole.com",
    phone: "0600000000",
    address: "Casablanca"
  });

  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "admin@ecole.com",
    password: ""
  });

  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Paramètres</h2>

        <div className="row">

          {/* 🏫 Infos école */}
          <div className="col-md-6">
            <div className="card shadow p-4 mb-4">

              <h5 className="mb-3">Informations école</h5>

              <input
                className="form-control mb-2"
                value={school.name}
                onChange={(e) =>
                  setSchool({ ...school, name: e.target.value })
                }
                placeholder="Nom école"
              />

              <input
                className="form-control mb-2"
                value={school.email}
                onChange={(e) =>
                  setSchool({ ...school, email: e.target.value })
                }
                placeholder="Email"
              />

              <input
                className="form-control mb-2"
                value={school.phone}
                onChange={(e) =>
                  setSchool({ ...school, phone: e.target.value })
                }
                placeholder="Téléphone"
              />

              <input
                className="form-control"
                value={school.address}
                onChange={(e) =>
                  setSchool({ ...school, address: e.target.value })
                }
                placeholder="Adresse"
              />

            </div>
          </div>

          {/* 👤 Profil admin */}
          <div className="col-md-6">
            <div className="card shadow p-4 mb-4">

              <h5 className="mb-3">Profil admin</h5>

              <input
                className="form-control mb-2"
                value={admin.name}
                onChange={(e) =>
                  setAdmin({ ...admin, name: e.target.value })
                }
                placeholder="Nom"
              />

              <input
                className="form-control mb-2"
                value={admin.email}
                onChange={(e) =>
                  setAdmin({ ...admin, email: e.target.value })
                }
                placeholder="Email"
              />

              <input
                type="password"
                className="form-control"
                value={admin.password}
                onChange={(e) =>
                  setAdmin({ ...admin, password: e.target.value })
                }
                placeholder="Nouveau mot de passe"
              />

            </div>
          </div>

        </div>

        <div className="row">

          {/* 🎨 Thème */}
          <div className="col-md-6">
            <div className="card shadow p-4 mb-4">

              <h5 className="mb-3">Thème</h5>

              <select
                className="form-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
              </select>

            </div>
          </div>

          {/* 🔔 Notifications */}
          <div className="col-md-6">
            <div className="card shadow p-4 mb-4">

              <h5 className="mb-3">Notifications</h5>

              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />

                <label className="form-check-label">
                  Activer les notifications
                </label>
              </div>

            </div>
          </div>

        </div>

        {/* 💾 Save */}
        <div className="text-end">
          <button
            className="btn btn-primary"
            onClick={() => alert("Paramètres sauvegardés !")}
          >
            Enregistrer
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

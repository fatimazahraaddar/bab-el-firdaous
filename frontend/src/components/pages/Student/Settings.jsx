import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function Settings() {

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "fr",
    currentPassword: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const saveSettings = () => {
    console.log(settings);
    alert("Paramètres sauvegardés !");
  };

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>⚙️ Paramètres</h2>
          <p>Gérer vos préférences</p>
        </div>

        {/* NOTIFICATIONS */}
        <div className="card shadow p-4 mb-4">
          <h5>🔔 Notifications</h5>

          <div className="form-check form-switch mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Activer les notifications
            </label>
          </div>
        </div>

        {/* APP SETTINGS */}
        <div className="card shadow p-4 mb-4">
          <h5>🎨 Préférences</h5>

          <div className="row mt-3">

            <div className="col-md-6">
              <label>Langue</label>
              <select
                className="form-select"
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="col-md-6 d-flex align-items-center mt-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                />
                <label className="form-check-label">
                  Mode sombre
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* PASSWORD */}
        <div className="card shadow p-4 mb-4">
          <h5>🔐 Changer mot de passe</h5>

          <div className="row mt-3">

            <div className="col-md-6 mb-3">
              <input
                type="password"
                name="currentPassword"
                className="form-control"
                placeholder="Mot de passe actuel"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="password"
                name="newPassword"
                className="form-control"
                placeholder="Nouveau mot de passe"
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="card shadow p-4 border-danger">
          <h5 className="text-danger">⚠️ Zone dangereuse</h5>

          <p>Supprimer votre compte définitivement</p>

          <button className="btn btn-danger">
            Supprimer le compte
          </button>
        </div>

        {/* SAVE */}
        <div className="mt-4">
          <button className="btn btn-primary" onClick={saveSettings}>
            💾 Sauvegarder
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

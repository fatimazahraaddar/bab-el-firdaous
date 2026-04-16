import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function TeacherSettings() {

  const [settings, setSettings] = useState({
    name: "Mr Karim",
    email: "karim@email.com",
    phone: "0600000000",
    notifications: true,
    darkMode: false,
    language: "fr",
    availability: "Disponible",
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

  const save = () => {
    console.log(settings);
    alert("Paramètres enregistrés !");
  };

  return (
    <DashboardLayout userRole="teacher" userName={settings.name}>
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>⚙️ Paramètres Professeur</h2>
          <p>Gérer votre compte et préférences</p>
        </div>

        {/* PROFILE */}
        <div className="card shadow p-4 mb-4">
          <h5>👤 Informations</h5>

          <div className="row mt-3">

            <div className="col-md-6 mb-3">
              <label>Nom</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={settings.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Téléphone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Disponibilité</label>
              <select
                className="form-select"
                name="availability"
                value={settings.availability}
                onChange={handleChange}
              >
                <option>Disponible</option>
                <option>Occupé</option>
                <option>En congé</option>
              </select>
            </div>

          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="card shadow p-4 mb-4">
          <h5>🔔 Notifications</h5>

          <div className="form-check form-switch mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Activer notifications
            </label>
          </div>
        </div>

        {/* PREFERENCES */}
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
                  type="checkbox"
                  className="form-check-input"
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
          <h5>🔐 Mot de passe</h5>

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

        {/* SAVE */}
        <div className="text-end">
          <button className="btn btn-primary" onClick={save}>
            💾 Sauvegarder
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

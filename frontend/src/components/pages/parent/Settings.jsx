import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ParentSettings() {

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "fr",
    currentPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(true);

  // 🔥 LOAD SETTINGS FROM API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/settings", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        setSettings(prev => ({
          ...prev,
          ...res.data
        }));

      } catch (err) {
        console.error("Erreur settings:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 🔄 HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // 💾 SAVE SETTINGS
  const saveSettings = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/settings",
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      );

      alert("✅ Paramètres sauvegardés !");

    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la sauvegarde");
    }
  };

  // 🔐 CHANGE PASSWORD
  const changePassword = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/change-password",
        {
          currentPassword: settings.currentPassword,
          newPassword: settings.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Mot de passe changé");

    } catch (err) {
      console.error(err);
      alert("❌ Mot de passe incorrect");
    }
  };

  // 🗑 DELETE ACCOUNT
  const deleteAccount = async () => {
    if (!window.confirm("Supprimer votre compte ?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:8000/api/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.clear();
      window.location.href = "/";

    } catch (err) {
      console.error(err);
      alert("❌ Erreur suppression");
    }
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-4">Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
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
              type="checkbox"
              className="form-check-input"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Activer les notifications
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

          <button className="btn btn-warning" onClick={changePassword}>
            🔐 Changer mot de passe
          </button>
        </div>

        {/* DANGER ZONE */}
        <div className="card shadow p-4 border-danger">
          <h5 className="text-danger">⚠️ Zone dangereuse</h5>

          <p>Supprimer votre compte définitivement</p>

          <button className="btn btn-danger" onClick={deleteAccount}>
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
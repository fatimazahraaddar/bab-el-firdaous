import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useEffect } from "react";

export default function Settings() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [school, setSchool] = useState({});
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("fr");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSchool(data.school || {});
        setUser(data.user || {});
        setTheme(data.preferences?.theme || "light");
        setNotifications(data.preferences?.notifications ?? true);
        setLanguage(data.preferences?.language || "fr");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_BASE]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          theme,
          notifications,
          language,
        }),
      });

      if (!res.ok) throw new Error();
      alert("Paramètres sauvegardés !");
    } catch {
      alert("Erreur lors de la sauvegarde");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading text-center mt-5">Chargement des paramètres...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <h2 className="mb-4">Paramètres</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow p-4 mb-4">
              <h5>Informations école</h5>
              <input className="form-control mb-2" value={school.name || ""} readOnly />
              <input className="form-control mb-2" value={school.email || ""} readOnly />
              <input className="form-control mb-2" value={school.phone || ""} readOnly />
              <input className="form-control" value={school.address || ""} readOnly />
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-4 mb-4">
              <h5>Profil admin</h5>
              <input
                className="form-control mb-2"
                value={user.name || ""}
                onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
              />
              <input
                className="form-control mb-2"
                value={user.email || ""}
                onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
              />
              <input className="form-control" value={user.role || "admin"} readOnly />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow p-4 mb-4">
              <h5>Thème</h5>
              <select className="form-select mb-2" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
              </select>
              <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-4 mb-4">
              <h5>Notifications</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={notifications}
                  onChange={() => setNotifications((prev) => !prev)}
                />
                <label className="form-check-label">Activer les notifications</label>
              </div>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button className="btn btn-primary" onClick={handleSave}>
            Enregistrer
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}


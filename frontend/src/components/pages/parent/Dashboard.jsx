import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ParentDashboard() {

  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    payments: 0,
    absences: 0,
    children: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        };

        const dashboardRes = await axios.get(
          "http://localhost:8000/api/dashboard",
          { headers }
        );

        const dashboard = dashboardRes.data || {};
        const dashboardChildren = Array.isArray(dashboard.children) ? dashboard.children : [];
        const dashboardStats = Array.isArray(dashboard.stats) ? dashboard.stats : [];

        setChildren(dashboardChildren);
        setStats({
          children: dashboardStats.find((s) => s.title === "Enfants")?.value || dashboardChildren.length,
          absences: dashboardStats.find((s) => s.title === "Absences")?.value || 0,
          payments: dashboardStats.find((s) => s.title === "Paiements regles")?.value || 0,
        });

      } catch (err) {
        console.error("Erreur dashboard:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Chargement du dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <div>
            <h1>👨‍👩‍👧 Dashboard Parent</h1>
            <p>Suivi intelligent de vos enfants</p>
          </div>
        </div>

        {/* CHILDREN */}
        <div className="premium-stats">

          {children.map((child) => (
            <div key={child.id} className="premium-card child-card">

              <div className="child-header">
                {/* <img
                  src={child.avatar || "https://via.placeholder.com/80"}
                  alt="child"
                  className="child-avatar"
                /> */}

                <div>
                  <h3>{child.name}</h3>
                  <p>
                    {child.class || "Classe inconnue"}
                  </p>
                </div>
              </div>

              <div className="child-stats">

                <div className="stat-box">
                  <span>Niveau</span>
                  <strong>{child.level}</strong>
                </div>

                <div className="stat-box">
                  <span>Transport</span>
                  <strong>{child.transport || "--"}</strong>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* GLOBAL STATS */}
        <div className="premium-grid">

          <div className="premium-card stat-card">
            <h4>👨‍👩‍👧 Enfants</h4>
            <p className="big">{stats.children}</p>
          </div>

          <div className="premium-card stat-card">
            <h4>💰 Paiements</h4>
            <p className="big success">{stats.payments}</p>
          </div>

          <div className="premium-card stat-card">
            <h4>📊 Absences</h4>
            <p className="big danger">{stats.absences}</p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

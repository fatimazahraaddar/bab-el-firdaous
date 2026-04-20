import DashboardLayout from "../Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Children() {
  const navigate = useNavigate();

  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/students", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const rows = Array.isArray(res.data) ? res.data : [];
        setChildren(rows);
        if (rows.length) {
          setSelectedChild(rows[0]);
        }
      } catch (err) {
        console.error("Erreur enfants:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  if (loading) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Chargement des enfants...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <div>
            <h1>👨‍👩‍👧 Mes enfants</h1>
            <p>Suivi complet des informations scolaires</p>
          </div>
        </div>

        {/* GRID */}
        <div className="premium-stats">

          {children.map((child) => (
            <div
              key={child.id}
              className={`premium-card child-card ${
                selectedChild?.id === child.id ? "active" : ""
              }`}
              onClick={() => setSelectedChild(child)}
            >

              {/* HEADER CARD */}
              <div className="child-header">
                <img
                  src={child.avatar || "https://via.placeholder.com/80"}
                  alt="child"
                  className="child-avatar"
                />
                <div>
                  <h3>{child.user?.name || child.name}</h3>
                  <p>{child.school_class?.name || child.schoolClass?.name || "Classe inconnue"}</p>
                </div>
              </div>

              <div className="child-stats">

                <div className="stat-box">
                  <span>Moyenne</span>
                  <strong className="success">
                    {Math.max(8, 20 - (child.absences_count || 0)).toFixed(1)}/20
                  </strong>
                </div>

                <div className="stat-box">
                  <span>Absences</span>
                  <strong className={(child.absences_count || 0) > 0 ? "danger" : "success"}>
                    {child.absences_count || 0}
                  </strong>
                </div>

              </div>

              <button
                className="child-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/parent/child/${child.id}`);
                }}
              >
                Voir profil →
              </button>

            </div>
          ))}

        </div>

        {selectedChild && (
          <div className="premium-card child-details">

            <h2>📊 Détails de {selectedChild.user?.name || selectedChild.name}</h2>

            <div className="details-grid">

              <div className="detail-box">
                <h4>Absences</h4>
                <p>{selectedChild.absences_count || 0}</p>
              </div>

              <div className="detail-box">
                <h4>Moyenne</h4>
                <p>{Math.max(8, 20 - (selectedChild.absences_count || 0)).toFixed(1)}/20</p>
              </div>

              <div className="detail-box">
                <h4>Classe</h4>
                <p>{selectedChild.school_class?.name || selectedChild.schoolClass?.name || "--"}</p>
              </div>

              <div className="detail-box">
                <h4>Transport</h4>
                <p>
                  {selectedChild.transport === "bus"
                    ? `Bus ${selectedChild.bus?.number || ""}`.trim()
                    : selectedChild.transport || "Non défini"}
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

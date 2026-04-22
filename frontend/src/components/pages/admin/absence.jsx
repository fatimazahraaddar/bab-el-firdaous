import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Absences() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [search, setSearch] = useState("");
  const [absences, setAbsences] = useState([]); // 🔥 dynamique
  const [loading, setLoading] = useState(true);

  // 🔄 Charger les données depuis API
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE}/api/absences`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        // 1. T-akked beli response status 200
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json(); // Hadhi kat-reje3 Promise
      })
      .then((data) => {
        // 2. Debug: Chouf d-data f console
        console.log("Data kamla:", data);

        // 3. Hitach dayr paginate(15), d-data kayna f data.data
        if (data && data.data && Array.isArray(data.data)) {
          setAbsences(data.data);
        } else if (Array.isArray(data)) {
          setAbsences(data);
        } else {
          setAbsences([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [API_BASE]);

  // 🔍 Filtrage
  const filteredAbsences = absences.filter((a) => {
    const studentName = a.student?.user?.name || "";
    return studentName.toLowerCase().includes(search.toLowerCase());
  });

  // 🎨 Couleur statut
  const getStatusColor = (status) => {
    if (status === "absent") return "bg-danger";
    if (status === "present") return "bg-success";
    if (status === "late") return "bg-warning";
    return "bg-secondary";
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Liste des absences</h2>
          <button
            onClick={() => navigate('/admin/absences/stats')}
            className="btn btn-outline-primary"
          >
            Voir statistiques
          </button>
        </div>

        {/* Compteur */}
        <h5 className="mb-3">
          Total : {filteredAbsences.length} absences
        </h5>

        {/* Recherche */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Rechercher un élève..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tableau */}
        <div className="card shadow p-3">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Élève</th>
                <th>Cours</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAbsences.length > 0 ? (
                filteredAbsences.map((absence) => (
                  <tr key={absence.id}>
                    <td>{absence.student?.user?.name || "—"}</td>
                    <td>{absence.reason || "—"}</td>
                    <td>{new Date(absence.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${getStatusColor(absence.status)}`}>
                        {absence.status || (absence.justified ? "present" : "absent")}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/admin/absences/${absence.id}`)}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Voir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Aucune absence trouvée
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}

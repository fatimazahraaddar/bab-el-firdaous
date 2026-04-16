import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Absences() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const absences = [
    {
      id: 1,
      student: "Ahmed Benali",
      course: "Math",
      date: "2026-04-10",
      status: "Absent"
    },
    {
      id: 2,
      student: "Sara Ali",
      course: "Physique",
      date: "2026-04-09",
      status: "Présent"
    },
    {
      id: 3,
      student: "Youssef Karim",
      course: "Informatique",
      date: "2026-04-08",
      status: "Retard"
    }
  ];

  // 🔍 Filtrage
  const filteredAbsences = absences.filter((a) =>
    a.student.toLowerCase().includes(search.toLowerCase())
  );

  // 🎨 Couleur statut
  const getStatusColor = (status) => {
    if (status === "Absent") return "bg-danger";
    if (status === "Présent") return "bg-success";
    if (status === "Retard") return "bg-warning";
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Liste des absences</h2>
          <button
            onClick={() => navigate('/admin/absences/create')}
            className="btn btn-primary"
          >
            + Ajouter
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
            <thead>
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
                    <td>{absence.student}</td>
                    <td>{absence.course}</td>
                    <td>
                      {new Date(absence.date).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`badge ${getStatusColor(absence.status)}`}>
                        {absence.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/admin/absences/${absence.id}`)}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Voir
                      </button>

                      <button
                        onClick={() => navigate(`/admin/absences/edit/${absence.id}`)}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        Modifier
                      </button>

                      <button className="btn btn-sm btn-outline-danger">
                        Supprimer
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

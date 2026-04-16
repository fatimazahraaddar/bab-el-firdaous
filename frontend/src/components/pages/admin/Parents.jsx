import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Parents() {
  const navigate = useNavigate();

  const [parents, setParents] = useState([
    {
      id: 1,
      name: "Mohamed Benali",
      phone: "0600000000",
      email: "mohamed@gmail.com",
      job: "Ingénieur"
    },
    {
      id: 2,
      name: "Fatima Zahra",
      phone: "0611111111",
      email: "fatima@gmail.com",
      job: "Médecin"
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce parent ?")) {
      setParents(parents.filter(p => p.id !== id));
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Liste des parents</h2>

          <button
            onClick={() => navigate('/admin/parents/create')}
            className="btn btn-primary"
          >
            + Ajouter parent
          </button>
        </div>

        <div className="card shadow p-3">

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {parents.map((parent) => (
                <tr key={parent.id}>
                  <td>{parent.name}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.email}</td>
                  <td>{parent.job}</td>
                  <td>

                    <button
                      onClick={() => navigate(`/admin/parents/edit/${parent.id}`)}
                      className="btn btn-sm btn-outline-warning me-2"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(parent.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      🗑
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";

export default function Transport() {

  const [buses] = useState([
    {
      id: 1,
      number: "Bus 1",
      driver: "Ali",
      students: 20
    },
    {
      id: 2,
      number: "Bus 2",
      driver: "Karim",
      students: 15
    }
  ]);

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Transport scolaire</h2>

        <div className="card shadow p-3">

          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Bus</th>
                <th>Chauffeur</th>
                <th>Nombre élèves</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {buses.length > 0 ? (
                buses.map((bus) => (
                  <tr key={bus.id}>

                    <td>
                      <span className="badge bg-primary">
                        🚌 {bus.number}
                      </span>
                    </td>

                    <td>{bus.driver}</td>

                    <td>
                      <span className="badge bg-success">
                        {bus.students} élèves
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        👀
                      </button>

                      <button className="btn btn-sm btn-outline-warning me-2">
                        ✏️
                      </button>

                      <button className="btn btn-sm btn-outline-danger">
                        🗑
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Aucun bus disponible
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

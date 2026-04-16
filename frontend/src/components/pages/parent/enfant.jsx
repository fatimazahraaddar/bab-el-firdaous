import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function Children() {

  const [children] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      class: "3A",
      age: 14,
      average: 14.5,
      absences: 2
    },
    {
      id: 2,
      name: "Sara Ali",
      class: "5B",
      age: 16,
      average: 16.2,
      absences: 0
    }
  ]);

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>👨‍👩‍👧 Mes enfants</h2>
          <p>Liste de vos enfants inscrits</p>
        </div>

        {/* LIST */}
        <div className="row">

          {children.map((child) => (
            <div key={child.id} className="col-md-4 mb-3">

              <div className="card shadow p-3 text-center">

                {/* PHOTO */}
                <img
                  src="https://via.placeholder.com/100"
                  alt="child"
                  className="rounded-circle mb-3"
                />

                {/* INFO */}
                <h5>{child.name}</h5>
                <p className="text-muted">
                  Classe: {child.class} | {child.age} ans
                </p>

                {/* STATS */}
                <div className="d-flex justify-content-around mt-3">

                  <div>
                    <small>Moyenne</small>
                    <br />
                    <span className="badge bg-success">
                      {child.average}/20
                    </span>
                  </div>

                  <div>
                    <small>Absences</small>
                    <br />
                    <span className={`badge ${
                      child.absences > 0 ? "bg-danger" : "bg-success"
                    }`}>
                      {child.absences}
                    </span>
                  </div>

                </div>

                {/* ACTION */}
                <button className="btn btn-primary mt-3 w-100">
                  👀 Voir détails
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

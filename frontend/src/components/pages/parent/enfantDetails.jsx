import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function ChildDetails() {

  const child = {
    name: "Ahmed Ali",
    class: "3A",
    age: 14,
    average: 14.5,
    absences: 2,
    transport: "Bus 2",
    parents: ["Mohamed Ali", "Fatima Ali"]
  };

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>👤 Détails de l'enfant</h2>
          <p>Suivi complet</p>
        </div>

        <div className="row">

          {/* LEFT PROFILE */}
          <div className="col-md-4">
            <div className="card shadow p-4 text-center">

              <img
                src="https://via.placeholder.com/120"
                alt="child"
                className="rounded-circle mb-3"
              />

              <h5>{child.name}</h5>
              <p className="text-muted">{child.class}</p>

              <span className="badge bg-primary">
                👨‍🎓 Élève
              </span>

            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="col-md-8">

            {/* GENERAL INFO */}
            <div className="card shadow p-3 mb-4">
              <h5>📋 Informations</h5>

              <div className="row mt-3">

                <div className="col-md-6 mb-2">
                  <strong>Âge:</strong> {child.age}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Classe:</strong> {child.class}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Transport:</strong> 🚌 {child.transport}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Parents:</strong> {child.parents.join(", ")}
                </div>

              </div>
            </div>

            {/* STATS */}
            <div className="row mb-4">

              <div className="col-md-6">
                <div className="card shadow p-3 text-center">
                  <h6>📊 Moyenne</h6>
                  <h3>{child.average}/20</h3>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow p-3 text-center">
                  <h6>📊 Absences</h6>
                  <h3 className={child.absences > 0 ? "text-danger" : "text-success"}>
                    {child.absences}
                  </h3>
                </div>
              </div>

            </div>

            {/* QUICK ACCESS */}
            <div className="card shadow p-3">

              <h5>⚡ Accès rapide</h5>

              <div className="row mt-3">

                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-primary w-100">
                    📊 Notes
                  </button>
                </div>

                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-danger w-100">
                    📊 Absences
                  </button>
                </div>

                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-success w-100">
                    📄 Devoirs
                  </button>
                </div>

                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-warning w-100">
                    📅 Emploi du temps
                  </button>
                </div>

                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-info w-100">
                    💰 Paiement
                  </button>
                </div>

                <div className="col-md-4 mb-2">
                  <button className="btn btn-outline-secondary w-100">
                    💬 Message
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

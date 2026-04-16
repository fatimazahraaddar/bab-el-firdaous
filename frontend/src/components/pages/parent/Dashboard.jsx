import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function ParentDashboard() {

  const children = [
    {
      id: 1,
      name: "Ahmed",
      class: "3A",
      average: 14.5,
      absences: 2
    },
    {
      id: 2,
      name: "Sara",
      class: "5B",
      average: 16.2,
      absences: 0
    }
  ];

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>👨‍👩‍👧 Dashboard Parent</h2>
          <p>Suivi de vos enfants</p>
        </div>

        {/* CHILDREN CARDS */}
        <div className="row mb-4">

          {children.map((child) => (
            <div key={child.id} className="col-md-6 mb-3">

              <div className="card shadow p-3">

                <h5>👨‍🎓 {child.name}</h5>
                <p className="text-muted">Classe: {child.class}</p>

                <div className="d-flex justify-content-between mt-3">

                  <div>
                    <h6>Moyenne</h6>
                    <span className="badge bg-success">
                      {child.average}/20
                    </span>
                  </div>

                  <div>
                    <h6>Absences</h6>
                    <span className={`badge ${
                      child.absences > 0 ? "bg-danger" : "bg-success"
                    }`}>
                      {child.absences}
                    </span>
                  </div>

                </div>

                <button className="btn btn-outline-primary mt-3">
                  Voir détails
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* GLOBAL INFO */}
        <div className="row">

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>💰 Paiements</h6>
              <h4 className="text-success">Payé</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>📄 Devoirs en attente</h6>
              <h4>3</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>🔔 Notifications</h6>
              <h4>5</h4>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

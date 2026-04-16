import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function TransportInfo() {

  const transport = {
    type: "Bus",
    busNumber: "Bus 3",
    driver: "Karim Benali",
    phone: "0600000000",
    morningTime: "07:30",
    returnTime: "17:00",
    status: "En route"
  };

  const students = [
    { id: 1, name: "Ahmed" },
    { id: 2, name: "Sara" },
    { id: 3, name: "Youssef" },
    { id: 4, name: "Lina" }
  ];

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>🚌 Transport Info</h2>
          <p>Suivi détaillé de votre transport scolaire</p>
        </div>

        {/* STATUS */}
        <div className="card shadow p-3 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5>🚦 Statut du transport</h5>

            <span className={`badge ${
              transport.status === "En route"
                ? "bg-warning"
                : "bg-success"
            }`}>
              {transport.status}
            </span>
          </div>
        </div>

        {/* INFO CARDS */}
        {transport.type === "Bus" && (
          <div className="row mb-4">

            <div className="col-md-3">
              <div className="card shadow p-3 text-center">
                <h6>Bus</h6>
                <h4>🚌 {transport.busNumber}</h4>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3 text-center">
                <h6>Chauffeur</h6>
                <h5>{transport.driver}</h5>
                <a href={`tel:${transport.phone}`} className="btn btn-sm btn-success mt-2">
                  📞 Appeler
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3 text-center">
                <h6>Matin</h6>
                <h5>{transport.morningTime}</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3 text-center">
                <h6>Retour</h6>
                <h5>{transport.returnTime}</h5>
              </div>
            </div>

          </div>
        )}

        {/* STUDENTS LIST */}
        <div className="card shadow p-3 mb-4">
          <h5>👨‍🎓 Élèves du bus</h5>

          <div className="row mt-3">
            {students.map((s) => (
              <div key={s.id} className="col-md-3 mb-2">
                <div className="card p-2 text-center">
                  👤 {s.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXTRA INFO */}
        <div className="card shadow p-3">
          <h5>ℹ️ Informations importantes</h5>

          <ul className="mt-3">
            <li>Arriver 5 minutes avant l'heure</li>
            <li>Respecter les règles du bus</li>
            <li>Contacter l’administration en cas de problème</li>
          </ul>
        </div>

      </div>
    </DashboardLayout>
  );
}

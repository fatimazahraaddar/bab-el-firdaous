import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function StudentTransport() {

  const transport = {
    type: "Bus", // ou "Pieton"
    busNumber: "Bus 2",
    driver: "Karim",
    phone: "0600000000",
    schedule: "07:30 - 08:00",
  };

  const students = [
    { id: 1, name: "Ahmed" },
    { id: 2, name: "Sara" },
    { id: 3, name: "Youssef" }
  ];

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>🚌 Transport scolaire</h2>
          <p>Informations sur votre transport</p>
        </div>

        {/* STATUS */}
        <div className="card shadow p-3 mb-4">
          <h5>🚦 Statut</h5>

          {transport.type === "Bus" ? (
            <span className="badge bg-success mt-2">
              🚌 Transport actif
            </span>
          ) : (
            <span className="badge bg-secondary mt-2">
              🚶 Piéton
            </span>
          )}
        </div>

        {/* BUS INFO */}
        {transport.type === "Bus" && (
          <div className="row mb-4">

            <div className="col-md-3">
              <div className="card shadow p-3">
                <h6>Bus</h6>
                <h5>{transport.busNumber}</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3">
                <h6>Chauffeur</h6>
                <h5>{transport.driver}</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3">
                <h6>Téléphone</h6>
                <h6>{transport.phone}</h6>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3">
                <h6>Horaire</h6>
                <h6>{transport.schedule}</h6>
              </div>
            </div>

          </div>
        )}

        {/* STUDENTS LIST */}
        {transport.type === "Bus" && (
          <div className="card shadow p-3">
            <h5>👨‍🎓 Élèves dans le bus</h5>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Nom</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

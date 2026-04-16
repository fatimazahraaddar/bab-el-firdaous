import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function ChildAbsences() {

  const absences = [
    {
      id: 1,
      date: "2026-04-10",
      subject: "Math",
      justified: false,
      reason: ""
    },
    {
      id: 2,
      date: "2026-04-05",
      subject: "Français",
      justified: true,
      reason: "Maladie"
    }
  ];

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📊 Absences de l'enfant</h2>
          <p>Suivi des absences</p>
        </div>

        {/* SUMMARY */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Total absences</h6>
              <h3 className="text-danger">{absences.length}</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Justifiées</h6>
              <h3 className="text-success">
                {absences.filter(a => a.justified).length}
              </h3>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Date</th>
                <th>Matière</th>
                <th>Statut</th>
                <th>Raison</th>
              </tr>
            </thead>

            <tbody>
              {absences.map((a) => (
                <tr key={a.id}>

                  <td>{a.date}</td>

                  <td>{a.subject}</td>

                  <td>
                    <span className={`badge ${
                      a.justified ? "bg-success" : "bg-danger"
                    }`}>
                      {a.justified ? "Justifiée" : "Non justifiée"}
                    </span>
                  </td>

                  <td>
                    {a.reason ? a.reason : "—"}
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

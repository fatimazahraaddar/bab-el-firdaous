import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function ChildAssignments() {

  const assignments = [
    {
      id: 1,
      title: "Exercice Math",
      subject: "Math",
      dueDate: "2026-04-20",
      status: "Non fait"
    },
    {
      id: 2,
      title: "Rédaction Français",
      subject: "Français",
      dueDate: "2026-04-18",
      status: "Fait"
    }
  ];

  const isLate = (date, status) => {
    return new Date(date) < new Date() && status === "Non fait";
  };

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📄 Devoirs de l'enfant</h2>
          <p>Suivi des devoirs</p>
        </div>

        {/* SUMMARY */}
        <div className="row mb-4">

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>Total</h6>
              <h3>{assignments.length}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>Faits</h6>
              <h3 className="text-success">
                {assignments.filter(a => a.status === "Fait").length}
              </h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>En retard</h6>
              <h3 className="text-danger">
                {assignments.filter(a => isLate(a.dueDate, a.status)).length}
              </h3>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Matière</th>
                <th>Date limite</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a) => (
                <tr key={a.id}>

                  <td>{a.title}</td>

                  <td>{a.subject}</td>

                  <td>{a.dueDate}</td>

                  <td>
                    <span className={`badge ${
                      a.status === "Fait"
                        ? "bg-success"
                        : isLate(a.dueDate, a.status)
                        ? "bg-danger"
                        : "bg-warning"
                    }`}>
                      {a.status === "Fait"
                        ? "✔ Fait"
                        : isLate(a.dueDate, a.status)
                        ? "En retard"
                        : "Non fait"}
                    </span>
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

import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function Payment() {

  const payments = [
    {
      id: 1,
      title: "Frais Janvier",
      amount: 500,
      status: "Payé",
      date: "2026-01-10"
    },
    {
      id: 2,
      title: "Frais Février",
      amount: 500,
      status: "En attente",
      date: "-"
    },
    {
      id: 3,
      title: "Transport",
      amount: 300,
      status: "Payé",
      date: "2026-02-05"
    }
  ];

  const totalPaid = payments
    .filter(p => p.status === "Payé")
    .reduce((acc, p) => acc + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === "En attente")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>💰 Paiements</h2>
          <p>Suivi de vos frais scolaires</p>
        </div>

        {/* SUMMARY */}
        <div className="row mb-4">

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>Total payé</h6>
              <h4 className="text-success">{totalPaid} DH</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>En attente</h6>
              <h4 className="text-danger">{totalPending} DH</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h6>Total global</h6>
              <h4>{totalPaid + totalPending} DH</h4>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow p-3">
          <h5>📄 Historique des paiements</h5>

          <table className="table mt-3">
            <thead>
              <tr>
                <th>Frais</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>

                  <td>{p.title}</td>

                  <td>{p.amount} DH</td>

                  <td>
                    <span className={`badge ${
                      p.status === "Payé"
                        ? "bg-success"
                        : "bg-warning"
                    }`}>
                      {p.status}
                    </span>
                  </td>

                  <td>{p.date}</td>

                  <td>
                    {p.status === "Payé" ? (
                      <button className="btn btn-sm btn-outline-primary">
                        📄 Reçu
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-outline-success">
                        💳 Payer
                      </button>
                    )}
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

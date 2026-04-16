import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function ParentPayments() {

  const payments = [
    {
      id: 1,
      title: "Frais Scolaires - Avril",
      amount: 200,
      date: "2026-04-01",
      status: "Payé"
    },
    {
      id: 2,
      title: "Transport - Avril",
      amount: 50,
      date: "2026-04-01",
      status: "Non payé"
    }
  ];

  const totalPaid = payments
    .filter(p => p.status === "Payé")
    .reduce((acc, p) => acc + p.amount, 0);

  const totalUnpaid = payments
    .filter(p => p.status === "Non payé")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>💰 Paiements</h2>
          <p>Gestion des frais scolaires</p>
        </div>

        {/* SUMMARY */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Total payé</h6>
              <h3 className="text-success">{totalPaid} €</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>À payer</h6>
              <h3 className="text-danger">{totalUnpaid} €</h3>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>

                  <td>{p.title}</td>

                  <td>{p.amount} €</td>

                  <td>{p.date}</td>

                  <td>
                    <span className={`badge ${
                      p.status === "Payé"
                        ? "bg-success"
                        : "bg-danger"
                    }`}>
                      {p.status}
                    </span>
                  </td>

                  <td>
                    {p.status === "Non payé" ? (
                      <button className="btn btn-sm btn-primary">
                        💳 Payer
                      </button>
                    ) : (
                      <span className="text-success">✔ Payé</span>
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

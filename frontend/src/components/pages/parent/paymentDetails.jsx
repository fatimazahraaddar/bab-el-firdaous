import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function PaymentDetails() {

  const payment = {
    title: "Frais Scolaires - Avril",
    amount: 200,
    status: "Non payé",
    date: "2026-04-01",
    method: "Carte bancaire",
    child: "Ahmed Ali",
    reference: "PAY-2026-001"
  };

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>🧾 Détail du paiement</h2>
          <p>Informations complètes</p>
        </div>

        {/* MAIN CARD */}
        <div className="card shadow p-4 mb-4">

          <div className="row">

            <div className="col-md-6 mb-3">
              <h6>Enfant</h6>
              <p>{payment.child}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Référence</h6>
              <p>{payment.reference}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Titre</h6>
              <p>{payment.title}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Montant</h6>
              <p>{payment.amount} €</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Date</h6>
              <p>{payment.date}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Méthode</h6>
              <p>{payment.method}</p>
            </div>

            <div className="col-md-6 mb-3">
              <h6>Statut</h6>
              <span className={`badge ${
                payment.status === "Payé"
                  ? "bg-success"
                  : "bg-danger"
              }`}>
                {payment.status}
              </span>
            </div>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="card shadow p-3">

          <h5>⚡ Actions</h5>

          <div className="d-flex gap-3 mt-3">

            {/* DOWNLOAD */}
            <button className="btn btn-outline-secondary">
              📥 Télécharger facture
            </button>

            {/* PAY */}
            {payment.status === "Non payé" && (
              <button className="btn btn-primary">
                💳 Payer maintenant
              </button>
            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    id,
    student: "Ahmed Benali",
    parent: "Mohamed Benali",
    amount: 1500,
    date: "2026-04-01",
    status: "unpaid"
  });

  const history = [
    { date: "2026-03-01", amount: 1500, status: "paid" },
    { date: "2026-02-01", amount: 1500, status: "paid" }
  ];

  // 🔄 changer statut
  const toggleStatus = () => {
    setPayment({
      ...payment,
      status: payment.status === "paid" ? "unpaid" : "paid"
    });
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail paiement</h2>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Retour
          </button>
        </div>

        <div className="row">

          {/* 💰 Infos paiement */}
          <div className="col-md-5">
            <div className="card shadow p-4 mb-3">

              <h5 className="mb-3">Informations</h5>

              <p><strong>Élève :</strong> {payment.student}</p>
              <p><strong>Parent :</strong> {payment.parent}</p>

              <p>
                <strong>Montant :</strong>{" "}
                <span className="badge bg-primary">
                  {payment.amount} DH
                </span>
              </p>

              <p>
                <strong>Date :</strong>{" "}
                {new Date(payment.date).toLocaleDateString()}
              </p>

              <p>
                <strong>Statut :</strong>{" "}
                <span className={`badge ${
                  payment.status === "paid"
                    ? "bg-success"
                    : "bg-danger"
                }`}>
                  {payment.status === "paid" ? "Payé" : "Non payé"}
                </span>
              </p>

              {/* Actions */}
              <div className="mt-3">

                <button
                  onClick={toggleStatus}
                  className="btn btn-success me-2"
                >
                  ✔ Marquer comme payé
                </button>

                <button className="btn btn-outline-primary">
                  🧾 Imprimer facture
                </button>

              </div>

            </div>
          </div>

          {/* 📊 Historique */}
          <div className="col-md-7">
            <div className="card shadow p-4">

              <h5 className="mb-3">Historique des paiements</h5>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Statut</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((h, i) => (
                    <tr key={i}>
                      <td>{new Date(h.date).toLocaleDateString()}</td>

                      <td>
                        <strong>{h.amount} DH</strong>
                      </td>

                      <td>
                        <span className="badge bg-success">
                          Payé
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH DATA
  useEffect(() => {
    fetch(`http://localhost:8000/api/payments/${id}`)
      .then(res => res.json())
      .then(data => {
        setPayment(data);

        // 🔥 historique du même student
        fetch(`http://localhost:8000/api/students/${data.student_id}/payments`)
          .then(res => res.json())
          .then(hist => {
            setHistory(hist);
            setLoading(false);
          });
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // 🔄 TOGGLE STATUS
  const toggleStatus = async () => {
    const res = await fetch(`http://localhost:8000/api/payments/${id}/toggle`, {
      method: "PATCH"
    });

    const updated = await res.json();
    setPayment(updated);
  };

  if (loading || !payment) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail paiement</h2>

          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Retour
          </button>
        </div>

        <div className="row">

          {/* 💰 Infos */}
          <div className="col-md-5">
            <div className="card shadow p-4 mb-3">

              <h5 className="mb-3">Informations</h5>

              <p><strong>Élève :</strong> {payment.student?.user?.name}</p>

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
                  ✔ Changer statut
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
                  {history.map((h) => (
                    <tr key={h.id}>
                      <td>{new Date(h.date).toLocaleDateString()}</td>

                      <td>
                        <strong>{h.amount} DH</strong>
                      </td>

                      <td>
                        <span className={`badge ${
                          h.status === "paid" ? "bg-success" : "bg-danger"
                        }`}>
                          {h.status === "paid" ? "Payé" : "Non payé"}
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
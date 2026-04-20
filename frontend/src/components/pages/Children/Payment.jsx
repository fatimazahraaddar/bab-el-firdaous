import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Payment() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/payments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        setPayments(res.data);

      } catch (err) {
        console.error("Erreur paiements:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Chargement des paiements...</div>
      </DashboardLayout>
    );
  }

  // 📊 CALCULS
  const totalPaid = payments
    .filter(p => p.status === "paid")
    .reduce((acc, p) => acc + Number(p.amount), 0);

  const totalPending = payments
    .filter(p => p.status === "unpaid")
    .reduce((acc, p) => acc + Number(p.amount), 0);

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <h2>💰 Paiements</h2>
          <p>Suivi des frais scolaires de vos enfants</p>
        </div>

        {/* SUMMARY */}
        <div className="premium-stats">

          <div className="premium-card text-center">
            <h6>Total payé</h6>
            <h3 className="text-success">{totalPaid} DH</h3>
          </div>

          <div className="premium-card text-center">
            <h6>En attente</h6>
            <h3 className="text-danger">{totalPending} DH</h3>
          </div>

          <div className="premium-card text-center">
            <h6>Total global</h6>
            <h3>{totalPaid + totalPending} DH</h3>
          </div>

        </div>

        {/* TABLE */}
        <div className="premium-card">
          <h5>📄 Historique des paiements</h5>

          <table className="table mt-3 align-middle">
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
              {payments.map((p) => {

                const isPaid = p.status === "paid";

                return (
                  <tr key={p.id}>

                    <td>{p.description || "Frais scolaire"}</td>

                    <td>{p.amount} DH</td>

                    <td>
                      <span className={`badge ${
                        isPaid ? "bg-success" : "bg-warning"
                      }`}>
                        {isPaid ? "Payé" : "En attente"}
                      </span>
                    </td>

                    <td>
                      {p.paid_date || p.due_date || "—"}
                    </td>

                    <td>
                      {isPaid ? (
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
                );
              })}
            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}
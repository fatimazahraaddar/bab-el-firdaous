import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ParentPayments() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/payments", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

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

  // 🔥 CALCULS
  const totalPaid = payments
    .filter(p => p.status === "paid")
    .reduce((acc, p) => acc + Number(p.amount), 0);

  const totalUnpaid = payments
    .filter(p => p.status === "unpaid")
    .reduce((acc, p) => acc + Number(p.amount), 0);

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <div>
            <h1>💰 Paiements</h1>
            <p>Suivi des frais scolaires</p>
          </div>
        </div>

        {/* STATS */}
        <div className="premium-stats">

          <div className="premium-card stat-card">
            <h4>Total payé</h4>
            <p className="big success">{totalPaid} DH</p>
          </div>

          <div className="premium-card stat-card">
            <h4>À payer</h4>
            <p className="big danger">{totalUnpaid} DH</p>
          </div>

        </div>

        {/* TABLE */}
        <div className="premium-card">

          <table className="table align-middle modern-table">

            <thead>
              <tr>
                <th>Enfant</th>
                <th>Description</th>
                <th>Montant</th>
                <th>Échéance</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr key={p.id}>

                    <td>{p.student?.user?.name || "—"}</td>
                    <td>{p.description}</td>

                    <td>{p.amount} €</td>

                    <td>{p.due_date}</td>

                    <td>
                      <span className={`badge ${
                        p.status === "paid"
                          ? "bg-success"
                          : "bg-danger"
                      }`}>
                        {p.status === "paid" ? "Payé" : "Non payé"}
                      </span>
                    </td>

                    <td>
                      {p.status === "unpaid" ? (
                        <span className="text-danger">À régler</span>
                      ) : (
                        <span className="text-success">✔ Payé</span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Aucun paiement trouvé
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

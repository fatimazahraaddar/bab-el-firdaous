import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentHistory() {

  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH API
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
        <div className="p-4">Chargement historique...</div>
      </DashboardLayout>
    );
  }

  // 🔍 FILTER + SEARCH
  const filteredPayments = payments.filter(p => {
    const statusLabel = p.status === "paid" ? "Payé" : "En attente";

    return (
      (filter === "all" || statusLabel === filter) &&
      (p.description || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  // 📊 TOTAL
  const total = filteredPayments.reduce(
    (acc, p) => acc + Number(p.amount),
    0
  );

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <h2>📄 Historique des paiements</h2>
          <p>Consultez tous les paiements de vos enfants</p>
        </div>

        {/* FILTER + SEARCH */}
        <div className="premium-card mb-4">
          <div className="row">

            <div className="col-md-4">
              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tous</option>
                <option value="Payé">Payé</option>
                <option value="En attente">En attente</option>
              </select>
            </div>

            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>
        </div>

        {/* TOTAL */}
        <div className="premium-card text-center mb-4">
          <h6>Total affiché</h6>
          <h3>{total} DH</h3>
        </div>

        {/* TABLE */}
        <div className="premium-card">
          <table className="table align-middle">
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
              {filteredPayments.map((p) => {

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
                          📄 Télécharger
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
import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function PaymentHistory() {

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const payments = [
    { id: 1, title: "Janvier", amount: 500, status: "Payé", date: "2026-01-10" },
    { id: 2, title: "Février", amount: 500, status: "En attente", date: "-" },
    { id: 3, title: "Mars", amount: 500, status: "Payé", date: "2026-03-12" },
    { id: 4, title: "Transport", amount: 300, status: "Payé", date: "2026-02-05" }
  ];

  const filteredPayments = payments.filter(p => {
    return (
      (filter === "all" || p.status === filter) &&
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const total = filteredPayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📄 Historique des paiements</h2>
          <p>Consultez tous vos paiements</p>
        </div>

        {/* FILTER + SEARCH */}
        <div className="card shadow p-3 mb-4">
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
        <div className="card shadow p-3 mb-4 text-center">
          <h6>Total affiché</h6>
          <h4>{total} DH</h4>
        </div>

        {/* TABLE */}
        <div className="card shadow p-3">
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
              {filteredPayments.map((p) => (
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
                        📄 Télécharger
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

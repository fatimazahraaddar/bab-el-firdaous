import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";

export default function Payments() {

  const [payments, setPayments] = useState([
    {
      id: 1,
      student: "Ahmed Benali",
      amount: 1500,
      date: "2026-04-01",
      status: "paid"
    },
    {
      id: 2,
      student: "Sara Ali",
      amount: 1500,
      date: "2026-04-01",
      status: "unpaid"
    }
  ]);

  const [form, setForm] = useState({
    student: "",
    amount: "",
    date: ""
  });

  // ➕ Ajouter paiement
  const addPayment = () => {
    if (!form.student || !form.amount || !form.date) return;

    setPayments([
      ...payments,
      {
        id: Date.now(),
        ...form,
        status: "unpaid"
      }
    ]);

    setForm({ student: "", amount: "", date: "" });
  };

  // 🔄 changer statut
  const toggleStatus = (id) => {
    setPayments(
      payments.map(p =>
        p.id === id
          ? { ...p, status: p.status === "paid" ? "unpaid" : "paid" }
          : p
      )
    );
  };

  // ❌ supprimer
  const deletePayment = (id) => {
    if (window.confirm("Supprimer ce paiement ?")) {
      setPayments(payments.filter(p => p.id !== id));
    }
  };

  // 📊 Stats
  const totalPaid = payments
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalUnpaid = payments
    .filter(p => p.status === "unpaid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Paiements</h2>

        {/* 📊 Stats */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h5>Total payé</h5>
              <h3 className="text-success">{totalPaid} DH</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h5>Total non payé</h5>
              <h3 className="text-danger">{totalUnpaid} DH</h3>
            </div>
          </div>

        </div>

        {/* ➕ Ajouter paiement */}
        <div className="card shadow p-3 mb-4">

          <h5 className="mb-3">Ajouter paiement</h5>

          <div className="row">

            <div className="col-md-4">
              <input
                type="text"
                placeholder="Nom élève"
                className="form-control"
                value={form.student}
                onChange={(e) =>
                  setForm({ ...form, student: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="number"
                placeholder="Montant"
                className="form-control"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <button onClick={addPayment} className="btn btn-primary w-100">
                Ajouter
              </button>
            </div>

          </div>

        </div>

        {/* 📋 Tableau */}
        <div className="card shadow p-3">

          <table className="table table-hover align-middle">

            <thead>
              <tr>
                <th>Élève</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>

                  <td>{p.student}</td>

                  <td><strong>{p.amount} DH</strong></td>

                  <td>{new Date(p.date).toLocaleDateString()}</td>

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

                    <button
                      onClick={() => toggleStatus(p.id)}
                      className="btn btn-sm btn-outline-success me-2"
                    >
                      ✔
                    </button>

                    <button
                      onClick={() => deletePayment(p.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      🗑
                    </button>

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

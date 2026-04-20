import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useEffect } from "react";

export default function Payments() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    student_id: "",
    description: "",
    amount: "",
    due_date: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    Promise.all([
      fetch(`${API_BASE}/api/payments`, { headers }),
      fetch(`${API_BASE}/api/students`, { headers }),
    ])
      .then(async ([p, s]) => {
        const paymentsData = await p.json();
        const studentsData = await s.json();

        setPayments(Array.isArray(paymentsData) ? paymentsData : []);
        setStudents(Array.isArray(studentsData) ? studentsData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [API_BASE]);

  const addPayment = async () => {
    if (!form.student_id || !form.amount || !form.due_date || !form.description) return;
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/api/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        student_id: Number(form.student_id),
        description: form.description,
        amount: Number(form.amount),
        due_date: form.due_date,
      }),
    });

    const newPayment = await res.json();
    if (!res.ok) {
      alert(newPayment?.message || "Erreur création paiement");
      return;
    }

    setPayments((prev) => [newPayment, ...prev]);
    setForm({ student_id: "", description: "", amount: "", due_date: "" });
  };

  const toggleStatus = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/api/payments/${id}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const updated = await res.json();
    if (!res.ok) return;
    setPayments((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const deletePayment = async (id) => {
    if (!window.confirm("Supprimer ?")) return;
    const token = localStorage.getItem("token");

    await fetch(`${API_BASE}/api/payments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalUnpaid = payments
    .filter((p) => p.status === "unpaid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <h2 className="mb-4">Paiements</h2>

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

        <div className="card shadow p-3 mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <select
                className="form-select"
                value={form.student_id}
                onChange={(e) => setForm((prev) => ({ ...prev, student_id: e.target.value }))}
              >
                <option value="">Choisir élève</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.user?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Montant"
                value={form.amount}
                onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
              />
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={form.due_date}
                onChange={(e) => setForm((prev) => ({ ...prev, due_date: e.target.value }))}
              />
            </div>

            <div className="col-md-2">
              <button onClick={addPayment} className="btn btn-primary w-100">
                Ajouter
              </button>
            </div>
          </div>
        </div>

        <div className="card shadow p-3">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Élève</th>
                <th>Description</th>
                <th>Montant</th>
                <th>Échéance</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.student?.user?.name || "—"}</td>
                  <td>{p.description}</td>
                  <td>
                    <strong>{p.amount} DH</strong>
                  </td>
                  <td>{p.due_date ? new Date(p.due_date).toLocaleDateString() : "-"}</td>
                  <td>
                    <span className={`badge ${p.status === "paid" ? "bg-success" : "bg-danger"}`}>
                      {p.status === "paid" ? "Payé" : "Non payé"}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => toggleStatus(p.id)} className="btn btn-sm btn-outline-success me-2">
                      ✔
                    </button>
                    <button onClick={() => deletePayment(p.id)} className="btn btn-sm btn-outline-danger">
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


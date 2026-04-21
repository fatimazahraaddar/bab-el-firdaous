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

  // 1. جلب البيانات عند تحميل الصفحة
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

        const finalPayments = paymentsData.data || (Array.isArray(paymentsData) ? paymentsData : []);
        const finalStudents = studentsData.data || (Array.isArray(studentsData) ? studentsData : []);

        setPayments(finalPayments);
        setStudents(finalStudents);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [API_BASE]);

  // 2. إضافة دفع جديد
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

    const data = await res.json();
    if (!res.ok) {
      alert(data?.message || "Erreur création paiement");
      return;
    }

    const newPayment = data.data || data;
    setPayments((prev) => [newPayment, ...prev]);
    setForm({ student_id: "", description: "", amount: "", due_date: "" });
  };

  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/payments/${id}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const updatedData = await res.json();
      if (!res.ok) throw new Error(updatedData.message);

      // تحديث المصفوفة في الواجهة
      const updatedPayment = updatedData.data || updatedData;
      setPayments((prev) => 
        prev.map((p) => (p.id === id ? updatedPayment : p))
      );
    } catch (err) {
      console.log(err);
      alert("Erreur lors du changement de statut");
    }
  };

  // 4. ✅ حذف دفع
  const deletePayment = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce paiement ?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/payments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error();

      setPayments((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalUnpaid = payments
    .filter((p) => p.status === "unpaid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  if (loading) return <div className="p-5 text-center">Chargement...</div>;

  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <div className="container-fluid">
        <h2 className="mb-4 text-dark">Gestion des Paiements</h2>

        {/* الكروت الإحصائية */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 p-3 text-center bg-white">
              <span className="text-muted small text-uppercase">Total payé</span>
              <h3 className="text-success fw-bold m-0">{totalPaid.toLocaleString()} DH</h3>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm border-0 p-3 text-center bg-white">
              <span className="text-muted small text-uppercase">Total restant</span>
              <h3 className="text-danger fw-bold m-0">{totalUnpaid.toLocaleString()} DH</h3>
            </div>
          </div>
        </div>

        {/* فورم الإضافة */}
        <div className="card shadow-sm border-0 p-3 mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <select
                className="form-select"
                value={form.student_id}
                onChange={(e) => setForm({ ...form, student_id: e.target.value })}
              >
                <option value="">Choisir élève ({students.length})</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.user?.name || "Élève sans nom"}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ex: Frais d'inscription"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Montant"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button onClick={addPayment} className="btn btn-primary w-100">
                Ajouter
              </button>
            </div>
          </div>
        </div>

        {/* الجدول */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Élève</th>
                  <th>Description</th>
                  <th>Montant</th>
                  <th>Échéance</th>
                  <th>Statut</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-5 text-muted">Aucun paiement enregistré.</td></tr>
                ) : (
                  payments.map((p) => (
                    <tr key={p.id}>
                      <td className="fw-medium">{p.student?.user?.name || "—"}</td>
                      <td>{p.description}</td>
                      <td className="fw-bold">{p.amount} DH</td>
                      <td>{p.due_date ? new Date(p.due_date).toLocaleDateString() : "-"}</td>
                      <td>
                        <span 
                          className={`badge rounded-pill ${p.status === "paid" ? "bg-success-subtle text-success border border-success" : "bg-danger-subtle text-danger border border-danger"}`}
                          style={{ padding: '0.5em 1em' }}
                        >
                          {p.status === "paid" ? "Payé" : "Non payé"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button 
                          onClick={() => toggleStatus(p.id)} 
                          className={`btn btn-sm ${p.status === 'paid' ? 'btn-secondary' : 'btn-success'} me-2`}
                          title="Changer statut"
                        >
                          {p.status === 'paid' ? '↩' : '✔'}
                        </button>
                        <button 
                          onClick={() => deletePayment(p.id)} 
                          className="btn btn-sm btn-outline-danger"
                          title="Supprimer"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
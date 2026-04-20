import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH REPORT
  useEffect(() => {
    fetch(`http://localhost:8000/api/reports/${id}`)
      .then(res => res.json())
      .then(data => {
        setReport(data.summary);
        setPayments(data.payments);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // 📄 EXPORT PDF
  const exportPDF = () => {
    window.open(`http://localhost:8000/api/reports/${id}/pdf`, "_blank");
  };

  if (loading || !report) {
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
          <h2>Détail du rapport</h2>

          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Retour
          </button>
        </div>

        {/* Infos */}
        <div className="card shadow p-4 mb-4">
          <h5>Informations</h5>
          <p><strong>Type :</strong> {report.type}</p>
          <p><strong>Période :</strong> {report.period}</p>
        </div>

        {/* Stats */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Total payé</h6>
              <h3 className="text-success">{report.totalPaid} DH</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Total non payé</h6>
              <h3 className="text-danger">{report.totalUnpaid} DH</h3>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow p-4">

          <h5>Détails des paiements</h5>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Élève</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>{p.student?.user?.name}</td>

                  <td><strong>{p.amount} DH</strong></td>

                  <td>
                    <span className={`badge ${
                      p.status === "paid" ? "bg-success" : "bg-danger"
                    }`}>
                      {p.status === "paid" ? "Payé" : "Non payé"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* EXPORT */}
        <div className="mt-4 text-end">
          <button onClick={exportPDF} className="btn btn-outline-primary">
            📄 Export PDF
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useParams, useNavigate } from "react-router-dom";

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 Exemple : rapport paiement
  const report = {
    id,
    type: "Paiements",
    period: "Avril 2026",
    totalPaid: 30000,
    totalUnpaid: 10000
  };

  const payments = [
    { student: "Ahmed Benali", amount: 1500, status: "paid" },
    { student: "Sara Ali", amount: 1500, status: "unpaid" },
    { student: "Youssef Karim", amount: 1500, status: "paid" }
  ];

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

          <h5 className="mb-3">Informations</h5>

          <p><strong>Type :</strong> {report.type}</p>
          <p><strong>Période :</strong> {report.period}</p>

        </div>

        {/* 📊 Résumé */}
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

        {/* 📋 Liste détaillée */}
        <div className="card shadow p-4">

          <h5 className="mb-3">Détails des paiements</h5>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Élève</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, i) => (
                <tr key={i}>

                  <td>{p.student}</td>

                  <td>
                    <strong>{p.amount} DH</strong>
                  </td>

                  <td>
                    <span className={`badge ${
                      p.status === "paid"
                        ? "bg-success"
                        : "bg-danger"
                    }`}>
                      {p.status === "paid" ? "Payé" : "Non payé"}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* 📄 Export */}
        <div className="mt-4 text-end">
          <button className="btn btn-outline-primary">
            📄 Export PDF
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";

export default function Reports() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH DATA
  useEffect(() => {
    fetch("http://localhost:8000/api/reports/1")
      .then(res => res.json())
      .then(data => {
        setStats({
          students: data.students,
          teachers: data.teachers,
          buses: data.buses,
          totalPaid: data.summary.totalPaid,
          totalUnpaid: data.summary.totalUnpaid
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement des rapports...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Rapports</h2>

        {/* 📊 STATS */}
        <div className="row mb-4">

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h6>Élèves</h6>
              <h3>{stats.students}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h6>Enseignants</h6>
              <h3>{stats.teachers}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h6>Bus</h6>
              <h3>{stats.buses}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h6>Paiements</h6>
              <h3>{stats.totalPaid + stats.totalUnpaid} DH</h3>
            </div>
          </div>

        </div>

        {/* 💰 Paiements */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Total payé</h6>
              <h3 className="text-success">{stats.totalPaid} DH</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Total non payé</h6>
              <h3 className="text-danger">{stats.totalUnpaid} DH</h3>
            </div>
          </div>

        </div>

        {/* 📊 Résumé */}
        <div className="card shadow p-4">

          <h5 className="mb-3">Résumé général</h5>

          <ul>
            <li>{stats.students} élèves inscrits</li>
            <li>{stats.teachers} enseignants actifs</li>
            <li>{stats.buses} bus disponibles</li>
            <li>{stats.totalPaid} DH collectés</li>
            <li>{stats.totalUnpaid} DH en attente</li>
          </ul>

        </div>

      </div>
    </DashboardLayout>
  );
}
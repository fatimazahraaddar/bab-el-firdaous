import DashboardLayout from '../../pages/Layouts/DashboardLayout';

export default function Reports() {

  const stats = {
    students: 120,
    teachers: 15,
    buses: 5,
    totalPaid: 30000,
    totalUnpaid: 10000
  };

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

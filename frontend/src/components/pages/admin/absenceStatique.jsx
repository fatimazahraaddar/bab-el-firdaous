import DashboardLayout from '../../pages/Layouts/DashboardLayout';

export default function AbsenceStatistics() {

  const stats = {
    total: 25,
    absent: 15,
    present: 5,
    late: 5
  };

  const topStudents = [
    { name: "Ahmed Benali", count: 5 },
    { name: "Sara Ali", count: 3 },
    { name: "Youssef Karim", count: 2 }
  ];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Statistiques des absences</h2>

        {/* Cards stats */}
        <div className="row mb-4">

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h5>Total</h5>
              <h3>{stats.total}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center text-danger">
              <h5>Absents</h5>
              <h3>{stats.absent}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center text-success">
              <h5>Présents</h5>
              <h3>{stats.present}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center text-warning">
              <h5>Retards</h5>
              <h3>{stats.late}</h3>
            </div>
          </div>

        </div>

        <div className="row">

          {/* Top students */}
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h5 className="mb-3">Élèves les plus absents</h5>

              <ul className="list-group">
                {topStudents.map((student, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <span>{student.name}</span>
                    <span className="badge bg-danger">{student.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Simple stats */}
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h5 className="mb-3">Répartition</h5>

              <p>Absents : {stats.absent}</p>
              <p>Présents : {stats.present}</p>
              <p>Retards : {stats.late}</p>

              <div className="progress mt-3">
                <div className="progress-bar bg-danger" style={{ width: `${(stats.absent / stats.total) * 100}%` }}></div>
                <div className="progress-bar bg-success" style={{ width: `${(stats.present / stats.total) * 100}%` }}></div>
                <div className="progress-bar bg-warning" style={{ width: `${(stats.late / stats.total) * 100}%` }}></div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

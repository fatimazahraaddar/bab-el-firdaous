import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function TeacherDashboard() {
  return (
    <DashboardLayout userRole="teacher" userName="Mr Karim">
      <div className="container-fluid">

        <h2 className="mb-4">👩‍🏫 Dashboard Professeur</h2>

        <div className="row">

          <div className="col-md-3">
            <div className="card p-3 shadow">
              <h6>Classes</h6>
              <h3>5</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow">
              <h6>Élèves</h6>
              <h3>120</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow">
              <h6>Devoirs</h6>
              <h3>8</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow">
              <h6>Messages</h6>
              <h3>12</h3>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function ChildNotes() {

  const notes = [
    { id: 1, subject: "Math", note: 16, coef: 2 },
    { id: 2, subject: "Physique", note: 14, coef: 2 },
    { id: 3, subject: "Français", note: 12, coef: 1 },
    { id: 4, subject: "Anglais", note: 17, coef: 1 }
  ];

  const average = (
    notes.reduce((acc, n) => acc + n.note * n.coef, 0) /
    notes.reduce((acc, n) => acc + n.coef, 0)
  ).toFixed(2);

  const getBadge = (note) => {
    if (note >= 16) return "bg-success";
    if (note >= 12) return "bg-warning";
    return "bg-danger";
  };

  const getAppreciation = (avg) => {
    if (avg >= 16) return "Excellent 🎉";
    if (avg >= 14) return "Très bien 👍";
    if (avg >= 12) return "Bien 🙂";
    if (avg >= 10) return "Passable ⚠️";
    return "Insuffisant ❌";
  };

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📊 Notes de l'enfant</h2>
          <p>Suivi des résultats scolaires</p>
        </div>

        {/* SUMMARY */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Moyenne générale</h6>
              <h3>{average}/20</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-3 text-center">
              <h6>Appréciation</h6>
              <h4>{getAppreciation(average)}</h4>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Matière</th>
                <th>Note</th>
                <th>Coef</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {notes.map((n) => (
                <tr key={n.id}>

                  <td>{n.subject}</td>

                  <td>{n.note}/20</td>

                  <td>{n.coef}</td>

                  <td>
                    <span className={`badge ${getBadge(n.note)}`}>
                      {n.note >= 10 ? "Validé" : "Échec"}
                    </span>
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

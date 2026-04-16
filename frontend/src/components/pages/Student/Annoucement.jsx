import DashboardLayout from "../../pages/Layouts/DashboardLayout";

export default function Announcements() {

  const announcements = [
    {
      id: 1,
      title: "Vacances scolaires",
      content: "Les vacances commencent le 25 avril.",
      date: "2026-04-10",
      important: true
    },
    {
      id: 2,
      title: "Fête de l'école",
      content: "Une fête sera organisée le 1er mai.",
      date: "2026-04-08",
      important: false
    },
    {
      id: 3,
      title: "Réunion parents",
      content: "Réunion le lundi prochain.",
      date: "2026-04-05",
      important: true
    }
  ];

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>📢 Annonces</h2>
          <p>Consultez les dernières informations de l'école</p>
        </div>

        {/* LIST */}
        <div className="row">

          {announcements.map((a) => (
            <div key={a.id} className="col-md-6 mb-3">

              <div className={`card shadow p-3 ${
                a.important ? "border-danger" : ""
              }`}>

                <div className="d-flex justify-content-between">

                  <h5>
                    {a.title}
                    {a.important && (
                      <span className="badge bg-danger ms-2">
                        📌 Important
                      </span>
                    )}
                  </h5>

                  <small className="text-muted">{a.date}</small>

                </div>

                <p className="mt-2">{a.content}</p>

                <button className="btn btn-sm btn-outline-primary">
                  Voir détails
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

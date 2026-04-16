import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function TeacherStudents() {

  const [search, setSearch] = useState("");

  const students = [
    { id: 1, name: "Ahmed Ali", class: "3A", email: "ahmed@email.com" },
    { id: 2, name: "Sara Ben", class: "3A", email: "sara@email.com" },
    { id: 3, name: "Youssef Karim", class: "3A", email: "youssef@email.com" }
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout userRole="teacher" userName="Mr Karim">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>👨‍🎓 Mes élèves</h2>
          <p>Gérer les élèves de votre classe</p>
        </div>

        {/* SEARCH */}
        <div className="card shadow p-3 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Rechercher un élève..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="card shadow p-3">

          <table className="table align-middle">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Classe</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>

                  <td>{s.name}</td>
                  <td>{s.class}</td>
                  <td>{s.email}</td>

                  <td>

                    <button className="btn btn-sm btn-outline-primary me-2">
                      👀
                    </button>

                    <button className="btn btn-sm btn-outline-success me-2">
                      📊
                    </button>

                    <button className="btn btn-sm btn-outline-warning me-2">
                      📊 Abs
                    </button>

                    <button className="btn btn-sm btn-outline-secondary">
                      💬
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

import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function ParentMessages() {

  const contacts = [
    { id: 1, name: "Mr Karim", role: "Prof Math" },
    { id: 2, name: "Mme Sara", role: "Prof Français" },
    { id: 3, name: "Administration", role: "École" }
  ];

  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>💬 Messages</h2>
          <p>Contactez les enseignants et l'administration</p>
        </div>

        {/* SEARCH */}
        <div className="card shadow p-3 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CONTACT LIST */}
        <div className="card shadow p-3">

          <ul className="list-group">

            {filteredContacts.map((c) => (
              <li
                key={c.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >

                <div>
                  <strong>{c.name}</strong>
                  <br />
                  <small className="text-muted">{c.role}</small>
                </div>

                <button className="btn btn-sm btn-primary">
                  💬 Ouvrir
                </button>

              </li>
            ))}

          </ul>

        </div>

      </div>
    </DashboardLayout>
  );
}

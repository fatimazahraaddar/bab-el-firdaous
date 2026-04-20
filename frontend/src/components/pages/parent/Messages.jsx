import DashboardLayout from "../Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ParentMessages() {

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔥 charger contacts depuis API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/contacts", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        setContacts(res.data);

      } catch (err) {
        console.error("Erreur contacts:", err.response?.data || err);
      }
    };

    fetchContacts();
  }, []);

  // 🔍 recherche
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <div>
            <h1>💬 Messages</h1>
            <p>Discutez avec l’école et les enseignants</p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="premium-card mb-3">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Rechercher un contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CONTACT LIST */}
        <div className="premium-card">

          {filteredContacts.length > 0 ? (
            filteredContacts.map((c) => (
              <div
                key={c.id}
                className="contact-row"
                onClick={() => navigate(`/parent/messages/${c.id}`)}
              >

                <div className="contact-left">
                  <div className="avatar">👤</div>

                  <div>
                    <strong>{c.name}</strong>
                    <p>{c.role || "Contact"}</p>
                  </div>
                </div>

                <div className="contact-right">
                  ➤
                </div>

              </div>
            ))
          ) : (
            <p className="text-center">Aucun contact trouvé</p>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

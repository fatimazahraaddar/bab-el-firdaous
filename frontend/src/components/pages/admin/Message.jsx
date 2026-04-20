import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState, useEffect } from "react";

export default function Messages() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [contacts, setContacts] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 LOAD CONTACTS
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      });
  }, [API_BASE]);

  // 🔄 LOAD MESSAGES
  useEffect(() => {
    if (!receiver) return;

    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/messages/${receiver.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [API_BASE, receiver]);

  // 📩 SEND MESSAGE
  const sendMessage = async () => {
    if (!newMessage.trim() || !receiver) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        receiver_id: receiver.id,
        text: newMessage
      })
    });

    const msg = await res.json();

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Messages</h2>

        <div className="row">

          {/* 💬 CHAT */}
          <div className="col-md-8">

            <div className="card shadow p-3 mb-3" style={{ height: "400px", overflowY: "auto" }}>

              {!receiver ? (
                <p className="text-muted text-center">
                  Sélectionnez un contact
                </p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="mb-3">

                    <div
                      className={`p-2 rounded ${
                        msg.is_me ? "bg-primary text-white ms-auto" : "bg-light"
                      }`}
                      style={{ maxWidth: "70%" }}
                    >

                      {msg.text}

                      <div className="text-end">
                        <small>{msg.time}</small>
                      </div>

                    </div>

                  </div>
                ))
              )}

            </div>

            {/* INPUT */}
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message..."
              />
              <button onClick={sendMessage} className="btn btn-primary">
                Envoyer
              </button>
            </div>

          </div>

          {/* 👥 CONTACTS */}
          <div className="col-md-4">

            <div className="card shadow p-3">

              <h5>Contacts</h5>

              <ul className="list-group">

                {contacts.map((c) => (
                  <li
                    key={c.id}
                    className={`list-group-item ${receiver?.id === c.id ? "active" : ""}`}
                    onClick={() => setReceiver(c)}
                    style={{ cursor: "pointer" }}
                  >
                    {c.name}
                  </li>
                ))}

              </ul>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

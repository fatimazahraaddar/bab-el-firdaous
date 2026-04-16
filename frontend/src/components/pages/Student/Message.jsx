import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function Messages() {

  const contacts = [
    { id: 1, name: "Admin", role: "Administration" },
    { id: 2, name: "Mr Karim", role: "Professeur" }
  ];

  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  const [messages, setMessages] = useState([
    { sender: "me", text: "Bonjour", time: "10:00" },
    { sender: "other", text: "Bonjour, comment ça va ?", time: "10:01" }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "me",
        text: newMessage,
        time: new Date().toLocaleTimeString()
      }
    ]);

    setNewMessage("");
  };

  return (
    <DashboardLayout userRole="student" userName="Student User">
      <div className="container-fluid">

        <div className="row">

          {/* CONTACTS */}
          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>💬 Contacts</h5>

              <ul className="list-group mt-3">
                {contacts.map((c) => (
                  <li
                    key={c.id}
                    className={`list-group-item ${selectedContact.id === c.id ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedContact(c)}
                  >
                    <strong>{c.name}</strong>
                    <br />
                    <small>{c.role}</small>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {/* CHAT */}
          <div className="col-md-8">
            <div className="card shadow d-flex flex-column" style={{ height: "75vh" }}>

              {/* HEADER */}
              <div className="p-3 border-bottom">
                <h6>{selectedContact.name}</h6>
                <small>{selectedContact.role}</small>
              </div>

              {/* MESSAGES */}
              <div className="p-3 flex-grow-1 overflow-auto">

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`d-flex mb-2 ${
                      msg.sender === "me" ? "justify-content-end" : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded ${
                        msg.sender === "me"
                          ? "bg-primary text-white"
                          : "bg-light"
                      }`}
                      style={{ maxWidth: "60%" }}
                    >
                      {msg.text}
                      <div style={{ fontSize: "10px" }}>{msg.time}</div>
                    </div>
                  </div>
                ))}

              </div>

              {/* INPUT */}
              <div className="p-3 border-top d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Écrire un message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />

                <button className="btn btn-primary" onClick={sendMessage}>
                  Envoyer
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

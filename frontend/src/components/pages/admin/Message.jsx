import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";

export default function Messages() {

  // 📇 Contacts (Parent / Student / Teacher)
  const contacts = [
    { id: "p1", name: "Parent Ahmed", type: "parent" },
    { id: "s1", name: "Ahmed (élève)", type: "student" },
    { id: "t1", name: "Mr Ahmed (prof)", type: "teacher" }
  ];

  const [receiver, setReceiver] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Admin",
      receiver: "p1",
      text: "Bonjour, merci de payer ce mois.",
      time: "10:00"
    }
  ]);

  // 📩 envoyer message
  const sendMessage = () => {
    if (!newMessage.trim() || !receiver) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "Admin",
        receiver,
        text: newMessage,
        time: new Date().toLocaleTimeString()
      }
    ]);

    setNewMessage("");
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Messages</h2>

        <div className="row">

          {/* 💬 CHAT */}
          <div className="col-md-8">

            <div
              className="card shadow p-3 mb-3"
              style={{ height: "400px", overflowY: "auto" }}
            >

              {receiver === "" ? (
                <p className="text-muted text-center">
                  Sélectionnez un contact pour commencer
                </p>
              ) : (
                messages
                  .filter(m => m.receiver === receiver)
                  .map((msg) => (
                    <div key={msg.id} className="mb-3">

                      <div
                        className={`p-2 rounded ${
                          msg.sender === "Admin"
                            ? "bg-primary text-white ms-auto"
                            : "bg-light"
                        }`}
                        style={{ maxWidth: "70%" }}
                      >

                        <strong>{msg.sender}</strong><br />
                        {msg.text}

                        <div className="text-end">
                          <small>{msg.time}</small>
                        </div>

                      </div>

                    </div>
                  ))
              )}

            </div>

            {/* ✉️ INPUT */}
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Écrire un message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
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
                    className={`list-group-item ${
                      receiver === c.id ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setReceiver(c.id)}
                  >
                    {c.type === "parent" && "👨‍👩‍👧"}
                    {c.type === "student" && "👨‍🎓"}
                    {c.type === "teacher" && "👩‍🏫"}{" "}
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

import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useRef, useEffect } from "react";

export default function ParentMessageConversation() {

  const contact = {
    name: "Mr Karim",
    role: "Prof Math"
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      type: "text",
      text: "Bonjour, votre enfant doit faire ses devoirs.",
      time: "10:00"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);

  // 📩 envoyer message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "me",
        type: "text",
        text: newMessage,
        time: new Date().toLocaleTimeString()
      }
    ]);

    setNewMessage("");
  };

  // 📎 envoyer fichier
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "me",
        type: "file",
        file: file.name,
        time: new Date().toLocaleTimeString()
      }
    ]);
  };

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <DashboardLayout userRole="parent" userName="Parent User">
      <div className="container-fluid">

        <div className="card shadow d-flex flex-column" style={{ height: "80vh" }}>

          {/* HEADER */}
          <div className="p-3 border-bottom d-flex align-items-center">
            <div className="me-2">👤</div>
            <div>
              <strong>{contact.name}</strong>
              <br />
              <small className="text-muted">{contact.role}</small>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="p-3 flex-grow-1 overflow-auto">

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`d-flex mb-2 ${
                  msg.sender === "me"
                    ? "justify-content-end"
                    : "justify-content-start"
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

                  {/* TEXT */}
                  {msg.type === "text" && msg.text}

                  {/* FILE */}
                  {msg.type === "file" && (
                    <div>📎 {msg.file}</div>
                  )}

                  <div style={{ fontSize: "10px" }}>
                    {msg.time}
                  </div>

                </div>
              </div>
            ))}

            <div ref={bottomRef}></div>

          </div>

          {/* INPUT */}
          <div className="p-3 border-top d-flex align-items-center">

            {/* 📎 fichier */}
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => fileInputRef.current.click()}
            >
              📎
            </button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFile}
            />

            {/* 💬 message */}
            <input
              type="text"
              className="form-control me-2"
              placeholder="Écrire un message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            {/* ➤ envoyer */}
            <button className="btn btn-primary" onClick={sendMessage}>
              ➤
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

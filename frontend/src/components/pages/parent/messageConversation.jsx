import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ParentMessageConversation() {
  const { id } = useParams();

  const contact = {
    name: "Mr Karim",
    role: "Prof Math"
  };

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);

  // 🔥 LOAD MESSAGES (API)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:8000/api/messages/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        setMessages(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [id]);

  // 📩 envoyer message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      receiver_id: Number(id),
      text: newMessage
    };

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/api/messages", messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      setMessages((prev) => [...prev, { id: Date.now(), is_me: true, text: newMessage, full_time: new Date().toISOString() }]);

      setNewMessage("");

    } catch (err) {
      console.error(err);
    }
  };

  // 📎 fichier
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "me",
        file: file.name,
        type: "file",
        created_at: new Date()
      }
    ]);
  };

  // 🔄 scroll auto
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <DashboardLayout userRole="parent" userName="Parent User">

      <div className="chat-container">

        {/* HEADER */}
        <div className="chat-header">
          <div className="chat-user">
            <div className="avatar">👨‍🏫</div>
            <div>
              <strong>{contact.name}</strong>
              <p>{contact.role}</p>
            </div>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="chat-body">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${
                msg.is_me ? "me" : "other"
              }`}
            >
              <div className="bubble">

                {msg.text && <p>{msg.text}</p>}

                {msg.file && <p>📎 {msg.file}</p>}

                <span className="time">
                  {new Date(msg.full_time || msg.created_at || "").toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>

              </div>
            </div>
          ))}

          <div ref={bottomRef}></div>

        </div>

        {/* INPUT */}
        <div className="chat-input">

          <button
            className="file-btn"
            onClick={() => fileInputRef.current.click()}
          >
            📎
          </button>

          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleFile}
          />

          <input
            type="text"
            placeholder="Écrire un message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button className="send-btn" onClick={sendMessage}>
            ➤
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

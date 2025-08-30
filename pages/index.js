// pages/index.js
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askAI = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setMessages([...messages, { role: "user", text: question }, { role: "ai", text: data.answer }]);
    setQuestion("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>AI Tutor Chat</h1>
      <div style={{ border: "1px solid #ccc", padding: "1rem", height: "300px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <p key={i} style={{ textAlign: m.role === "user" ? "right" : "left" }}>
            <strong>{m.role === "user" ? "Jij" : "AI"}:</strong> {m.text}
          </p>
        ))}
      </div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Stel een vraag..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={askAI} style={{ padding: "0.5rem 1rem" }}>Verstuur</button>
      </div>
    </div>
  );
}

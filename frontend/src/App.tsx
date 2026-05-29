import { useState } from "react";

interface Ticket {
  id: string;
  customer_name: string;
  issue: string;
  status: string;
  response: string;
  created_at: string;
}

function App() {
  const [name, setName] = useState("");
  const [issue, setIssue] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);

  const submitTicket = async () => {
    if (!name || !issue) return;
    setLoading(true);
    setTicket(null);

    const response = await fetch("http://localhost:8000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer_name: name, issue }),
    });

    const data = await response.json();
    setTicket(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "60px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1>AI Customer Support for E-Commerce</h1>
      <p style={{ color: "#666" }}>Describe your issue and our AI agent will help you instantly.</p>

      <div style={{ marginBottom: "16px" }}>
        <label>Your Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
          style={{ display: "block", width: "100%", padding: "10px", marginTop: "6px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>Describe your issue</label>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="e.g. Where is my order? I placed it 3 days ago."
          rows={4}
          style={{ display: "block", width: "100%", padding: "10px", marginTop: "6px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        />
      </div>

      <button
        onClick={submitTicket}
        disabled={loading}
        style={{ backgroundColor: "#2563eb", color: "white", padding: "12px 24px", fontSize: "16px", border: "none", borderRadius: "6px", cursor: "pointer" }}
      >
        {loading ? "Processing..." : "Submit Ticket"}
      </button>

      {ticket && (
        <div style={{ marginTop: "32px", padding: "20px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: ticket.status === "escalated" ? "#fff7ed" : "#f0fdf4" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <strong>Ticket #{ticket.id.slice(0, 8)}</strong>
            <span style={{
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "14px",
              backgroundColor: ticket.status === "escalated" ? "#fed7aa" : "#bbf7d0",
              color: ticket.status === "escalated" ? "#9a3412" : "#166534"
            }}>
              {ticket.status === "escalated" ? "⚠️ Escalated to human" : "✅ Resolved"}
            </span>
          </div>
          <p style={{ color: "#374151" }}>{ticket.response.replace("ESCALATE: ", "")}</p>
          <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "12px" }}>Submitted at {ticket.created_at}</p>
        </div>
      )}
    </div>
  );
}

export default App;
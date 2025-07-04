import React, { useState } from "react";
import { raiseTicket } from "../api";

export default function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("All fields required");

    const defaultRaiserId = "6867a08a31844ca96a3defb4";

    setLoading(true);
    await raiseTicket({ title, description, raisedBy: defaultRaiserId });
    setLoading(false);

    setTitle("");
    setDescription("");
    onTicketCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
  );
}

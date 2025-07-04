import React, { useEffect, useState } from "react";
import { fetchTickets } from "./api";
import TicketForm from "./component/TicketForm";
import TicketList from "./component/TicketList";

export default function App() {
  const [tickets, setTickets] = useState([]);

  const loadTickets = async () => {
    const res = await fetchTickets();
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Raise New Ticket</h1>
      <TicketForm onTicketCreated={loadTickets} />
      <hr className="my-6" />
      <TicketList tickets={tickets} refreshTickets={loadTickets} />
    </div>
  );
}

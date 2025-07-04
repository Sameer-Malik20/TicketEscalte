import React, { useEffect } from "react";
import { pickTicket, replyTicket } from "../api";

export default function TicketList({ tickets, refreshTickets }) {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshTickets();
    }, 5000);
    return () => clearInterval(interval);
  }, [refreshTickets]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-center">All Tickets</h2>
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6"
        >
          <div className="bg-blue-900 text-white text-center py-4">
            <h1 className="text-2xl font-semibold">{ticket.title}</h1>
            <p className="text-sm">Support Ticket</p>
          </div>

          <div className="p-6">
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <div>
                <p className="font-semibold">Assigned To:</p>
                <p>{ticket.assignedToLevel}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p>{ticket.status}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              <p className="font-semibold">Description:</p>
              <p>{ticket.description}</p>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <div>
                <p className="font-semibold">Ticket ID:</p>
                <p>{ticket._id.slice(-6)}</p>
              </div>
              <div>
                <p className="font-semibold">Picked:</p>
                <p>{ticket.isPicked ? "Yes" : "No"}</p>
              </div>
            </div>

            {!ticket.isPicked && ticket.assignedToLevel !== "L3" && (
              <div className="mt-4 text-center">
                <p className="text-red-600 font-semibold mb-2">Unpicked</p>
                <button
                  onClick={() => {
                    pickTicket(ticket._id).then(refreshTickets);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Pick Ticket
                </button>
              </div>
            )}

            {ticket.isPicked && (
              <p className="text-green-700 font-semibold text-center mt-4">
                Picked
              </p>
            )}

            <div className="mt-4">
              <input
                type="text"
                placeholder="Reply message"
                className="p-2 border w-full rounded"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const userId = prompt("Enter your userId (L1/L2/L3)");
                    replyTicket(ticket._id, e.target.value, userId).then(
                      refreshTickets
                    );
                    e.target.value = "";
                  }
                }}
              />
            </div>

            {ticket.replies?.length > 0 && (
              <div className="mt-3 text-sm text-gray-700">
                <strong>Replies:</strong>
                <ul className="list-disc ml-5">
                  {ticket.replies.map((r, i) => (
                    <li key={i}>{r.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-blue-900 text-white text-center py-2">
            <p className="text-sm">Ticket System Portal</p>
          </div>
        </div>
      ))}
    </div>
  );
}

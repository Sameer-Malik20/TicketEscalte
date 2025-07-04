import axios from "axios";

export const API_BASE = "http://localhost:5000/api";

export const fetchTickets = () => axios.get(`${API_BASE}/tickets/all`);
export const fetchUsers = () => axios.get(`${API_BASE}/users`);
export const raiseTicket = (data) => axios.post(`${API_BASE}/tickets`, data);
export const pickTicket = (id) => axios.post(`${API_BASE}/tickets/${id}/pick`);
export const replyTicket = (id, message, userId) =>
  axios.post(`${API_BASE}/tickets/${id}/reply`, { message, userId });

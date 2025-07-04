import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import sendMail from "./sendMail.js";

const createTicket = async (req, res) => {
  try {
    const l1User = await User.findOne({ role: "L1" });
    if (!l1User) return res.status(404).json({ message: "L1 user not found." });

    const ticket = new Ticket({
      title: req.body.title,
      description: req.body.description,
      raisedBy: req.body.raisedBy,
      assignedTo: l1User._id,
      assignedToLevel: "L1",
    });

    await ticket.save();

    await sendMail(
      l1User.email,
      "New Ticket Assigned",
      `Ticket '${ticket.title}' has been assigned to you. Please pick it within 2 minutes.`
    );

    res.status(201).json(ticket);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating ticket", error: err.message });
  }
};

const pickTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.isPicked = true;
    ticket.status = "in_progress";
    ticket.pickedAt = new Date();
    ticket.updatedAt = new Date();

    await ticket.save();

    res.json({ message: "Ticket picked.", ticket });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error picking ticket", error: err.message });
  }
};

const replyTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.replies.push({
      user: req.body.userId,
      message: req.body.message,
    });

    ticket.updatedAt = new Date();
    await ticket.save();

    res.json({ message: "Reply added.", ticket });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error replying to ticket", error: err.message });
  }
};

const AllTickets = async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
};

export { createTicket, pickTicket, replyTicket, AllTickets };

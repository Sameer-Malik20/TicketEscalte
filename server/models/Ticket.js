import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedToLevel: { type: String, enum: ["L1", "L2", "L3"] },
  status: {
    type: String,
    enum: ["open", "in_progress", "resolved", "closed"],
    default: "open",
  },
  isPicked: { type: Boolean, default: false },
  pickedAt: Date,
  replies: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      repliedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;

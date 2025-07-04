import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import sendMail from "./sendMail.js";

async function runEscalation() {
  const now = new Date();
  const tickets = await Ticket.find({ status: "open", isPicked: false });

  for (let ticket of tickets) {
    let minutesPassed = 0;

    if (ticket.assignedToLevel === "L1") {
      minutesPassed = (now - ticket.createdAt) / (1000 * 60);

      // Escalate L1 -> L2
      if (minutesPassed >= 1) {
        const l2 = await User.findOne({ role: "L2" });
        const l1 = await User.findOne({ _id: ticket.assignedTo });

        ticket.assignedTo = l2._id;
        ticket.assignedToLevel = "L2";
        ticket.updatedAt = now;
        await ticket.save();

        await sendMail(
          l2.email,
          "Ticket Escalated to L2",
          `Ticket '${ticket.title}' has been escalated from L1. Please take action.`
        );

        await sendMail(
          l1.email,
          "You Missed a Ticket!",
          `Ticket '${ticket.title}' was not picked in time and has been escalated to L2.`
        );
      }
    } else if (ticket.assignedToLevel === "L2") {
      minutesPassed = (now - ticket.updatedAt) / (1000 * 60);

      // Escalate L2 -> L3
      if (minutesPassed >= 1) {
        const l3 = await User.findOne({ role: "L3" });
        const l2 = await User.findOne({ _id: ticket.assignedTo });
        const l1 = await User.findOne({ role: "L1" });

        ticket.assignedTo = l3._id;
        ticket.assignedToLevel = "L3";
        ticket.updatedAt = now;
        await ticket.save();

        const l3Body = `
Title: ${ticket.title}
Description: ${ticket.description}

Ticket has already passed through:
- L1 (${l1?.email}) → did not pick
- L2 (${l2?.email}) → did not pick

This ticket is now assigned to you (L3).
You have **no time limit**, but please respond as soon as possible.

Thank you.
`;

        await sendMail(
          l3.email,
          `Final Escalation: Ticket Assigned to You (L3)  ${ticket.title}`,
          l3Body
        );

        await sendMail(
          l2.email,
          "You Missed a Ticket!",
          `Ticket '${ticket.title}' was not picked in time and has been escalated to L3.`
        );
      }
    }
  }
}

export default runEscalation;

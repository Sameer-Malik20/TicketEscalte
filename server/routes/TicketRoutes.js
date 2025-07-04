import express from "express";
import {
  AllTickets,
  createTicket,
  pickTicket,
  replyTicket,
} from "../controller/Tickets.js";

const router = express.Router();

router.post("/", createTicket);
router.post("/:id/pick", pickTicket);
router.post("/:id/reply", replyTicket);
router.get("/all", AllTickets);

export default router;

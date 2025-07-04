import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Pass,
  },
});

async function sendMail(to, subject, text) {
  await transporter.sendMail({
    from: process.env.Email,
    to,
    subject,
    text,
  });
}

export default sendMail;

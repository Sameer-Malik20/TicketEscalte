# 🛠 Ticket Escalation System

A full-stack MERN application to raise, track, and escalate support tickets between L1, L2, and L3 levels with automatic escalation and email notifications.

---

## 📌 Features

- 👨‍💻 Raise support tickets with title and description
- ⚙️ Automatically assign tickets to L1
- ⏱ Escalation:
  - L1 must pick within **1 minute**
  - If not, it auto-escalates to L2 with email to L2 and L1
  - L2 must pick within **1 minute**, else goes to L3
  - L3 has **unlimited time** but gets final alert mail
- 📩 Email notifications using Nodemailer
- 🖥 Real-time UI refresh (every 5 sec)
- ✅ Pick, reply, and delete ticket options
- 🎨 Clean responsive UI using Tailwind CSS

---

## 🔧 Tech Stack

| Layer     | Tech Used                     |
|-----------|-------------------------------|
| Frontend  | React, Tailwind CSS           |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB (Mongoose)            |
| Mailer    | Nodemailer (Gmail + App Pass) |
| Scheduler | Node-cron                     |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ticket-escalation-system.git
cd ticket-escalation-system


cd backend
npm install
 Create .env file
env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/ticketsystem
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
▶ Start backend
bash
Copy
Edit
npm start
3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
📦 API Endpoints
Method	Route	Description
POST	/api/tickets	Raise new ticket
GET	/api/tickets	Get all tickets
PUT	/api/tickets/:id/pick	Pick a ticket
PUT	/api/tickets/:id/reply	Reply to a ticket



 Future Improvements
Role-based login

Admin dashboard

Toast notifications

Search & filter tickets

PDF export

👨‍💻 Developer
Made with  by Sameer Malik

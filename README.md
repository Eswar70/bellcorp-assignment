🚀 Bellcorp Event Management Application

A full-stack MERN Event Management Platform built for Bellcorp.

This platform allows users to discover, register, manage, and track events efficiently with a scalable architecture and modern UI.

🌐 Live Demo

Frontend (Vercel/Netlify): Add your deployed link here

Backend (Render/Railway): Add your deployed link here

📌 Project Overview

The Bellcorp Event Management Application provides:

User authentication (JWT-based)

Event browsing & discovery

Dynamic search & filters

Event registration & cancellation

Capacity control & duplicate prevention

User dashboard with stats

Dark mode toggle

Fully responsive UI

Built with scalability, security, and clean architecture in mind.

🛠 Tech Stack
Frontend

React.js (Functional Components + Hooks)

Context API (Global State)

Bootstrap 5

Framer Motion (Animations)

React Hot Toast (Notifications)

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

bcryptjs (Password hashing)

Deployment

Frontend → Vercel / Netlify

Backend → Render / Railway

Testing → Postman

🔐 Features
1️⃣ Authentication

User Registration

User Login

JWT Token Authentication

Protected Routes

Secure password hashing with bcrypt

Error handling with toast notifications

2️⃣ Event Discovery Experience

Browse events

Search by:

Event Title

Location

Filter by:

Category

Date Range (From → To)

Search suggestions

Clear filters button

Dynamic data fetching

Skeleton loading animations

Responsive grid layout

3️⃣ Event Management

Users can:

View event details

Register for events

Cancel registration

Prevent duplicate registrations

Respect event capacity limits

Event fields include:

Name

Organizer

Location

Date & Time

Description

Category

Capacity

Image

Created By (Owner)

4️⃣ User Dashboard

View Upcoming Events

View Past Events

Cancel registration directly

Sort by:

Newest

Oldest

Compact Stats Summary:

Total Registered

Upcoming Count

Responsive grid layout

Dark mode support

🎨 UI/UX Highlights

Fully responsive (Mobile / Tablet / Desktop)

Compact stats header

Profile icon

Clean card layout

Background hero section

Beautiful full-page background image

Dark / Light theme toggle

Framer Motion animations

Skeleton shimmer loaders

Inspired by:

Eventbrite

Stripe Dashboard

Modern SaaS UI patterns

🏗 Project Structure
bellcorp-project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seed.js
│   ├── server.js
│   └── .env
│
├── bellcorp-events-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/bellcorp-events.git
cd bellcorp-events

2️⃣ Backend Setup
cd backend
npm install


Create .env file inside backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key


Run backend:

npm run dev

3️⃣ Seed Sample Data (Optional)
node seed.js

4️⃣ Frontend Setup
cd ../bellcorp-events-frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🔎 API Endpoints
Auth Routes
POST   /api/auth/register
POST   /api/auth/login

Event Routes
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id

Registration Routes
POST   /api/registrations/:eventId
DELETE /api/registrations/:eventId
GET    /api/registrations/user

🔐 Security Measures

JWT-based authentication

Password hashing (bcryptjs)

Protected routes middleware

Duplicate registration prevention

Capacity validation

Environment variables secured

.gitignore protecting sensitive keys

🚀 Deployment Steps
Backend (Render)

Push backend folder to GitHub

Create new Web Service in Render

Add environment variables

Set build command:

npm install


Start command:

node server.js

Frontend (Vercel)

Import frontend project

Set environment variable:

REACT_APP_API_URL=your_backend_url


Deploy

📈 Future Improvements
Pagination
Event image upload (Cloudinary)
User profile page
Admin panel
Email notifications
Event analytics dashboard
Role-based access control

🎥 Demo Submission Checklist
✔ Hosted frontend link
✔ Hosted backend link
✔ GitHub repository
✔ DB schema walkthrough
✔ Video demonstration

👨‍💻 Author
Developed for Bellcorp Assignment
Full Stack MERN Implementation

📄 License
This project is built for assessment and demonstration purposes.

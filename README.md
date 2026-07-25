# LeadDesk Mini

A production-quality full-stack lead management system with a public landing page and an admin dashboard. Built for Digital Heroes Training Task.

## Features

- **Public Landing Page**: Modern SaaS design with a hero section, services, testimonials, and a lead capture form.
- **Admin Dashboard**: Secure dashboard to view, search, filter, update, and delete leads.
- **Authentication**: JWT-based secure authentication for the admin area.
- **Charts and Analytics**: Visual representation of lead statuses.
- **CSV Export**: Export lead data to a CSV file.
- **Dark Mode**: Fully functional dark and light theme support.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Recharts, React Hot Toast, Axios
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcrypt

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas cluster (or local MongoDB server)

### 1. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (you can use `.env.example` as a template):
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leaddesk?retryWrites=true&w=majority
   PORT=5000
   JWT_SECRET=your_super_secret_key
   ADMIN_EMAIL=admin@leaddesk.com
   ADMIN_PASSWORD=admin123
   ```
4. Start the server:
   ```bash
   npm run dev
   # or
   node server.js
   ```

### 2. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Frontend (Vercel)
- Push the code to a Git repository.
- Import the project into Vercel.
- Set the Root Directory to `frontend`.
- Add the `VITE_API_URL` environment variable pointing to your deployed backend.

### Backend (Render)
- Push the code to a Git repository.
- Create a new Web Service on Render.
- Set the Root Directory to `backend`.
- Use `npm install` as the Build Command and `node server.js` as the Start Command.
- Add your environment variables (`MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).

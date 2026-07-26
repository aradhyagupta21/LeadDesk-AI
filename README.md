# LeadDesk Mini

**Live Demo:** [https://leaddesk-app-rr4e.onrender.com](https://leaddesk-app-rr4e.onrender.com)

LeadDesk Mini is a full-stack lead management application that allows businesses to collect customer enquiries through a landing page and manage them through a secure admin dashboard.

The application includes authentication, lead tracking, status management, and a responsive user interface.

## Tech Stack

- React.js
- Tailwind CSS
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- bcrypt

## Data Model

### Lead

Each customer enquiry is stored as a Lead.

Fields:

- `name` (String): The customer's full name.
- `email` (String): The customer's email address.
- `phone` (String): The customer's phone number.
- `requirements` (Array of Strings): Checkbox selections (e.g., AI Chatbots, Web Development).
- `budget` (String): The customer's estimated budget.
- `message` (String): Detailed project enquiry text.
- `status` (String): Current progress (New, Contacted, Closed).
- `notes` (String): Private admin notes for internal tracking.
- `createdAt` (Date): Timestamp of when the lead was generated.
- `updatedAt` (Date): Timestamp of the last modification.

### Admin

Stores administrator credentials.

Fields:

- `name` (String): Admin's full name.
- `email` (String): Admin's unique login email.
- `password` (String): Securely hashed using bcrypt.
- `createdAt` (Date): Timestamp of account creation.

## Authentication

- Admin credentials are stored securely in MongoDB.
- Passwords are hashed using bcrypt before storage.
- During login, the entered password is compared with the hashed password.
- On successful login, the server generates a JWT token.
- The frontend stores the JWT in `localStorage`.
- Protected routes verify the JWT before allowing access to the dashboard.
- Logout removes the token and redirects the user to the login page.
- Security middlewares (Helmet, Rate Limiting, HPP) ensure the API is protected from brute-force and injection attacks.

## API Endpoints

### Auth
- `POST /api/auth/register` - Create a new admin account
- `POST /api/auth/login` - Authenticate admin and receive JWT
- `GET /api/auth/me` - Fetch currently logged-in admin data
- `PUT /api/auth/profile` - Update admin profile/password

### Leads
- `POST /api/leads` - Create a new lead from the landing page
- `GET /api/leads` - Fetch all leads (Protected)
- `PATCH /api/leads/:id` - Update lead status or notes (Protected)
- `DELETE /api/leads/:id` - Delete a lead (Protected)

## Installation

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd backend
npm install
```
Create a `.env` file in the backend folder and add:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_super_secret_key
```
Start the server:
```bash
node server.js
# or
npm run dev
```

### 2. Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
npm install
```
Start the frontend:
```bash
npm run dev
```

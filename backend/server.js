const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security Middleware Setup

// 1. Set security headers
app.use(helmet());

// 2. Prevent Cross-Site Request Forgery & Enable CORS
app.use(cors());

// 3. Rate limiting (100 requests per 10 mins per IP)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again in 10 minutes.'
});
app.use('/api/', limiter);

// 4. Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 6. Prevent HTTP Parameter Pollution
app.use(hpp());

// Routes
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

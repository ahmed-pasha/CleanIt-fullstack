const express = require('express');
const cors = require('cors');
const dotenv = require('./config/dotenv.config');
const connectDB = require('./config/db');
const { errorHandler } = require('./utils/errorHandler');

// Routes
const authRoutes = require('./routes/authRoutes');
const gigRoutes = require('./routes/gigRoutes');
const groupRoutes = require('./routes/groupRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Database Connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/payments', paymentRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;


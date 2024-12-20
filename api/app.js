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


const corsOptions = {
  origin: '*', // The allowed origin(s)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allows cookies to be sent with requests
};

// Middleware
app.use(cors());


app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/payments', paymentRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;


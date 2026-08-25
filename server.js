const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const seedDatabase = require('./seed');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    project: 'Airline Ticket Booking System API',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      flights: '/api/flights',
      bookings: '/api/bookings',
      payments: '/api/payments'
    }
  });
});

app.get('/api/seed', async (req, res) => {
  try {
    await seedDatabase(false);
    res.json({ success: true, message: 'Database successfully seeded with sample flights & demo user!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SkyWings Airlines Backend API running on port ${PORT}`);
});

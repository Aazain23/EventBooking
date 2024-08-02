import express from 'express';
import connectDB from './config/database';
import eventRoutes from './routes/eventRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public folder

// Connect to the database
connectDB();

// Routes
app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);

export default app;


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js'; 
import connectDB from './utils/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
connectDB();

// Routes
app.use('/api', taskRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

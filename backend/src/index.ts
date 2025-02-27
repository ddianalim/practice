import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai';
import spreadsheetRoutes from './routes/spreadsheet';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/spreadsheet', spreadsheetRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', {
      message: err.message,
      code: err.code,
      details: err.toString(),
      envVar: process.env.MONGODB_URI ? 'URI exists' : 'URI missing'
    });
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
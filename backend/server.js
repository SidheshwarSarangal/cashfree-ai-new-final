import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpEmailRoutes.js';
import subscriptionRoutes  from './routes/subscriptionRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';


//import { GoogleGenerativeAI } from "@google/generative-ai";

//import OpenAI from 'openai/index.mjs';


// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));


// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/otp', otpRoutes);

app.use("/api/subscription", subscriptionRoutes);

app.use('/api/ai/', aiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
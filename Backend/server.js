import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './Configs/Mongodb.js';
import { clerkWebhooks } from './Controllers/Webhooks.js';


// Initialize express app
const app = express();

// connect to MongoDB
await connectDB();

// middleware
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('API Working'));
app.post('/clerk', express.json(), clerkWebhooks)

// port 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import { createServer } from 'http'; 

dotenv.config();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const server = createServer(app);
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.error('MongoDB connection error:', error.message));

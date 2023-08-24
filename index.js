import dotenv from 'dotenv';
import mongoose from "mongoose";
import app from './app.js';

dotenv.config();

const PORT = process.env || 5000;
const CONNECTION_URL = "mongodb+srv://mominalipubg:dash123@narrativenestcluster.gsey63b.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.error("MongoDB connection error:", error.message));

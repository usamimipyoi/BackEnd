import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user_route.js';
import authRoute from './routes/auth_route.js';
import recordRoute from './routes/record_route.js';
import Record from './models/record_model.js';
import getUserRecord from './routes/get_UserRecord_route.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

// Initialize Express
const app = express();
app.use(express.json());


app.get('/record', (req, res) => {
    Record.find()
    .then(Records => res.json(Records))
    .catch((err) => res.json(err));
})


// Routes
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Use Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/record", recordRoute);
app.use("/api/record_by", getUserRecord);

// Handle Error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

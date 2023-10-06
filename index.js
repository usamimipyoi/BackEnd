import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user_route.js';
import authRouter from './routes/auth_route.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {})
    .then(() => {
        console.log(`Connected to MongoDB Database.`);
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
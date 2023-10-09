import User from '../models/user_model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import errorHandler from '../utils/error.js';

const userRegister = async (req, res, next) => {
    try {
        const { userFullName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userFullName,
            email,
            password: hashedPassword,
        });
        const result = await user.save();
        return res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export default userRegister;
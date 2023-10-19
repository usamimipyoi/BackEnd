import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const { firstname, lastname, email, gender, weight, height, password } = req.body;
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    const newUser = new User({
      firstname,
      lastname,
      email,
      gender,
      weight,
      height,
      password: hashedPassword,
    });
  
    try {
      await newUser.save();
      res.status(201).json("User created successfully.");

    } catch (error) {
      next(error);

    }
  };

// Sign in a user
export const signIn = async(req, res, next) => {
    // Get the email and password from the request body
    const { email, password } = req.body;
    
    try {
        // Find the user
        const validUser = await User.findOne({ email });
        
        // If the user is not found, return an error
        if (!validUser) { return next(errorHandler(404, "Email not found")); }
        
        // If the user is found, compare the password
        const validPassword = bcrypt.compareSync(password, validUser.password);
        // If the password is invalid, return an error
        if (!validPassword) { return next(errorHandler(401, "Invalid Password")); }
        // If the password is valid, create a token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        //  Remove the password from the user object
        const { password: userPassword, ...others } = validUser._doc;

        // Return the user and the token
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(others);
        
    } catch (error) {
        next(error);
        
    }
}

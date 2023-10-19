import mongoose from "mongoose";

// Create a schema for the user
const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
}, {
    // Automatically create createdAt and updatedAt fields
     timestamps: true
})

// Create a model for the user
const User = mongoose.model('User', userSchema, 'Users');

export default User;
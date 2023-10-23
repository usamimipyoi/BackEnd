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
    avatar: {
      type: String,
      required: false,
      default: "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png"
    }
}, {
    // Automatically create createdAt and updatedAt fields
     timestamps: true
})

// Create a model for the user
const User = mongoose.model('User', userSchema, 'Users');

export default User;
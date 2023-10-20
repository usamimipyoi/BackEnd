import mongoose from "mongoose";

// Create a schema for the user
const recordSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    activity: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    distance: {
      type: Number,
    },
    note: {
      type: String,
    },
    image: {
      type: String,
    },
}, {
    // Automatically create createdAt and updatedAt fields
     timestamps: true
})

// Create a model for the record
const Record = mongoose.model('Record', recordSchema, 'Records');

export default Record;
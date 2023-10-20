import Record from "../models/record_model.js";
import errorHandler from "../utils/error.js";

const addRecord = async (req, res, next) => {
    const {
        email,
        activity,
        date,
        minute,
        location,
        distance,
        note,
        image} = req.body;

    const newRecord = new Record({
        email,
        activity,
        date,
        minute,
        location,
        distance,
        note,
        image
    }) 

    console.log(newRecord)
    try {
        await newRecord.save();
        res.status(201).json("Activity created successfully.");
    }   catch (error) {
        next(error);
    }
};

export default addRecord;

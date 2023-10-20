import Activity from "../models/activity.js";
import errorHandler from "../utils/error.js";

export const newActivity = async (req, res, next) => {
    const {act_id,
        activity,
        date,
        time,
        hour,
        minute,
        location,
        distance,
        note,
        image} = req.body;

    const newAct = new Activity({
        act_id,
        activity,
        date,
        time,
        hour,
        minute,
        location,
        distance,
        note,
        image
    })

    try {
        await newAct.save();
        res.status(201).json("Activity created successfully.");
    }   catch (error) {
        next(error);
    }
};
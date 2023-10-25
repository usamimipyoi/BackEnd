import errorHandler from "../utils/error.js";
import Record from "../models/record_model.js";

export const getUserRecord = async (req, res) => {
    const email = req.query.email;
    
    try {
        const userRecord = await Record.find({email: email});
        if (!userRecord) {
            res.status(404).json({
                message: "Record not found."
            });
        }
        res.status(200).json(userRecord);

    } catch (err) {
        next(err);
    }
};

export const deleteUserRecord = async (req, res, next) => {
    const recordId = req.body._id;

    try {
        const result = await Record.deleteOne({ _id: recordId });
        if (result.deletedCount > 0) {

            res.status(200).json({ success: true, message: "Record deleted successfully" });
            
        } else {
            
            console.log("Record not found.");
            res.status(404).json({ success: false, message: "Record not found" });
        }

    } catch (err) {
        next(err);
    }
};
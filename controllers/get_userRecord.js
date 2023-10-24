import errorHandler from "../utils/error.js";
import Record from "../models/record_model.js";

const getUserRecord = async (req, res) => {
    const email = req.query.email;
    console.log(email)
    
    try {
        const userRecord = await Record.find({email: email});
        if (!userRecord) {
            res.status(404).json({
                message: "Record not found."
            });
        }
        res.status(200).json(userRecord);
    } catch (err) {
        return errorHandler(500, "Internal Server Error");
    }
};

export default getUserRecord;
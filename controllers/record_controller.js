import { MongoClient } from "mongodb";
import Record from "../models/record_model.js";
import errorHandler from "../utils/error.js";

const uri = 'mongodb+srv://spider_sorbet:TrYNBe5ui1t7FNoN@maindata.41fxhz2.mongodb.net/Fitness-Dairy?retryWrites=true&w=majority';
//const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);
/* const client = new MongoClient(process.env.MONGO_URL); */

export const addRecord = async (req, res, next) => {
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

export const readRecord = async (req, res, next) => {
    try {
        await client.connect();
        // database and collection code goes here
        const db = client.db("Fitness-Dairy");
        const coll = db.collection("Records");
        // find code goes here
        const cursor = coll.find();
        // iterate code goes here
        await cursor.forEach(console.log);
        res.status(200).json("Activity Read");
    } 
        //in case of error
      catch (error) {
        next(error);
    } /* finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }     */
};

export const userProfile = async (req, res, next) => {

}


export const updateRecord = async (req, res, next) => {
    const {
        email,
        activity,
        date,
        minute,
        location,
        distance,
        note,
        image} = req.body;

    const putRecord = {
        email,
        activity,
        date,
        minute,
        location,
        distance,
        note,
        image
    }
    try {
        await client.connect();
        // database and collection code goes here
        const db = client.db("Fitness-Dairy");
        const coll = db.collection("Records");
        // update code goes here
        const filter = _id;
        console.log(_id)
        console.log(putRecord)
        const updateDoc = { $set: putRecord};
        const result = await coll.updateOne(filter, updateDoc);
        console.log( _id + " has update with "+ result.modifiedCount);
    } 
        //in case of error
    catch (error) {
        next(error);
        console.log('this one run');
    }    
}

export const activityUpdate = async (req, res, next) => {
	let {
        _id,
		email,
        activity,
        date,
        minute,
        location,
        distance,
        note,
        image
	} = req.body;
    const recordId = _id;
    console.log(recordId);
	try {
		let record = await Record.findById(recordId);

		if (!record) {
			return res.status(404).json({ message: "Activity not found" });
		}

		// Update activity fields
		record.activity = activity;
        record.date = date;

		// Save updated record to database
		record = await record.save();

		res.json(record);
	} catch (error) {
		next(error);
		console.log('this one run');
	}
};

export const deleteRecord = async (req, res, next) => {
    const {id} = req.body;
    try {
        await client.connect();
        // database and collection code goes here
        const db = client.db("Fitness-Dairy");
        const coll = db.collection("Records");
        let product = await coll.deleteOne(id)
        console.log(product);
        console.log("record is delete");
        res.status(200).json("Record delete");
    } catch (error) {
		next(error);
	}
};
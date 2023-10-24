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
      const db = client.db("Fitness-Dairy");
      const coll = db.collection("Records");
      const cursor = coll.find();
  
      // Convert the cursor results into an array
      const records = await cursor.toArray();
  
      // Send the records as a JSON response
      res.status(200).json(records);
    } catch (error) {
      next(error);
    } finally {
      await client.close();
    }
  };



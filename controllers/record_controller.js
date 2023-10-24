import { MongoClient , ObjectId } from "mongodb";
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
        console.log(req.body)
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

export const userProfile = async (req, res, next) => {

}


export const updateRecord = async (req, res, next) => {
    const {
        _id,
        email,
        activity,
        date,
        minute,
        location,
        distance,
        note,
        image} = req.body;
    console.log(req.body._id);
    const idSearch = _id['$oid'] ;
    console.log(idSearch);
    try {
        await client.connect();
        // database and collection code goes here
        const db = client.db("Fitness-Dairy");
        const coll = db.collection("Records");
        // update code goes here
        const result = await coll.updateOne(
            {
                _id: new ObjectId(idSearch)
            }, 
            {$set :
                {
                    activity: activity,
                    date: date,
                    minute: minute,
                    location: location,
                    distance: distance,
                    note: note,
                    image: image
                }
            }
        );
        console.log( idSearch + " has update with "+ result.modifiedCount);
        res.status(200).json({data:'record update'});
    } 
        //in case of error
    catch (error) {
        next(error);
        console.log('this one run mean it error');
    }    
}

export const activityUpdate = async (req, res, next) => {
	const {
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
    console.log(id)
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
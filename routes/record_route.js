import express from 'express';
const router = express.Router();
import { activityUpdate , addRecord, readRecord , userProfile , updateRecord , deleteRecord } from "../controllers/record_controller.js";

router.post("/add", addRecord);
router.get("/read", readRecord);
router.get("/userProfile" , userProfile );
router.put("/update", updateRecord);
router.put("/utest", activityUpdate)
router.delete("/delete", deleteRecord);



export default router;
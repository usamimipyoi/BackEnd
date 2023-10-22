import express from 'express';
const router = express.Router();
import { addRecord, readRecord  } from "../controllers/record_controller.js";

router.post("/add", addRecord);
router.get("/read", readRecord);


export default router;
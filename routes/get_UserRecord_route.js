import express from 'express';
import { getUserRecord, deleteUserRecord } from '../controllers/get_userRecord.js';

const router = express.Router();

router.get("/user_record", getUserRecord);
router.delete("/user_delete_Record", deleteUserRecord);

export default router;
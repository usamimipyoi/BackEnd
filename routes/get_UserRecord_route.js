import express from 'express';
import getUserRecord from '../controllers/get_userRecord.js';

const router = express.Router();

router.get("/user_record", getUserRecord);

export default router;
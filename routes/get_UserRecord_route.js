import express from 'express';
import { getUserRecord, deleteUserRecord} from '../controllers/get_userRecord.js';

const router = express.Router();

router.get("/user_record", getUserRecord);
router.get("/user_deleteRecord", deleteUserRecord);

export default router;
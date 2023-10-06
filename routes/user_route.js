import express from 'express';
import Test from '../controllers/user_controller.js';

const router = express.Router();

router.post("/test", Test)

export default router;
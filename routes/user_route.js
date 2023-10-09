import express from 'express';
import APIGGEZ from '../controllers/user_controller.js';

const router = express.Router();

router.get('/apiggez', APIGGEZ)

export default router;
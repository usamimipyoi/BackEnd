import express from 'express';
import { signUp, signIn} from '../controllers/auth_controller.js';
import record from '../controllers/record_controller.js'
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/activity", record);

export default router;
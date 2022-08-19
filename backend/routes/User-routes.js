import express from 'express';
import { getAlluser, signup ,login} from '../controllers/User-control';

const router=express.Router();

router.get('/',getAlluser);
router.post('/signup',signup)
router.post('/login',login)


export default router
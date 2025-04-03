import express from 'express'
import {signup, signin , signout , deleteUser} from '../controller/auth.controller.js'
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router()

router.post('/signup' , signup);
router.post('/signin' , signin);
router.post('/signout', signout);
router.delete('/delete/:userId', verifyToken, deleteUser);


export default router;
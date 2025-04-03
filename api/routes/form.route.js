import express from 'express'
import {createForm, getAllDetails , categoryWiseExpenseTotal , deleteForm , updateForm} from '../controller/form.controller.js'
import {verifyToken} from '../utils/verifyToken.js'
const router = express.Router()

router.post('/create' , verifyToken , createForm);
router.post("/allDetails", verifyToken, getAllDetails);
router.post('/categoryWiseExpenseTotal' , verifyToken , categoryWiseExpenseTotal);
router.delete('/delete/:formId', verifyToken, deleteForm);
router.put('/update/:formId', verifyToken, updateForm);

export default router;
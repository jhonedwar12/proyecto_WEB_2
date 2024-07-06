import express from 'express';
import { getFuncion, postFuncion, deleteFuncion, updateFuncion } from '../controllers/funcionControllers.js';

const router = express.Router();

router.get('/', getFuncion);
router.post('/', postFuncion);
router.delete('/:id', deleteFuncion);
router.patch('/', updateFuncion);


export default router;

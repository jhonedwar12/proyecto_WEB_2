import express from 'express';
import { getFilas, postFila, deleteFila, updateFila } from '../controllers/filaControllers.js';

const router = express.Router();

router.get('/', getFilas);
router.post('/', postFila);
router.delete('/:id', deleteFila);
router.patch('/', updateFila);


export default router;

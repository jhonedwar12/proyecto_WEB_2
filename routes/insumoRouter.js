import express from 'express';
import { getInsumos, postInsumo, deleteInsumo, updateInsumo  } from '../controllers/insumoControllers.js';

const router = express.Router();

router.get('/', getInsumos);
router.post('/', postInsumo);
router.delete('/:id', deleteInsumo);
router.patch('/', updateInsumo);


export default router;

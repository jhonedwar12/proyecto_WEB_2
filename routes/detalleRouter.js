import express from 'express';
import { getDetalles, postDetalle, deleteDetalle, updateDetalle } from '../controllers/detalleControllers.js';

const router = express.Router();

router.get('/', getDetalles);
router.post('/', postDetalle);
router.delete('/:id', deleteDetalle);
router.patch('/', updateDetalle);


export default router;

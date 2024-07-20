import express from 'express';
import { getAlmacen, postAlmacen, deleteAlmacen, updateAlmacen   } from '../controllers/almacenControllers.js';

const router = express.Router();

router.get('/', getAlmacen);
router.post('/', postAlmacen);
router.delete('/:id', deleteAlmacen);
router.patch('/', updateAlmacen);


export default router;

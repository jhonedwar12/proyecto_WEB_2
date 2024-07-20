import express from 'express';
import { getProducto_taller, postProducto_taller, deleteProducto_taller, updateProducto_taller } from '../controllers/producto_tallerControllers.js';

const router = express.Router();

router.get('/', getProducto_taller);
router.post('/', postProducto_taller);
router.delete('/:id', deleteProducto_taller);
router.patch('/', updateProducto_taller);


export default router;

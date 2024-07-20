import express from 'express';
import { getProducto, postProducto, deleteProducto, updateProducto } from '../controllers/productosControllers.js';

const router = express.Router();

router.get('/', getProducto);
router.post('/', postProducto);
router.delete('/:id', deleteProducto);
router.patch('/', updateProducto);


export default router;

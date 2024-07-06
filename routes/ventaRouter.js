import express from 'express';
import { getBoletas, postBoleta, deleteBoleta, updateBoleta } from '../controllers/ventaControllers.js';

const router = express.Router();

router.get('/', getBoletas);
router.post('/', postBoleta);
router.delete('/:id', deleteBoleta);
router.patch('/', updateBoleta);


export default router;

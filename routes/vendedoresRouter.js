import express from 'express';
import {  deleteVendedores, updateVendedores, getVendedores, postVendedores } from '../controllers/vendedoresControllers.js';

const router = express.Router();

router.get('/', getVendedores);
router.post('/', postVendedores);
router.delete('/:id', deleteVendedores);
router.patch('/', updateVendedores);


export default router;

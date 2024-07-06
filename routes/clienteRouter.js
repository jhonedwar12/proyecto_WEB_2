import express from 'express';
import { getClientes, postCliente, deleteCliente, updateCliente } from '../controllers/clienteControllers.js';

const router = express.Router();

router.get('/', getClientes);
router.post('/', postCliente);
router.delete('/:id', deleteCliente);
router.patch('/', updateCliente);


export default router;
